#!/usr/bin/env python3
"""
Script para reordenar archivos en bloques según orden canónico
Orden: numéricos → *_X_* → *_99_*
"""

from pathlib import Path
import shutil

def extract_sort_key(filename):
    """Extrae clave de ordenamiento canónico"""
    parts = filename.replace('.md', '').split('_')
    if len(parts) < 3:
        return (999, 999, filename)
    try:
        block = int(parts[1])
        chapter_part = parts[2]
        
        # Archivos *_99_* van al final absoluto
        if chapter_part == '99':
            return (block, 999, filename)
        
        # Archivos *_X_* van antes de los cierres
        if chapter_part == 'X':
            return (block, 998, filename)
        if chapter_part.startswith('X'):
            try:
                x_num = int(chapter_part[1:])
                return (block, 997 + x_num, filename)
            except:
                return (block, 997, filename)
        
        # Números normales
        try:
            chapter = int(chapter_part)
            return (block, chapter, filename)
        except:
            return (block, 998, filename)
    except:
        return (999, 999, filename)

def reorder_block(bloque_dir):
    """Reordena archivos en un bloque según orden canónico"""
    bloque_path = Path(bloque_dir)
    if not bloque_path.exists():
        print(f"❌ Directorio no existe: {bloque_dir}")
        return False
    
    files = list(bloque_path.glob('*.md'))
    if not files:
        print(f"ℹ️  No hay archivos .md en {bloque_dir}")
        return True
    
    # Obtener orden correcto
    sorted_files = sorted([f.name for f in files], key=lambda x: extract_sort_key(x))
    actual_files = sorted([f.name for f in files])
    
    if sorted_files == actual_files:
        print(f"✅ {bloque_dir}: Orden ya es correcto")
        return True
    
    print(f"🔄 Reordenando {bloque_dir}...")
    
    # Crear directorio temporal
    temp_dir = bloque_path.parent / f'temp_reorder_{bloque_path.name}'
    temp_dir.mkdir(exist_ok=True)
    
    try:
        # Copiar archivos con prefijo numérico para mantener orden
        for i, filename in enumerate(sorted_files):
            src = bloque_path / filename
            dst = temp_dir / f'{i:04d}_{filename}'
            shutil.copy2(src, dst)
        
        # Mover de vuelta en orden correcto
        for i, filename in enumerate(sorted_files):
            src = temp_dir / f'{i:04d}_{filename}'
            dst = bloque_path / filename
            if src.exists():
                shutil.move(str(src), str(dst))
        
        print(f"✅ {bloque_dir}: Archivos reordenados correctamente")
        return True
    except Exception as e:
        print(f"❌ Error reordenando {bloque_dir}: {e}")
        return False
    finally:
        # Limpiar directorio temporal si existe
        if temp_dir.exists():
            try:
                temp_dir.rmdir()
            except:
                pass

if __name__ == '__main__':
    base = Path('/home/planetazuzu/protocolo-r-pido/manual-tes/TES_Manual_Digital')
    
    # Reordenar bloques que tienen problemas
    bloques = [
        'BLOQUE_2_MATERIAL_E_INMOVILIZACION',
        'BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA'
    ]
    
    for bloque in bloques:
        reorder_block(base / bloque)
        print()
