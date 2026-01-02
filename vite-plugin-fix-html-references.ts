import type { Plugin } from 'vite';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Plugin para corregir las referencias en index.html después del build
 * Asegura que los chunks con prefijos numéricos (0-, 1-, 2-) se referencien correctamente
 */
export function fixHtmlReferencesPlugin(): Plugin {
  return {
    name: 'fix-html-references',
    writeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const indexPath = resolve(distDir, 'index.html');
      
      try {
        // Leer index.html generado
        let htmlContent = readFileSync(indexPath, 'utf-8');
        
        // Buscar y reemplazar referencias de chunks vendor sin prefijos
        // Patrón: vendor-react-[hash].js -> 0-vendor-react-[hash].js
        htmlContent = htmlContent.replace(
          /(src|href)="([^"]*\/)vendor-react-([^"]*\.js)"/g,
          '$1="$20-vendor-react-$3"'
        );
        
        htmlContent = htmlContent.replace(
          /(src|href)="([^"]*\/)vendor-utils-([^"]*\.js)"/g,
          '$1="$21-vendor-utils-$3"'
        );
        
        htmlContent = htmlContent.replace(
          /(src|href)="([^"]*\/)vendor-markdown-([^"]*\.js)"/g,
          '$1="$22-vendor-markdown-$3"'
        );
        
        // Escribir index.html corregido
        writeFileSync(indexPath, htmlContent, 'utf-8');
        console.log('[fix-html-references] ✅ Referencias corregidas en index.html');
      } catch (error) {
        console.warn('[fix-html-references] ⚠️ No se pudo corregir index.html:', error);
      }
    }
  };
}

