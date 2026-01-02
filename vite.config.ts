import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { manifestPlugin } from "./vite-plugin-manifest";

// Detectar si estamos en GitHub Pages
// GitHub Pages usa el formato: https://username.github.io/repository-name/
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY_NAME || 'guia-tes-digital';
const base = isGitHubPages ? `/${repositoryName}/` : '/';

// https://vitejs.dev/config/
export default defineConfig({
  // Base path para GitHub Pages (necesario para rutas SPA)
  base: base,
  server: {
    host: "::",
    port: 8096,
    fs: {
      // Permitir acceso a archivos fuera del proyecto si es necesario
      strict: true,
    },
    // SPA fallback: todas las rutas no encontradas redirigen a index.html
    // Esto permite que React Router maneje el enrutamiento del lado del cliente
    middlewareMode: false,
  },
  preview: {
    port: 4173,
    // Configurar preview para SPA routing
    // Esto asegura que el servidor de preview también maneje rutas correctamente
  },
  plugins: [
    react(),
    manifestPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // CRÍTICO: Forzar alias de React para asegurar una sola instancia
      // Esto previene múltiples instancias de React en el bundle
      "react": path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime.js"),
    },
    // CRÍTICO: Forzar deduplicación de React para evitar errores useLayoutEffect
    // Esto asegura que solo hay una instancia de React en el bundle
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    // Asegurar que React se resuelve correctamente
    conditions: ["import", "module", "browser", "default"],
  },
  // Configuración para procesar archivos .md e imágenes
  assetsInclude: ["**/*.md", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg", "**/*.gif"],
  
  // Configuración de build para incluir archivos .md e imágenes
  build: {
    rollupOptions: {
      // Code splitting: dividir el bundle en chunks más pequeños
      output: {
        // CRÍTICO: Asegurar que vendor-react se carga PRIMERO
        // Esto garantiza que React está disponible antes que cualquier otro código
        entryFileNames: (chunkInfo) => {
          // El entry principal debe cargarse primero
          if (chunkInfo.name === 'index') {
            return 'assets/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
        // Ordenar chunks para que vendor-react se cargue primero
        chunkFileNames: (chunkInfo) => {
          // vendor-react debe tener prioridad en el nombre para cargarse primero
          if (chunkInfo.name === 'vendor-react') {
            return 'assets/vendor-react-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
        manualChunks: (id) => {
          // Separar node_modules en chunks por librería
          if (id.includes('node_modules')) {
            // SOLUCIÓN DRÁSTICA: Poner TODO lo relacionado con React en un solo chunk
            // Esto garantiza que React esté disponible antes de cualquier otro código
            // IMPORTANTE: Añadir TODAS las dependencias que usan React aquí
            if (
              id.includes('react') || 
              id.includes('react-dom') || 
              id.includes('scheduler') ||
              id.includes('react-router') ||
              id.includes('@radix-ui') ||
              id.includes('@tanstack') ||
              id.includes('lucide-react') ||
              id.includes('recharts') ||
              id.includes('react-hook-form') ||
              id.includes('@hookform') ||
              id.includes('react-day-picker') ||
              id.includes('embla-carousel-react') ||
              id.includes('next-themes') ||
              id.includes('sonner') ||
              id.includes('react-resizable-panels') ||
              id.includes('input-otp') ||
              id.includes('cmdk') ||
              id.includes('vaul') ||
              id.includes('react-markdown') ||
              id.includes('@floating-ui') ||
              id.includes('@remix-run/router') ||
              id.includes('use-callback-ref') ||
              id.includes('use-sidecar') ||
              id.includes('aria-hidden')
            ) {
              return 'vendor-react';
            }
            // CRÍTICO: hast-util-to-jsx-runtime USA React - debe estar en vendor-react
            if (id.includes('hast-util-to-jsx-runtime')) {
              return 'vendor-react';
            }
            // Markdown y procesamiento de texto (NO usa React directamente)
            if (id.includes('remark') || id.includes('rehype') || id.includes('unified') || id.includes('micromark') || id.includes('mdast')) {
              return 'vendor-markdown';
            }
            // Utilidades que NO usan React
            if (
              id.includes('zod') || 
              id.includes('date-fns') || 
              id.includes('clsx') || 
              id.includes('tailwind-merge') || 
              id.includes('class-variance-authority') ||
              id.includes('highlight.js') ||
              id.includes('hast-util') ||
              id.includes('unist-util') ||
              id.includes('vfile') ||
              id.includes('parse5') ||
              id.includes('entities') ||
              id.includes('property-information') ||
              id.includes('style-to-js') ||
              id.includes('style-to-object') ||
              id.includes('trough') ||
              id.includes('bail') ||
              id.includes('extend') ||
              id.includes('is-plain-obj') ||
              id.includes('zwitch') ||
              id.includes('web-namespaces') ||
              id.includes('html-void-elements') ||
              id.includes('html-url-attributes') ||
              id.includes('comma-separated-tokens') ||
              id.includes('space-separated-tokens') ||
              id.includes('estree-util') ||
              id.includes('decode-named-character-reference') ||
              id.includes('ccount') ||
              id.includes('markdown-table') ||
              id.includes('format') ||
              id.includes('hastscript') ||
              id.includes('vfile-location') ||
              id.includes('vfile-message') ||
              id.includes('unist-util-stringify-position') ||
              id.includes('unist-util-is') ||
              id.includes('unist-util-find-after') ||
              id.includes('unist-util-visit-parents') ||
              id.includes('trim-lines') ||
              id.includes('longest-streak') ||
              id.includes('hast-util-parse-selector') ||
              id.includes('detect-node-es') ||
              id.includes('get-nonce') ||
              id.includes('@ungap/structured-clone') ||
              id.includes('devlop') ||
              id.includes('fault') ||
              id.includes('hast-util-from-parse5') ||
              id.includes('hast-util-to-parse5') ||
              id.includes('inline-style-parser') ||
              id.includes('tslib')
            ) {
              return 'vendor-utils';
            }
            // CRÍTICO: Si llegamos aquí, algo se nos escapó
            // Por seguridad, mover TODO a vendor-utils en lugar de vendor-other
            // Esto previene que cualquier código desconocido use React antes de tiempo
            // En producción, esto NO debería ocurrir - todos los módulos deberían estar clasificados
            if (process.env.NODE_ENV === 'production') {
              console.error('[Vite] ERROR: Unclassified dependency in production:', id);
            } else {
              console.warn('[Vite] Unclassified dependency:', id);
            }
            return 'vendor-utils';
          }
          
          // Separar páginas en chunks individuales
          if (id.includes('/src/pages/')) {
            const pageName = id.split('/src/pages/')[1]?.split('.')[0];
            if (pageName) {
              // ManualViewer es muy grande, mantenerlo separado
              if (pageName === 'ManualViewer') {
                return 'page-manual-viewer';
              }
              return `page-${pageName.toLowerCase()}`;
            }
          }
          
          // Separar componentes grandes
          if (id.includes('/src/components/')) {
            // MarkdownViewer es grande (usa react-markdown)
            if (id.includes('MarkdownViewer')) {
              return 'component-markdown';
            }
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          
          // Mantener estructura de carpetas para archivos .md en public/
          if (name.endsWith('.md')) {
            if (name.includes('manual')) {
              return 'manual/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
          
          // Mantener estructura de carpetas para imágenes en public/assets/
          if (name.match(/\.(png|jpg|jpeg|svg|gif)$/i)) {
            // Si está en public/assets/infografias/, mantener estructura
            if (assetInfo.source && typeof assetInfo.source === 'string') {
              // Mantener estructura de carpetas para assets
              if (assetInfo.source.includes('assets/infografias')) {
                // Extraer ruta relativa desde public/
                const relativePath = assetInfo.source.split('public/')[1] || name;
                return relativePath;
              }
            }
            return 'assets/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Incluir archivos .md e imágenes en el build
    assetsInclude: ['**/*.md', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],
    // Copiar todo el directorio public/ a dist/ (incluye imágenes)
    copyPublicDir: true,
  },
  // Configuración para PWA
  // El service worker se copia automáticamente desde public/ con copyPublicDir
  
  // Configuración para importar archivos .md como texto usando ?raw
  // Ejemplo de uso:
  // import content from './file.md?raw'
  // Esto importará el contenido del archivo como string
  optimizeDeps: {
    // CRÍTICO: Incluir TODAS las dependencias que usan React
    // Esto asegura que React está disponible cuando se necesitan
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
    exclude: [],
    // Forzar pre-bundling de React para evitar problemas de resolución
    esbuildOptions: {
      target: "es2020",
      // Asegurar que React se resuelve correctamente
      jsx: "automatic",
    },
  },
});
