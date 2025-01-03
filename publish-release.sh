#!/bin/bash

# Script para Generar Build del Frontend, Incrementar Versión, Crear Release en GitHub y Publicar Imagen Docker

# Tag de GitHub:
#  - Staging: v1.2.3-2025-01-03-rc.
#  - Producción: v1.2.3-2025-01-03.
#
# Tags de Docker:  
#  - Los tags de Docker diferencian entre stage y prod:
#     - nikodev/appsmagob:stage-2025-01-03.
#     - nikodev/appsmagob:prod-2025-01-03.
#
# Sufijo dinámico (-rc): 
#  - Solo se agrega al tag de GitHub si el entorno es stage.

## Variables
ENVIRONMENT_FLAG=${1:-""} # Flag que define el entorno: "stage" o "prod".
VERSION_TYPE=${2:-""}     # Tipo de incremento: "patch", "minor", "major".
TAG_DATE=$(date +'%Y-%m-%d')
IMAGE_NAME="nikodev/appsmagob"

# Validar el flag del entorno
if [[ -z "$ENVIRONMENT_FLAG" || ! "$ENVIRONMENT_FLAG" =~ ^(stage|prod)$ ]]; then
  echo "Error: Debes especificar el entorno como primer parámetro: 'stage' o 'prod'."
  exit 1
fi

# Validar el tipo de versión
if [[ -z "$VERSION_TYPE" || ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo "Error: Debes especificar un tipo de versión válido como segundo parámetro: 'patch', 'minor', o 'major'."
  exit 1
fi

# Configurar las variables según el entorno
if [[ "$ENVIRONMENT_FLAG" == "stage" ]]; then
  BUILD_COMMAND="npm run build:staging"
  DOCKERFILE="Dockerfile.stage"
  TAG_PREFIX="stage"
  DIST_DIR="dist-staging"
  SUFFIX="-rc" # Sufijo para release candidate
else
  BUILD_COMMAND="npm run build:production"
  DOCKERFILE="Dockerfile.prod"
  TAG_PREFIX="prod"
  DIST_DIR="dist-production"
  SUFFIX="" # Sin sufijo para versiones estables
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

# Aumentar la versión en package.json
if [[ -f "package.json" ]]; then
  CURRENT_VERSION=$(jq -r '.version' package.json)
  if [[ -z "$CURRENT_VERSION" || ! "$CURRENT_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: No se pudo leer la versión actual o formato inválido en package.json."
    exit 1
  fi
  
  # Extraer partes de la versión
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
else
  echo "Error: No se encontró package.json."
  exit 1
fi

# Crear el tag en formato personalizado
GIT_TAG="v$TAG_DATE🏷️$NEW_VERSION$SUFFIX"

# Commit y push automáticos a Git
git add package.json
git commit -m "v$NEW_VERSION🏷️ - v$TAG_DATE🐳"
git tag "$GIT_TAG"
git push
git push origin "$GIT_TAG"

# Crear nueva release en GitHub
CREATE_RELEASE_RESPONSE=$(curl -s -X POST https://api.github.com/repos/$GITHUB_REPO/releases \
-H "Authorization: token $GITHUB_TOKEN" \
-H "Content-Type: application/json" \
-d "{
  \"tag_name\": \"$GIT_TAG\",
  \"name\": \"$GIT_TAG\",
  \"body\": \"Release version $NEW_VERSION generated on $TAG_DATE.\",
  \"draft\": false,
  \"prerelease\": $([[ "$ENVIRONMENT_FLAG" == "stage" ]] && echo true || echo false)
}")

if [[ $(echo "$CREATE_RELEASE_RESPONSE" | jq -r '.id') != "null" ]]; then
  echo "Release creada exitosamente: $GIT_TAG"
else
  echo "Error al crear la release en GitHub."
  echo "Respuesta: $CREATE_RELEASE_RESPONSE"
fi

# Generar el build del frontend
echo "Generando el build del frontend en modo $TAG_PREFIX..."
if ! $BUILD_COMMAND; then
  echo "Error: Falló la generación del build del frontend."
  exit 1
fi

# Construir la imagen Docker con ambas etiquetas
docker build -f $DOCKERFILE -t $IMAGE_NAME:$TAG_PREFIX-$TAG_DATE -t $IMAGE_NAME:$TAG_PREFIX-latest .

# Subir ambas etiquetas
docker push $IMAGE_NAME:$TAG_PREFIX-$TAG_DATE
docker push $IMAGE_NAME:$TAG_PREFIX-latest

# Eliminar la carpeta temporal de dist
if [[ -d "$DIST_DIR" ]]; then
  echo "Eliminando carpeta $DIST_DIR..."
  rm -rf "$DIST_DIR"
  echo "Carpeta $DIST_DIR eliminada."
else
  echo "La carpeta $DIST_DIR no existe. Nada que eliminar."
fi

echo "Build, version update, GitHub release, and Docker image push completed successfully for $TAG_PREFIX!"
