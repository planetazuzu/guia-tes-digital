# 🔧 Comandos para Rebuild Completo en el Servidor

## ❌ Problema
El servidor está sirviendo `vendor-other-RJb9Jc5z.js` (build antiguo).

## ✅ Solución: Rebuild Completo

### Conectarse al Servidor
```bash
ssh root@207.180.226.141
```

### Ejecutar estos Comandos (Paso a Paso)

```bash
# 1. Ir al directorio
cd /var/www/emerges-tes

# 2. Verificar estado actual
git status
git log --oneline -3

# 3. Actualizar código (resolver conflictos si hay)
git config pull.rebase false
git pull origin main

# Si hay conflicto en README.md:
# git checkout --theirs README.md
# git add README.md
# git commit -m "merge: resolver conflicto"

# 4. LIMPIAR COMPLETAMENTE (CRÍTICO - esto elimina el build antiguo)
rm -rf node_modules
rm -f package-lock.json
rm -rf dist

# 5. Reinstalar dependencias limpias
npm install

# 6. Verificar que no hay duplicados de React
npm ls react react-dom | head -5

# 7. Hacer build de producción
npm run build

# 8. VERIFICAR que NO hay vendor-other (CRÍTICO)
ls -la dist/assets/ | grep vendor-other

# Si aparece algo, el build está mal. Si NO aparece nada, está correcto.

# 9. Ver qué chunks se generaron
ls -lh dist/assets/ | grep vendor

# Deberías ver:
# - vendor-react-XXXXX.js
# - vendor-utils-XXXXX.js
# - vendor-markdown-XXXXX.js
# - NO vendor-other
```

## 🧪 Verificación

Después del rebuild, verifica:

```bash
# Ver tamaño de chunks
ls -lh dist/assets/vendor*.js

# Verificar que index.html existe
ls -lh dist/index.html

# Verificar que sw.js existe
ls -lh dist/sw.js
```

## 🔄 Reiniciar Servidor (si usas PM2)

```bash
# Si usas PM2
pm2 restart emerges-tes

# O si usas otro método, reinicia el servidor web
```

## 💡 Después del Rebuild

1. **En el navegador:**
   - Limpia caché completamente (Ctrl+Shift+Delete)
   - O usa modo incógnito
   - Recarga con Ctrl+Shift+R

2. **Verificar en DevTools:**
   - Network tab > Buscar "vendor-other"
   - NO debería aparecer
   - Solo deberías ver vendor-react, vendor-utils, vendor-markdown

## ⚠️ Si el Problema Persiste

Si después del rebuild todavía ves `vendor-other`:

1. **Verificar que el código está actualizado:**
   ```bash
   git log --oneline -5
   # Deberías ver commits recientes con "fix: consolidar React"
   ```

2. **Verificar vite.config.ts:**
   ```bash
   grep -A 5 "vendor-utils" vite.config.ts
   # Debería mostrar que todo va a vendor-utils, no vendor-other
   ```

3. **Hacer build con verbose:**
   ```bash
   npm run build 2>&1 | grep vendor
   # Ver qué chunks se generan
   ```

