#!/bin/bash

# Script de deploy con Docker para EMERGES TES
# Uso: ./deploy-docker.sh [--skip-git] [--rebuild]
# Requisitos: docker, docker-compose
# Puerto: 8607

set -e  # Salir si hay error

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
PORT=8607
CONTAINER_NAME="emerges-tes"
IMAGE_NAME="emerges-tes"
COMPOSE_FILE="docker-compose.yml"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}🐳 Deploy Docker de EMERGES TES (Puerto $PORT)${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
  echo -e "${RED}❌ Error: Docker no está instalado${NC}"
  echo -e "${YELLOW}   Instala Docker: https://docs.docker.com/get-docker/${NC}"
  exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
  echo -e "${RED}❌ Error: docker-compose no está instalado${NC}"
  exit 1
fi

# Detectar comando docker-compose
if docker compose version &> /dev/null; then
  DOCKER_COMPOSE="docker compose"
else
  DOCKER_COMPOSE="docker-compose"
fi

# Verificar si se debe saltar git pull
SKIP_GIT=false
REBUILD=false

for arg in "$@"; do
  case $arg in
    --skip-git)
      SKIP_GIT=true
      shift
      ;;
    --rebuild)
      REBUILD=true
      shift
      ;;
    *)
      shift
      ;;
  esac
done

# 1. Actualizar código desde git (si no se salta)
if [ "$SKIP_GIT" = false ]; then
  echo -e "${YELLOW}📥 [1/4] Actualizando código desde git...${NC}"
  if git pull origin main; then
    echo -e "${GREEN}✅ Código actualizado${NC}"
  else
    echo -e "${RED}⚠️  Error al actualizar desde git (continuando...)\n${NC}"
  fi
else
  echo -e "${YELLOW}⏭️  [1/4] Saltando actualización de git (--skip-git)${NC}"
fi

# 2. Detener contenedor existente (si existe)
echo -e "${YELLOW}🛑 [2/4] Deteniendo contenedor existente...${NC}"
$DOCKER_COMPOSE down 2>/dev/null || true
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true
echo -e "${GREEN}✅ Contenedor detenido${NC}"

# 3. Construir imagen Docker
echo -e "${YELLOW}🔨 [3/4] Construyendo imagen Docker...${NC}"
if [ "$REBUILD" = true ]; then
  echo -e "${YELLOW}   Forzando rebuild completo (--rebuild)${NC}"
  $DOCKER_COMPOSE build --no-cache
else
  $DOCKER_COMPOSE build
fi

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Imagen construida exitosamente${NC}"
else
  echo -e "${RED}❌ Error al construir imagen${NC}"
  exit 1
fi

# 4. Iniciar contenedor
echo -e "${YELLOW}🚀 [4/4] Iniciando contenedor...${NC}"
$DOCKER_COMPOSE up -d

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Contenedor iniciado${NC}"
else
  echo -e "${RED}❌ Error al iniciar contenedor${NC}"
  exit 1
fi

# Esperar un momento para que el contenedor inicie
sleep 3

# Verificar estado
echo ""
echo -e "${GREEN}✅ Deploy completado exitosamente${NC}"
echo -e "${BLUE}📊 Estado del contenedor:${NC}"
docker ps | grep "$CONTAINER_NAME" || docker ps -a | grep "$CONTAINER_NAME"

echo ""
echo -e "${GREEN}🌐 Aplicación disponible en: http://localhost:$PORT${NC}"
echo -e "${GREEN}📝 Logs: docker logs $CONTAINER_NAME${NC}"
echo -e "${GREEN}📊 Logs en tiempo real: docker logs -f $CONTAINER_NAME${NC}"
echo -e "${GREEN}🛑 Detener: docker-compose down${NC}"
echo -e "${GREEN}🔄 Reiniciar: docker-compose restart${NC}"

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Deploy Docker completado!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
