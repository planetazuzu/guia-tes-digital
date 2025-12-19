#!/usr/bin/env python3
"""
Script para normalizar el formato de todos los archivos .md del Manual TES Digital
según el estándar definido en ESTANDAR_FORMATO_MANUAL.md
"""

import os
import re
from pathlib import Path
from typing import Tuple, Optional

def extract_block_chapter(filename: str) -> Optional[Tuple[int, Optional[int]]]:
    """Extrae bloque y capítulo del nombre de archivo"""
    # Patrón: BLOQUE_XX_YY_...
    match = re.match(r'BLOQUE_(\d+)_(\d+|[X])', filename)
    if match:
        block = int(match.group(1))
        chapter_str = match.group(2)
        if chapter_str == 'X':
            return (block, None)
        chapter = int(chapter_str)
        return (block, chapter)
    
    # Fallback: buscar en contenido del archivo
    return None

def normalize_title(match_obj, block: int, chapter: Optional[int]) -> str:
    """Normaliza el título principal según el estándar"""
    original = match_obj.group(0)
    
    # Si ya tiene formato correcto X.Y –, mantenerlo pero capitalizar correctamente
    pattern1 = r'^#\s*(\d+)\.(\d+)\s*[–-]\s*(.+)$'
    match1 = re.match(pattern1, original)
    if match1:
        b, c, title = match1.groups()
        # Capitalizar título (Title Case para palabras significativas)
        title = title.title()
        # Corregir casos especiales
        title = re.sub(r'\b(De|Del|La|Los|Las|En|Por|Para|Con|Sin|Y|O|A|Al)\b', lambda m: m.group(1).lower(), title)
        title = re.sub(r'\b(IV|IO|IM|SC|SVB|SVA|RCP|PCR|TES|ABCDE|PLS|OVACE|BVM|DESA|DEA)\b', lambda m: m.group(1).upper(), title)
        # Primera letra siempre mayúscula
        if title:
            title = title[0].upper() + title[1:]
        return f"# {b}.{c} – {title}"
    
    # Patrón BLOQUE XX – ...
    pattern2 = r'^#\s*BLOQUE\s+(\d+)\s*[–-]\s*(.+)$'
    match2 = re.match(pattern2, original)
    if match2:
        b, title = match2.groups()
        if chapter is not None:
            title = title.title()
            title = re.sub(r'\b(De|Del|La|Los|Las|En|Por|Para|Con|Sin|Y|O|A|Al)\b', lambda m: m.group(1).lower(), title)
            title = re.sub(r'\b(IV|IO|IM|SC|SVB|SVA|RCP|PCR|TES|ABCDE|PLS|OVACE|BVM|DESA|DEA)\b', lambda m: m.group(1).upper(), title)
            if title:
                title = title[0].upper() + title[1:]
            return f"# {b}.{chapter} – {title}"
    
    # Patrón BLOQUE X.Y – ...
    pattern3 = r'^#\s*BLOQUE\s+(\d+)\.(\d+)\s*[–-]\s*(.+)$'
    match3 = re.match(pattern3, original)
    if match3:
        b, c, title = match3.groups()
        title = title.title()
        title = re.sub(r'\b(De|Del|La|Los|Las|En|Por|Para|Con|Sin|Y|O|A|Al)\b', lambda m: m.group(1).lower(), title)
        title = re.sub(r'\b(IV|IO|IM|SC|SVB|SVA|RCP|PCR|TES|ABCDE|PLS|OVACE|BVM|DESA|DEA)\b', lambda m: m.group(1).upper(), title)
        if title:
            title = title[0].upper() + title[1:]
        return f"# {b}.{c} – {title}"
    
    # Si no coincide, devolver original
    return original

