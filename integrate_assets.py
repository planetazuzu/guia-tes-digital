#!/usr/bin/env python3
"""
Script para integrar recursos multimedia desde Excel al Manual TES Digital
"""

import pandas as pd
import os
import shutil
from pathlib import Path
from datetime import datetime
import json

# Configuración
EXCEL_PATH = "/home/planetazuzu/Imágenes/medios de app/Manual_TES_Assets_Tracker.xlsx"
REPO_ROOT = Path("/home/planetazuzu/protocolo-r-pido")
EXCEL_DEST = REPO_ROOT / "Manual_TES_Assets_Tracker.xlsx"
ASSETS_PLAN = REPO_ROOT / "ASSETS_PLAN.md"
MANIFEST_PATH = REPO_ROOT / "manifest.json"

# Columnas requeridas
REQUIRED_COLS = [
    'Estado', 'Prioridad', 'Bloque', 'Capitulo', 'Titulo_capitulo',
    'Tipo_recurso', 'Nombre_recurso', 'Descripcion', 'Archivo_sugerido',
    'Ruta_sugerida', 'Capitulo_md', 'Prompt_para_generar', 'MVP'
]

# Estructura de carpetas a crear
FOLDERS_TO_CREATE = [
    *[f"assets/images/bloque_{i:02d}" for i in range(9)],
    *[f"assets/videos/bloque_{i:02d}" for i in range(9)],
    *[f"assets/slides/bloque_{i:02d}" for i in range(9)],
    "assets/templates/",
    "assets/checklists_app/",
    "assets/consent_privacy/",
    "_archive/"
]

# Reporte
report = {
    "excel_leido": False,
    "excel_copiado": False,
    "excel_destino": None,
    "carpetas_creadas": 0,
    "filas_procesadas": 0,
    "capitulos_actualizados": 0,
    "capitulos_faltantes": [],
    "recursos_por_tipo": {},
    "manifest_actualizado": False,
    "capitulos_con_assets": 0
}

def validar_excel():
    """Tarea 1: Validación inicial"""
    print("=== TAREA 1: Validación inicial ===")
    
    if not os.path.exists(EXCEL_PATH):
        print(f"ERROR: Excel no existe en {EXCEL_PATH}")
        return None
    
    try:
        df = pd.read_excel(EXCEL_PATH, sheet_name='Assets')
        report["excel_leido"] = True
        
        # Verificar columnas
        missing = [c for c in REQUIRED_COLS if c not in df.columns]
        if missing:
            print(f"ERROR: Faltan columnas: {missing}")
            return None
        
        print(f"✓ Excel validado: {len(df)} filas, todas las columnas presentes")
        return df
    except Exception as e:
        print(f"ERROR al leer Excel: {e}")
        return None

def copiar_excel(df):
    """Tarea 2: Copiar Excel al repo"""
    print("\n=== TAREA 2: Copiar Excel al repo ===")
    
    if not EXCEL_DEST.exists():
        shutil.copy2(EXCEL_PATH, EXCEL_DEST)
        report["excel_copiado"] = True
        report["excel_destino"] = str(EXCEL_DEST)
        print(f"✓ Excel copiado a {EXCEL_DEST}")
    else:
        # Comparar fechas
        src_time = os.path.getmtime(EXCEL_PATH)
        dst_time = os.path.getmtime(EXCEL_DEST)
        
        if src_time > dst_time:
            shutil.copy2(EXCEL_PATH, EXCEL_DEST)
            report["excel_copiado"] = True
            print(f"✓ Excel actualizado (externo más nuevo)")
        else:
            print(f"✓ Excel ya existe y está actualizado")
        
        report["excel_destino"] = str(EXCEL_DEST)

def crear_estructura_carpetas():
    """Tarea 3: Crear estructura de carpetas"""
    print("\n=== TAREA 3: Crear estructura de carpetas ===")
    
    created = 0
    for folder in FOLDERS_TO_CREATE:
        folder_path = REPO_ROOT / folder
        if not folder_path.exists():
            folder_path.mkdir(parents=True, exist_ok=True)
            created += 1
            print(f"✓ Creada: {folder}")
    
    report["carpetas_creadas"] = created
    print(f"✓ Total carpetas creadas: {created}")

