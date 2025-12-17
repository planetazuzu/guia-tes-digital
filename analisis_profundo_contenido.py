#!/usr/bin/env python3
"""
Análisis profundo del contenido del Manual TES Digital
Verifica: referencias cruzadas, links rotos, formato, imágenes, etc.
"""

import os
import re
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Set, Tuple

BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_DIR = BASE_DIR / "manual-tes" / "TES_Manual_Digital"

def obtener_todos_los_archivos_md() -> List[Path]:
    """Obtiene todos los archivos .md del manual"""
    archivos = []
    for bloque_dir in MANUAL_DIR.iterdir():
        if bloque_dir.is_dir() and bloque_dir.name.startswith("BLOQUE_"):
            for archivo in bloque_dir.glob("*.md"):
                archivos.append(archivo)
    return sorted(archivos)

def extraer_referencias_entre_corchetes(contenido: str) -> List[str]:
    """Extrae referencias del tipo [texto](ruta) o [texto]"""
    patrones = [
        r'\[([^\]]+)\]\(([^\)]+)\)',  # [texto](ruta)
        r'\[([^\]]+)\]',  # [texto] sin ruta
    ]
    referencias = []
    for patron in patrones:
        matches = re.findall(patron, contenido)
        for match in matches:
            if isinstance(match, tuple):
                referencias.append(match[1] if match[1] else match[0])
            else:
                referencias.append(match)
    return referencias

def extraer_referencias_cruzadas(contenido: str) -> List[str]:
    """Extrae referencias a otros capítulos/bloques"""
    # Patrones comunes de referencias cruzadas
    patrones = [
        r'(?:ver|Ver|VER|consultar|Consultar|CONSULTAR)\s+(?:el\s+)?(?:capítulo|Capítulo|CAPÍTULO|bloque|Bloque|BLOQUE)?\s*([0-9]+\.[0-9]+(?:\.[0-9]+)?)',
        r'(?:ver|Ver|VER|consultar|Consultar|CONSULTAR)\s+(?:el\s+)?(?:capítulo|Capítulo|CAPÍTULO|bloque|Bloque|BLOQUE)?\s*([0-9]+\.[0-9]+)',
        r'\(ver\s+([0-9]+\.[0-9]+(?:\.[0-9]+)?)\)',
        r'\(Ver\s+([0-9]+\.[0-9]+(?:\.[0-9]+)?)\)',
        r'\[([0-9]+\.[0-9]+(?:\.[0-9]+)?)\]',
    ]
    referencias = []
    for patron in patrones:
        matches = re.findall(patron, contenido)
        referencias.extend(matches)
    return referencias

def extraer_imagenes(contenido: str) -> List[str]:
    """Extrae referencias a imágenes"""
    patron = r'!\[([^\]]*)\]\(([^\)]+)\)'
    matches = re.findall(patron, contenido)
    return [match[1] for match in matches]

def extraer_tablas(contenido: str) -> int:
    """Cuenta tablas en formato markdown"""
    # Buscar líneas que contengan | (indicador de tabla)
    lineas = contenido.split('\n')
    tablas = 0
    en_tabla = False
    for linea in lineas:
        if '|' in linea and linea.strip().startswith('|'):
            if not en_tabla:
                tablas += 1
                en_tabla = True
        elif en_tabla and not linea.strip():
            en_tabla = False
        elif en_tabla and '|' not in linea:
            en_tabla = False
    return tablas

def analizar_estructura_headers(contenido: str) -> Dict:
    """Analiza la estructura de headers del documento"""
    lineas = contenido.split('\n')
    headers = []
    for linea in lineas:
        if linea.startswith('#'):
            nivel = len(linea) - len(linea.lstrip('#'))
            texto = linea.lstrip('#').strip()
            headers.append({'nivel': nivel, 'texto': texto})
    
    return {
        'total': len(headers),
        'headers': headers,
        'tiene_titulo_principal': len(headers) > 0 and headers[0]['nivel'] == 1,
        'estructura_valida': len(headers) > 0
    }

