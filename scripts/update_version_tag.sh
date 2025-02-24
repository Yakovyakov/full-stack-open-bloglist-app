#!/bin/bash
# Last TAG VERSION GitHub(tag) de GitHub
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)
if [ -z "$LATEST_TAG" ]; then
  echo "No se encontraron tags en el repositorio. No se realizarán cambios."
  exit 0
fi

NEW_VERSION=${LATEST_TAG#v}
echo "Last Version: $NEW_VERSION"

# Función para actualizar la  al actualizar la versión enversión en un package.json usando npm
update_package_version() {
  local PACKAGE_PATH=$1
  echo "Update version in $PACKAGE_PATH/package.json..."

  # Navegar a la carpeta y ejecutar npm version
  (cd "$PACKAGE_PATH" && npm version "$NEW_VERSION" --no-git-tag-version --allow-same-version)
  
  if [ $? -eq 0 ]; then
    echo "Updated version $PACKAGE_PATH/package.json: $NEW_VERSION"
  else
    echo "Error: update version $PACKAGE_PATH/package.json"
    exit 1
  fi
}

# Actualizar versiones en los package.json
update_package_version "."          # Raíz del proyecto
update_package_version "./frontend" # Frontend
update_package_version "./backend"  # Backend