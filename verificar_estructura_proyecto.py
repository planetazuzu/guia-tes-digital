#!/usr/bin/env python3
"""
Script para verificar la estructura completa del Manual TES Digital
Compara el índice esperado con los archivos reales existentes
"""

import os
import re
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Tuple, Set

# Ruta base del proyecto
BASE_DIR = Path("/home/planetazuzu/protocolo-r-pido")
MANUAL_DIR = BASE_DIR / "manual-tes" / "TES_Manual_Digital"

# Mapeo del índice esperado según INDICE_COMPLETO_MANUAL_TES.md
INDICE_ESPERADO = {
    # PARTE I: FUNDAMENTOS Y EVALUACIÓN INICIAL
    "1.1.1": {
        "nombre": "Fundamentos de Emergencias",
        "bloque": 0,
        "parte": 1,
        "archivo_esperado": "BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md"
    },
    "1.2.1": {
        "nombre": "Constantes Vitales",
        "bloque": 1,
        "parte": 1,
        "archivo_esperado": "BLOQUE_01_1_CONSTANTES_VITALES.md"
    },
    "1.2.2": {
        "nombre": "ABCDE Operativo",
        "bloque": 1,
        "parte": 1,
        "archivo_esperado": "BLOQUE_01_2_ABCDE_OPERATIVO.md"
    },
    "1.2.3": {
        "nombre": "Glasgow Operativo",
        "bloque": 1,
        "parte": 1,
        "archivo_esperado": "BLOQUE_01_3_GLASGOW_OPERATIVO.md"
    },
    "1.2.4": {
        "nombre": "Triage START",
        "bloque": 1,
        "parte": 1,
        "archivo_esperado": "BLOQUE_01_4_TRIAGE_START.md"
    },
    
    # PARTE II: SOPORTE VITAL Y PROCEDIMIENTOS CRÍTICOS
    "2.1.1": {
        "nombre": "Acceso Vascular Básico",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_0_ACCESO_VASCULAR_BASICO.md"
    },
    "2.1.2": {
        "nombre": "Reconocimiento PCR",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_0B_RECONOCIMIENTO_PCR.md"
    },
    "2.1.3": {
        "nombre": "RCP Adultos",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_1_RCP_ADULTOS.md"
    },
    "2.1.4": {
        "nombre": "RCP Pediatría",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_2_RCP_PEDIATRIA.md"
    },
    "2.1.5": {
        "nombre": "RCP Lactantes",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_3_RCP_LACTANTES.md"
    },
    "2.1.6": {
        "nombre": "Uso DESA",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_4_USO_DESA.md"
    },
    "2.1.7": {
        "nombre": "RCP Dos Intervinientes",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_5_RCP_DOS_INTERVINIENTES.md"
    },
    "2.1.8": {
        "nombre": "OVACE Adultos",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_6_OVACE_ADULTOS.md"
    },
    "2.1.9": {
        "nombre": "OVACE Pediatría",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_7_OVACE_PEDIATRIA.md"
    },
    "2.1.10": {
        "nombre": "OVACE Lactantes",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_8_OVACE_LACTANTES.md"
    },
    "2.1.11": {
        "nombre": "Posición Lateral de Seguridad",
        "bloque": 4,
        "parte": 2,
        "archivo_esperado": "BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md"
    },
    "2.2.1": {
        "nombre": "Medicina de Emergencias Aplicada",
        "bloque": 9,
        "parte": 2,
        "archivo_esperado": "BLOQUE_09_0_MEDICINA_EMERGENCIAS_APLICADA.md"
    },
    
    # PARTE III: MATERIAL Y EQUIPAMIENTO
    "3.1.1": {
        "nombre": "Anatomía Operativa",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_0_ANATOMIA_OPERATIVA.md"
    },
    "3.1.2": {
        "nombre": "Inmovilización Manual",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_2_INMOVILIZACION_MANUAL.md"
    },
    "3.1.3": {
        "nombre": "Collarín Cervical",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_3_COLLARIN_CERVICAL.md"
    },
    "3.1.4": {
        "nombre": "Camilla Cuchara",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_4_CAMILLA_CUCHARA.md"
    },
    "3.1.5": {
        "nombre": "Tablero Espinal",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_5_TABLERO_ESPINAL.md"
    },
    "3.1.6": {
        "nombre": "Colchón Vacío",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_6_COLCHON_VACIO.md"
    },
    "3.1.7": {
        "nombre": "Extricación y Movimientos en Bloque",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md"
    },
    "3.1.8": {
        "nombre": "Transferencias y Movilización",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md"
    },
    "3.1.9": {
        "nombre": "Errores Críticos",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_9_ERRORES_CRITICOS.md"
    },
    "3.1.10": {
        "nombre": "Férulas",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_10_FERULAS.md"
    },
    "3.1.11": {
        "nombre": "Cinturón Pélvico",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_11_CINTURON_PELVICO.md"
    },
    "3.1.12": {
        "nombre": "Férula de Tracción",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_12_FERULA_TRACCION.md"
    },
    "3.1.13": {
        "nombre": "Camillas y Sillas de Evacuación",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_13_CAMILLAS_SILLAS_EVACUACION.md"
    },
    "3.1.14": {
        "nombre": "Inventario de Material",
        "bloque": 2,
        "parte": 3,
        "archivo_esperado": "BLOQUE_02_X_INVENTARIO_MATERIAL.md"
    },
    "3.2.1": {
        "nombre": "Oxigenoterapia Básica",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md"
    },
    "3.2.2": {
        "nombre": "Oxigenoterapia - Fundamentos",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_0B_OXIGENOTERAPIA_FUNDAMENTOS.md"
    },
    "3.2.3": {
        "nombre": "Dispositivos de Oxigenoterapia",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md"
    },
    "3.2.4": {
        "nombre": "Ventilación con Bolsa-Mascarilla",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md"
    },
    "3.2.5": {
        "nombre": "Aspiración",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_2_ASPIRACION.md"
    },
    "3.2.6": {
        "nombre": "Cánula Orofaringea",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_2B_CANULA_OROFARINGEA.md"
    },
    "3.2.7": {
        "nombre": "BVM (Bolsa Válvula Mascarilla)",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_3_BVM.md"
    },
    "3.2.8": {
        "nombre": "Cánulas",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_4_CANULAS.md"
    },
    "3.2.9": {
        "nombre": "Organización del Maletín",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_5_ORGANIZACION_MALETIN.md"
    },
    "3.2.10": {
        "nombre": "Control de Hemorragias",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_6_CONTROL_HEMORRAGIAS.md"
    },
    "3.2.11": {
        "nombre": "Quemaduras",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_7_QUEMADURAS.md"
    },
    "3.2.12": {
        "nombre": "Heridas y Vendajes",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_8_HERIDAS_VENDAJES.md"
    },
    "3.2.13": {
        "nombre": "Exposición y Aislamiento Térmico",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_9_EXPOSICION_AISLAMIENTO_TERMICO.md"
    },
    "3.2.14": {
        "nombre": "Monitorización Básica",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_10_MONITORIZACION_BASICA.md"
    },
    "3.2.15": {
        "nombre": "Glucometro",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_11_GLUCOMETRO.md"
    },
    "3.2.16": {
        "nombre": "Termometría",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_12_TERMOMETRIA.md"
    },
    "3.2.17": {
        "nombre": "Confort y Dolor",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_13_CONFORT_DOLOR.md"
    },
    "3.2.18": {
        "nombre": "Bioseguridad y Descontaminación",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_14_BIOSEGURIDAD_DESCONTAMINACION.md"
    },
    "3.2.19": {
        "nombre": "Gestión de Material en Escena",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_15_GESTION_MATERIAL_ESCENA.md"
    },
    "3.2.20": {
        "nombre": "Comunicación Operativa",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_16_COMUNICACION_OPERATIVA.md"
    },
    "3.2.21": {
        "nombre": "Señalización e Iluminación",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_17_SENALIZACION_ILUMINACION.md"
    },
    "3.2.22": {
        "nombre": "Documentación Operativa",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_18_DOCUMENTACION_OPERATIVA.md"
    },
    "3.2.23": {
        "nombre": "Cierre Bloque 3",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_99_CIERRE_BLOQUE_3.md"
    },
    "3.2.24": {
        "nombre": "Inventario Material Sanitario",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_X_INVENTARIO_MATERIAL_SANITARIO.md"
    },
    "3.2.25": {
        "nombre": "Maletín de Curas",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_X2_MALETIN_CURAS.md"
    },
    "3.2.26": {
        "nombre": "Bolsa de Monitorización",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_X3_BOLSA_MONITORIZACION.md"
    },
    "3.2.27": {
        "nombre": "Inventario Global",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_X4_INVENTARIO_GLOBAL.md"
    },
    "3.2.28": {
        "nombre": "Checklist Maestro",
        "bloque": 3,
        "parte": 3,
        "archivo_esperado": "BLOQUE_03_X5_CHECKLIST_MAESTRO.md"
    },
    
    # PARTE IV: FARMACOLOGÍA Y MEDICAMENTOS
    "4.1.1": {
        "nombre": "Principios de Administración de Fármacos",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION_FARMACOS.md"
    },
    "4.1.2": {
        "nombre": "Vademécum Operativo",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_1_VADEMECUM_OPERATIVO.md"
    },
    "4.1.3": {
        "nombre": "Oxígeno - Administración y Seguridad",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_2_OXIGENO_ADMINISTRACION_Y_SEGURIDAD.md"
    },
    "4.1.4": {
        "nombre": "Adrenalina - Uso en Anafilaxia y RCP",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_3_ADRENALINA_USO_ANAFILAXIA_Y_RCP.md"
    },
    "4.1.5": {
        "nombre": "Aspirina - Uso en SCA",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_4_ASPIRINA_USO_SCA.md"
    },
    "4.1.6": {
        "nombre": "Glucagón - Uso en Hipoglucemia",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_5_GLUCAGON_USO_HIPOGLUCEMIA.md"
    },
    "4.1.7": {
        "nombre": "Salbutamol - Uso en Crisis Asmática",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_6_SALBUTAMOL_USO_CRISIS_ASMATICA.md"
    },
    "4.1.8": {
        "nombre": "Abreviaturas y Terminología Farmacológica",
        "bloque": 6,
        "parte": 4,
        "archivo_esperado": "BLOQUE_06_7_ABREVIATURAS_TERMINOLOGIA_FARMACOLOGICA.md"
    },
    
    # PARTE V: PROTOCOLOS Y GESTIÓN OPERATIVA
    "5.1.1": {
        "nombre": "Introducción a Protocolos Transtelefónicos",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_0_INTRODUCCION_PROTOCOLOS_TRANSTELEFONICOS.md"
    },
    "5.1.2": {
        "nombre": "Protocolos de Emergencias Específicas",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_0B_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md"
    },
    "5.1.3": {
        "nombre": "PCR Transtelefónica",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_1_PCR_TRANSTELEFONICA.md"
    },
    "5.1.4": {
        "nombre": "OVACE Transtelefónica",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_2_OVACE_TRANSTELEFONICA.md"
    },
    "5.1.5": {
        "nombre": "SCA Transtelefónico",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_3_SCA_TRANSTELEFONICO.md"
    },
    "5.1.6": {
        "nombre": "ICTUS Transtelefónico",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_4_ICTUS_TRANSTELEFONICO.md"
    },
    "5.1.7": {
        "nombre": "Anafilaxia Transtelefónica",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_5_ANAFILAXIA_TRANSTELEFONICA.md"
    },
    "5.1.8": {
        "nombre": "Crisis Asmática Transtelefónica",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_6_CRISIS_ASMATICA_TRANSTELEFONICA.md"
    },
    "5.1.9": {
        "nombre": "Hipoglucemia Transtelefónica",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_7_HIPOGLUCEMIA_TRANSTELEFONICA.md"
    },
    "5.1.10": {
        "nombre": "Comunicación con Coordinador",
        "bloque": 5,
        "parte": 5,
        "archivo_esperado": "BLOQUE_05_8_COMUNICACION_COORDINADOR.md"
    },
    "5.2.1": {
        "nombre": "Introducción a Gestión Operativa",
        "bloque": 8,
        "parte": 5,
        "archivo_esperado": "BLOQUE_08_0_INTRODUCCION_GESTION_OPERATIVA.md"
    },
    "5.2.2": {
        "nombre": "Documentación Clínica Prehospitalaria",
        "bloque": 8,
        "parte": 5,
        "archivo_esperado": "BLOQUE_08_1_DOCUMENTACION_CLINICA_PREHOSPITALARIA.md"
    },
    "5.2.3": {
        "nombre": "Coordinación y Comunicación Operativa",
        "bloque": 8,
        "parte": 5,
        "archivo_esperado": "BLOQUE_08_2_COORDINACION_Y_COMUNICACION_OPERATIVA.md"
    },
    "5.2.4": {
        "nombre": "Gestión de Recursos y Material",
        "bloque": 8,
        "parte": 5,
        "archivo_esperado": "BLOQUE_08_3_GESTION_RECURSOS_Y_MATERIAL.md"
    },
    "5.2.5": {
        "nombre": "Calidad y Mejora Continua",
        "bloque": 8,
        "parte": 5,
        "archivo_esperado": "BLOQUE_08_4_CALIDAD_Y_MEJORA_CONTINUA.md"
    },
    
    # PARTE VI: CONDUCCIÓN Y SEGURIDAD VIAL
    "6.1.1": {
        "nombre": "Fundamentos de Conducción en Urgencias",
        "bloque": 7,
        "parte": 6,
        "archivo_esperado": "BLOQUE_07_0_FUNDAMENTOS_CONDUCCION_URGENCIAS.md"
    },
    "6.1.2": {
        "nombre": "Uso de Luces y Sirena",
        "bloque": 7,
        "parte": 6,
        "archivo_esperado": "BLOQUE_07_1_USO_LUCES_Y_SIRENA.md"
    },
    "6.1.3": {
        "nombre": "Técnicas de Conducción en Emergencias",
        "bloque": 7,
        "parte": 6,
        "archivo_esperado": "BLOQUE_07_2_TECNICAS_CONDUCCION_EMERGENCIAS.md"
    },
    "6.1.4": {
        "nombre": "Seguridad Vial y Prevención de Accidentes",
        "bloque": 7,
        "parte": 6,
        "archivo_esperado": "BLOQUE_07_3_SEGURIDAD_VIAL_Y_PREVENCION_ACCIDENTES.md"
    },
    "6.1.5": {
        "nombre": "Gestión de Rutas y Navegación",
        "bloque": 7,
        "parte": 6,
        "archivo_esperado": "BLOQUE_07_4_GESTION_RUTAS_Y_NAVEGACION.md"
    },
    "6.1.6": {
        "nombre": "Protocolos de Seguridad en Escena",
        "bloque": 7,
        "parte": 6,
        "archivo_esperado": "BLOQUE_07_5_PROTOCOLOS_SEGURIDAD_EN_ESCENA.md"
    },
    
    # PARTE VII: SITUACIONES ESPECIALES Y TRAUMA
    "7.1.1": {
        "nombre": "Situaciones Especiales",
        "bloque": 10,
        "parte": 7,
        "archivo_esperado": "BLOQUE_10_0_SITUACIONES_ESPECIALES.md"
    },
    "7.2.1": {
        "nombre": "Protocolos de Trauma",
        "bloque": 11,
        "parte": 7,
        "archivo_esperado": "BLOQUE_11_0_PROTOCOLOS_TRAUMA.md"
    },
    
    # PARTE VIII: HABILIDADES PROFESIONALES
    "8.1.1": {
        "nombre": "Marco Legal, Ético y Profesional del TES",
        "bloque": 12,
        "parte": 8,
        "archivo_esperado": "BLOQUE_12_0_MARCO_LEGAL_ETICO_PROFESIONAL.md"
    },
    "8.2.1": {
        "nombre": "Comunicación y Relación con el Paciente",
        "bloque": 13,
        "parte": 8,
        "archivo_esperado": "BLOQUE_13_0_COMUNICACION_RELACION_PACIENTE.md"
    },
    "8.3.1": {
        "nombre": "Seguridad Personal y Salud del TES",
        "bloque": 14,
        "parte": 8,
        "archivo_esperado": "BLOQUE_14_0_SEGURIDAD_PERSONAL_SALUD_TES.md"
    },
}

