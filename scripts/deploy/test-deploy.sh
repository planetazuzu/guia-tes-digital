#!/bin/bash
# Script para probar el despliegue desde la máquina local
# Ejecutar desde: /home/planetazuzu/guia-tes

set -e

echo "🧪 Probando despliegue automático..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: No estás en el directorio del proyecto"
    echo "   Ejecuta: cd /home/planetazuzu/guia-tes"
    exit 1
fi

# Verificar que el remoto production existe
if ! git remote get-url production >/dev/null 2>&1; then
    echo "❌ ERROR: Remoto 'production' no configurado"
    echo "   Configura con: git remote add production root@207.180.226.141:/var/repos/emerges-tes.git"
    exit 1
fi

echo "✅ Directorio correcto"
echo "✅ Remoto 'production' configurado"
echo ""

# Hacer un cambio pequeño para probar
echo "📝 Creando cambio de prueba..."
echo "" >> README.md
echo "<!-- Test deploy $(date '+%Y-%m-%d %H:%M:%S') -->" >> README.md

# Commit
echo "💾 Haciendo commit..."
git add README.md
git commit -m "test: probar despliegue automático $(date '+%Y-%m-%d %H:%M:%S')" || {
    echo "⚠️  No hay cambios nuevos para commitear"
    echo "   Haciendo push de commits existentes..."
}

# Push
echo ""
echo "🚀 Haciendo push a producción..."
echo "   Esto activará el hook post-receive automáticamente"
echo ""

if git push production main; then
    echo ""
    echo "✅ Push completado"
    echo ""
    echo "📋 Próximos pasos:"
    echo "   1. Conectarte al servidor: ssh root@207.180.226.141"
    echo "   2. Ver logs en tiempo real: tail -f /var/log/emerges-tes-deploy.log"
    echo "   3. Verificar build: ls -la /var/www/emerges-tes/dist/"
else
    echo ""
    echo "❌ Error en el push"
    echo "   Verifica la conexión SSH y los permisos"
    exit 1
fi

