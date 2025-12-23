# 🔍 Diagnóstico de Errores - EMERGES TES

Guía de diagnóstico y solución de problemas específicos para el proyecto **EMERGES TES - Guía de Protocolos de Emergencias**.

---

## 🧹 Limpieza Rápida

### Script Automatizado
```bash
./scripts/limpiar_errores_desarrollo.sh
```

Este script:
- ✅ Limpia caché de Vite
- ✅ Elimina builds anteriores
- ✅ Verifica TypeScript
- ✅ Proporciona instrucciones para limpiar almacenamiento

---

## 🔧 Problemas Comunes y Soluciones

### 1. Error: "Cannot destructure property 'basename' of 'React2.useContext(...)' as it is null"

**Causa:** Componente `<Link>` o `<NavLink>` renderizado fuera del contexto de `<BrowserRouter>`

**Solución aplicada:**
- ✅ `ErrorBoundary` movido dentro de `<BrowserRouter>` en `src/App.tsx`
- ✅ Eliminado import de `Link` de `ErrorBoundary.tsx` (no se usa)

**Verificación:**
```typescript
// ✅ CORRECTO (ErrorBoundary dentro de BrowserRouter)
<BrowserRouter>
  <ErrorBoundary>
    {/* ... */}
  </ErrorBoundary>
</BrowserRouter>

// ❌ INCORRECTO (ErrorBoundary fuera de BrowserRouter)
<ErrorBoundary>
  <BrowserRouter>
    {/* ... */}
  </BrowserRouter>
</ErrorBoundary>
```

---

### 2. Error: "Failed to execute 'addAll' on 'Cache': Request failed"

**Causa:** Service Worker intenta cachear recursos que no existen o no son accesibles

**Solución aplicada:**
- ✅ Service Worker actualizado para usar `Promise.allSettled` en lugar de `cache.addAll`
- ✅ Manejo de errores individual para cada recurso
- ✅ El Service Worker continúa aunque algunos recursos fallen

**Código aplicado:**
```javascript
// En public/sw.js
return Promise.allSettled(
  STATIC_ASSETS.map(url => 
    cache.add(url).catch(err => {
      console.warn(`[SW] Failed to cache ${url}:`, err);
      return null;
    })
  )
);
```

---

### 3. Error: "Objects are not valid as a React child"

**Causa:** Componente React pasado como objeto en lugar de JSX

**Solución:**
- Verificar que los componentes lazy se rendericen correctamente
- Asegurar que los iconos se pasen como componentes, no como objetos
- Verificar que `Suspense` envuelva correctamente los componentes lazy

**Verificación:**
```typescript
// ✅ CORRECTO
const Icon = tab.icon;
<Icon className="w-4 h-4" />

// ❌ INCORRECTO
{tab.icon} // Si tab.icon es un componente, debe ser <tab.icon />
```

---

### 4. Errores de Almacenamiento Local (localStorage/sessionStorage)

**Síntomas:**
- Favoritos no se guardan
- Historial no funciona
- Errores en consola relacionados con storage

**Solución:**
```javascript
// En la consola del navegador (F12):
// Limpiar solo las claves de esta app
localStorage.removeItem('emerges-tes-favorites');
sessionStorage.removeItem('emerges-tes-search-history');
localStorage.removeItem('pwa-install-dismissed');

// O limpiar todo (cuidado: afecta otras apps)
localStorage.clear();
sessionStorage.clear();
```

**Desde DevTools:**
1. Abre DevTools (F12)
2. Pestaña "Application" → "Storage"
3. Limpia "Local Storage" y "Session Storage" para tu dominio

---

### 2. Service Worker Desactualizado

**Síntomas:**
- La app no carga offline
- Cambios no se reflejan después del deploy
- Errores en consola sobre service worker

**Solución:**
```javascript
// En la consola del navegador:
// 1. Desregistrar service worker
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => {
    registration.unregister();
    console.log('Service Worker desregistrado');
  });
});

// 2. Limpiar caché
caches.keys().then(names => {
  names.forEach(name => {
    caches.delete(name);
    console.log('Caché eliminada:', name);
  });
});

// 3. Recargar página con Ctrl+Shift+R (hard refresh)
```

---

### 3. Errores de Build

