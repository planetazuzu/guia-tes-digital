# 🧪 Test de PWA y Actualizaciones

**Fecha:** 2024-12-19

---

## ✅ VERIFICACIONES REALIZADAS

### 1. Service Worker
- ✅ **Registrado** correctamente en `src/main.tsx`
- ✅ **Ruta correcta:** `${base}sw.js`
- ✅ **Configuración:** `updateViaCache: 'none'` (siempre verifica actualizaciones)
- ✅ **Verificación periódica:** Cada hora + al recuperar foco

### 2. Cache Strategy
- ✅ **Cache First** para assets estáticos (offline-first)
- ✅ **Network First** para HTML (permite actualizaciones)
- ✅ **Cache de imágenes** automático
- ✅ **Versión de cache:** `v1.0.1` (incrementar para forzar actualización)

### 3. Sistema de Actualizaciones
- ✅ **Hook `useServiceWorker`** creado
- ✅ **Componente `UpdateNotification`** creado
- ✅ **Detección automática** de nuevas versiones
- ✅ **Notificación al usuario** cuando hay actualización

### 4. Manifest
- ✅ **Configurado** correctamente
- ✅ **Iconos** definidos
- ✅ **Display:** standalone
- ✅ **Shortcuts** para acceso rápido

---

## 🧪 CÓMO PROBAR

### Test 1: Verificar Registro del SW

```bash
# 1. Iniciar servidor de desarrollo
npm run dev

# 2. Abrir en navegador: http://localhost:8096

# 3. Abrir DevTools > Application > Service Workers
# Verificar:
# - ✅ SW registrado y activo
# - ✅ Estado: "activated and is running"
# - ✅ Scope: "/"
```

### Test 2: Verificar Cache

```bash
# 1. Cargar la app en navegador

# 2. DevTools > Application > Cache Storage
# Verificar:
# - ✅ Cache `emerges-tes-v1.0.1` existe
# - ✅ Contiene index.html, manifest.json
# - ✅ Contiene assets (JS, CSS)
```

### Test 3: Test Offline

```bash
# 1. Cargar la app (para cachear recursos)

# 2. DevTools > Network > Throttling > "Offline"

# 3. Recargar la página (F5)

# Verificar:
# - ✅ La app carga correctamente
# - ✅ Las imágenes cargan desde cache
# - ✅ La navegación funciona
```

### Test 4: Test de Actualización

```bash
# 1. Cambiar CACHE_VERSION en public/sw.js
#    De: const CACHE_VERSION = 'v1.0.1';
#    A: const CACHE_VERSION = 'v1.0.2';

# 2. Hacer build
npm run build

# 3. Servir (preview o servidor)
npm run preview
# O subir dist/ a servidor

# 4. Abrir la app en navegador

# 5. Verificar:
# - ✅ El SW detecta la nueva versión
# - ✅ Se muestra banner de actualización
# - ✅ Al hacer clic en "Actualizar", se recarga
# - ✅ El nuevo cache se crea
# - ✅ El cache antiguo se elimina
```

---

## 🔍 VERIFICACIÓN EN CONSOLA

### Mensajes Esperados

**Al cargar la app:**
```
[SW] Registered: http://localhost:8096/
```

**Cuando hay actualización:**
```
[SW] New version available
```

**Al actualizar:**
```
[SW] Installing service worker...
[SW] Caching static assets
[SW] Activating service worker...
[SW] Deleting old cache: emerges-tes-v1.0.1
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

### Instalación PWA
- [ ] La app se puede instalar (Add to Home Screen)
- [ ] El icono aparece correctamente
- [ ] El nombre aparece correctamente
- [ ] Se abre en modo standalone

### Funcionamiento Offline
- [ ] La app carga sin internet
- [ ] Las imágenes cargan desde cache
- [ ] Los archivos Markdown cargan desde cache
- [ ] La navegación funciona offline

### Actualizaciones
- [ ] El SW detecta nuevas versiones
- [ ] Se muestra notificación de actualización
- [ ] La actualización funciona correctamente
- [ ] El cache se actualiza correctamente

---

## 🚨 PROBLEMAS COMUNES

### Problema: SW no se registra

**Solución:**
1. Verificar que `sw.js` está en `public/`
2. Verificar que se copia a `dist/` en el build
3. Limpiar cache del navegador
4. Verificar consola para errores

### Problema: Actualizaciones no se detectan

**Solución:**
1. Incrementar `CACHE_VERSION` en `sw.js`
2. Hacer nuevo build
3. Verificar que el nuevo `sw.js` está en el servidor
4. Forzar actualización: DevTools > Application > Service Workers > "Update"

### Problema: Cache no se actualiza

**Solución:**
1. Cambiar `CACHE_VERSION` en `sw.js`
2. Hacer build y desplegar
3. Limpiar cache manualmente si es necesario

---

**Última actualización:** 2024-12-19
