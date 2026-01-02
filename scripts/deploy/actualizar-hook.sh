#!/bin/bash
# Script para actualizar el hook post-receive en el servidor

SERVER="root@207.180.226.141"
HOOK_LOCAL="./scripts/deploy/post-receive"
HOOK_REMOTE="/var/repos/emerges-tes.git/hooks/post-receive"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🔧 ACTUALIZANDO HOOK POST-RECEIVE EN SERVIDOR        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar que el archivo local existe
if [ ! -f "$HOOK_LOCAL" ]; then
    echo "❌ ERROR: No se encuentra $HOOK_LOCAL"
    exit 1
fi

echo "📤 Copiando hook al servidor..."
scp "$HOOK_LOCAL" "$SERVER:$HOOK_REMOTE" || {
    echo "❌ ERROR: No se pudo copiar el hook"
    exit 1
}

echo "🔐 Configurando permisos de ejecución..."
ssh "$SERVER" "chmod +x $HOOK_REMOTE" || {
    echo "❌ ERROR: No se pudieron configurar permisos"
    exit 1
}

echo ""
echo "✅ Hook actualizado correctamente"
echo ""
echo "🧪 Para probar, haz un push:"
echo "   git push production main"

