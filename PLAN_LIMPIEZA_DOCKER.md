# 📁 PLAN DE LIMPIEZA Y OPTIMIZACIÓN DEL PROYECTO (Docker)

**Proyecto:** EMERGES TES - Protocolo Rápido  
**Base:** React 18 + TypeScript + Vite + TailwindCSS + **Docker**  
**Fecha:** 2024-12-19  
**Ruta:** `/home/planetazuzu/protocolo-r-pido`

---

## 🎯 OBJETIVOS DE LIMPIEZA

- ✅ Eliminar archivos innecesarios (backups, duplicados, obsoletos)
- ✅ Optimizar estructura (organizar recursos pendientes)
- ✅ Reducir tamaño del proyecto sin afectar funcionalidad
- ✅ Mantener integridad de la aplicación PWA
- ✅ Consolidar documentación redundante
- ✅ **Optimizar para despliegue con Docker**

---

## 🐳 DESPLIEGUE CON DOCKER (Nuevo)

### Configuración Docker Creada

- ✅ `Dockerfile` - Multi-stage build optimizado
- ✅ `docker-compose.yml` - Gestión simplificada
- ✅ `deploy-docker.sh` - Script de despliegue
- ✅ `.dockerignore` - Optimización de build
- ✅ `.github/workflows/deploy-docker.yml` - Auto-deploy
- ✅ `DEPLOYMENT_DOCKER.md` - Documentación completa

### Ventajas de Docker

- ✅ **Aislamiento:** App corre en su propio contenedor
- ✅ **Consistencia:** Mismo entorno en dev y producción
- ✅ **Fácil despliegue:** Un solo comando
- ✅ **Rollback fácil:** Volver a imagen anterior
- ✅ **Sin dependencias:** No requiere Node.js en servidor

---

## 📂 ESTRUCTURA ACTUAL PARA LIMPIEZA

### 1. 📦 ARCHIVOS DEL SISTEMA Y TEMPORALES (ELIMINAR)

```bash
# Archivos del sistema operativo
find . -type f -name ".DS_Store" -delete
find . -type f -name "Thumbs.db" -delete
find . -type f -name ".localized" -delete
find . -type f -name "*.swp" -delete  # Vim swap files
find . -type f -name "*.swo" -delete

# Logs de npm/yarn
find . -type f -name "npm-debug.log*" -delete
find . -type f -name "yarn-debug.log*" -delete
find . -type f -name "yarn-error.log*" -delete

# Archivos de IDE (pero mantener .vscode/extensions.json si existe)
rm -rf .idea/
rm -rf *.iml
rm -rf *.sublime-*
```

### 2. 🗑️ CARPETAS DE BACKUP Y REDUNDANTES (MOVER/ELIMINAR)

#### Carpeta principal a limpiar: `_BACKUP_MD/` (203 archivos)

```bash
# Crear carpeta de archivos eliminados (por si acaso)
mkdir -p ../deleted_backups_$(date +%Y%m%d)

# Mover archivos .md duplicados (ya existen en public/manual/)
find _BACKUP_MD/ -name "*.md" -exec mv {} ../deleted_backups_$(date +%Y%m%d)/ \;

# Mover archivos .docx (no necesarios en producción)
find _BACKUP_MD/ -name "*.docx" -exec mv {} ../deleted_backups_$(date +%Y%m%d)/ \;

# Mover scripts Python de backup
find _BACKUP_MD/ -name "*.py" -exec mv {} ../deleted_backups_$(date +%Y%m%d)/ \;

# Finalmente eliminar carpeta vacía
rmdir _BACKUP_MD/
```

#### Carpeta: `imagenes-pendientes/` (60 archivos)

```bash
# Verificar qué imágenes son realmente necesarias
echo "=== IMÁGENES PENDIENTES ==="
find imagenes-pendientes/ -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) | wc -l

# Mover imágenes que coinciden con nombres existentes en public/assets/
for img in imagenes-pendientes/*; do
  base=$(basename "$img")
  if [ ! -f "public/assets/infografias/$base" ]; then
    echo "Manteniendo pendiente: $base"
  else
    echo "Duplicado, moviendo: $base"
    mv "$img" ../deleted_backups_$(date +%Y%m%d)/
  fi
done

# Si la carpeta queda vacía, eliminar
rmdir imagenes-pendientes/ 2>/dev/null || echo "Carpeta con archivos restantes"
```

