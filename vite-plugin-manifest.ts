import type { Plugin } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Plugin de Vite para generar manifest.json dinámicamente con el base path correcto
 * Esto asegura que las rutas funcionen tanto en desarrollo como en GitHub Pages
 */
export function manifestPlugin(): Plugin {
  let basePath = '/';

  return {
    name: 'manifest-plugin',
    configResolved(config) {
      // Capturar el base path de la configuración de Vite
      basePath = config.base;
    },
    generateBundle() {
      // Leer el manifest.json base
      const manifestPath = resolve(__dirname, 'public/manifest.json');
      const manifestContent = readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);

      // Normalizar base path (asegurar que termine con /)
      const base = basePath === '/' ? '/' : basePath.endsWith('/') ? basePath : `${basePath}/`;
      
      // Actualizar rutas en el manifest para que sean relativas al base path
      manifest.start_url = base;
      manifest.scope = base;

      // Actualizar rutas de iconos
      if (manifest.icons) {
        manifest.icons = manifest.icons.map((icon: any) => ({
          ...icon,
          src: icon.src.startsWith('/') 
            ? `${base}${icon.src.slice(1)}` 
            : `${base}${icon.src}`
        }));
      }

      // Actualizar rutas de shortcuts
      if (manifest.shortcuts) {
        manifest.shortcuts = manifest.shortcuts.map((shortcut: any) => ({
          ...shortcut,
          url: shortcut.url.startsWith('/')
            ? `${base}${shortcut.url.slice(1)}`
            : `${base}${shortcut.url}`,
          icons: shortcut.icons?.map((icon: any) => ({
            ...icon,
            src: icon.src.startsWith('/')
              ? `${base}${icon.src.slice(1)}`
              : `${base}${icon.src}`
          }))
        }));
      }

      // Escribir el manifest.json procesado
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(manifest, null, 2)
      });
    }
  };
}
