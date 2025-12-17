#!/usr/bin/env python3
"""
Búsqueda EXHAUSTIVA de referencias a archivos multimedia
Incluye búsqueda de patrones sutiles y referencias textuales
"""

import os
import re
from pathlib import Path
from typing import List, Dict
import csv

BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_DIR = BASE_DIR / "manual-tes" / "TES_Manual_Digital"

def buscar_referencias_exhaustivas(archivo: Path) -> List[Dict]:
    """Búsqueda exhaustiva de TODAS las posibles referencias a medios"""
    referencias = []
    
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
            lineas = contenido.split('\n')
            
            for num_linea, linea in enumerate(lineas, 1):
                # 1. Imágenes Markdown estándar: ![alt](ruta)
                patron1 = r'!\[([^\]]*)\]\(([^\)]+)\)'
                matches = re.findall(patron1, linea)
                for texto_alt, ruta in matches:
                    # Verificar si parece ser una imagen
                    if any(ext in ruta.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.bmp', '.webp']):
                        referencias.append({
                            'archivo_md': archivo.name,
                            'ruta_md': str(archivo.relative_to(BASE_DIR)),
                            'linea': num_linea,
                            'tipo': 'imagen_markdown',
                            'ruta_referenciada': ruta.strip(),
                            'extension': Path(ruta).suffix.lower(),
                            'texto_alt': texto_alt,
                            'contexto': linea.strip()[:150]
                        })
                
                # 2. Enlaces a archivos multimedia: [texto](archivo.ext)
                patron2 = r'\[([^\]]*)\]\(([^\)]+\.(jpg|jpeg|png|gif|svg|bmp|webp|pdf|doc|docx|ppt|pptx|xls|xlsx|mp4|avi|mov|wmv|mkv|webm|flv))\)'
                matches = re.findall(patron2, linea, re.IGNORECASE)
                for texto, ruta, ext in matches:
                    tipo = 'documento' if ext.lower() in ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'] else \
                           'video' if ext.lower() in ['mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm', 'flv'] else 'imagen'
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': f'{tipo}_enlace',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': texto,
                        'contexto': linea.strip()[:150]
                    })
                
                # 3. Referencias directas a archivos (sin markdown)
                patron3 = r'\b([^\s\(\)]+\.(jpg|jpeg|png|gif|svg|bmp|webp|pdf|doc|docx|ppt|pptx|mp4|avi|mov|wmv))\b'
                matches = re.findall(patron3, linea, re.IGNORECASE)
                for ruta, ext in matches:
                    # Evitar URLs y rutas de código
                    if not ruta.startswith('http') and not ruta.startswith('//') and '.' in ruta:
                        tipo = 'documento' if ext.lower() in ['pdf', 'doc', 'docx', 'ppt', 'pptx'] else \
                               'video' if ext.lower() in ['mp4', 'avi', 'mov', 'wmv'] else 'imagen'
                        referencias.append({
                            'archivo_md': archivo.name,
                            'ruta_md': str(archivo.relative_to(BASE_DIR)),
                            'linea': num_linea,
                            'tipo': f'{tipo}_directo',
                            'ruta_referenciada': ruta.strip(),
                            'extension': ext.lower(),
                            'texto_alt': '',
                            'contexto': linea.strip()[:150]
                        })
                
                # 4. Referencias textuales: "ver figura X", "anexo Y", etc.
                patron4 = r'(ver|Ver|VER|consultar|Consultar|CONSULTAR|adjunto|Adjunto|ADJUNTO|anexo|Anexo|ANEXO|figura|Figura|FIGURA|imagen|Imagen|IMAGEN|gráfico|Gráfico|GRÁFICO|diagrama|Diagrama|DIAGRAMA|tabla|Tabla|TABLA)\s+[A-Z]?\d+[\.\)]?\s*[:\-]?\s*([^\s,\.\)]+\.(jpg|jpeg|png|gif|svg|pdf|doc|docx))'
                matches = re.findall(patron4, linea, re.IGNORECASE)
                for palabra, ruta, ext in matches:
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': 'referencia_textual',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': palabra,
                        'contexto': linea.strip()[:150]
                    })
                
                # 5. Rutas relativas con ../ o ./
                patron5 = r'\(([\.\/][^\)]+\.(jpg|jpeg|png|gif|svg|pdf|doc|docx|mp4|avi|mov))\)'
                matches = re.findall(patron5, linea, re.IGNORECASE)
                for ruta, ext in matches:
                    tipo = 'documento' if ext.lower() in ['pdf', 'doc', 'docx'] else \
                           'video' if ext.lower() in ['mp4', 'avi', 'mov'] else 'imagen'
                    referencias.append({
                        'archivo_md': archivo.name,
                        'ruta_md': str(archivo.relative_to(BASE_DIR)),
                        'linea': num_linea,
                        'tipo': f'{tipo}_relativa',
                        'ruta_referenciada': ruta.strip(),
                        'extension': ext.lower(),
                        'texto_alt': '',
                        'contexto': linea.strip()[:150]
                    })
                
                # 6. Referencias a carpetas comunes
                patron6 = r'(assets|images|img|imagenes|media|multimedia|videos|docs|documentos|public|static)/[^\s\)]+\.(jpg|jpeg|png|gif|svg|pdf|mp4|avi|mov)'
                matches = re.findall(patron6, linea, re.IGNORECASE)
                for carpeta, ext in matches:
                    # Extraer nombre de archivo
                    match_archivo = re.search(rf'{carpeta}/([^\s\)]+\.{ext})', linea, re.IGNORECASE)
                    if match_archivo:
                        nombre_archivo = match_archivo.group(1)
                        ruta_completa = f"{carpeta}/{nombre_archivo}"
                        tipo = 'documento' if ext.lower() == 'pdf' else \
                               'video' if ext.lower() in ['mp4', 'avi', 'mov'] else 'imagen'
                        referencias.append({
                            'archivo_md': archivo.name,
                            'ruta_md': str(archivo.relative_to(BASE_DIR)),
                            'linea': num_linea,
                            'tipo': f'{tipo}_carpeta',
                            'ruta_referenciada': ruta_completa,
                            'extension': ext.lower(),
                            'texto_alt': carpeta,
                            'contexto': linea.strip()[:150]
                        })
    
    except Exception as e:
        print(f"Error procesando {archivo}: {e}")
    
    return referencias

