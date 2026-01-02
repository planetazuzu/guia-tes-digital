#!/bin/bash
# Script para configurar el sistema de despliegue automático
# Ejecutar en el servidor: sudo ./setup-deploy.sh

set -e

APP_DIR="/var/www/emerges-tes"
GIT_DIR="/var/repos/emerges-tes.git"
HOOK_FILE="$GIT_DIR/hooks/post-receive"
LOG_FILE="/var/log/emerges-tes-deploy.log"

echo "🔧 Configurando sistema de despliegue automático..."
echo ""

# Verificar que el repositorio bare existe
if [ ! -d "$GIT_DIR" ]; then
    echo "❌ ERROR: El repositorio bare no existe en $GIT_DIR"
    echo "   Créalo primero con: git init --bare $GIT_DIR"
    exit 1
fi

# Verificar que el directorio de trabajo existe
if [ ! -d "$APP_DIR" ]; then
    echo "📁 Creando directorio de trabajo: $APP_DIR"
    sudo mkdir -p "$APP_DIR"
    sudo chown -R $USER:$USER "$APP_DIR" || {
        echo "⚠️  No se pudo cambiar propietario. Asegúrate de tener permisos."
    }
fi

# Si el directorio está vacío, clonar el repositorio
if [ ! -d "$APP_DIR/.git" ]; then
    echo "📥 Clonando repositorio en $APP_DIR..."
    git clone "$GIT_DIR" "$APP_DIR" || {
        echo "❌ ERROR: No se pudo clonar el repositorio"
        exit 1
    }
fi

# Crear el hook post-receive
echo "📝 Creando hook post-receive..."

# Copiar el hook desde el proyecto local (si existe)
if [ -f "scripts/deploy/post-receive" ]; then
    sudo cp "scripts/deploy/post-receive" "$HOOK_FILE"
else
    # Si no existe, crear directamente
    sudo tee "$HOOK_FILE" > /dev/null << 'HOOK_EOF'
#!/bin/bash
# Hook post-receive para despliegue automático
# Ubicación: /var/repos/emerges-tes.git/hooks/post-receive

set -e

APP_DIR="/var/www/emerges-tes"
GIT_DIR="/var/repos/emerges-tes.git"
BRANCH="main"
LOG_FILE="/var/log/emerges-tes-deploy.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=========================================="
log "🚀 Iniciando despliegue automático"
log "=========================================="

while read oldrev newrev refname; do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)
    
    if [ "$branch" = "$BRANCH" ]; then
        log "📦 Actualizando rama: $branch"
        log "   Commit anterior: $oldrev"
        log "   Commit nuevo: $newrev"
        
        if [ ! -d "$APP_DIR" ]; then
            log "❌ ERROR: Directorio $APP_DIR no existe"
            exit 1
        fi
        
        cd "$APP_DIR" || {
            log "❌ ERROR: No se puede acceder a $APP_DIR"
            exit 1
        }
        
        log "📥 Obteniendo cambios del repositorio..."
        git fetch origin "$BRANCH" || {
            log "❌ ERROR: Fallo al hacer fetch"
            exit 1
        }
        
        log "🔄 Haciendo checkout limpio..."
        git reset --hard "origin/$BRANCH" || {
            log "❌ ERROR: Fallo al hacer reset"
            exit 1
        }
        
        log "🧹 Limpiando archivos no rastreados..."
        git clean -fd || {
            log "⚠️  ADVERTENCIA: Fallo al limpiar archivos"
        }
        
        log "📦 Instalando dependencias (npm install)..."
        if ! npm install --production=false 2>&1 | tee -a "$LOG_FILE"; then
            log "❌ ERROR: Fallo al instalar dependencias"
            exit 1
        fi
        log "✅ Dependencias instaladas correctamente"
        
        log "🔨 Construyendo aplicación (npm run build)..."
        if ! npm run build 2>&1 | tee -a "$LOG_FILE"; then
            log "❌ ERROR: Fallo al construir la aplicación"
            exit 1
        fi
        log "✅ Build completado correctamente"
        
        if [ ! -d "$APP_DIR/dist" ]; then
            log "❌ ERROR: El directorio dist/ no existe después del build"
            exit 1
        fi
        
        log "✅ Despliegue completado exitosamente"
        log "   Aplicación disponible en: $APP_DIR/dist"
        log "=========================================="
        
        exit 0
    else
        log "⏭️  Ignorando push en rama: $branch (solo se despliega $BRANCH)"
    fi
done

log "⚠️  No se procesó ningún cambio"
exit 0
HOOK_EOF
fi

# Dar permisos de ejecución al hook
echo "🔐 Configurando permisos..."
sudo chmod +x "$HOOK_FILE"
sudo chown $USER:$USER "$HOOK_FILE" 2>/dev/null || true

# Crear directorio de logs si no existe
echo "📋 Configurando logs..."
sudo touch "$LOG_FILE"
sudo chmod 666 "$LOG_FILE" 2>/dev/null || sudo chmod 644 "$LOG_FILE"

echo ""
echo "✅ Configuración completada"
echo ""
echo "📋 Resumen:"
echo "   - Hook: $HOOK_FILE"
echo "   - Directorio app: $APP_DIR"
echo "   - Logs: $LOG_FILE"
echo ""
echo "🧪 Para probar el despliegue:"
echo "   1. Desde tu máquina local: git push production main"
echo "   2. Ver logs: tail -f $LOG_FILE"
echo ""

