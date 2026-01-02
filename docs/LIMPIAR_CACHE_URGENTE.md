# 🚨 LIMPIEZA URGENTE DE CACHÉ - Error useLayoutEffect Persiste

## ❌ Problema

El navegador está usando una versión **ANTIGUA** en caché:
- ❌ `vendor-utils-ClLzZSLi.js` (hash antiguo - versión antigua)
- ✅ `1-vendor-utils-aDTNHcbX.js` (hash nuevo - versión actual)

El build nuevo está correcto, pero el navegador sigue usando el build antiguo.

## ✅ Solución RÁPIDA (2 minutos)

### Método 1: Script Automático (Más Rápido)

1. **Abrir la aplicación:**
   ```
   http://207.180.226.141:8607
   ```

2. **Abrir DevTools (F12)**

3. **Ir a la pestaña "Console"**

4. **Pegar y ejecutar este código:**

```javascript
// LIMPIEZA COMPLETA Y AUTOMÁTICA
(async () => {
  console.log('🧹 Iniciando limpieza completa...');
  
  // 1. Desregistrar todos los Service Workers
  const registrations = await navigator.serviceWorker.getRegistrations();
  for (let registration of registrations) {
    await registration.unregister();
    console.log('✅ Service Worker desregistrado');
  }
  
  // 2. Eliminar todos los cachés
  const cacheNames = await caches.keys();
  for (let name of cacheNames) {
    await caches.delete(name);
    console.log('✅ Caché eliminado:', name);
  }
  
  // 3. Limpiar localStorage y sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  console.log('✅ Storage limpiado');
  
  // 4. Recargar página
  console.log('🔄 Recargando página...');
  setTimeout(() => {
    window.location.reload(true);
  }, 1000);
})();
```

5. **Presionar Enter** y esperar a que se recargue

### Método 2: Manual (Si el script no funciona)

1. **DevTools > Application > Service Workers:**
   - Click en "Unregister" para cada Service Worker

2. **DevTools > Application > Cache Storage:**
   - Click derecho en cada caché → "Delete"
   - O seleccionar todos y "Delete All"

3. **DevTools > Application > Storage:**
   - Click en "Clear site data"
   - Marcar todas las opciones
   - Click en "Clear site data"

4. **Cerrar DevTools y recargar:**
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

### Método 3: Modo Incógnito (Más Simple)

1. **Abrir ventana incógnita:**
   - `Ctrl+Shift+N` (Windows/Linux)
   - `Cmd+Shift+N` (Mac)

2. **Ir a:**
   ```
   http://207.180.226.141:8607
   ```

3. **Verificar en DevTools > Network:**
   - Debe aparecer `1-vendor-utils-aDTNHcbX.js` (nuevo)
   - NO debe aparecer `vendor-utils-ClLzZSLi.js` (antiguo)

## 🔍 Verificación

Después de limpiar el caché, verifica:

1. **DevTools > Network:**
   - Recargar la página (`Ctrl+Shift+R`)
   - Buscar archivos vendor
   - Debe aparecer:
     - `0-vendor-react-*.js` (nuevo)
     - `1-vendor-utils-*.js` (nuevo)
     - `2-vendor-markdown-*.js` (nuevo)
   - NO debe aparecer:
     - `vendor-utils-ClLzZSLi.js` (antiguo)
     - `vendor-other-*.js` (nunca)

2. **DevTools > Console:**
   - NO debe aparecer el error:
     ```
     TypeError: Cannot read properties of undefined (reading 'useLayoutEffect')
     ```

## ⚠️ Si el Problema Persiste

Si después de limpiar el caché todavía ves el error:

1. **Verificar que el servidor tiene el build nuevo:**
   ```bash
   ssh root@207.180.226.141
   cd /var/www/emerges-tes
   ls -la dist/assets/ | grep vendor
   ```
   Debe mostrar archivos con prefijos `0-`, `1-`, `2-`

2. **Verificar Service Worker en el servidor:**
   ```bash
   cat dist/sw.js | grep CACHE_VERSION
   ```
   Debe mostrar `v1.0.4`

3. **Forzar actualización del Service Worker:**
   - DevTools > Application > Service Workers
   - Click en "Update"
   - Esperar a que se actualice
   - Click en "Unregister"
   - Recargar página

## 📝 Notas

- El build nuevo está **CORRECTO** en el servidor
- El problema es **CACHÉ DEL NAVEGADOR**
- El Service Worker está en versión `v1.0.4` (elimina cachés antiguos automáticamente)
- Después de limpiar el caché, el error debería desaparecer

