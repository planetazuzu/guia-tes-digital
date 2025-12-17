#!/usr/bin/env python3
"""
Genera el archivo manual-index.ts desde la estructura real de archivos
"""

import json
from pathlib import Path

BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_DIR = BASE_DIR / "manual-tes" / "TES_Manual_Digital"

# Mapeo del índice
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

PARTES_INFO = {
    1: {"nombre": "Fundamentos y Evaluación Inicial", "icono": "BookOpen"},
    2: {"nombre": "Soporte Vital y Procedimientos Críticos", "icono": "Heart"},
    3: {"nombre": "Material y Equipamiento", "icono": "Package"},
    4: {"nombre": "Farmacología y Medicamentos", "icono": "Pill"},
    5: {"nombre": "Protocolos y Gestión Operativa", "icono": "Phone"},
    6: {"nombre": "Conducción y Seguridad Vial", "icono": "Car"},
    7: {"nombre": "Situaciones Especiales y Trauma", "icono": "AlertTriangle"},
    8: {"nombre": "Habilidades Profesionales", "icono": "User"},
}

BLOQUES_INFO = {
    0: {"nombre": "Fundamentos de Emergencias Prehospitalarias", "icono": "BookOpen"},
    1: {"nombre": "Procedimientos Básicos", "icono": "ClipboardCheck"},
    2: {"nombre": "Material e Inmovilización", "icono": "Package"},
    3: {"nombre": "Material Sanitario y Oxigenoterapia", "icono": "Wind"},
    4: {"nombre": "Soporte Vital Básico y RCP", "icono": "Heart"},
    5: {"nombre": "Protocolos Transtelefónicos", "icono": "Phone"},
    6: {"nombre": "Farmacología y Vademécum Operativo", "icono": "Pill"},
    7: {"nombre": "Conducción y Seguridad Vial", "icono": "Car"},
    8: {"nombre": "Gestión Operativa y Documentación", "icono": "FileText"},
    9: {"nombre": "Medicina de Emergencias Aplicada", "icono": "Stethoscope"},
    10: {"nombre": "Situaciones Especiales", "icono": "AlertTriangle"},
    11: {"nombre": "Protocolos de Trauma", "icono": "Activity"},
    12: {"nombre": "Marco Legal, Ético y Profesional", "icono": "Scale"},
    13: {"nombre": "Comunicación y Relación con el Paciente", "icono": "MessageSquare"},
    14: {"nombre": "Seguridad Personal y Salud del TES", "icono": "Shield"},
}

def generar_ruta_url(codigo: str, parte: int, bloque: int) -> str:
    """Genera ruta URL amigable"""
    parte_nombres = {
        1: "parte-i-fundamentos",
        2: "parte-ii-soporte-vital",
        3: "parte-iii-material",
        4: "parte-iv-farmacologia",
        5: "parte-v-protocolos",
        6: "parte-vi-conduccion",
        7: "parte-vii-situaciones-especiales",
        8: "parte-viii-habilidades",
    }
    
    bloque_nombres = {
        0: "bloque-0-fundamentos",
        1: "bloque-1-procedimientos-basicos",
        2: "bloque-2-inmovilizacion",
        3: "bloque-3-oxigenoterapia",
        4: "bloque-4-rcp",
        5: "bloque-5-transtelefonicos",
        6: "bloque-6-farmacologia",
        7: "bloque-7-conduccion",
        8: "bloque-8-gestion",
        9: "bloque-9-medicina-emergencias",
        10: "bloque-10-situaciones-especiales",
        11: "bloque-11-trauma",
        12: "bloque-12-marco-legal",
        13: "bloque-13-comunicacion",
        14: "bloque-14-seguridad",
    }
    
    return f"/manual/{parte_nombres[parte]}/{bloque_nombres[bloque]}/{codigo}"