#### Carpeta: `MANUAL_TES_DIGITAL/` (110 archivos .md)

```bash
# Esta carpeta parece duplicado de public/manual/
# Mover fuera del proyecto
mv MANUAL_TES_DIGITAL/ ../backup_manual_completo_$(date +%Y%m%d)/
```

### 3. 📝 DOCUMENTACIÓN REDUNDANTE (CONSOLIDAR)

```bash
# Crear carpeta organizada para documentación
mkdir -p docs/consolidated/
mkdir -p docs/archive/

# Archivos de deployment a mantener:
# - DEPLOYMENT_DOCKER.md (NUEVO - Docker)
# - DEPLOYMENT_SERVER.md (PM2)
# - VERCEL_DEPLOYMENT.md
# - DEPLOYMENT_GITHUB.md
# - RESUMEN_DEPLOY_8607.md

# Archivos de desarrollo a mantener:
# - ESTADO_FUNCIONALIDADES.md
# - SPA_ROUTING_CONFIG.md
# - CHECKLIST_PWA_COMPLETA.md
# - VERIFICACION_PWA.md

# Mover el resto a archive
find . -maxdepth 1 -name "*.md" ! -name "README.md" ! -name "DEPLOYMENT_*.md" ! -name "RESUMEN_*.md" ! -name "ESTADO_*.md" ! -name "SPA_*.md" ! -name "CHECKLIST_*.md" ! -name "VERIFICACION_*.md" -exec mv {} docs/archive/ \;
```

### 4. 🐍 SCRIPTS PYTHON OBSOLETOS

```bash
# Crear carpeta para scripts de mantenimiento
mkdir -p scripts/maintenance/
mkdir -p scripts/archive/

# Scripts que SÍ deben mantenerse (útiles):
# - scripts/verificar-manual.ts (TypeScript)

# Mover scripts obsoletos a archive
mv analisis_profundo_contenido.py scripts/archive/ 2>/dev/null || true
mv buscar_multimedia_exhaustivo.py scripts/archive/ 2>/dev/null || true
mv copiar_archivos_manual.py scripts/archive/ 2>/dev/null || true
mv generar_documento_word.py scripts/archive/ 2>/dev/null || true
mv generar_reportes_app.py scripts/archive/ 2>/dev/null || true
mv mejorar_reporte_1.py scripts/archive/ 2>/dev/null || true
mv reorganizar_proyecto.sh scripts/archive/ 2>/dev/null || true
```

### 5. ⚙️ CONFIGURACIONES DE DESPLIEGUE

#### Con Docker (NUEVO - Mantener)

```bash
# Configuraciones Docker a MANTENER:
# - Dockerfile ✅
# - docker-compose.yml ✅
# - deploy-docker.sh ✅
# - .dockerignore ✅
# - .github/workflows/deploy-docker.yml ✅
```

#### Sin Docker (Opcional - Mover a backup)

```bash
# Configuraciones a MOVER a backup (pero mantener en repo):
mkdir -p configs/backup/

# PM2 (alternativa a Docker)
# - ecosystem.config.js (mantener por si acaso)
# - deploy.sh (mantener por si acaso)

# Otras plataformas (mover a backup)
mv vercel.json configs/backup/ 2>/dev/null || true
mv netlify.toml configs/backup/ 2>/dev/null || true
mv nginx.conf.example configs/backup/ 2>/dev/null || true
mv public/.htaccess configs/backup/ 2>/dev/null || true
mv public/_redirects configs/backup/ 2>/dev/null || true
```

### 6. 🗂️ OPTIMIZAR ESTRUCTURA DE ARCHIVOS

```bash
# 1. Limpiar node_modules (se reinstalarán en Docker build)
rm -rf node_modules
rm -f package-lock.json

# 2. Verificar archivos grandes
find . -type f -size +5M 2>/dev/null | head -10

# 3. Limpiar posibles builds anteriores
rm -rf dist/
rm -rf build/
rm -rf .next/
rm -rf out/

# 4. Limpiar imágenes Docker antiguas (opcional)
docker system prune -a --volumes 2>/dev/null || true
```

---

## 📋 SCRIPT COMPLETO DE LIMPIEZA (Docker)