def normalize_metadata(content: str) -> str:
    """Normaliza los metadatos del archivo"""
    # Asegurar formato consistente de metadatos
    content = re.sub(r'\*\*Versión:\*\*\s*(\d+\.?\d*)', r'**Versión:** \1', content)
    content = re.sub(r'\*\*Fecha:\*\*\s*(\d{4}-\d{2}-\d{2})', r'**Fecha:** \1', content)
    content = re.sub(r'\*\*Tipo:\*\*\s*(.+)', r'**Tipo:** \1', content)
    
    # Asegurar que haya dos espacios al final de cada línea de metadatos (excepto la última)
    lines = content.split('\n')
    result = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if re.match(r'\*\*(Versión|Fecha):\*\*', line) and i < len(lines) - 1:
            # Añadir dos espacios al final si no los tiene
            if not line.endswith('  '):
                line = line.rstrip() + '  '
        result.append(line)
        i += 1
    
    return '\n'.join(result)

def normalize_sections(content: str, block: int, chapter: Optional[int]) -> str:
    """Normaliza la numeración de secciones principales"""
    if chapter is None:
        return content  # Capítulos especiales (X) no se normalizan
    
    def fix_section_title(title: str) -> str:
        """Capitaliza correctamente el título de una sección (solo primera letra mayúscula)"""
        if not title:
            return title
        
        title = title.strip()
        
        # Convertir todo a minúsculas primero (excepto acrónimos que detectaremos después)
        title_lower = title.lower()
        
        # Detectar acrónimos y mantenerlos en mayúsculas
        acronyms = ['TES', 'RCP', 'PCR', 'DESA', 'DEA', 'SVB', 'SVA', 'BVM', 'IV', 'IO', 'IM', 'SC', 'ABCDE', 'PLS', 'OVACE', 'SCA', 'AAS', 'ADR']
        for acro in acronyms:
            title_lower = re.sub(r'\b' + acro.lower() + r'\b', acro, title_lower, flags=re.IGNORECASE)
        
        # Primera letra siempre mayúscula
        if title_lower:
            title_lower = title_lower[0].upper() + title_lower[1:]
        
        return title_lower
    
    # Buscar y reemplazar secciones principales con formato ## X.Y.Z título
    def replace_section_with_decimal(match):
        full_match = match.group(0)
        num_part = match.group(1) if match.lastindex >= 1 else ''
        title_part = match.group(2) if match.lastindex >= 2 else match.group(3) if match.lastindex >= 3 else ''
        
        # Si ya tiene formato X.Y.Z correcto, solo capitalizar título
        if re.match(r'^\d+\.\d+\.\d+', num_part):
            fixed_title = fix_section_title(title_part)
            return f"## {num_part} {fixed_title}"
        
        # Si tiene formato X.Y.Z pero falta algo, mantener y capitalizar
        if re.match(r'^\d+\.\d+\.\d+', num_part):
            fixed_title = fix_section_title(title_part)
            return f"## {num_part} {fixed_title}"
        
        # Si tiene formato 1. o 2., convertir a X.Y.1, X.Y.2, etc.
        if re.match(r'^\d+\.?$', num_part):
            section_num = int(num_part.rstrip('.'))
            fixed_title = fix_section_title(title_part)
            return f"## {block}.{chapter}.{section_num} {fixed_title}"
        
        return full_match
    
    # Patrón más flexible: ## número título (con o sin punto)
    pattern = r'^##\s+(\d+(?:\.\d+(?:\.\d+)?)?\.?)\s+(.+?)(?=\n|$)'
    lines = content.split('\n')
    result_lines = []
    
    for line in lines:
        match = re.match(pattern, line)
        if match:
            num_part = match.group(1)
            title_part = match.group(2)
            
            # Si ya tiene formato X.Y.Z, verificar y corregir título
            if re.match(r'^\d+\.\d+\.\d+', num_part):
                fixed_title = fix_section_title(title_part)
                result_lines.append(f"## {num_part} {fixed_title}")
            # Si tiene formato simple 1. o 1, convertir
            elif re.match(r'^\d+\.?$', num_part):
                section_num = int(num_part.rstrip('.'))
                fixed_title = fix_section_title(title_part)
                result_lines.append(f"## {block}.{chapter}.{section_num} {fixed_title}")
            else:
                # Ya tiene formato correcto, solo capitalizar
                fixed_title = fix_section_title(title_part)
                result_lines.append(f"## {num_part} {fixed_title}")
        else:
            result_lines.append(line)
    
    return '\n'.join(result_lines)

