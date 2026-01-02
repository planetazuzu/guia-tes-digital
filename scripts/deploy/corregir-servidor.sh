#!/bin/bash
# Script de corrección rápida para el servidor
# Ejecutar en el servidor: bash corregir-servidor.sh

APP_DIR="/var/www/emerges-tes"
GIT_DIR="/var/repos/emerges-tes.git"
LOG_FILE="/var/log/emerges-tes-deploy.log"

echo "🔧 Corrigiendo configuración..."
echo ""

# 1. Corregir archivo de logs (quitar tilde si existe)
echo "1️⃣  Corrigiendo archivo de logs..."
touch "$LOG_FILE"
chmod 666 "$LOG_FILE" 2>/dev/null || sudo chmod 666 "$LOG_FILE"
echo "   ✅ Logs configurados: $LOG_FILE"

# 2. Verificar que el directorio de trabajo es un repositorio Git
echo ""
echo "2️⃣  Verificando directorio de trabajo..."
if [ -d "$APP_DIR" ]; then
    if [ ! -d "$APP_DIR/.git" ]; then
        echo "   ⚠️  Directorio existe pero no es un repositorio Git"
        echo "   🔧 Inicializando repositorio..."
        cd "$APP_DIR"
        git init
        git remote add origin "$GIT_DIR" 2>/dev/null || git remote set-url origin "$GIT_DIR"
        git fetch origin
        git checkout -b main origin/main 2>/dev/null || {
            echo "   ⚠️  No se pudo hacer checkout automático"
            echo "   💡 Ejecutar manualmente: cd $APP_DIR && git pull origin main"
        }
        echo "   ✅ Repositorio inicializado"
    else
        echo "   ✅ Directorio ya es un repositorio Git"
        cd "$APP_DIR"
        echo "   📍 Rama actual: $(git branch --show-current 2>/dev/null || echo 'desconocida')"
        
        # Asegurar que el remoto está configurado
        if ! git remote get-url origin >/dev/null 2>&1; then
            echo "   🔧 Configurando remoto..."
            git remote add origin "$GIT_DIR"
        fi
    fi
else
    echo "   ❌ Directorio no existe"
    exit 1
fi

# 3. Verificar hook
echo ""
echo "3️⃣  Verificando hook..."
HOOK_FILE="$GIT_DIR/hooks/post-receive"
if [ -f "$HOOK_FILE" ]; then
    if [ -x "$HOOK_FILE" ]; then
        echo "   ✅ Hook existe y es ejecutable"
    else
        echo "   ⚠️  Hook no es ejecutable. Corrigiendo..."
        chmod +x "$HOOK_FILE"
        echo "   ✅ Permisos corregidos"
    fi
else
    echo "   ❌ Hook no existe. Crear primero."
fi

echo ""
echo "✅ Corrección completada"
echo ""
echo "📋 Estado actual:"
echo "   - Directorio: $APP_DIR"
echo "   - Logs: $LOG_FILE"
echo "   - Hook: $HOOK_FILE"
echo ""
echo "🧪 Próximos pasos:"
echo "   1. Desde tu MÁQUINA LOCAL (no desde el servidor):"
echo "      cd /home/planetazuzu/guia-tes"
echo "      git push production main"
echo ""
echo "   2. En el SERVIDOR, ver logs:"
echo "      tail -f $LOG_FILE"

