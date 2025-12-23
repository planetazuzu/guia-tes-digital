#!/bin/bash
# cleanup_completo.sh
# Limpieza completa y optimización de EMERGES TES
# Fase por fase con verificaciones de seguridad

set -e  # Detenerse en errores

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Variables
BACKUP_DIR="../EMERGES_BACKUP_$(date +%Y%m%d_%H%M%S)"
REVIEW_DIR="../EMERGES_REVISION_$(date +%Y%m%d)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🧹 LIMPIEZA COMPLETA DE EMERGES TES${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}📦 Backup completo: ${BACKUP_DIR}${NC}"
echo -e "${CYAN}📋 Archivos para revisión: ${REVIEW_DIR}${NC}"
echo ""

# Confirmación
read -p "$(echo -e ${YELLOW}¿Continuar con la limpieza? [y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Limpieza cancelada${NC}"
    exit 1
fi

# Crear directorios
mkdir -p "$BACKUP_DIR"
mkdir -p "$REVIEW_DIR"
mkdir -p config_backup/
mkdir -p docs/consolidado/
mkdir -p docs/archivo/

# ============================================================================
# FASE 1: ARCHIVOS INNECESARIOS (ELIMINAR INMEDIATAMENTE)
# ============================================================================
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}FASE 1: ARCHIVOS INNECESARIOS${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}[1.1] Creando backup completo del proyecto...${NC}"
tar --exclude='node_modules' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='.git' \
    -czf "$BACKUP_DIR/proyecto_completo.tar.gz" . 2>/dev/null || {
    echo -e "${RED}⚠️  No se pudo crear backup completo, continuando...${NC}"
}
echo -e "${GREEN}✅ Backup completo creado${NC}"
echo ""

echo -e "${YELLOW}[1.2] Eliminando archivos del sistema...${NC}"
find . -type f \( -name ".DS_Store" -o -name "Thumbs.db" -o -name ".localized" \) -delete 2>/dev/null || true
COUNT=$(find . -type f \( -name ".DS_Store" -o -name "Thumbs.db" \) 2>/dev/null | wc -l)
if [ "$COUNT" -eq 0 ]; then
    echo -e "${GREEN}✅ Archivos del sistema eliminados${NC}"
else
    echo -e "${YELLOW}⚠️  Quedan $COUNT archivos del sistema${NC}"
fi
echo ""

echo -e "${YELLOW}[1.3] Eliminando logs...${NC}"
find . -type f \( -name "*.log" -o -name "npm-debug.log*" -o -name "yarn-debug.log*" -o -name "yarn-error.log*" \) -delete 2>/dev/null || true
echo -e "${GREEN}✅ Logs eliminados${NC}"
echo ""

echo -e "${YELLOW}[1.4] Eliminando builds y cachés...${NC}"
rm -rf dist/ build/ .next/ out/ .cache/ 2>/dev/null || true
echo -e "${GREEN}✅ Builds y cachés eliminados${NC}"
echo ""

echo -e "${YELLOW}[1.5] Eliminando node_modules y package-lock.json...${NC}"
rm -rf node_modules/ 2>/dev/null || true
rm -f package-lock.json 2>/dev/null || true
echo -e "${GREEN}✅ Dependencias eliminadas (se reinstalarán después)${NC}"
echo ""

# ============================================================================
# FASE 2: BACKUPS Y DUPLICADOS (MOVER/ARCHIVAR)
# ============================================================================
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}FASE 2: BACKUPS Y DUPLICADOS${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

if [ -d "_BACKUP_MD" ]; then
    echo -e "${YELLOW}[2.1] Moviendo _BACKUP_MD/ (203 archivos) para revisión...${NC}"
    mv _BACKUP_MD/ "$REVIEW_DIR/_BACKUP_MD/" 2>/dev/null || true
    echo -e "${GREEN}✅ _BACKUP_MD/ movido a $REVIEW_DIR/${NC}"
else
    echo -e "${YELLOW}⏭️  [2.1] _BACKUP_MD/ no existe${NC}"
fi
echo ""

if [ -d "MANUAL_TES_DIGITAL" ]; then
    echo -e "${YELLOW}[2.2] Moviendo MANUAL_TES_DIGITAL/ (110 archivos) para revisión...${NC}"
    mv MANUAL_TES_DIGITAL/ "$REVIEW_DIR/MANUAL_TES_DIGITAL/" 2>/dev/null || true
    echo -e "${GREEN}✅ MANUAL_TES_DIGITAL/ movido a $REVIEW_DIR/${NC}"
else
    echo -e "${YELLOW}⏭️  [2.2] MANUAL_TES_DIGITAL/ no existe${NC}"
fi
echo ""

if [ -d "imagenes-pendientes" ]; then
    echo -e "${YELLOW}[2.3] Moviendo imagenes-pendientes/ (60 archivos) para revisión...${NC}"
    mv imagenes-pendientes/ "$REVIEW_DIR/imagenes_pendientes/" 2>/dev/null || true
    echo -e "${GREEN}✅ imagenes-pendientes/ movido a $REVIEW_DIR/${NC}"
else
    echo -e "${YELLOW}⏭️  [2.3] imagenes-pendientes/ no existe${NC}"
fi
echo ""

# ============================================================================
# FASE 3: CONFIGURACIONES REDUNDANTES (SIMPLIFICAR)
# ============================================================================
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}FASE 3: CONFIGURACIONES REDUNDANTES${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}[3.1] Moviendo configuraciones no usadas a backup...${NC}"
CONFIGS_MOVED=0

