# 🔧 Solución: vendor-other en Docker/Producción

## ❌ Problema

```
vendor-other-*.js: Uncaught TypeError: Cannot read properties of undefined (reading 'useLayoutEffect')
```

El build en Docker está generando `vendor-other`, lo cual causa errores críticos en producción.

## ✅ Solución Implementada

### 1. Configuración Estricta de Vite (`vite.config.ts`)

**Cambios aplicados:**
- ✅ Añadidas TODAS las dependencias conocidas a `vendor-react` o `vendor-utils`
- ✅ Eliminado completamente `vendor-other` - todo va a `vendor-utils` como fallback
- ✅ Error en producción si se detecta una dependencia sin clasificar

**Chunks esperados:**
- `vendor-react-*.js` - React y todas las librerías que lo usan
- `vendor-utils-*.js` - Utilidades que NO usan React
- `vendor-markdown-*.js` - Procesamiento de Markdown
- ❌ `vendor-other-*.js` - **NO DEBE EXISTIR**

### 2. Verificación Post-Build (`scripts/verify-build.js`)

Script que se ejecuta automáticamente después de `npm run build`:

```bash
npm run build
# Automáticamente ejecuta: node scripts/verify-build.js
```

**Verifica:**
- ✅ Que NO existe `vendor-other`
- ✅ Que existen los chunks esperados
- ✅ Que `index.html` no referencia `vendor-other`
- ❌ Falla el build si encuentra `vendor-other`

### 3. Dockerfile con Verificación

El Dockerfile ahora incluye verificación automática:

```dockerfile
# CRÍTICO: Verificar que NO se generó vendor-other
RUN if ls dist/assets/vendor-other* 2>/dev/null; then \
      echo "❌ ERROR CRÍTICO: vendor-other fue generado"; \
      exit 1; \
    fi
```

**El build de Docker FALLA si se genera `vendor-other`.**

### 4. Manifest.json Corregido

- ✅ Eliminadas referencias a screenshots que no existen
- ✅ Resuelve errores 401/404 en `manifest.json`

## 🚀 Uso

### Build Local con Verificación

```bash
npm run build
# Automáticamente verifica que no hay vendor-other
```

### Build en Docker

```bash
docker build -t emerges-tes .
# El build falla automáticamente si se genera vendor-other
```

### Verificación Manual

```bash
npm run verify:build
```

## 🔍 Troubleshooting

### Si el build falla con "vendor-other fue generado"

1. **Revisar logs del build:**
   ```bash
   npm run build 2>&1 | grep -i "unclassified"
   ```

2. **Añadir la dependencia no clasificada a `vite.config.ts`:**
   - Si usa React → añadir a `vendor-react`
   - Si NO usa React → añadir a `vendor-utils`

3. **Ejemplo:**
   ```typescript
   // Si aparece: [Vite] Unclassified dependency: /path/to/module
   // Y el módulo usa React:
   if (id.includes('nuevo-modulo-react')) {
     return 'vendor-react';
   }
   ```

### Si el build pasa pero el error persiste en producción

1. **Verificar que el build en Docker es el mismo que local:**
   ```bash
   # Local
   npm run build
   ls -la dist/assets/ | grep vendor
   
   # En Docker
   docker build -t emerges-tes .
   docker run --rm emerges-tes ls -la dist/assets/ | grep vendor
   ```

2. **Limpiar caché del navegador:**
   - Ver `docs/LIMPIAR_CACHE_NAVEGADOR.md`

3. **Verificar Service Worker:**
   - DevTools > Application > Service Workers
   - Debe estar en versión `v1.0.3` o superior
   - Hacer "Unregister" si es necesario

## 📋 Checklist Pre-Deploy

- [ ] Build local pasa sin errores
- [ ] `npm run verify:build` pasa
- [ ] No hay warnings de "Unclassified dependency" en producción
- [ ] Docker build pasa sin errores
- [ ] Verificado que `dist/assets/` NO contiene `vendor-other`
- [ ] Service Worker actualizado a `v1.0.3+`
- [ ] Manifest.json no tiene referencias a archivos inexistentes

## 🎯 Resultado Esperado

Después de aplicar estas correcciones:

✅ Build genera solo: `vendor-react`, `vendor-utils`, `vendor-markdown`  
✅ NO genera `vendor-other`  
✅ Docker build falla si se genera `vendor-other`  
✅ Verificación automática post-build  
✅ Errores `useLayoutEffect` resueltos  
✅ Manifest.json sin errores 401/404  

