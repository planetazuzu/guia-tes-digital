# 🔧 Solución Completa: Error useLayoutEffect

## ❌ Error
```
Uncaught TypeError: Cannot read properties of undefined (reading 'useLayoutEffect')
at vendor-other-RJb9Jc5z.js:18:11569
```

## 🔍 Diagnóstico

Este error indica que:
1. **El navegador está usando una versión ANTIGUA en caché**
2. El archivo `vendor-other-RJb9Jc5z.js` es de un build anterior
3. El nuevo build NO genera `vendor-other` (o genera uno diferente)
4. El Service Worker o caché del navegador está sirviendo la versión antigua

## ✅ Soluciones Aplicadas

### 1. Code Splitting Mejorado
- ✅ Todo lo relacionado con React está en `vendor-react`
- ✅ Eliminado `vendor-other` (todo va a `vendor-utils`)
- ✅ Añadido `dedupe: ['react', 'react-dom']` en Vite

### 2. Service Worker Actualizado
- ✅ Versión de cache actualizada a `v1.0.2`
- ✅ Esto fuerza al navegador a descargar nuevos archivos

## 🔧 Solución Inmediata (OBLIGATORIO)

### Paso 1: Desactivar Service Worker

**Chrome/Edge:**
1. Abre DevTools (F12)
2. Ve a **Application** > **Service Workers**
3. Para cada Service Worker activo:
   - Click en **Unregister**
   - Marca "Bypass for network" si está disponible
4. Cierra DevTools

**Firefox:**
1. Abre DevTools (F12)
2. Ve a **Application** > **Almacenamiento** > **Service Workers**
3. Click en **Desregistrar**
4. Cierra DevTools

### Paso 2: Limpiar Caché del Navegador

**Chrome/Edge:**
- `Ctrl+Shift+Delete` (Windows/Linux)
- `Cmd+Shift+Delete` (Mac)
- Selecciona:
  - ✅ "Cached images and files"
  - ✅ "Hosted app data" (si está disponible)
- Rango: **"Todo el tiempo"**
- Click en **"Borrar datos"**

**Firefox:**
- `Ctrl+Shift+Delete` (Windows/Linux)
- `Cmd+Shift+Delete` (Mac)
- Selecciona:
  - ✅ "Caché"
  - ✅ "Datos de sitios web"
- Rango: **"Todo"**
- Click en **"Limpiar ahora"**

### Paso 3: Limpiar Cache Storage

**Chrome/Edge:**
1. DevTools (F12) > **Application** > **Cache Storage**
2. Click derecho en cada cache > **Delete**
3. O selecciona todos y click en el icono de papelera

**Firefox:**
1. DevTools (F12) > **Application** > **Almacenamiento** > **Caché**
2. Click en **"Limpiar todo"**

### Paso 4: Recargar

1. **Cierra TODAS las pestañas** de la aplicación
2. Cierra el navegador completamente
3. Abre el navegador de nuevo
4. Navega a la aplicación
5. Recarga con recarga forzada:
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

### Paso 5: Verificar (Opcional - Modo Incógnito)

1. Abre una ventana incógnita/privada
2. Navega a la aplicación
3. Si funciona en incógnito, confirma que es problema de caché

## 🔧 En el Servidor

Asegúrate de que el build se hizo con el nuevo código:

```bash
cd /var/www/emerges-tes
git pull origin main

# Limpiar completamente
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Rebuild
npm run build

# Verificar que NO existe vendor-other-RJb9Jc5z.js
ls -la dist/assets/ | grep vendor-other
# Deberías ver vendor-other-CP1puROj.js (nuevo) o nada
```

## 🧪 Verificación

Después de limpiar caché, verifica en DevTools:

1. **Network tab:**
   - Recarga la página
   - Busca `vendor-other` en las peticiones
   - Verifica que el hash sea diferente (no `RJb9Jc5z`)

2. **Console:**
   - No debería aparecer el error de `useLayoutEffect`
   - Si aparece, el caché no se limpió correctamente

## 💡 Si el Problema Persiste

1. **Verificar que el build en servidor es correcto:**
   ```bash
   ssh root@207.180.226.141
   cd /var/www/emerges-tes
   ls -la dist/assets/ | grep vendor
   ```

2. **Forzar actualización del Service Worker:**
   - Incrementar `CACHE_VERSION` en `public/sw.js`
   - Hacer nuevo build y deploy

3. **Desactivar Service Worker temporalmente:**
   - Comentar el registro en `src/main.tsx`
   - Hacer build y deploy
   - Probar sin Service Worker

## 📋 Checklist Final

- [ ] Service Worker desactivado
- [ ] Caché del navegador limpiado
- [ ] Cache Storage limpiado
- [ ] Navegador cerrado y reabierto
- [ ] Recarga forzada realizada
- [ ] Build en servidor actualizado
- [ ] Verificado que no hay `vendor-other-RJb9Jc5z.js` en Network tab

## 🎯 Causa Raíz

El problema es **caché del navegador/Service Worker**, no el código. El código está correcto, pero el navegador está usando una versión antigua que tenía React mal resuelto.

La solución es **limpiar completamente el caché** siguiendo los pasos arriba.

