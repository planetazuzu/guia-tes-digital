#!/usr/bin/env python3
"""
Script para añadir enlaces de referencia a TODOS los capítulos del manual
Basado en estructura de carpetas y relaciones lógicas
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional

BASE_DIR = Path(__file__).parent.parent
MANUAL_DIR = BASE_DIR / "MANUAL_TES_DIGITAL"

# Mapeo completo de relaciones entre capítulos
RELACIONES_COMPLETAS: Dict[str, Dict[str, List[str]]] = {
    # BLOQUE 0 - FUNDAMENTOS
    "BLOQUE_00_FUNDAMENTOS_EMERGENCIAS.md": {
        "relacionados": [
            "../02_PROCEDIMIENTOS_BASICOS/1.1_constantes_vitales.md",
            "../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md",
            "../02_PROCEDIMIENTOS_BASICOS/1.4_triage_start.md",
        ],
    },
    
    # BLOQUE 1 - PROCEDIMIENTOS BÁSICOS
    "1.1_constantes_vitales.md": {
        "relacionados": [
            "1.2_abcde_operativo.md",
            "1.3_glasgow_operativo.md",
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_10_MONITORIZACION_BASICA.md",
        ],
        "continuacion": [
            "1.2_abcde_operativo.md",
        ],
    },
    
    "1.2_abcde_operativo.md": {
        "prerrequisitos": [
            "1.1_constantes_vitales.md",
        ],
        "relacionados": [
            "1.3_glasgow_operativo.md",
            "1.4_triage_start.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_0_RECONOCIMIENTO_PCR.md",
        ],
        "continuacion": [
            "1.3_glasgow_operativo.md",
        ],
    },
    
    "1.3_glasgow_operativo.md": {
        "prerrequisitos": [
            "1.1_constantes_vitales.md",
            "1.2_abcde_operativo.md",
        ],
        "relacionados": [
            "1.4_triage_start.md",
        ],
        "continuacion": [
            "1.4_triage_start.md",
        ],
    },
    
    "1.4_triage_start.md": {
        "prerrequisitos": [
            "1.1_constantes_vitales.md",
            "1.2_abcde_operativo.md",
        ],
        "relacionados": [
            "../09_TRIAGE_MULTIPLES_VICTIMAS/BLOQUE_07_2_METODO_START.md",
        ],
    },
    
    "BLOQUE_01_5_PULSIOXIMETRO.md": {
        "prerrequisitos": [
            "1.1_constantes_vitales.md",
        ],
        "relacionados": [
            "BLOQUE_01_6_TENSIOMETRO.md",
            "BLOQUE_01_7_GLUCOMETRO.md",
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_10_MONITORIZACION_BASICA.md",
        ],
    },
    
    "BLOQUE_01_6_TENSIOMETRO.md": {
        "prerrequisitos": [
            "1.1_constantes_vitales.md",
        ],
        "relacionados": [
            "BLOQUE_01_5_PULSIOXIMETRO.md",
            "BLOQUE_01_7_GLUCOMETRO.md",
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_10_MONITORIZACION_BASICA.md",
        ],
    },
    
    "BLOQUE_01_7_GLUCOMETRO.md": {
        "prerrequisitos": [
            "1.1_constantes_vitales.md",
        ],
        "relacionados": [
            "BLOQUE_01_5_PULSIOXIMETRO.md",
            "BLOQUE_01_6_TENSIOMETRO.md",
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_11_GLUCOMETRO.md",
        ],
    },
    
    # BLOQUE 2 - INMOVILIZACIÓN
    "BLOQUE_02_0_ANATOMIA_OPERATIVA.md": {
        "relacionados": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
        ],
        "continuacion": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
        ],
    },
    
    "BLOQUE_02_2_INMOVILIZACION_MANUAL.md": {
        "prerrequisitos": [
            "BLOQUE_02_0_ANATOMIA_OPERATIVA.md",
        ],
        "relacionados": [
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
            "BLOQUE_02_5_TABLERO_ESPINAL.md",
            "BLOQUE_02_6_COLCHON_VACIO.md",
        ],
        "continuacion": [
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
        ],
    },
    
    "BLOQUE_02_4_CAMILLA_CUCHARA.md": {
        "prerrequisitos": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
        ],
        "relacionados": [
            "BLOQUE_02_5_TABLERO_ESPINAL.md",
            "BLOQUE_02_6_COLCHON_VACIO.md",
            "BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md",
        ],
    },
    
    "BLOQUE_02_6_COLCHON_VACIO.md": {
        "prerrequisitos": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
        ],
        "relacionados": [
            "BLOQUE_02_5_TABLERO_ESPINAL.md",
            "BLOQUE_02_4_CAMILLA_CUCHARA.md",
        ],
    },
    
    "BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md": {
        "prerrequisitos": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
        ],
        "relacionados": [
            "BLOQUE_02_5_TABLERO_ESPINAL.md",
            "BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md",
        ],
    },
    
    "BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md": {
        "prerrequisitos": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
        ],
        "relacionados": [
            "../08_TRANSFERENCIA_Y_TRASLADO/BLOQUE_08_1_PREPARACION_TRASLADO.md",
            "../08_TRANSFERENCIA_Y_TRASLADO/BLOQUE_08_2_GESTION_DURANTE_TRASLADO.md",
        ],
    },
    
    "BLOQUE_02_9_ERRORES_CRITICOS.md": {
        "prerrequisitos": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
            "BLOQUE_02_5_TABLERO_ESPINAL.md",
        ],
        "relacionados": [
            "BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            "BLOQUE_02_3_COLLARIN_CERVICAL.md",
        ],
    },
    
    "BLOQUE_02_10_FERULAS.md": {
        "prerrequisitos": [
            "BLOQUE_02_0_ANATOMIA_OPERATIVA.md",
        ],
        "relacionados": [
            "BLOQUE_02_11_CINTURON_PELVICO.md",
            "BLOQUE_02_12_FERULA_TRACCION.md",
        ],
    },
    
    # BLOQUE 3 - SOPORTE VITAL
    "BLOQUE_04_2_RCP_PEDIATRIA.md": {
        "prerrequisitos": [
            "BLOQUE_04_0_RECONOCIMIENTO_PCR.md",
            "BLOQUE_04_1_RCP_ADULTOS.md",
        ],
        "relacionados": [
            "BLOQUE_04_1_RCP_ADULTOS.md",
            "BLOQUE_04_3_RCP_LACTANTES.md",
            "BLOQUE_04_4_USO_DESA.md",
        ],
        "transtelefonico": [
            "../06_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_2_RCP_TRANSTELEFONICA_NINOS.md",
        ],
    },
    
    "BLOQUE_04_3_RCP_LACTANTES.md": {
        "prerrequisitos": [
            "BLOQUE_04_0_RECONOCIMIENTO_PCR.md",
            "BLOQUE_04_1_RCP_ADULTOS.md",
            "BLOQUE_04_2_RCP_PEDIATRIA.md",
        ],
        "relacionados": [
            "BLOQUE_04_1_RCP_ADULTOS.md",
            "BLOQUE_04_2_RCP_PEDIATRIA.md",
        ],
        "transtelefonico": [
            "../06_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_3_RCP_TRANSTELEFONICA_LACTANTES.md",
        ],
    },
    
    "BLOQUE_04_4_USO_DESA.md": {
        "prerrequisitos": [
            "BLOQUE_04_1_RCP_ADULTOS.md",
        ],
        "relacionados": [
            "BLOQUE_04_1_RCP_ADULTOS.md",
            "BLOQUE_04_5_VENTILACION_BVM.md",
        ],
        "transtelefonico": [
            "../06_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_4_DESA_GUIADO_TELEFONO.md",
        ],
    },
    
    "BLOQUE_04_5_VENTILACION_BVM.md": {
        "prerrequisitos": [
            "BLOQUE_04_1_RCP_ADULTOS.md",
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
        ],
        "relacionados": [
            "BLOQUE_04_1_RCP_ADULTOS.md",
            "BLOQUE_04_6_USO_CANULAS_OPA_NPA.md",
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_3_BVM.md",
        ],
    },
    
    "BLOQUE_04_6_USO_CANULAS_OPA_NPA.md": {
        "prerrequisitos": [
            "BLOQUE_04_5_VENTILACION_BVM.md",
        ],
        "relacionados": [
            "BLOQUE_04_5_VENTILACION_BVM.md",
            "BLOQUE_04_7_ASPIRACION_SECRECIONES.md",
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_23_CANULAS_ORO_NASOFARINGEAS.md",
        ],
    },
    
    "BLOQUE_04_7_ASPIRACION_SECRECIONES.md": {
        "prerrequisitos": [
            "BLOQUE_04_5_VENTILACION_BVM.md",
            "BLOQUE_04_6_USO_CANULAS_OPA_NPA.md",
        ],
        "relacionados": [
            "BLOQUE_04_5_VENTILACION_BVM.md",
            "BLOQUE_04_6_USO_CANULAS_OPA_NPA.md",
        ],
    },
    
    "BLOQUE_04_8_POSICIONES_SEGURIDAD_MOVILIZACION.md": {
        "prerrequisitos": [
            "BLOQUE_04_0_RECONOCIMIENTO_PCR.md",
        ],
        "relacionados": [
            "BLOQUE_04_1_RCP_ADULTOS.md",
            "../04_MATERIAL_E_INMOVILIZACION/BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
        ],
    },
    
    # BLOQUE 4 - OXIGENOTERAPIA
    "BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md": {
        "prerrequisitos": [
            "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
        ],
        "relacionados": [
            "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
            "BLOQUE_03_3_BVM.md",
        ],
    },
    
    "BLOQUE_03_2_ASPIRACION.md": {
        "prerrequisitos": [
            "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_7_ASPIRACION_SECRECIONES.md",
        ],
    },
    
    "BLOQUE_03_3_BVM.md": {
        "prerrequisitos": [
            "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
            "BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_5_VENTILACION_BVM.md",
            "BLOQUE_03_24_USO_CORRECTO_BVM_AMBU.md",
        ],
    },
    
    "BLOQUE_03_4_CANULAS.md": {
        "prerrequisitos": [
            "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_6_USO_CANULAS_OPA_NPA.md",
            "BLOQUE_03_23_CANULAS_ORO_NASOFARINGEAS.md",
        ],
    },
    
    "BLOQUE_03_6_CONTROL_HEMORRAGIAS.md": {
        "prerrequisitos": [
            "../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md",
        ],
        "relacionados": [
            "BLOQUE_03_8_HERIDAS_VENDAJES.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md",
        ],
    },
    
    "BLOQUE_03_7_QUEMADURAS.md": {
        "prerrequisitos": [
            "../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md",
        ],
        "relacionados": [
            "BLOQUE_03_6_CONTROL_HEMORRAGIAS.md",
            "BLOQUE_03_8_HERIDAS_VENDAJES.md",
        ],
    },
    
    "BLOQUE_03_8_HERIDAS_VENDAJES.md": {
        "prerrequisitos": [
            "BLOQUE_03_6_CONTROL_HEMORRAGIAS.md",
        ],
        "relacionados": [
            "BLOQUE_03_6_CONTROL_HEMORRAGIAS.md",
            "BLOQUE_03_7_QUEMADURAS.md",
        ],
    },
    
    "BLOQUE_03_10_MONITORIZACION_BASICA.md": {
        "prerrequisitos": [
            "../02_PROCEDIMIENTOS_BASICOS/1.1_constantes_vitales.md",
        ],
        "relacionados": [
            "../02_PROCEDIMIENTOS_BASICOS/BLOQUE_01_5_PULSIOXIMETRO.md",
            "../02_PROCEDIMIENTOS_BASICOS/BLOQUE_01_6_TENSIOMETRO.md",
            "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
        ],
    },
    
    "BLOQUE_03_11_GLUCOMETRO.md": {
        "prerrequisitos": [
            "../02_PROCEDIMIENTOS_BASICOS/1.1_constantes_vitales.md",
        ],
        "relacionados": [
            "../02_PROCEDIMIENTOS_BASICOS/BLOQUE_01_7_GLUCOMETRO.md",
        ],
    },
    
    "BLOQUE_03_22_DISPOSITIVOS_SUPRAGLOTICOS.md": {
        "prerrequisitos": [
            "BLOQUE_03_3_BVM.md",
            "BLOQUE_03_4_CANULAS.md",
        ],
        "relacionados": [
            "BLOQUE_03_3_BVM.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_5_VENTILACION_BVM.md",
        ],
    },
    
    "BLOQUE_03_23_CANULAS_ORO_NASOFARINGEAS.md": {
        "prerrequisitos": [
            "BLOQUE_03_4_CANULAS.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_6_USO_CANULAS_OPA_NPA.md",
            "BLOQUE_03_3_BVM.md",
        ],
    },
    
    "BLOQUE_03_24_USO_CORRECTO_BVM_AMBU.md": {
        "prerrequisitos": [
            "BLOQUE_03_3_BVM.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_5_VENTILACION_BVM.md",
            "BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
        ],
    },
    
    "BLOQUE_03_25_VENTILACION_MEDIOS_FORTUNA.md": {
        "prerrequisitos": [
            "BLOQUE_03_3_BVM.md",
        ],
        "relacionados": [
            "BLOQUE_03_24_USO_CORRECTO_BVM_AMBU.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_5_VENTILACION_BVM.md",
        ],
    },
    
    # BLOQUE 5 - PROTOCOLOS TRANSTELEFÓNICOS
    "BLOQUE_05_0_COMUNICACION_TRANSTELEFONICA_FUNDAMENTAL.md": {
        "relacionados": [
            "BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md",
            "../08_TRANSFERENCIA_Y_TRASLADO/BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md",
        ],
    },
    
    "BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md": {
        "prerrequisitos": [
            "BLOQUE_05_0_COMUNICACION_TRANSTELEFONICA_FUNDAMENTAL.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md",
            "BLOQUE_05_2_RCP_TRANSTELEFONICA_NINOS.md",
            "BLOQUE_05_3_RCP_TRANSTELEFONICA_LACTANTES.md",
        ],
        "continuacion": [
            "BLOQUE_05_2_RCP_TRANSTELEFONICA_NINOS.md",
        ],
    },
    
    "BLOQUE_05_2_RCP_TRANSTELEFONICA_NINOS.md": {
        "prerrequisitos": [
            "BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_2_RCP_PEDIATRIA.md",
            "BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md",
            "BLOQUE_05_3_RCP_TRANSTELEFONICA_LACTANTES.md",
        ],
        "continuacion": [
            "BLOQUE_05_3_RCP_TRANSTELEFONICA_LACTANTES.md",
        ],
    },
    
    "BLOQUE_05_3_RCP_TRANSTELEFONICA_LACTANTES.md": {
        "prerrequisitos": [
            "BLOQUE_05_2_RCP_TRANSTELEFONICA_NINOS.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_3_RCP_LACTANTES.md",
            "BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md",
            "BLOQUE_05_2_RCP_TRANSTELEFONICA_NINOS.md",
        ],
    },
    
    "BLOQUE_05_4_DESA_GUIADO_TELEFONO.md": {
        "prerrequisitos": [
            "BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_4_USO_DESA.md",
            "BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md",
        ],
    },
    
    "BLOQUE_05_6_SCA_TRANSTELEFONICO.md": {
        "prerrequisitos": [
            "BLOQUE_05_0_COMUNICACION_TRANSTELEFONICA_FUNDAMENTAL.md",
        ],
        "relacionados": [
            "BLOQUE_05_7_ICTUS_TRANSTELEFONICO.md",
        ],
    },
    
    "BLOQUE_05_7_ICTUS_TRANSTELEFONICO.md": {
        "prerrequisitos": [
            "BLOQUE_05_0_COMUNICACION_TRANSTELEFONICA_FUNDAMENTAL.md",
        ],
        "relacionados": [
            "BLOQUE_05_6_SCA_TRANSTELEFONICO.md",
        ],
    },
    
    "BLOQUE_05_9_OVACE_TRANSTELEFONICA.md": {
        "prerrequisitos": [
            "BLOQUE_05_0_COMUNICACION_TRANSTELEFONICA_FUNDAMENTAL.md",
        ],
        "relacionados": [
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_8_POSICIONES_SEGURIDAD_MOVILIZACION.md",
        ],
    },
    
    # BLOQUE 6 - FARMACOLOGÍA
    "BLOQUE_06_2_ANALGESICOS_SEDANTES.md": {
        "prerrequisitos": [
            "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION.md",
            "BLOQUE_06_1_DEL_VIAL_A_LA_VENA.md",
        ],
        "relacionados": [
            "BLOQUE_06_3_VASOACTIVOS_AMINAS.md",
            "BLOQUE_06_5_FARMACOS_CARDIOLOGICOS.md",
        ],
    },
    
    "BLOQUE_06_3_VASOACTIVOS_AMINAS.md": {
        "prerrequisitos": [
            "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION.md",
            "BLOQUE_06_1_DEL_VIAL_A_LA_VENA.md",
        ],
        "relacionados": [
            "BLOQUE_06_2_ANALGESICOS_SEDANTES.md",
            "BLOQUE_06_5_FARMACOS_CARDIOLOGICOS.md",
        ],
    },
    
    "BLOQUE_06_4_ANTIARRITMICOS.md": {
        "prerrequisitos": [
            "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION.md",
            "BLOQUE_06_1_DEL_VIAL_A_LA_VENA.md",
        ],
        "relacionados": [
            "BLOQUE_06_5_FARMACOS_CARDIOLOGICOS.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_4_USO_DESA.md",
        ],
    },
    
    "BLOQUE_06_5_FARMACOS_CARDIOLOGICOS.md": {
        "prerrequisitos": [
            "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION.md",
            "BLOQUE_06_1_DEL_VIAL_A_LA_VENA.md",
        ],
        "relacionados": [
            "BLOQUE_06_3_VASOACTIVOS_AMINAS.md",
            "BLOQUE_06_4_ANTIARRITMICOS.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md",
        ],
    },
    
    "BLOQUE_06_6_FARMACOS_RESPIRATORIOS.md": {
        "prerrequisitos": [
            "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION.md",
            "BLOQUE_06_1_DEL_VIAL_A_LA_VENA.md",
        ],
        "relacionados": [
            "../05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md",
            "../03_SOPORTE_VITAL_BASICO/BLOQUE_04_5_VENTILACION_BVM.md",
        ],
    },
    
    "BLOQUE_06_7_FARMACOS_NEUROLOGICOS_METABOLICOS.md": {
        "prerrequisitos": [
            "BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION.md",
            "BLOQUE_06_1_DEL_VIAL_A_LA_VENA.md",
        ],
        "relacionados": [
            "../02_PROCEDIMIENTOS_BASICOS/1.3_glasgow_operativo.md",
        ],
    },
    
    # BLOQUE 7 - TRIAGE
    "BLOQUE_07_1_FUNDAMENTOS_TRIAGE.md": {
        "prerrequisitos": [
            "../02_PROCEDIMIENTOS_BASICOS/1.4_triage_start.md",
        ],
        "relacionados": [
            "BLOQUE_07_2_METODO_START.md",
            "BLOQUE_07_3_ETIQUETADO_ZONIFICACION.md",
        ],
        "continuacion": [
            "BLOQUE_07_2_METODO_START.md",
        ],
    },
    
    "BLOQUE_07_2_METODO_START.md": {
        "prerrequisitos": [
            "BLOQUE_07_1_FUNDAMENTOS_TRIAGE.md",
            "../02_PROCEDIMIENTOS_BASICOS/1.4_triage_start.md",
        ],
        "relacionados": [
            "BLOQUE_07_3_ETIQUETADO_ZONIFICACION.md",
            "BLOQUE_07_4_ROLES_FUNCIONES_TES_TMV.md",
        ],
        "continuacion": [
            "BLOQUE_07_3_ETIQUETADO_ZONIFICACION.md",
        ],
    },
    
    "BLOQUE_07_3_ETIQUETADO_ZONIFICACION.md": {
        "prerrequisitos": [
            "BLOQUE_07_2_METODO_START.md",
        ],
        "relacionados": [
            "BLOQUE_07_4_ROLES_FUNCIONES_TES_TMV.md",
            "BLOQUE_07_5_RE_TRIAGE_EVACUACION.md",
        ],
        "continuacion": [
            "BLOQUE_07_4_ROLES_FUNCIONES_TES_TMV.md",
        ],
    },
    
    "BLOQUE_07_4_ROLES_FUNCIONES_TES_TMV.md": {
        "prerrequisitos": [
            "BLOQUE_07_3_ETIQUETADO_ZONIFICACION.md",
        ],
        "relacionados": [
            "BLOQUE_07_5_RE_TRIAGE_EVACUACION.md",
        ],
    },
    
    "BLOQUE_07_5_RE_TRIAGE_EVACUACION.md": {
        "prerrequisitos": [
            "BLOQUE_07_4_ROLES_FUNCIONES_TES_TMV.md",
        ],
        "relacionados": [
            "../08_TRANSFERENCIA_Y_TRASLADO/BLOQUE_08_1_PREPARACION_TRASLADO.md",
        ],
    },
    
    # BLOQUE 8 - TRANSFERENCIA
    "BLOQUE_08_2_GESTION_DURANTE_TRASLADO.md": {
        "prerrequisitos": [
            "BLOQUE_08_0_FUNDAMENTOS_TRANSFERENCIA.md",
            "BLOQUE_08_1_PREPARACION_TRASLADO.md",
        ],
        "relacionados": [
            "BLOQUE_08_1_PREPARACION_TRASLADO.md",
            "BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md",
            "BLOQUE_08_4_DOCUMENTACION_TRASLADO.md",
        ],
        "continuacion": [
            "BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md",
        ],
    },
    
    "BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md": {
        "prerrequisitos": [
            "BLOQUE_08_2_GESTION_DURANTE_TRASLADO.md",
        ],
        "relacionados": [
            "../06_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_0_COMUNICACION_TRANSTELEFONICA_FUNDAMENTAL.md",
            "BLOQUE_08_4_DOCUMENTACION_TRASLADO.md",
        ],
        "continuacion": [
            "BLOQUE_08_4_DOCUMENTACION_TRASLADO.md",
        ],
    },
    
    "BLOQUE_08_4_DOCUMENTACION_TRASLADO.md": {
        "prerrequisitos": [
            "BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md",
        ],
        "relacionados": [
            "BLOQUE_08_5_TRANSFERENCIA_AL_HOSPITAL.md",
        ],
        "continuacion": [
            "BLOQUE_08_5_TRANSFERENCIA_AL_HOSPITAL.md",
        ],
    },
    
    "BLOQUE_08_5_TRANSFERENCIA_AL_HOSPITAL.md": {
        "prerrequisitos": [
            "BLOQUE_08_4_DOCUMENTACION_TRASLADO.md",
        ],
        "relacionados": [
            "BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md",
        ],
    },
}


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


def obtener_nombre_legible(ruta: str) -> str:
    """Convierte ruta de archivo a nombre legible"""
    nombre = Path(ruta).stem
    # Reemplazar prefijos comunes
    nombre = nombre.replace("BLOQUE_", "")
    nombre = nombre.replace("_", " ")
    # Capitalizar palabras
    palabras = nombre.split()
    nombre = " ".join(palabra.capitalize() for palabra in palabras)
    return nombre


def generar_seccion_enlaces(archivo: Path, relaciones: Dict[str, List[str]]) -> str:
    """Genera la sección de enlaces en formato Markdown"""
    directorio_actual = archivo.parent
    
    seccion = "\n---\n\n## 🔗 Enlaces recomendados / Guía de referencia\n\n"
    
    # Prerrequisitos
    if relaciones.get("prerrequisitos"):
        seccion += "### Prerrequisitos\n\n"
        for rel in relaciones["prerrequisitos"]:
            ruta = encontrar_archivo(rel, directorio_actual) or rel
            nombre = obtener_nombre_legible(rel)
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Relacionados
    if relaciones.get("relacionados"):
        seccion += "### Capítulos relacionados\n\n"
        for rel in relaciones["relacionados"]:
            ruta = encontrar_archivo(rel, directorio_actual) or rel
            nombre = obtener_nombre_legible(rel)
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Aplicación práctica
    if relaciones.get("aplicacion"):
        seccion += "### Aplicación práctica\n\n"
        for rel in relaciones["aplicacion"]:
            ruta = rel
            nombre = obtener_nombre_legible(rel)
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Continuación
    if relaciones.get("continuacion"):
        seccion += "### Continuación\n\n"
        for rel in relaciones["continuacion"]:
            ruta = encontrar_archivo(rel, directorio_actual) or rel
            nombre = obtener_nombre_legible(rel)
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    # Protocolos transtelefónicos
    if relaciones.get("transtelefonico"):
        seccion += "### Protocolos transtelefónicos\n\n"
        for rel in relaciones["transtelefonico"]:
            ruta = rel
            nombre = obtener_nombre_legible(rel)
            seccion += f"- [{nombre}]({ruta})\n"
        seccion += "\n"
    
    return seccion.rstrip() + "\n"


def añadir_enlaces_a_archivo(archivo: Path, relaciones: Dict[str, List[str]]) -> bool:
    """Añade enlaces de referencia a un archivo Markdown"""
    if not archivo.exists():
        return False
    
    contenido = archivo.read_text(encoding='utf-8')
    
    # Verificar si ya tiene sección de enlaces
    if "## 🔗 Enlaces recomendados" in contenido:
        # Actualizar enlaces existentes si hay relaciones nuevas
        return False
    
    # Buscar el final del archivo
    lineas = contenido.rstrip().split('\n')
    
    # Buscar última línea con contenido
    ultima_linea_contenido = len(lineas) - 1
    while ultima_linea_contenido >= 0 and not lineas[ultima_linea_contenido].strip():
        ultima_linea_contenido -= 1
    
    # Generar sección de enlaces
    seccion_enlaces = generar_seccion_enlaces(archivo, relaciones)
    
    # Insertar antes de la última línea
    if ultima_linea_contenido >= 0:
        lineas.insert(ultima_linea_contenido + 1, seccion_enlaces)
    else:
        lineas.append(seccion_enlaces)
    
    nuevo_contenido = '\n'.join(lineas)
    
    # Guardar
    archivo.write_text(nuevo_contenido, encoding='utf-8')
    return True


def main():
    """Función principal"""
    print("=" * 70)
    print("🔗 AÑADIR ENLACES DE REFERENCIA A TODOS LOS CAPÍTULOS")
    print("=" * 70)
    print()
    
    añadidos = 0
    omitidos = 0
    ya_tienen = 0
    
    # Buscar todos los archivos .md del manual (excluyendo documentación)
    archivos_manual = []
    for subdir in MANUAL_DIR.rglob("*.md"):
        if "_DOCUMENTACION_PROYECTO" not in str(subdir):
            archivos_manual.append(subdir)
    
    print(f"📋 Encontrados {len(archivos_manual)} archivos del manual")
    print()
    
    # Procesar cada archivo
    for archivo in sorted(archivos_manual):
        nombre_archivo = archivo.name
        relaciones = RELACIONES_COMPLETAS.get(nombre_archivo, {})
        
        # Si no tiene relaciones definidas, crear relaciones básicas
        if not relaciones:
            # Intentar crear relaciones básicas basadas en el bloque
            relaciones = crear_relaciones_basicas(archivo)
        
        if relaciones:
            if añadir_enlaces_a_archivo(archivo, relaciones):
                añadidos += 1
                print(f"✅ {nombre_archivo}")
            else:
                ya_tienen += 1
        else:
            omitidos += 1
    
    print()
    print("=" * 70)
    print(f"📊 RESUMEN: {añadidos} añadidos, {ya_tienen} ya tenían, {omitidos} sin relaciones")
    print("=" * 70)


def crear_relaciones_basicas(archivo: Path) -> Dict[str, List[str]]:
    """Crea relaciones básicas basadas en la ubicación del archivo"""
    relaciones = {}
    directorio = archivo.parent
    
    # Buscar archivos en el mismo directorio (relacionados)
    archivos_mismo_dir = [f for f in directorio.glob("*.md") if f != archivo]
    if archivos_mismo_dir:
        relaciones["relacionados"] = [f.name for f in sorted(archivos_mismo_dir)[:5]]
    
    return relaciones


if __name__ == "__main__":
    main()
