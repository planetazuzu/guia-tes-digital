# Limpieza Rápida del Service Worker en Desarrollo

## ⚠️ Problema

El Service Worker está interceptando peticiones de Vite en desarrollo, causando errores.

## ✅ Solución Rápida (Ejecutar en Consola del Navegador)

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Desregistrar todos los Service Workers
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => {
    registration.unregister().then(success => {
      console.log('SW unregistered:', success);
    });
  });
});

// Limpiar todos los caches
caches.keys().then(cacheNames => {
  cacheNames.forEach(cacheName => {
    caches.delete(cacheName).then(success => {
      console.log('Cache deleted:', cacheName, success);
    });
  });
});

// Recargar página
setTimeout(() => location.reload(), 1000);
```

## 🔄 Solución Automática

El código ya está configurado para:
1. **No registrar SW en desarrollo** (localhost)
2. **Desregistrar SW existente** automáticamente
3. **Limpiar caches** automáticamente

**Solo necesitas:**
1. Recargar la página (Ctrl+Shift+R o Cmd+Shift+R)
2. El código desregistrará el SW automáticamente
3. La página se recargará automáticamente

## 📋 Verificación

Después de recargar:

1. **DevTools → Application → Service Workers**
   - Debe mostrar: "No service workers are currently registered"

2. **DevTools → Application → Cache Storage**
   - Debe estar vacío o no existir

3. **Console**
   - Debe mostrar: `[SW] Development mode detected, unregistering...`
   - No debe haber errores de SW

4. **HMR debe funcionar**
   - Hacer un cambio en un archivo
   - Debe recargar automáticamente sin errores

## 🚀 Si Persiste el Problema

1. **Cerrar todas las pestañas** del localhost:8096
2. **Cerrar el navegador completamente**
3. **Abrir navegador de nuevo**
4. **Ir a localhost:8096**
5. **Ejecutar el script de limpieza** (arriba)

---

**Nota:** El código ahora detecta desarrollo automáticamente y desactiva el SW. Solo necesitas limpiar el SW que ya estaba registrado.

