# 📸 Guía: Integrar Imágenes en PWA - EMERGES TES

**Objetivo:** Asegurar que las infografías funcionen offline en la PWA

---

## ✅ LO QUE YA ESTÁ CONFIGURADO

### 1. Service Worker
- ✅ **Registrado** en `src/main.tsx`
- ✅ **Cachea imágenes** automáticamente (cache-first strategy)
- ✅ **Detecta rutas** `/assets/infografias/` y las cachea

### 2. Vite Build
- ✅ **Copia `public/`** a `dist/` automáticamente (`copyPublicDir: true`)
- ✅ **Incluye imágenes** en el build (PNG, JPG, SVG, GIF)
- ✅ **Mantiene estructura** de carpetas para assets

### 3. MarkdownViewer
- ✅ **Renderiza imágenes** si están referenciadas en Markdown
- ✅ **Rutas relativas** funcionan desde `public/`

---

## 📋 PASOS PARA INTEGRAR IMÁGENES

### Paso 1: Organizar Imágenes

**Opción A: Manual**
```bash
# Crear estructura de carpetas
mkdir -p public/assets/infografias/{bloque-0-fundamentos,bloque-2-inmovilizacion,bloque-3-material-sanitario,bloque-7-conduccion,bloque-12-marco-legal}

# Mover imágenes desde imagenes-pendientes/ según corresponda
# Ejemplo:
cp imagenes-pendientes/ALGORITMO\ OPERATIVO\ DEL\ TES.svg public/assets/infografias/bloque-0-fundamentos/
cp imagenes-pendientes/colocacion-collarin-paso-*.png public/assets/infografias/bloque-2-inmovilizacion/
```

**Opción B: Script Automático**
```bash
# Usar el script existente
python scripts/organizar_infografias.py
```

---

### Paso 2: Añadir Referencias en Markdown

Editar los archivos `.md` del manual para incluir referencias:

**Ejemplo en `BLOQUE_04_3_COLLARIN_CERVICAL.md`:**
```markdown
## Colocación del Collarín Cervical

### Paso 1: Preparación

![Preparación del collarín](./assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png)

### Paso 2: Parte Posterior

![Colocación parte posterior](./assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-2-parte-posterior.png)
```

**Rutas relativas:**
- Desde `public/manual/BLOQUE_X/archivo.md`:
  - `./assets/infografias/...` (sube un nivel, luego entra en assets)
  - O: `../../assets/infografias/...` (más explícito)

---

### Paso 3: Verificar Build

```bash
# Build de producción
npm run build

# Verificar que las imágenes están en dist/
ls -la dist/assets/infografias/
```

**Estructura esperada en `dist/`:**
```
dist/
├── assets/
│   └── infografias/
│       ├── bloque-0-fundamentos/
│       ├── bloque-2-inmovilizacion/
│       └── ...
├── manual/
└── index.html
```

---

### Paso 4: Verificar Service Worker

1. **Abrir DevTools** > Application > Service Workers
2. **Verificar registro** del SW
3. **Ir a Cache Storage** > `emerges-tes-v1`
4. **Verificar** que las imágenes se cachean cuando se cargan

---

## 🔍 VERIFICACIÓN OFFLINE

### Test Manual

1. **Build:** `npm run build`
2. **Servir localmente:** `npm run preview` o `npx serve -s dist`
3. **Abrir en navegador:** `http://localhost:4173`
4. **DevTools** > Network > Throttling > "Offline"
5. **Navegar al manual** con imágenes
6. **Verificar:** Las imágenes deben cargar desde cache

---

## 📊 ESTRUCTURA FINAL

```
public/
├── assets/
│   └── infografias/
│       ├── bloque-0-fundamentos/
│       │   ├── ALGORITMO OPERATIVO DEL TES.svg
│       │   └── RESUMEN VISUAL DEL ALGORITMO START.svg
│       ├── bloque-2-inmovilizacion/
│       │   ├── colocacion-collarin-paso-1-preparacion.png
│       │   ├── colocacion-collarin-paso-2-parte-posterior.png
│       │   └── ...
│       ├── bloque-3-material-sanitario/
│       │   ├── uso-correcto-pulsioximetro.png
│       │   └── ...
│       ├── bloque-7-conduccion/
│       └── bloque-12-marco-legal/
├── manual/
│   └── BLOQUE_X/
│       └── archivo.md (con referencias a imágenes)
└── sw.js
```

---

## ⚠️ IMPORTANTE PARA PWA

### 1. Rutas Relativas
- Usar rutas relativas desde `public/`
- Ejemplo: `./assets/infografias/...` o `../../assets/infografias/...`

### 2. Tamaño de Imágenes
- **Optimizar antes de añadir** (comprimir PNG, optimizar SVG)
- **Tamaño recomendado:** <500KB por imagen
- **Total:** Considerar límite de cache del navegador

### 3. Service Worker
- **Cache automático:** Las imágenes se cachean al cargarse
- **Estrategia:** Cache-first (offline-first)
- **Actualización:** Cambiar `CACHE_NAME` para forzar actualización

---

## 🚀 COMANDOS ÚTILES

```bash
# Verificar qué imágenes hay
ls -lh imagenes-pendientes/

# Crear estructura
mkdir -p public/assets/infografias/{bloque-0-fundamentos,bloque-2-inmovilizacion,bloque-3-material-sanitario,bloque-7-conduccion,bloque-12-marco-legal}

# Build y verificar
npm run build
ls -R dist/assets/infografias/

# Preview local
npm run preview
```

---

## ✅ CHECKLIST DE INTEGRACIÓN

- [ ] Imágenes organizadas en `public/assets/infografias/`
- [ ] Referencias añadidas en archivos `.md` del manual
- [ ] Build verificado (`dist/assets/infografias/` existe)
- [ ] Service Worker cachea imágenes (verificar en DevTools)
- [ ] Test offline: imágenes cargan sin internet
- [ ] Tamaño total de imágenes razonable (<50MB)

---

**Nota:** Una vez organizadas las imágenes y añadidas las referencias, el Service Worker las cacheará automáticamente para funcionamiento offline.
