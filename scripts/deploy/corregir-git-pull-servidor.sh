#!/bin/bash
# Script para corregir git pull en el servidor

SERVER="root@207.180.226.141"
APP_DIR="/var/www/emerges-tes"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🔧 CORRIGIENDO GIT PULL EN SERVIDOR                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

echo "📤 Configurando git pull en el servidor..."
ssh "$SERVER" << 'EOF'
cd /var/www/emerges-tes

# Configurar pull para usar merge
git config pull.rebase false

# Verificar estado
echo ""
echo "✅ Configuración aplicada:"
git config pull.rebase

# Hacer pull con merge
echo ""
echo "📥 Haciendo pull..."
git pull origin main

echo ""
echo "✅ Git pull completado"
EOF

echo ""
echo "✅ Configuración completada"

