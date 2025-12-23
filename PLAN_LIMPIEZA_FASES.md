# 🧹 Plan de Limpieza Completo - EMERGES TES

**Fecha:** 2024-12-19  
**Script:** `cleanup_completo.sh`

---

## 📋 Resumen Ejecutivo

Este plan ejecuta una limpieza completa del proyecto en **6 fases**, moviendo archivos innecesarios a carpetas de revisión y manteniendo solo lo esencial.

**Resultado esperado:**
- ~250 archivos (en lugar de 400+)
- ~150MB (en lugar de 250MB+)
- Estructura clara y organizada
- Todas las funcionalidades intactas

---

## 🔄 Fases de Limpieza

### **FASE 1: ARCHIVOS INNECESARIOS** (Eliminar inmediatamente)

**Acciones:**
- ✅ Eliminar archivos del sistema (.DS_Store, Thumbs.db)
- ✅ Eliminar logs (*.log, npm-debug.log*)
- ✅ Eliminar builds anteriores (dist/, build/, .next/)
- ✅ Eliminar node_modules/ (se reinstalarán)

**Impacto:** Limpieza inmediata, sin riesgo

---

### **FASE 2: BACKUPS Y DUPLICADOS** (Mover a revisión)

**Archivos movidos a `../EMERGES_REVISION_YYYYMMDD/`:**

1. **`_BACKUP_MD/`** (203 archivos)
   - 129 archivos .md
   - 62 archivos .docx
   - 7 scripts Python
   - **Acción:** Mover para revisión

2. **`MANUAL_TES_DIGITAL/`** (110 archivos .md)
   - Duplicado de `public/manual/`
   - **Acción:** Mover para revisión

3. **`imagenes-pendientes/`** (60 archivos)
   - 50 imágenes PNG
   - 9 imágenes SVG
   - **Acción:** Mover para revisión

**Impacto:** Libera ~100MB, archivos disponibles para revisión

---

### **FASE 3: CONFIGURACIONES REDUNDANTES** (Simplificar)

**Configuraciones movidas a `config_backup/`:**

- `vercel.json` (si no usas Vercel)
- `netlify.toml` (si no usas Netlify)
- `nginx.conf.example` (solo ejemplo)
- `public/.htaccess` (si no usas Apache)
- `public/_redirects` (si no usas Netlify)

**Configuraciones mantenidas:**

- ✅ `Dockerfile`
- ✅ `docker-compose.yml`
- ✅ `docker-compose.prod.yml`
- ✅ `deploy-docker.sh`
- ✅ `ecosystem.config.js` (PM2)
- ✅ `deploy.sh`
- ✅ `webhook-deploy.sh`
- ✅ `.github/workflows/deploy.yml`

**Impacto:** Simplifica estructura, mantiene solo lo usado

---

### **FASE 4: DOCUMENTACIÓN** (Consolidar)

**Documentación esencial → `docs/consolidado/`:**

1. `DEPLOYMENT_SERVER.md`
2. `DEPLOYMENT_DOCKER.md`
3. `DEPLOYMENT_GITHUB.md`
4. `VERCEL_DEPLOYMENT.md`
5. `RESUMEN_DEPLOY_8607.md`
6. `VERIFICACION_PWA.md`
7. `ESTADO_FUNCIONALIDADES.md`
8. `SPA_ROUTING_CONFIG.md`
9. `CHECKLIST_PWA_COMPLETA.md`
10. `ANALISIS_TECNOLOGICO_PROYECTO.md`
11. `PLAN_ESTRUCTURA_PSIQUIATRIA.md`
12. `FASE_1_FALTANTE_DETALLADO.md`
13. `SISTEMA_MEDIOS_VISUALES.md`

**Resto de documentación → `docs/archivo/`:**

- Todos los demás archivos .md (excepto README.md)

**README.md:** Actualizado con información esencial

**Impacto:** Documentación organizada y accesible

---

### **FASE 5: SCRIPTS** (Limpiar)

**Scripts Python → `../EMERGES_REVISION_YYYYMMDD/scripts_python/`:**

- Todos los scripts .py de la raíz
- Scripts .py de `scripts/`

**Scripts mantenidos:**

- ✅ `deploy.sh`
- ✅ `deploy-docker.sh`
- ✅ `webhook-deploy.sh`
- ✅ `cleanup_completo.sh`
- ✅ `cleanup_project.sh`
- ✅ `scripts/verificar-manual.ts`

**Impacto:** Solo scripts esenciales visibles

---

### **FASE 6: REINSTALACIÓN Y VERIFICACIÓN**

**Acciones:**
- ✅ Reinstalar dependencias (`npm install`)
- ✅ Verificar build (`npm run build`)
- ✅ Mostrar resumen final

**Impacto:** Proyecto funcional y verificado

---

## 📊 Estructura Final Optimizada

