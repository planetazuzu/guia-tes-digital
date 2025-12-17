#!/usr/bin/env python3
"""
Script para generar reportes completos para conversión a app digital
Genera 3 reportes:
1. Archivos .md faltantes del índice
2. Medios/multimedia faltantes
3. Recomendaciones para estructura de app
"""

import os
import re
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Set, Tuple

BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_DIR = BASE_DIR / "manual-tes" / "TES_Manual_Digital"

# Mapeo del índice esperado (del INDICE_COMPLETO_MANUAL_TES.md)
INDICE_ESPERADO = {
    "1.1.1": {"nombre": "Fundamentos de Emergencias", "bloque": 0, "parte": 1},
    "1.2.1": {"nombre": "Constantes Vitales", "bloque": 1, "parte": 1},
    "1.2.2": {"nombre": "ABCDE Operativo", "bloque": 1, "parte": 1},
    "1.2.3": {"nombre": "Glasgow Operativo", "bloque": 1, "parte": 1},
    "1.2.4": {"nombre": "Triage START", "bloque": 1, "parte": 1},
    "2.1.1": {"nombre": "Acceso Vascular Básico", "bloque": 4, "parte": 2},
    "2.1.2": {"nombre": "Reconocimiento PCR", "bloque": 4, "parte": 2},
    "2.1.3": {"nombre": "RCP Adultos", "bloque": 4, "parte": 2},
    "2.1.4": {"nombre": "RCP Pediatría", "bloque": 4, "parte": 2},
    "2.1.5": {"nombre": "RCP Lactantes", "bloque": 4, "parte": 2},
    "2.1.6": {"nombre": "Uso DESA", "bloque": 4, "parte": 2},
    "2.1.7": {"nombre": "RCP Dos Intervinientes", "bloque": 4, "parte": 2},
    "2.1.8": {"nombre": "OVACE Adultos", "bloque": 4, "parte": 2},
    "2.1.9": {"nombre": "OVACE Pediatría", "bloque": 4, "parte": 2},
    "2.1.10": {"nombre": "OVACE Lactantes", "bloque": 4, "parte": 2},
    "2.1.11": {"nombre": "Posición Lateral de Seguridad", "bloque": 4, "parte": 2},
    "2.2.1": {"nombre": "Medicina de Emergencias Aplicada", "bloque": 9, "parte": 2},
    "3.1.1": {"nombre": "Anatomía Operativa", "bloque": 2, "parte": 3},
    "3.1.2": {"nombre": "Inmovilización Manual", "bloque": 2, "parte": 3},
    "3.1.3": {"nombre": "Collarín Cervical", "bloque": 2, "parte": 3},
    "3.1.4": {"nombre": "Camilla Cuchara", "bloque": 2, "parte": 3},
    "3.1.5": {"nombre": "Tablero Espinal", "bloque": 2, "parte": 3},
    "3.1.6": {"nombre": "Colchón Vacío", "bloque": 2, "parte": 3},
    "3.1.7": {"nombre": "Extricación y Movimientos en Bloque", "bloque": 2, "parte": 3},
    "3.1.8": {"nombre": "Transferencias y Movilización", "bloque": 2, "parte": 3},
    "3.1.9": {"nombre": "Errores Críticos", "bloque": 2, "parte": 3},
    "3.1.10": {"nombre": "Férulas", "bloque": 2, "parte": 3},
    "3.1.11": {"nombre": "Cinturón Pélvico", "bloque": 2, "parte": 3},
    "3.1.12": {"nombre": "Férula de Tracción", "bloque": 2, "parte": 3},
    "3.1.13": {"nombre": "Camillas y Sillas de Evacuación", "bloque": 2, "parte": 3},
    "3.1.14": {"nombre": "Inventario de Material", "bloque": 2, "parte": 3},
    "3.2.1": {"nombre": "Oxigenoterapia Básica", "bloque": 3, "parte": 3},
    "3.2.2": {"nombre": "Oxigenoterapia - Fundamentos", "bloque": 3, "parte": 3},
    "3.2.3": {"nombre": "Dispositivos de Oxigenoterapia", "bloque": 3, "parte": 3},
    "3.2.4": {"nombre": "Ventilación con Bolsa-Mascarilla", "bloque": 3, "parte": 3},
    "3.2.5": {"nombre": "Aspiración", "bloque": 3, "parte": 3},
    "3.2.6": {"nombre": "Cánula Orofaringea", "bloque": 3, "parte": 3},
    "3.2.7": {"nombre": "BVM (Bolsa Válvula Mascarilla)", "bloque": 3, "parte": 3},
    "3.2.8": {"nombre": "Cánulas", "bloque": 3, "parte": 3},
    "3.2.9": {"nombre": "Organización del Maletín", "bloque": 3, "parte": 3},
    "3.2.10": {"nombre": "Control de Hemorragias", "bloque": 3, "parte": 3},
    "3.2.11": {"nombre": "Quemaduras", "bloque": 3, "parte": 3},
    "3.2.12": {"nombre": "Heridas y Vendajes", "bloque": 3, "parte": 3},
    "3.2.13": {"nombre": "Exposición y Aislamiento Térmico", "bloque": 3, "parte": 3},
    "3.2.14": {"nombre": "Monitorización Básica", "bloque": 3, "parte": 3},
    "3.2.15": {"nombre": "Glucometro", "bloque": 3, "parte": 3},
    "3.2.16": {"nombre": "Termometría", "bloque": 3, "parte": 3},
    "3.2.17": {"nombre": "Confort y Dolor", "bloque": 3, "parte": 3},
    "3.2.18": {"nombre": "Bioseguridad y Descontaminación", "bloque": 3, "parte": 3},
    "3.2.19": {"nombre": "Gestión de Material en Escena", "bloque": 3, "parte": 3},
    "3.2.20": {"nombre": "Comunicación Operativa", "bloque": 3, "parte": 3},
    "3.2.21": {"nombre": "Señalización e Iluminación", "bloque": 3, "parte": 3},
    "3.2.22": {"nombre": "Documentación Operativa", "bloque": 3, "parte": 3},
    "3.2.23": {"nombre": "Cierre Bloque 3", "bloque": 3, "parte": 3},
    "3.2.24": {"nombre": "Inventario Material Sanitario", "bloque": 3, "parte": 3},
    "3.2.25": {"nombre": "Maletín de Curas", "bloque": 3, "parte": 3},
    "3.2.26": {"nombre": "Bolsa de Monitorización", "bloque": 3, "parte": 3},
    "3.2.27": {"nombre": "Inventario Global", "bloque": 3, "parte": 3},
    "3.2.28": {"nombre": "Checklist Maestro", "bloque": 3, "parte": 3},
    "4.1.1": {"nombre": "Principios de Administración de Fármacos", "bloque": 6, "parte": 4},
    "4.1.2": {"nombre": "Vademécum Operativo", "bloque": 6, "parte": 4},
    "4.1.3": {"nombre": "Oxígeno - Administración y Seguridad", "bloque": 6, "parte": 4},
    "4.1.4": {"nombre": "Adrenalina - Uso en Anafilaxia y RCP", "bloque": 6, "parte": 4},
    "4.1.5": {"nombre": "Aspirina - Uso en SCA", "bloque": 6, "parte": 4},
    "4.1.6": {"nombre": "Glucagón - Uso en Hipoglucemia", "bloque": 6, "parte": 4},
    "4.1.7": {"nombre": "Salbutamol - Uso en Crisis Asmática", "bloque": 6, "parte": 4},
    "4.1.8": {"nombre": "Abreviaturas y Terminología Farmacológica", "bloque": 6, "parte": 4},
    "5.1.1": {"nombre": "Introducción a Protocolos Transtelefónicos", "bloque": 5, "parte": 5},
    "5.1.2": {"nombre": "Protocolos de Emergencias Específicas", "bloque": 5, "parte": 5},
    "5.1.3": {"nombre": "PCR Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.4": {"nombre": "OVACE Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.5": {"nombre": "SCA Transtelefónico", "bloque": 5, "parte": 5},
    "5.1.6": {"nombre": "ICTUS Transtelefónico", "bloque": 5, "parte": 5},
    "5.1.7": {"nombre": "Anafilaxia Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.8": {"nombre": "Crisis Asmática Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.9": {"nombre": "Hipoglucemia Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.10": {"nombre": "Comunicación con Coordinador", "bloque": 5, "parte": 5},
    "5.2.1": {"nombre": "Introducción a Gestión Operativa", "bloque": 8, "parte": 5},
    "5.2.2": {"nombre": "Documentación Clínica Prehospitalaria", "bloque": 8, "parte": 5},
    "5.2.3": {"nombre": "Coordinación y Comunicación Operativa", "bloque": 8, "parte": 5},
    "5.2.4": {"nombre": "Gestión de Recursos y Material", "bloque": 8, "parte": 5},
    "5.2.5": {"nombre": "Calidad y Mejora Continua", "bloque": 8, "parte": 5},
    "6.1.1": {"nombre": "Fundamentos de Conducción en Urgencias", "bloque": 7, "parte": 6},
    "6.1.2": {"nombre": "Uso de Luces y Sirena", "bloque": 7, "parte": 6},
    "6.1.3": {"nombre": "Técnicas de Conducción en Emergencias", "bloque": 7, "parte": 6},
    "6.1.4": {"nombre": "Seguridad Vial y Prevención de Accidentes", "bloque": 7, "parte": 6},
    "6.1.5": {"nombre": "Gestión de Rutas y Navegación", "bloque": 7, "parte": 6},
    "6.1.6": {"nombre": "Protocolos de Seguridad en Escena", "bloque": 7, "parte": 6},
    "7.1.1": {"nombre": "Situaciones Especiales", "bloque": 10, "parte": 7},
    "7.2.1": {"nombre": "Protocolos de Trauma", "bloque": 11, "parte": 7},
    "8.1.1": {"nombre": "Marco Legal, Ético y Profesional del TES", "bloque": 12, "parte": 8},
    "8.2.1": {"nombre": "Comunicación y Relación con el Paciente", "bloque": 13, "parte": 8},
    "8.3.1": {"nombre": "Seguridad Personal y Salud del TES", "bloque": 14, "parte": 8},
}

BLOQUE_TO_FOLDER = {
    0: "BLOQUE_0_FUNDAMENTOS",
    1: "BLOQUE_1_PROCEDIMIENTOS_BASICOS",
    2: "BLOQUE_2_MATERIAL_E_INMOVILIZACION",
    3: "BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA",
    4: "BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP",
    5: "BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS",
    6: "BLOQUE_6_FARMACOLOGIA",
    7: "BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL",
    8: "BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION",
    9: "BLOQUE_9_MEDICINA_EMERGENCIAS_APLICADA",
    10: "BLOQUE_10_SITUACIONES_ESPECIALES",
    11: "BLOQUE_11_PROTOCOLOS_TRAUMA",
    12: "BLOQUE_12_MARCO_LEGAL_ETICO_PROFESIONAL",
    13: "BLOQUE_13_COMUNICACION_RELACION_PACIENTE",
    14: "BLOQUE_14_SEGURIDAD_PERSONAL_SALUD_TES",
}

def obtener_archivos_md_existentes() -> Dict[str, Path]:
    """Obtiene todos los archivos .md existentes mapeados por nombre"""
    archivos = {}
    for bloque_dir in MANUAL_DIR.iterdir():
        if bloque_dir.is_dir() and bloque_dir.name.startswith("BLOQUE_"):
            for archivo in bloque_dir.glob("*.md"):
                archivos[archivo.name] = archivo
    return archivos

def buscar_referencias_multimedia(archivo: Path) -> List[Dict]:
    """Busca referencias a medios/multimedia en un archivo"""
    referencias = []
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
            lineas = contenido.split('\n')
            
            for num_linea, linea in enumerate(lineas, 1):
                # Buscar imágenes: ![texto](ruta)
                patron_imagen = r'!\[([^\]]*)\]\(([^\)]+)\)'
                matches = re.findall(patron_imagen, linea)
                for texto_alt, ruta in matches:
                    referencias.append({
                        'tipo': 'imagen',
                        'texto_alt': texto_alt,
                        'ruta': ruta,
                        'linea': num_linea,
                        'archivo': archivo.name,
                        'ruta_completa': str(archivo)
                    })
                
                # Buscar enlaces a archivos multimedia
                patron_multimedia = r'\[([^\]]+)\]\(([^\)]+\.(jpg|jpeg|png|gif|svg|pdf|mp4|mp3|avi|mov|wav))\)'
                matches = re.findall(patron_multimedia, linea, re.IGNORECASE)
                for texto, ruta, ext in matches:
                    referencias.append({
                        'tipo': 'multimedia',
                        'texto': texto,
                        'ruta': ruta,
                        'extension': ext,
                        'linea': num_linea,
                        'archivo': archivo.name,
                        'ruta_completa': str(archivo)
                    })
                
                # Buscar referencias a videos
                if 'video' in linea.lower() or 'youtube' in linea.lower() or 'vimeo' in linea.lower():
                    referencias.append({
                        'tipo': 'video_referencia',
                        'linea': num_linea,
                        'contenido': linea.strip(),
                        'archivo': archivo.name,
                        'ruta_completa': str(archivo)
                    })
    except Exception as e:
        print(f"Error leyendo {archivo}: {e}")
    
    return referencias

def verificar_existencia_medio(ruta: str, archivo_origen: Path) -> bool:
    """Verifica si un archivo multimedia existe"""
    # Si es ruta absoluta
    if os.path.isabs(ruta):
        return os.path.exists(ruta)
    
    # Si es ruta relativa
    archivo_dir = archivo_origen.parent
    ruta_completa = (archivo_dir / ruta).resolve()
    
    # Verificar si existe
    if ruta_completa.exists():
        return True
    
    # Buscar en otras ubicaciones comunes
    posibles_rutas = [
        MANUAL_DIR / ruta,
        BASE_DIR / ruta,
        BASE_DIR / "public" / ruta,
        BASE_DIR / "src" / "assets" / ruta,
    ]
    
    return any(os.path.exists(r) for r in posibles_rutas)

def generar_reporte_1_archivos_faltantes():
    """Genera reporte 1: Archivos .md faltantes del índice"""
    archivos_existentes = obtener_archivos_md_existentes()
    
    # Mapear archivos esperados según el índice
    archivos_esperados = {}
    for codigo, info in INDICE_ESPERADO.items():
        bloque_num = info["bloque"]
        folder_name = BLOQUE_TO_FOLDER[bloque_num]
        # Generar nombre esperado basado en el patrón observado
        nombre_base = info["nombre"].upper().replace(" ", "_").replace("-", "_")
        nombre_archivo = f"BLOQUE_{bloque_num:02d}_{codigo.split('.')[-1]}_{nombre_base}.md"
        archivos_esperados[codigo] = {
            'nombre': info["nombre"],
            'archivo_esperado': nombre_archivo,
            'bloque': bloque_num,
            'folder': folder_name
        }
    
    # Verificar qué archivos existen realmente
    archivos_encontrados = []
    archivos_faltantes = []
    
    # Buscar archivos por bloque y nombre aproximado
    for codigo, info_esperado in archivos_esperados.items():
        bloque_num = info_esperado['bloque']
        folder_name = info_esperado['folder']
        bloque_dir = MANUAL_DIR / folder_name
        
        encontrado = False
        archivo_real = None
        
        if bloque_dir.exists():
            # Buscar archivos que coincidan con el patrón
            nombre_buscar = info_esperado['nombre'].upper().replace(" ", "_")
            for archivo in bloque_dir.glob("*.md"):
                if nombre_buscar in archivo.name.upper() or f"BLOQUE_{bloque_num:02d}" in archivo.name:
                    encontrado = True
                    archivo_real = archivo.name
                    break
        
        if encontrado:
            archivos_encontrados.append({
                'codigo': codigo,
                'nombre': info_esperado['nombre'],
                'archivo_real': archivo_real,
                'bloque': bloque_num
            })
        else:
            archivos_faltantes.append({
                'codigo': codigo,
                'nombre': info_esperado['nombre'],
                'archivo_esperado': info_esperado['archivo_esperado'],
                'bloque': bloque_num,
                'folder': folder_name
            })
    
    # Generar reporte
    reporte = []
    reporte.append("# REPORTE 1: ARCHIVOS .MD FALTANTES DEL ÍNDICE\n")
    reporte.append(f"**Fecha:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    reporte.append("---\n")
    
    reporte.append("## 📊 RESUMEN EJECUTIVO\n")
    reporte.append(f"- **Total de capítulos según índice:** {len(INDICE_ESPERADO)}\n")
    reporte.append(f"- **Archivos encontrados:** {len(archivos_encontrados)}\n")
    reporte.append(f"- **Archivos faltantes:** {len(archivos_faltantes)}\n")
    reporte.append(f"- **Porcentaje de completitud:** {(len(archivos_encontrados)/len(INDICE_ESPERADO)*100):.1f}%\n")
    reporte.append("---\n")
    
    if archivos_faltantes:
        reporte.append("## ❌ ARCHIVOS FALTANTES\n")
        reporte.append(f"**Total:** {len(archivos_faltantes)} archivos\n\n")
        
        por_parte = defaultdict(list)
        for archivo in archivos_faltantes:
            parte_num = archivo['codigo'].split('.')[0]
            por_parte[parte_num].append(archivo)
        
        for parte_num in sorted(por_parte.keys(), key=int):
            reporte.append(f"\n### Parte {parte_num}\n")
            for archivo in sorted(por_parte[parte_num], key=lambda x: x['codigo']):
                reporte.append(f"- **{archivo['codigo']}** - {archivo['nombre']}")
                reporte.append(f"  - Bloque: {archivo['bloque']}")
                reporte.append(f"  - Carpeta esperada: `{archivo['folder']}/`")
                reporte.append(f"  - Archivo esperado: `{archivo['archivo_esperado']}`\n")
    else:
        reporte.append("## ✅ TODOS LOS ARCHIVOS ESTÁN PRESENTES\n")
        reporte.append("Todos los 93 capítulos del índice tienen archivos .md correspondientes.\n")
    
    reporte.append("\n---\n")
    reporte.append("## 📋 LISTADO COMPLETO DE ARCHIVOS ENCONTRADOS\n")
    reporte.append(f"**Total:** {len(archivos_encontrados)} archivos\n\n")
    
    por_parte_encontrados = defaultdict(list)
    for archivo in archivos_encontrados:
        parte_num = archivo['codigo'].split('.')[0]
        por_parte_encontrados[parte_num].append(archivo)
    
    for parte_num in sorted(por_parte_encontrados.keys(), key=int):
        reporte.append(f"\n### Parte {parte_num}\n")
        for archivo in sorted(por_parte_encontrados[parte_num], key=lambda x: x['codigo']):
            reporte.append(f"- ✅ `{archivo['codigo']}` - {archivo['nombre']}")
            reporte.append(f"  - Archivo: `{archivo['archivo_real']}`\n")
    
    return "\n".join(reporte), len(archivos_faltantes)

def generar_reporte_2_multimedia_faltante():
    """Genera reporte 2: Medios/multimedia faltantes"""
    archivos_md = obtener_archivos_md_existentes()
    todas_referencias = []
    medios_faltantes = []
    
    for nombre_archivo, ruta_archivo in archivos_md.items():
        referencias = buscar_referencias_multimedia(ruta_archivo)
        todas_referencias.extend(referencias)
        
        for ref in referencias:
            if ref['tipo'] in ['imagen', 'multimedia']:
                if not verificar_existencia_medio(ref['ruta'], ruta_archivo):
                    medios_faltantes.append(ref)
    
    # Generar reporte
    reporte = []
    reporte.append("# REPORTE 2: MEDIOS/MULTIMEDIA FALTANTES\n")
    reporte.append(f"**Fecha:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    reporte.append("---\n")
    
    reporte.append("## 📊 RESUMEN EJECUTIVO\n")
    reporte.append(f"- **Total de referencias a medios encontradas:** {len(todas_referencias)}\n")
    reporte.append(f"- **Medios faltantes:** {len(medios_faltantes)}\n")
    reporte.append(f"- **Medios existentes:** {len(todas_referencias) - len(medios_faltantes)}\n")
    reporte.append("---\n")
    
    if medios_faltantes:
        reporte.append("## ❌ MEDIOS FALTANTES\n")
        reporte.append(f"**Total:** {len(medios_faltantes)} referencias a medios que no existen\n\n")
        
        por_tipo = defaultdict(list)
        for medio in medios_faltantes:
            por_tipo[medio['tipo']].append(medio)
        
        for tipo in sorted(por_tipo.keys()):
            reporte.append(f"\n### {tipo.upper()}\n")
            for medio in por_tipo[tipo]:
                reporte.append(f"- **Archivo:** `{medio['archivo']}`")
                reporte.append(f"  - **Línea:** {medio['linea']}")
                reporte.append(f"  - **Ruta referenciada:** `{medio['ruta']}`")
                if 'texto_alt' in medio:
                    reporte.append(f"  - **Texto alternativo:** {medio['texto_alt']}")
                reporte.append(f"  - **Ubicación:** `{medio['ruta_completa']}`\n")
    else:
        reporte.append("## ✅ NO SE ENCONTRARON REFERENCIAS A MEDIOS FALTANTES\n")
        reporte.append("No se encontraron referencias a imágenes, videos u otros medios multimedia en los archivos.\n")
    
    reporte.append("\n---\n")
    reporte.append("## 📋 TODAS LAS REFERENCIAS A MEDIOS ENCONTRADAS\n")
    reporte.append(f"**Total:** {len(todas_referencias)} referencias\n\n")
    
    if todas_referencias:
        por_archivo = defaultdict(list)
        for ref in todas_referencias:
            por_archivo[ref['archivo']].append(ref)
        
        for archivo in sorted(por_archivo.keys()):
            reporte.append(f"\n### `{archivo}`\n")
            for ref in por_archivo[archivo]:
                reporte.append(f"- **Línea {ref['linea']}:** {ref['tipo']}")
                if 'ruta' in ref:
                    reporte.append(f"  - Ruta: `{ref['ruta']}`")
                reporte.append("")
    else:
        reporte.append("No se encontraron referencias a medios multimedia en ningún archivo.\n")
    
    return "\n".join(reporte), len(medios_faltantes)

def generar_reporte_3_recomendaciones_app():
    """Genera reporte 3: Recomendaciones para estructura de app"""
    reporte = []
    reporte.append("# REPORTE 3: RECOMENDACIONES PARA ESTRUCTURA DE APP\n")
    reporte.append(f"**Fecha:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    reporte.append("---\n")
    
    reporte.append("## 📱 ESTRUCTURA DE CARPETAS IDEAL PARA APP\n")
    reporte.append("\n### Propuesta de Estructura:\n")
    reporte.append("```\n")
    reporte.append("app-manual-tes/\n")
    reporte.append("├── contenido/\n")
    reporte.append("│   ├── parte-i-fundamentos/\n")
    reporte.append("│   │   ├── bloque-0-fundamentos/\n")
    reporte.append("│   │   │   ├── 1.1.1-fundamentos-emergencias.md\n")
    reporte.append("│   │   │   └── metadata.json\n")
    reporte.append("│   │   └── bloque-1-procedimientos-basicos/\n")
    reporte.append("│   │       ├── 1.2.1-constantes-vitales.md\n")
    reporte.append("│   │       ├── 1.2.2-abcde-operativo.md\n")
    reporte.append("│   │       ├── 1.2.3-glasgow-operativo.md\n")
    reporte.append("│   │       ├── 1.2.4-triage-start.md\n")
    reporte.append("│   │       └── metadata.json\n")
    reporte.append("│   ├── parte-ii-soporte-vital/\n")
    reporte.append("│   │   ├── bloque-4-rcp/\n")
    reporte.append("│   │   └── bloque-9-medicina-emergencias/\n")
    reporte.append("│   ├── parte-iii-material/\n")
    reporte.append("│   │   ├── bloque-2-inmovilizacion/\n")
    reporte.append("│   │   └── bloque-3-oxigenoterapia/\n")
    reporte.append("│   ├── parte-iv-farmacologia/\n")
    reporte.append("│   │   └── bloque-6-farmacologia/\n")
    reporte.append("│   ├── parte-v-protocolos/\n")
    reporte.append("│   │   ├── bloque-5-transtelefonicos/\n")
    reporte.append("│   │   └── bloque-8-gestion/\n")
    reporte.append("│   ├── parte-vi-conduccion/\n")
    reporte.append("│   │   └── bloque-7-conduccion/\n")
    reporte.append("│   ├── parte-vii-situaciones-especiales/\n")
    reporte.append("│   │   ├── bloque-10-situaciones-especiales/\n")
    reporte.append("│   │   └── bloque-11-trauma/\n")
    reporte.append("│   └── parte-viii-habilidades/\n")
    reporte.append("│       ├── bloque-12-marco-legal/\n")
    reporte.append("│       ├── bloque-13-comunicacion/\n")
    reporte.append("│       └── bloque-14-seguridad/\n")
    reporte.append("├── assets/\n")
    reporte.append("│   ├── imagenes/\n")
    reporte.append("│   ├── videos/\n")
    reporte.append("│   └── iconos/\n")
    reporte.append("├── data/\n")
    reporte.append("│   ├── indice.json\n")
    reporte.append("│   └── metadata-global.json\n")
    reporte.append("└── public/\n")
    reporte.append("    └── (archivos estáticos)\n")
    reporte.append("```\n")
    reporte.append("\n---\n")
    
    reporte.append("## 📋 METADATOS NECESARIOS EN CADA .MD\n")
    reporte.append("\n### Front Matter Propuesto (YAML):\n")
    reporte.append("```yaml\n")
    reporte.append("---\n")
    reporte.append("id: '1.1.1'\n")
    reporte.append("titulo: 'Fundamentos de Emergencias'\n")
    reporte.append("subtitulo: 'Marco conceptual y operativo'\n")
    reporte.append("parte: 1\n")
    reporte.append("bloque: 0\n")
    reporte.append("bloque_nombre: 'Fundamentos de Emergencias Prehospitalarias'\n")
    reporte.append("parte_nombre: 'Fundamentos y Evaluación Inicial'\n")
    reporte.append("nivel_dificultad: 'basico'\n")
    reporte.append("importancia: 'alta'\n")
    reporte.append("palabras_clave:\n")
    reporte.append("  - 'emergencias'\n")
    reporte.append("  - 'soporte vital'\n")
    reporte.append("  - 'cadena supervivencia'\n")
    reporte.append("tipo_contenido: 'formativo'\n")
    reporte.append("tiempo_lectura: 15\n")
    reporte.append("version: '1.0'\n")
    reporte.append("fecha_actualizacion: '2024-12-13'\n")
    reporte.append("autor: 'Manual TES Digital'\n")
    reporte.append("navegacion:\n")
    reporte.append("  anterior: null\n")
    reporte.append("  siguiente: '1.2.1'\n")
    reporte.append("  relacionados:\n")
    reporte.append("    - '1.2.1'\n")
    reporte.append("    - '2.1.1'\n")
    reporte.append("---\n")
    reporte.append("```\n")
    reporte.append("\n### Campos Explicados:\n")
    reporte.append("- **id**: Identificador único del capítulo (formato X.Y.Z)\n")
    reporte.append("- **titulo**: Título principal del capítulo\n")
    reporte.append("- **subtitulo**: Descripción breve\n")
    reporte.append("- **parte/bloque**: Números para organización jerárquica\n")
    reporte.append("- **nivel_dificultad**: 'basico', 'intermedio', 'avanzado'\n")
    reporte.append("- **importancia**: 'alta', 'media', 'baja'\n")
    reporte.append("- **palabras_clave**: Array de términos para búsqueda\n")
    reporte.append("- **tipo_contenido**: 'formativo', 'operativo', 'referencia'\n")
    reporte.append("- **tiempo_lectura**: Minutos estimados\n")
    reporte.append("- **navegacion**: Enlaces a capítulos relacionados\n")
    reporte.append("\n---\n")
    
    reporte.append("## 🧭 SISTEMA DE NAVEGACIÓN RECOMENDADO\n")
    reporte.append("\n### 1. Menú Lateral Jerárquico\n")
    reporte.append("```\n")
    reporte.append("📚 Manual TES Digital\n")
    reporte.append("├── 📖 Parte I: Fundamentos\n")
    reporte.append("│   ├── 🔹 Bloque 0: Fundamentos\n")
    reporte.append("│   │   └── 1.1.1 Fundamentos de Emergencias\n")
    reporte.append("│   └── 🔹 Bloque 1: Procedimientos Básicos\n")
    reporte.append("│       ├── 1.2.1 Constantes Vitales\n")
    reporte.append("│       ├── 1.2.2 ABCDE Operativo\n")
    reporte.append("│       ├── 1.2.3 Glasgow Operativo\n")
    reporte.append("│       └── 1.2.4 Triage START\n")
    reporte.append("├── 💉 Parte II: Soporte Vital\n")
    reporte.append("│   ├── 🔹 Bloque 4: RCP\n")
    reporte.append("│   └── 🔹 Bloque 9: Medicina Emergencias\n")
    reporte.append("└── ... (resto de partes)\n")
    reporte.append("```\n")
    reporte.append("\n**Características:**\n")
    reporte.append("- Expandible/colapsable por niveles\n")
    reporte.append("- Indicador visual del capítulo actual\n")
    reporte.append("- Búsqueda rápida integrada\n")
    reporte.append("- Favoritos/marcadores\n")
    reporte.append("\n### 2. Breadcrumbs (Migas de Pan)\n")
    reporte.append("```\n")
    reporte.append("Inicio > Parte I > Bloque 1 > 1.2.1 Constantes Vitales\n")
    reporte.append("```\n")
    reporte.append("\n**Funcionalidad:**\n")
    reporte.append("- Navegación rápida a niveles superiores\n")
    reporte.append("- Contexto visual de ubicación\n")
    reporte.append("- Click en cualquier nivel para ir directamente\n")
    reporte.append("\n### 3. Navegación Anterior/Siguiente\n")
    reporte.append("```\n")
    reporte.append("← Capítulo Anterior: 1.1.1 Fundamentos\n")
    reporte.append("Capítulo Siguiente: 1.2.2 ABCDE Operativo →\n")
    reporte.append("```\n")
    reporte.append("\n**Funcionalidad:**\n")
    reporte.append("- Botones flotantes o en footer\n")
    reporte.append("- Navegación secuencial lógica\n")
    reporte.append("- Atajos de teclado (← →)\n")
    reporte.append("\n### 4. Índice Rápido\n")
    reporte.append("**Características:**\n")
    reporte.append("- Modal o sidebar deslizable\n")
    reporte.append("- Búsqueda instantánea\n")
    reporte.append("- Filtros por parte/bloque\n")
    reporte.append("- Acceso desde cualquier página\n")
    reporte.append("\n---\n")
    
    reporte.append("## 🔍 FUNCIONALIDADES ADICIONALES RECOMENDADAS\n")
    reporte.append("\n### Búsqueda Avanzada\n")
    reporte.append("- Búsqueda por texto completo\n")
    reporte.append("- Filtros por parte, bloque, tipo de contenido\n")
    reporte.append("- Búsqueda por palabras clave\n")
    reporte.append("- Historial de búsquedas\n")
    reporte.append("\n### Modo Offline\n")
    reporte.append("- Cache de contenido para acceso offline\n")
    reporte.append("- Service Worker para PWA\n")
    reporte.append("- Sincronización cuando hay conexión\n")
    reporte.append("\n### Personalización\n")
    reporte.append("- Modo oscuro/claro\n")
    reporte.append("- Tamaño de fuente ajustable\n")
    reporte.append("- Favoritos personalizados\n")
    reporte.append("- Notas/annotaciones por capítulo\n")
    reporte.append("\n### Tests/Autoevaluaciones\n")
    reporte.append("- Preguntas por capítulo\n")
    reporte.append("- Tests por bloque/parte\n")
    reporte.append("- Historial de resultados\n")
    reporte.append("- Modo estudio vs modo examen\n")
    reporte.append("\n---\n")
    
    reporte.append("## 📐 ESTRUCTURA DE DATOS JSON RECOMENDADA\n")
    reporte.append("\n### indice.json\n")
    reporte.append("```json\n")
    reporte.append("{\n")
    reporte.append("  \"version\": \"1.0\",\n")
    reporte.append("  \"fecha\": \"2024-12-15\",\n")
    reporte.append("  \"partes\": [\n")
    reporte.append("    {\n")
    reporte.append("      \"id\": 1,\n")
    reporte.append("      \"nombre\": \"Fundamentos y Evaluación Inicial\",\n")
    reporte.append("      \"bloques\": [\n")
    reporte.append("        {\n")
    reporte.append("          \"id\": 0,\n")
    reporte.append("          \"nombre\": \"Fundamentos de Emergencias\",\n")
    reporte.append("          \"capitulos\": [\n")
    reporte.append("            {\n")
    reporte.append("              \"id\": \"1.1.1\",\n")
    reporte.append("              \"titulo\": \"Fundamentos de Emergencias\",\n")
    reporte.append("              \"ruta\": \"parte-i-fundamentos/bloque-0-fundamentos/1.1.1-fundamentos-emergencias.md\"\n")
    reporte.append("            }\n")
    reporte.append("          ]\n")
    reporte.append("        }\n")
    reporte.append("      ]\n")
    reporte.append("    }\n")
    reporte.append("  ]\n")
    reporte.append("}\n")
    reporte.append("```\n")
    reporte.append("\n---\n")
    
    reporte.append("## ✅ CHECKLIST DE IMPLEMENTACIÓN\n")
    reporte.append("\n### Fase 1: Estructura Base\n")
    reporte.append("- [ ] Crear estructura de carpetas propuesta\n")
    reporte.append("- [ ] Migrar archivos .md a nueva estructura\n")
    reporte.append("- [ ] Agregar front matter a todos los archivos\n")
    reporte.append("- [ ] Generar indice.json desde estructura\n")
    reporte.append("\n### Fase 2: Navegación\n")
    reporte.append("- [ ] Implementar menú lateral jerárquico\n")
    reporte.append("- [ ] Agregar breadcrumbs\n")
    reporte.append("- [ ] Implementar navegación anterior/siguiente\n")
    reporte.append("- [ ] Crear índice rápido con búsqueda\n")
    reporte.append("\n### Fase 3: Funcionalidades\n")
    reporte.append("- [ ] Implementar búsqueda avanzada\n")
    reporte.append("- [ ] Agregar modo offline (PWA)\n")
    reporte.append("- [ ] Implementar personalización\n")
    reporte.append("- [ ] Crear sistema de tests/autoevaluaciones\n")
    reporte.append("\n---\n")
    
    return "\n".join(reporte)

if __name__ == "__main__":
    print("Generando reportes para conversión a app digital...")
    
    # Reporte 1
    print("\n1. Generando reporte de archivos faltantes...")
    reporte1, num_faltantes = generar_reporte_1_archivos_faltantes()
    with open(BASE_DIR / "REPORTE_1_ARCHIVOS_FALTANTES.md", "w", encoding="utf-8") as f:
        f.write(reporte1)
    print(f"   ✅ Reporte 1 generado: {num_faltantes} archivos faltantes")
    
    # Reporte 2
    print("\n2. Generando reporte de medios faltantes...")
    reporte2, num_medios_faltantes = generar_reporte_2_multimedia_faltante()
    with open(BASE_DIR / "REPORTE_2_MEDIOS_FALTANTES.md", "w", encoding="utf-8") as f:
        f.write(reporte2)
    print(f"   ✅ Reporte 2 generado: {num_medios_faltantes} medios faltantes")
    
    # Reporte 3
    print("\n3. Generando reporte de recomendaciones...")
    reporte3 = generar_reporte_3_recomendaciones_app()
    with open(BASE_DIR / "REPORTE_3_RECOMENDACIONES_APP.md", "w", encoding="utf-8") as f:
        f.write(reporte3)
    print(f"   ✅ Reporte 3 generado")
    
    print("\n✅ Todos los reportes generados exitosamente!")
