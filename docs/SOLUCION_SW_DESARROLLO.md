# Solución: Service Worker en Desarrollo

## Problema

El Service Worker estaba interceptando peticiones de Vite en desarrollo, causando:
- Errores de fetch para `main.tsx` y otros módulos
- Fallos en WebSocket de HMR (Hot Module Replacement)
- Conflictos entre cache del SW y servidor de desarrollo

## Solución Implementada

### 1. Service Worker no se registra en desarrollo

**Archivos modificados:**
- `src/main.tsx` - Detecta desarrollo y no registra SW
- `src/hooks/useServiceWorker.ts` - Detecta desarrollo y no registra SW

**Lógica:**
```typescript
const isDevelopment = import.meta.env.DEV || 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1';
```

### 2. Service Worker ignora peticiones de Vite

**Archivo modificado:**
- `public/sw.js` - Ignora peticiones de Vite en localhost

**Peticiones ignoradas:**
- `/src/*` - Módulos fuente
- `/@*` - Vite HMR
- `*.tsx`, `*.ts` - Archivos TypeScript
- WebSocket (ws:, wss:)
- Peticiones con timestamps de Vite

## Limpiar Service Worker Existente

Si ya tienes un SW registrado, necesitas desregistrarlo:

### Opción 1: Desde DevTools

1. Abre DevTools (F12)
2. Ve a **Application** → **Service Workers**
3. Click en **Unregister** para cada SW registrado
4. Recarga la página

### Opción 2: Desde Consola

```javascript
// Ejecutar en consola del navegador
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => {
    registration.unregister();
    console.log('SW unregistered');
  });
});
```

### Opción 3: Limpiar Cache

1. DevTools → **Application** → **Clear storage**
2. Marcar "Cache storage" y "Service Workers"
3. Click en "Clear site data"

## Verificación

Después de limpiar el SW:

1. **Recarga la página** (Ctrl+Shift+R o Cmd+Shift+R)
2. **Verifica en DevTools:**
   - Application → Service Workers → No debe haber SW activo
   - Console → No debe haber errores de SW
3. **Verifica HMR:**
   - Hacer un cambio en un archivo
   - Debe recargar automáticamente sin errores

## Comportamiento

### En Desarrollo (localhost)
- ✅ SW **NO se registra**
- ✅ Vite maneja todas las peticiones directamente
- ✅ HMR funciona correctamente
- ✅ Sin conflictos de cache

### En Producción
- ✅ SW **SÍ se registra**
- ✅ Funcionalidad PWA completa
- ✅ Cache para funcionamiento offline
- ✅ Actualizaciones automáticas

## Notas

- El SW seguirá funcionando en producción
- Los cambios son compatibles con el código existente
- No se requiere configuración adicional
- El SW se desregistra automáticamente en desarrollo

---

**Estado:** ✅ Solucionado - SW no interfiere en desarrollo

