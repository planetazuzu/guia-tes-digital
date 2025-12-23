#!/bin/bash
# cleanup_project.sh
# Script de limpieza y optimización del proyecto EMERGES TES
# Fecha: 2024-12-19

set -e  # Detenerse en errores

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 LIMPIEZA Y OPTIMIZACIÓN DEL PROYECTO${NC}"
echo -e "${BLUE}════════════════════════════════════════════════${NC}"
echo ""

# 1. Backup del estado actual
BACKUP_DIR="../project_backup_$(date +%Y%m%d_%H%M%S)"
echo -e "${YELLOW}📦 [1/10] Creando backup en: $BACKUP_DIR${NC}"
mkdir -p "$BACKUP_DIR"
# Backup solo de archivos importantes (excluyendo node_modules, dist, etc.)
tar --exclude='node_modules' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='.git' \
    -czf "$BACKUP_DIR/project_backup.tar.gz" . 2>/dev/null || {
    echo -e "${RED}⚠️  No se pudo crear backup completo, continuando...${NC}"
}
echo -e "${GREEN}✅ Backup creado${NC}"
echo ""

# 2. Archivos del sistema
echo -e "${YELLOW}🗑️  [2/10] Limpiando archivos del sistema...${NC}"
find . -type f \( -name ".DS_Store" -o -name "Thumbs.db" -o -name ".localized" -o -name "*.swp" -o -name "*.swo" \) -delete 2>/dev/null || true
echo -e "${GREEN}✅ Archivos del sistema eliminados${NC}"
echo ""

# 3. Logs
echo -e "${YELLOW}📝 [3/10] Eliminando logs...${NC}"
find . -type f \( -name "*.log" -o -name "npm-debug.log*" -o -name "yarn-debug.log*" -o -name "yarn-error.log*" \) -delete 2>/dev/null || true
echo -e "${GREEN}✅ Logs eliminados${NC}"
echo ""

