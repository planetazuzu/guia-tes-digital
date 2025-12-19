#!/usr/bin/env python3
"""
Script para generar automáticamente el índice completo del Manual TES Digital
basado en los archivos .md existentes en la estructura

Uso:
    python3 generar_indice.py [--salida archivo.md]
"""

import os
import re
from pathlib import Path
from typing import List, Tuple, Dict
import argparse

def extract_chapter_info(filepath: Path) -> Tuple[int, int, str]:
    """Extrae información del bloque, capítulo y nombre del archivo"""
    filename = filepath.name
    
    # Patrón: BLOQUE_XX_YY_NOMBRE.md
    match = re.match(r'BLOQUE_(\d+)_(\d+|X)(?:_(.+))?\.md', filename)
    if match:
        block = int(match.group(1))
        chapter_str = match.group(2)
        
        if chapter_str == 'X':
            chapter = None
        else:
            chapter = int(chapter_str)
        
        # Extraer nombre del capítulo del nombre del archivo
        name_part = match.group(3) if match.group(3) else filename.replace('.md', '')
        name = name_part.replace('_', ' ').title()
        
        return (block, chapter, name)
    
    return (None, None, filename)

def read_title_from_file(filepath: Path) -> str:
    """Lee el título principal del archivo"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            first_line = f.readline().strip()
            # Extraer título después del número (ej: "# 2.0 – Anatomía...")
            match = re.match(r'#\s*\d+\.\d+\s*[–-]\s*(.+)', first_line)
            if match:
                return match.group(1).strip()
            # Si no tiene formato estándar, usar primera línea sin #
            if first_line.startswith('#'):
                return first_line.lstrip('#').strip()
            return first_line
    except:
        return filepath.stem.replace('_', ' ').title()

def generate_index(source_dir: Path, output_file: Path) -> bool:
    """Genera el índice completo del manual"""
    
    # Buscar todos los archivos .md
    md_files = list(source_dir.rglob('*.md'))
    
    # Excluir documentación interna y archivos especiales
    excluded_patterns = ['_DOCUMENTACION_INTERNA', 'MAPA_MAESTRO', 'INFORME', 'ANALISIS', 
                        'ESTANDAR', 'INDICE', 'LISTA', 'README', 'INSTALACION', 'LEEME']
    md_files = [f for f in md_files if not any(pattern in str(f) for pattern in excluded_patterns)]
    
    # Organizar por bloque
    blocks: Dict[int, List[Tuple[int, Path, str]]] = {}
    
    for md_file in md_files:
        block, chapter, name = extract_chapter_info(md_file)
        if block is not None:
            if block not in blocks:
                blocks[block] = []
            
            # Leer título real del archivo
            title = read_title_from_file(md_file)
            blocks[block].append((chapter if chapter is not None else 999, md_file, title))
    
    # Ordenar por bloque y capítulo
    for block in blocks:
        blocks[block].sort(key=lambda x: (x[0] if x[0] != 999 else 999, str(x[1])))
    
    # Generar contenido del índice
    content = []
    content.append("# 📚 ÍNDICE COMPLETO - Manual TES Digital")
    content.append("")
    content.append("**Fecha de generación:** 2024-12-14")
    content.append("**Versión:** 1.0 (Generado automáticamente)")
    content.append("**Total de capítulos:** " + str(len(md_files)))
    content.append("")
    content.append("---")
    content.append("")
    
    # Nombres de bloques
    block_names = {
        0: "BLOQUE 0 – Fundamentos",
        1: "BLOQUE 1 – Procedimientos Básicos TES",
        2: "BLOQUE 2 – Material e Inmovilización",
        3: "BLOQUE 3 – Material Sanitario y Oxigenoterapia",
        4: "BLOQUE 4 – Soporte Vital Básico y RCP",
        5: "BLOQUE 5 – Protocolos Transtelefónicos y Comunicación",
        6: "BLOQUE 6 – Farmacología y Vademécum Operativo",
        7: "BLOQUE 7 – Conducción y Seguridad Vial",
        8: "BLOQUE 8 – Gestión Operativa y Documentación"
    }
    
    # Generar índice por bloque
    for block_num in sorted(blocks.keys()):
        block_files = blocks[block_num]
        block_name = block_names.get(block_num, f"BLOQUE {block_num}")
        
        content.append(f"## {block_name}")
        content.append("")
        
        if len(block_files) == 0:
            content.append("**Estado:** ❌ VACÍO")
            content.append("")
            content.append("| # | Capítulo | Archivo | Estado |")
            content.append("|---|----------|---------|--------|")
            content.append("| - | - | - | ❌ Pendiente |")
        else:
            content.append(f"**Estado:** ✅ COMPLETO ({len(block_files)}/{len(block_files)} capítulos)")
            content.append("")
            content.append("| # | Capítulo | Archivo | Estado |")
            content.append("|---|----------|---------|--------|")
            
            for chapter, filepath, title in block_files:
                relative_path = filepath.relative_to(source_dir)
                
                if chapter == 999:
                    chapter_str = "X"
                    status = "✅"
                else:
                    chapter_str = f"{block_num}.{chapter}"
                    status = "✅"
                
                filename = filepath.name
                content.append(f"| {chapter_str} | {title} | [`{filename}`](./{relative_path}) | {status} |")
        
        content.append("")
        content.append("---")
        content.append("")
    
    # Estadísticas
    content.append("## 📊 ESTADÍSTICAS GENERALES")
    content.append("")
    content.append("| Bloque | Capítulos | Estado |")
    content.append("|--------|-----------|--------|")
    
    total = 0
    for block_num in sorted(blocks.keys()):
        count = len(blocks[block_num])
        total += count
        block_name = block_names.get(block_num, f"Bloque {block_num}")
        status = "✅ Completo" if count > 0 else "❌ Vacío"
        content.append(f"| {block_name} | {count} | {status} |")
    
    content.append(f"| **TOTAL** | **{total}** | **{len(blocks)} bloques** |")
    content.append("")
    
    # Guardar archivo
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(content))
        return True
    except Exception as e:
        print(f"Error al guardar: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(
        description='Genera índice completo del Manual TES Digital',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument(
        '--directorio',
        type=str,
        default='.',
        help='Directorio fuente (default: directorio actual)'
    )
    
    parser.add_argument(
        '--salida',
        type=str,
        default='INDICE_COMPLETO_MANUAL_TES.md',
        help='Archivo de salida (default: INDICE_COMPLETO_MANUAL_TES.md)'
    )
    
    args = parser.parse_args()
    
    source_dir = Path(args.directorio).resolve()
    output_file = Path(args.salida).resolve()
    
    if not source_dir.exists():
        print(f"❌ Error: El directorio no existe: {source_dir}")
        return 1
    
    print(f"Generando índice desde: {source_dir}")
    print(f"Guardando en: {output_file}")
    
    if generate_index(source_dir, output_file):
        print(f"\n✅ Índice generado exitosamente: {output_file}")
        return 0
    else:
        print("\n❌ Error al generar el índice")
        return 1

if __name__ == '__main__':
    exit(main())
