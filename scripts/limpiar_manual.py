#!/usr/bin/env python3
"""
Script de Limpieza e Integración del Manual TES Digital

OBJETIVO:
1. Identificar los 93 archivos .md válidos según manual-index.ts
2. Crear backup completo
3. Eliminar archivos obsoletos/duplicados
4. Asegurar que los 93 archivos estén en public/manual/ con estructura correcta
"""

import os
import re
import shutil
import json
from pathlib import Path
from typing import Set, List, Dict
from datetime import datetime

# Configuración
PROJECT_ROOT = Path(__file__).parent.parent
MANUAL_INDEX_PATH = PROJECT_ROOT / "src/data/manual-index.ts"
BACKUP_DIR = PROJECT_ROOT / "backup_manual_pre_limpieza"
MANUAL_SOURCE_DIR = PROJECT_ROOT / "manual-tes/TES_Manual_Digital"
MANUAL_PUBLIC_DIR = PROJECT_ROOT / "public/manual"

# Patrones para archivos obsoletos
PATRONES_OBSOLETOS = [
    r".*\.(tmp|backup|old|bak)\.md$",
    r".*prueba.*\.md$",
    r".*test.*\.md$",
    r".*ejemplo.*\.md$",
    r".*temp.*\.md$",
]

def extraer_rutas_validas_del_indice() -> Set[str]:
    """Extrae las rutas de archivos válidos del manual-index.ts"""
    rutas_validas = set()
    
    if not MANUAL_INDEX_PATH.exists():
        print(f"❌ ERROR: No se encuentra {MANUAL_INDEX_PATH}")
        return rutas_validas
    
    contenido = MANUAL_INDEX_PATH.read_text(encoding='utf-8')
    
    # Buscar todas las rutas en el formato: rutaArchivo: "ruta/a/archivo.md"
    patron = r'rutaArchivo:\s*"([^"]+)"'
    matches = re.findall(patron, contenido)
    
    for match in matches:
        # Normalizar ruta relativa al proyecto
        ruta_completa = PROJECT_ROOT / match
        if ruta_completa.exists():
            rutas_validas.add(str(ruta_completa))
        else:
            print(f"⚠️  ADVERTENCIA: Archivo del índice no encontrado: {match}")
    
    print(f"✅ Encontradas {len(rutas_validas)} rutas válidas en el índice")
    return rutas_validas

def encontrar_todos_los_md(excluir_node_modules: bool = True) -> List[Path]:
    """Encuentra todos los archivos .md en el proyecto"""
    archivos_md = []
    
    for root, dirs, files in os.walk(PROJECT_ROOT):
        # Excluir node_modules y otros directorios
        if excluir_node_modules and 'node_modules' in root:
            continue
        if '.git' in root:
            continue
        if 'backup' in root.lower():
            continue
        
        for file in files:
            if file.endswith('.md'):
                archivo_path = Path(root) / file
                archivos_md.append(archivo_path)
    
    return archivos_md

def es_archivo_obsoleto(archivo: Path, rutas_validas: Set[str]) -> bool:
    """Determina si un archivo es obsoleto"""
    ruta_str = str(archivo)
    
    # Si está en las rutas válidas, NO es obsoleto
    if ruta_str in rutas_validas:
        return False
    
    # Verificar patrones obsoletos
    nombre_archivo = archivo.name.lower()
    for patron in PATRONES_OBSOLETOS:
        if re.match(patron, nombre_archivo):
            return True
    
    # Archivos fuera de la estructura principal del manual
    if 'manual-tes' not in ruta_str and 'public/manual' not in ruta_str:
        # Pero mantener documentación del proyecto (README, etc.)
        if archivo.name.upper() in ['README.MD', 'CHANGELOG.MD', 'LICENSE.MD', 'SECURITY.MD']:
            return False
        # Mantener archivos de documentación en la raíz o docs/
        if archivo.parent.name in ['docs', ''] or archivo.parent == PROJECT_ROOT:
            # Solo si son archivos de documentación del proyecto
            if any(keyword in archivo.name.upper() for keyword in ['PLAN', 'GUIA', 'INSTRUCCION', 'PROBLEMA', 'CORRECCION']):
                return False
    
    # Archivos duplicados en diferentes ubicaciones (mantener solo los de TES_Manual_Digital)
    if 'manual-tes' in ruta_str:
        if 'TES_Manual_Digital' not in ruta_str:
            # Archivos fuera de TES_Manual_Digital pero dentro de manual-tes
            return True
    
    return False

