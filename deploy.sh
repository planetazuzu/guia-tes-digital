#!/bin/bash

# Script de deploy para EMERGES TES
# Uso: ./deploy.sh
# Requisitos: git, npm, PM2 (opcional)

set -e  # Salir si hay error

echo "🚀 Iniciando deploy de EMERGES TES..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Actualizar código desde git
echo -e "${YELLOW}📥 Actualizando código desde git...${NC}"
git pull origin main || echo "⚠️  No se pudo hacer git pull (continuando...)"

# 2. Instalar dependencias
echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
npm ci --production=false

# 3. Build de producción
echo -e "${YELLOW}🔨 Construyendo aplicación...${NC}"
npm run build

# 4. Verificar que el build se completó
if [ ! -d "dist" ]; then
  echo "❌ Error: El directorio dist no existe después del build"
  exit 1
fi

echo -e "${GREEN}✅ Build completado exitosamente${NC}"

# 5. Si PM2 está instalado, reiniciar
if command -v pm2 &> /dev/null; then
  echo -e "${YELLOW}🔄 Reiniciando PM2...${NC}"
  pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
  pm2 save
  echo -e "${GREEN}✅ PM2 reiniciado${NC}"
else
  echo -e "${YELLOW}ℹ️  PM2 no está instalado. Usa Nginx para servir archivos estáticos.${NC}"
  echo -e "${YELLOW}   Los archivos están en: $(pwd)/dist${NC}"
fi

echo -e "${GREEN}🎉 Deploy completado!${NC}"
