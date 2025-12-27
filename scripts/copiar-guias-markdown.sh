#!/bin/bash
# Script para copiar archivos Markdown de guías de refuerzo a public/
# Esto es necesario porque Vite solo sirve archivos desde public/

echo "📋 Copiando archivos Markdown de guías de refuerzo..."

# Crear directorio si no existe
mkdir -p public/docs/consolidado

# Copiar archivos Markdown de guías
cp docs/consolidado/SECCION_*.md public/docs/consolidado/ 2>/dev/null

# Contar archivos copiados
COUNT=$(ls -1 public/docs/consolidado/*.md 2>/dev/null | wc -l)

if [ $COUNT -gt 0 ]; then
  echo "✅ $COUNT archivos Markdown copiados a public/docs/consolidado/"
else
  echo "⚠️  No se encontraron archivos Markdown en docs/consolidado/"
  echo "   Asegúrate de que los archivos existan antes de copiar"
fi

