import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8096,
    fs: {
      // Permitir acceso a archivos fuera del proyecto si es necesario
      strict: true,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configuración para procesar archivos .md
  assetsInclude: ["**/*.md"],
  
  // Configuración de build para incluir archivos .md
  build: {
    rollupOptions: {
      // Asegurar que los archivos .md se copien al build
      output: {
        assetFileNames: (assetInfo) => {
          // Mantener estructura de carpetas para archivos .md en public/
          if (assetInfo.name?.endsWith('.md')) {
            // Si está en public/manual/, mantener esa estructura
            const name = assetInfo.name || '';
            if (name.includes('manual')) {
              return 'manual/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Incluir archivos .md en el build
    assetsInclude: ['**/*.md'],
  },
  
  // Configuración para importar archivos .md como texto usando ?raw
  // Ejemplo de uso:
  // import content from './file.md?raw'
  // Esto importará el contenido del archivo como string
  optimizeDeps: {
    exclude: [],
  },
});