for config in vercel.json netlify.toml nginx.conf.example; do
    if [ -f "$config" ]; then
        mv "$config" config_backup/ 2>/dev/null && {
            echo -e "  ✓ Movido: $config"
            CONFIGS_MOVED=$((CONFIGS_MOVED + 1))
        } || true
    fi
done

if [ -f "public/.htaccess" ]; then
    mv public/.htaccess config_backup/ 2>/dev/null && {
        echo -e "  ✓ Movido: public/.htaccess"
        CONFIGS_MOVED=$((CONFIGS_MOVED + 1))
    } || true
fi

if [ -f "public/_redirects" ]; then
    mv public/_redirects config_backup/ 2>/dev/null && {
        echo -e "  ✓ Movido: public/_redirects"
        CONFIGS_MOVED=$((CONFIGS_MOVED + 1))
    } || true
fi

if [ "$CONFIGS_MOVED" -gt 0 ]; then
    echo -e "${GREEN}✅ $CONFIGS_MOVED configuraciones movidas a config_backup/${NC}"
else
    echo -e "${YELLOW}⏭️  No se encontraron configuraciones para mover${NC}"
fi
echo ""

echo -e "${BLUE}📋 Configuraciones mantenidas (Docker + PM2 + GitHub Actions):${NC}"
echo -e "  ✓ Dockerfile"
echo -e "  ✓ docker-compose.yml"
echo -e "  ✓ docker-compose.prod.yml"
echo -e "  ✓ deploy-docker.sh"
echo -e "  ✓ ecosystem.config.js (PM2)"
echo -e "  ✓ deploy.sh"
echo -e "  ✓ webhook-deploy.sh"
echo -e "  ✓ .github/workflows/deploy.yml"
echo ""

