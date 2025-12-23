# 📊 Análisis Tecnológico Completo del Proyecto

**Proyecto:** EMERGES TES - Protocolo Rápido  
**Fecha de Análisis:** 2025-12-23  
**Ruta del Proyecto:** `/home/planetazuzu/protocolo-r-pido`

---

## 1. 🎯 TECNOLOGÍAS PRINCIPALES

### 1.1 Lenguaje de Programación

- **TypeScript 5.8.3** (lenguaje principal)
  - Configuración: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
  - Modo: ESNext modules, bundler mode
  - JSX: `react-jsx`
  - Target: ES2020 (app), ES2022 (node)

### 1.2 Framework Frontend

- **React 18.3.1** (framework principal)
  - React DOM 18.3.1
  - React Router DOM 6.30.1 (navegación SPA)
  - React Hook Form 7.61.1 (formularios)
  - React Markdown 10.1.0 (renderizado Markdown)

### 1.3 Herramientas de Build y Empaquetado

- **Vite 5.4.19** (build tool principal)
  - Plugin: `@vitejs/plugin-react-swc` 3.11.0 (compilación rápida con SWC)
  - Code splitting configurado (manual chunks)
  - Soporte para PWA
  - Configuración para GitHub Pages

### 1.4 Estilos y UI

- **Tailwind CSS 3.4.17** (framework CSS)
  - Plugins:
    - `tailwindcss-animate` 1.0.7
    - `@tailwindcss/typography` 0.5.16
  - PostCSS 8.5.6
  - Autoprefixer 10.4.21

- **shadcn/ui** (sistema de componentes)
  - Basado en Radix UI
  - Componentes accesibles y personalizables
  - 40+ componentes UI implementados

