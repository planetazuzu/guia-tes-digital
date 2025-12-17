# Guía de Despliegue - EMERGES TES

**Fecha:** 2025-12-17  
**Estado:** Aplicación lista para desplegar

---

## 📋 Estado Actual

**Despliegue actual:** ⚠️ **NO CONFIGURADO**

La aplicación está lista para desplegarse pero **no hay configuración de despliegue activa**. El build genera archivos estáticos en `dist/` que pueden desplegarse en cualquier plataforma.

---

## 🚀 Opciones de Despliegue Disponibles

### 1. Vercel (Recomendado para React/Vite)

**Ventajas:**
- ✅ Integración perfecta con Vite/React
- ✅ Deploy automático desde Git
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Preview deployments
- ✅ Gratis para proyectos personales

**Pasos:**

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Desplegar:**
   ```bash
   vercel
   ```

3. **O conectar repositorio en vercel.com:**
   - Ir a [vercel.com](https://vercel.com)
   - Conectar repositorio GitHub
   - Configuración automática detectada

**Configuración automática:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Archivo de configuración (opcional):** `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### 2. Netlify

**Ventajas:**
- ✅ Fácil deploy desde Git
- ✅ Drag & drop de carpeta `dist/`
- ✅ HTTPS automático
- ✅ Formularios y funciones serverless
- ✅ Gratis para proyectos personales

**Pasos:**

**Opción A: Desde Git**
1. Ir a [netlify.com](https://netlify.com)
2. Conectar repositorio
3. Configurar:
   - Build command: `npm run build`
   - Publish directory: `dist`

**Opción B: Drag & Drop**
1. Ejecutar `npm run build`
2. Arrastrar carpeta `dist/` a Netlify

**Archivo de configuración:** `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. GitHub Pages

**Ventajas:**
- ✅ Gratis con repositorio público
- ✅ Integración con GitHub
- ✅ Personalización de dominio

**Pasos:**

1. **Configurar Vite para GitHub Pages:**

   Editar `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/protocolo-r-pido/', // Nombre del repositorio
     // ... resto de configuración
   });
   ```

2. **Crear GitHub Action:** `.github/workflows/deploy.yml`
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm install
         
         - name: Build
           run: npm run build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **Habilitar GitHub Pages:**
   - Settings → Pages
   - Source: GitHub Actions

---

### 4. Servidor Propio (VPS/Shared Hosting)

**Pasos:**

1. **Build de producción:**
   ```bash
   npm run build
   ```

2. **Subir carpeta `dist/` al servidor:**
   ```bash
   # Ejemplo con rsync
   rsync -avz dist/ usuario@servidor:/var/www/html/
   
   # O con FTP/SFTP
   # Subir todo el contenido de dist/ a la raíz del servidor web
   ```

3. **Configurar servidor web:**

   **Nginx:**
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

   **Apache (.htaccess):**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 📦 Preparación para Despliegue

### 1. Verificar Build

```bash
# Build de producción
npm run build

# Verificar que dist/ se creó correctamente
ls -la dist/

# Previsualizar build localmente
npm run preview
```

### 2. Verificar Archivos Críticos

Asegurar que estos archivos estén en `dist/`:
- ✅ `index.html`
- ✅ `assets/` (JS, CSS)
- ✅ `manual/` (93 archivos .md)
- ✅ `manifest.json` (para PWA)

### 3. Verificar Rutas

Las rutas de React Router necesitan configuración especial:
- Todas las rutas deben redirigir a `index.html`
- Configurar rewrites/redirects según la plataforma

---

## 🔧 Configuración Recomendada por Plataforma

### Vercel

**Crear `vercel.json`:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/manual/(.*)",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/markdown"
        }
      ]
    }
  ]
}
```

### Netlify

**Crear `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/manual/*"
  [headers.values]
    Content-Type = "text/markdown"
```

### GitHub Pages

**Modificar `vite.config.ts`:**
```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' 
    ? '/protocolo-r-pido/' // Cambiar por nombre del repo
    : '/',
  // ... resto de configuración
});
```

---

## ✅ Checklist Pre-Despliegue

- [ ] Build exitoso (`npm run build`)
- [ ] Verificar que `dist/` contiene todos los archivos
- [ ] Verificar que los 93 archivos .md están en `dist/manual/`
- [ ] Probar build localmente (`npm run preview`)
- [ ] Verificar rutas funcionan correctamente
- [ ] Verificar PWA (manifest.json, service worker si existe)
- [ ] Configurar variables de entorno si es necesario
- [ ] Configurar dominio personalizado (opcional)

---

## 🌐 URLs de Ejemplo

Después del despliegue, la aplicación estará disponible en:

- **Vercel:** `https://protocolo-r-pido.vercel.app`
- **Netlify:** `https://protocolo-r-pido.netlify.app`
- **GitHub Pages:** `https://usuario.github.io/protocolo-r-pido`
- **Servidor propio:** `https://tu-dominio.com`

---

## 📝 Notas Importantes

### Archivos .md en Producción

Los archivos `.md` en `public/manual/` se copian automáticamente a `dist/manual/` durante el build. Asegurar que:

1. ✅ Los 93 archivos estén en `public/manual/`
2. ✅ El build los incluya en `dist/manual/`
3. ✅ Las rutas en el código apunten a `/manual/...`

### PWA (Progressive Web App)

La aplicación tiene `manifest.json` pero falta:
- ⚠️ Service Worker (para funcionamiento offline completo)
- ⚠️ Iconos de la app (para instalación)

### Variables de Entorno

Actualmente no hay variables de entorno necesarias. Si se agregan en el futuro:
- Crear `.env.example`
- Documentar variables requeridas
- Configurar en plataforma de despliegue

---

## 🚀 Comando Rápido de Despliegue

### Vercel (Más rápido)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arrastrar dist/ a netlify.com
```

### GitHub Pages
```bash
# Configurar GitHub Action (ver arriba)
git push origin main
```

---

## 📊 Comparación de Plataformas

| Plataforma | Facilidad | Costo | Performance | Recomendado |
|------------|-----------|-------|-------------|-------------|
| Vercel | ⭐⭐⭐⭐⭐ | Gratis | Excelente | ✅ Sí |
| Netlify | ⭐⭐⭐⭐ | Gratis | Muy buena | ✅ Sí |
| GitHub Pages | ⭐⭐⭐ | Gratis | Buena | ⚠️ Requiere config |
| Servidor propio | ⭐⭐ | Variable | Variable | ⚠️ Más trabajo |

---

**Recomendación:** **Vercel** para facilidad y performance óptima con Vite/React.

---

**Estado:** ✅ **Aplicación lista para desplegar - Falta configurar plataforma**
