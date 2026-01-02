#!/usr/bin/env node
/**
 * Script de diagnóstico para verificar problemas de React duplicado
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnóstico de React en el proyecto\n');

// Verificar package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));

console.log('📦 Versiones de React:');
console.log(`   react: ${packageJson.dependencies.react}`);
console.log(`   react-dom: ${packageJson.dependencies['react-dom']}`);

if (packageJson.overrides) {
  console.log('\n✅ overrides configurado:');
  console.log(`   react: ${packageJson.overrides.react}`);
  console.log(`   react-dom: ${packageJson.overrides['react-dom']}`);
} else {
  console.log('\n⚠️  overrides NO configurado');
}

// Verificar node_modules
const nodeModules = path.join(__dirname, '..', 'node_modules');
const reactPath = path.join(nodeModules, 'react');
const reactDomPath = path.join(nodeModules, 'react-dom');

console.log('\n📁 Verificando node_modules:');
if (fs.existsSync(reactPath)) {
  const reactPkg = JSON.parse(fs.readFileSync(path.join(reactPath, 'package.json'), 'utf-8'));
  console.log(`   ✅ react instalado: ${reactPkg.version}`);
} else {
  console.log('   ❌ react NO encontrado');
}

if (fs.existsSync(reactDomPath)) {
  const reactDomPkg = JSON.parse(fs.readFileSync(path.join(reactDomPath, 'package.json'), 'utf-8'));
  console.log(`   ✅ react-dom instalado: ${reactDomPkg.version}`);
} else {
  console.log('   ❌ react-dom NO encontrado');
}

// Verificar vite.config.ts
const viteConfig = fs.readFileSync(path.join(__dirname, '..', 'vite.config.ts'), 'utf-8');

console.log('\n⚙️  Verificando vite.config.ts:');
if (viteConfig.includes('dedupe: ["react", "react-dom')) {
  console.log('   ✅ dedupe configurado');
} else {
  console.log('   ❌ dedupe NO configurado');
}

if (viteConfig.includes('hast-util-to-jsx-runtime')) {
  console.log('   ✅ hast-util-to-jsx-runtime clasificado');
} else {
  console.log('   ⚠️  hast-util-to-jsx-runtime NO encontrado en config');
}

if (viteConfig.includes('alias') && viteConfig.includes('react')) {
  console.log('   ✅ alias de React configurado');
} else {
  console.log('   ⚠️  alias de React NO configurado');
}

// Verificar build si existe
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    const vendorFiles = files.filter(f => f.startsWith('vendor-'));
    
    console.log('\n📦 Chunks generados en dist/assets/:');
    vendorFiles.forEach(file => {
      const size = fs.statSync(path.join(assetsPath, file)).size;
      const sizeKB = (size / 1024).toFixed(2);
      console.log(`   ${file} (${sizeKB} KB)`);
    });
    
    const vendorOther = vendorFiles.filter(f => f.includes('vendor-other'));
    if (vendorOther.length > 0) {
      console.log('\n❌ ERROR: Se encontró vendor-other:');
      vendorOther.forEach(file => console.log(`   ${file}`));
    } else {
      console.log('\n✅ No se encontró vendor-other');
    }
  }
}

console.log('\n✅ Diagnóstico completado\n');

