#!/bin/bash
# Script de diagnóstico para el servidor
# Ejecutar en el servidor: bash diagnostico-servidor.sh

APP_DIR="/var/www/emerges-tes"
GIT_DIR="/var/repos/emerges-tes.git"
LOG_FILE="/var/log/emerges-tes-deploy.log"

echo "🔍 DIAGNÓSTICO DEL SERVIDOR"
echo "============================"
echo ""

# 1. Verificar Node.js y npm
echo "1️⃣  Node.js y npm:"
if command -v node >/dev/null 2>&1; then
    echo "   ✅ Node.js: $(node --version)"
else
    echo "   ❌ Node.js NO está instalado"
    echo "   💡 Instalar con: curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs"
fi

if command -v npm >/dev/null 2>&1; then
    echo "   ✅ npm: $(npm --version)"
else
    echo "   ❌ npm NO está instalado"
fi
echo ""

# 2. Verificar directorio de trabajo
echo "2️⃣  Directorio de trabajo ($APP_DIR):"
if [ -d "$APP_DIR" ]; then
    echo "   ✅ Directorio existe"
    cd "$APP_DIR"
    
    if [ -d ".git" ]; then
        echo "   ✅ Es un repositorio Git"
        echo "   📍 Rama: $(git branch --show-current 2>/dev/null || echo 'desconocida')"
        echo "   🔗 Remoto: $(git remote get-url origin 2>/dev/null || echo 'no configurado')"
        
        # Verificar si está actualizado
        git fetch origin main 2>/dev/null || echo "   ⚠️  No se pudo hacer fetch"
        LOCAL=$(git rev-parse HEAD 2>/dev/null || echo "desconocido")
        REMOTE=$(git rev-parse origin/main 2>/dev/null || echo "desconocido")
        echo "   📦 Commit local: ${LOCAL:0:7}"
        echo "   📦 Commit remoto: ${REMOTE:0:7}"
        
        if [ "$LOCAL" != "$REMOTE" ] && [ "$REMOTE" != "desconocido" ]; then
            echo "   ⚠️  El directorio NO está actualizado con el repositorio"
        else
            echo "   ✅ Directorio actualizado"
        fi
    else
        echo "   ❌ NO es un repositorio Git"
    fi
    
    # Verificar package.json
    if [ -f "package.json" ]; then
        echo "   ✅ package.json existe"
    else
        echo "   ❌ package.json NO existe"
    fi
    
    # Verificar node_modules
    if [ -d "node_modules" ]; then
        echo "   ✅ node_modules existe"
    else
        echo "   ⚠️  node_modules NO existe (necesita npm install)"
    fi
    
    # Verificar dist/
    if [ -d "dist" ]; then
        echo "   ✅ dist/ existe"
        echo "   📁 Archivos en dist/: $(ls -1 dist/ 2>/dev/null | wc -l)"
    else
        echo "   ❌ dist/ NO existe (necesita npm run build)"
    fi
else
    echo "   ❌ Directorio NO existe"
fi
echo ""

# 3. Verificar hook
echo "3️⃣  Hook post-receive:"
HOOK_FILE="$GIT_DIR/hooks/post-receive"
if [ -f "$HOOK_FILE" ]; then
    if [ -x "$HOOK_FILE" ]; then
        echo "   ✅ Hook existe y es ejecutable"
    else
        echo "   ⚠️  Hook existe pero NO es ejecutable"
        echo "   💡 Ejecutar: chmod +x $HOOK_FILE"
    fi
else
    echo "   ❌ Hook NO existe"
fi
echo ""

# 4. Verificar logs
echo "4️⃣  Logs:"
if [ -f "$LOG_FILE" ]; then
    if [ -r "$LOG_FILE" ]; then
        echo "   ✅ Archivo de logs existe"
        if [ -s "$LOG_FILE" ]; then
            echo "   📋 Últimas 10 líneas del log:"
            tail -n 10 "$LOG_FILE" | sed 's/^/      /'
        else
            echo "   ⚠️  Archivo de logs está vacío (nunca se ha ejecutado el hook)"
        fi
    else
        echo "   ⚠️  Archivo de logs existe pero NO es legible"
    fi
else
    echo "   ⚠️  Archivo de logs NO existe"
    echo "   💡 Crear con: touch $LOG_FILE && chmod 666 $LOG_FILE"
fi
echo ""

# 5. Recomendaciones
echo "💡 RECOMENDACIONES:"
echo ""

if [ ! -d "$APP_DIR/dist" ]; then
    echo "   🔨 Hacer despliegue manual para probar:"
    echo "      cd $APP_DIR"
    echo "      git pull origin main"
    echo "      npm install"
    echo "      npm run build"
    echo ""
fi

if ! command -v node >/dev/null 2>&1; then
    echo "   📦 Instalar Node.js primero"
    echo ""
fi

echo "   🧪 Para probar el despliegue automático:"
echo "      Desde tu máquina local: git push production main"
echo "      Luego ver logs: tail -f $LOG_FILE"
echo ""

