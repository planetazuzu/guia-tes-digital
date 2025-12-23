#!/usr/bin/env python3
"""
Script para generar iconos PWA desde favicon.svg
Crea iconos PNG 192x192, 512x512 y maskable para Android
"""

import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
PUBLIC_DIR = PROJECT_ROOT / "public"
FAVICON_SVG = PUBLIC_DIR / "favicon.svg"

def check_dependencies():
    """Verifica que ImageMagick esté instalado"""
    try:
        result = subprocess.run(
            ["convert", "-version"],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print("✅ ImageMagick encontrado")
            return True
    except FileNotFoundError:
        pass
    
    print("❌ ImageMagick no encontrado")
    print("   Instala con: sudo apt-get install imagemagick")
    return False

def generar_icono_png(tamaño, nombre_archivo, maskable=False):
    """Genera un icono PNG desde el SVG"""
    output_path = PUBLIC_DIR / nombre_archivo
    
    # Comando ImageMagick para convertir SVG a PNG
    cmd = [
        "convert",
        "-background", "none",  # Fondo transparente
        "-resize", f"{tamaño}x{tamaño}",
        str(FAVICON_SVG),
        str(output_path)
    ]
    
    # Para iconos maskable, añadir padding seguro (80% del tamaño)
    if maskable:
        safe_size = int(tamaño * 0.8)
        padding = int((tamaño - safe_size) / 2)
        cmd = [
            "convert",
            "-background", "none",
            "-resize", f"{safe_size}x{safe_size}",
            "-gravity", "center",
            "-extent", f"{tamaño}x{tamaño}",
            str(FAVICON_SVG),
            str(output_path)
        ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Generado: {nombre_archivo} ({tamaño}x{tamaño})")
            return True
        else:
            print(f"❌ Error generando {nombre_archivo}: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("🎨 Generando iconos PWA...")
    print(f"📁 SVG fuente: {FAVICON_SVG}")
    print()
    
    if not FAVICON_SVG.exists():
        print(f"❌ Error: No se encuentra {FAVICON_SVG}")
        sys.exit(1)
    
    if not check_dependencies():
        sys.exit(1)
    
    print()
    print("📦 Generando iconos...")
    
    # Iconos estándar
    iconos = [
        (192, "icon-192.png", False),
        (512, "icon-512.png", False),
        # Iconos maskable para Android
        (192, "icon-192-maskable.png", True),
        (512, "icon-512-maskable.png", True),
    ]
    
    exitosos = 0
    for tamaño, nombre, maskable in iconos:
        if generar_icono_png(tamaño, nombre, maskable):
            exitosos += 1
    
    print()
    if exitosos == len(iconos):
        print(f"✅ Todos los iconos generados exitosamente ({exitosos}/{len(iconos)})")
        print()
        print("📝 Próximos pasos:")
        print("   1. Actualizar public/manifest.json con los nuevos iconos")
        print("   2. Verificar que los iconos se vean correctamente")
    else:
        print(f"⚠️  Solo se generaron {exitosos}/{len(iconos)} iconos")
        sys.exit(1)

if __name__ == "__main__":
    main()