def generar_assets_plan(df):
    """Tarea 4: Generar ASSETS_PLAN.md"""
    print("\n=== TAREA 4: Generar ASSETS_PLAN.md ===")
    
    content = ["# PLAN DE RECURSOS MULTIMEDIA - Manual TES Digital\n"]
    content.append(f"**Generado:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    content.append("---\n")
    
    # Sección 1: MVP
    content.append("## 1. RECURSOS MVP (Prioridad: Sí)\n")
    mvp_df = df[df['MVP'].str.strip().str.upper() == 'SÍ'].copy()
    
    if len(mvp_df) > 0:
        content.append("| Capítulo | Tipo Recurso | Nombre Recurso | Ruta Sugerida | Prioridad | Estado | Prompt |\n")
        content.append("|----------|--------------|----------------|---------------|-----------|--------|--------|\n")
        
        for _, row in mvp_df.iterrows():
            prompt = str(row['Prompt_para_generar']) if pd.notna(row['Prompt_para_generar']) else ""
            if len(prompt) > 100:
                prompt = prompt[:97] + "... (ver Excel)"
            
            content.append(f"| {row['Capitulo']} | {row['Tipo_recurso']} | {row['Nombre_recurso']} | "
                          f"`{row['Ruta_sugerida']}` | {row['Prioridad']} | {row['Estado']} | {prompt} |\n")
    else:
        content.append("*No hay recursos marcados como MVP.*\n")
    
    content.append("\n---\n")
    
    # Sección 2: Por bloque
    for bloque_num in range(9):
        bloque_str = f"{bloque_num:02d}"
        bloque_df = df[df['Bloque'].astype(str).str.strip() == bloque_str].copy()
        
        if len(bloque_df) > 0:
            content.append(f"## 2.{bloque_num} BLOQUE {bloque_num:02d}\n")
            content.append("| Capítulo | Tipo Recurso | Nombre Recurso | Ruta Sugerida | Prioridad | Estado | Prompt |\n")
            content.append("|----------|--------------|----------------|---------------|-----------|--------|--------|\n")
            
            for _, row in bloque_df.iterrows():
                prompt = str(row['Prompt_para_generar']) if pd.notna(row['Prompt_para_generar']) else ""
                if len(prompt) > 100:
                    prompt = prompt[:97] + "... (ver Excel)"
                
                content.append(f"| {row['Capitulo']} | {row['Tipo_recurso']} | {row['Nombre_recurso']} | "
                              f"`{row['Ruta_sugerida']}` | {row['Prioridad']} | {row['Estado']} | {prompt} |\n")
            
            content.append("\n")
    
    ASSETS_PLAN.write_text("".join(content), encoding='utf-8')
    print(f"✓ ASSETS_PLAN.md generado: {len(df)} recursos")

def buscar_archivo_por_nombre(nombre_archivo):
    """Busca un archivo .md por nombre en todo el repo"""
    nombre_archivo = nombre_archivo.strip()
    if not nombre_archivo:
        return None
    
    # Si ya es una ruta completa y existe, usarla
    if os.path.isabs(nombre_archivo) and os.path.exists(nombre_archivo):
        return Path(nombre_archivo)
    
    # Intentar como ruta relativa primero
    ruta_relativa = REPO_ROOT / nombre_archivo
    if ruta_relativa.exists():
        return ruta_relativa
    
    # Buscar por nombre de archivo en todo el repo (solo en manual-tes para optimizar)
    nombre_solo = os.path.basename(nombre_archivo)
    
    # Buscar primero en manual-tes (más probable)
    manual_tes_dir = REPO_ROOT / "manual-tes"
    if manual_tes_dir.exists():
        for root, dirs, files in os.walk(manual_tes_dir):
            # Ignorar directorios grandes
            dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '__pycache__', 'dist', 'build']]
            if nombre_solo in files:
                return Path(root) / nombre_solo
    
    # Si no se encuentra en manual-tes, buscar en todo el repo
    for root, dirs, files in os.walk(REPO_ROOT):
        # Ignorar directorios grandes
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '__pycache__', 'dist', 'build', '.next']]
        if nombre_solo in files:
            return Path(root) / nombre_solo
    
    return None

