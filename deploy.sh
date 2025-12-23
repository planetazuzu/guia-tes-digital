#!/bin/bash

# Script de deploy rápido para EMERGES TES
# Uso: ./deploy.sh [--skip-git]
# Requisitos: git, npm, PM2
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
APP_NAME="emerges-tes"
LOG_DIR="./logs"

# Crear directorio de logs si no existe
mkdir -p "$LOG_DIR"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 Deploy de EMERGES TES (Puerto $PORT)${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

# Verificar si se debe saltar git pull
SKIP_GIT=false
if [[ "$1" == "--skip-git" ]]; then
  SKIP_GIT=true
fi

# 1. Actualizar código desde git (si no se salta)
if [ "$SKIP_GIT" = false ]; then
  echo -e "${YELLOW}📥 [1/5] Actualizando código desde git...${NC}"
  if git pull origin main; then
    echo -e "${GREEN}✅ Código actualizado${NC}"
  else
    echo -e "${RED}⚠️  Error al actualizar desde git (continuando...)\n${NC}"
  fi
else
  echo -e "${YELLOW}⏭️  [1/5] Saltando actualización de git (--skip-git)${NC}"
fi

# 2. Verificar Node.js y npm
echo -e "${YELLOW}🔍 [2/5] Verificando entorno...${NC}"
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Error: Node.js no está instalado${NC}"
  exit 1
fi
if ! command -v npm &> /dev/null; then
  echo -e "${RED}❌ Error: npm no está instalado${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) y npm $(npm -v) detectados${NC}"

# 3. Instalar dependencias
echo -e "${YELLOW}📦 [3/5] Instalando dependencias...${NC}"
if npm ci --production=false; then
  echo -e "${GREEN}✅ Dependencias instaladas${NC}"
else
  echo -e "${RED}❌ Error al instalar dependencias${NC}"
  exit 1
fi

# 4. Build de producción
echo -e "${YELLOW}🔨 [4/5] Construyendo aplicación...${NC}"
if npm run build; then
  echo -e "${GREEN}✅ Build completado${NC}"
else
  echo -e "${RED}❌ Error en el build${NC}"
  exit 1
fi

# Verificar que el build se completó
if [ ! -d "dist" ]; then
  echo -e "${RED}❌ Error: El directorio dist no existe después del build${NC}"
  exit 1
fi

# Verificar que hay archivos en dist
if [ -z "$(ls -A dist)" ]; then
  echo -e "${RED}❌ Error: El directorio dist está vacío${NC}"
  exit 1
fi

# 5. Reiniciar PM2
echo -e "${YELLOW}🔄 [5/5] Gestionando PM2...${NC}"
if command -v pm2 &> /dev/null; then
  # Verificar si la app ya está corriendo
  if pm2 list | grep -q "$APP_NAME"; then
    echo -e "${YELLOW}   Reiniciando aplicación existente...${NC}"
    pm2 restart "$APP_NAME" || {
      echo -e "${YELLOW}   Error al reiniciar, intentando iniciar...${NC}"
      pm2 start ecosystem.config.cjs
    }
  else
    echo -e "${YELLOW}   Iniciando nueva instancia...${NC}"
      pm2 start ecosystem.config.cjs
  fi
  
  # Guardar configuración PM2
  pm2 save
  
  # Mostrar estado
  echo ""
  echo -e "${GREEN}✅ PM2 gestionado correctamente${NC}"
  echo -e "${BLUE}📊 Estado de la aplicación:${NC}"
  pm2 list | grep "$APP_NAME" || true
  echo ""
  echo -e "${GREEN}🌐 Aplicación disponible en: http://localhost:$PORT${NC}"
  echo -e "${GREEN}📝 Logs: pm2 logs $APP_NAME${NC}"
  echo -e "${GREEN}📊 Monitor: pm2 monit${NC}"
else
  echo -e "${RED}❌ Error: PM2 no está instalado${NC}"
  echo -e "${YELLOW}   Instala PM2 con: npm install -g pm2${NC}"
  echo -e "${YELLOW}   O usa Nginx para servir archivos estáticos desde: $(pwd)/dist${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Deploy completado exitosamente!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
