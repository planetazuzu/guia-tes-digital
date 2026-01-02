# 🔧 Solución Definitiva: Error useLayoutEffect en Producción

## ❌ Problema Identificado

```
Uncaught TypeError: Cannot read properties of undefined (reading 'useLayoutEffect')
at vendor-other-*.js
```

### Causa Raíz

El error ocurre porque:

1. **`hast-util-to-jsx-runtime`** (dependencia de `react-markdown`) usa React pero estaba siendo clasificado como `vendor-utils`
2. **Orden de carga incorrecto**: Los chunks se cargaban en orden aleatorio, permitiendo que código que necesita React se ejecute antes de que React esté disponible
3. **Múltiples instancias potenciales**: Sin alias explícitos, diferentes partes del bundle podían resolver React desde diferentes ubicaciones

## ✅ Solución Implementada

### 1. Clasificación Correcta de Dependencias (`vite.config.ts`)

**Cambio crítico:**
```typescript
// CRÍTICO: hast-util-to-jsx-runtime USA React - debe estar en vendor-react
if (id.includes('hast-util-to-jsx-runtime')) {
  return 'vendor-react';
}
```

**Razón:** `hast-util-to-jsx-runtime` convierte HTML a JSX usando React, por lo que necesita React disponible cuando se carga.

### 2. Alias Explícitos de React (`vite.config.ts`)

```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
    // CRÍTICO: Forzar alias de React para asegurar una sola instancia
    "react": path.resolve(__dirname, "./node_modules/react"),
    "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime.js"),
  },
  dedupe: ["react", "react-dom", "react/jsx-runtime"],
}
```

**Razón:** Garantiza que todas las importaciones de React resuelven a la misma instancia física.

### 3. OptimizeDeps Mejorado (`vite.config.ts`)

```typescript
optimizeDeps: {
  include: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-markdown",
    "hast-util-to-jsx-runtime",
    "use-sidecar",
    "use-callback-ref",
    "@radix-ui/react-use-callback-ref",
    "react-router-dom",
    "@tanstack/react-query",
  ],
  esbuildOptions: {
    target: "es2020",
    jsx: "automatic",
  },
}
```

**Razón:** Pre-bundlea todas las dependencias React para que estén disponibles inmediatamente.

### 4. Overrides en package.json

```json
"overrides": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

**Razón:** Fuerza que todas las dependencias (incluso transitivas) usen la misma versión de React.

### 5. Orden de Carga de Chunks (`vite.config.ts`)

```typescript
chunkFileNames: (chunkInfo) => {
  // vendor-react debe tener prioridad en el nombre para cargarse primero
  if (chunkInfo.name === 'vendor-react') {
    return 'assets/vendor-react-[hash].js';
  }
  return 'assets/[name]-[hash].js';
}
```

**Razón:** Asegura que `vendor-react` se carga antes que otros chunks.

## 🧪 Verificación

### 1. Verificar Configuración

```bash
node scripts/diagnose-react.js
```

Debería mostrar:
- ✅ Versiones de React consistentes
- ✅ overrides configurado
- ✅ dedupe configurado
- ✅ alias de React configurado
- ✅ hast-util-to-jsx-runtime clasificado

### 2. Build y Verificación

```bash
npm run build
```

Debería:
- ✅ Completar sin errores
- ✅ NO generar `vendor-other`
- ✅ Generar `vendor-react`, `vendor-utils`, `vendor-markdown`
- ✅ Verificación post-build pasar

### 3. Verificar en Producción

1. **Abrir DevTools > Network**
2. **Recargar la página**
3. **Verificar orden de carga:**
   - `vendor-react-*.js` debe cargarse PRIMERO
   - Luego `vendor-utils-*.js` y `vendor-markdown-*.js`
   - NO debe aparecer `vendor-other-*.js`

4. **Verificar en Console:**
   - NO debe aparecer el error `useLayoutEffect`
   - NO debe haber warnings sobre React duplicado

## 🔍 Troubleshooting

### Si el error persiste

1. **Limpiar completamente:**
   ```bash
   rm -rf node_modules package-lock.json dist
   npm install
   npm run build
   ```

2. **Verificar que no hay React duplicado:**
   ```bash
   npm ls react react-dom
   ```
   Debe mostrar solo una versión de cada uno.

3. **Verificar chunks generados:**
   ```bash
   ls -la dist/assets/ | grep vendor
   ```
   NO debe aparecer `vendor-other`.

4. **Limpiar caché del navegador:**
   - Ver `docs/LIMPIAR_CACHE_NAVEGADOR.md`

### Si el build falla

1. **Revisar logs:**
   ```bash
   npm run build 2>&1 | grep -i "error\|unclassified"
   ```

2. **Añadir dependencia no clasificada:**
   - Si aparece una dependencia sin clasificar, añadirla a `vite.config.ts`
   - Si usa React → `vendor-react`
   - Si NO usa React → `vendor-utils`

## 📋 Checklist Pre-Deploy

- [ ] `npm run build` pasa sin errores
- [ ] `node scripts/diagnose-react.js` muestra todo ✅
- [ ] `node scripts/verify-build.js` pasa
- [ ] NO se genera `vendor-other`
- [ ] `vendor-react` se carga primero (verificar en Network tab)
- [ ] No hay errores `useLayoutEffect` en Console
- [ ] Docker build pasa sin errores

## 🎯 Resultado Esperado

Después de aplicar esta solución:

✅ **Una sola instancia de React** en todo el bundle  
✅ **Orden de carga correcto**: `vendor-react` primero  
✅ **Todas las dependencias React clasificadas correctamente**  
✅ **Sin errores `useLayoutEffect`**  
✅ **Build estable y reproducible**  

## 📝 Archivos Modificados

1. `vite.config.ts`
   - Alias explícitos de React
   - Clasificación de `hast-util-to-jsx-runtime` en `vendor-react`
   - `optimizeDeps` mejorado
   - Orden de carga de chunks

2. `package.json`
   - Añadido `overrides` para React

3. `scripts/diagnose-react.js` (nuevo)
   - Script de diagnóstico

4. `scripts/verify-build.js` (mejorado)
   - Verificación post-build

## 🔗 Referencias

- [Vite: Dependency Pre-bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
- [Vite: Build Options](https://vitejs.dev/config/build-options.html)
- [React: Multiple Versions](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework)

