#!/bin/bash
# Script para configurar SSH y hacer push a producción
# Ejecuta este script en tu terminal: ./scripts/push-produccion.sh

set -e

PASSWORD="941259018a"
SERVER="root@207.180.226.141"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     CONFIGURACIÓN SSH Y PUSH A PRODUCCIÓN                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar si sshpass está instalado
if ! command -v sshpass &> /dev/null; then
    echo "📦 Instalando sshpass..."
    sudo apt-get update -qq
    sudo apt-get install -y sshpass
fi

echo "🔐 Copiando clave SSH al servidor..."
cat ~/.ssh/id_ed25519.pub | \
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no \
  "$SERVER" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

echo "✅ Clave SSH copiada"
echo ""

echo "🧪 Probando conexión SSH..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$SERVER" "echo '✅ Conexión exitosa'"

echo ""
echo "🚀 Haciendo push a producción..."
cd "$(dirname "$0")/.."
git push production main

echo ""
echo "✅ ¡Push completado exitosamente!"

