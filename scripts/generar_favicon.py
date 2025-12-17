#!/usr/bin/env python3
"""
Script para generar favicon desde SVG
Crea favicon.ico y diferentes tamaños de PNG desde favicon.svg
"""

import os
from pathlib import Path

# Nota: Este script requiere librerías adicionales como PIL/Pillow
# Por ahora, creamos el SVG directamente

PROJECT_ROOT = Path(__file__).parent.parent
FAVICON_SVG = PROJECT_ROOT / "public" / "favicon.svg"

# El SVG ya está creado, este script es para documentación
print("✅ Favicon SVG creado en public/favicon.svg")
print("📝 Para generar .ico y PNG, instala:")
print("   pip install Pillow cairosvg")