- **Radix UI** (primitivos UI accesibles)
  - 30+ componentes @radix-ui/*

### 1.5 Procesamiento de Contenido

- **Markdown Processing:**
  - `react-markdown` 10.1.0
  - `remark-gfm` 4.0.1 (GitHub Flavored Markdown)
  - `remark-frontmatter` 5.0.0
  - `rehype-highlight` 7.0.2 (syntax highlighting)
  - `rehype-raw` 7.0.0
  - `rehype-sanitize` 6.0.0
  - `unified` 11.0.5

### 1.6 Gestión de Estado y Datos

- **TanStack Query 5.83.0** (React Query)
  - Gestión de estado del servidor
  - Caché y sincronización

- **LocalStorage/SessionStorage**
  - Favoritos (localStorage)
  - Historial de búsqueda (sessionStorage)
  - Configuración de tema

### 1.7 PWA (Progressive Web App)

- **Service Worker** (`public/sw.js`)
  - Estrategia: Cache First
  - Versionado de caché
  - Actualizaciones automáticas

- **Web App Manifest** (`public/manifest.json`)
  - Configuración PWA completa
  - Iconos y temas

### 1.8 Utilidades y Librerías Clave

- **Validación:** Zod 3.25.76
- **Fechas:** date-fns 3.6.0
- **Iconos:** lucide-react 0.462.0
- **Temas:** next-themes 0.3.0
- **Notificaciones:** sonner 1.7.4
- **Gráficos:** recharts 2.15.4
- **Carousel:** embla-carousel-react 8.6.0
- **Comandos:** cmdk 1.1.1
- **Utilidades CSS:** clsx 2.1.1, tailwind-merge 2.6.0

---

## 2. 🏗️ ESTRUCTURA DEL PROYECTO

### 2.1 Tipo de Arquitectura

**SPA (Single Page Application)**
- Arquitectura: Frontend monolítico
- Routing: Client-side (React Router)
- Build: Estático (Vite)
- Despliegue: Archivos estáticos en `dist/`

### 2.2 Carpetas Principales

```
protocolo-r-pido/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml         # Auto-deploy a servidor
├── public/                     # Archivos estáticos públicos
│   ├── assets/                # Imágenes e infografías
│   │   └── infografias/       # Imágenes organizadas por bloque
│   ├── manual/                # Archivos Markdown del manual (78 archivos)
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service Worker
│   ├── favicon.svg            # Favicon
│   └── robots.txt             # SEO
├── src/                        # Código fuente principal
│   ├── components/            # Componentes React
│   │   ├── content/          # MarkdownViewer
│   │   ├── drugs/            # Componentes de fármacos
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── procedures/       # Protocolos
│   │   ├── tools/            # Calculadoras médicas
│   │   └── ui/               # Componentes shadcn/ui (40+)
│   ├── data/                 # Datos estáticos TypeScript
│   │   ├── drugs.ts          # Vademécum
│   │   ├── procedures.ts     # Protocolos
│   │   ├── manual-index.ts   # Índice del manual (2500+ líneas)
│   │   └── image-registry.ts # Registry de imágenes
│   ├── hooks/                # Custom React hooks
│   │   ├── useFavorites.ts
│   │   ├── usePWAInstall.ts
│   │   ├── useServiceWorker.ts
│   │   └── useSearchHistory.ts
│   ├── lib/                  # Utilidades
│   │   └── utils.ts         # Funciones helper
│   ├── pages/                # Páginas principales (20+)
│   ├── utils/                # Utilidades específicas
│   ├── App.tsx               # Componente raíz
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globales
├── scripts/                   # Scripts Python y shell
│   ├── verificar-manual.ts   # Verificación TypeScript
│   └── *.py                  # Scripts de organización
├── docs/                      # Documentación
├── _BACKUP_MD/               # Backups (203 archivos)
├── imagenes-pendientes/      # Imágenes pendientes (60 archivos)
└── [Archivos de configuración]
```

### 2.3 Configuraciones Detectadas

**Build & Development:**
- `vite.config.ts` - Configuración Vite (code splitting, aliases, PWA)
- `tsconfig.json` - TypeScript base
- `tsconfig.app.json` - TypeScript para app
- `tsconfig.node.json` - TypeScript para Node (configs)

**Estilos:**
- `tailwind.config.ts` - Configuración Tailwind (tema, colores, animaciones)
- `postcss.config.js` - PostCSS (Tailwind + Autoprefixer)

**Linting:**
- `eslint.config.js` - ESLint 9.32.0 (flat config)
- `eslint-plugin-react-hooks` 5.2.0
- `eslint-plugin-react-refresh` 0.4.20
- `typescript-eslint` 8.38.0

**Deployment:**
- `ecosystem.config.js` - PM2 (puerto 8607)
- `deploy.sh` - Script de despliegue
- `webhook-deploy.sh` - Webhook handler
- `.github/workflows/deploy.yml` - GitHub Actions
- `vercel.json` - Configuración Vercel
- `netlify.toml` - Configuración Netlify
- `nginx.conf.example` - Ejemplo Nginx
- `public/_redirects` - Netlify redirects
- `public/.htaccess` - Apache config

**PWA:**
- `public/manifest.json` - Web App Manifest
- `public/sw.js` - Service Worker
- `vite-plugin-manifest.js` - Plugin personalizado

**UI Components:**
- `components.json` - Configuración shadcn/ui

---

## 3. 📦 DEPENDENCIAS

### 3.1 Gestión de Dependencias

- **Sistema:** npm (Node Package Manager)
- **Archivo:** `package.json`
- **Type:** `module` (ESM)
- **Node.js:** Requiere 18+

### 3.2 Dependencias de Producción (75 paquetes)

**Core:**
- react ^18.3.1
- react-dom ^18.3.1
- react-router-dom ^6.30.1

**UI Framework:**
- @radix-ui/* (30+ componentes)
- tailwindcss ^3.4.17
- tailwindcss-animate ^1.0.7
- @tailwindcss/typography ^0.5.16

**Markdown:**
- react-markdown ^10.1.0
- remark-gfm ^4.0.1
- remark-frontmatter ^5.0.0
- rehype-highlight ^7.0.2
- rehype-raw ^7.0.0
- rehype-sanitize ^6.0.0
- unified ^11.0.5

**State & Data:**
- @tanstack/react-query ^5.83.0
- react-hook-form ^7.61.1
- zod ^3.25.76

**Utilities:**
- date-fns ^3.6.0
- lucide-react ^0.462.0
- next-themes ^0.3.0
- sonner ^1.7.4
- clsx ^2.1.1
- tailwind-merge ^2.6.0

**Other:**
- recharts ^2.15.4
- embla-carousel-react ^8.6.0
- cmdk ^1.1.1
- vaul ^0.9.9

### 3.3 Dependencias de Desarrollo (15 paquetes)

**Build Tools:**
- vite ^5.4.19
- @vitejs/plugin-react-swc ^3.11.0
- typescript ^5.8.3

**Linting:**
- eslint ^9.32.0
- @eslint/js ^9.32.0
- typescript-eslint ^8.38.0
- eslint-plugin-react-hooks ^5.2.0
- eslint-plugin-react-refresh ^0.4.20

**CSS Processing:**
- tailwindcss ^3.4.17
- postcss ^8.5.6
- autoprefixer ^10.4.21

**Type Definitions:**
- @types/node ^22.16.5
- @types/react ^18.3.23
- @types/react-dom ^18.3.7

**Utilities:**
- tsx ^4.21.0 (TypeScript execution)
- raw-loader ^4.0.2
- globals ^15.15.0

### 3.4 Versiones de Herramientas

- **Node.js:** 18+ (recomendado)
- **npm:** Compatible con Node 18+
- **TypeScript:** 5.8.3
- **React:** 18.3.1
- **Vite:** 5.4.19

---

## 4. 🛠️ ENTORNO DE DESARROLLO

### 4.1 Archivos de Configuración de IDE

**VSCode:**
- `.vscode/extensions.json` (si existe)
- Configuración TypeScript en `tsconfig.json`

**Otros:**
- `.idea/` (ignorado en .gitignore)
- `.DS_Store` (ignorado)

### 4.2 Scripts de Ejecución

**package.json scripts:**
```json
{
  "dev": "vite",                          // Desarrollo (puerto 8096)
  "build": "vite build",                 // Build producción
  "build:dev": "vite build --mode development",
  "build:github": "GITHUB_PAGES=true ...", // Build para GitHub Pages
  "build:production": "NODE_ENV=production vite build",
  "preview": "vite preview --host",      // Preview build
  "start:production": "npx serve -s dist -l 8607", // Servir producción
  "lint": "eslint .",                    // Linter
  "verify:manual": "tsx scripts/verificar-manual.ts" // Verificación
}
```

**Scripts Shell:**
- `deploy.sh` - Deploy completo (git pull + build + PM2)
- `webhook-deploy.sh` - Handler webhook
- `servir-local.sh` - Servir localmente

### 4.3 Variables de Entorno

**Archivos:**
- `.env` (ignorado, no existe en repo)
- `.env.local` (ignorado)
- `.env.production` (ignorado)
- `.env.development` (ignorado)
- `env.example` (ejemplo, existe)

**Variables usadas:**
- `GITHUB_PAGES` - Para builds de GitHub Pages
- `GITHUB_REPOSITORY_NAME` - Nombre del repo
- `NODE_ENV` - Entorno (development/production)
- `BASE_URL` - Base path dinámico (Vite)

### 4.4 Configuración de Desarrollo

**Puertos:**
- Desarrollo: `8096` (vite.config.ts)
- Preview: `4173` (Vite default)
- Producción: `8607` (ecosystem.config.js, package.json)

**Hot Reload:**
- ✅ Habilitado en desarrollo (Vite HMR)
- ✅ Fast Refresh (React)

**Code Splitting:**
- ✅ Configurado en `vite.config.ts`
- ✅ Lazy loading de páginas (React.lazy)
- ✅ Manual chunks por librería

---

## 5. 📁 ESTRUCTURA DE ARCHIVOS ESPECÍFICA

### 5.1 Archivos de Configuración Raíz

```
├── package.json              # Dependencias y scripts
├── vite.config.ts           # Configuración Vite
├── tsconfig.json            # TypeScript base
├── tsconfig.app.json        # TypeScript app
├── tsconfig.node.json       # TypeScript node
├── tailwind.config.ts       # Tailwind CSS
├── postcss.config.js        # PostCSS
├── eslint.config.js         # ESLint
├── components.json          # shadcn/ui config
├── ecosystem.config.js      # PM2 config
├── deploy.sh               # Script deploy
├── webhook-deploy.sh        # Webhook handler
├── vercel.json             # Vercel config
├── netlify.toml            # Netlify config
├── nginx.conf.example      # Nginx example
├── .gitignore              # Git ignore
└── README.md               # Documentación
```

### 5.2 Contenido Estático

**Markdown Manual:**
- `public/manual/` - 78 archivos .md organizados por bloques
- `MANUAL_TES_DIGITAL/` - 110 archivos .md (backup/alternativo)

**Imágenes:**
- `public/assets/infografias/` - 46+ imágenes PNG/SVG organizadas
- `imagenes-pendientes/` - 60 imágenes pendientes de organizar

**Otros:**
- `_BACKUP_MD/` - 203 archivos de backup (129 .md, 62 .docx, 7 .py)

### 5.3 Scripts y Utilidades

**Python Scripts:**
- `analisis_profundo_contenido.py`
- `buscar_multimedia_exhaustivo.py`
- `buscar_multimedia_faltante.py`
- `copiar_archivos_manual.py`
- `generar_documento_word.py`
- `generar_indice_app.py`
- `generar_reportes_app.py`
- `mejorar_reporte_1.py`
- `scripts/*.py` - Scripts de organización

**TypeScript Scripts:**
- `scripts/verificar-manual.ts` - Verificación de manual

**Shell Scripts:**
- `deploy.sh` - Deploy
- `webhook-deploy.sh` - Webhook
- `servir-local.sh` - Servir local
- `reorganizar_proyecto.sh` - Reorganización

---

## 6. 🔍 CARACTERÍSTICAS TÉCNICAS DETECTADAS

### 6.1 Arquitectura de Código

- ✅ **Component-based:** React components
- ✅ **Type-safe:** TypeScript en todo el código
- ✅ **Modular:** Separación clara de concerns
- ✅ **Lazy Loading:** React.lazy para páginas
- ✅ **Code Splitting:** Manual chunks en Vite

### 6.2 PWA Features

- ✅ Service Worker con versionado
- ✅ Web App Manifest completo
- ✅ Offline-first strategy
- ✅ Install banner
- ✅ Update notifications

### 6.3 Performance Optimizations

- ✅ Code splitting (manual chunks)
- ✅ Lazy loading de páginas
- ✅ Image lazy loading
- ✅ Memoization (React.memo, useMemo, useCallback)
- ✅ Optimización de INP (Interaction to Next Paint)

### 6.4 SEO y Accesibilidad

- ✅ Meta tags en index.html
- ✅ robots.txt
- ✅ Semantic HTML
- ✅ ARIA labels (Radix UI)
- ✅ Dark mode support

---

## 7. 📊 ESTADÍSTICAS DEL PROYECTO

### 7.1 Archivos por Tipo

- **TypeScript/TSX:** ~136 archivos en `src/`
- **Markdown:** 78 archivos en `public/manual/` + 110 en backup
- **Imágenes:** 46+ en `public/assets/` + 60 pendientes
- **Componentes UI:** 40+ componentes shadcn/ui
- **Páginas:** 20+ páginas React
- **Hooks:** 4 custom hooks
- **Data Files:** 12 archivos TypeScript de datos

### 7.2 Líneas de Código (estimado)

- `src/data/manual-index.ts`: 2500+ líneas
- `src/App.tsx`: ~130 líneas
- `vite.config.ts`: ~168 líneas
- Total TypeScript/TSX: ~15,000+ líneas (estimado)

### 7.3 Dependencias

- **Producción:** 75 paquetes
- **Desarrollo:** 15 paquetes
- **Total:** 90 paquetes npm

---

## 8. 🚀 DESPLIEGUE Y CI/CD

### 8.1 Plataformas de Despliegue Configuradas

1. **Servidor Propio (PM2)**
   - Puerto: 8607
   - Script: `deploy.sh`
   - Config: `ecosystem.config.js`

2. **GitHub Actions**
   - Workflow: `.github/workflows/deploy.yml`
   - Auto-deploy en push a main

3. **Vercel**
   - Config: `vercel.json`
   - SPA routing configurado

4. **Netlify**
   - Config: `netlify.toml`
   - Redirects: `public/_redirects`

5. **GitHub Pages**
   - Build script: `build:github`
   - Base path dinámico

6. **Apache**
   - Config: `public/.htaccess`
   - SPA routing

7. **Nginx**
   - Example: `nginx.conf.example`
   - Reverse proxy

### 8.2 Estrategias de Despliegue

- ✅ **Static Build:** `dist/` con archivos estáticos
- ✅ **SPA Routing:** Configurado para todas las plataformas
- ✅ **Auto-deploy:** GitHub Actions
- ✅ **Manual Deploy:** Scripts shell

---

## 9. 📝 DOCUMENTACIÓN

### 9.1 Archivos de Documentación (40+ archivos .md)

**Despliegue:**
- `DEPLOYMENT_SERVER.md`
- `DEPLOYMENT_GITHUB.md`
- `VERCEL_DEPLOYMENT.md`
- `RESUMEN_DEPLOY_8607.md`

**PWA:**
- `VERIFICACION_PWA.md`
- `TEST_PWA.md`
- `CHECKLIST_PWA_COMPLETA.md`
- `GUIA_DEBUG_PWA_INSTALL.md`
- `RESUMEN_PWA_INSTALACION.md`

**Contenido:**
- `FASE_1_FALTANTE_DETALLADO.md`
- `ANALISIS_COMPLETO_FALTANTE.md`
- `SISTEMA_MEDIOS_VISUALES.md`
- `PLAN_ESTRUCTURA_PSIQUIATRIA.md`

**Otros:**
- `README.md`
- `ESTADO_FUNCIONALIDADES.md`
- `SPA_ROUTING_CONFIG.md`
- Y muchos más...

---

## 10. ✅ RESUMEN EJECUTIVO

### Stack Tecnológico Principal

```
Frontend:     React 18 + TypeScript 5.8
Build:        Vite 5.4
Styling:      Tailwind CSS 3.4 + shadcn/ui
Routing:      React Router 6.3
State:        TanStack Query 5.8 + LocalStorage
PWA:          Service Worker + Manifest
Markdown:     react-markdown + remark/rehype
Deploy:       PM2 (puerto 8607) + GitHub Actions
```

### Tipo de Proyecto

- **Aplicación:** SPA (Single Page Application)
- **Arquitectura:** Frontend monolítico
- **Build:** Estático (archivos estáticos)
- **Target:** PWA offline-first
- **Uso:** Médico/emergencias (crítico)

### Puntos Clave para Limpieza

1. **Backups:** `_BACKUP_MD/` (203 archivos) - considerar mover/eliminar
2. **Imágenes pendientes:** `imagenes-pendientes/` (60 archivos)
3. **Documentación:** 40+ archivos .md (algunos pueden consolidarse)
4. **Scripts Python:** 10+ scripts (algunos pueden estar obsoletos)
5. **Configuraciones múltiples:** 7 plataformas de deploy (mantener solo las usadas)

---

**Análisis completado:** 2025-12-23  
**Próximo paso:** Identificar archivos obsoletos y redundantes para limpieza