def insertar_placeholders(df):
    """Tarea 5: Insertar placeholders en capítulos .md"""
    print("\n=== TAREA 5: Insertar placeholders en capítulos .md ===")
    
    # Agrupar por nombre de archivo (última parte de la ruta)
    capitulos_dict = {}
    for _, row in df.iterrows():
        capitulo_md = str(row['Capitulo_md']).strip() if pd.notna(row['Capitulo_md']) else ""
        if not capitulo_md:
            continue
        
        # Usar el nombre del archivo como clave
        nombre_archivo = os.path.basename(capitulo_md)
        if nombre_archivo not in capitulos_dict:
            capitulos_dict[nombre_archivo] = []
        
        capitulos_dict[nombre_archivo].append(row)
    
    updated = 0
    missing = []
    
    for nombre_archivo, recursos in capitulos_dict.items():
        # Buscar el archivo real en el repo
        capitulo_path = buscar_archivo_por_nombre(nombre_archivo)
        
        if capitulo_path is None or not capitulo_path.exists():
            # Intentar con la ruta original del Excel
            ruta_original = str(recursos[0]['Capitulo_md']).strip()
            missing.append(ruta_original)
            continue
        
        # Leer archivo
        try:
            content = capitulo_path.read_text(encoding='utf-8')
        except Exception as e:
            print(f"⚠ Error leyendo {capitulo_path}: {e}")
            continue
        
        # Verificar si ya tiene sección "Recursos asociados"
        if "## Recursos asociados" in content or "## RECURSOS ASOCIADOS" in content:
            # Ya existe, verificar si hay que añadir recursos nuevos
            # Por simplicidad, solo añadimos si no existe la sección
            continue
        
        # Añadir sección al final
        recursos_list = []
        rutas_vistas = set()
        
        for row in recursos:
            ruta = str(row['Ruta_sugerida']).strip() if pd.notna(row['Ruta_sugerida']) else ""
            if not ruta or ruta in rutas_vistas:
                continue
            
            rutas_vistas.add(ruta)
            tipo = str(row['Tipo_recurso']).strip() if pd.notna(row['Tipo_recurso']) else "Recurso"
            desc = str(row['Descripcion']).strip() if pd.notna(row['Descripcion']) else ""
            
            # Limitar descripción a una línea
            if '\n' in desc:
                desc = desc.split('\n')[0]
            if len(desc) > 150:
                desc = desc[:147] + "..."
            
            item = f"- **{tipo}**: `{ruta}`"
            if desc:
                item += f"\n  - {desc}"
            recursos_list.append(item)
        
        if recursos_list:
            # Añadir sección al final
            new_section = "\n\n## Recursos asociados\n\n" + "\n".join(recursos_list) + "\n"
            content += new_section
            
            # Guardar
            capitulo_path.write_text(content, encoding='utf-8')
            updated += 1
            print(f"✓ Actualizado: {capitulo_path.name}")
    
    report["capitulos_actualizados"] = updated
    report["capitulos_faltantes"] = missing
    print(f"✓ Capítulos actualizados: {updated}")
    if missing:
        print(f"⚠ Capítulos faltantes: {len(missing)}")