def determinar_nivel_dificultad(codigo: str, bloque: int) -> str:
    """Determina nivel de dificultad basado en bloque y código"""
    if bloque == 0 or codigo.startswith("1."):
        return "basico"
    elif bloque in [4, 5] or codigo.startswith("2."):
        return "avanzado"
    else:
        return "intermedio"

def determinar_importancia(codigo: str, bloque: int) -> str:
    """Determina importancia basado en contenido"""
    protocolos_criticos = ["2.1.3", "2.1.8", "2.1.6", "1.2.2"]  # RCP, OVACE, DESA, ABCDE
    if codigo in protocolos_criticos or bloque == 4:
        return "alta"
    elif bloque in [0, 1, 2, 3]:
        return "alta"
    else:
        return "media"

def extraer_palabras_clave(nombre: str, bloque: int) -> list:
    """Extrae palabras clave del nombre"""
    palabras = nombre.lower().split()
    palabras_clave = []
    
    # Agregar palabras relevantes
    terminos_importantes = [
        "rcp", "ovace", "abcde", "glasgow", "triage", "oxigenoterapia",
        "farmacologia", "trauma", "inmovilizacion", "protocolo", "emergencia"
    ]
    
    for termino in terminos_importantes:
        if termino in nombre.lower():
            palabras_clave.append(termino)
    
    return palabras_clave[:5]  # Máximo 5 palabras clave

