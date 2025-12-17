#!/usr/bin/env python3
"""
Script para actualizar las rutas en manual-index.ts

Cambia las rutas de:
  manual-tes/TES_Manual_Digital/BLOQUE_X_NAME/archivo.md
  
A:
  /manual/BLOQUE_X_NAME/archivo.md
"""

import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
MANUAL_INDEX_PATH = PROJECT_ROOT / "src/data/manual-index.ts"

def actualizar_rutas():
    """Actualiza las rutas en manual-index.ts"""
    
    if not MANUAL_INDEX_PATH.exists():
        print(f"❌ ERROR: No se encuentra {MANUAL_INDEX_PATH}")
        return False
    
    contenido = MANUAL_INDEX_PATH.read_text(encoding='utf-8')
    contenido_original = contenido
    
    # Patrón para encontrar rutas del formato:
    # rutaArchivo: "manual-tes/TES_Manual_Digital/BLOQUE_X_NAME/archivo.md"
    patron = r'rutaArchivo:\s*"manual-tes/TES_Manual_Digital/([^"]+)"'
    
    def reemplazar_ruta(match):
        ruta_completa = match.group(1)  # BLOQUE_X_NAME/archivo.md
        # Extraer solo el nombre del bloque (carpeta)
        partes = ruta_completa.split('/')
        if len(partes) >= 2:
            bloque_dir = partes[0]  # BLOQUE_X_NAME
            archivo = partes[-1]    # archivo.md
            nueva_ruta = f'/manual/{bloque_dir}/{archivo}'
            return f'rutaArchivo: "{nueva_ruta}"'
        return match.group(0)  # Si no coincide, mantener original
    
    contenido_nuevo = re.sub(patron, reemplazar_ruta, contenido)
    
    # Verificar si hubo cambios
    if contenido_nuevo == contenido_original:
        print("ℹ️  No se encontraron rutas para actualizar")
        return False
    
    # Contar cambios
    cambios = len(re.findall(patron, contenido_original))
    print(f"✅ Actualizadas {cambios} rutas")
    
    # Crear backup
    backup_path = MANUAL_INDEX_PATH.with_suffix('.ts.backup')
    backup_path.write_text(contenido_original, encoding='utf-8')
    print(f"📦 Backup guardado en: {backup_path}")
    
    # Guardar cambios
    MANUAL_INDEX_PATH.write_text(contenido_nuevo, encoding='utf-8')
    print(f"✅ Archivo actualizado: {MANUAL_INDEX_PATH}")
    
    return True

if __name__ == "__main__":
    print("=" * 70)
    print("🔄 ACTUALIZANDO RUTAS EN MANUAL-INDEX.TS")
    print("=" * 70)
    
    if actualizar_rutas():
        print("\n✅ Actualización completada exitosamente")
    else:
        print("\n⚠️  No se realizaron cambios")
