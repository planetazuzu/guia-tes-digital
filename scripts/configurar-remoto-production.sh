#!/bin/bash
# Script para configurar el remoto de producción
# USO: ./scripts/configurar-remoto-production.sh TU_IP

if [ -z "$1" ]; then
  echo "❌ Error: Debes proporcionar la IP del servidor"
  echo "Uso: ./scripts/configurar-remoto-production.sh TU_IP"
  echo ""
  echo "Ejemplo:"
  echo "  ./scripts/configurar-remoto-production.sh 192.168.1.100"
  exit 1
fi

SERVER_IP="$1"
REMOTE_URL="root@${SERVER_IP}:/var/repos/emerges-tes.git"

echo "🔧 Configurando remoto de producción..."
echo "   IP del servidor: $SERVER_IP"
echo "   URL del remoto: $REMOTE_URL"
echo ""

# Verificar si el remoto ya existe
if git remote | grep -q "^production$"; then
  echo "⚠️  El remoto 'production' ya existe"
  read -p "¿Deseas actualizarlo? (s/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Ss]$ ]]; then
    git remote set-url production "$REMOTE_URL"
    echo "✅ Remoto 'production' actualizado"
  else
    echo "❌ Operación cancelada"
    exit 1
  fi
else
  git remote add production "$REMOTE_URL"
  echo "✅ Remoto 'production' agregado"
fi

echo ""
echo "📋 Remotos configurados:"
git remote -v

echo ""
echo "✅ Configuración completada"
echo ""
echo "Próximos pasos:"
echo "  1. git add ."
echo "  2. git commit -m 'Tu mensaje de commit'"
echo "  3. git push production main"