def calcular_tiempo_lectura(ruta_archivo: Path) -> int:
    """Calcula tiempo estimado de lectura"""
    try:
        with open(ruta_archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
            palabras = len(contenido.split())
            # Promedio: 200 palabras por minuto
            return max(5, palabras // 200)
    except:
        return 10  # Default

def obtener_capitulos_relacionados(codigo: str, parte: int, bloque: int) -> list:
    """Obtiene IDs de capítulos relacionados"""
    relacionados = []
    
    # Misma parte
    for cod, info in INDICE_ESPERADO.items():
        if info["parte"] == parte and cod != codigo:
            relacionados.append(cod)
    
    # Limitar a 5 relacionados
    return relacionados[:5]

def generar_indice():
    """Genera el archivo manual-index.ts"""
    
    # Organizar por partes y bloques
    partes_estructura = {}
    
    for codigo, info in INDICE_ESPERADO.items():
        parte_num = info["parte"]
        bloque_num = info["bloque"]
        
        if parte_num not in partes_estructura:
            partes_estructura[parte_num] = {
                "bloques": {}
            }
        
        if bloque_num not in partes_estructura[parte_num]["bloques"]:
            partes_estructura[parte_num]["bloques"][bloque_num] = {
                "capitulos": []
            }
        
        # Obtener archivo real
        nombre_archivo = MAPEO_REAL.get(codigo)
        if nombre_archivo:
            folder_name = BLOQUE_TO_FOLDER[bloque_num]
            ruta_archivo = MANUAL_DIR / folder_name / nombre_archivo
            
            # Calcular navegación
            codigos_ordenados = sorted(INDICE_ESPERADO.keys())
            indice_actual = codigos_ordenados.index(codigo)
            anterior = codigos_ordenados[indice_actual - 1] if indice_actual > 0 else None
            siguiente = codigos_ordenados[indice_actual + 1] if indice_actual < len(codigos_ordenados) - 1 else None
            
            capitulo = {
                "id": codigo,
                "titulo": info["nombre"],
                "parte": parte_num,
                "parteNombre": PARTES_INFO[parte_num]["nombre"],
                "bloque": bloque_num,
                "bloqueNombre": BLOQUES_INFO[bloque_num]["nombre"],
                "rutaArchivo": f"manual-tes/TES_Manual_Digital/{folder_name}/{nombre_archivo}",
                "rutaUrl": generar_ruta_url(codigo, parte_num, bloque_num),
                "nivelDificultad": determinar_nivel_dificultad(codigo, bloque_num),
                "importancia": determinar_importancia(codigo, bloque_num),
                "palabrasClave": extraer_palabras_clave(info["nombre"], bloque_num),
                "tipoContenido": "operativo" if bloque_num in [1, 2, 3, 4] else "formativo",
                "tiempoLectura": calcular_tiempo_lectura(ruta_archivo),
                "navegacion": {
                    "anterior": anterior,
                    "siguiente": siguiente,
                    "relacionados": obtener_capitulos_relacionados(codigo, parte_num, bloque_num)
                },
                "metadata": {
                    "version": "1.0",
                    "fechaActualizacion": "2024-12-13",
                    "autor": "Manual TES Digital"
                }
            }
            
            partes_estructura[parte_num]["bloques"][bloque_num]["capitulos"].append(capitulo)
    
    # Generar código TypeScript
    ts_code = []
    ts_code.append("// Índice del Manual TES Digital")
    ts_code.append("// Generado automáticamente desde estructura de archivos")
    ts_code.append("// Fecha: 2025-12-17")
    ts_code.append("")
    ts_code.append("export interface Capitulo {")
    ts_code.append("  id: string;")
    ts_code.append("  titulo: string;")
    ts_code.append("  parte: number;")
    ts_code.append("  parteNombre: string;")
    ts_code.append("  bloque: number;")
    ts_code.append("  bloqueNombre: string;")
    ts_code.append("  rutaArchivo: string;")
    ts_code.append("  rutaUrl: string;")
    ts_code.append("  nivelDificultad: 'basico' | 'intermedio' | 'avanzado';")
    ts_code.append("  importancia: 'alta' | 'media' | 'baja';")
    ts_code.append("  palabrasClave: string[];")
    ts_code.append("  tipoContenido: 'formativo' | 'operativo' | 'referencia';")
    ts_code.append("  tiempoLectura: number;")
    ts_code.append("  navegacion: {")
    ts_code.append("    anterior: string | null;")
    ts_code.append("    siguiente: string | null;")
    ts_code.append("    relacionados: string[];")
    ts_code.append("  };")
    ts_code.append("  metadata: {")
    ts_code.append("    version: string;")
    ts_code.append("    fechaActualizacion: string;")
    ts_code.append("    autor: string;")
    ts_code.append("  };")
    ts_code.append("}")
    ts_code.append("")
    ts_code.append("export interface Bloque {")
    ts_code.append("  id: number;")
    ts_code.append("  nombre: string;")
    ts_code.append("  descripcion: string;")
    ts_code.append("  icono?: string;")
    ts_code.append("  capitulos: Capitulo[];")
    ts_code.append("}")
    ts_code.append("")
    ts_code.append("export interface Parte {")
    ts_code.append("  id: number;")
    ts_code.append("  nombre: string;")
    ts_code.append("  descripcion: string;")
    ts_code.append("  icono?: string;")
    ts_code.append("  bloques: Bloque[];")
    ts_code.append("}")
    ts_code.append("")
    ts_code.append("export const manualIndex: Parte[] = [")
    
    # Generar estructura de partes
    for parte_num in sorted(partes_estructura.keys()):
        parte_info = PARTES_INFO[parte_num]
        ts_code.append(f"  {{")
        ts_code.append(f"    id: {parte_num},")
        ts_code.append(f"    nombre: \"{parte_info['nombre']}\",")
        ts_code.append(f"    descripcion: \"\",")
        ts_code.append(f"    icono: \"{parte_info['icono']}\",")
        ts_code.append(f"    bloques: [")
        
        # Generar bloques
        for bloque_num in sorted(partes_estructura[parte_num]["bloques"].keys()):
            bloque_info = BLOQUES_INFO[bloque_num]
            capitulos = sorted(partes_estructura[parte_num]["bloques"][bloque_num]["capitulos"], 
                            key=lambda x: x["id"])
            
            ts_code.append(f"      {{")
            ts_code.append(f"        id: {bloque_num},")
            ts_code.append(f"        nombre: \"{bloque_info['nombre']}\",")
            ts_code.append(f"        descripcion: \"\",")
            ts_code.append(f"        icono: \"{bloque_info['icono']}\",")
            ts_code.append(f"        capitulos: [")
            
            # Generar capítulos
            for cap in capitulos:
                ts_code.append(f"          {{")
                ts_code.append(f"            id: \"{cap['id']}\",")
                ts_code.append(f"            titulo: \"{cap['titulo']}\",")
                ts_code.append(f"            parte: {cap['parte']},")
                ts_code.append(f"            parteNombre: \"{cap['parteNombre']}\",")
                ts_code.append(f"            bloque: {cap['bloque']},")
                ts_code.append(f"            bloqueNombre: \"{cap['bloqueNombre']}\",")
                ts_code.append(f"            rutaArchivo: \"{cap['rutaArchivo']}\",")
                ts_code.append(f"            rutaUrl: \"{cap['rutaUrl']}\",")
                ts_code.append(f"            nivelDificultad: \"{cap['nivelDificultad']}\",")
                ts_code.append(f"            importancia: \"{cap['importancia']}\",")
                ts_code.append(f"            palabrasClave: {json.dumps(cap['palabrasClave'])},")
                ts_code.append(f"            tipoContenido: \"{cap['tipoContenido']}\",")
                ts_code.append(f"            tiempoLectura: {cap['tiempoLectura']},")
                ts_code.append(f"            navegacion: {{")
                ts_code.append(f"              anterior: {json.dumps(cap['navegacion']['anterior'])},",)
                ts_code.append(f"              siguiente: {json.dumps(cap['navegacion']['siguiente'])},",)
                ts_code.append(f"              relacionados: {json.dumps(cap['navegacion']['relacionados'])}")
                ts_code.append(f"            }},")
                ts_code.append(f"            metadata: {{")
                ts_code.append(f"              version: \"{cap['metadata']['version']}\",")
                ts_code.append(f"              fechaActualizacion: \"{cap['metadata']['fechaActualizacion']}\",")
                ts_code.append(f"              autor: \"{cap['metadata']['autor']}\"")
                ts_code.append(f"            }}")
                ts_code.append(f"          }},")
            
            ts_code.append(f"        ]")
            ts_code.append(f"      }},")
        
        ts_code.append(f"    ]")
        ts_code.append(f"  }},")
    
    ts_code.append("];")
    ts_code.append("")
    ts_code.append("// Función helper para obtener capítulo por ID")
    ts_code.append("export function getCapituloById(id: string): Capitulo | null {")
    ts_code.append("  for (const parte of manualIndex) {")
    ts_code.append("    for (const bloque of parte.bloques) {")
    ts_code.append("      const capitulo = bloque.capitulos.find(c => c.id === id);")
    ts_code.append("      if (capitulo) return capitulo;")
    ts_code.append("    }")
    ts_code.append("  }")
    ts_code.append("  return null;")
    ts_code.append("}")
    ts_code.append("")
    ts_code.append("// Función helper para obtener todos los capítulos")
    ts_code.append("export function getAllCapitulos(): Capitulo[] {")
    ts_code.append("  const capitulos: Capitulo[] = [];")
    ts_code.append("  for (const parte of manualIndex) {")
    ts_code.append("    for (const bloque of parte.bloques) {")
    ts_code.append("      capitulos.push(...bloque.capitulos);")
    ts_code.append("    }")
    ts_code.append("  }")
    ts_code.append("  return capitulos;")
    ts_code.append("}")
    
    # Guardar archivo
    output_path = BASE_DIR / "src" / "data" / "manual-index.ts"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_code))
    
    print(f"✅ Índice generado: {output_path}")
    print(f"   Total de capítulos: {len(INDICE_ESPERADO)}")

if __name__ == "__main__":
    generar_indice()
