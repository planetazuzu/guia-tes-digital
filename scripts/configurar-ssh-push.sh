#!/bin/bash

# Script para configurar SSH y hacer push a producción
# Uso: ./scripts/configurar-ssh-push.sh

set -e

echo "🔐 Configuración de SSH para Push a Producción"
echo "================================================"
echo ""

# Verificar si ya existe una clave SSH
if [ -f ~/.ssh/id_ed25519 ] || [ -f ~/.ssh/id_rsa ]; then
    echo "✅ Ya existe una clave SSH"
    if [ -f ~/.ssh/id_ed25519 ]; then
        KEY_FILE=~/.ssh/id_ed25519.pub
    else
        KEY_FILE=~/.ssh/id_rsa.pub
    fi
    echo "📋 Clave pública: $KEY_FILE"
    echo ""
    echo "¿Quieres copiar esta clave al servidor? (s/n)"
    read -r response
    if [[ "$response" =~ ^[Ss]$ ]]; then
        echo "Copiando clave al servidor..."
        ssh-copy-id -i "$KEY_FILE" root@207.180.226.141 || {
            echo "⚠️  No se pudo copiar automáticamente. Copia manualmente:"
            echo ""
            echo "cat $KEY_FILE | ssh root@207.180.226.141 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'"
            echo ""
        }
    fi
else
    echo "📝 No hay clave SSH. Generando nueva clave..."
    echo ""
    echo "¿Generar nueva clave SSH? (s/n)"
    read -r response
    if [[ "$response" =~ ^[Ss]$ ]]; then
        ssh-keygen -t ed25519 -C "guia-tes-$(date +%Y%m%d)" -f ~/.ssh/id_ed25519
        echo ""
        echo "✅ Clave generada. Copiando al servidor..."
        ssh-copy-id -i ~/.ssh/id_ed25519.pub root@207.180.226.141 || {
            echo "⚠️  No se pudo copiar automáticamente. Copia manualmente:"
            echo ""
            echo "cat ~/.ssh/id_ed25519.pub | ssh root@207.180.226.141 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'"
            echo ""
        }
    fi
fi

echo ""
echo "🧪 Probando conexión SSH..."
if ssh -o BatchMode=yes -o ConnectTimeout=5 root@207.180.226.141 "echo 'Conexión exitosa'" 2>/dev/null; then
    echo "✅ Conexión SSH exitosa"
    echo ""
    echo "🚀 Haciendo push a producción..."
    cd "$(dirname "$0")/.."
    git push production main
    echo ""
    echo "✅ Push completado exitosamente"
else
    echo "❌ La conexión SSH aún no está configurada"
    echo ""
    echo "Opciones:"
    echo "1. Copiar manualmente tu clave pública al servidor"
    echo "2. Usar autenticación por contraseña (menos seguro)"
    echo ""
    echo "Para opción 1, ejecuta:"
    echo "  cat ~/.ssh/id_ed25519.pub | ssh root@207.180.226.141 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'"
    echo ""
    echo "Para opción 2, ejecuta:"
    echo "  GIT_SSH_COMMAND='ssh -o PreferredAuthentications=password' git push production main"
fi

