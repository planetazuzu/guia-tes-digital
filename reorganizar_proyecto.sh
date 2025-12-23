#!/bin/bash
# Script de reorganización del Manual TES Digital
# FASE 5: Reorganización del Proyecto MD

BASE_DIR="/home/planetazuzu/guia-tes/manual-tes/TES_Manual_Digital"
cd "$BASE_DIR" || exit 1

echo "======================================================================"
echo "FASE 5: REORGANIZACIÓN DEL PROYECTO MD"
echo "======================================================================"
echo ""

# Crear directorio de Apéndices
echo "1. Creando directorio de Apéndices..."
mkdir -p APENDICES
echo "   ✅ Directorio APENDICES creado"

# BLOQUE 3: Resolver duplicados
echo ""
echo "2. Resolviendo duplicados en BLOQUE 3..."
cd BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA || exit 1

if [ -f "BLOQUE_03_0_OXIGENOTERAPIA_BASICA.md" ]; then
    mv BLOQUE_03_0_OXIGENOTERAPIA_BASICA.md BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md
    echo "   ✅ Renombrado: BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md"
fi

if [ -f "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md" ]; then
    mv BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md BLOQUE_03_0B_OXIGENOTERAPIA_FUNDAMENTOS.md
    echo "   ✅ Renombrado: BLOQUE_03_0B_OXIGENOTERAPIA_FUNDAMENTOS.md"
fi

if [ -f "BLOQUE_03_1_VENTILACION_BOLSA_MASCARILLA.md" ]; then
    mv BLOQUE_03_1_VENTILACION_BOLSA_MASCARILLA.md BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md
    echo "   ✅ Renombrado: BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md"
fi

if [ -f "BLOQUE_03_2_CANULA_OROFARINGEA.md" ]; then
    mv BLOQUE_03_2_CANULA_OROFARINGEA.md BLOQUE_03_2B_CANULA_OROFARINGEA.md
    echo "   ✅ Renombrado: BLOQUE_03_2B_CANULA_OROFARINGEA.md"
fi

cd ..

# BLOQUE 4: Resolver duplicado
echo ""
echo "3. Resolviendo duplicado en BLOQUE 4..."
cd BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP || exit 1

if [ -f "BLOQUE_04_0_RECONOCIMIENTO_PCR.md" ]; then
    mv BLOQUE_04_0_RECONOCIMIENTO_PCR.md BLOQUE_04_0B_RECONOCIMIENTO_PCR.md
    echo "   ✅ Renombrado: BLOQUE_04_0B_RECONOCIMIENTO_PCR.md"
fi

cd ..

# BLOQUE 5: Resolver duplicado
echo ""
echo "4. Resolviendo duplicado en BLOQUE 5..."
cd BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS || exit 1

if [ -f "BLOQUE_05_0_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md" ]; then
    mv BLOQUE_05_0_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md BLOQUE_05_0B_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md
    echo "   ✅ Renombrado: BLOQUE_05_0B_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md"
fi

cd ..

echo ""
echo "======================================================================"
echo "REORGANIZACIÓN COMPLETADA"
echo "======================================================================"
echo ""
echo "Cambios realizados:"
echo "  ✅ Directorio APENDICES creado"
echo "  ✅ BLOQUE 3: 4 archivos renombrados (duplicados resueltos)"
echo "  ✅ BLOQUE 4: 1 archivo renombrado"
echo "  ✅ BLOQUE 5: 1 archivo renombrado"
echo ""
echo "Próximos pasos manuales:"
echo "  1. Verificar y eliminar BLOQUE_02_1_COLLARIN_CERVICAL.md si es duplicado"
echo "  2. Renumerar archivos de BLOQUE 2 después de eliminar 02_1"
echo "  3. Actualizar script generar_documento_word.py con nuevas rutas"
echo ""

