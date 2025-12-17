#!/usr/bin/env python3
"""
Script exhaustivo para buscar TODAS las referencias a archivos multimedia
y verificar si existen en el sistema
"""

import os
import re
from pathlib import Path
from typing import List, Dict, Tuple
import csv

BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_DIR = BASE_DIR / "manual-tes" / "TES_Manual_Digital"

def buscar_todas_referencias_multimedia(archivo: Path) -> List[Dict]:
    """Busca TODAS las referencias a medios en un archivo"""
    referencias = []
    
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
            lineas = contenido.split('\n')
            
            for num_linea, linea in enumerate(lineas, 1):
                # 1. Patrones de imágenes: ![texto](ruta.jpg)
                patron_imagen = r'!\[([^\]]*)\]\(([^\)]+\.(jpg|jpeg|png|gif|svg|bmp|webp))\)'
                matches = re.findall(patron_imagen, linea, re.IGNORECASE)
                for texto_alt, ruta, ext in matches:
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': 'imagen',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': texto_alt,
                        'contexto': linea.strip()[:100]
                    })
                
                # 2. Referencias a videos en enlaces: [texto](video.mp4)
                patron_video_enlace = r'\[([^\]]*)\]\(([^\)]+\.(mp4|avi|mov|wmv|mkv|webm|flv))\)'
                matches = re.findall(patron_video_enlace, linea, re.IGNORECASE)
                for texto, ruta, ext in matches:
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': 'video',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': texto,
                        'contexto': linea.strip()[:100]
                    })
                
                # 3. Referencias directas a videos (sin enlace)
                patron_video_directo = r'([^\s]+\.(mp4|avi|mov|wmv|mkv|webm|flv))'
                matches = re.findall(patron_video_directo, linea, re.IGNORECASE)
                for ruta, ext in matches:
                    # Evitar falsos positivos en URLs
                    if not ruta.startswith('http'):
                        referencias.append({
                            'archivo_md': archivo.name,
                            'ruta_md': str(archivo.relative_to(BASE_DIR)),
                            'linea': num_linea,
                            'tipo': 'video',
                            'ruta_referenciada': ruta.strip(),
                            'extension': ext.lower(),
                            'texto_alt': '',
                            'contexto': linea.strip()[:100]
                        })
                
                # 4. Enlaces a PDF/DOC/PPT
                patron_documentos = r'\[([^\]]*)\]\(([^\)]+\.(pdf|doc|docx|ppt|pptx|xls|xlsx))\)'
                matches = re.findall(patron_documentos, linea, re.IGNORECASE)
                for texto, ruta, ext in matches:
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': 'documento',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': texto,
                        'contexto': linea.strip()[:100]
                    })
                
                # 5. Referencias a anexos/adjuntos/figuras
                patron_anexo = r'(ver|Ver|VER|consultar|Consultar|CONSULTAR|adjunto|Adjunto|ADJUNTO|anexo|Anexo|ANEXO|figura|Figura|FIGURA|imagen|Imagen|IMAGEN)\s+[A-Z]?\d+[\.\)]?\s*[:\-]?\s*([^\s,\.\)]+\.(jpg|jpeg|png|gif|svg|pdf|doc|docx))'
                matches = re.findall(patron_anexo, linea, re.IGNORECASE)
                for palabra, ruta, ext in matches:
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': 'referencia_textual',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': palabra,
                        'contexto': linea.strip()[:100]
                    })
                
                # 6. Rutas relativas que podrían ser archivos
                patron_rutas = r'\(([\.\/][^\)]+\.(jpg|jpeg|png|gif|svg|pdf|doc|docx|mp4|avi|mov))\)'
                matches = re.findall(patron_rutas, linea, re.IGNORECASE)
                for ruta, ext in matches:
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': 'ruta_relativa',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': '',
                        'contexto': linea.strip()[:100]
                    })
                
                # 7. Referencias a carpetas de assets/imágenes
                patron_assets = r'(assets|images|img|imagenes|media|multimedia|videos|docs|documentos)/([^\s\)]+\.(jpg|jpeg|png|gif|svg|pdf|mp4|avi|mov))'
                matches = re.findall(patron_assets, linea, re.IGNORECASE)
                for carpeta, nombre_archivo, ext in matches:
                    # Construir ruta completa
                    ruta_completa = f"{carpeta}/{nombre_archivo}"
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': 'ruta_assets',
                        'ruta_referenciada': ruta_completa,
                        'extension': ext.lower(),
                        'texto_alt': '',
                        'contexto': linea.strip()[:100]
                    })
    
    except Exception as e:
        print(f"Error procesando {archivo}: {e}")
    
    return referencias

