# 🔧 Cómo Limpiar Caché del Navegador

## Problema
El navegador está usando una versión antigua de `vendor-other-RJb9Jc5z.js` en lugar de la nueva versión.

## Soluciones

### 1. Desactivar Service Worker (CRÍTICO)

**Chrome/Edge:**
1. Abre DevTools (F12)
2. Ve a la pestaña **Application**
3. En el menú lateral, busca **Service Workers**
4. Click en **Unregister** para cada Service Worker activo
5. Recarga la página (Ctrl+Shift+R)

**Firefox:**
1. Abre DevTools (F12)
2. Ve a la pestaña **Application** o **Almacenamiento**
3. Busca **Service Workers**
4. Click en **Desregistrar**
5. Recarga la página

### 2. Limpiar Caché del Navegador

**Chrome/Edge:**
- `Ctrl+Shift+Delete` (Windows/Linux)
- `Cmd+Shift+Delete` (Mac)
- Selecciona "Cached images and files"
- Rango de tiempo: "Todo el tiempo"
- Click en "Borrar datos"

**Firefox:**
- `Ctrl+Shift+Delete` (Windows/Linux)
- `Cmd+Shift+Delete` (Mac)
- Selecciona "Caché"
- Click en "Limpiar ahora"

### 3. Modo Incógnito (Prueba Rápida)

- Abre una ventana incógnita/privada
- Navega a la aplicación
- Si funciona en incógnito, confirma que es problema de caché

### 4. Hard Reload

- `Ctrl+Shift+R` (Windows/Linux)
- `Cmd+Shift+R` (Mac)
- Esto fuerza la recarga sin usar caché

### 5. Verificar Build en Servidor

```bash
ssh root@207.180.226.141
cd /var/www/emerges-tes
ls -la dist/assets/ | grep vendor-other
```

Deberías ver `vendor-other-CP1puROj.js` (nuevo), NO `vendor-other-RJb9Jc5z.js` (antiguo).

## Si el Problema Persiste

1. Verificar que el build se hizo correctamente en el servidor
2. Verificar que el Service Worker no está cacheando archivos antiguos
3. Considerar desactivar el Service Worker temporalmente en desarrollo