# Mapeo de bloques a carpetas
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

def obtener_archivos_existentes() -> Dict[str, List[str]]:
    """Obtiene todos los archivos .md existentes organizados por bloque"""
    archivos_por_bloque = defaultdict(list)
    
    for bloque_num, folder_name in BLOQUE_TO_FOLDER.items():
        bloque_dir = MANUAL_DIR / folder_name
        if bloque_dir.exists():
            for archivo in bloque_dir.glob("*.md"):
                archivos_por_bloque[bloque_num].append(archivo.name)
    
    return archivos_por_bloque

def verificar_estructura():
    """Verifica la estructura completa del proyecto"""
    archivos_existentes = obtener_archivos_existentes()
    
    reporte = {
        "capitulos_encontrados": [],
        "capitulos_faltantes": [],
        "archivos_huérfanos": [],
        "inconsistencias_nombres": [],
        "errores_estructura": [],
        "estadisticas": {
            "total_esperado": len(INDICE_ESPERADO),
            "total_encontrado": 0,
            "total_faltante": 0,
            "total_huérfanos": 0,
        }
    }
    
    # Verificar cada capítulo esperado
    archivos_verificados = set()
    
    for codigo, info in INDICE_ESPERADO.items():
        bloque_num = info["bloque"]
        archivo_esperado = info["archivo_esperado"]
        folder_name = BLOQUE_TO_FOLDER[bloque_num]
        ruta_completa = MANUAL_DIR / folder_name / archivo_esperado
        
        if ruta_completa.exists():
            reporte["capitulos_encontrados"].append({
                "codigo": codigo,
                "nombre": info["nombre"],
                "archivo": archivo_esperado,
                "ruta": str(ruta_completa.relative_to(BASE_DIR))
            })
            archivos_verificados.add((bloque_num, archivo_esperado))
            reporte["estadisticas"]["total_encontrado"] += 1
        else:
            reporte["capitulos_faltantes"].append({
                "codigo": codigo,
                "nombre": info["nombre"],
                "archivo_esperado": archivo_esperado,
                "bloque": bloque_num,
                "carpeta": folder_name
            })
            reporte["estadisticas"]["total_faltante"] += 1
    
    # Buscar archivos huérfanos (existen pero no están en el índice)
    for bloque_num, archivos in archivos_existentes.items():
        folder_name = BLOQUE_TO_FOLDER[bloque_num]
        for archivo in archivos:
            if (bloque_num, archivo) not in archivos_verificados:
                # Verificar si es documentación interna
                if not archivo.startswith("_") and "DOCUMENTACION" not in str(MANUAL_DIR / folder_name):
                    reporte["archivos_huérfanos"].append({
                        "archivo": archivo,
                        "bloque": bloque_num,
                        "carpeta": folder_name,
                        "ruta": str((MANUAL_DIR / folder_name / archivo).relative_to(BASE_DIR))
                    })
                    reporte["estadisticas"]["total_huérfanos"] += 1
    
    # Verificar estructura de carpetas
    for bloque_num, folder_name in BLOQUE_TO_FOLDER.items():
        bloque_dir = MANUAL_DIR / folder_name
        if not bloque_dir.exists():
            reporte["errores_estructura"].append({
                "tipo": "carpeta_faltante",
                "bloque": bloque_num,
                "carpeta_esperada": folder_name
            })
    
    return reporte

