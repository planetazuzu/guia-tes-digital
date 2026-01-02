#!/bin/bash
# Script para hacer rebuild completo en el servidor
# Soluciona problemas de vendor-other y React duplicado

SERVER="root@207.180.226.141"
APP_DIR="/var/www/emerges-tes"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🔧 REBUILD COMPLETO EN SERVIDOR                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

ssh "$SERVER" << 'EOF'
cd /var/www/emerges-tes

echo "📋 Paso 1: Verificando estado actual..."
git status --short
echo ""

echo "📥 Paso 2: Actualizando código desde GitHub..."
git pull origin main || {
    echo "⚠️  Conflicto de merge detectado"
    echo "   Resolviendo automáticamente..."
    git config pull.rebase false
    git pull origin main
}
echo ""

echo "🧹 Paso 3: Limpiando completamente (node_modules, dist, lock)..."
rm -rf node_modules
rm -f package-lock.json
rm -rf dist
echo "✅ Limpieza completada"
echo ""

echo "📦 Paso 4: Reinstalando dependencias..."
npm install
echo "✅ Dependencias reinstaladas"
echo ""

echo "🔍 Paso 5: Verificando que no hay duplicados de React..."
npm ls react react-dom 2>&1 | head -3
echo ""

echo "🔨 Paso 6: Haciendo build de producción..."
npm run build
echo ""

echo "✅ Paso 7: Verificando que NO hay vendor-other..."
if ls dist/assets/vendor-other* 2>/dev/null; then
    echo "❌ ERROR: vendor-other todavía existe!"
    echo "   Archivos encontrados:"
    ls -lh dist/assets/vendor-other*
    exit 1
else
    echo "✅ Correcto: vendor-other NO existe"
fi
echo ""

echo "📊 Chunks generados:"
ls -lh dist/assets/ | grep vendor | head -5
echo ""

echo "✅ Rebuild completado exitosamente"
EOF

echo ""
echo "✅ Rebuild completado en el servidor"
echo ""
echo "💡 IMPORTANTE:"
echo "   Después del rebuild, limpia el caché del navegador:"
echo "   - Ctrl+Shift+Delete > Cached images and files"
echo "   - O usa modo incógnito para probar"

