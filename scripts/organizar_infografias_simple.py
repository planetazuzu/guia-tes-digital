#!/usr/bin/env python3
"""
Versión simplificada del organizador de infografías.

Uso rápido:
    python scripts/organizar_infografias_simple.py <archivo1> <archivo2> ...

Ejemplo:
    python scripts/organizar_infografias_simple.py imagen1.svg imagen2.png
"""

import sys
from pathlib import Path

# Importar funciones del script principal
sys.path.insert(0, str(Path(__file__).parent))
from organizar_infografias import organizar_archivo, buscar_infografia_por_palabras_clave, obtener_numero_paso, INFORGRAFIAS

def main():
    if len(sys.argv) < 2:
        print("Uso: python organizar_infografias_simple.py <archivo1> [archivo2] ...")
        print("\nEjemplo:")
        print("  python organizar_infografias_simple.py collarín.svg tablero.png")
        sys.exit(1)
    
    archivos = [Path(f) for f in sys.argv[1:]]
    
    print(f"🖼️  Organizando {len(archivos)} archivo(s)...\n")
    
    for archivo in archivos:
        if not archivo.exists():
            print(f"❌ Archivo no encontrado: {archivo}")
            continue
        
        print(f"\n📄 {archivo.name}")
        
        # Buscar coincidencias
        coincidencias = buscar_infografia_por_palabras_clave(archivo.name)
        
        if coincidencias:
            # Usar la primera coincidencia automáticamente
            infografia_key = coincidencias[0][0]
            info = coincidencias[0][1]
            print(f"   → {info['descripcion']}")
            
            # Detectar número de paso si es serie
            numero_paso = None
            if info.get("es_serie"):
                numero_paso = obtener_numero_paso(archivo.name)
            
            # Organizar
            if organizar_archivo(archivo, infografia_key, numero_paso):
                print(f"   ✅ Organizado correctamente")
            else:
                print(f"   ⚠️  No se pudo organizar")
        else:
            print(f"   ⚠️  No se encontraron coincidencias automáticas")
            print(f"   💡 Ejecuta 'python scripts/organizar_infografias.py' para selección manual")

if __name__ == "__main__":
    main()