def crear_backup(archivos_a_backup: List[Path]) -> bool:
    """Crea un backup de todos los archivos .md antes de limpiar"""
    print(f"\n📦 Creando backup en {BACKUP_DIR}...")
    
    try:
        BACKUP_DIR.mkdir(parents=True, exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_log = BACKUP_DIR / f"backup_log_{timestamp}.txt"
        
        with open(backup_log, 'w', encoding='utf-8') as log:
            log.write(f"Backup creado: {timestamp}\n")
            log.write(f"Total archivos: {len(archivos_a_backup)}\n\n")
            
            for archivo in archivos_a_backup:
                try:
                    # Mantener estructura relativa
                    ruta_relativa = archivo.relative_to(PROJECT_ROOT)
                    destino = BACKUP_DIR / ruta_relativa
                    destino.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(archivo, destino)
                    log.write(f"✅ {ruta_relativa}\n")
                except Exception as e:
                    log.write(f"❌ ERROR copiando {archivo}: {e}\n")
        
        print(f"✅ Backup completado: {len(archivos_a_backup)} archivos")
        print(f"📄 Log guardado en: {backup_log}")
        return True
        
    except Exception as e:
        print(f"❌ ERROR creando backup: {e}")
        return False

def copiar_archivos_validos_a_public(rutas_validas: Set[str]) -> Dict[str, bool]:
    """Copia los archivos válidos a public/manual/ con estructura correcta"""
    resultados = {}
    
    print(f"\n📋 Copiando archivos válidos a {MANUAL_PUBLIC_DIR}...")
    
    MANUAL_PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    
    for ruta_str in rutas_validas:
        archivo_origen = Path(ruta_str)
        
        if not archivo_origen.exists():
            resultados[ruta_str] = False
            print(f"⚠️  No encontrado: {archivo_origen}")
            continue
        
        # Extraer estructura de carpetas desde la ruta
        # Ejemplo: manual-tes/TES_Manual_Digital/BLOQUE_0_FUNDAMENTOS/archivo.md
        partes = archivo_origen.parts
        
        # Buscar BLOQUE_X en la ruta
        bloque_dir = None
        for parte in partes:
            if parte.startswith('BLOQUE_'):
                bloque_dir = parte
                break
        
        if not bloque_dir:
            print(f"⚠️  No se pudo determinar bloque para: {archivo_origen}")
            resultados[ruta_str] = False
            continue
        
        # Crear estructura en public/manual/
        destino_dir = MANUAL_PUBLIC_DIR / bloque_dir
        destino_dir.mkdir(parents=True, exist_ok=True)
        
        destino_archivo = destino_dir / archivo_origen.name
        
        try:
            shutil.copy2(archivo_origen, destino_archivo)
            resultados[ruta_str] = True
            print(f"✅ Copiado: {archivo_origen.name} → {destino_dir.name}/")
        except Exception as e:
            resultados[ruta_str] = False
            print(f"❌ ERROR copiando {archivo_origen.name}: {e}")
    
    exitosos = sum(1 for v in resultados.values() if v)
    print(f"\n✅ Copiados {exitosos}/{len(rutas_validas)} archivos a public/manual/")
    
    return resultados

def generar_reporte_limpieza(archivos_obsoletos: List[Path], archivos_validos: List[Path]) -> Path:
    """Genera un reporte detallado de la limpieza"""
    reporte_path = PROJECT_ROOT / "REPORTE_LIMPIEZA_MANUAL.md"
    
    with open(reporte_path, 'w', encoding='utf-8') as f:
        f.write("# 📋 Reporte de Limpieza del Manual TES Digital\n\n")
        f.write(f"**Fecha:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        f.write("## 📊 Resumen\n\n")
        f.write(f"- **Archivos válidos encontrados:** {len(archivos_validos)}\n")
        f.write(f"- **Archivos obsoletos identificados:** {len(archivos_obsoletos)}\n")
        f.write(f"- **Total archivos .md en proyecto:** {len(archivos_validos) + len(archivos_obsoletos)}\n\n")
        
        f.write("## ✅ Archivos Válidos (93 esperados)\n\n")
        for archivo in sorted(archivos_validos):
            f.write(f"- `{archivo.relative_to(PROJECT_ROOT)}`\n")
        
        f.write("\n## 🗑️ Archivos Obsoletos Identificados\n\n")
        f.write("**NOTA:** Estos archivos pueden ser eliminados de forma segura.\n\n")
        for archivo in sorted(archivos_obsoletos):
            f.write(f"- `{archivo.relative_to(PROJECT_ROOT)}`\n")
    
    print(f"\n📄 Reporte generado: {reporte_path}")
    return reporte_path

def main():
    """Función principal"""
    print("=" * 70)
    print("🧹 LIMPIEZA E INTEGRACIÓN DEL MANUAL TES DIGITAL")
    print("=" * 70)
    
    # Paso 1: Extraer rutas válidas del índice
    print("\n[1/6] Extrayendo rutas válidas del índice...")
    rutas_validas = extraer_rutas_validas_del_indice()
    
    if len(rutas_validas) != 93:
        print(f"⚠️  ADVERTENCIA: Se esperaban 93 archivos, se encontraron {len(rutas_validas)}")
    
    # Paso 2: Encontrar todos los archivos .md
    print("\n[2/6] Buscando todos los archivos .md...")
    todos_los_md = encontrar_todos_los_md()
    print(f"✅ Encontrados {len(todos_los_md)} archivos .md en total")
    
    # Paso 3: Clasificar archivos
    print("\n[3/6] Clasificando archivos (válidos vs obsoletos)...")
    archivos_validos = []
    archivos_obsoletos = []
    
    for archivo in todos_los_md:
        if str(archivo) in rutas_validas:
            archivos_validos.append(archivo)
        elif es_archivo_obsoleto(archivo, rutas_validas):
            archivos_obsoletos.append(archivo)
        # Los demás se mantienen (documentación del proyecto, etc.)
    
    print(f"✅ Archivos válidos: {len(archivos_validos)}")
    print(f"🗑️  Archivos obsoletos identificados: {len(archivos_obsoletos)}")
    
    # Paso 4: Crear backup
    print("\n[4/6] Creando backup...")
    if not crear_backup(todos_los_md):
        print("❌ ERROR: No se pudo crear el backup. Abortando.")
        return
    
    # Paso 5: Copiar archivos válidos a public/manual/
    print("\n[5/6] Copiando archivos válidos a public/manual/...")
    resultados_copia = copiar_archivos_validos_a_public(rutas_validas)
    
    # Paso 6: Generar reporte
    print("\n[6/6] Generando reporte...")
    reporte = generar_reporte_limpieza(archivos_obsoletos, archivos_validos)
    
    # Resumen final
    print("\n" + "=" * 70)
    print("✅ LIMPIEZA COMPLETADA")
    print("=" * 70)
    print(f"\n📊 Resumen:")
    print(f"   - Archivos válidos: {len(archivos_validos)}")
    print(f"   - Archivos obsoletos identificados: {len(archivos_obsoletos)}")
    print(f"   - Archivos copiados a public/manual/: {sum(1 for v in resultados_copia.values() if v)}")
    print(f"\n📦 Backup guardado en: {BACKUP_DIR}")
    print(f"📄 Reporte guardado en: {reporte}")
    print(f"\n⚠️  PRÓXIMOS PASOS:")
    print(f"   1. Revisar el reporte: {reporte}")
    print(f"   2. Verificar que public/manual/ tenga los 93 archivos")
    print(f"   3. Si todo está bien, ejecutar eliminación de obsoletos")
    print(f"   4. Probar la aplicación")

if __name__ == "__main__":
    main()
