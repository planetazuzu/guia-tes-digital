#!/usr/bin/env python3
"""
Herramienta para organizar infografías y medios según la estructura definida.

Uso:
    python scripts/organizar_infografias.py

Permite:
- Seleccionar archivos de imágenes
- Identificar a qué infografía corresponde cada una
- Mover y renombrar automáticamente según la estructura
"""

import os
import shutil
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional

# Mapeo de infografías según LISTADO_COMPLETO_MEDIOS_FALTANTES.md
INFORGRAFIAS = {
    # BLOQUE 0: FUNDAMENTOS
    "diagrama-seleccion-dispositivo-oxigeno": {
        "bloque": "bloque-0-fundamentos",
        "nombre_archivo": "diagrama-seleccion-dispositivo-oxigeno",
        "descripcion": "Diagrama de Selección de Dispositivo de Oxigenoterapia",
        "prioridad": "Alta"
    },
    "tabla-rangos-fio2": {
        "bloque": "bloque-0-fundamentos",
        "nombre_archivo": "tabla-rangos-fio2",
        "descripcion": "Tabla Visual de Rangos de FiO2",
        "prioridad": "Alta"
    },
    "guia-colocacion-dispositivos-oxigeno": {
        "bloque": "bloque-0-fundamentos",
        "nombre_archivo": "guia-colocacion-dispositivos-oxigeno",
        "descripcion": "Guía de Colocación de Dispositivos de Oxigenoterapia",
        "prioridad": "Media"
    },
    
    # BLOQUE 2: MATERIAL E INMOVILIZACIÓN
    "componentes-sistema-inmovilizacion": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "componentes-sistema-inmovilizacion",
        "descripcion": "Componentes del Sistema de Inmovilización",
        "prioridad": "Alta"
    },
    "seleccion-talla-collarín": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "seleccion-talla-collarín",
        "descripcion": "Selección de Talla de Collarín Cervical",
        "prioridad": "Alta"
    },
    "colocacion-collarín-paso": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "colocacion-collarín-paso",
        "descripcion": "Colocación de Collarín Paso a Paso",
        "prioridad": "Alta",
        "es_serie": True,
        "pasos": 6
    },
    "verificaciones-post-colocacion": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "verificaciones-post-colocacion",
        "descripcion": "Verificaciones Post-Colocación de Collarín",
        "prioridad": "Media"
    },
    "errores-frecuentes-collarín": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "errores-frecuentes-collarín",
        "descripcion": "Errores Frecuentes en Colocación de Collarín",
        "prioridad": "Media"
    },
    "posicion-tes-inmovilizacion-manual": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "posicion-tes-inmovilizacion-manual",
        "descripcion": "Posición del TES en Inmovilización Manual",
        "prioridad": "Alta"
    },
    "tecnica-sujecion-manual": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "tecnica-sujecion-manual",
        "descripcion": "Técnica de Sujeción Manual",
        "prioridad": "Alta"
    },
    "situaciones-requieren-inmovilizacion": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "situaciones-requieren-inmovilizacion",
        "descripcion": "Situaciones que Requieren Inmovilización",
        "prioridad": "Media"
    },
    "secuencia-transicion-inmovilizacion": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "secuencia-transicion-inmovilizacion",
        "descripcion": "Secuencia de Transición en Inmovilización",
        "prioridad": "Alta"
    },
    "coordinacion-equipo-inmovilizacion": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "coordinacion-equipo-inmovilizacion",
        "descripcion": "Coordinación del Equipo en Inmovilización",
        "prioridad": "Media"
    },
    "componentes-tablero-espinal": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "componentes-tablero-espinal",
        "descripcion": "Componentes del Tablero Espinal",
        "prioridad": "Alta"
    },
    "colocacion-tablero-espinal-paso": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "colocacion-tablero-espinal-paso",
        "descripcion": "Colocación de Tablero Espinal Paso a Paso",
        "prioridad": "Alta",
        "es_serie": True,
        "pasos": 5
    },
    "componentes-colchon-vacio": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "componentes-colchon-vacio",
        "descripcion": "Componentes del Colchón de Vacío",
        "prioridad": "Alta"
    },
    "colocacion-colchon-vacio-paso": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "colocacion-colchon-vacio-paso",
        "descripcion": "Colocación de Colchón de Vacío Paso a Paso",
        "prioridad": "Alta",
        "es_serie": True,
        "pasos": 10
    },
    "componentes-camilla-cuchara": {
        "bloque": "bloque-2-inmovilizacion",
        "nombre_archivo": "componentes-camilla-cuchara",
        "descripcion": "Componentes de la Camilla Cuchara",
        "prioridad": "Media"
    },
    
    # BLOQUE 3: MATERIAL SANITARIO
    "configuracion-maxima-fio2": {
        "bloque": "bloque-3-material-sanitario",
        "nombre_archivo": "configuracion-maxima-fio2",
        "descripcion": "Configuración para Máxima FiO2",
        "prioridad": "Media"
    },
    
    # BLOQUE 7: CONDUCCIÓN
    "configuracion-gps": {
        "bloque": "bloque-7-conduccion",
        "nombre_archivo": "configuracion-gps",
        "descripcion": "Configuración de GPS Antes de Salir",
        "prioridad": "Baja"
    },
    
    # BLOQUE 12: MARCO LEGAL
    "diagrama-decisiones-eticas": {
        "bloque": "bloque-12-marco-legal",
        "nombre_archivo": "diagrama-decisiones-eticas",
        "descripcion": "Toma de Decisiones Éticas en Urgencias",
        "prioridad": "Media"
    },
}

