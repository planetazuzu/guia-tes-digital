# 🚀 COMANDOS EXACTOS PARA CONFIGURAR DESPLIEGUE

## 📋 CONFIGURACIÓN INICIAL (Ejecutar en el servidor)

### Paso 1: Conectarse al servidor

```bash
ssh root@207.180.226.141
```

### Paso 2: Crear el hook post-receive

```bash
# Variables
GIT_DIR="/var/repos/emerges-tes.git"
APP_DIR="/var/www/emerges-tes"
HOOK_FILE="$GIT_DIR/hooks/post-receive"
LOG_FILE="/var/log/emerges-tes-deploy.log"

# Crear el hook
cat > "$HOOK_FILE" << 'HOOK_EOF'
#!/bin/bash
set -e

APP_DIR="/var/www/emerges-tes"
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

# Dar permisos de ejecución
chmod +x "$HOOK_FILE"

# Verificar
ls -la "$HOOK_FILE"
```

### Paso 3: Configurar directorio de trabajo

```bash
# Si el directorio no existe, crearlo
if [ ! -d "$APP_DIR" ]; then
    mkdir -p "$APP_DIR"
fi

# Si no tiene .git, clonar el repositorio
if [ ! -d "$APP_DIR/.git" ]; then
    git clone "$GIT_DIR" "$APP_DIR"
fi
```

### Paso 4: Crear archivo de logs

```bash
# Crear archivo de logs
touch "$LOG_FILE"
chmod 666 "$LOG_FILE"

# Verificar
ls -la "$LOG_FILE"
```

### Paso 5: Verificar Node.js (si no está instalado)

```bash
# Verificar si Node.js está instalado
node --version || {
    echo "⚠️  Node.js no está instalado. Instalando..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    node --version
    npm --version
}
```

---

## 🧪 PROBAR EL DESPLIEGUE

### Desde tu máquina local:

```bash
cd /home/planetazuzu/guia-tes

# Hacer un cambio de prueba
echo "# Test deploy $(date)" >> README.md
git add README.md
git commit -m "test: probar despliegue automático"

# Push (esto activará el hook automáticamente)
git push production main
```

### En el servidor, ver logs:

```bash
# Ver logs en tiempo real
tail -f /var/log/emerges-tes-deploy.log
```

### Verificar build:

```bash
# Verificar que dist/ existe
ls -la /var/www/emerges-tes/dist/

# Ver contenido
ls -la /var/www/emerges-tes/dist/assets/ 2>/dev/null | head -10
```

---

## ✅ VERIFICACIÓN COMPLETA

Ejecutar en el servidor:

```bash
# 1. Hook existe y es ejecutable
test -x /var/repos/emerges-tes.git/hooks/post-receive && echo "✅ Hook OK" || echo "❌ Hook no ejecutable"

# 2. Directorio de trabajo existe
test -d /var/www/emerges-tes && echo "✅ Directorio OK" || echo "❌ Directorio no existe"

# 3. Logs se pueden escribir
test -w /var/log/emerges-tes-deploy.log && echo "✅ Logs OK" || echo "❌ Logs no escribibles"

# 4. Node.js instalado
command -v node >/dev/null && echo "✅ Node.js: $(node --version)" || echo "❌ Node.js no instalado"

# 5. npm instalado
command -v npm >/dev/null && echo "✅ npm: $(npm --version)" || echo "❌ npm no instalado"
```

---

## 🔍 TROUBLESHOOTING RÁPIDO

### El hook no se ejecuta

```bash
# Verificar permisos
ls -la /var/repos/emerges-tes.git/hooks/post-receive

# Debe mostrar: -rwxr-xr-x
# Si no, ejecutar:
chmod +x /var/repos/emerges-tes.git/hooks/post-receive
```

### Ver logs de errores

```bash
# Ver últimos 100 líneas
tail -n 100 /var/log/emerges-tes-deploy.log

# Buscar errores
grep -i error /var/log/emerges-tes-deploy.log

# Ver todo el log
cat /var/log/emerges-tes-deploy.log
```

### Probar manualmente

```bash
# Desde el servidor, probar el proceso manualmente
cd /var/www/emerges-tes
git pull origin main
npm install
npm run build

# Verificar resultado
ls -la dist/
```

---

## 📊 ESTRUCTURA FINAL

```
/var/repos/emerges-tes.git/          # Repositorio bare
└── hooks/
    └── post-receive                 # Hook (ejecutable)

/var/www/emerges-tes/                # Directorio de trabajo
├── .git/                            # Clon del repositorio
├── src/                             # Código fuente
├── dist/                            # Build de producción (generado)
└── node_modules/                    # Dependencias (generado)

/var/log/emerges-tes-deploy.log      # Logs de despliegue
```

---

**✅ Listo para usar**

Cada `git push production main` desde local actualizará automáticamente la app en el servidor.

