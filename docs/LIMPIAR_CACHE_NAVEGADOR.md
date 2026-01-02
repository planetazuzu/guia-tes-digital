# 🧹 Cómo Limpiar el Caché del Navegador

## ❌ Problema
El navegador está usando una versión antigua en caché (`vendor-other-RJb9Jc5z.js`), aunque el servidor tiene el build nuevo correcto.

## ✅ Solución: Limpiar Caché Completamente

### Método 1: Limpieza Completa (Recomendado)

#### Chrome/Edge:
1. Abre DevTools (`F12`)
2. Click derecho en el botón de recargar (🔄)
3. Selecciona **"Vaciar caché y volver a cargar de forma forzada"** (Empty Cache and Hard Reload)

#### Firefox:
1. Abre DevTools (`F12`)
2. Click derecho en el botón de recargar (🔄)
3. Selecciona **"Vaciar caché y recargar"** (Empty Cache and Hard Reload)

### Método 2: Limpieza Manual

#### Chrome/Edge:
1. `Ctrl+Shift+Delete` (o `Cmd+Shift+Delete` en Mac)
2. Selecciona:
   - ✅ **"Imágenes y archivos en caché"** (Cached images and files)
   - ✅ **"Archivos alojados en caché"** (Hosted app data)
3. Período: **"Todo el tiempo"** (All time)
4. Click **"Borrar datos"** (Clear data)

#### Firefox:
1. `Ctrl+Shift+Delete` (o `Cmd+Shift+Delete` en Mac)
2. Selecciona:
   - ✅ **"Caché"** (Cache)
3. Período: **"Todo"** (Everything)
4. Click **"Limpiar ahora"** (Clear Now)

### Método 3: Desregistrar Service Worker

1. Abre DevTools (`F12`)
2. Ve a la pestaña **"Application"** (o **"Aplicación"**)
3. En el menú lateral, expande **"Service Workers"**
4. Click en **"Unregister"** (Desregistrar) para cada Service Worker activo
5. Ve a **"Storage"** (Almacenamiento) > **"Clear site data"** (Limpiar datos del sitio)
6. Recarga la página con `Ctrl+Shift+R`

### Método 4: Modo Incógnito (Prueba Rápida)

1. Abre una ventana de incógnito (`Ctrl+Shift+N` o `Cmd+Shift+N`)
2. Navega a: `http://207.180.226.141:8607`
3. Verifica que NO aparece `vendor-other` en DevTools > Network

## 🔍 Verificación

Después de limpiar el caché:

1. Abre DevTools (`F12`)
2. Ve a la pestaña **"Network"** (Red)
3. Recarga la página (`Ctrl+Shift+R`)
4. Busca `vendor-other` en la lista de archivos
5. **NO debería aparecer** `vendor-other`
6. Solo deberías ver:
   - `vendor-react-XXXXX.js`
   - `vendor-utils-XXXXX.js`
   - `vendor-markdown-XXXXX.js`

## ⚠️ Si el Problema Persiste

Si después de limpiar el caché todavía ves `vendor-other`:

1. **Verifica que el servidor tiene el build nuevo:**
   ```bash
   ssh root@207.180.226.141
   cd /var/www/emerges-tes
   ls -la dist/assets/ | grep vendor-other
   # NO debería aparecer nada
   ```

2. **Verifica que el Service Worker se actualizó:**
   - DevTools > Application > Service Workers
   - Debería mostrar `v1.0.3` (o superior)

3. **Fuerza la actualización del Service Worker:**
   - DevTools > Application > Service Workers
   - Click en **"Update"** (Actualizar)
   - Espera a que se actualice
   - Click en **"Unregister"** y luego recarga

4. **Limpia el caché del Service Worker:**
   - DevTools > Application > Storage
   - Click en **"Clear site data"**
   - Marca todas las opciones
   - Click en **"Clear site data"**

## 🎯 Resultado Esperado

Después de limpiar el caché correctamente:
- ✅ NO aparece `vendor-other` en Network
- ✅ Solo aparecen `vendor-react`, `vendor-utils`, `vendor-markdown`
- ✅ El error `useLayoutEffect` desaparece
- ✅ La aplicación carga correctamente