def generar_reporte_markdown(reporte: dict) -> str:
    """Genera un reporte detallado en formato Markdown"""
    md = []
    md.append("# REPORTE DE VERIFICACIÓN DE ESTRUCTURA - MANUAL TES DIGITAL\n")
    md.append(f"**Fecha de verificación:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    md.append("---\n")
    
    # Estadísticas generales
    md.append("## 📊 ESTADÍSTICAS GENERALES\n")
    stats = reporte["estadisticas"]
    md.append(f"- **Total de capítulos esperados:** {stats['total_esperado']}")
    md.append(f"- **Total de capítulos encontrados:** {stats['total_encontrado']}")
    md.append(f"- **Total de capítulos faltantes:** {stats['total_faltante']}")
    md.append(f"- **Total de archivos huérfanos:** {stats['total_huérfanos']}")
    md.append(f"- **Porcentaje de completitud:** {(stats['total_encontrado']/stats['total_esperado']*100):.1f}%\n")
    md.append("---\n")
    
    # Capítulos encontrados (resumen por parte)
    md.append("## ✅ CAPÍTULOS ENCONTRADOS\n")
    md.append(f"**Total:** {len(reporte['capitulos_encontrados'])} capítulos\n")
    
    # Agrupar por parte
    por_parte = defaultdict(list)
    for cap in reporte["capitulos_encontrados"]:
        codigo = cap["codigo"]
        parte_num = codigo.split(".")[0]
        por_parte[parte_num].append(cap)
    
    for parte_num in sorted(por_parte.keys(), key=int):
        md.append(f"\n### Parte {parte_num}")
        md.append(f"**Capítulos encontrados:** {len(por_parte[parte_num])}")
        for cap in sorted(por_parte[parte_num], key=lambda x: x["codigo"]):
            md.append(f"- `{cap['codigo']}` - {cap['nombre']}")
    
    md.append("\n---\n")
    
    # Capítulos faltantes
    if reporte["capitulos_faltantes"]:
        md.append("## ❌ CAPÍTULOS FALTANTES\n")
        md.append(f"**Total:** {len(reporte['capitulos_faltantes'])} capítulos\n")
        
        por_parte_faltante = defaultdict(list)
        for cap in reporte["capitulos_faltantes"]:
            codigo = cap["codigo"]
            parte_num = codigo.split(".")[0]
            por_parte_faltante[parte_num].append(cap)
        
        for parte_num in sorted(por_parte_faltante.keys(), key=int):
            md.append(f"\n### Parte {parte_num}")
            for cap in sorted(por_parte_faltante[parte_num], key=lambda x: x["codigo"]):
                md.append(f"- `{cap['codigo']}` - **{cap['nombre']}**")
                md.append(f"  - Archivo esperado: `{cap['archivo_esperado']}`")
                md.append(f"  - Ubicación esperada: `{cap['carpeta']}/`")
    else:
        md.append("## ✅ TODOS LOS CAPÍTULOS ESTÁN PRESENTES\n")
    
    md.append("\n---\n")
    
    # Archivos huérfanos
    if reporte["archivos_huérfanos"]:
        md.append("## ⚠️ ARCHIVOS HUÉRFANOS (no listados en el índice)\n")
        md.append(f"**Total:** {len(reporte['archivos_huérfanos'])} archivos\n")
        
        por_bloque_huérfano = defaultdict(list)
        for archivo in reporte["archivos_huérfanos"]:
            por_bloque_huérfano[archivo["bloque"]].append(archivo)
        
        for bloque_num in sorted(por_bloque_huérfano.keys()):
            md.append(f"\n### Bloque {bloque_num} - {por_bloque_huérfano[bloque_num][0]['carpeta']}")
            for archivo in por_bloque_huérfano[bloque_num]:
                md.append(f"- `{archivo['archivo']}`")
                md.append(f"  - Ruta: `{archivo['ruta']}`")
    else:
        md.append("## ✅ NO HAY ARCHIVOS HUÉRFANOS\n")
    
    md.append("\n---\n")
    
    # Errores de estructura
    if reporte["errores_estructura"]:
        md.append("## 🔴 ERRORES DE ESTRUCTURA\n")
        for error in reporte["errores_estructura"]:
            if error["tipo"] == "carpeta_faltante":
                md.append(f"- ❌ Carpeta faltante: `{error['carpeta_esperada']}` (Bloque {error['bloque']})")
    else:
        md.append("## ✅ ESTRUCTURA DE CARPETAS CORRECTA\n")
    
    md.append("\n---\n")
    
    # Resumen por bloques
    md.append("## 📁 RESUMEN POR BLOQUES\n")
    archivos_existentes = obtener_archivos_existentes()
    
    for bloque_num in sorted(BLOQUE_TO_FOLDER.keys()):
        folder_name = BLOQUE_TO_FOLDER[bloque_num]
        bloque_dir = MANUAL_DIR / folder_name
        
        md.append(f"\n### Bloque {bloque_num}: {folder_name}")
        if bloque_dir.exists():
            archivos_bloque = archivos_existentes.get(bloque_num, [])
            md.append(f"- ✅ Carpeta existe")
            md.append(f"- Archivos .md encontrados: {len(archivos_bloque)}")
            
            # Contar capítulos esperados en este bloque
            esperados_bloque = [c for c in INDICE_ESPERADO.values() if c["bloque"] == bloque_num]
            md.append(f"- Capítulos esperados según índice: {len(esperados_bloque)}")
        else:
            md.append(f"- ❌ Carpeta NO existe")
    
    md.append("\n---\n")
    md.append("## 📝 NOTAS\n")
    md.append("- Este reporte compara el índice en `INDICE_COMPLETO_MANUAL_TES.md` con los archivos reales en `manual-tes/TES_Manual_Digital/`")
    md.append("- Los archivos huérfanos son archivos que existen pero no están listados en el índice")
    md.append("- Se recomienda revisar los archivos huérfanos para determinar si deben agregarse al índice o eliminarse")
    
    return "\n".join(md)

if __name__ == "__main__":
    print("Verificando estructura del Manual TES Digital...")
    reporte = verificar_estructura()
    
    reporte_md = generar_reporte_markdown(reporte)
    
    # Guardar reporte
    reporte_path = BASE_DIR / "REPORTE_VERIFICACION_ESTRUCTURA.md"
    with open(reporte_path, "w", encoding="utf-8") as f:
        f.write(reporte_md)
    
    print(f"\n✅ Reporte generado: {reporte_path}")
    print(f"\n📊 Resumen:")
    print(f"   - Capítulos encontrados: {reporte['estadisticas']['total_encontrado']}/{reporte['estadisticas']['total_esperado']}")
    print(f"   - Capítulos faltantes: {reporte['estadisticas']['total_faltante']}")
    print(f"   - Archivos huérfanos: {reporte['estadisticas']['total_huérfanos']}")
