#!/usr/bin/env python3
"""
Copia los archivos .md del manual a public/manual/ para que sean accesibles vía fetch
"""

import shutil
from pathlib import Path

BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_SOURCE = BASE_DIR / "manual-tes" / "TES_Manual_Digital"
MANUAL_DEST = BASE_DIR / "public" / "manual"

def copiar_archivos_manual():
    """Copia todos los archivos .md de los bloques a public/manual/"""
    
    # Crear directorio destino si no existe
    MANUAL_DEST.mkdir(parents=True, exist_ok=True)
    
    # Contar archivos copiados
    archivos_copiados = 0
    
    # Buscar todas las carpetas BLOQUE_*
    for bloque_dir in MANUAL_SOURCE.iterdir():
        if bloque_dir.is_dir() and bloque_dir.name.startswith("BLOQUE_"):
            # Crear directorio destino para este bloque
            bloque_dest = MANUAL_DEST / bloque_dir.name
            bloque_dest.mkdir(parents=True, exist_ok=True)
            
            # Copiar todos los archivos .md del bloque
            for archivo_md in bloque_dir.glob("*.md"):
                if archivo_md.is_file():
                    destino = bloque_dest / archivo_md.name
                    shutil.copy2(archivo_md, destino)
                    archivos_copiados += 1
                    print(f"✅ Copiado: {bloque_dir.name}/{archivo_md.name}")
    
    print(f"\n✅ Total de archivos copiados: {archivos_copiados}")
    print(f"📁 Ubicación destino: {MANUAL_DEST}")

if __name__ == "__main__":
    copiar_archivos_manual()
