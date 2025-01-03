#!/bin/bash

# Script para Generar una Versión Estable en Producción y Publicar Imagen Docker

## Variables
TAG_DATE=$(date +'%Y-%m-%d')
IMAGE_NAME="nikodev/appsmagob"
BUILD_COMMAND="npm run build:prod"
DOCKERFILE="Dockerfile.prod"
DIST_DIR="dist-production"
SUFFIX="" # Sin sufijo para producción

# Validar GITHUB_TOKEN
if [[ -z "$GITHUB_TOKEN" ]]; then
  echo "Error: El token GITHUB_TOKEN no está configurado."
  exit 1
fi

# Recuperar el repositorio desde package.json
if [[ -f "package.json" ]]; then
  GITHUB_REPO=$(jq -r '.repository.url' package.json | sed 's#.*github.com/\(.*\).git#\1#')
  if [[ -z "$GITHUB_REPO" || "$GITHUB_REPO" == "null" ]]; then
    echo "Error: No se pudo obtener el repositorio desde package.json."
    exit 1
  fi
else
  echo "Error: No se encontró package.json."
  exit 1
fi

# Leer la versión actual de package.json
CURRENT_VERSION=$(jq -r '.version' package.json)
if [[ -z "$CURRENT_VERSION" || ! "$CURRENT_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: No se pudo leer la versión actual o formato inválido en package.json."
  exit 1
fi

# Configurar tags de Git
PREVIOUS_TAG="v$TAG_DATE-$CURRENT_VERSION-rc" # Tag de staging
STABLE_TAG="🏷️v$TAG_DATE-$CURRENT_VERSION"     # Tag estable

# Verificar si el tag de staging existe
if ! git rev-parse "$PREVIOUS_TAG" >/dev/null 2>&1; then
  echo "Error: No se encontró el Release Candidate ($PREVIOUS_TAG)."
  exit 1
fi

# Verificar si el tag estable ya existe
if git rev-parse "$STABLE_TAG" >/dev/null 2>&1; then
  echo "El tag $STABLE_TAG ya existe. Usando el tag existente."
else
  # Crear el tag estable
  git tag "$STABLE_TAG"
  git push origin "$STABLE_TAG"
fi

# Verificar si la release ya existe en GitHub
RELEASE_CHECK=$(curl -s -X GET https://api.github.com/repos/$GITHUB_REPO/releases/tags/$STABLE_TAG \
-H "Authorization: token $GITHUB_TOKEN")

if [[ $(echo "$RELEASE_CHECK" | jq -r '.id') != "null" ]]; then
  echo "La release para el tag $STABLE_TAG ya existe. No se creará una nueva."
else
  # Crear nueva release en GitHub como release estable
  CREATE_RELEASE_RESPONSE=$(curl -s -X POST https://api.github.com/repos/$GITHUB_REPO/releases \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"tag_name\": \"$STABLE_TAG\",
    \"name\": \"$STABLE_TAG\",
    \"body\": \"Stable release version: $NEW_VERSION🏷️ - prod-$TAG_DATE🐳\",
    \"draft\": false,
    \"prerelease\": false
  }")

  RELEASE_ID=$(echo "$CREATE_RELEASE_RESPONSE" | jq -r '.id')
  if [[ "$RELEASE_ID" == "null" ]]; then
    echo "Error al crear la release en GitHub."
    echo "Respuesta: $CREATE_RELEASE_RESPONSE"
    exit 1
  fi

  echo "Release estable creada exitosamente: $STABLE_TAG"
fi

# Generar el build del frontend
echo "Generando el build del frontend para Producción..."
if ! $BUILD_COMMAND; then
  echo "Error: Falló la generación del build del frontend."
  exit 1
fi

# Construir y subir la imagen Docker
docker build -f $DOCKERFILE -t $IMAGE_NAME:prod-$TAG_DATE -t $IMAGE_NAME:prod-latest .
docker push $IMAGE_NAME:prod-$TAG_DATE
docker push $IMAGE_NAME:prod-latest

# Eliminar la carpeta temporal de dist
if [[ -d "$DIST_DIR" ]]; then
  echo "Eliminando carpeta $DIST_DIR..."
  rm -rf "$DIST_DIR"
  echo "Carpeta $DIST_DIR eliminada."
else
  echo "La carpeta $DIST_DIR no existe. Nada que eliminar."
fi

echo "Producción completada con éxito: $STABLE_TAG"
