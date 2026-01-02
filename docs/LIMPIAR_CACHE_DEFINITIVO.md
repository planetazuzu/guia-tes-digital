# 🚨 LIMPIEZA DEFINITIVA DE CACHÉ - Error useLayoutEffect

## ❌ Problema Persistente

El navegador sigue usando `vendor-utils-ClLzZSLi.js` (hash antiguo) aunque el servidor tiene `1-vendor-utils-aDTNHcbX.js` (hash nuevo).

## ✅ Solución DEFINITIVA (3 métodos)

### Método 1: Script Automático (RECOMENDADO)

1. **Abrir:** `http://207.180.226.141:8607`
2. **Abrir DevTools (F12) > Console**
3. **Pegar y ejecutar:**

```javascript
(async () => {
  console.log('🧹 LIMPIEZA DEFINITIVA DE CACHÉ...');
  
  try {
    // 1. Desregistrar TODOS los Service Workers
    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log(`📋 Encontrados ${registrations.length} Service Worker(s)`);
    
    for (let registration of registrations) {
      const unregistered = await registration.unregister();
      console.log('✅ Service Worker desregistrado:', registration.scope);
    }
    
    // 2. Eliminar TODOS los cachés
    const cacheNames = await caches.keys();
    console.log(`📋 Encontrados ${cacheNames.length} caché(s)`);
    
    for (let name of cacheNames) {
      const deleted = await caches.delete(name);
      console.log('✅ Caché eliminado:', name, deleted ? '✓' : '✗');
    }
    
    // 3. Limpiar TODOS los storages
    localStorage.clear();
    sessionStorage.clear();
    console.log('✅ localStorage y sessionStorage limpiados');
    
    // 4. Limpiar IndexedDB (si existe)
    if ('indexedDB' in window) {
      try {
        const databases = await indexedDB.databases();
        for (let db of databases) {
          indexedDB.deleteDatabase(db.name);
          console.log('✅ IndexedDB eliminado:', db.name);
        }
      } catch (e) {
        console.warn('⚠️ No se pudo limpiar IndexedDB:', e);
      }
    }
    
    console.log('✅ LIMPIEZA COMPLETA');
    console.log('🔄 Recargando página en 2 segundos...');
    
    setTimeout(() => {
      window.location.href = window.location.href.split('?')[0] + '?nocache=' + Date.now();
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    alert('Error durante la limpieza. Por favor, limpia manualmente.');
  }
})();
```

4. **Presionar Enter** y esperar

### Método 2: Limpieza Manual Completa

1. **DevTools (F12) > Application**

2. **Service Workers:**
   - Click en "Unregister" para cada uno
   - Marcar "Bypass for network" si está disponible

3. **Cache Storage:**
   - Click derecho en cada caché → "Delete"
   - O seleccionar todos → "Delete All"

4. **Storage:**
   - Click en "Clear site data"
   - Marcar TODAS las opciones:
     - ✅ Cookies and other site data
     - ✅ Cached images and files
     - ✅ Offline website data
   - Click en "Clear site data"

5. **Cerrar DevTools**

6. **Recargar con caché limpio:**
   - `Ctrl+Shift+Delete` → Seleccionar "Cached images and files" → "Clear data"
   - O `Ctrl+Shift+R` (Windows/Linux) / `Cmd+Shift+R` (Mac)

### Método 3: Modo Incógnito + Hard Reload

1. **Abrir ventana incógnita:**
   - `Ctrl+Shift+N` (Windows/Linux)
   - `Cmd+Shift+N` (Mac)

2. **Abrir DevTools (F12) > Network**

3. **Ir a:** `http://207.180.226.141:8607`

4. **Verificar en Network:**
   - Debe aparecer: `1-vendor-utils-aDTNHcbX.js` (nuevo)
   - NO debe aparecer: `vendor-utils-ClLzZSLi.js` (antiguo)

## 🔍 Verificación Post-Limpieza

### 1. Verificar Chunks en Network

**DevTools > Network > Recargar página:**

✅ **DEBE aparecer:**
- `0-vendor-react-*.js` (nuevo, con prefijo 0-)
- `1-vendor-utils-*.js` (nuevo, con prefijo 1-)
- `2-vendor-markdown-*.js` (nuevo, con prefijo 2-)

❌ **NO debe aparecer:**
- `vendor-utils-ClLzZSLi.js` (antiguo, sin prefijo)
- `vendor-other-*.js` (nunca debe aparecer)

### 2. Verificar Console

**DevTools > Console:**

✅ **NO debe aparecer:**
```
TypeError: Cannot read properties of undefined (reading 'useLayoutEffect')
```

✅ **Puede aparecer (no crítico):**
- Errores de extensiones del navegador (Apollo DevTools, etc.)
- Warnings de CORS de extensiones

### 3. Verificar Service Worker

**DevTools > Application > Service Workers:**

✅ **DEBE mostrar:**
- Versión: `v1.0.4` o superior
- Estado: "activated and is running"

❌ **NO debe mostrar:**
- Versiones antiguas (`v1.0.2`, `v1.0.3` sin actualizar)

## ⚠️ Si el Problema Persiste

### Verificar Servidor

```bash
ssh root@207.180.226.141
cd /var/www/emerges-tes
ls -la dist/assets/ | grep vendor
```

**DEBE mostrar:**
- `0-vendor-react-*.js`
- `1-vendor-utils-*.js`
- `2-vendor-markdown-*.js`

### Rebuild en Servidor

Si el servidor no tiene el build nuevo:

```bash
cd /var/www/emerges-tes
git pull origin main
npm install
npm run build
```

### Verificar Service Worker en Servidor

```bash
cat dist/sw.js | grep CACHE_VERSION
```

**DEBE mostrar:**
```
const CACHE_VERSION = 'v1.0.4';
```

## 📝 Notas Importantes

1. **El build nuevo está CORRECTO** en el servidor
2. **El problema es CACHÉ DEL NAVEGADOR**
3. **Los errores de extensiones** (Apollo DevTools, etc.) no son críticos
4. **Después de limpiar el caché**, el error debería desaparecer completamente

## 🎯 Resultado Esperado

Después de limpiar el caché:

✅ Aplicación carga correctamente  
✅ `1-vendor-utils-*.js` se carga (nuevo)  
✅ NO aparece `vendor-utils-ClLzZSLi.js` (antiguo)  
✅ NO hay errores `useLayoutEffect`  
✅ Service Worker en versión `v1.0.4`  