def verificar_existencia_archivo(ruta_referenciada: str, archivo_origen: Path) -> Tuple[bool, str]:
    """Verifica si un archivo existe y devuelve la ruta encontrada"""
    # Limpiar la ruta
    ruta = ruta_referenciada.strip()
    
    # Si es URL, no verificar
    if ruta.startswith('http://') or ruta.startswith('https://'):
        return True, "URL externa"
    
    # Si es ruta absoluta
    if os.path.isabs(ruta):
        if os.path.exists(ruta):
            return True, ruta
        return False, ruta
    
    # Si es ruta relativa
    archivo_dir = archivo_origen.parent
    
    # Intentar resolver desde el directorio del archivo
    ruta_completa = (archivo_dir / ruta).resolve()
    if ruta_completa.exists():
        return True, str(ruta_completa.relative_to(BASE_DIR))
    
    # Intentar desde la raíz del proyecto
    ruta_desde_raiz = BASE_DIR / ruta.lstrip('/')
    if ruta_desde_raiz.exists():
        return True, str(ruta_desde_raiz.relative_to(BASE_DIR))
    
    # Buscar en ubicaciones comunes
    ubicaciones_comunes = [
        BASE_DIR / "public" / ruta,
        BASE_DIR / "src" / "assets" / ruta,
        BASE_DIR / "assets" / ruta,
        BASE_DIR / "images" / ruta,
        BASE_DIR / "docs" / ruta,
        MANUAL_DIR / ruta,
        BASE_DIR / ruta,
    ]
    
    for ubicacion in ubicaciones_comunes:
        if ubicacion.exists():
            return True, str(ubicacion.relative_to(BASE_DIR))
    
    return False, ruta

def obtener_todos_archivos_md() -> List[Path]:
    """Obtiene todos los archivos .md del manual"""
    archivos = []
    for bloque_dir in MANUAL_DIR.iterdir():
        if bloque_dir.is_dir() and bloque_dir.name.startswith("BLOQUE_"):
            for archivo in bloque_dir.glob("*.md"):
                archivos.append(archivo)
    return sorted(archivos)