def verificar_metadatos(contenido: str) -> Dict:
    """Verifica metadatos comunes en los archivos"""
    metadatos = {
        'tiene_version': False,
        'tiene_fecha': False,
        'tiene_tipo': False,
        'version': None,
        'fecha': None,
        'tipo': None
    }
    
    # Buscar versión
    match_version = re.search(r'\*\*Versión:\*\*\s*([^\n]+)', contenido)
    if match_version:
        metadatos['tiene_version'] = True
        metadatos['version'] = match_version.group(1).strip()
    
    # Buscar fecha
    match_fecha = re.search(r'\*\*Fecha:\*\*\s*([^\n]+)', contenido)
    if match_fecha:
        metadatos['tiene_fecha'] = True
        metadatos['fecha'] = match_fecha.group(1).strip()
    
    # Buscar tipo
    match_tipo = re.search(r'\*\*Tipo:\*\*\s*([^\n]+)', contenido)
    if match_tipo:
        metadatos['tiene_tipo'] = True
        metadatos['tipo'] = match_tipo.group(1).strip()
    
    return metadatos

def analizar_contenido_completitud(contenido: str) -> Dict:
    """Analiza la completitud del contenido"""
    lineas = contenido.split('\n')
    lineas_no_vacias = [l for l in lineas if l.strip()]
    
    return {
        'total_lineas': len(lineas),
        'lineas_no_vacias': len(lineas_no_vacias),
        'total_caracteres': len(contenido),
        'palabras': len(contenido.split()),
        'tiene_contenido_sustancial': len(lineas_no_vacias) > 50,  # Más de 50 líneas no vacías
        'ratio_contenido': len(lineas_no_vacias) / len(lineas) if lineas else 0
    }

def analizar_archivo(archivo: Path) -> Dict:
    """Analiza un archivo completo"""
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
    except Exception as e:
        return {'error': str(e)}
    
    # Extraer información básica
    nombre_archivo = archivo.name
    ruta_relativa = str(archivo.relative_to(BASE_DIR))
    
    # Análisis
    referencias = extraer_referencias_entre_corchetes(contenido)
    referencias_cruzadas = extraer_referencias_cruzadas(contenido)
    imagenes = extraer_imagenes(contenido)
    num_tablas = extraer_tablas(contenido)
    estructura_headers = analizar_estructura_headers(contenido)
    metadatos = verificar_metadatos(contenido)
    completitud = analizar_contenido_completitud(contenido)
    
    return {
        'archivo': nombre_archivo,
        'ruta': ruta_relativa,
        'referencias': referencias,
        'referencias_cruzadas': referencias_cruzadas,
        'imagenes': imagenes,
        'num_tablas': num_tablas,
        'estructura_headers': estructura_headers,
        'metadatos': metadatos,
        'completitud': completitud
    }

def verificar_links_rotos(analisis_archivos: List[Dict]) -> List[Dict]:
    """Verifica links rotos entre archivos"""
    # Crear mapa de archivos existentes
    archivos_existentes = set()
    for analisis in analisis_archivos:
        if 'error' not in analisis:
            archivos_existentes.add(analisis['archivo'])
            # También agregar variaciones del nombre
            nombre_sin_ext = Path(analisis['archivo']).stem
            archivos_existentes.add(nombre_sin_ext)
    
    links_rotos = []
    for analisis in analisis_archivos:
        if 'error' in analisis:
            continue
        
        archivo_actual = analisis['archivo']
        for ref in analisis['referencias']:
            # Verificar si es una ruta relativa
            if ref.startswith('../') or ref.startswith('./'):
                # Intentar resolver la ruta
                archivo_ref_dir = Path(analisis['ruta']).parent
                ruta_completa = (BASE_DIR / archivo_ref_dir / ref).resolve()
                if not ruta_completa.exists():
                    links_rotos.append({
                        'archivo': archivo_actual,
                        'referencia': ref,
                        'tipo': 'ruta_relativa'
                    })
            elif ref.endswith('.md'):
                # Verificar si el archivo existe
                if ref not in archivos_existentes:
                    # Buscar en todos los bloques
                    encontrado = False
                    for bloque_dir in MANUAL_DIR.iterdir():
                        if bloque_dir.is_dir():
                            if (bloque_dir / ref).exists():
                                encontrado = True
                                break
                    if not encontrado:
                        links_rotos.append({
                            'archivo': archivo_actual,
                            'referencia': ref,
                            'tipo': 'archivo_md'
                        })
    
    return links_rotos

