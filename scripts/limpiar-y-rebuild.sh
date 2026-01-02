#!/bin/bash
# Script para limpiar dependencias y hacer rebuild completo
# Soluciona problemas de React duplicado o mal resuelto

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🧹 LIMPIEZA COMPLETA Y REBUILD                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

echo "📋 Paso 1: Verificando versiones de React..."
npm ls react react-dom 2>&1 | head -5
echo ""

echo "🧹 Paso 2: Limpiando node_modules y package-lock.json..."
rm -rf node_modules
rm -f package-lock.json
echo "✅ Limpieza completada"
echo ""

echo "📦 Paso 3: Reinstalando dependencias..."
npm install
echo "✅ Dependencias reinstaladas"
echo ""

echo "🔍 Paso 4: Verificando que no hay duplicados de React..."
npm ls react react-dom 2>&1 | grep -E "(react@|UNMET|extraneous)" || echo "✅ No se encontraron duplicados"
echo ""

echo "🔨 Paso 5: Haciendo build de producción..."
npm run build
echo ""

echo "✅ Proceso completado"
echo ""
echo "📊 Verificar que el build se completó correctamente:"
echo "   ls -lh dist/assets/ | grep vendor-react"

