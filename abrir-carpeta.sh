#!/bin/bash
# Script para abrir la carpeta del proyecto en el explorador de archivos

CARPETA="/home/planetazuzu/guia-tes"

echo "Intentando abrir: $CARPETA"
echo ""

# Verificar que la carpeta existe
if [ ! -d "$CARPETA" ]; then
    echo "ERROR: La carpeta no existe: $CARPETA"
    exit 1
fi

# Verificar permisos
if [ ! -r "$CARPETA" ]; then
    echo "ERROR: No tienes permisos de lectura en: $CARPETA"
    exit 1
fi

echo "✓ Carpeta existe y es accesible"
echo ""

# Intentar abrir con diferentes métodos
if command -v nautilus &> /dev/null; then
    echo "Abriendo con Nautilus..."
    nautilus "$CARPETA" &
elif command -v dolphin &> /dev/null; then
    echo "Abriendo con Dolphin..."
    dolphin "$CARPETA" &
elif command -v thunar &> /dev/null; then
    echo "Abriendo con Thunar..."
    thunar "$CARPETA" &
elif command -v xdg-open &> /dev/null; then
    echo "Abriendo con xdg-open..."
    xdg-open "$CARPETA" &
else
    echo "ERROR: No se encontró ningún explorador de archivos instalado"
    echo "Puedes navegar manualmente a: $CARPETA"
    exit 1
fi

echo ""
echo "Si la carpeta no se abre, intenta ejecutar manualmente:"
echo "  nautilus $CARPETA"
echo "  o"
echo "  xdg-open $CARPETA"