```bash
#!/bin/bash
# cleanup_project_docker.sh

set -e  # Detenerse en errores

echo "🚀 INICIANDO LIMPIEZA DEL PROYECTO (Docker)"
echo "==========================================="

# 1. Backup del estado actual
BACKUP_DIR="../project_backup_$(date +%Y%m%d_%H%M%S)"
echo "📦 Creando backup en: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/project_backup.tar.gz" . --exclude='node_modules' --exclude='dist' --exclude='.git'

# 2. Archivos del sistema
echo "🗑️  Limpiando archivos del sistema..."
find . -type f \( -name ".DS_Store" -o -name "Thumbs.db" -o -name "*.swp" -o -name "*.swo" \) -delete

# 3. Logs
echo "📝 Eliminando logs..."
find . -type f -name "*.log" -delete

# 4. Carpetas de backup grandes
if [ -d "_BACKUP_MD" ]; then
    echo "📚 Manejando _BACKUP_MD..."
    mkdir -p "$BACKUP_DIR/backup_md"
    mv _BACKUP_MD/* "$BACKUP_DIR/backup_md/" 2>/dev/null || true
    rmdir _BACKUP_MD 2>/dev/null || true
fi

# 5. Manual duplicado
if [ -d "MANUAL_TES_DIGITAL" ]; then
    echo "📖 Manejando manual duplicado..."
    mv MANUAL_TES_DIGITAL "$BACKUP_DIR/"
fi

# 6. Imágenes pendientes (solo mover duplicados)
if [ -d "imagenes-pendientes" ]; then
    echo "🖼️  Procesando imágenes pendientes..."
    mkdir -p "$BACKUP_DIR/imagenes_pendientes"
    for img in imagenes-pendientes/*; do
        if [ -f "$img" ]; then
            base=$(basename "$img")
            if [ -f "public/assets/infografias/$base" ]; then
                mv "$img" "$BACKUP_DIR/imagenes_pendientes/"
            fi
        fi
    done
fi

# 7. Limpiar node_modules (Docker los instalará)
echo "📦 Limpiando dependencias locales..."
rm -rf node_modules
rm -f package-lock.json

# 8. Limpiar builds anteriores
echo "🏗️  Limpiando builds anteriores..."
rm -rf dist/ build/ .next/ out/

# 9. Organizar documentación
echo "📄 Organizando documentación..."
mkdir -p docs/consolidated
mkdir -p docs/archive

# Mover archivos .md a archive (excepto esenciales)
find . -maxdepth 1 -name "*.md" ! -name "README.md" ! -name "DEPLOYMENT_*.md" ! -name "RESUMEN_*.md" ! -name "ESTADO_*.md" ! -name "SPA_*.md" ! -name "CHECKLIST_*.md" ! -name "VERIFICACION_*.md" -exec mv {} docs/archive/ \;

# 10. Scripts de mantenimiento
echo "🐍 Organizando scripts..."
mkdir -p scripts/archive
mv *.py scripts/archive/ 2>/dev/null || true
mv *.sh scripts/archive/ 2>/dev/null || true

# Mantener scripts esenciales en su lugar
if [ -f "scripts/verificar-manual.ts" ]; then
    mv scripts/archive/verificar-manual.ts scripts/ 2>/dev/null || true
fi

# Mantener scripts de deploy
if [ -f "deploy-docker.sh" ]; then
    mv scripts/archive/deploy-docker.sh . 2>/dev/null || true
fi

# 11. Verificar Docker
echo "🐳 Verificando Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker instalado"
    docker --version
else
    echo "⚠️  Docker no instalado (opcional para desarrollo local)"
fi

echo "✅ LIMPIEZA COMPLETADA"
echo "======================"
echo "Espacio liberado aproximado:"
du -sh . "$BACKUP_DIR"
echo ""
echo "🎯 Proyecto listo para desarrollo con Docker"
echo ""
echo "📝 Próximos pasos:"
echo "   1. docker-compose up -d --build  (construir y ejecutar)"
echo "   2. docker-compose logs -f        (ver logs)"
echo "   3. ./deploy-docker.sh            (deploy completo)"
```

---

## 🔍 VERIFICACIÓN POST-LIMPIEZA (Docker)

