#!/usr/bin/env python3
"""
Script automatizado para organizar imágenes en public/assets/infografias/
Basado en mapeo de nombres de archivo a bloques
"""

import os
import shutil
from pathlib import Path
from typing import Dict, Optional

# Mapeo automático de nombres de archivo a bloques
IMAGE_MAP: Dict[str, str] = {
    # Bloque 0 - Fundamentos
    "ALGORITMO OPERATIVO DEL TES.svg": "bloque-0-fundamentos",
    "RESUMEN VISUAL DEL ALGORITMO START.svg": "bloque-0-fundamentos",
    "flujo-rcp-transtelefonica.png": "bloque-0-fundamentos",
    "flujo-desa-telefono.png": "bloque-0-fundamentos",
    "fast-transtelefonico.png": "bloque-0-fundamentos",
    "diagrama-seleccion-dispositivo-oxigenoterapia.png": "bloque-0-fundamentos",
    "tabla-rangos-fio2-oxigenoterapia.png": "bloque-0-fundamentos",
    "guia-colocacion-dispositivos-oxigenoterapia.png": "bloque-0-fundamentos",
    
    # Bloque 2 - Inmovilización
    "colocacion-collarin-paso-1-preparacion.png": "bloque-2-inmovilizacion",
    "colocacion-collarin-paso-2-parte-posterior.png": "bloque-2-inmovilizacion",
    "colocacion-collarin-paso-3-parte-anterior.png": "bloque-2-inmovilizacion",
    "colocacion-collarin-paso-4-ajuste-cierres.png": "bloque-2-inmovilizacion",
    "colocacion-collarin-paso-5-verificacion.png": "bloque-2-inmovilizacion",
    "colocacion-collarin-paso-6-liberacion-controlada.png": "bloque-2-inmovilizacion",
    "seleccion-talla-collarin-cervical.png": "bloque-2-inmovilizacion",
    "seleccion-talla-collarin-tabla-tallas.png": "bloque-2-inmovilizacion",
    "errores-frecuentes-collarin-cervical.png": "bloque-2-inmovilizacion",
    "verificaciones-post-colocacion-collarin.png": "bloque-2-inmovilizacion",
    "componentes-sistema-inmovilizacion.png": "bloque-2-inmovilizacion",
    "componentes-sistema-inmovilizacion 1.png": "bloque-2-inmovilizacion",  # Duplicado
    "posicion-tes-inmovilizacion-manual.png": "bloque-2-inmovilizacion",
    "tecnica-sujecion-manual-cervical.png": "bloque-2-inmovilizacion",
    "componentes-tablero-espinal.png": "bloque-2-inmovilizacion",
    "componentes-colchon-vacio.png": "bloque-2-inmovilizacion",
    "colocacion-colchon-vacio-paso-a-paso.png": "bloque-2-inmovilizacion",
    "componentes-camilla-cuchara.png": "bloque-2-inmovilizacion",
    "situaciones-que-requieren-inmovilizacion.png": "bloque-2-inmovilizacion",
    "secuencia-transicion-inmovilizacion.png": "bloque-2-inmovilizacion",
    "coordinacion-equipo-inmovilizacion.png": "bloque-2-inmovilizacion",
    
    # Bloque 3 - Material Sanitario
    "uso-correcto-pulsioximetro.png": "bloque-3-material-sanitario",
    "uso-correcto-tensiometro.png": "bloque-3-material-sanitario",
    "registro-constantes-vitales.png": "bloque-3-material-sanitario",
    "interpretacion-constantes-semaforo.png": "bloque-3-material-sanitario",
    "configuracion-maxima-fio2-bolsa-mascarilla.png": "bloque-3-material-sanitario",
    "uso-correcto-ambu.png": "bloque-3-material-sanitario",
    "canulas-guedel-nasofaringea.png": "bloque-3-material-sanitario",
    "dispositivos-supragloticos-guia.png": "bloque-3-material-sanitario",
    "ventilacion-medios-fortuna.png": "bloque-3-material-sanitario",
    
    # Bloque 7 - Conducción
    "configuracion-gps-antes-de-salir.png": "bloque-7-conduccion",
    
    # Bloque 12 - Marco Legal
    "diagrama-decisiones-eticas.png": "bloque-12-marco-legal",
    "diagrama-decisiones-eticas-urgencias.png": "bloque-12-marco-legal",
}

BASE_DIR = Path(__file__).parent.parent
SOURCE_DIR = BASE_DIR / "imagenes-pendientes"
TARGET_BASE = BASE_DIR / "public" / "assets" / "infografias"