def actualizar_manifest(df):
    """Tarea 6: Actualizar manifest.json"""
    print("\n=== TAREA 6: Actualizar manifest.json ===")
    
    # Agrupar por capítulo
    capitulos_dict = {}
    for _, row in df.iterrows():
        capitulo_id = str(row['Capitulo']).strip() if pd.notna(row['Capitulo']) else ""
        if not capitulo_id:
            continue
        
        if capitulo_id not in capitulos_dict:
            capitulos_dict[capitulo_id] = {
                'id': capitulo_id,
                'title': str(row['Titulo_capitulo']).strip() if pd.notna(row['Titulo_capitulo']) else "",
                'file': str(row['Capitulo_md']).strip() if pd.notna(row['Capitulo_md']) else "",
                'assets': []
            }
        
        ruta = str(row['Ruta_sugerida']).strip() if pd.notna(row['Ruta_sugerida']) else ""
        if ruta and ruta not in capitulos_dict[capitulo_id]['assets']:
            capitulos_dict[capitulo_id]['assets'].append(ruta)
    
    if MANIFEST_PATH.exists():
        try:
            with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
        except:
            manifest = {"chapters": []}
    else:
        manifest = {"chapters": []}
    
    # Actualizar o crear capítulos
    if "chapters" not in manifest:
        manifest["chapters"] = []
    
    # Crear diccionario de capítulos existentes
    chapters_dict = {ch.get('id'): ch for ch in manifest["chapters"]}
    
    # Actualizar o añadir
    for cap_id, cap_data in capitulos_dict.items():
        if cap_id in chapters_dict:
            # Actualizar assets sin cambiar otros campos
            chapters_dict[cap_id]['assets'] = cap_data['assets']
        else:
            # Añadir nuevo capítulo
            manifest["chapters"].append(cap_data)
    
    # Guardar
    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    report["manifest_actualizado"] = True
    report["capitulos_con_assets"] = sum(1 for ch in manifest.get("chapters", []) if ch.get('assets'))
    print(f"✓ manifest.json actualizado: {len(manifest.get('chapters', []))} capítulos")

def generar_reporte_final(df):
    """Tarea 7: Generar reporte final"""
    print("\n=== TAREA 7: Reporte Final ===")
    
    # Contar recursos por tipo
    tipos = df['Tipo_recurso'].value_counts().to_dict()
    report["recursos_por_tipo"] = tipos
    report["filas_procesadas"] = len(df)
    
    print("\n" + "="*60)
    print("REPORTE FINAL")
    print("="*60)
    print(f"Excel leído: {'Sí' if report['excel_leido'] else 'No'}")
    print(f"Excel copiado al repo: {'Sí' if report['excel_copiado'] else 'No'}")
    if report['excel_destino']:
        print(f"  → Ruta destino: {report['excel_destino']}")
    print(f"Nº carpetas creadas: {report['carpetas_creadas']}")
    print(f"Nº filas procesadas: {report['filas_procesadas']}")
    print(f"Nº capítulos .md actualizados: {report['capitulos_actualizados']}")
    print(f"Nº capítulos .md faltantes: {len(report['capitulos_faltantes'])}")
    if report['capitulos_faltantes']:
        print("  → Capítulos faltantes:")
        for cap in report['capitulos_faltantes'][:10]:  # Mostrar primeros 10
            print(f"    - {cap}")
        if len(report['capitulos_faltantes']) > 10:
            print(f"    ... y {len(report['capitulos_faltantes']) - 10} más")
    
    print("\nRecursos por tipo:")
    for tipo, count in sorted(report['recursos_por_tipo'].items()):
        print(f"  - {tipo}: {count}")
    
    print(f"\nmanifest.json: {'Actualizado' if report['manifest_actualizado'] else 'No actualizado'}")
    print(f"  → Capítulos con assets: {report['capitulos_con_assets']}")
    print("="*60)

def main():
    """Función principal"""
    print("Iniciando integración de recursos multimedia...\n")
    
    # Tarea 1: Validar
    df = validar_excel()
    if df is None:
        print("\n❌ Validación fallida. Deteniendo.")
        return
    
    # Tarea 2: Copiar Excel
    copiar_excel(df)
    
    # Tarea 3: Crear carpetas
    crear_estructura_carpetas()
    
    # Tarea 4: Generar ASSETS_PLAN.md
    generar_assets_plan(df)
    
    # Tarea 5: Insertar placeholders
    insertar_placeholders(df)
    
    # Tarea 6: Actualizar manifest
    actualizar_manifest(df)
    
    # Tarea 7: Reporte
    generar_reporte_final(df)
    
    print("\n✓ Proceso completado")

if __name__ == "__main__":
    main()
