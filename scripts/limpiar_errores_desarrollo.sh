#!/bin/bash
# Script para limpiar errores comunes de desarrollo
# Uso: ./scripts/limpiar_errores_desarrollo.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🧹 Limpieza de Errores de Desarrollo${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

# 1. Limpiar caché de Vite
echo -e "${YELLOW}[1/5] Limpiando caché de Vite...${NC}"
if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo -e "${GREEN}✅ Caché de Vite eliminada${NC}"
else
    echo -e "${GREEN}✅ No hay caché de Vite${NC}"
fi

# 2. Limpiar build anterior
echo -e "${YELLOW}[2/5] Limpiando build anterior...${NC}"
if [ -d "dist" ]; then
    rm -rf dist
    echo -e "${GREEN}✅ Build anterior eliminado${NC}"
else
    echo -e "${GREEN}✅ No hay build anterior${NC}"
fi

# 3. Verificar TypeScript
echo -e "${YELLOW}[3/5] Verificando TypeScript...${NC}"
if npx tsc --noEmit 2>&1 | grep -q "error"; then
    echo -e "${RED}⚠️  Se encontraron errores de TypeScript${NC}"
    npx tsc --noEmit 2>&1 | grep "error" | head -10
else
    echo -e "${GREEN}✅ Sin errores de TypeScript${NC}"
fi

# 4. Limpiar localStorage del navegador (instrucciones)
echo -e "${YELLOW}[4/5] Instrucciones para limpiar almacenamiento del navegador...${NC}"
echo ""
echo -e "${BLUE}Para limpiar localStorage/sessionStorage en el navegador:${NC}"
echo -e "  1. Abre DevTools (F12)"
echo -e "  2. Ve a la pestaña 'Application' o 'Aplicación'"
echo -e "  3. En 'Storage' → 'Local Storage' → Selecciona tu dominio"
echo -e "  4. Haz clic derecho → 'Clear' o 'Limpiar'"
echo -e "  5. Repite para 'Session Storage'"
echo ""
echo -e "${BLUE}O ejecuta en la consola del navegador:${NC}"
echo -e "  localStorage.clear();"
echo -e "  sessionStorage.clear();"
echo ""

# 5. Verificar dependencias
echo -e "${YELLOW}[5/5] Verificando dependencias...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules no existe. Ejecuta: npm install${NC}"
else
    echo -e "${GREEN}✅ Dependencias instaladas${NC}"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Limpieza completada${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Próximos pasos:${NC}"
echo -e "  1. Limpia el almacenamiento del navegador (ver arriba)"
echo -e "  2. Reinicia el servidor de desarrollo: npm run dev"
echo -e "  3. Recarga la página con Ctrl+Shift+R (hard refresh)"
echo ""