def normalizar_nombre(nombre: str) -> str:
    """Normaliza el nombre para comparación (sin espacios extra, case-insensitive)"""
    return nombre.strip().lower().replace("  ", " ")


def encontrar_mapeo(nombre_archivo: str) -> Optional[str]:
    """Encuentra el bloque correspondiente para un archivo"""
    # Búsqueda exacta
    if nombre_archivo in IMAGE_MAP:
        return IMAGE_MAP[nombre_archivo]
    
    # Búsqueda case-insensitive
    nombre_lower = normalizar_nombre(nombre_archivo)
    for key, bloque in IMAGE_MAP.items():
        if normalizar_nombre(key) == nombre_lower:
            return bloque
    
    # Búsqueda parcial (para variaciones de nombres)
    nombre_sin_ext = Path(nombre_archivo).stem.lower()
    for key, bloque in IMAGE_MAP.items():
        key_sin_ext = Path(key).stem.lower()
        if key_sin_ext in nombre_sin_ext or nombre_sin_ext in key_sin_ext:
            return bloque
    
    return None


def organizar_imagenes():
    """Organiza todas las imágenes automáticamente"""
    print("=" * 70)
    print("🖼️  ORGANIZADOR AUTOMÁTICO DE IMÁGENES PARA PWA")
    print("=" * 70)
    print()
    
    # Verificar directorios
    if not SOURCE_DIR.exists():
        print(f"❌ Error: No existe {SOURCE_DIR}")
        return
    
    if not TARGET_BASE.exists():
        print(f"📁 Creando estructura de directorios...")
        TARGET_BASE.mkdir(parents=True, exist_ok=True)
        for bloque in ["bloque-0-fundamentos", "bloque-2-inmovilizacion", 
                       "bloque-3-material-sanitario", "bloque-7-conduccion", 
                       "bloque-12-marco-legal"]:
            (TARGET_BASE / bloque).mkdir(parents=True, exist_ok=True)
    
    # Obtener todas las imágenes
    extensiones = ['.png', '.svg', '.jpg', '.jpeg', '.PNG', '.SVG', '.JPG', '.JPEG']
    imagenes = []
    for ext in extensiones:
        imagenes.extend(SOURCE_DIR.glob(f'*{ext}'))
    
    if not imagenes:
        print(f"❌ No se encontraron imágenes en {SOURCE_DIR}")
        return
    
    print(f"📋 Encontradas {len(imagenes)} imagen(es)")
    print()
    
    # Estadísticas
    movidas = 0
    omitidas = 0
    no_mapeadas = []
    
    # Procesar cada imagen
    for imagen in sorted(imagenes):
        nombre = imagen.name
        bloque = encontrar_mapeo(nombre)
        
        if not bloque:
            no_mapeadas.append(nombre)
            print(f"⚠️  No mapeada: {nombre}")
            continue
        
        target_dir = TARGET_BASE / bloque
        target_path = target_dir / nombre
        
        # Si ya existe, verificar si es diferente
        if target_path.exists():
            if target_path.stat().st_size == imagen.stat().st_size:
                print(f"⏭️  Ya existe: {nombre} → {bloque}/")
                omitidas += 1
                continue
            else:
                # Tamaño diferente, sobrescribir
                print(f"🔄 Actualizando: {nombre} → {bloque}/")
        
        try:
            shutil.copy2(imagen, target_path)
            print(f"✅ Movida: {nombre} → {bloque}/")
            movidas += 1
        except Exception as e:
            print(f"❌ Error moviendo {nombre}: {e}")
    
    # Resumen
    print()
    print("=" * 70)
    print("📊 RESUMEN")
    print("=" * 70)
    print(f"✅ Movidas: {movidas}")
    print(f"⏭️  Omitidas (ya existían): {omitidas}")
    print(f"⚠️  No mapeadas: {len(no_mapeadas)}")
    
    if no_mapeadas:
        print()
        print("📝 Imágenes no mapeadas (requieren revisión manual):")
        for nombre in no_mapeadas:
            print(f"   - {nombre}")
        print()
        print("💡 Puedes añadirlas al mapeo en scripts/organizar_imagenes_auto.py")
    
    print()
    print("🎯 Próximo paso: Añadir referencias en archivos .md del manual")
    print("   Ver: GUIA_INTEGRAR_IMAGENES_PWA.md")
    print()


if __name__ == "__main__":
    organizar_imagenes()