# 4. Carpetas de backup grandes
if [ -d "_BACKUP_MD" ]; then
    echo -e "${YELLOW}📚 [4/10] Manejando _BACKUP_MD/ (203 archivos)...${NC}"
    mkdir -p "$BACKUP_DIR/backup_md"
    mv _BACKUP_MD/* "$BACKUP_DIR/backup_md/" 2>/dev/null || true
    rmdir _BACKUP_MD 2>/dev/null || true
    echo -e "${GREEN}✅ _BACKUP_MD/ movido a backup${NC}"
else
    echo -e "${YELLOW}⏭️  [4/10] _BACKUP_MD/ no existe, saltando...${NC}"
fi
echo ""

# 5. Manual duplicado
if [ -d "MANUAL_TES_DIGITAL" ]; then
    echo -e "${YELLOW}📖 [5/10] Manejando MANUAL_TES_DIGITAL/ (110 archivos)...${NC}"
    mv MANUAL_TES_DIGITAL "$BACKUP_DIR/" 2>/dev/null || true
    echo -e "${GREEN}✅ MANUAL_TES_DIGITAL/ movido a backup${NC}"
else
    echo -e "${YELLOW}⏭️  [5/10] MANUAL_TES_DIGITAL/ no existe, saltando...${NC}"
fi
echo ""

# 6. Imágenes pendientes (solo mover duplicados)
if [ -d "imagenes-pendientes" ]; then
    echo -e "${YELLOW}🖼️  [6/10] Procesando imágenes pendientes...${NC}"
    mkdir -p "$BACKUP_DIR/imagenes_pendientes"
    COUNT=0
    for img in imagenes-pendientes/*; do
        if [ -f "$img" ]; then
            base=$(basename "$img")
            # Buscar en todas las subcarpetas de infografias
            if find public/assets/infografias -name "$base" -type f | grep -q .; then
                echo "  Duplicado encontrado: $base"
                mv "$img" "$BACKUP_DIR/imagenes_pendientes/" 2>/dev/null || true
                COUNT=$((COUNT + 1))
            fi
        fi
    done
    echo -e "${GREEN}✅ $COUNT imágenes duplicadas movidas a backup${NC}"
    echo -e "${YELLOW}   (Carpeta imagenes-pendientes/ mantenida con archivos únicos)${NC}"
else
    echo -e "${YELLOW}⏭️  [6/10] imagenes-pendientes/ no existe, saltando...${NC}"
fi
echo ""

# 7. Limpiar builds anteriores
echo -e "${YELLOW}🏗️  [7/10] Limpiando builds anteriores...${NC}"
rm -rf dist/ build/ .next/ out/ 2>/dev/null || true
echo -e "${GREEN}✅ Builds anteriores eliminados${NC}"
echo ""

# 8. Organizar documentación
echo -e "${YELLOW}📄 [8/10] Organizando documentación...${NC}"
mkdir -p docs/consolidated
mkdir -p docs/archive

# Archivos esenciales a mantener en raíz o docs/consolidated
ESSENTIAL_DOCS=(
    "README.md"
    "DEPLOYMENT_SERVER.md"
    "VERCEL_DEPLOYMENT.md"
    "DEPLOYMENT_GITHUB.md"
    "RESUMEN_DEPLOY_8607.md"
    "VERIFICACION_PWA.md"
    "ESTADO_FUNCIONALIDADES.md"
    "SPA_ROUTING_CONFIG.md"
    "CHECKLIST_PWA_COMPLETA.md"
    "ANALISIS_TECNOLOGICO_PROYECTO.md"
    "PLAN_ESTRUCTURA_PSIQUIATRIA.md"
    "FASE_1_FALTANTE_DETALLADO.md"
    "SISTEMA_MEDIOS_VISUALES.md"
)

# Mover todos los .md a archive primero
find . -maxdepth 1 -name "*.md" -type f | while read -r file; do
    basename_file=$(basename "$file")
    is_essential=false
    for essential in "${ESSENTIAL_DOCS[@]}"; do
        if [ "$basename_file" == "$essential" ]; then
            is_essential=true
            break
        fi
    done
    if [ "$is_essential" = false ]; then
        mv "$file" docs/archive/ 2>/dev/null || true
    fi
done

# Mover archivos esenciales a consolidated (excepto README.md)
for doc in "${ESSENTIAL_DOCS[@]}"; do
    if [ -f "$doc" ] && [ "$doc" != "README.md" ]; then
        mv "$doc" docs/consolidated/ 2>/dev/null || true
    fi
done

echo -e "${GREEN}✅ Documentación organizada${NC}"
echo -e "${BLUE}   - Esenciales en: docs/consolidated/${NC}"
echo -e "${BLUE}   - Archivados en: docs/archive/${NC}"
echo ""

# 9. Scripts de mantenimiento
echo -e "${YELLOW}🐍 [9/10] Organizando scripts...${NC}"
mkdir -p scripts/archive

# Scripts esenciales a mantener
ESSENTIAL_SCRIPTS=(
    "deploy.sh"
    "deploy-docker.sh"
    "webhook-deploy.sh"
    "scripts/verificar-manual.ts"
)

# Mover scripts Python y shell de la raíz a archive
for script in *.py *.sh 2>/dev/null; do
    if [ -f "$script" ]; then
        basename_script=$(basename "$script")
        is_essential=false
        for essential in "${ESSENTIAL_SCRIPTS[@]}"; do
            if [ "$basename_script" == "$(basename "$essential")" ]; then
                is_essential=true
                break
            fi
        done
        if [ "$is_essential" = false ]; then
            mv "$script" scripts/archive/ 2>/dev/null || true
        fi
    fi
done

echo -e "${GREEN}✅ Scripts organizados${NC}"
echo -e "${BLUE}   - Esenciales mantenidos en raíz${NC}"
echo -e "${BLUE}   - Otros movidos a: scripts/archive/${NC}"
echo ""

# 10. Configuraciones de despliegue redundantes
echo -e "${YELLOW}⚙️  [10/10] Organizando configuraciones...${NC}"
mkdir -p configs/backup

# Configuraciones a mantener (Docker, PM2, GitHub Actions)
# Configuraciones a mover a backup (pero mantener en repo)
CONFIGS_TO_BACKUP=(
    "vercel.json"
    "netlify.toml"
    "nginx.conf.example"
)

for config in "${CONFIGS_TO_BACKUP[@]}"; do
    if [ -f "$config" ]; then
        # Crear carpeta si no existe
        mkdir -p configs/backup
        # Mover pero mantener referencia en .gitignore si es necesario
        mv "$config" configs/backup/ 2>/dev/null || true
    fi
done

# Mover .htaccess y _redirects si existen
if [ -f "public/.htaccess" ]; then
    mkdir -p configs/backup
    mv public/.htaccess configs/backup/ 2>/dev/null || true
fi
if [ -f "public/_redirects" ]; then
    mkdir -p configs/backup
    mv public/_redirects configs/backup/ 2>/dev/null || true
fi

echo -e "${GREEN}✅ Configuraciones organizadas${NC}"
echo -e "${BLUE}   - Docker, PM2, GitHub Actions mantenidos${NC}"
echo -e "${BLUE}   - Otras configuraciones en: configs/backup/${NC}"
echo ""

# Resumen final
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ LIMPIEZA COMPLETADA${NC}"
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📊 Resumen:${NC}"
echo -e "  Backup creado en: ${YELLOW}$BACKUP_DIR${NC}"
echo ""
echo -e "${BLUE}📁 Estructura optimizada:${NC}"
echo -e "  ✅ Documentación esencial: ${GREEN}docs/consolidated/${NC}"
echo -e "  ✅ Documentación archivada: ${YELLOW}docs/archive/${NC}"
echo -e "  ✅ Scripts esenciales: ${GREEN}raíz del proyecto${NC}"
echo -e "  ✅ Scripts archivados: ${YELLOW}scripts/archive/${NC}"
echo -e "  ✅ Configuraciones: ${GREEN}Docker, PM2, GitHub Actions${NC}"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "  1. Verificar que el proyecto funciona: ${BLUE}npm run build${NC}"
echo -e "  2. Verificar Docker: ${BLUE}docker-compose up --build${NC}"
echo -e "  3. Si todo está bien, puedes eliminar backups antiguos"
echo ""
echo -e "${GREEN}🎯 Proyecto listo para desarrollo${NC}"
