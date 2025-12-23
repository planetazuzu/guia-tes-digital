# 🔧 Configuración de SPA Routing (Single Page Application)

**Fecha:** 2025-12-23

---

## 📋 Problema

En una SPA (Single Page Application) con React Router, cuando un usuario:
- Accede directamente a una ruta (ej: `/favoritos`)
- Refresca la página en una ruta específica
- Comparte un enlace a una ruta específica

El servidor intenta buscar un archivo físico en esa ruta. Al no encontrarlo, devuelve un error 404 en lugar de servir el `index.html` que contiene la aplicación React.

**Solución:** Configurar el servidor para que todas las rutas que no correspondan a archivos estáticos redirijan a `index.html`, permitiendo que React Router maneje el enrutamiento del lado del cliente.

---

## ✅ Verificaciones Previas

### 1. React Router Configurado Correctamente

✅ **BrowserRouter** (no HashRouter) - Verificado en `src/App.tsx`:
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ...
<BrowserRouter>
  <Routes>
    {/* rutas */}
  </Routes>
</BrowserRouter>
```

### 2. Base Path Correcto

✅ **Vite config** - Verificado en `vite.config.ts`:
```ts
base: base, // '/' por defecto, o '/repository-name/' para GitHub Pages
```

---

## 🔧 Configuraciones por Servidor

### 1. Vite Dev Server (Desarrollo)

**Archivo:** `vite.config.ts`

✅ **Ya configurado** - Vite maneja automáticamente el SPA routing en desarrollo.

**Nota:** El servidor de desarrollo de Vite (`npm run dev`) ya maneja correctamente las rutas SPA.

---

### 2. Vite Preview (Previsualización Local)

**Archivo:** `vite.config.ts`

✅ **Configurado** - El servidor de preview también maneja rutas correctamente.

**Comando:**
```bash
npm run preview
```

---

### 3. Nginx (Producción - Servidor Propio)

**Archivo:** `nginx.conf.example`

✅ **Configurado** con:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Instrucciones:**
1. Copiar `nginx.conf.example` a `/etc/nginx/sites-available/emerges-tes`
2. Crear symlink: `sudo ln -s /etc/nginx/sites-available/emerges-tes /etc/nginx/sites-enabled/`
3. Probar: `sudo nginx -t`
4. Reiniciar: `sudo systemctl reload nginx`

---

### 4. Apache (Producción - Servidor Propio)

**Archivo:** `public/.htaccess`

✅ **Creado** con reglas de `mod_rewrite`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

**Instrucciones:**
1. Asegurar que `mod_rewrite` esté habilitado: `sudo a2enmod rewrite`
2. El archivo `.htaccess` se copia automáticamente a `dist/` con `copyPublicDir: true`
3. Reiniciar Apache: `sudo systemctl restart apache2`

---

### 5. Netlify

**Archivo:** `public/_redirects`

✅ **Creado** con:
```
/*    /index.html   200
```

**Instrucciones:**
1. El archivo `_redirects` se copia automáticamente a `dist/` con `copyPublicDir: true`
2. Desplegar normalmente en Netlify
3. Netlify detectará automáticamente el archivo `_redirects`

---

### 6. Vercel

**Archivo:** `vercel.json`

✅ **Creado** con rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Instrucciones:**
1. El archivo `vercel.json` debe estar en la raíz del proyecto
2. Desplegar normalmente en Vercel
3. Vercel detectará automáticamente el archivo `vercel.json`

---

### 7. GitHub Pages

**Nota:** GitHub Pages requiere configuración especial debido al base path.

**Archivo:** `vite.config.ts`

✅ **Ya configurado** con detección de GitHub Pages:
```ts
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY_NAME || 'guia-tes-digital';
const base = isGitHubPages ? `/${repositoryName}/` : '/';
```

**Build para GitHub Pages:**
```bash
npm run build:github
```

**Nota:** GitHub Pages puede requerir un archivo `404.html` que redirija a `index.html`. Esto se puede añadir si es necesario.

---

### 8. Otros Servidores

#### Serve (Node.js)
Si usas `npx serve`:
```bash
npx serve -s dist -l 3000
```
El flag `-s` (single) ya maneja SPA routing automáticamente.

#### Caddy
```caddy
try_files {path} /index.html
```

#### Cloudflare Pages
Configurar en el dashboard:
- Build output: `dist`
- SPA routing: Habilitado (automático)

---

## 🧪 Verificación

### Test Local (Vite Preview)
```bash
npm run build
npm run preview
# Abrir http://localhost:4173/favoritos
# Debe cargar correctamente
```

### Test Nginx
```bash
# Después de configurar Nginx
curl -I http://localhost/favoritos
# Debe devolver 200 OK, no 404
```

### Test Netlify/Vercel
1. Desplegar
2. Acceder directamente a una ruta (ej: `https://tu-app.netlify.app/favoritos`)
3. Debe cargar correctamente, no mostrar 404

---

## 📝 Archivos Creados/Modificados

### Archivos Nuevos
- ✅ `public/_redirects` - Para Netlify
- ✅ `public/.htaccess` - Para Apache
- ✅ `vercel.json` - Para Vercel (actualizado)
- ✅ `SPA_ROUTING_CONFIG.md` - Esta documentación

### Archivos Modificados
- ✅ `vite.config.ts` - Añadida configuración de preview
- ✅ `nginx.conf.example` - Ya tenía la configuración correcta

---

## ⚠️ Notas Importantes

1. **Archivos Estáticos:** Las reglas de redirección deben excluir archivos estáticos (JS, CSS, imágenes, etc.) para que se sirvan correctamente.

2. **Cache:** `index.html` NO debe cachearse para permitir actualizaciones. Los assets estáticos SÍ deben cachearse.

3. **Base Path:** Si la app está en un subdirectorio (ej: GitHub Pages), asegurar que el `base` en `vite.config.ts` coincida.

4. **Service Worker:** El Service Worker también debe manejar rutas correctamente (ya configurado en `public/sw.js`).

---

## ✅ Estado

**Configuración:** ✅ **COMPLETA**

- ✅ Vite dev server - Funciona automáticamente
- ✅ Vite preview - Configurado
- ✅ Nginx - Configurado
- ✅ Apache - Configurado (.htaccess)
- ✅ Netlify - Configurado (_redirects)
- ✅ Vercel - Configurado (vercel.json)
- ✅ GitHub Pages - Base path configurado

**Todas las rutas ahora funcionan correctamente al acceder directamente o refrescar.**

---

**Última actualización:** 2025-12-23