def verificar_existencia(ruta: str, archivo_origen: Path) -> tuple:
    """Verifica si un archivo existe"""
    ruta = ruta.strip()
    
    # URLs externas
    if ruta.startswith(('http://', 'https://', '//')):
        return True, "URL externa"
    
    # Ruta absoluta
    if os.path.isabs(ruta):
        return os.path.exists(ruta), ruta
    
    # Ruta relativa desde el archivo origen
    archivo_dir = archivo_origen.parent
    ruta_resuelta = (archivo_dir / ruta).resolve()
    
    if ruta_resuelta.exists() and ruta_resuelta.is_file():
        return True, str(ruta_resuelta.relative_to(BASE_DIR))
    
    # Buscar desde raíz del proyecto
    ruta_desde_raiz = BASE_DIR / ruta.lstrip('/')
    if ruta_desde_raiz.exists() and ruta_desde_raiz.is_file():
        return True, str(ruta_desde_raiz.relative_to(BASE_DIR))
    
    # Buscar en ubicaciones comunes
    ubicaciones = [
        BASE_DIR / "public" / ruta,
        BASE_DIR / "src" / "assets" / ruta,
        BASE_DIR / "assets" / ruta,
        BASE_DIR / "images" / ruta,
        BASE_DIR / "docs" / ruta,
        MANUAL_DIR / ruta,
    ]
    
    for ubicacion in ubicaciones:
        if ubicacion.exists() and ubicacion.is_file():
            return True, str(ubicacion.relative_to(BASE_DIR))
    
    return False, ruta