BASE_DIR = Path(__file__).parent.parent
ASSETS_DIR = BASE_DIR / "public" / "assets" / "infografias"


def normalizar_nombre(texto: str) -> str:
    """Normaliza un texto para usarlo como nombre de archivo."""
    # Convertir a minúsculas
    texto = texto.lower()
    # Reemplazar espacios y caracteres especiales por guiones
    texto = re.sub(r'[^\w\s-]', '', texto)
    texto = re.sub(r'[-\s]+', '-', texto)
    # Eliminar guiones al inicio y final
    return texto.strip('-')


def buscar_infografia_por_palabras_clave(nombre_archivo: str) -> List[Tuple[str, Dict]]:
    """Busca infografías que coincidan con palabras clave del nombre del archivo."""
    nombre_lower = nombre_lower = nombre_archivo.lower()
    coincidencias = []
    
    for key, info in INFORGRAFIAS.items():
        # Buscar coincidencias en el nombre del archivo
        palabras_clave = [
            "collarín", "collarin", "collar",
            "tablero", "colchon", "colchón",
            "camilla", "oxigeno", "oxígeno",
            "fio2", "gps", "eticas", "éticas",
            "inmovilizacion", "inmovilización",
            "componentes", "seleccion", "selección",
            "colocacion", "colocación", "configuracion", "configuración"
        ]
        
        score = 0
        for palabra in palabras_clave:
            if palabra in nombre_lower and palabra in key:
                score += 1
        
        if score > 0:
            coincidencias.append((key, info, score))
    
    # Ordenar por score descendente
    coincidencias.sort(key=lambda x: x[2], reverse=True)
    return [(key, info) for key, info, _ in coincidencias]


def mostrar_menu_infografias(coincidencias: List[Tuple[str, Dict]]) -> Optional[str]:
    """Muestra un menú de infografías y permite seleccionar una."""
    if not coincidencias:
        print("\n❌ No se encontraron coincidencias automáticas.")
        print("\nInfografías disponibles:")
        for i, (key, info) in enumerate(INFORGRAFIAS.items(), 1):
            print(f"  {i}. {info['descripcion']} ({info['bloque']})")
        
        try:
            seleccion = input("\nSelecciona el número de la infografía (o 'n' para cancelar): ").strip()
            if seleccion.lower() == 'n':
                return None
            
            idx = int(seleccion) - 1
            if 0 <= idx < len(INFORGRAFIAS):
                return list(INFORGRAFIAS.keys())[idx]
        except (ValueError, IndexError):
            return None
    else:
        print("\n✅ Coincidencias encontradas:")
        for i, (key, info) in enumerate(coincidencias[:5], 1):
            print(f"  {i}. {info['descripcion']} ({info['bloque']})")
        
        if len(coincidencias) > 5:
            print(f"  ... y {len(coincidencias) - 5} más")
        
        try:
            seleccion = input("\nSelecciona el número (o 'n' para ver todas): ").strip()
            if seleccion.lower() == 'n':
                return mostrar_menu_infografias([])
            
            idx = int(seleccion) - 1
            if 0 <= idx < len(coincidencias):
                return coincidencias[idx][0]
        except (ValueError, IndexError):
            return None
    
    return None


def obtener_numero_paso(nombre_archivo: str) -> Optional[int]:
    """Intenta extraer el número de paso del nombre del archivo."""
    # Buscar patrones como: paso1, paso-1, paso_1, 1, etc.
    patrones = [
        r'paso[_\s-]?(\d+)',
        r'step[_\s-]?(\d+)',
        r'(\d+)',
    ]
    
    for patron in patrones:
        match = re.search(patron, nombre_archivo.lower())
        if match:
            return int(match.group(1))
    
    return None


