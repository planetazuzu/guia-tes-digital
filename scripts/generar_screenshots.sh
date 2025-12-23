#!/bin/bash
# Script para generar screenshots de la PWA
# Requiere: wkhtmltoimage o herramientas del navegador

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

APP_URL="${1:-http://localhost:8607}"
SCREENSHOTS_DIR="public/screenshots"

echo -e "${GREEN}📸 Generando screenshots de la PWA${NC}"
echo -e "URL: ${APP_URL}"
echo ""

# Crear directorio si no existe
mkdir -p "$SCREENSHOTS_DIR"

# Verificar herramientas disponibles
HAS_WKHTML=false
HAS_PUPPETEER=false

if command -v wkhtmltoimage &> /dev/null; then
    HAS_WKHTML=true
    echo -e "${GREEN}✅ wkhtmltoimage encontrado${NC}"
fi

if command -v node &> /dev/null && npm list -g puppeteer &> /dev/null 2>&1; then
    HAS_PUPPETEER=true
    echo -e "${GREEN}✅ Puppeteer encontrado${NC}"
fi

if [ "$HAS_WKHTML" = false ] && [ "$HAS_PUPPETEER" = false ]; then
    echo -e "${YELLOW}⚠️  No se encontraron herramientas automatizadas${NC}"
    echo ""
    echo "Opciones:"
    echo "1. Instalar wkhtmltoimage: sudo apt-get install wkhtmltopdf"
    echo "2. Usar DevTools del navegador (ver scripts/generar_screenshots.md)"
    echo "3. Instalar Puppeteer: npm install -g puppeteer-cli"
    echo ""
    echo "Por ahora, puedes generar screenshots manualmente:"
    echo "  - Abre ${APP_URL} en Chrome/Firefox"
    echo "  - Presiona F12 para DevTools"
    echo "  - Usa 'Capture screenshot' o 'Screenshot'"
    echo "  - Guarda en ${SCREENSHOTS_DIR}/"
    exit 0
fi

echo ""
echo "Generando screenshots..."

# Desktop screenshots (1280x720)
if [ "$HAS_WKHTML" = true ]; then
    echo "📸 Generando home.png (Desktop)..."
    wkhtmltoimage --width 1280 --height 720 --quality 90 \
        "${APP_URL}" "${SCREENSHOTS_DIR}/home.png" 2>/dev/null || true
    
    echo "📸 Generando manual.png (Desktop)..."
    wkhtmltoimage --width 1280 --height 720 --quality 90 \
        "${APP_URL}/manual" "${SCREENSHOTS_DIR}/manual.png" 2>/dev/null || true
fi

# Mobile screenshot (750x1334)
if [ "$HAS_WKHTML" = true ]; then
    echo "📸 Generando mobile-home.png (Mobile)..."
    wkhtmltoimage --width 375 --height 667 --quality 90 \
        "${APP_URL}" "${SCREENSHOTS_DIR}/mobile-home.png" 2>/dev/null || true
fi

echo ""
if [ -f "${SCREENSHOTS_DIR}/home.png" ]; then
    echo -e "${GREEN}✅ Screenshots generados en ${SCREENSHOTS_DIR}/${NC}"
    ls -lh "${SCREENSHOTS_DIR}"/*.png 2>/dev/null || true
else
    echo -e "${YELLOW}⚠️  No se generaron screenshots automáticamente${NC}"
    echo "   Usa las herramientas del navegador (ver scripts/generar_screenshots.md)"
fi

