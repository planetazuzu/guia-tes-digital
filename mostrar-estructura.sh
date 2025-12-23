#!/bin/bash
# Script para mostrar la estructura del proyecto

echo "═══════════════════════════════════════════════════════════"
echo "  ESTRUCTURA DEL PROYECTO: guia-tes"
echo "═══════════════════════════════════════════════════════════"
echo ""

CARPETA="/home/planetazuzu/guia-tes"
cd "$CARPETA"

echo "📁 CARPETAS PRINCIPALES:"
echo "───────────────────────────────────────────────────────────"
for dir in */; do
    if [ -d "$dir" ]; then
        count=$(find "$dir" -type f 2>/dev/null | wc -l)
        size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        echo "  📂 $dir ($count archivos, $size)"
    fi
done

echo ""
echo "📄 ARCHIVOS PRINCIPALES EN LA RAÍZ:"
echo "───────────────────────────────────────────────────────────"
ls -lh *.json *.ts *.tsx *.sh *.py *.md *.yml *.yaml *.config.* 2>/dev/null | awk '{print "  📄 " $9 " (" $5 ")"}'

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ESTRUCTURA DETALLADA DE CARPETAS IMPORTANTES"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "📁 src/ (código fuente):"
if [ -d "src" ]; then
    find src -type d -maxdepth 2 | sort | sed 's|^|  |'
fi

echo ""
echo "📁 public/ (archivos públicos):"
if [ -d "public" ]; then
    find public -type d -maxdepth 2 | sort | sed 's|^|  |'
fi

echo ""
echo "📁 assets/ (recursos multimedia):"
if [ -d "assets" ]; then
    find assets -type d -maxdepth 2 | sort | sed 's|^|  |'
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  RESUMEN"
echo "═══════════════════════════════════════════════════════════"
total_files=$(find . -type f ! -path "./node_modules/*" ! -path "./.git/*" ! -path "./dist/*" 2>/dev/null | wc -l)
total_dirs=$(find . -type d ! -path "./node_modules/*" ! -path "./.git/*" ! -path "./dist/*" 2>/dev/null | wc -l)
echo "  Total archivos: $total_files"
echo "  Total carpetas: $total_dirs"
echo ""

