#!/usr/bin/env node
/**
 * Script de verificación post-build
 * Verifica que el build no contiene vendor-other y que todos los chunks están correctamente generados
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

console.log('🔍 Verificando build...\n');

// Verificar que dist existe
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ ERROR: Directorio dist/ no existe');
  process.exit(1);
}

// Verificar que assets existe
if (!fs.existsSync(ASSETS_DIR)) {
  console.error('❌ ERROR: Directorio dist/assets/ no existe');
  process.exit(1);
}

// Listar todos los archivos en assets
const files = fs.readdirSync(ASSETS_DIR);
const vendorFiles = files.filter(f => f.startsWith('vendor-'));

console.log('📦 Chunks vendor encontrados:');
vendorFiles.forEach(file => {
  const size = fs.statSync(path.join(ASSETS_DIR, file)).size;
  const sizeKB = (size / 1024).toFixed(2);
  console.log(`   ${file} (${sizeKB} KB)`);
});

// CRÍTICO: Verificar que NO existe vendor-other
const vendorOtherFiles = vendorFiles.filter(f => f.includes('vendor-other'));
if (vendorOtherFiles.length > 0) {
  console.error('\n❌ ERROR CRÍTICO: Se encontraron archivos vendor-other:');
  vendorOtherFiles.forEach(file => {
    console.error(`   ${file}`);
  });
  console.error('\n🔧 SOLUCIÓN:');
  console.error('   El build está generando vendor-other, lo cual causa errores useLayoutEffect.');
  console.error('   Revisa vite.config.ts y asegúrate de que TODAS las dependencias están clasificadas.');
  process.exit(1);
}

// Verificar que existen los chunks esperados
const expectedChunks = ['vendor-react', 'vendor-utils', 'vendor-markdown'];
const foundChunks = expectedChunks.filter(chunk => 
  vendorFiles.some(file => file.includes(chunk))
);

console.log('\n✅ Chunks esperados encontrados:');
foundChunks.forEach(chunk => {
  const matchingFiles = vendorFiles.filter(f => f.includes(chunk));
  matchingFiles.forEach(file => {
    const size = fs.statSync(path.join(ASSETS_DIR, file)).size;
    const sizeKB = (size / 1024).toFixed(2);
    console.log(`   ✓ ${file} (${sizeKB} KB)`);
  });
});

if (foundChunks.length < expectedChunks.length) {
  const missing = expectedChunks.filter(c => !foundChunks.includes(c));
  console.warn(`\n⚠️  ADVERTENCIA: Faltan chunks esperados: ${missing.join(', ')}`);
}

// Verificar index.html
const indexHtml = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.error('\n❌ ERROR: index.html no existe en dist/');
  process.exit(1);
}

// Verificar que index.html no referencia vendor-other
const indexContent = fs.readFileSync(indexHtml, 'utf-8');
if (indexContent.includes('vendor-other')) {
  console.error('\n❌ ERROR: index.html referencia vendor-other');
  process.exit(1);
}

console.log('\n✅ Verificación completada exitosamente');
console.log('   • No se encontró vendor-other');
console.log('   • Chunks vendor correctamente generados');
console.log('   • index.html válido');
console.log('\n🎉 Build listo para producción\n');

process.exit(0);

