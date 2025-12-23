# 🚀 Guía de Despliegue en Vercel

**Fecha:** 2025-12-23

---

## 🔍 PROBLEMA ACTUAL

Las actualizaciones no se están desplegando automáticamente en Vercel porque:

1. **Vercel no está conectado al repositorio de GitHub** (o el webhook no está activo)
2. **No hay despliegue automático configurado** desde GitHub
3. **Falta hacer un despliegue manual** o configurar la integración

---

## ✅ SOLUCIÓN: Configurar Vercel

### Opción 1: Conectar Vercel con GitHub (Recomendado)

1. **Ir a [vercel.com](https://vercel.com)** e iniciar sesión

2. **Importar proyecto:**
   - Click en "Add New..." → "Project"
   - Conectar con GitHub
   - Seleccionar el repositorio: `planetazuzu/guia-tes-digital`

3. **Configurar el proyecto:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (raíz del proyecto)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci` (o `npm install`)

4. **Variables de entorno (si las hay):**
   - Añadir en "Environment Variables" si es necesario

5. **Deploy:**
   - Click en "Deploy"
   - Vercel detectará automáticamente los cambios futuros en `main`

**Resultado:** Cada push a `main` desplegará automáticamente en Vercel.

---

### Opción 2: Despliegue Manual con CLI

Si prefieres desplegar manualmente:

```bash
# 1. Instalar Vercel CLI (si no está instalado)
npm install -g vercel

# 2. Iniciar sesión en Vercel
vercel login

# 3. Desplegar (primera vez)
vercel

# 4. Desplegar a producción
vercel --prod
```

**Nota:** Esto requiere tener Vercel CLI instalado y estar autenticado.

---

### Opción 3: GitHub Actions (Automático)

Crear un workflow de GitHub Actions para desplegar automáticamente:

**Archivo:** `.github/workflows/vercel-deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Requisitos:**
- Añadir secrets en GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- Obtener estos valores desde el dashboard de Vercel

---

## 📋 CONFIGURACIÓN ACTUAL

### `vercel.json` (Ya configurado ✅)

El archivo `vercel.json` ya está configurado correctamente con:
- **SPA Routing:** Todas las rutas redirigen a `index.html`
- **Cache Headers:** 
  - `index.html` → no-cache (para actualizaciones)
  - Assets estáticos → cache largo (1 año)

### Build Command

Vercel debe usar:
```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos.

---

## 🔧 VERIFICACIÓN

### 1. Verificar que Vercel está conectado:

1. Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Ver si el proyecto `guia-tes-digital` aparece
3. Verificar que está conectado a `planetazuzu/guia-tes-digital`

### 2. Verificar despliegues:

1. En el dashboard de Vercel, ver la pestaña "Deployments"
2. Debe aparecer un despliegue por cada push a `main`
3. Si no hay despliegues recientes, el webhook no está activo

### 3. Verificar configuración del proyecto:

En Vercel Dashboard → Settings → General:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm ci`

---

## 🚨 TROUBLESHOOTING

### Problema: "No se despliega automáticamente"

**Solución:**
1. Verificar que Vercel está conectado al repositorio
2. Verificar que el webhook de GitHub está activo
3. Hacer un despliegue manual para forzar la actualización

### Problema: "Build falla en Vercel"

**Solución:**
1. Verificar logs en Vercel Dashboard
2. Asegurar que `package.json` tiene el script `build`
3. Verificar que Node.js versión es compatible (18+)

### Problema: "Rutas SPA no funcionan"

**Solución:**
- El `vercel.json` ya está configurado correctamente
- Si persiste, verificar que el archivo está en la raíz del proyecto

---

## 📝 PRÓXIMOS PASOS

1. **Conectar Vercel con GitHub** (Opción 1 - Recomendado)
   - Es la forma más fácil y automática
   - Cada push a `main` desplegará automáticamente

2. **O hacer despliegue manual** (Opción 2)
   - Si prefieres control manual
   - Ejecutar `vercel --prod` después de cada push importante

3. **O configurar GitHub Actions** (Opción 3)
   - Para más control y visibilidad
   - Requiere configurar secrets

---

## ✅ CHECKLIST

- [ ] Vercel está conectado al repositorio de GitHub
- [ ] El webhook está activo (verificar en GitHub Settings → Webhooks)
- [ ] La configuración del proyecto en Vercel es correcta
- [ ] El `vercel.json` está en la raíz (✅ ya está)
- [ ] El build funciona localmente (`npm run build`)
- [ ] Se ha hecho al menos un despliegue exitoso

---

**Última actualización:** 2025-12-23
