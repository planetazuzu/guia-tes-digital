#!/usr/bin/env python3
"""
Script de auditoría de estructura del Manual TES Digital
Valida orden canónico y detecta archivos fuera de lugar
"""

import os
from pathlib import Path
from collections import defaultdict

def extract_number(filename):
    """Extrae el número de bloque y capítulo para ordenamiento"""
    parts = filename.replace('.md', '').split('_')
    if len(parts) < 3:
        return (999, 999, filename)  # Archivos sin patrón claro al final
    
    try:
        block = int(parts[1])
        chapter_part = parts[2]
        
        # Manejar casos especiales
        if chapter_part == 'X':
            return (block, 998, filename)  # Inventarios antes de cierres
        if chapter_part.startswith('X'):
            # X2, X3, etc.
            try:
                x_num = int(chapter_part[1:])
                return (block, 997 + x_num, filename)
            except:
                return (block, 997, filename)
        if chapter_part == '99':
            return (block, 999, filename)  # Cierres al final
        
        # Números normales
        try:
            chapter = int(chapter_part)
            return (block, chapter, filename)
        except:
            return (block, 998, filename)
    except:
        return (999, 999, filename)

def audit_structure():
    """Realiza auditoría completa de la estructura"""
    base = Path('/home/planetazuzu/protocolo-r-pido/manual-tes/TES_Manual_Digital')
    
    issues = []
    warnings = []
    info = []
    
    # 1. Verificar archivos en raíz que deberían estar en _DOCUMENTACION_INTERNA
    root_docs_expected = {
        'INDICE_COMPLETO_MANUAL_TES.md': '00_INDICES_Y_MAPAS',
        'MAPA_MAESTRO_MANUAL_TES_DIGITAL.md': '00_INDICES_Y_MAPAS',
        'LISTADO_COMPLETO_RUTAS_MD.md': '00_INDICES_Y_MAPAS',
        'LISTA_COMPLETA_ARCHIVOS.md': '00_INDICES_Y_MAPAS',
        'INFORME_REORGANIZACION_FINAL.md': '02_INFORMES_PROCESO',
        'INFORME_NORMALIZACION.md': '02_INFORMES_PROCESO',
        'INFORME_BLOQUE_1_BUSQUEDA.md': '02_INFORMES_PROCESO',
        'INSTALACION.md': '03_CONVERSION_Y_HERRAMIENTAS',
        'README_CONVERSION.md': '03_CONVERSION_Y_HERRAMIENTAS',
    }
    
    for doc_file, expected_subdir in root_docs_expected.items():
        if (base / doc_file).exists():
            issues.append({
                'type': 'MISPLACED',
                'file': doc_file,
                'current': 'RAÍZ',
                'expected': f'_DOCUMENTACION_INTERNA/{expected_subdir}',
                'severity': 'HIGH'
            })
    
    # 2. Verificar orden dentro de cada bloque
    bloque_dirs = [d for d in base.iterdir() if d.is_dir() and d.name.startswith('BLOQUE_')]
    
    for bloque_dir in sorted(bloque_dirs):
        md_files = list(bloque_dir.glob('*.md'))
        if not md_files:
            continue
        
        # Ordenar archivos
        sorted_files = sorted([f.name for f in md_files], key=extract_number)
        actual_files = [f.name for f in sorted(md_files, key=lambda x: x.name)]
        
        # Verificar orden
        if sorted_files != actual_files:
            issues.append({
                'type': 'ORDER',
                'block': bloque_dir.name,
                'current_order': actual_files,
                'expected_order': sorted_files,
                'severity': 'MEDIUM'
            })
        
        # Verificar que *_99_* está al final
        x99_files = [f for f in sorted_files if '_99_' in f]
        if x99_files:
            last_file = sorted_files[-1]
            if not any('_99_' in f for f in [last_file]):
                issues.append({
                    'type': 'ORDER',
                    'block': bloque_dir.name,
                    'issue': 'Archivos *_99_* no están al final',
                    'severity': 'MEDIUM'
                })
    
    # 3. Verificar estructura de _DOCUMENTACION_INTERNA
    doc_interna = base / '_DOCUMENTACION_INTERNA'
    if doc_interna.exists():
        expected_subdirs = [
            '00_INDICES_Y_MAPAS',
            '01_ANALISIS_Y_AUDITORIA',
            '02_INFORMES_PROCESO',
            '03_CONVERSION_Y_HERRAMIENTAS',
            '04_CONTROL_Y_GOBERNANZA'
        ]
        
        for subdir in expected_subdirs:
            if not (doc_interna / subdir).exists():
                warnings.append({
                    'type': 'MISSING_SUBDIR',
                    'subdir': f'_DOCUMENTACION_INTERNA/{subdir}',
                    'severity': 'LOW'
                })
    
    # 4. Estadísticas
    total_md = len(list(base.rglob('*.md')))
    bloque_md = len([f for d in bloque_dirs for f in d.glob('*.md')])
    doc_interna_md = len(list((base / '_DOCUMENTACION_INTERNA').rglob('*.md'))) if (base / '_DOCUMENTACION_INTERNA').exists() else 0
    root_md = len([f for f in base.glob('*.md')])
    
    info.append({
        'total_md_files': total_md,
        'bloque_md_files': bloque_md,
        'doc_interna_md_files': doc_interna_md,
        'root_md_files': root_md
    })
    
    return {
        'issues': issues,
        'warnings': warnings,
        'info': info
    }

if __name__ == '__main__':
    results = audit_structure()
    
    print("=" * 80)
    print("AUDITORÍA DE ESTRUCTURA - MANUAL TES DIGITAL")
    print("=" * 80)
    print()
    
    print(f"📊 ESTADÍSTICAS:")
    for stat in results['info']:
        for key, value in stat.items():
            print(f"  {key}: {value}")
    print()
    
    print(f"❌ PROBLEMAS DETECTADOS: {len(results['issues'])}")
    for i, issue in enumerate(results['issues'], 1):
        print(f"\n{i}. [{issue['severity']}] {issue['type']}")
        if issue['type'] == 'MISPLACED':
            print(f"   Archivo: {issue['file']}")
            print(f"   Ubicación actual: {issue['current']}")
            print(f"   Ubicación esperada: {issue['expected']}")
        elif issue['type'] == 'ORDER':
            print(f"   Bloque: {issue['block']}")
            if 'issue' in issue:
                print(f"   Problema: {issue['issue']}")
            else:
                print(f"   Orden actual vs esperado detectado")
    print()
    
    print(f"⚠️  ADVERTENCIAS: {len(results['warnings'])}")
    for i, warning in enumerate(results['warnings'], 1):
        print(f"\n{i}. [{warning['severity']}] {warning['type']}")
        print(f"   {warning['subdir']}")
    print()
    
    print("=" * 80)