```bash
# 1. Verificar que Docker funciona
docker --version
docker compose version

# 2. Construir imagen Docker
docker-compose build

# 3. Verificar que la imagen se construyó
docker images | grep emerges-tes

# 4. Ejecutar contenedor
docker-compose up -d

# 5. Verificar que la app funciona
curl http://localhost:8607

# 6. Ver logs
docker-compose logs -f

# 7. Verificar tamaño del proyecto
du -sh .  # Debería ser < 100MB (sin node_modules)

# 7. Verificar estructura final
tree -L 2 -I 'node_modules|dist|build|.git'
```

---

## 🏗️ ESTRUCTURA FINAL OPTIMIZADA (Docker)

```
protocolo-r-pido/
├── public/                    # Archivos públicos (78 archivos)
│   ├── assets/               # Imágenes optimizadas
│   ├── manual/               # Manual médico (78 .md)
│   ├── manifest.json
│   ├── sw.js
│   └── favicon.svg
├── src/                      # Código fuente (~136 archivos)
│   ├── components/           # Componentes React
│   ├── data/                 # Datos TypeScript
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Páginas
│   └── utils/               # Utilidades
├── docs/                     # Documentación consolidada
│   ├── consolidated/        # Docs esenciales
│   └── archive/            # Docs antiguas
├── scripts/                  # Scripts esenciales
│   └── verificar-manual.ts
├── .github/                  # CI/CD
│   └── workflows/
│       ├── deploy.yml       # PM2 (alternativa)
│       └── deploy-docker.yml # Docker (principal)
├── Dockerfile               # 🐳 Docker build
├── docker-compose.yml       # 🐳 Docker compose
├── deploy-docker.sh         # 🐳 Script deploy Docker
├── .dockerignore           # 🐳 Docker ignore
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.*.json
└── README.md
```

---

## 📊 ESTIMACIÓN DE ESPACIO LIBERADO

| Antes | Después | Liberado |
|-------|---------|----------|
| ~500 MB | ~150 MB | ~350 MB |
| 400+ archivos | ~250 archivos | ~150 archivos |

**Con Docker:**
- ✅ No necesita `node_modules` en servidor
- ✅ Build se hace en contenedor
- ✅ Imagen Docker optimizada (~200MB)

---

## ⚠️ PRECAUCIONES

- ✅ **Backup primero:** El script crea backup automático
- ✅ **Probar Docker:** Verificar que `docker-compose build` funcione
- ✅ **Verificar PWA:** Service Worker y manifest deben funcionar
- ✅ **Manual médico:** No eliminar archivos de `public/manual/`
- ✅ **Imágenes esenciales:** No eliminar de `public/assets/`
- ✅ **Dockerfile:** No eliminar archivos Docker

---

## 🔄 PROCESO RECOMENDADO (Docker)

```bash
# 1. Backup manual extra (por si acaso)
cp -r /home/planetazuzu/protocolo-r-pido /home/planetazuzu/protocolo-backup

# 2. Ejecutar limpieza
cd /home/planetazuzu/protocolo-r-pido
bash cleanup_project_docker.sh

# 3. Verificar Docker
docker-compose build
docker-compose up -d

# 4. Verificar que funciona
curl http://localhost:8607

# 5. Si todo está bien, eliminar backups viejos
# (Mantener solo el más reciente)
```

---

## 🐳 VENTAJAS DE DOCKER EN LIMPIEZA

1. **No necesita node_modules local:** Docker los instala en build
2. **Build aislado:** No contamina el sistema
3. **Fácil rollback:** Volver a imagen anterior
4. **Reproducible:** Mismo resultado en cualquier servidor
5. **Limpieza automática:** `.dockerignore` excluye archivos innecesarios

---

## 📝 CHECKLIST DE LIMPIEZA CON DOCKER

- [ ] Backup creado
- [ ] Archivos del sistema eliminados
- [ ] Carpetas de backup movidas
- [ ] Documentación consolidada
- [ ] Scripts obsoletos archivados
- [ ] Configuraciones organizadas
- [ ] `node_modules` eliminado (Docker lo instalará)
- [ ] Builds anteriores eliminados
- [ ] Dockerfile verificado
- [ ] `docker-compose build` funciona
- [ ] `docker-compose up -d` funciona
- [ ] App accesible en `http://localhost:8607`
- [ ] Logs accesibles: `docker-compose logs -f`

---

**Última actualización:** 2024-12-19  
**Despliegue:** Docker (puerto 8607)
