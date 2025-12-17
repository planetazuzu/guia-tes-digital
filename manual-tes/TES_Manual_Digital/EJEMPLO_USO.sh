#!/bin/bash
# Ejemplo de uso del script de conversión a Word

echo "=== Conversión del Manual TES Digital a Word ==="
echo ""

# Opción 1: Convertir todo el manual (si Pandoc está instalado)
# python3 convertir_a_word.py

# Opción 2: Convertir usando python-docx (alternativa)
python3 convertir_a_word.py --no-pandoc

# Opción 3: Convertir solo un bloque específico
# python3 convertir_a_word.py --directorio ./BLOQUE_1_PROCEDIMIENTOS_BASICOS --salida ./Bloque1_Word --no-pandoc

# Opción 4: Convertir desde el directorio manual-tes original (si existe)
# python3 convertir_a_word.py --directorio ../.. --salida ./Manual_Word_Completo --no-pandoc

echo ""
echo "Conversión completada. Revisa el directorio de salida."
