#!/bin/bash
# Script para resolver conflicto de merge en el servidor

SERVER="root@207.180.226.141"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🔧 RESOLVIENDO CONFLICTO DE MERGE EN SERVIDOR          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

ssh "$SERVER" << 'EOF'
cd /var/www/emerges-tes

echo "📋 Resolviendo conflicto en README.md..."
echo "   (Aceptando versión del remoto)"

# Aceptar versión del remoto (más reciente)
git checkout --theirs README.md
git add README.md

echo "✅ Conflicto resuelto"
echo ""
echo "📝 Haciendo commit del merge..."
git commit -m "merge: resolver conflicto en README.md (aceptar versión remota)" || {
    echo "⚠️  El commit puede que ya esté hecho"
}

echo ""
echo "✅ Merge completado"
echo ""
echo "📊 Estado actual:"
git status --short
EOF

echo ""
echo "✅ Conflicto resuelto en el servidor"