def organizar_archivo(archivo_origen: Path, infografia_key: str, numero_paso: Optional[int] = None) -> bool:
    """Organiza un archivo moviéndolo a la ubicación correcta."""
    if infografia_key not in INFORGRAFIAS:
        print(f"❌ Error: Infografía '{infografia_key}' no encontrada")
        return False
    
    info = INFORGRAFIAS[infografia_key]
    bloque_dir = ASSETS_DIR / info["bloque"]
    
    # Crear directorio si no existe
    bloque_dir.mkdir(parents=True, exist_ok=True)
    
    # Determinar nombre del archivo destino
    extension = archivo_origen.suffix.lower()
    
    if info.get("es_serie") and numero_paso:
        nombre_destino = f"{info['nombre_archivo']}-{numero_paso}{extension}"
    else:
        nombre_destino = f"{info['nombre_archivo']}{extension}"
    
    archivo_destino = bloque_dir / nombre_destino
    
    # Si el archivo ya existe, preguntar
    if archivo_destino.exists():
        respuesta = input(f"⚠️  El archivo {nombre_destino} ya existe. ¿Sobrescribir? (s/n): ").strip().lower()
        if respuesta != 's':
            print(f"⏭️  Saltando {archivo_origen.name}")
            return False
    
    try:
        # Copiar archivo (no mover, por seguridad)
        shutil.copy2(archivo_origen, archivo_destino)
        print(f"✅ Organizado: {archivo_origen.name} → {archivo_destino.relative_to(BASE_DIR)}")
        return True
    except Exception as e:
        print(f"❌ Error al organizar {archivo_origen.name}: {e}")
        return False


def main():
    """Función principal del script."""
    print("=" * 70)
    print("🖼️  ORGANIZADOR DE INFOGRAFÍAS Y MEDIOS")
    print("=" * 70)
    print("\nEsta herramienta organiza automáticamente las infografías")
    print("según la estructura definida en LISTADO_COMPLETO_MEDIOS_FALTANTES.md\n")
    
    # Verificar que existe el directorio de assets
    if not ASSETS_DIR.exists():
        print(f"❌ Error: No existe el directorio {ASSETS_DIR}")
        print("   Ejecuta primero: mkdir -p public/assets/infografias/...")
        return
    
    # Solicitar archivos
    print("📁 Ingresa las rutas de los archivos de imágenes a organizar.")
    print("   (Puedes ingresar múltiples archivos separados por comas)")
    print("   (O presiona Enter para seleccionar archivos del directorio actual)\n")
    
    entrada = input("Archivos: ").strip()
    
    if not entrada:
        # Buscar archivos de imagen en el directorio actual
        archivos = []
        extensiones = ['.svg', '.png', '.jpg', '.jpeg', '.webp']
        for ext in extensiones:
            archivos.extend(Path('.').glob(f'*{ext}'))
            archivos.extend(Path('.').glob(f'*{ext.upper()}'))
        
        if not archivos:
            print("❌ No se encontraron archivos de imagen en el directorio actual")
            return
        
        print(f"\n📋 Archivos encontrados ({len(archivos)}):")
        for i, archivo in enumerate(archivos, 1):
            print(f"  {i}. {archivo.name}")
        
        seleccion = input("\n¿Procesar todos? (s/n): ").strip().lower()
        if seleccion != 's':
            return
        
        archivos_a_procesar = archivos
    else:
        # Procesar archivos ingresados
        rutas = [r.strip() for r in entrada.split(',')]
        archivos_a_procesar = []
        
        for ruta in rutas:
            archivo = Path(ruta)
            if archivo.exists() and archivo.is_file():
                archivos_a_procesar.append(archivo)
            else:
                print(f"⚠️  Archivo no encontrado: {ruta}")
    
    if not archivos_a_procesar:
        print("❌ No hay archivos para procesar")
        return
    
    print(f"\n🔄 Procesando {len(archivos_a_procesar)} archivo(s)...\n")
    
    organizados = 0
    for archivo in archivos_a_procesar:
        print(f"\n📄 Procesando: {archivo.name}")
        
        # Buscar coincidencias automáticas
        coincidencias = buscar_infografia_por_palabras_clave(archivo.name)
        
        # Seleccionar infografía
        infografia_key = mostrar_menu_infografias(coincidencias)
        
        if not infografia_key:
            print(f"⏭️  Saltando {archivo.name}")
            continue
        
        # Detectar si es parte de una serie
        numero_paso = None
        info = INFORGRAFIAS[infografia_key]
        
        if info.get("es_serie"):
            numero_paso = obtener_numero_paso(archivo.name)
            if not numero_paso:
                respuesta = input(f"¿Es parte de una serie de pasos? (s/n): ").strip().lower()
                if respuesta == 's':
                    try:
                        numero_paso = int(input(f"¿Qué número de paso? (1-{info.get('pasos', 10)}): "))
                    except ValueError:
                        numero_paso = None
        
        # Organizar archivo
        if organizar_archivo(archivo, infografia_key, numero_paso):
            organizados += 1
    
    print("\n" + "=" * 70)
    print(f"✅ Proceso completado: {organizados}/{len(archivos_a_procesar)} archivos organizados")
    print("=" * 70)


if __name__ == "__main__":
    main()