**Síntomas:**
- `npm run build` falla
- Errores de TypeScript
- Errores de módulos no encontrados

**Solución:**
```bash
# 1. Limpiar completamente
rm -rf node_modules dist node_modules/.vite package-lock.json

# 2. Reinstalar dependencias
npm install

# 3. Verificar TypeScript
npx tsc --noEmit

# 4. Rebuild
npm run build
```

---

### 4. Errores de HMR (Hot Module Replacement)

**Síntomas:**
- Cambios no se reflejan en desarrollo
- Errores de recarga en caliente
- Variables duplicadas

**Solución:**
```bash
# 1. Limpiar caché de Vite
rm -rf node_modules/.vite

# 2. Reiniciar servidor de desarrollo
# Ctrl+C para detener
npm run dev
```

---

### 5. Errores de React Router

**Síntomas:**
- Warnings sobre future flags
- Rutas no funcionan correctamente
- Navegación falla

**Solución:**
Ya está configurado en `src/App.tsx`:
```typescript
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

Si persisten warnings, verifica que la versión de react-router-dom sea compatible:
```bash
npm list react-router-dom
```

---

## ✅ Verificación del Proyecto

### Checklist de Diagnóstico

```bash
# 1. Verificar que estás en el proyecto correcto
pwd  # Debe ser: /home/planetazuzu/guia-tes

# 2. Verificar Node.js
node -v  # Debe ser >= 18

# 3. Verificar build
npm run build  # Debe compilar sin errores

# 4. Verificar TypeScript
npx tsc --noEmit  # No debe mostrar errores

# 5. Verificar linter
npm run lint  # Revisar warnings

# 6. Verificar servidor de desarrollo
npm run dev  # Debe iniciar en puerto 8096
```

---

## 🐛 Errores Específicos del Proyecto

### Error: "Cannot find module '@/...'"

**Causa:** Alias de TypeScript no configurado

**Solución:**
Verifica `tsconfig.json` y `vite.config.ts`:
```json
// tsconfig.json debe tener:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Error: "Markdown files not loading"

**Causa:** Archivos .md no están en `public/manual/`

**Solución:**
```bash
# Verificar que existen los archivos
ls -la public/manual/

# Debe haber 94 archivos .md en subdirectorios
find public/manual -name "*.md" | wc -l
```

---

### Error: "Service Worker registration failed"

**Causa:** `sw.js` no existe o está mal configurado

**Solución:**
```bash
# Verificar que existe
ls -la public/sw.js

# Si no existe, verifica src/main.tsx para el registro
```

---

## 📊 Estado Actual del Proyecto

### Almacenamiento Usado
- ✅ `localStorage`: Favoritos (`emerges-tes-favorites`)
- ✅ `sessionStorage`: Historial (`emerges-tes-search-history`)
- ✅ `localStorage`: Banner PWA (`pwa-install-dismissed`)
- ❌ **NO usa IndexedDB ni Dexie**

### Base de Datos
- ❌ Este proyecto **NO usa** bases de datos
- ❌ **NO usa** Dexie, IndexedDB, ni ninguna BD
- ✅ Solo usa almacenamiento del navegador (localStorage/sessionStorage)

---

## 🆘 Si Persisten los Errores

1. **Verifica el proyecto correcto**
   ```bash
   pwd
   cat package.json | grep name
   # Debe mostrar: "vite_react_shadcn_ts"
   ```

2. **Limpia completamente**
   ```bash
   ./scripts/limpiar_errores_desarrollo.sh
   rm -rf node_modules dist
   npm install
   ```

3. **Reconstruye**
   ```bash
   npm run build
   npm run dev
   ```

4. **Verifica en el navegador**
   - Abre DevTools (F12)
   - Revisa la pestaña "Console" para errores
   - Revisa la pestaña "Network" para recursos fallidos

---

## 📝 Notas Importantes

- Este proyecto **NO usa Dexie** ni IndexedDB
- Este proyecto **NO tiene** NominaUploader ni pdf-parser
- Este proyecto usa **localStorage/sessionStorage** para persistencia
- El proyecto compila **sin errores** actualmente

---

**Última actualización:** 2025-12-23  
**Proyecto:** EMERGES TES - Guía de Protocolos de Emergencias