def generar_reporte_completo():
    """Genera reporte completo de multimedia faltante"""
    print("Buscando referencias a archivos multimedia...")
    archivos_md = obtener_todos_archivos_md()
    
    todas_referencias = []
    
    for archivo in archivos_md:
        referencias = buscar_todas_referencias_multimedia(archivo)
        todas_referencias.extend(referencias)
    
    print(f"Encontradas {len(todas_referencias)} referencias a medios")
    
    # Verificar existencia
    print("Verificando existencia de archivos...")
    resultados = []
    
    for ref in todas_referencias:
        existe, ruta_encontrada = verificar_existencia_archivo(ref['ruta_referenciada'], Path(BASE_DIR / ref['ruta_md']))
        
        resultados.append({
            'archivo_md': ref['archivo_md'],
            'ruta_md': ref['ruta_md'],
            'linea': ref['linea'],
            'tipo': ref['tipo'],
            'ruta_referenciada': ref['ruta_referenciada'],
            'extension': ref['extension'],
            'existe': 'Sí' if existe else 'No',
            'ruta_encontrada': ruta_encontrada if existe else 'N/A',
            'contexto': ref['contexto']
        })
    
    # Separar existentes y faltantes
    referencias_faltantes = [r for r in resultados if r['existe'] == 'No']
    referencias_existentes = [r for r in resultados if r['existe'] == 'Sí']
    
    # Generar CSV
    print("Generando archivo CSV...")
    csv_path = BASE_DIR / "REFERENCIAS_MULTIMEDIA_COMPLETO.csv"
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'Archivo MD', 'Ruta MD', 'Línea', 'Tipo', 'Ruta Referenciada', 
            'Extensión', 'Existe', 'Ruta Encontrada', 'Contexto'
        ])
        writer.writeheader()
        writer.writerows(resultados)
    
    # Generar reporte Markdown
    reporte_md = []
    reporte_md.append("# REPORTE COMPLETO: REFERENCIAS A ARCHIVOS MULTIMEDIA\n")
    reporte_md.append(f"**Fecha:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    reporte_md.append("---\n")
    
    reporte_md.append("## 📊 RESUMEN EJECUTIVO\n")
    reporte_md.append(f"- **Total de referencias encontradas:** {len(resultados)}\n")
    reporte_md.append(f"- **Archivos existentes:** {len(referencias_existentes)}\n")
    reporte_md.append(f"- **Archivos faltantes:** {len(referencias_faltantes)}\n")
    reporte_md.append(f"- **Porcentaje de completitud:** {(len(referencias_existentes)/len(resultados)*100 if resultados else 0):.1f}%\n")
    reporte_md.append("---\n")
    
    if referencias_faltantes:
        reporte_md.append("## ❌ ARCHIVOS MULTIMEDIA FALTANTES\n")
        reporte_md.append(f"**Total:** {len(referencias_faltantes)} referencias a archivos que no existen\n\n")
        reporte_md.append("| Archivo MD | Línea | Tipo | Ruta Referenciada | Extensión | Contexto |\n")
        reporte_md.append("|------------|-------|------|------------------|-----------|----------|\n")
        
        for ref in referencias_faltantes:
            reporte_md.append(f"| `{ref['archivo_md']}` | {ref['linea']} | {ref['tipo']} | `{ref['ruta_referenciada']}` | {ref['extension']} | {ref['contexto'][:50]}... |\n")
    else:
        reporte_md.append("## ✅ NO SE ENCONTRARON ARCHIVOS MULTIMEDIA FALTANTES\n")
        reporte_md.append("Todas las referencias a archivos multimedia apuntan a archivos existentes.\n")
    
    reporte_md.append("\n---\n")
    
    if referencias_existentes:
        reporte_md.append("## ✅ ARCHIVOS MULTIMEDIA EXISTENTES\n")
        reporte_md.append(f"**Total:** {len(referencias_existentes)} referencias a archivos existentes\n\n")
        reporte_md.append("| Archivo MD | Tipo | Ruta Referenciada | Ruta Encontrada |\n")
        reporte_md.append("|------------|------|-------------------|-----------------|\n")
        
        # Mostrar solo primeros 20 para no hacer el reporte muy largo
        for ref in referencias_existentes[:20]:
            reporte_md.append(f"| `{ref['archivo_md']}` | {ref['tipo']} | `{ref['ruta_referenciada']}` | `{ref['ruta_encontrada']}` |\n")
        
        if len(referencias_existentes) > 20:
            reporte_md.append(f"\n*... y {len(referencias_existentes) - 20} referencias más (ver CSV completo)*\n")
    
    reporte_md.append("\n---\n")
    reporte_md.append("## 📋 ESTADÍSTICAS POR TIPO\n")
    
    por_tipo = {}
    por_tipo_faltantes = {}
    
    for ref in resultados:
        tipo = ref['tipo']
        por_tipo[tipo] = por_tipo.get(tipo, 0) + 1
        if ref['existe'] == 'No':
            por_tipo_faltantes[tipo] = por_tipo_faltantes.get(tipo, 0) + 1
    
    reporte_md.append("| Tipo | Total | Faltantes | Existentes |\n")
    reporte_md.append("|------|-------|-----------|------------|\n")
    
    for tipo in sorted(por_tipo.keys()):
        total = por_tipo[tipo]
        faltantes = por_tipo_faltantes.get(tipo, 0)
        existentes = total - faltantes
        reporte_md.append(f"| {tipo} | {total} | {faltantes} | {existentes} |\n")
    
    reporte_md.append("\n---\n")
    reporte_md.append("## 📄 ARCHIVOS GENERADOS\n")
    reporte_md.append(f"- **CSV completo:** `REFERENCIAS_MULTIMEDIA_COMPLETO.csv`\n")
    reporte_md.append(f"- **Reporte Markdown:** Este archivo\n")
    reporte_md.append("\nEl archivo CSV contiene todas las referencias encontradas con detalles completos.\n")
    
    # Guardar reporte
    reporte_path = BASE_DIR / "REPORTE_MULTIMEDIA_COMPLETO.md"
    with open(reporte_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(reporte_md))
    
    print(f"\n✅ Reporte generado: {reporte_path}")
    print(f"✅ CSV generado: {csv_path}")
    print(f"\n📊 Resumen:")
    print(f"   - Referencias encontradas: {len(resultados)}")
    print(f"   - Archivos faltantes: {len(referencias_faltantes)}")
    print(f"   - Archivos existentes: {len(referencias_existentes)}")

if __name__ == "__main__":
    generar_reporte_completo()