def obtener_archivos_md() -> List[Path]:
    """Obtiene todos los archivos .md del manual"""
    archivos = []
    for bloque_dir in MANUAL_DIR.iterdir():
        if bloque_dir.is_dir() and bloque_dir.name.startswith("BLOQUE_"):
            for archivo in bloque_dir.glob("*.md"):
                archivos.append(archivo)
    return sorted(archivos)

def main():
    print("🔍 Búsqueda EXHAUSTIVA de referencias a archivos multimedia...")
    archivos_md = obtener_archivos_md()
    print(f"   Analizando {len(archivos_md)} archivos .md...")
    
    todas_referencias = []
    for archivo in archivos_md:
        refs = buscar_referencias_exhaustivas(archivo)
        todas_referencias.extend(refs)
    
    print(f"   Encontradas {len(todas_referencias)} referencias potenciales")
    
    # Verificar existencia
    print("   Verificando existencia de archivos...")
    resultados = []
    
    for ref in todas_referencias:
        existe, ruta_encontrada = verificar_existencia(ref['ruta_referenciada'], Path(BASE_DIR / ref['ruta_md']))
        
        resultados.append({
            'Archivo MD': ref['archivo_md'],
            'Ruta MD': ref['ruta_md'],
            'Línea': ref['linea'],
            'Tipo': ref['tipo'],
            'Ruta Referenciada': ref['ruta_referenciada'],
            'Extensión': ref['extension'],
            'Existe': 'Sí' if existe else 'No',
            'Ruta Encontrada': ruta_encontrada if existe else 'N/A',
            'Contexto': ref['contexto']
        })
    
    # Separar faltantes
    faltantes = [r for r in resultados if r['Existe'] == 'No']
    existentes = [r for r in resultados if r['Existe'] == 'Sí']
    
    # Generar CSV
    csv_path = BASE_DIR / "REFERENCIAS_MULTIMEDIA_COMPLETO.csv"
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        if resultados:
            writer = csv.DictWriter(f, fieldnames=resultados[0].keys())
            writer.writeheader()
            writer.writerows(resultados)
        else:
            f.write("Archivo MD,Ruta MD,Línea,Tipo,Ruta Referenciada,Extensión,Existe,Ruta Encontrada,Contexto\n")
    
    # Generar reporte Markdown
    reporte = []
    reporte.append("# REPORTE EXHAUSTIVO: REFERENCIAS A ARCHIVOS MULTIMEDIA\n")
    reporte.append(f"**Fecha:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    reporte.append("---\n")
    
    reporte.append("## 📊 RESUMEN EJECUTIVO\n")
    reporte.append(f"- **Total de archivos .md analizados:** {len(archivos_md)}\n")
    reporte.append(f"- **Total de referencias encontradas:** {len(resultados)}\n")
    reporte.append(f"- **Archivos existentes:** {len(existentes)}\n")
    reporte.append(f"- **Archivos faltantes:** {len(faltantes)}\n")
    
    if resultados:
        reporte.append(f"- **Porcentaje de completitud:** {(len(existentes)/len(resultados)*100):.1f}%\n")
    else:
        reporte.append("- **Porcentaje de completitud:** N/A (no se encontraron referencias)\n")
    
    reporte.append("---\n")
    
    if faltantes:
        reporte.append("## ❌ ARCHIVOS MULTIMEDIA FALTANTES\n")
        reporte.append(f"**Total:** {len(faltantes)} referencias a archivos que NO existen\n\n")
        reporte.append("| Archivo MD | Línea | Tipo | Ruta Referenciada | Extensión | Contexto |\n")
        reporte.append("|------------|-------|------|-------------------|-----------|----------|\n")
        
        for ref in faltantes:
            contexto_corto = ref['Contexto'][:80].replace('|', '\\|')
            reporte.append(f"| `{ref['Archivo MD']}` | {ref['Línea']} | {ref['Tipo']} | `{ref['Ruta Referenciada']}` | {ref['Extensión']} | {contexto_corto}... |\n")
    else:
        reporte.append("## ✅ NO SE ENCONTRARON ARCHIVOS MULTIMEDIA FALTANTES\n")
        if len(resultados) == 0:
            reporte.append("\n**Resultado:** No se encontraron referencias a archivos multimedia en ningún archivo .md del proyecto.\n")
            reporte.append("\nEsto indica que:\n")
            reporte.append("- Los archivos .md no contienen referencias a imágenes, videos o documentos externos\n")
            reporte.append("- El contenido es principalmente texto con formato Markdown\n")
            reporte.append("- No hay dependencias de archivos multimedia que deban ser creados\n")
        else:
            reporte.append("\nTodas las referencias encontradas apuntan a archivos existentes.\n")
    
    reporte.append("\n---\n")
    
    if existentes and len(existentes) > 0:
        reporte.append("## ✅ ARCHIVOS MULTIMEDIA EXISTENTES\n")
        reporte.append(f"**Total:** {len(existentes)} referencias a archivos que existen\n\n")
        reporte.append("| Archivo MD | Tipo | Ruta Referenciada | Ruta Encontrada |\n")
        reporte.append("|------------|------|-------------------|-----------------|\n")
        
        for ref in existentes[:30]:
            reporte.append(f"| `{ref['Archivo MD']}` | {ref['Tipo']} | `{ref['Ruta Referenciada']}` | `{ref['Ruta Encontrada']}` |\n")
        
        if len(existentes) > 30:
            reporte.append(f"\n*... y {len(existentes) - 30} referencias más (ver CSV completo)*\n")
    
    reporte.append("\n---\n")
    
    if resultados:
        reporte.append("## 📋 ESTADÍSTICAS POR TIPO\n")
        por_tipo = {}
        por_tipo_faltantes = {}
        
        for ref in resultados:
            tipo = ref['Tipo']
            por_tipo[tipo] = por_tipo.get(tipo, 0) + 1
            if ref['Existe'] == 'No':
                por_tipo_faltantes[tipo] = por_tipo_faltantes.get(tipo, 0) + 1
        
        reporte.append("| Tipo | Total | Faltantes | Existentes |\n")
        reporte.append("|------|-------|-----------|------------|\n")
        
        for tipo in sorted(por_tipo.keys()):
            total = por_tipo[tipo]
            faltantes_tipo = por_tipo_faltantes.get(tipo, 0)
            existentes_tipo = total - faltantes_tipo
            reporte.append(f"| {tipo} | {total} | {faltantes_tipo} | {existentes_tipo} |\n")
    
    reporte.append("\n---\n")
    reporte.append("## 📄 ARCHIVOS GENERADOS\n")
    reporte.append(f"- **CSV completo:** `REFERENCIAS_MULTIMEDIA_COMPLETO.csv`\n")
    reporte.append(f"- **Reporte Markdown:** Este archivo\n")
    reporte.append("\nEl archivo CSV contiene todas las referencias encontradas con detalles completos.\n")
    
    # Guardar reporte
    reporte_path = BASE_DIR / "REPORTE_MULTIMEDIA_COMPLETO.md"
    with open(reporte_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(reporte))
    
    print(f"\n✅ Reporte generado: {reporte_path}")
    print(f"✅ CSV generado: {csv_path}")
    print(f"\n📊 Resumen final:")
    print(f"   - Archivos analizados: {len(archivos_md)}")
    print(f"   - Referencias encontradas: {len(resultados)}")
    print(f"   - Archivos faltantes: {len(faltantes)}")
    print(f"   - Archivos existentes: {len(existentes)}")

if __name__ == "__main__":
    main()