```
protocolo-r-pido/
├── public/                    # Archivos públicos
│   ├── assets/infografias/   # 46+ imágenes organizadas
│   ├── manual/               # 78 archivos .md
│   ├── manifest.json
│   ├── sw.js
│   └── favicon.svg
├── src/                      # ~136 archivos TS/TSX
│   ├── components/           # 40+ componentes
│   ├── data/                 # Datos TypeScript
│   ├── hooks/                # Custom hooks
│   ├── pages/                # 20+ páginas
│   └── [otros]
├── docs/
│   ├── consolidado/          # 13 documentos esenciales
│   └── archivo/             # 30+ documentos para referencia
├── scripts/
│   └── verificar-manual.ts   # Script esencial
├── config_backup/            # Configuraciones no usadas
├── .github/
│   └── workflows/deploy.yml
├── Dockerfile                # ✅ Mantenido
├── docker-compose.yml        # ✅ Mantenido
├── docker-compose.prod.yml   # ✅ Mantenido
├── deploy-docker.sh          # ✅ Mantenido
├── ecosystem.config.js       # ✅ Mantenido (PM2)
├── deploy.sh                 # ✅ Mantenido
├── webhook-deploy.sh         # ✅ Mantenido
├── cleanup_completo.sh       # ✅ Nuevo
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md                 # ✅ Actualizado
```

---

## 🚀 Uso del Script

### Ejecutar Limpieza Completa

```bash
# Hacer ejecutable (si no lo está)
chmod +x cleanup_completo.sh

# Ejecutar limpieza
./cleanup_completo.sh
```

El script:
1. ✅ Crea backup completo automático
2. ✅ Pide confirmación antes de continuar
3. ✅ Ejecuta las 6 fases secuencialmente
4. ✅ Muestra progreso detallado
5. ✅ Verifica build al final
6. ✅ Muestra resumen completo

---

## ✅ Verificaciones Post-Limpieza

### 1. Build del Proyecto

```bash
npm run build
```

**Esperado:** Build exitoso sin errores

---

### 2. Desarrollo Local

```bash
npm run dev
```

**Esperado:** App funciona en `http://localhost:8096`

---

### 3. Docker

```bash
docker-compose up --build
```

**Esperado:** Contenedor inicia correctamente en puerto 8607

---

### 4. PWA Funcionalidad

```bash
npm run build
npx serve -s dist -l 3000
```

**Verificar en navegador:**
- ✅ Service Worker registrado
- ✅ Manifest funciona
- ✅ Modo offline funciona
- ✅ Instalación PWA disponible

---

### 5. Funcionalidades Clave

**Verificar:**
- ✅ Manual médico (todos los .md accesibles)
- ✅ Vademécum de fármacos
- ✅ Protocolos de emergencia
- ✅ Calculadoras médicas
- ✅ Favoritos y búsqueda
- ✅ Navegación entre páginas

---

## 📊 Espacio Liberado Estimado

| Elemento | Archivos | Espacio | Acción |
|----------|----------|---------|--------|
| `_BACKUP_MD/` | 203 | ~50MB | Mover a revisión |
| `MANUAL_TES_DIGITAL/` | 110 | ~30MB | Mover a revisión |
| `imagenes-pendientes/` | 60 | ~20MB | Mover a revisión |
| Documentación .md | 40+ | ~5MB | Consolidar |
| Configuraciones | 10+ | ~1MB | Mover a backup |
| Logs y temporales | Varios | ~5MB | Eliminar |
| **TOTAL** | **400+** | **~110MB** | **Optimizado** |

---

## ⚠️ Precauciones

### Antes de Ejecutar

1. ✅ **Backup manual extra** (recomendado):
   ```bash
   cp -r /home/planetazuzu/protocolo-r-pido /home/planetazuzu/protocolo-backup-manual
   ```

2. ✅ **Verificar que no hay cambios sin commit**:
   ```bash
   git status
   ```

3. ✅ **Commit de cambios pendientes** (si los hay):
   ```bash
   git add -A
   git commit -m "backup antes de limpieza"
   ```

### Después de Ejecutar

1. ✅ **Revisar `../EMERGES_REVISION_YYYYMMDD/`** antes de eliminar
2. ✅ **Verificar todas las funcionalidades**
3. ✅ **Probar build y deploy**
4. ✅ **Si todo está bien, eliminar backups antiguos** (mantener solo el más reciente)

---

## 🔄 Mantenimiento Recomendado

### Script de Mantenimiento Mensual

Crear `monthly_cleanup.sh`:

```bash
#!/bin/bash
echo "🧼 Mantenimiento mensual del proyecto"

# 1. Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# 2. Limpiar builds
rm -rf dist/

# 3. Verificar dependencias
npm outdated
npm audit

# 4. Rebuild
npm run build

echo "✅ Mantenimiento completado"
```

---

## 🎯 Resultado Final

Después de la limpieza, el proyecto tendrá:

- ✅ **~250 archivos** (en lugar de 400+)
- ✅ **~150MB** (en lugar de 250MB+)
- ✅ **Estructura clara y organizada**
- ✅ **Todas las funcionalidades intactas**
- ✅ **PWA completamente funcional**
- ✅ **Deployment simplificado**
- ✅ **Documentación accesible**

---

## 📞 Soporte

Si algo falla después de la limpieza:

1. **Restaurar desde backup:**
   ```bash
   cd ..
   tar -xzf EMERGES_BACKUP_YYYYMMDD_HHMMSS/proyecto_completo.tar.gz
   ```

2. **Revisar logs del script** (si hay errores)

3. **Verificar que todas las dependencias están instaladas**

---

**Última actualización:** 2024-12-19