def generar_reporte_profundo():
    """Genera un reporte profundo del análisis"""
    print("Analizando contenido de archivos...")
    archivos = obtener_todos_los_archivos_md()
    
    analisis_completo = []
    for archivo in archivos:
        analisis = analizar_archivo(archivo)
        analisis_completo.append(analisis)
        if 'error' in analisis:
            print(f"⚠️  Error analizando {archivo.name}: {analisis['error']}")
    
    print(f"✅ Analizados {len(analisis_completo)} archivos")
    
    # Verificar links rotos
    print("Verificando links rotos...")
    links_rotos = verificar_links_rotos(analisis_completo)
    
    # Generar estadísticas
    stats = {
        'total_archivos': len(analisis_completo),
        'archivos_con_errores': len([a for a in analisis_completo if 'error' in a]),
        'archivos_con_metadatos_completos': len([a for a in analisis_completo if 'metadatos' in a and a['metadatos']['tiene_version'] and a['metadatos']['tiene_fecha']]),
        'total_referencias_cruzadas': sum(len(a.get('referencias_cruzadas', [])) for a in analisis_completo),
        'total_imagenes': sum(len(a.get('imagenes', [])) for a in analisis_completo),
        'total_tablas': sum(a.get('num_tablas', 0) for a in analisis_completo),
        'links_rotos': len(links_rotos),
        'archivos_sin_contenido_sustancial': len([a for a in analisis_completo if 'completitud' in a and not a['completitud'].get('tiene_contenido_sustancial', False)])
    }
    
    # Generar reporte markdown
    reporte_md = []
    reporte_md.append("# REPORTE DE ANÁLISIS PROFUNDO - MANUAL TES DIGITAL\n")
    reporte_md.append(f"**Fecha:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    reporte_md.append("---\n")
    
    # Estadísticas generales
    reporte_md.append("## 📊 ESTADÍSTICAS GENERALES\n")
    reporte_md.append(f"- **Total de archivos analizados:** {stats['total_archivos']}")
    reporte_md.append(f"- **Archivos con errores de lectura:** {stats['archivos_con_errores']}")
    reporte_md.append(f"- **Archivos con metadatos completos:** {stats['archivos_con_metadatos_completos']}")
    reporte_md.append(f"- **Total referencias cruzadas:** {stats['total_referencias_cruzadas']}")
    reporte_md.append(f"- **Total imágenes referenciadas:** {stats['total_imagenes']}")
    reporte_md.append(f"- **Total tablas:** {stats['total_tablas']}")
    reporte_md.append(f"- **Links rotos encontrados:** {stats['links_rotos']}")
    reporte_md.append(f"- **Archivos sin contenido sustancial:** {stats['archivos_sin_contenido_sustancial']}\n")
    reporte_md.append("---\n")
    
    # Links rotos
    if links_rotos:
        reporte_md.append("## 🔴 LINKS ROTOS ENCONTRADOS\n")
        reporte_md.append(f"**Total:** {len(links_rotos)}\n")
        for link_roto in links_rotos[:20]:  # Limitar a 20 para no hacer el reporte muy largo
            reporte_md.append(f"- `{link_roto['archivo']}` → `{link_roto['referencia']}` ({link_roto['tipo']})")
        if len(links_rotos) > 20:
            reporte_md.append(f"\n*... y {len(links_rotos) - 20} más*")
    else:
        reporte_md.append("## ✅ NO SE ENCONTRARON LINKS ROTOS\n")
    
    reporte_md.append("\n---\n")
    
    # Análisis de metadatos
    reporte_md.append("## 📋 ANÁLISIS DE METADATOS\n")
    archivos_sin_version = [a for a in analisis_completo if 'metadatos' in a and not a['metadatos']['tiene_version']]
    archivos_sin_fecha = [a for a in analisis_completo if 'metadatos' in a and not a['metadatos']['tiene_fecha']]
    archivos_sin_tipo = [a for a in analisis_completo if 'metadatos' in a and not a['metadatos']['tiene_tipo']]
    
    if archivos_sin_version:
        reporte_md.append(f"\n### Archivos sin versión ({len(archivos_sin_version)}):")
        for archivo in archivos_sin_version[:10]:
            reporte_md.append(f"- `{archivo['archivo']}`")
        if len(archivos_sin_version) > 10:
            reporte_md.append(f"*... y {len(archivos_sin_version) - 10} más*")
    
    if archivos_sin_fecha:
        reporte_md.append(f"\n### Archivos sin fecha ({len(archivos_sin_fecha)}):")
        for archivo in archivos_sin_fecha[:10]:
            reporte_md.append(f"- `{archivo['archivo']}`")
        if len(archivos_sin_fecha) > 10:
            reporte_md.append(f"*... y {len(archivos_sin_fecha) - 10} más*")
    
    if archivos_sin_tipo:
        reporte_md.append(f"\n### Archivos sin tipo ({len(archivos_sin_tipo)}):")
        for archivo in archivos_sin_tipo[:10]:
            reporte_md.append(f"- `{archivo['archivo']}`")
        if len(archivos_sin_tipo) > 10:
            reporte_md.append(f"*... y {len(archivos_sin_tipo) - 10} más*")
    
    if not archivos_sin_version and not archivos_sin_fecha and not archivos_sin_tipo:
        reporte_md.append("✅ Todos los archivos tienen metadatos completos\n")
    
    reporte_md.append("\n---\n")
    
    # Análisis de completitud
    reporte_md.append("## 📄 ANÁLISIS DE COMPLETITUD\n")
    archivos_cortos = [a for a in analisis_completo if 'completitud' in a and a['completitud']['lineas_no_vacias'] < 50]
    if archivos_cortos:
        reporte_md.append(f"\n### Archivos con menos de 50 líneas de contenido ({len(archivos_cortos)}):")
        for archivo in archivos_cortos[:10]:
            lineas = archivo['completitud']['lineas_no_vacias']
            reporte_md.append(f"- `{archivo['archivo']}` ({lineas} líneas)")
        if len(archivos_cortos) > 10:
            reporte_md.append(f"*... y {len(archivos_cortos) - 10} más*")
    else:
        reporte_md.append("✅ Todos los archivos tienen contenido sustancial\n")
    
    reporte_md.append("\n---\n")
    
    # Resumen de referencias cruzadas
    reporte_md.append("## 🔗 REFERENCIAS CRUZADAS\n")
    reporte_md.append(f"Se encontraron {stats['total_referencias_cruzadas']} referencias cruzadas entre capítulos.\n")
    reporte_md.append("Esto indica buena integración entre los diferentes capítulos del manual.\n")
    
    reporte_md.append("\n---\n")
    
    # Recomendaciones
    reporte_md.append("## 💡 RECOMENDACIONES\n")
    recomendaciones = []
    
    if stats['links_rotos'] > 0:
        recomendaciones.append("Revisar y corregir los links rotos identificados")
    
    if stats['archivos_con_metadatos_completos'] < stats['total_archivos']:
        recomendaciones.append("Completar metadatos (versión, fecha, tipo) en todos los archivos")
    
    if stats['archivos_sin_contenido_sustancial'] > 0:
        recomendaciones.append("Revisar archivos con poco contenido para asegurar completitud")
    
    if not recomendaciones:
        recomendaciones.append("✅ El proyecto está en excelente estado")
    
    for i, rec in enumerate(recomendaciones, 1):
        reporte_md.append(f"{i}. {rec}")
    
    reporte_md.append("\n---\n")
    
    return "\n".join(reporte_md), stats

if __name__ == "__main__":
    reporte_md, stats = generar_reporte_profundo()
    
    reporte_path = BASE_DIR / "REPORTE_ANALISIS_PROFUNDO.md"
    with open(reporte_path, "w", encoding="utf-8") as f:
        f.write(reporte_md)
    
    print(f"\n✅ Reporte generado: {reporte_path}")
    print(f"\n📊 Resumen:")
    print(f"   - Archivos analizados: {stats['total_archivos']}")
    print(f"   - Links rotos: {stats['links_rotos']}")
    print(f"   - Referencias cruzadas: {stats['total_referencias_cruzadas']}")
    print(f"   - Imágenes: {stats['total_imagenes']}")
    print(f"   - Tablas: {stats['total_tablas']}")
