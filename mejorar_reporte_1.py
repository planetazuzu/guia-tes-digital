#!/usr/bin/env python3
"""
Mejora del reporte 1 con mapeo correcto de archivos
"""

import os
from pathlib import Path
from collections import defaultdict

BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_DIR = BASE_DIR / "manual-tes" / "TES_Manual_Digital"

# Mapeo real de archivos según auditoría previa
MAPEO_REAL = {
    "1.1.1": "BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md",
    "1.2.1": "BLOQUE_01_1_CONSTANTES_VITALES.md",
    "1.2.2": "BLOQUE_01_2_ABCDE_OPERATIVO.md",
    "1.2.3": "BLOQUE_01_3_GLASGOW_OPERATIVO.md",
    "1.2.4": "BLOQUE_01_4_TRIAGE_START.md",
    "2.1.1": "BLOQUE_04_0_ACCESO_VASCULAR_BASICO.md",
    "2.1.2": "BLOQUE_04_0B_RECONOCIMIENTO_PCR.md",
    "2.1.3": "BLOQUE_04_1_RCP_ADULTOS.md",
    "2.1.4": "BLOQUE_04_2_RCP_PEDIATRIA.md",
    "2.1.5": "BLOQUE_04_3_RCP_LACTANTES.md",
    "2.1.6": "BLOQUE_04_4_USO_DESA.md",
    "2.1.7": "BLOQUE_04_5_RCP_DOS_INTERVINIENTES.md",
    "2.1.8": "BLOQUE_04_6_OVACE_ADULTOS.md",
    "2.1.9": "BLOQUE_04_7_OVACE_PEDIATRIA.md",
    "2.1.10": "BLOQUE_04_8_OVACE_LACTANTES.md",
    "2.1.11": "BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md",
    "2.2.1": "BLOQUE_09_0_MEDICINA_EMERGENCIAS_APLICADA.md",
    "3.1.1": "BLOQUE_02_0_ANATOMIA_OPERATIVA.md",
    "3.1.2": "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
    "3.1.3": "BLOQUE_02_3_COLLARIN_CERVICAL.md",
    "3.1.4": "BLOQUE_02_4_CAMILLA_CUCHARA.md",
    "3.1.5": "BLOQUE_02_5_TABLERO_ESPINAL.md",
    "3.1.6": "BLOQUE_02_6_COLCHON_VACIO.md",
    "3.1.7": "BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md",
    "3.1.8": "BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md",
    "3.1.9": "BLOQUE_02_9_ERRORES_CRITICOS.md",
    "3.1.10": "BLOQUE_02_10_FERULAS.md",
    "3.1.11": "BLOQUE_02_11_CINTURON_PELVICO.md",
    "3.1.12": "BLOQUE_02_12_FERULA_TRACCION.md",
    "3.1.13": "BLOQUE_02_13_CAMILLAS_SILLAS_EVACUACION.md",
    "3.1.14": "BLOQUE_02_X_INVENTARIO_MATERIAL.md",
    "3.2.1": "BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md",
    "3.2.2": "BLOQUE_03_0B_OXIGENOTERAPIA_FUNDAMENTOS.md",
    "3.2.3": "BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md",
    "3.2.4": "BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md",
    "3.2.5": "BLOQUE_03_2_ASPIRACION.md",
    "3.2.6": "BLOQUE_03_2B_CANULA_OROFARINGEA.md",
    "3.2.7": "BLOQUE_03_3_BVM.md",
    "3.2.8": "BLOQUE_03_4_CANULAS.md",
    "3.2.9": "BLOQUE_03_5_ORGANIZACION_MALETIN.md",
    "3.2.10": "BLOQUE_03_6_CONTROL_HEMORRAGIAS.md",
    "3.2.11": "BLOQUE_03_7_QUEMADURAS.md",
    "3.2.12": "BLOQUE_03_8_HERIDAS_VENDAJES.md",
    "3.2.13": "BLOQUE_03_9_EXPOSICION_AISLAMIENTO_TERMICO.md",
    "3.2.14": "BLOQUE_03_10_MONITORIZACION_BASICA.md",
    "3.2.15": "BLOQUE_03_11_GLUCOMETRO.md",
    "3.2.16": "BLOQUE_03_12_TERMOMETRIA.md",
    "3.2.17": "BLOQUE_03_13_CONFORT_DOLOR.md",
    "3.2.18": "BLOQUE_03_14_BIOSEGURIDAD_DESCONTAMINACION.md",
    "3.2.19": "BLOQUE_03_15_GESTION_MATERIAL_ESCENA.md",
    "3.2.20": "BLOQUE_03_16_COMUNICACION_OPERATIVA.md",
    "3.2.21": "BLOQUE_03_17_SENALIZACION_ILUMINACION.md",
    "3.2.22": "BLOQUE_03_18_DOCUMENTACION_OPERATIVA.md",
    "3.2.23": "BLOQUE_03_99_CIERRE_BLOQUE_3.md",
    "3.2.24": "BLOQUE_03_X_INVENTARIO_MATERIAL_SANITARIO.md",
    "3.2.25": "BLOQUE_03_X2_MALETIN_CURAS.md",
    "3.2.26": "BLOQUE_03_X3_BOLSA_MONITORIZACION.md",
    "3.2.27": "BLOQUE_03_X4_INVENTARIO_GLOBAL.md",
    "3.2.28": "BLOQUE_03_X5_CHECKLIST_MAESTRO.md",
    "4.1.1": "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION_FARMACOS.md",
    "4.1.2": "BLOQUE_06_1_VADEMECUM_OPERATIVO.md",
    "4.1.3": "BLOQUE_06_2_OXIGENO_ADMINISTRACION_Y_SEGURIDAD.md",
    "4.1.4": "BLOQUE_06_3_ADRENALINA_USO_ANAFILAXIA_Y_RCP.md",
    "4.1.5": "BLOQUE_06_4_ASPIRINA_USO_SCA.md",
    "4.1.6": "BLOQUE_06_5_GLUCAGON_USO_HIPOGLUCEMIA.md",
    "4.1.7": "BLOQUE_06_6_SALBUTAMOL_USO_CRISIS_ASMATICA.md",
    "4.1.8": "BLOQUE_06_7_ABREVIATURAS_TERMINOLOGIA_FARMACOLOGICA.md",
    "5.1.1": "BLOQUE_05_0_INTRODUCCION_PROTOCOLOS_TRANSTELEFONICOS.md",
    "5.1.2": "BLOQUE_05_0B_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md",
    "5.1.3": "BLOQUE_05_1_PCR_TRANSTELEFONICA.md",
    "5.1.4": "BLOQUE_05_2_OVACE_TRANSTELEFONICA.md",
    "5.1.5": "BLOQUE_05_3_SCA_TRANSTELEFONICO.md",
    "5.1.6": "BLOQUE_05_4_ICTUS_TRANSTELEFONICO.md",
    "5.1.7": "BLOQUE_05_5_ANAFILAXIA_TRANSTELEFONICA.md",
    "5.1.8": "BLOQUE_05_6_CRISIS_ASMATICA_TRANSTELEFONICA.md",
    "5.1.9": "BLOQUE_05_7_HIPOGLUCEMIA_TRANSTELEFONICA.md",
    "5.1.10": "BLOQUE_05_8_COMUNICACION_COORDINADOR.md",
    "5.2.1": "BLOQUE_08_0_INTRODUCCION_GESTION_OPERATIVA.md",
    "5.2.2": "BLOQUE_08_1_DOCUMENTACION_CLINICA_PREHOSPITALARIA.md",
    "5.2.3": "BLOQUE_08_2_COORDINACION_Y_COMUNICACION_OPERATIVA.md",
    "5.2.4": "BLOQUE_08_3_GESTION_RECURSOS_Y_MATERIAL.md",
    "5.2.5": "BLOQUE_08_4_CALIDAD_Y_MEJORA_CONTINUA.md",
    "6.1.1": "BLOQUE_07_0_FUNDAMENTOS_CONDUCCION_URGENCIAS.md",
    "6.1.2": "BLOQUE_07_1_USO_LUCES_Y_SIRENA.md",
    "6.1.3": "BLOQUE_07_2_TECNICAS_CONDUCCION_EMERGENCIAS.md",
    "6.1.4": "BLOQUE_07_3_SEGURIDAD_VIAL_Y_PREVENCION_ACCIDENTES.md",
    "6.1.5": "BLOQUE_07_4_GESTION_RUTAS_Y_NAVEGACION.md",
    "6.1.6": "BLOQUE_07_5_PROTOCOLOS_SEGURIDAD_EN_ESCENA.md",
    "7.1.1": "BLOQUE_10_0_SITUACIONES_ESPECIALES.md",
    "7.2.1": "BLOQUE_11_0_PROTOCOLOS_TRAUMA.md",
    "8.1.1": "BLOQUE_12_0_MARCO_LEGAL_ETICO_PROFESIONAL.md",
    "8.2.1": "BLOQUE_13_0_COMUNICACION_RELACION_PACIENTE.md",
    "8.3.1": "BLOQUE_14_0_SEGURIDAD_PERSONAL_SALUD_TES.md",
}

