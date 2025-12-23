#!/bin/bash

# Script interactivo para desplegar la aplicación
# Uso: ./desplegar.sh

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 DESPLIEGUE DE LA APLICACIÓN GUIA-TES${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Verificar herramientas disponibles
echo -e "${CYAN}Verificando herramientas disponibles...${NC}"
HAS_PM2=false
HAS_DOCKER=false
HAS_NODE=false

if command -v pm2 &> /dev/null; then
    HAS_PM2=true
    echo -e "${GREEN}✓ PM2 disponible${NC}"
else
    echo -e "${YELLOW}✗ PM2 no disponible${NC}"
fi

if command -v docker &> /dev/null && (command -v docker-compose &> /dev/null || docker compose version &> /dev/null); then
    HAS_DOCKER=true
    echo -e "${GREEN}✓ Docker disponible${NC}"
else
    echo -e "${YELLOW}✗ Docker no disponible${NC}"
fi

if command -v node &> /dev/null && command -v npm &> /dev/null; then
    HAS_NODE=true
    echo -e "${GREEN}✓ Node.js y npm disponibles${NC}"
else
    echo -e "${RED}✗ Node.js o npm no disponibles${NC}"
    exit 1
fi

echo ""

# Verificar si existe build
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo -e "${YELLOW}⚠️  No hay build de producción. Necesitas construir primero.${NC}"
    echo -e "${CYAN}¿Construir ahora? (s/n):${NC} "
    read -r BUILD_NOW
    if [[ "$BUILD_NOW" =~ ^[Ss]$ ]]; then
        echo -e "${YELLOW}Construyendo aplicación...${NC}"
        npm run build
        echo -e "${GREEN}✓ Build completado${NC}"
    else
        echo -e "${RED}No se puede desplegar sin build. Ejecuta: npm run build${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Build encontrado en dist/${NC}"
fi

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}OPCIONES DE DESPLIEGUE:${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "1) ${GREEN}Deploy con PM2${NC} (Recomendado para servidor local/producción)"
echo -e "   - Puerto: 8607"
echo -e "   - Gestión automática de procesos"
echo -e "   - Reinicio automático"
echo ""
if [ "$HAS_DOCKER" = true ]; then
    echo -e "2) ${GREEN}Deploy con Docker${NC} (Recomendado para producción aislada)"
    echo -e "   - Puerto: 8607"
    echo -e "   - Contenedor aislado"
    echo -e "   - Fácil de escalar"
    echo ""
fi
echo -e "3) ${GREEN}Servir localmente${NC} (Solo para pruebas)"
echo -e "   - Puerto: 4173 (preview)"
echo -e "   - No persiste después de cerrar terminal"
echo ""
echo -e "4) ${GREEN}Generar build para despliegue estático${NC}"
echo -e "   - Para GitHub Pages, Netlify, Vercel"
echo -e "   - Solo genera los archivos en dist/"
echo ""
echo -e "${CYAN}Selecciona una opción (1-4):${NC} "
read -r OPTION

case $OPTION in
    1)
        if [ "$HAS_PM2" = false ]; then
            echo -e "${RED}PM2 no está instalado. Instálalo con: npm install -g pm2${NC}"
            exit 1
        fi
        echo ""
        echo -e "${YELLOW}Ejecutando deploy con PM2...${NC}"
        ./deploy.sh --skip-git
        ;;
    2)
        if [ "$HAS_DOCKER" = false ]; then
            echo -e "${RED}Docker no está disponible${NC}"
            exit 1
        fi
        echo ""
        echo -e "${YELLOW}Ejecutando deploy con Docker...${NC}"
        ./deploy-docker.sh --skip-git
        ;;
    3)
        echo ""
        echo -e "${YELLOW}Iniciando servidor de preview...${NC}"
        echo -e "${GREEN}La aplicación estará disponible en: http://localhost:4173${NC}"
        echo -e "${YELLOW}Presiona Ctrl+C para detener${NC}"
        npm run preview
        ;;
    4)
        echo ""
        echo -e "${YELLOW}Generando build de producción...${NC}"
        npm run build
        echo ""
        echo -e "${GREEN}✓ Build completado en dist/${NC}"
        echo -e "${CYAN}Para desplegar:${NC}"
        echo -e "  - GitHub Pages: Sube la carpeta dist/ a tu repositorio"
        echo -e "  - Netlify: Arrastra la carpeta dist/ a Netlify"
        echo -e "  - Vercel: Ejecuta 'vercel --prod' desde la raíz"
        ;;
    *)
        echo -e "${RED}Opción inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Proceso completado${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"

