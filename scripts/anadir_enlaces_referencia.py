#!/usr/bin/env python3
"""
Script para añadir enlaces de referencia entre capítulos del manual
Basado en manual-index.ts y relaciones lógicas entre capítulos
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional

BASE_DIR = Path(__file__).parent.parent
MANUAL_DIR = BASE_DIR / "MANUAL_TES_DIGITAL"

# Mapeo de relaciones entre capítulos
RELACIONES: Dict[str, Dict[str, List[str]]] = {
    # Bloque 2 - Inmovilización
    "BLOQUE_02_3_COLLARIN_CERVICAL.md": {
        "prerrequisitos": [
            "BLOQUE_02_0_ANATOMIA_OPERATIVA.md",
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
        ],
        "relacionados": [
            "BLOQUE_02_5_TABLERO_ESPINAL.md",
            "BLOQUE_02_6_COLCHON_VACIO.md",
            "BLOQUE_02_4_CAMILLA_CUCHARA.md",
            "BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md",
        ],
        "aplicacion": [
            "../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md",
        ],
        "continuacion": [
            "BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md",
        ],
    },
    
    # Bloque 4 - RCP
    "BLOQUE_04_1_RCP_ADULTOS.md": {
        "prerrequisitos": [
            "BLOQUE_04_0_RECONOCIMIENTO_PCR.md",
            "../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md",
        ],
        "relacionados": [
            "BLOQUE_04_2_RCP_PEDIATRIA.md",
            "BLOQUE_04_3_RCP_LACTANTES.md",
            "BLOQUE_04_4_USO_DESA.md",
            "BLOQUE_04_5_VENTILACION_BVM.md",
        ],
        "transtelefonico": [
            "../06_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md",
        ],
    },
    
    # Bloque 3 - Oxigenoterapia
    "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md": {
        "prerrequisitos": [
            "../02_PROCEDIMIENTOS_BASICOS/1.1_constantes_vitales.md",
            "../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md",
        ],
        "relacionados": [
            "BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md",
            "BLOQUE_03_3_BVM.md",
            "BLOQUE_03_10_MONITORIZACION_BASICA.md",
        ],
        "aplicacion": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_5_VENTILACION_BVM.md",
        ],
    },
    
    # Bloque 6 - Farmacología
    "BLOQUE_06_1_DEL_VIAL_A_LA_VENA.md": {
        "prerrequisitos": [
            "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION.md",
        ],
        "relacionados": [
            "BLOQUE_06_2_ANALGESICOS_SEDANTES.md",
            "BLOQUE_06_3_VASOACTIVOS_AMINAS.md",
            "BLOQUE_06_5_FARMACOS_CARDIOLOGICOS.md",
        ],
        "aplicacion": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md",
        ],
    },
}

# Mapeo de nombres de archivo a rutas completas
def encontrar_archivo(nombre: str, directorio_actual: Path) -> Optional[str]:
    """Encuentra la ruta relativa de un archivo desde el directorio actual"""
    # Buscar en el mismo directorio
    archivo_local = directorio_actual / nombre
    if archivo_local.exists():
        return f"./{nombre}"
    
    # Buscar en subdirectorios del manual
    for subdir in MANUAL_DIR.rglob("*"):
        if subdir.is_dir():
            archivo = subdir / nombre
            if archivo.exists():
                # Calcular ruta relativa
                rel_path = os.path.relpath(archivo, directorio_actual)
                return rel_path.replace("\\", "/")
    
    return None


def generar_seccion_enlaces(archivo: Path, relaciones: Dict[str, List[str]]) -> str:
    """Genera la sección de enlaces en formato Markdown"""
    directorio_actual = archivo.parent
    
    seccion = "\n---\n\n## 🔗 Enlaces recomendados / Guía de referencia\n\n"
    
    # Prerrequisitos
    if relaciones.get("prerrequisitos"):
        seccion += "### Prerrequisitos\n\n"
        for rel in relaciones["prerrequisitos"]:
            ruta = encontrar_archivo(rel, directorio_actual) or rel
            nombre = rel.replace(".md", "").replace("BLOQUE_", "").replace("_", " ")
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Relacionados
    if relaciones.get("relacionados"):
        seccion += "### Capítulos relacionados\n\n"
        for rel in relaciones["relacionados"]:
            ruta = encontrar_archivo(rel, directorio_actual) or rel
            nombre = rel.replace(".md", "").replace("BLOQUE_", "").replace("_", " ")
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Aplicación práctica
    if relaciones.get("aplicacion"):
        seccion += "### Aplicación práctica\n\n"
        for rel in relaciones["aplicacion"]:
            ruta = rel  # Ya es ruta relativa
            nombre = Path(rel).stem.replace("BLOQUE_", "").replace("_", " ")
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Continuación
    if relaciones.get("continuacion"):
        seccion += "### Continuación\n\n"
        for rel in relaciones["continuacion"]:
            ruta = encontrar_archivo(rel, directorio_actual) or rel
            nombre = rel.replace(".md", "").replace("BLOQUE_", "").replace("_", " ")
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Protocolos transtelefónicos
    if relaciones.get("transtelefonico"):
        seccion += "### Protocolos transtelefónicos\n\n"
        for rel in relaciones["transtelefonico"]:
            ruta = rel
            nombre = Path(rel).stem.replace("BLOQUE_", "").replace("_", " ")
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    return seccion.rstrip() + "\n"


def añadir_enlaces_a_archivo(archivo: Path, relaciones: Dict[str, List[str]]) -> bool:
    """Añade enlaces de referencia a un archivo Markdown"""
    if not archivo.exists():
        print(f"❌ Archivo no encontrado: {archivo}")
        return False
    
    contenido = archivo.read_text(encoding='utf-8')
    
    # Verificar si ya tiene sección de enlaces
    if "## 🔗 Enlaces recomendados" in contenido:
        print(f"⏭️  Ya tiene enlaces: {archivo.name}")
        return False
    
    # Buscar el final del archivo (última línea con contenido)
    lineas = contenido.rstrip().split('\n')
    
    # Buscar última línea con contenido antes de líneas vacías finales
    ultima_linea_contenido = len(lineas) - 1
    while ultima_linea_contenido >= 0 and not lineas[ultima_linea_contenido].strip():
        ultima_linea_contenido -= 1
    
    # Generar sección de enlaces
    seccion_enlaces = generar_seccion_enlaces(archivo, relaciones)
    
    # Insertar antes de la última línea (o al final si no hay separador)
    if ultima_linea_contenido >= 0:
        # Insertar después de la última línea con contenido
        lineas.insert(ultima_linea_contenido + 1, seccion_enlaces)
    else:
        lineas.append(seccion_enlaces)
    
    nuevo_contenido = '\n'.join(lineas)
    
    # Guardar
    archivo.write_text(nuevo_contenido, encoding='utf-8')
    print(f"✅ Enlaces añadidos: {archivo.name}")
    return True


def main():
    """Función principal"""
    print("=" * 70)
    print("🔗 AÑADIR ENLACES DE REFERENCIA ENTRE CAPÍTULOS")
    print("=" * 70)
    print()
    
    añadidos = 0
    omitidos = 0
    
    # Procesar cada archivo con relaciones definidas
    for nombre_archivo, relaciones in RELACIONES.items():
        # Buscar archivo en el manual
        archivo = None
        for subdir in MANUAL_DIR.rglob(nombre_archivo):
            if subdir.is_file():
                archivo = subdir
                break
        
        if not archivo:
            print(f"⚠️  Archivo no encontrado: {nombre_archivo}")
            omitidos += 1
            continue
        
        if añadir_enlaces_a_archivo(archivo, relaciones):
            añadidos += 1
        else:
            omitidos += 1
    
    print()
    print("=" * 70)
    print(f"📊 RESUMEN: {añadidos} añadidos, {omitidos} omitidos")
    print("=" * 70)


if __name__ == "__main__":
    main()