BLOQUE_TO_FOLDER = {
    0: "BLOQUE_0_FUNDAMENTOS",
    1: "BLOQUE_1_PROCEDIMIENTOS_BASICOS",
    2: "BLOQUE_2_MATERIAL_E_INMOVILIZACION",
    3: "BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA",
    4: "BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP",
    5: "BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS",
    6: "BLOQUE_6_FARMACOLOGIA",
    7: "BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL",
    8: "BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION",
    9: "BLOQUE_9_MEDICINA_EMERGENCIAS_APLICADA",
    10: "BLOQUE_10_SITUACIONES_ESPECIALES",
    11: "BLOQUE_11_PROTOCOLOS_TRAUMA",
    12: "BLOQUE_12_MARCO_LEGAL_ETICO_PROFESIONAL",
    13: "BLOQUE_13_COMUNICACION_RELACION_PACIENTE",
    14: "BLOQUE_14_SEGURIDAD_PERSONAL_SALUD_TES",
}

INDICE_ESPERADO = {
    "1.1.1": {"nombre": "Fundamentos de Emergencias", "bloque": 0, "parte": 1},
    "1.2.1": {"nombre": "Constantes Vitales", "bloque": 1, "parte": 1},
    "1.2.2": {"nombre": "ABCDE Operativo", "bloque": 1, "parte": 1},
    "1.2.3": {"nombre": "Glasgow Operativo", "bloque": 1, "parte": 1},
    "1.2.4": {"nombre": "Triage START", "bloque": 1, "parte": 1},
    "2.1.1": {"nombre": "Acceso Vascular Básico", "bloque": 4, "parte": 2},
    "2.1.2": {"nombre": "Reconocimiento PCR", "bloque": 4, "parte": 2},
    "2.1.3": {"nombre": "RCP Adultos", "bloque": 4, "parte": 2},
    "2.1.4": {"nombre": "RCP Pediatría", "bloque": 4, "parte": 2},
    "2.1.5": {"nombre": "RCP Lactantes", "bloque": 4, "parte": 2},
    "2.1.6": {"nombre": "Uso DESA", "bloque": 4, "parte": 2},
    "2.1.7": {"nombre": "RCP Dos Intervinientes", "bloque": 4, "parte": 2},
    "2.1.8": {"nombre": "OVACE Adultos", "bloque": 4, "parte": 2},
    "2.1.9": {"nombre": "OVACE Pediatría", "bloque": 4, "parte": 2},
    "2.1.10": {"nombre": "OVACE Lactantes", "bloque": 4, "parte": 2},
    "2.1.11": {"nombre": "Posición Lateral de Seguridad", "bloque": 4, "parte": 2},
    "2.2.1": {"nombre": "Medicina de Emergencias Aplicada", "bloque": 9, "parte": 2},
    "3.1.1": {"nombre": "Anatomía Operativa", "bloque": 2, "parte": 3},
    "3.1.2": {"nombre": "Inmovilización Manual", "bloque": 2, "parte": 3},
    "3.1.3": {"nombre": "Collarín Cervical", "bloque": 2, "parte": 3},
    "3.1.4": {"nombre": "Camilla Cuchara", "bloque": 2, "parte": 3},
    "3.1.5": {"nombre": "Tablero Espinal", "bloque": 2, "parte": 3},
    "3.1.6": {"nombre": "Colchón Vacío", "bloque": 2, "parte": 3},
    "3.1.7": {"nombre": "Extricación y Movimientos en Bloque", "bloque": 2, "parte": 3},
    "3.1.8": {"nombre": "Transferencias y Movilización", "bloque": 2, "parte": 3},
    "3.1.9": {"nombre": "Errores Críticos", "bloque": 2, "parte": 3},
    "3.1.10": {"nombre": "Férulas", "bloque": 2, "parte": 3},
    "3.1.11": {"nombre": "Cinturón Pélvico", "bloque": 2, "parte": 3},
    "3.1.12": {"nombre": "Férula de Tracción", "bloque": 2, "parte": 3},
    "3.1.13": {"nombre": "Camillas y Sillas de Evacuación", "bloque": 2, "parte": 3},
    "3.1.14": {"nombre": "Inventario de Material", "bloque": 2, "parte": 3},
    "3.2.1": {"nombre": "Oxigenoterapia Básica", "bloque": 3, "parte": 3},
    "3.2.2": {"nombre": "Oxigenoterapia - Fundamentos", "bloque": 3, "parte": 3},
    "3.2.3": {"nombre": "Dispositivos de Oxigenoterapia", "bloque": 3, "parte": 3},
    "3.2.4": {"nombre": "Ventilación con Bolsa-Mascarilla", "bloque": 3, "parte": 3},
    "3.2.5": {"nombre": "Aspiración", "bloque": 3, "parte": 3},
    "3.2.6": {"nombre": "Cánula Orofaringea", "bloque": 3, "parte": 3},
    "3.2.7": {"nombre": "BVM (Bolsa Válvula Mascarilla)", "bloque": 3, "parte": 3},
    "3.2.8": {"nombre": "Cánulas", "bloque": 3, "parte": 3},
    "3.2.9": {"nombre": "Organización del Maletín", "bloque": 3, "parte": 3},
    "3.2.10": {"nombre": "Control de Hemorragias", "bloque": 3, "parte": 3},
    "3.2.11": {"nombre": "Quemaduras", "bloque": 3, "parte": 3},
    "3.2.12": {"nombre": "Heridas y Vendajes", "bloque": 3, "parte": 3},
    "3.2.13": {"nombre": "Exposición y Aislamiento Térmico", "bloque": 3, "parte": 3},
    "3.2.14": {"nombre": "Monitorización Básica", "bloque": 3, "parte": 3},
    "3.2.15": {"nombre": "Glucometro", "bloque": 3, "parte": 3},
    "3.2.16": {"nombre": "Termometría", "bloque": 3, "parte": 3},
    "3.2.17": {"nombre": "Confort y Dolor", "bloque": 3, "parte": 3},
    "3.2.18": {"nombre": "Bioseguridad y Descontaminación", "bloque": 3, "parte": 3},
    "3.2.19": {"nombre": "Gestión de Material en Escena", "bloque": 3, "parte": 3},
    "3.2.20": {"nombre": "Comunicación Operativa", "bloque": 3, "parte": 3},
    "3.2.21": {"nombre": "Señalización e Iluminación", "bloque": 3, "parte": 3},
    "3.2.22": {"nombre": "Documentación Operativa", "bloque": 3, "parte": 3},
    "3.2.23": {"nombre": "Cierre Bloque 3", "bloque": 3, "parte": 3},
    "3.2.24": {"nombre": "Inventario Material Sanitario", "bloque": 3, "parte": 3},
    "3.2.25": {"nombre": "Maletín de Curas", "bloque": 3, "parte": 3},
    "3.2.26": {"nombre": "Bolsa de Monitorización", "bloque": 3, "parte": 3},
    "3.2.27": {"nombre": "Inventario Global", "bloque": 3, "parte": 3},
    "3.2.28": {"nombre": "Checklist Maestro", "bloque": 3, "parte": 3},
    "4.1.1": {"nombre": "Principios de Administración de Fármacos", "bloque": 6, "parte": 4},
    "4.1.2": {"nombre": "Vademécum Operativo", "bloque": 6, "parte": 4},
    "4.1.3": {"nombre": "Oxígeno - Administración y Seguridad", "bloque": 6, "parte": 4},
    "4.1.4": {"nombre": "Adrenalina - Uso en Anafilaxia y RCP", "bloque": 6, "parte": 4},
    "4.1.5": {"nombre": "Aspirina - Uso en SCA", "bloque": 6, "parte": 4},
    "4.1.6": {"nombre": "Glucagón - Uso en Hipoglucemia", "bloque": 6, "parte": 4},
    "4.1.7": {"nombre": "Salbutamol - Uso en Crisis Asmática", "bloque": 6, "parte": 4},
    "4.1.8": {"nombre": "Abreviaturas y Terminología Farmacológica", "bloque": 6, "parte": 4},
    "5.1.1": {"nombre": "Introducción a Protocolos Transtelefónicos", "bloque": 5, "parte": 5},
    "5.1.2": {"nombre": "Protocolos de Emergencias Específicas", "bloque": 5, "parte": 5},
    "5.1.3": {"nombre": "PCR Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.4": {"nombre": "OVACE Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.5": {"nombre": "SCA Transtelefónico", "bloque": 5, "parte": 5},
    "5.1.6": {"nombre": "ICTUS Transtelefónico", "bloque": 5, "parte": 5},
    "5.1.7": {"nombre": "Anafilaxia Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.8": {"nombre": "Crisis Asmática Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.9": {"nombre": "Hipoglucemia Transtelefónica", "bloque": 5, "parte": 5},
    "5.1.10": {"nombre": "Comunicación con Coordinador", "bloque": 5, "parte": 5},
    "5.2.1": {"nombre": "Introducción a Gestión Operativa", "bloque": 8, "parte": 5},
    "5.2.2": {"nombre": "Documentación Clínica Prehospitalaria", "bloque": 8, "parte": 5},
    "5.2.3": {"nombre": "Coordinación y Comunicación Operativa", "bloque": 8, "parte": 5},
    "5.2.4": {"nombre": "Gestión de Recursos y Material", "bloque": 8, "parte": 5},
    "5.2.5": {"nombre": "Calidad y Mejora Continua", "bloque": 8, "parte": 5},
    "6.1.1": {"nombre": "Fundamentos de Conducción en Urgencias", "bloque": 7, "parte": 6},
    "6.1.2": {"nombre": "Uso de Luces y Sirena", "bloque": 7, "parte": 6},
    "6.1.3": {"nombre": "Técnicas de Conducción en Emergencias", "bloque": 7, "parte": 6},
    "6.1.4": {"nombre": "Seguridad Vial y Prevención de Accidentes", "bloque": 7, "parte": 6},
    "6.1.5": {"nombre": "Gestión de Rutas y Navegación", "bloque": 7, "parte": 6},
    "6.1.6": {"nombre": "Protocolos de Seguridad en Escena", "bloque": 7, "parte": 6},
    "7.1.1": {"nombre": "Situaciones Especiales", "bloque": 10, "parte": 7},
    "7.2.1": {"nombre": "Protocolos de Trauma", "bloque": 11, "parte": 7},
    "8.1.1": {"nombre": "Marco Legal, Ético y Profesional del TES", "bloque": 12, "parte": 8},
    "8.2.1": {"nombre": "Comunicación y Relación con el Paciente", "bloque": 13, "parte": 8},
    "8.3.1": {"nombre": "Seguridad Personal y Salud del TES", "bloque": 14, "parte": 8},
}

def verificar_archivos():
    """Verifica que todos los archivos existan"""
    archivos_encontrados = []
    archivos_faltantes = []
    
    for codigo, nombre_archivo in MAPEO_REAL.items():
        info = INDICE_ESPERADO[codigo]
        bloque_num = info["bloque"]
        folder_name = BLOQUE_TO_FOLDER[bloque_num]
        ruta_completa = MANUAL_DIR / folder_name / nombre_archivo
        
        if ruta_completa.exists():
            archivos_encontrados.append({
                'codigo': codigo,
                'nombre': info['nombre'],
                'archivo': nombre_archivo,
                'bloque': bloque_num,
                'ruta': str(ruta_completa.relative_to(BASE_DIR))
            })
        else:
            archivos_faltantes.append({
                'codigo': codigo,
                'nombre': info['nombre'],
                'archivo_esperado': nombre_archivo,
                'bloque': bloque_num,
                'folder': folder_name
            })
    
    return archivos_encontrados, archivos_faltantes

def generar_reporte_corregido():
    """Genera reporte corregido con mapeo real"""
    archivos_encontrados, archivos_faltantes = verificar_archivos()
    
    reporte = []
    reporte.append("# REPORTE 1: ARCHIVOS .MD FALTANTES DEL ÍNDICE\n")
    reporte.append(f"**Fecha:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    reporte.append("---\n")
    
    reporte.append("## 📊 RESUMEN EJECUTIVO\n")
    reporte.append(f"- **Total de capítulos según índice:** {len(INDICE_ESPERADO)}\n")
    reporte.append(f"- **Archivos encontrados:** {len(archivos_encontrados)}\n")
    reporte.append(f"- **Archivos faltantes:** {len(archivos_faltantes)}\n")
    reporte.append(f"- **Porcentaje de completitud:** {(len(archivos_encontrados)/len(INDICE_ESPERADO)*100):.1f}%\n")
    reporte.append("---\n")
    
    if archivos_faltantes:
        reporte.append("## ❌ ARCHIVOS FALTANTES\n")
        reporte.append(f"**Total:** {len(archivos_faltantes)} archivos\n\n")
        for archivo in archivos_faltantes:
            reporte.append(f"- **{archivo['codigo']}** - {archivo['nombre']}")
            reporte.append(f"  - Bloque: {archivo['bloque']}")
            reporte.append(f"  - Carpeta: `{archivo['folder']}/`")
            reporte.append(f"  - Archivo esperado: `{archivo['archivo_esperado']}`\n")
    else:
        reporte.append("## ✅ TODOS LOS ARCHIVOS ESTÁN PRESENTES\n")
        reporte.append("Todos los 93 capítulos del índice tienen archivos .md correspondientes.\n")
    
    reporte.append("\n---\n")
    reporte.append("## 📋 LISTADO COMPLETO DE ARCHIVOS ENCONTRADOS\n")
    reporte.append(f"**Total:** {len(archivos_encontrados)} archivos\n\n")
    
    por_parte = defaultdict(list)
    for archivo in archivos_encontrados:
        parte_num = archivo['codigo'].split('.')[0]
        por_parte[parte_num].append(archivo)
    
    for parte_num in sorted(por_parte.keys(), key=int):
        reporte.append(f"\n### Parte {parte_num}\n")
        for archivo in sorted(por_parte[parte_num], key=lambda x: x['codigo']):
            reporte.append(f"- ✅ `{archivo['codigo']}` - **{archivo['nombre']}**")
            reporte.append(f"  - Archivo: `{archivo['archivo']}`")
            reporte.append(f"  - Ruta: `{archivo['ruta']}`\n")
    
    return "\n".join(reporte)

if __name__ == "__main__":
    reporte = generar_reporte_corregido()
    with open(BASE_DIR / "REPORTE_1_ARCHIVOS_FALTANTES.md", "w", encoding="utf-8") as f:
        f.write(reporte)
    print("✅ Reporte 1 corregido generado")
