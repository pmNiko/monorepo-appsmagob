#!/bin/bash

# Script para Generar Build del Frontend, Crear Tag, Publicar Release en GitHub y Subir Imagen Docker para Staging

## Variables
VERSION_TYPE=${1:-"patch"} # Tipo de incremento: "patch", "minor", "major". Por defecto, "patch".
TAG_DATE=$(date +'%Y-%m-%d')
IMAGE_NAME="nikodev/appsmagob"
BUILD_COMMAND="npm run build:staging"
DOCKERFILE="Dockerfile.stage"
DIST_DIR="dist-staging"
SUFFIX="-rc" # Sufijo para release candidate

# Validar el tipo de versión
if [[ "$VERSION_TYPE" != "major" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "patch" ]]; then
  echo "Error: Tipo de versión no válido. Usa 'major', 'minor' o 'patch'."
  exit 1
fi

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

# Incrementar la versión en package.json
CURRENT_VERSION=$(jq -r '.version' package.json)
if [[ -z "$CURRENT_VERSION" || ! "$CURRENT_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: No se pudo leer la versión actual o formato inválido en package.json."
  exit 1
fi

IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

case $VERSION_TYPE in
  major)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  minor)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  patch)
    PATCH=$((PATCH + 1))
    ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"

# Actualizar la versión en package.json
jq --arg new_version "$NEW_VERSION" '.version = $new_version' package.json > package_temp.json && mv package_temp.json package.json
echo "Versión actualizada en package.json: $NEW_VERSION"

# Crear el tag en formato personalizado
GIT_TAG="v$NEW_VERSION-$TAG_DATE$SUFFIX"
git add .
git commit -m "Release Candidate: v$NEW_VERSION🏷️ stage-$TAG_DATE🐳"
git tag "$GIT_TAG"
git push
git push origin "$GIT_TAG"

# Crear nueva release en GitHub como pre-release
CREATE_RELEASE_RESPONSE=$(curl -s -X POST https://api.github.com/repos/$GITHUB_REPO/releases \
-H "Authorization: token $GITHUB_TOKEN" \
-H "Content-Type: application/json" \
-d "{
  \"tag_name\": \"$GIT_TAG\",
  \"name\": \"$GIT_TAG\",
  \"body\": \"Release Candidate v$NEW_VERSION🏷️ stage-$TAG_DATE🐳\",
  \"draft\": false,
  \"prerelease\": true
}")

RELEASE_ID=$(echo "$CREATE_RELEASE_RESPONSE" | jq -r '.id')
if [[ "$RELEASE_ID" == "null" ]]; then
  echo "Error al crear la release en GitHub."
  echo "Respuesta: $CREATE_RELEASE_RESPONSE"
  exit 1
fi

echo "Release creada exitosamente: $GIT_TAG"

# Generar el build del frontend
echo "Generando el build del frontend para Staging..."
if ! $BUILD_COMMAND; then
  echo "Error: Falló la generación del build del frontend."
  exit 1
fi

# Construir y subir la imagen Docker
docker build -f $DOCKERFILE -t $IMAGE_NAME:stage-$TAG_DATE -t $IMAGE_NAME:stage-latest .
docker push $IMAGE_NAME:stage-$TAG_DATE
docker push $IMAGE_NAME:stage-latest

# Eliminar la carpeta temporal de dist
if [[ -d "$DIST_DIR" ]]; then
  echo "Eliminando carpeta $DIST_DIR..."
  rm -rf "$DIST_DIR"
  echo "Carpeta $DIST_DIR eliminada."
else
  echo "La carpeta $DIST_DIR no existe. Nada que eliminar."
fi

echo "Staging Release Candidate completado con éxito: $GIT_TAG"
