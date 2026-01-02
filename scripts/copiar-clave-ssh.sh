#!/bin/bash
# Script para copiar clave SSH al servidor
# Uso: ./scripts/copiar-clave-ssh.sh

PASSWORD="941259018a"
SERVER="root@207.180.226.141"

echo "🔐 Copiando clave SSH al servidor..."

# Método usando ssh con redirección
cat ~/.ssh/id_ed25519.pub | \
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no \
  "$SERVER" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo '✅ Clave copiada exitosamente'"

if [ $? -eq 0 ]; then
    echo "✅ Clave SSH copiada correctamente"
    echo ""
    echo "🧪 Probando conexión..."
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$SERVER" "echo '✅ Conexión SSH exitosa'"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🚀 Haciendo push a producción..."
        cd "$(dirname "$0")/.."
        git push production main
    fi
else
    echo "❌ Error al copiar la clave"
    echo ""
    echo "Instala sshpass manualmente:"
    echo "  sudo apt-get install sshpass"
    echo ""
    echo "O copia la clave manualmente:"
    echo "  cat ~/.ssh/id_ed25519.pub | ssh root@207.180.226.141 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'"
fi