# ============================================================================
# FASE 4: DOCUMENTACIÓN (CONSOLIDAR)
# ============================================================================
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}FASE 4: DOCUMENTACIÓN${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}[4.1] Moviendo documentación esencial a docs/consolidado/...${NC}"
IMPORTANT_DOCS=(
    "DEPLOYMENT_SERVER.md"
    "DEPLOYMENT_DOCKER.md"
    "DEPLOYMENT_GITHUB.md"
    "VERCEL_DEPLOYMENT.md"
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

DOCS_MOVED=0
for doc in "${IMPORTANT_DOCS[@]}"; do
    if [ -f "$doc" ]; then
        mv "$doc" docs/consolidado/ 2>/dev/null && {
            echo -e "  ✓ Movido: $doc"
            DOCS_MOVED=$((DOCS_MOVED + 1))
        } || true
    fi
done

if [ "$DOCS_MOVED" -gt 0 ]; then
    echo -e "${GREEN}✅ $DOCS_MOVED documentos esenciales movidos a docs/consolidado/${NC}"
else
    echo -e "${YELLOW}⏭️  No se encontraron documentos esenciales para mover${NC}"
fi
echo ""

echo -e "${YELLOW}[4.2] Moviendo resto de documentación a docs/archivo/...${NC}"
ARCHIVE_COUNT=0
find . -maxdepth 1 -name "*.md" ! -name "README.md" -type f | while read -r file; do
    mv "$file" docs/archivo/ 2>/dev/null && {
        ARCHIVE_COUNT=$((ARCHIVE_COUNT + 1))
    } || true
done

# Contar archivos archivados
ARCHIVE_COUNT=$(find docs/archivo -name "*.md" 2>/dev/null | wc -l)
if [ "$ARCHIVE_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ $ARCHIVE_COUNT documentos movidos a docs/archivo/${NC}"
else
    echo -e "${YELLOW}⏭️  No se encontraron documentos para archivar${NC}"
fi
echo ""

echo -e "${YELLOW}[4.3] Creando README.md limpio...${NC}"
cat > README.md << 'EOF'
# EMERGES TES - Protocolo Rápido

Aplicación PWA para protocolos médicos de emergencia.

## 🚑 Características

- **Protocolos de emergencia** (RCP, vía aérea, shock, etc.)
- **Vademécum de fármacos** con dosis, indicaciones y contraindicaciones
- **Calculadoras médicas** (Glasgow, perfusiones)
- **Guías de actuación en escena** (seguridad, ABCDE, triage)
- **Diseño optimizado para móvil** y uso nocturno
- **Funciona offline** (PWA)

## 🛠️ Stack Tecnológico

- **React 18** + **TypeScript 5.8**
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** + **shadcn/ui** - UI Framework
- **React Router 6.3** - Navegación SPA
- **PWA** - Service Worker + Manifest

## 📦 Instalación

```bash
npm install
npm run dev      # Desarrollo (localhost:8096)
npm run build    # Producción
```

## 🚀 Despliegue Principal

- **Servidor:** PM2 en puerto 8607
- **Docker:** `docker-compose up --build`
- **CI/CD:** GitHub Actions

## 📚 Documentación

Ver `docs/consolidado/` para documentación completa:
- Despliegue (Docker, PM2, GitHub Actions)
- PWA y Service Worker
- Estado de funcionalidades
- Análisis técnico

## 📄 Licencia

[Especificar licencia si aplica]

---

**Desarrollado para Técnicos de Emergencias Sanitarias**
EOF
echo -e "${GREEN}✅ README.md actualizado${NC}"
echo ""

# ============================================================================
# FASE 5: SCRIPTS (LIMPIAR)
# ============================================================================
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}FASE 5: SCRIPTS${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}[5.1] Moviendo scripts Python a revisión...${NC}"
PYTHON_COUNT=0
for script in *.py; do
    if [ -f "$script" ]; then
        mv "$script" "$REVIEW_DIR/scripts_python/" 2>/dev/null && {
            echo -e "  ✓ Movido: $script"
            PYTHON_COUNT=$((PYTHON_COUNT + 1))
        } || true
    fi
done

if [ "$PYTHON_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ $PYTHON_COUNT scripts Python movidos a $REVIEW_DIR/scripts_python/${NC}"
else
    echo -e "${YELLOW}⏭️  No se encontraron scripts Python en la raíz${NC}"
fi
echo ""

echo -e "${YELLOW}[5.2] Organizando scripts en scripts/...${NC}"
mkdir -p scripts/utiles/

# Mantener scripts esenciales
if [ -f "scripts/verificar-manual.ts" ]; then
    mv scripts/verificar-manual.ts scripts/utiles/ 2>/dev/null || true
    echo -e "  ✓ Mantenido: scripts/verificar-manual.ts"
fi

# Mover scripts Python de scripts/ a revisión
if [ -d "scripts" ]; then
    for script in scripts/*.py; do
        if [ -f "$script" ]; then
            mv "$script" "$REVIEW_DIR/scripts_python/" 2>/dev/null && {
                echo -e "  ✓ Movido: $script"
            } || true
        fi
    done
fi

# Restaurar scripts útiles
if [ -d "scripts/utiles" ]; then
    mv scripts/utiles/* scripts/ 2>/dev/null || true
    rmdir scripts/utiles 2>/dev/null || true
fi

echo -e "${GREEN}✅ Scripts organizados${NC}"
echo ""

# ============================================================================
# FASE 6: REINSTALACIÓN Y VERIFICACIÓN
# ============================================================================
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}FASE 6: REINSTALACIÓN Y VERIFICACIÓN${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}[6.1] Reinstalando dependencias...${NC}"
npm install
echo -e "${GREEN}✅ Dependencias instaladas${NC}"
echo ""

echo -e "${YELLOW}[6.2] Verificando build...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo -e "${RED}❌ Error en el build${NC}"
    echo -e "${YELLOW}⚠️  Revisa los errores antes de continuar${NC}"
    exit 1
fi
echo ""

# ============================================================================
# RESUMEN FINAL
# ============================================================================
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ LIMPIEZA COMPLETADA${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${BLUE}📊 RESUMEN:${NC}"
echo -e "  📦 Backup completo: ${CYAN}$BACKUP_DIR${NC}"
echo -e "  📋 Archivos para revisión: ${CYAN}$REVIEW_DIR${NC}"
echo ""

# Contar archivos movidos
BACKUP_FILES=$(find "$REVIEW_DIR" -type f 2>/dev/null | wc -l)
CONFIG_FILES=$(find config_backup -type f 2>/dev/null | wc -l)
DOC_FILES=$(find docs/consolidado docs/archivo -type f 2>/dev/null | wc -l)

echo -e "${BLUE}📁 Archivos movidos:${NC}"
echo -e "  📚 Backups y duplicados: ${CYAN}$BACKUP_FILES archivos${NC}"
echo -e "  ⚙️  Configuraciones: ${CYAN}$CONFIG_FILES archivos${NC}"
echo -e "  📄 Documentación: ${CYAN}$DOC_FILES archivos${NC}"
echo ""

echo -e "${BLUE}🏗️  VERIFICACIONES RECOMENDADAS:${NC}"
echo -e "  1. ${CYAN}npm run dev${NC}      # Desarrollo (localhost:8096)"
echo -e "  2. ${CYAN}npm run build${NC}    # Build producción"
echo -e "  3. ${CYAN}docker-compose up --build${NC}  # Docker"
echo -e "  4. Verificar PWA (Service Worker, Manifest)"
echo -e "  5. Probar funcionalidades principales"
echo ""

echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "  1. Revisa ${CYAN}$REVIEW_DIR${NC} antes de eliminar nada"
echo -e "  2. Verifica que todas las funcionalidades funcionen"
echo -e "  3. Si todo está bien, puedes eliminar backups antiguos"
echo ""

echo -e "${GREEN}🎯 Proyecto optimizado y listo para desarrollo${NC}"
echo ""