def normalize_spacing(content: str) -> str:
    """Normaliza el espaciado del archivo"""
    # Eliminar líneas en blanco múltiples (más de 2 seguidas)
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # Eliminar espacios en blanco al final de líneas
    lines = content.split('\n')
    lines = [line.rstrip() for line in lines]
    content = '\n'.join(lines)
    
    # Eliminar líneas en blanco al final del archivo
    content = content.rstrip() + '\n'
    
    return content

def normalize_file(filepath: Path) -> Tuple[bool, str]:
    """Normaliza un archivo .md según el estándar"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Extraer bloque y capítulo del nombre del archivo
        block_chapter = extract_block_chapter(filepath.name)
        if block_chapter:
            block, chapter = block_chapter
        else:
            # Intentar extraer del contenido
            match = re.search(r'^#\s*(?:BLOQUE\s+)?(\d+)\.(\d+)', content, re.MULTILINE)
            if match:
                block, chapter = int(match.group(1)), int(match.group(2))
            else:
                # No se puede normalizar, archivo especial
                return (False, "No se pudo identificar bloque/capítulo")
        
        # Normalizar título principal
        title_pattern = r'^#\s+.+$'
        content = re.sub(title_pattern, lambda m: normalize_title(m, block, chapter), content, count=1, flags=re.MULTILINE)
        
        # Normalizar metadatos
        content = normalize_metadata(content)
        
        # Normalizar secciones (solo si no es capítulo especial)
        if chapter is not None:
            content = normalize_sections(content, block, chapter)
        
        # Normalizar espaciado
        content = normalize_spacing(content)
        
        # Solo escribir si hubo cambios
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return (True, "Normalizado correctamente")
        else:
            return (False, "Ya estaba normalizado")
            
    except Exception as e:
        return (False, f"Error: {str(e)}")

def main():
    """Función principal"""
    base_dir = Path(__file__).parent
    
    # Excluir documentación interna y archivos especiales
    excluded_dirs = {'_DOCUMENTACION_INTERNA'}
    excluded_files = {'MAPA_MAESTRO_MANUAL_TES_DIGITAL.md', 'normalizar_formato.py', 'INFORME_REORGANIZACION_FINAL.md'}
    
    md_files = []
    for root, dirs, files in os.walk(base_dir):
        # Excluir directorios
        dirs[:] = [d for d in dirs if d not in excluded_dirs]
        
        for file in files:
            if file.endswith('.md') and file not in excluded_files:
                filepath = Path(root) / file
                md_files.append(filepath)
    
    print(f"Encontrados {len(md_files)} archivos .md para normalizar\n")
    
    normalized = 0
    skipped = 0
    errors = 0
    
    for filepath in sorted(md_files):
        success, message = normalize_file(filepath)
        relative_path = filepath.relative_to(base_dir)
        
        if success:
            normalized += 1
            print(f"✅ {relative_path}: {message}")
        elif "Error" in message:
            errors += 1
            print(f"❌ {relative_path}: {message}")
        else:
            skipped += 1
            if "No se pudo" in message:
                print(f"⚠️  {relative_path}: {message}")
    
    print(f"\n=== RESUMEN ===")
    print(f"Normalizados: {normalized}")
    print(f"Omitidos: {skipped}")
    print(f"Errores: {errors}")
    print(f"Total: {len(md_files)}")

if __name__ == '__main__':
    main()
