#!/bin/bash
# Script para verificar y corregir la configuración en el servidor
# Ejecutar en el servidor: bash verificar-servidor.sh

set -e

GIT_DIR="/var/repos/emerges-tes.git"
APP_DIR="/var/www/emerges-tes"
HOOK_FILE="$GIT_DIR/hooks/post-receive"
LOG_FILE="/var/log/emerges-tes-deploy.log"

echo "🔍 Verificando configuración del despliegue..."
echo ""

# 1. Verificar hook
echo "1️⃣  Verificando hook post-receive..."
if [ -f "$HOOK_FILE" ]; then
    if [ -x "$HOOK_FILE" ]; then
        echo "   ✅ Hook existe y es ejecutable"
    else
        echo "   ⚠️  Hook existe pero no es ejecutable. Corrigiendo..."
        chmod +x "$HOOK_FILE"
        echo "   ✅ Permisos corregidos"
    fi
else
    echo "   ❌ Hook no existe. Crear primero con los comandos de configuración."
    exit 1
fi

# 2. Verificar directorio de trabajo
echo ""
echo "2️⃣  Verificando directorio de trabajo..."
if [ -d "$APP_DIR" ]; then
    if [ -d "$APP_DIR/.git" ]; then
        echo "   ✅ Directorio existe y es un repositorio Git"
        echo "   📍 Rama actual: $(cd "$APP_DIR" && git branch --show-current 2>/dev/null || echo 'desconocida')"
    else
        echo "   ⚠️  Directorio existe pero no es un repositorio Git"
        echo "   🔧 Inicializando repositorio..."
        cd "$APP_DIR"
        git init
        git remote add origin "$GIT_DIR" 2>/dev/null || git remote set-url origin "$GIT_DIR"
        git fetch origin
        git checkout -b main origin/main 2>/dev/null || git checkout main 2>/dev/null || echo "   ⚠️  No se pudo hacer checkout automático"
        echo "   ✅ Repositorio inicializado"
    fi
else
    echo "   ❌ Directorio no existe. Creando..."
    mkdir -p "$APP_DIR"
    git clone "$GIT_DIR" "$APP_DIR"
    echo "   ✅ Directorio creado y clonado"
fi

# 3. Verificar logs
echo ""
echo "3️⃣  Verificando archivo de logs..."
if [ -f "$LOG_FILE" ]; then
    if [ -w "$LOG_FILE" ]; then
        echo "   ✅ Archivo de logs existe y es escribible"
    else
        echo "   ⚠️  Archivo de logs existe pero no es escribible. Corrigiendo..."
        chmod 666 "$LOG_FILE" 2>/dev/null || sudo chmod 666 "$LOG_FILE"
        echo "   ✅ Permisos corregidos"
    fi
else
    echo "   ⚠️  Archivo de logs no existe. Creando..."
    touch "$LOG_FILE"
    chmod 666 "$LOG_FILE" 2>/dev/null || sudo chmod 666 "$LOG_FILE"
    echo "   ✅ Archivo de logs creado"
fi

# 4. Verificar Node.js y npm
echo ""
echo "4️⃣  Verificando Node.js y npm..."
if command -v node >/dev/null 2>&1; then
    echo "   ✅ Node.js: $(node --version)"
else
    echo "   ❌ Node.js no está instalado"
    echo "   💡 Instalar con: curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs"
fi

if command -v npm >/dev/null 2>&1; then
    echo "   ✅ npm: $(npm --version)"
else
    echo "   ❌ npm no está instalado"
fi

# 5. Verificar que el directorio de trabajo está actualizado
echo ""
echo "5️⃣  Verificando estado del repositorio..."
if [ -d "$APP_DIR/.git" ]; then
    cd "$APP_DIR"
    echo "   📍 Directorio: $APP_DIR"
    echo "   📦 Rama: $(git branch --show-current 2>/dev/null || echo 'desconocida')"
    echo "   🔗 Remoto: $(git remote get-url origin 2>/dev/null || echo 'no configurado')"
    
    # Verificar si hay cambios pendientes
    if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
        echo "   ⚠️  Hay cambios no commiteados en el directorio de trabajo"
    else
        echo "   ✅ Directorio de trabajo limpio"
    fi
fi

echo ""
echo "✅ Verificación completada"
echo ""
echo "📋 Resumen:"
echo "   - Hook: $HOOK_FILE"
echo "   - Directorio app: $APP_DIR"
echo "   - Logs: $LOG_FILE"
echo ""
echo "🧪 Para probar el despliegue:"
echo "   1. Desde tu máquina local: git push production main"
echo "   2. En el servidor, ver logs: tail -f $LOG_FILE"

