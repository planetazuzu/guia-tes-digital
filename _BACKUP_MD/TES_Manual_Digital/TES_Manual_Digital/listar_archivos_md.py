#!/usr/bin/env python3
"""
Script para listar todos los archivos .md del Manual TES Digital con sus rutas completas

Uso:
    python3 listar_archivos_md.py [--formato simple|completo|absoluto] [--salida archivo.txt]
"""

import os
from pathlib import Path
import argparse

def list_md_files(base_dir: Path, format_type: str = 'simple') -> list:
    """Lista todos los archivos .md con formato especificado"""
    md_files = []
    
    # Buscar todos los archivos .md
    for md_file in base_dir.rglob('*.md'):
        # Excluir documentación interna y archivos especiales
        if '_DOCUMENTACION_INTERNA' in str(md_file) or 'Manual_Word' in str(md_file):
            continue
        
        if format_type == 'simple':
            # Formato simple: solo nombre del archivo
            md_files.append(md_file.name)
        elif format_type == 'relative':
            # Formato relativo: ruta relativa desde base_dir
            md_files.append(str(md_file.relative_to(base_dir)))
        elif format_type == 'absolute':
            # Formato absoluto: ruta completa
            md_files.append(str(md_file.resolve()))
        else:
            # Por defecto: relativo
            md_files.append(str(md_file.relative_to(base_dir)))
    
    return sorted(md_files)

def main():
    parser = argparse.ArgumentParser(
        description='Lista todos los archivos .md del Manual TES Digital',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos:
  # Lista simple (solo nombres)
  python3 listar_archivos_md.py --formato simple
  
  # Lista con rutas relativas (por defecto)
  python3 listar_archivos_md.py --formato relative
  
  # Lista con rutas absolutas
  python3 listar_archivos_md.py --formato absolute
  
  # Guardar en archivo
  python3 listar_archivos_md.py --salida lista_archivos.txt
        """
    )
    
    parser.add_argument(
        '--directorio',
        type=str,
        default='.',
        help='Directorio base (default: directorio actual)'
    )
    
    parser.add_argument(
        '--formato',
        type=str,
        choices=['simple', 'relative', 'absolute'],
        default='relative',
        help='Formato de salida: simple (solo nombre), relative (ruta relativa), absolute (ruta completa)'
    )
    
    parser.add_argument(
        '--salida',
        type=str,
        default=None,
        help='Archivo de salida (si no se especifica, imprime en consola)'
    )
    
    args = parser.parse_args()
    
    base_dir = Path(args.directorio).resolve()
    
    if not base_dir.exists():
        print(f"❌ Error: El directorio no existe: {base_dir}")
        return 1
    
    # Listar archivos
    md_files = list_md_files(base_dir, args.formato)
    
    # Generar salida
    output_lines = []
    output_lines.append(f"# Listado de archivos .md - Manual TES Digital")
    output_lines.append(f"")
    output_lines.append(f"**Fecha:** 2024-12-14")
    output_lines.append(f"**Formato:** {args.formato}")
    output_lines.append(f"**Total:** {len(md_files)} archivos")
    output_lines.append(f"")
    output_lines.append("---")
    output_lines.append("")
    
    # Agrupar por bloque
    blocks = {}
    for filepath in md_files:
        if args.formato == 'simple':
            # Extraer bloque del nombre
            if filepath.startswith('BLOQUE_0'):
                block = 0
            elif filepath.startswith('BLOQUE_01'):
                block = 1
            elif filepath.startswith('BLOQUE_02'):
                block = 2
            elif filepath.startswith('BLOQUE_03'):
                block = 3
            elif filepath.startswith('BLOQUE_04'):
                block = 4
            else:
                block = 99  # Otros
        else:
            # Extraer bloque de la ruta
            if '/BLOQUE_0_FUNDAMENTOS/' in filepath:
                block = 0
            elif '/BLOQUE_1_PROCEDIMIENTOS_BASICOS/' in filepath:
                block = 1
            elif '/BLOQUE_2_MATERIAL_E_INMOVILIZACION/' in filepath:
                block = 2
            elif '/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/' in filepath:
                block = 3
            elif '/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/' in filepath:
                block = 4
            else:
                block = 99  # Raíz/otros
        
        if block not in blocks:
            blocks[block] = []
        blocks[block].append(filepath)
    
    # Imprimir por bloques
    block_names = {
        0: "BLOQUE 0 – Fundamentos",
        1: "BLOQUE 1 – Procedimientos Básicos TES",
        2: "BLOQUE 2 – Material e Inmovilización",
        3: "BLOQUE 3 – Material Sanitario y Oxigenoterapia",
        4: "BLOQUE 4 – Soporte Vital Básico y RCP",
        99: "Archivos de Referencia (Raíz)"
    }
    
    for block_num in sorted(blocks.keys()):
        block_name = block_names.get(block_num, f"Bloque {block_num}")
        output_lines.append(f"## {block_name}")
        output_lines.append(f"")
        output_lines.append(f"**Total:** {len(blocks[block_num])} archivos")
        output_lines.append(f"")
        
        for i, filepath in enumerate(sorted(blocks[block_num]), 1):
            output_lines.append(f"{i}. `{filepath}`")
        
        output_lines.append("")
        output_lines.append("---")
        output_lines.append("")
    
    # Guardar o imprimir
    output_text = '\n'.join(output_lines)
    
    if args.salida:
        output_file = Path(args.salida)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(output_text)
        print(f"✅ Listado guardado en: {output_file}")
        print(f"Total de archivos: {len(md_files)}")
    else:
        print(output_text)
    
    return 0

if __name__ == '__main__':
    exit(main())
