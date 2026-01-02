# 🧹 Cómo Limpiar el Caché del Navegador y Service Worker

## ❌ Problema
El navegador está cargando `vendor-other-RJb9Jc5z.js` (versión antigua) desde el caché, aunque el servidor ya tiene el build nuevo sin `vendor-other`.

## ✅ Solución: Limpiar Caché Completamente

### Método 1: Chrome/Edge (Recomendado)

1. **Abrir DevTools:**
   - `F12` o `Ctrl+Shift+I` (Windows/Linux)
   - `Cmd+Option+I` (Mac)

2. **Ir a la pestaña "Application" (Aplicación):**
   - En el menú lateral izquierdo, expandir "Storage" (Almacenamiento)

3. **Limpiar Service Workers:**
   - Click en "Service Workers"
   - Click en "Unregister" para cada Service Worker activo
   - O click en "Update" para forzar actualización

4. **Limpiar Caché:**
   - Click en "Cache Storage"
   - Click derecho en cada caché → "Delete"
   - O seleccionar todos y click en "Delete All"

5. **Limpiar Almacenamiento Local:**
   - Click en "Local Storage"
   - Click derecho → "Clear"
   - Repetir para "Session Storage"

6. **Cerrar DevTools y recargar:**
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

### Método 2: Limpieza Rápida (Chrome/Edge)

1. **Abrir la página:**
   - `http://207.180.226.141:8607`

2. **Abrir DevTools:**
   - `F12`

3. **Ir a Console (Consola):**
   - Pegar y ejecutar este código:

```javascript
// Limpiar Service Workers
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
    console.log('Service Worker desregistrado');
  }
});

// Limpiar todos los cachés
caches.keys().then(function(names) {
  for (let name of names) {
    caches.delete(name);
    console.log('Caché eliminado:', name);
  }
});

// Limpiar localStorage y sessionStorage
localStorage.clear();
sessionStorage.clear();
console.log('Storage limpiado');

// Recargar página
setTimeout(() => {
  window.location.reload(true);
}, 1000);
```

4. **Presionar Enter** y esperar a que se recargue la página

### Método 3: Modo Incógnito (Más Simple)

1. **Abrir ventana incógnita:**
   - `Ctrl+Shift+N` (Windows/Linux)
   - `Cmd+Shift+N` (Mac)

2. **Ir a:**
   - `http://207.180.226.141:8607`

3. **Verificar en DevTools > Network:**
   - NO debería aparecer `vendor-other`
   - Solo `vendor-react`, `vendor-utils`, `vendor-markdown`

### Método 4: Limpieza Completa del Navegador

1. **Abrir Configuración del Navegador:**
   - Chrome: `chrome://settings/clearBrowserData`
   - Edge: `edge://settings/clearBrowserData`

2. **Seleccionar:**
   - ✅ "Cached images and files" (Imágenes y archivos en caché)
   - ✅ "Cookies and other site data" (Opcional)
   - Período: "All time" (Todo el tiempo)

3. **Click en "Clear data" (Borrar datos)**

4. **Cerrar y reabrir el navegador**

5. **Ir a:**
   - `http://207.180.226.141:8607`

## 🔍 Verificación

Después de limpiar el caché, verifica:

1. **Abrir DevTools > Network:**
   - Recargar la página (`Ctrl+Shift+R`)
   - Buscar "vendor-other" en la lista
   - **NO debería aparecer**

2. **Verificar chunks cargados:**
   - Deberías ver:
     - `vendor-react-XXXXX.js`
     - `vendor-utils-XXXXX.js`
     - `vendor-markdown-XXXXX.js`
   - **NO** `vendor-other-XXXXX.js`

3. **Verificar en Console:**
   - NO debería aparecer el error:
     ```
     TypeError: Cannot read properties of undefined (reading 'useLayoutEffect')
     ```

## ⚠️ Si el Problema Persiste

Si después de limpiar el caché todavía ves `vendor-other`:

1. **Verificar que el servidor tiene el build nuevo:**
   ```bash
   ssh root@207.180.226.141
   cd /var/www/emerges-tes
   ls -la dist/assets/ | grep vendor-other
   # NO debería aparecer nada
   ```

2. **Verificar Service Worker:**
   - DevTools > Application > Service Workers
   - Debería mostrar versión `v1.0.3`
   - Si muestra versión antigua, hacer "Unregister" y recargar

3. **Forzar actualización del Service Worker:**
   - DevTools > Application > Service Workers
   - Click en "Update"
   - Esperar a que se actualice
   - Click en "Unregister" si es necesario
   - Recargar página

## 📝 Notas

- El Service Worker ahora está en versión `v1.0.3`
- Esta versión elimina automáticamente los cachés antiguos
- El build nuevo NO genera `vendor-other`
- El error `useLayoutEffect` se resuelve cuando se carga el build correcto

