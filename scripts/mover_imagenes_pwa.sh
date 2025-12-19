#!/bin/bash
# Script para mover imágenes a public/assets/infografias/ para PWA
SOURCE_DIR="imagenes-pendientes"
TARGET_BASE="public/assets/infografias"
mkdir -p "$TARGET_BASE"/{bloque-0-fundamentos,bloque-2-inmovilizacion,bloque-3-material-sanitario,bloque-7-conduccion,bloque-12-marco-legal}
echo "📸 Estructura creada. Usa el script Python para organizar: python scripts/organizar_infografias.py"
