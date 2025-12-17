// Índice del Manual TES Digital
// Generado automáticamente desde estructura de archivos
// Fecha: 2025-12-17

export interface Capitulo {
  id: string;
  titulo: string;
  parte: number;
  parteNombre: string;
  bloque: number;
  bloqueNombre: string;
  rutaArchivo: string;
  rutaUrl: string;
  nivelDificultad: 'basico' | 'intermedio' | 'avanzado';
  importancia: 'alta' | 'media' | 'baja';
  palabrasClave: string[];
  tipoContenido: 'formativo' | 'operativo' | 'referencia';
  tiempoLectura: number;
  navegacion: {
    anterior: string | null;
    siguiente: string | null;
    relacionados: string[];
  };
  metadata: {
    version: string;
    fechaActualizacion: string;
    autor: string;
  };
}

export interface Bloque {
  id: number;
  nombre: string;
  descripcion: string;
  icono?: string;
  capitulos: Capitulo[];
}

export interface Parte {
  id: number;
  nombre: string;
  descripcion: string;
  icono?: string;
  bloques: Bloque[];
}

export const manualIndex: Parte[] = [
  {
    id: 1,
    nombre: "Fundamentos y Evaluación Inicial",
    descripcion: "",
    icono: "BookOpen",
    bloques: [
      {
        id: 0,
        nombre: "Fundamentos de Emergencias Prehospitalarias",
        descripcion: "",
        icono: "BookOpen",
        capitulos: [
          {
            id: "1.1.1",
            titulo: "Fundamentos de Emergencias",
            parte: 1,
            parteNombre: "Fundamentos y Evaluación Inicial",
            bloque: 0,
            bloqueNombre: "Fundamentos de Emergencias Prehospitalarias",
            rutaArchivo: "/manual/BLOQUE_0_FUNDAMENTOS/BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md",
            rutaUrl: "/manual/parte-i-fundamentos/bloque-0-fundamentos/1.1.1",
            nivelDificultad: "basico",
            importancia: "alta",
            palabrasClave: ["emergencia"],
            tipoContenido: "formativo",
            tiempoLectura: 19,
            navegacion: {
              anterior: null,
              siguiente: "1.2.1",
              relacionados: ["1.2.1", "1.2.2", "1.2.3", "1.2.4"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
      {
        id: 1,
        nombre: "Procedimientos Básicos",
        descripcion: "",
        icono: "ClipboardCheck",
        capitulos: [
          {
            id: "1.2.1",
            titulo: "Constantes Vitales",
            parte: 1,
            parteNombre: "Fundamentos y Evaluación Inicial",
            bloque: 1,
            bloqueNombre: "Procedimientos Básicos",
            rutaArchivo: "/manual/BLOQUE_1_PROCEDIMIENTOS_BASICOS/BLOQUE_01_1_CONSTANTES_VITALES.md",
            rutaUrl: "/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.1",
            nivelDificultad: "basico",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 10,
            navegacion: {
              anterior: "1.1.1",
              siguiente: "1.2.2",
              relacionados: ["1.1.1", "1.2.2", "1.2.3", "1.2.4"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "1.2.2",
            titulo: "ABCDE Operativo",
            parte: 1,
            parteNombre: "Fundamentos y Evaluación Inicial",
            bloque: 1,
            bloqueNombre: "Procedimientos Básicos",
            rutaArchivo: "/manual/BLOQUE_1_PROCEDIMIENTOS_BASICOS/BLOQUE_01_2_ABCDE_OPERATIVO.md",
            rutaUrl: "/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.2",
            nivelDificultad: "basico",
            importancia: "alta",
            palabrasClave: ["abcde"],
            tipoContenido: "operativo",
            tiempoLectura: 8,
            navegacion: {
              anterior: "1.2.1",
              siguiente: "1.2.3",
              relacionados: ["1.1.1", "1.2.1", "1.2.3", "1.2.4"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "1.2.3",
            titulo: "Glasgow Operativo",
            parte: 1,
            parteNombre: "Fundamentos y Evaluación Inicial",
            bloque: 1,
            bloqueNombre: "Procedimientos Básicos",
            rutaArchivo: "/manual/BLOQUE_1_PROCEDIMIENTOS_BASICOS/BLOQUE_01_3_GLASGOW_OPERATIVO.md",
            rutaUrl: "/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.3",
            nivelDificultad: "basico",
            importancia: "alta",
            palabrasClave: ["glasgow"],
            tipoContenido: "operativo",
            tiempoLectura: 9,
            navegacion: {
              anterior: "1.2.2",
              siguiente: "1.2.4",
              relacionados: ["1.1.1", "1.2.1", "1.2.2", "1.2.4"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "1.2.4",
            titulo: "Triage START",
            parte: 1,
            parteNombre: "Fundamentos y Evaluación Inicial",
            bloque: 1,
            bloqueNombre: "Procedimientos Básicos",
            rutaArchivo: "/manual/BLOQUE_1_PROCEDIMIENTOS_BASICOS/BLOQUE_01_4_TRIAGE_START.md",
            rutaUrl: "/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.4",
            nivelDificultad: "basico",
            importancia: "alta",
            palabrasClave: ["triage"],
            tipoContenido: "operativo",
            tiempoLectura: 7,
            navegacion: {
              anterior: "1.2.3",
              siguiente: "2.1.1",
              relacionados: ["1.1.1", "1.2.1", "1.2.2", "1.2.3"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
  {
    id: 2,
    nombre: "Soporte Vital y Procedimientos Críticos",
    descripcion: "",
    icono: "Heart",
    bloques: [
      {
        id: 4,
        nombre: "Soporte Vital Básico y RCP",
        descripcion: "",
        icono: "Heart",
        capitulos: [
          {
            id: "2.1.1",
            titulo: "Acceso Vascular Básico",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_0_ACCESO_VASCULAR_BASICO.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.1",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 14,
            navegacion: {
              anterior: "1.2.4",
              siguiente: "2.1.10",
              relacionados: ["2.1.2", "2.1.3", "2.1.4", "2.1.5", "2.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.10",
            titulo: "OVACE Lactantes",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_8_OVACE_LACTANTES.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.10",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: ["ovace"],
            tipoContenido: "operativo",
            tiempoLectura: 21,
            navegacion: {
              anterior: "2.1.1",
              siguiente: "2.1.11",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.11",
            titulo: "Posición Lateral de Seguridad",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.11",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 15,
            navegacion: {
              anterior: "2.1.10",
              siguiente: "2.1.2",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.2",
            titulo: "Reconocimiento PCR",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_0B_RECONOCIMIENTO_PCR.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.2",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 13,
            navegacion: {
              anterior: "2.1.11",
              siguiente: "2.1.3",
              relacionados: ["2.1.1", "2.1.3", "2.1.4", "2.1.5", "2.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.3",
            titulo: "RCP Adultos",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_1_RCP_ADULTOS.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.3",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: ["rcp"],
            tipoContenido: "operativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "2.1.2",
              siguiente: "2.1.4",
              relacionados: ["2.1.1", "2.1.2", "2.1.4", "2.1.5", "2.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.4",
            titulo: "RCP Pediatría",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_2_RCP_PEDIATRIA.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.4",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: ["rcp"],
            tipoContenido: "operativo",
            tiempoLectura: 16,
            navegacion: {
              anterior: "2.1.3",
              siguiente: "2.1.5",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.5", "2.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.5",
            titulo: "RCP Lactantes",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_3_RCP_LACTANTES.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.5",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: ["rcp"],
            tipoContenido: "operativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "2.1.4",
              siguiente: "2.1.6",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.6",
            titulo: "Uso DESA",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_4_USO_DESA.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.6",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 19,
            navegacion: {
              anterior: "2.1.5",
              siguiente: "2.1.7",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.7",
            titulo: "RCP Dos Intervinientes",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_5_RCP_DOS_INTERVINIENTES.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.7",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: ["rcp"],
            tipoContenido: "operativo",
            tiempoLectura: 16,
            navegacion: {
              anterior: "2.1.6",
              siguiente: "2.1.8",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.8",
            titulo: "OVACE Adultos",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_6_OVACE_ADULTOS.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.8",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: ["ovace"],
            tipoContenido: "operativo",
            tiempoLectura: 16,
            navegacion: {
              anterior: "2.1.7",
              siguiente: "2.1.9",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "2.1.9",
            titulo: "OVACE Pediatría",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 4,
            bloqueNombre: "Soporte Vital Básico y RCP",
            rutaArchivo: "/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_7_OVACE_PEDIATRIA.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-4-rcp/2.1.9",
            nivelDificultad: "avanzado",
            importancia: "alta",
            palabrasClave: ["ovace"],
            tipoContenido: "operativo",
            tiempoLectura: 20,
            navegacion: {
              anterior: "2.1.8",
              siguiente: "2.2.1",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
      {
        id: 9,
        nombre: "Medicina de Emergencias Aplicada",
        descripcion: "",
        icono: "Stethoscope",
        capitulos: [
          {
            id: "2.2.1",
            titulo: "Medicina de Emergencias Aplicada",
            parte: 2,
            parteNombre: "Soporte Vital y Procedimientos Críticos",
            bloque: 9,
            bloqueNombre: "Medicina de Emergencias Aplicada",
            rutaArchivo: "/manual/BLOQUE_9_MEDICINA_EMERGENCIAS_APLICADA/BLOQUE_09_0_MEDICINA_EMERGENCIAS_APLICADA.md",
            rutaUrl: "/manual/parte-ii-soporte-vital/bloque-9-medicina-emergencias/2.2.1",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: ["emergencia"],
            tipoContenido: "formativo",
            tiempoLectura: 15,
            navegacion: {
              anterior: "2.1.9",
              siguiente: "3.1.1",
              relacionados: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
  {
    id: 3,
    nombre: "Material y Equipamiento",
    descripcion: "",
    icono: "Package",
    bloques: [
      {
        id: 2,
        nombre: "Material e Inmovilización",
        descripcion: "",
        icono: "Package",
        capitulos: [
          {
            id: "3.1.1",
            titulo: "Anatomía Operativa",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_0_ANATOMIA_OPERATIVA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.1",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "2.2.1",
              siguiente: "3.1.10",
              relacionados: ["3.1.2", "3.1.3", "3.1.4", "3.1.5", "3.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.10",
            titulo: "Férulas",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_10_FERULAS.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.10",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 19,
            navegacion: {
              anterior: "3.1.1",
              siguiente: "3.1.11",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.11",
            titulo: "Cinturón Pélvico",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_11_CINTURON_PELVICO.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.11",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "3.1.10",
              siguiente: "3.1.12",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.12",
            titulo: "Férula de Tracción",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_12_FERULA_TRACCION.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.12",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 16,
            navegacion: {
              anterior: "3.1.11",
              siguiente: "3.1.13",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.13",
            titulo: "Camillas y Sillas de Evacuación",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_13_CAMILLAS_SILLAS_EVACUACION.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.13",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "3.1.12",
              siguiente: "3.1.14",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.14",
            titulo: "Inventario de Material",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_X_INVENTARIO_MATERIAL.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.14",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "3.1.13",
              siguiente: "3.1.2",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.2",
            titulo: "Inmovilización Manual",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_2_INMOVILIZACION_MANUAL.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.2",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "3.1.14",
              siguiente: "3.1.3",
              relacionados: ["3.1.1", "3.1.3", "3.1.4", "3.1.5", "3.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.3",
            titulo: "Collarín Cervical",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_3_COLLARIN_CERVICAL.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.3",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 20,
            navegacion: {
              anterior: "3.1.2",
              siguiente: "3.1.4",
              relacionados: ["3.1.1", "3.1.2", "3.1.4", "3.1.5", "3.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.4",
            titulo: "Camilla Cuchara",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_4_CAMILLA_CUCHARA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.4",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 10,
            navegacion: {
              anterior: "3.1.3",
              siguiente: "3.1.5",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.5", "3.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.5",
            titulo: "Tablero Espinal",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_5_TABLERO_ESPINAL.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.5",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "3.1.4",
              siguiente: "3.1.6",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.6",
            titulo: "Colchón Vacío",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_6_COLCHON_VACIO.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.6",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "3.1.5",
              siguiente: "3.1.7",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.7",
            titulo: "Extricación y Movimientos en Bloque",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.7",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 10,
            navegacion: {
              anterior: "3.1.6",
              siguiente: "3.1.8",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.8",
            titulo: "Transferencias y Movilización",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.8",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 15,
            navegacion: {
              anterior: "3.1.7",
              siguiente: "3.1.9",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.1.9",
            titulo: "Errores Críticos",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 2,
            bloqueNombre: "Material e Inmovilización",
            rutaArchivo: "/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_9_ERRORES_CRITICOS.md",
            rutaUrl: "/manual/parte-iii-material/bloque-2-inmovilizacion/3.1.9",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 10,
            navegacion: {
              anterior: "3.1.8",
              siguiente: "3.2.1",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
      {
        id: 3,
        nombre: "Material Sanitario y Oxigenoterapia",
        descripcion: "",
        icono: "Wind",
        capitulos: [
          {
            id: "3.2.1",
            titulo: "Oxigenoterapia Básica",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.1",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: ["oxigenoterapia"],
            tipoContenido: "operativo",
            tiempoLectura: 12,
            navegacion: {
              anterior: "3.1.9",
              siguiente: "3.2.10",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.10",
            titulo: "Control de Hemorragias",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_6_CONTROL_HEMORRAGIAS.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.10",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 18,
            navegacion: {
              anterior: "3.2.1",
              siguiente: "3.2.11",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.11",
            titulo: "Quemaduras",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_7_QUEMADURAS.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.11",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 16,
            navegacion: {
              anterior: "3.2.10",
              siguiente: "3.2.12",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.12",
            titulo: "Heridas y Vendajes",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_8_HERIDAS_VENDAJES.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.12",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 18,
            navegacion: {
              anterior: "3.2.11",
              siguiente: "3.2.13",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.13",
            titulo: "Exposición y Aislamiento Térmico",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_9_EXPOSICION_AISLAMIENTO_TERMICO.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.13",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "3.2.12",
              siguiente: "3.2.14",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.14",
            titulo: "Monitorización Básica",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_10_MONITORIZACION_BASICA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.14",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "3.2.13",
              siguiente: "3.2.15",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.15",
            titulo: "Glucometro",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_11_GLUCOMETRO.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.15",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 9,
            navegacion: {
              anterior: "3.2.14",
              siguiente: "3.2.16",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.16",
            titulo: "Termometría",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_12_TERMOMETRIA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.16",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 8,
            navegacion: {
              anterior: "3.2.15",
              siguiente: "3.2.17",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.17",
            titulo: "Confort y Dolor",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_13_CONFORT_DOLOR.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.17",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "3.2.16",
              siguiente: "3.2.18",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.18",
            titulo: "Bioseguridad y Descontaminación",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_14_BIOSEGURIDAD_DESCONTAMINACION.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.18",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 10,
            navegacion: {
              anterior: "3.2.17",
              siguiente: "3.2.19",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.19",
            titulo: "Gestión de Material en Escena",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_15_GESTION_MATERIAL_ESCENA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.19",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 9,
            navegacion: {
              anterior: "3.2.18",
              siguiente: "3.2.2",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.2",
            titulo: "Oxigenoterapia - Fundamentos",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_0B_OXIGENOTERAPIA_FUNDAMENTOS.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.2",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: ["oxigenoterapia"],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "3.2.19",
              siguiente: "3.2.20",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.20",
            titulo: "Comunicación Operativa",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_16_COMUNICACION_OPERATIVA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.20",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 7,
            navegacion: {
              anterior: "3.2.2",
              siguiente: "3.2.21",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.21",
            titulo: "Señalización e Iluminación",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_17_SENALIZACION_ILUMINACION.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.21",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 8,
            navegacion: {
              anterior: "3.2.20",
              siguiente: "3.2.22",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.22",
            titulo: "Documentación Operativa",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_18_DOCUMENTACION_OPERATIVA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.22",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 8,
            navegacion: {
              anterior: "3.2.21",
              siguiente: "3.2.23",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.23",
            titulo: "Cierre Bloque 3",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_99_CIERRE_BLOQUE_3.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.23",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "3.2.22",
              siguiente: "3.2.24",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.24",
            titulo: "Inventario Material Sanitario",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_X_INVENTARIO_MATERIAL_SANITARIO.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.24",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "3.2.23",
              siguiente: "3.2.25",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.25",
            titulo: "Maletín de Curas",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_X2_MALETIN_CURAS.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.25",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 7,
            navegacion: {
              anterior: "3.2.24",
              siguiente: "3.2.26",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.26",
            titulo: "Bolsa de Monitorización",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_X3_BOLSA_MONITORIZACION.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.26",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "3.2.25",
              siguiente: "3.2.27",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.27",
            titulo: "Inventario Global",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_X4_INVENTARIO_GLOBAL.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.27",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "3.2.26",
              siguiente: "3.2.28",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.28",
            titulo: "Checklist Maestro",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_X5_CHECKLIST_MAESTRO.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.28",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "3.2.27",
              siguiente: "3.2.3",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.3",
            titulo: "Dispositivos de Oxigenoterapia",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.3",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: ["oxigenoterapia"],
            tipoContenido: "operativo",
            tiempoLectura: 18,
            navegacion: {
              anterior: "3.2.28",
              siguiente: "3.2.4",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.4",
            titulo: "Ventilación con Bolsa-Mascarilla",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.4",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 10,
            navegacion: {
              anterior: "3.2.3",
              siguiente: "3.2.5",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.5",
            titulo: "Aspiración",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_2_ASPIRACION.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.5",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "3.2.4",
              siguiente: "3.2.6",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.6",
            titulo: "Cánula Orofaringea",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_2B_CANULA_OROFARINGEA.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.6",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 13,
            navegacion: {
              anterior: "3.2.5",
              siguiente: "3.2.7",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.7",
            titulo: "BVM (Bolsa Válvula Mascarilla)",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_3_BVM.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.7",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "3.2.6",
              siguiente: "3.2.8",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.8",
            titulo: "Cánulas",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_4_CANULAS.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.8",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 15,
            navegacion: {
              anterior: "3.2.7",
              siguiente: "3.2.9",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "3.2.9",
            titulo: "Organización del Maletín",
            parte: 3,
            parteNombre: "Material y Equipamiento",
            bloque: 3,
            bloqueNombre: "Material Sanitario y Oxigenoterapia",
            rutaArchivo: "/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_5_ORGANIZACION_MALETIN.md",
            rutaUrl: "/manual/parte-iii-material/bloque-3-oxigenoterapia/3.2.9",
            nivelDificultad: "intermedio",
            importancia: "alta",
            palabrasClave: [],
            tipoContenido: "operativo",
            tiempoLectura: 15,
            navegacion: {
              anterior: "3.2.8",
              siguiente: "4.1.1",
              relacionados: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
  {
    id: 4,
    nombre: "Farmacología y Medicamentos",
    descripcion: "",
    icono: "Pill",
    bloques: [
      {
        id: 6,
        nombre: "Farmacología y Vademécum Operativo",
        descripcion: "",
        icono: "Pill",
        capitulos: [
          {
            id: "4.1.1",
            titulo: "Principios de Administración de Fármacos",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION_FARMACOS.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "3.2.9",
              siguiente: "4.1.2",
              relacionados: ["4.1.2", "4.1.3", "4.1.4", "4.1.5", "4.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "4.1.2",
            titulo: "Vademécum Operativo",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_1_VADEMECUM_OPERATIVO.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.2",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "4.1.1",
              siguiente: "4.1.3",
              relacionados: ["4.1.1", "4.1.3", "4.1.4", "4.1.5", "4.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "4.1.3",
            titulo: "Oxígeno - Administración y Seguridad",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_2_OXIGENO_ADMINISTRACION_Y_SEGURIDAD.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.3",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "4.1.2",
              siguiente: "4.1.4",
              relacionados: ["4.1.1", "4.1.2", "4.1.4", "4.1.5", "4.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "4.1.4",
            titulo: "Adrenalina - Uso en Anafilaxia y RCP",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_3_ADRENALINA_USO_ANAFILAXIA_Y_RCP.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.4",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: ["rcp"],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "4.1.3",
              siguiente: "4.1.5",
              relacionados: ["4.1.1", "4.1.2", "4.1.3", "4.1.5", "4.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "4.1.5",
            titulo: "Aspirina - Uso en SCA",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_4_ASPIRINA_USO_SCA.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.5",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "4.1.4",
              siguiente: "4.1.6",
              relacionados: ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "4.1.6",
            titulo: "Glucagón - Uso en Hipoglucemia",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_5_GLUCAGON_USO_HIPOGLUCEMIA.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.6",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "4.1.5",
              siguiente: "4.1.7",
              relacionados: ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "4.1.7",
            titulo: "Salbutamol - Uso en Crisis Asmática",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_6_SALBUTAMOL_USO_CRISIS_ASMATICA.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.7",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "4.1.6",
              siguiente: "4.1.8",
              relacionados: ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "4.1.8",
            titulo: "Abreviaturas y Terminología Farmacológica",
            parte: 4,
            parteNombre: "Farmacología y Medicamentos",
            bloque: 6,
            bloqueNombre: "Farmacología y Vademécum Operativo",
            rutaArchivo: "/manual/BLOQUE_6_FARMACOLOGIA/BLOQUE_06_7_ABREVIATURAS_TERMINOLOGIA_FARMACOLOGICA.md",
            rutaUrl: "/manual/parte-iv-farmacologia/bloque-6-farmacologia/4.1.8",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "4.1.7",
              siguiente: "5.1.1",
              relacionados: ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
  {
    id: 5,
    nombre: "Protocolos y Gestión Operativa",
    descripcion: "",
    icono: "Phone",
    bloques: [
      {
        id: 5,
        nombre: "Protocolos Transtelefónicos",
        descripcion: "",
        icono: "Phone",
        capitulos: [
          {
            id: "5.1.1",
            titulo: "Introducción a Protocolos Transtelefónicos",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_0_INTRODUCCION_PROTOCOLOS_TRANSTELEFONICOS.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.1",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: ["protocolo"],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "4.1.8",
              siguiente: "5.1.10",
              relacionados: ["5.1.2", "5.1.3", "5.1.4", "5.1.5", "5.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.10",
            titulo: "Comunicación con Coordinador",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_8_COMUNICACION_COORDINADOR.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.10",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.1",
              siguiente: "5.1.2",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.2",
            titulo: "Protocolos de Emergencias Específicas",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_0B_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.2",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: ["protocolo", "emergencia"],
            tipoContenido: "formativo",
            tiempoLectura: 15,
            navegacion: {
              anterior: "5.1.10",
              siguiente: "5.1.3",
              relacionados: ["5.1.1", "5.1.3", "5.1.4", "5.1.5", "5.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.3",
            titulo: "PCR Transtelefónica",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_1_PCR_TRANSTELEFONICA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.3",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.2",
              siguiente: "5.1.4",
              relacionados: ["5.1.1", "5.1.2", "5.1.4", "5.1.5", "5.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.4",
            titulo: "OVACE Transtelefónica",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_2_OVACE_TRANSTELEFONICA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.4",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: ["ovace"],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.3",
              siguiente: "5.1.5",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.5", "5.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.5",
            titulo: "SCA Transtelefónico",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_3_SCA_TRANSTELEFONICO.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.5",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.4",
              siguiente: "5.1.6",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.6",
            titulo: "ICTUS Transtelefónico",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_4_ICTUS_TRANSTELEFONICO.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.6",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.5",
              siguiente: "5.1.7",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.7",
            titulo: "Anafilaxia Transtelefónica",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_5_ANAFILAXIA_TRANSTELEFONICA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.7",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.6",
              siguiente: "5.1.8",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.8",
            titulo: "Crisis Asmática Transtelefónica",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_6_CRISIS_ASMATICA_TRANSTELEFONICA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.8",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.7",
              siguiente: "5.1.9",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.1.9",
            titulo: "Hipoglucemia Transtelefónica",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 5,
            bloqueNombre: "Protocolos Transtelefónicos",
            rutaArchivo: "/manual/BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_7_HIPOGLUCEMIA_TRANSTELEFONICA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-5-transtelefonicos/5.1.9",
            nivelDificultad: "avanzado",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.8",
              siguiente: "5.2.1",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
      {
        id: 8,
        nombre: "Gestión Operativa y Documentación",
        descripcion: "",
        icono: "FileText",
        capitulos: [
          {
            id: "5.2.1",
            titulo: "Introducción a Gestión Operativa",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 8,
            bloqueNombre: "Gestión Operativa y Documentación",
            rutaArchivo: "/manual/BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/BLOQUE_08_0_INTRODUCCION_GESTION_OPERATIVA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-8-gestion/5.2.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.1.9",
              siguiente: "5.2.2",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.2.2",
            titulo: "Documentación Clínica Prehospitalaria",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 8,
            bloqueNombre: "Gestión Operativa y Documentación",
            rutaArchivo: "/manual/BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/BLOQUE_08_1_DOCUMENTACION_CLINICA_PREHOSPITALARIA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-8-gestion/5.2.2",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 5,
            navegacion: {
              anterior: "5.2.1",
              siguiente: "5.2.3",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.2.3",
            titulo: "Coordinación y Comunicación Operativa",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 8,
            bloqueNombre: "Gestión Operativa y Documentación",
            rutaArchivo: "/manual/BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/BLOQUE_08_2_COORDINACION_Y_COMUNICACION_OPERATIVA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-8-gestion/5.2.3",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "5.2.2",
              siguiente: "5.2.4",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.2.4",
            titulo: "Gestión de Recursos y Material",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 8,
            bloqueNombre: "Gestión Operativa y Documentación",
            rutaArchivo: "/manual/BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/BLOQUE_08_3_GESTION_RECURSOS_Y_MATERIAL.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-8-gestion/5.2.4",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "5.2.3",
              siguiente: "5.2.5",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "5.2.5",
            titulo: "Calidad y Mejora Continua",
            parte: 5,
            parteNombre: "Protocolos y Gestión Operativa",
            bloque: 8,
            bloqueNombre: "Gestión Operativa y Documentación",
            rutaArchivo: "/manual/BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/BLOQUE_08_4_CALIDAD_Y_MEJORA_CONTINUA.md",
            rutaUrl: "/manual/parte-v-protocolos/bloque-8-gestion/5.2.5",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 7,
            navegacion: {
              anterior: "5.2.4",
              siguiente: "6.1.1",
              relacionados: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
  {
    id: 6,
    nombre: "Conducción y Seguridad Vial",
    descripcion: "",
    icono: "Car",
    bloques: [
      {
        id: 7,
        nombre: "Conducción y Seguridad Vial",
        descripcion: "",
        icono: "Car",
        capitulos: [
          {
            id: "6.1.1",
            titulo: "Fundamentos de Conducción en Urgencias",
            parte: 6,
            parteNombre: "Conducción y Seguridad Vial",
            bloque: 7,
            bloqueNombre: "Conducción y Seguridad Vial",
            rutaArchivo: "/manual/BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/BLOQUE_07_0_FUNDAMENTOS_CONDUCCION_URGENCIAS.md",
            rutaUrl: "/manual/parte-vi-conduccion/bloque-7-conduccion/6.1.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 9,
            navegacion: {
              anterior: "5.2.5",
              siguiente: "6.1.2",
              relacionados: ["6.1.2", "6.1.3", "6.1.4", "6.1.5", "6.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "6.1.2",
            titulo: "Uso de Luces y Sirena",
            parte: 6,
            parteNombre: "Conducción y Seguridad Vial",
            bloque: 7,
            bloqueNombre: "Conducción y Seguridad Vial",
            rutaArchivo: "/manual/BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/BLOQUE_07_1_USO_LUCES_Y_SIRENA.md",
            rutaUrl: "/manual/parte-vi-conduccion/bloque-7-conduccion/6.1.2",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 12,
            navegacion: {
              anterior: "6.1.1",
              siguiente: "6.1.3",
              relacionados: ["6.1.1", "6.1.3", "6.1.4", "6.1.5", "6.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "6.1.3",
            titulo: "Técnicas de Conducción en Emergencias",
            parte: 6,
            parteNombre: "Conducción y Seguridad Vial",
            bloque: 7,
            bloqueNombre: "Conducción y Seguridad Vial",
            rutaArchivo: "/manual/BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/BLOQUE_07_2_TECNICAS_CONDUCCION_EMERGENCIAS.md",
            rutaUrl: "/manual/parte-vi-conduccion/bloque-7-conduccion/6.1.3",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: ["emergencia"],
            tipoContenido: "formativo",
            tiempoLectura: 13,
            navegacion: {
              anterior: "6.1.2",
              siguiente: "6.1.4",
              relacionados: ["6.1.1", "6.1.2", "6.1.4", "6.1.5", "6.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "6.1.4",
            titulo: "Seguridad Vial y Prevención de Accidentes",
            parte: 6,
            parteNombre: "Conducción y Seguridad Vial",
            bloque: 7,
            bloqueNombre: "Conducción y Seguridad Vial",
            rutaArchivo: "/manual/BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/BLOQUE_07_3_SEGURIDAD_VIAL_Y_PREVENCION_ACCIDENTES.md",
            rutaUrl: "/manual/parte-vi-conduccion/bloque-7-conduccion/6.1.4",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "6.1.3",
              siguiente: "6.1.5",
              relacionados: ["6.1.1", "6.1.2", "6.1.3", "6.1.5", "6.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "6.1.5",
            titulo: "Gestión de Rutas y Navegación",
            parte: 6,
            parteNombre: "Conducción y Seguridad Vial",
            bloque: 7,
            bloqueNombre: "Conducción y Seguridad Vial",
            rutaArchivo: "/manual/BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/BLOQUE_07_4_GESTION_RUTAS_Y_NAVEGACION.md",
            rutaUrl: "/manual/parte-vi-conduccion/bloque-7-conduccion/6.1.5",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 6,
            navegacion: {
              anterior: "6.1.4",
              siguiente: "6.1.6",
              relacionados: ["6.1.1", "6.1.2", "6.1.3", "6.1.4", "6.1.6"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
          {
            id: "6.1.6",
            titulo: "Protocolos de Seguridad en Escena",
            parte: 6,
            parteNombre: "Conducción y Seguridad Vial",
            bloque: 7,
            bloqueNombre: "Conducción y Seguridad Vial",
            rutaArchivo: "/manual/BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/BLOQUE_07_5_PROTOCOLOS_SEGURIDAD_EN_ESCENA.md",
            rutaUrl: "/manual/parte-vi-conduccion/bloque-7-conduccion/6.1.6",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: ["protocolo"],
            tipoContenido: "formativo",
            tiempoLectura: 7,
            navegacion: {
              anterior: "6.1.5",
              siguiente: "7.1.1",
              relacionados: ["6.1.1", "6.1.2", "6.1.3", "6.1.4", "6.1.5"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
  {
    id: 7,
    nombre: "Situaciones Especiales y Trauma",
    descripcion: "",
    icono: "AlertTriangle",
    bloques: [
      {
        id: 10,
        nombre: "Situaciones Especiales",
        descripcion: "",
        icono: "AlertTriangle",
        capitulos: [
          {
            id: "7.1.1",
            titulo: "Situaciones Especiales",
            parte: 7,
            parteNombre: "Situaciones Especiales y Trauma",
            bloque: 10,
            bloqueNombre: "Situaciones Especiales",
            rutaArchivo: "/manual/BLOQUE_10_SITUACIONES_ESPECIALES/BLOQUE_10_0_SITUACIONES_ESPECIALES.md",
            rutaUrl: "/manual/parte-vii-situaciones-especiales/bloque-10-situaciones-especiales/7.1.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 10,
            navegacion: {
              anterior: "6.1.6",
              siguiente: "7.2.1",
              relacionados: ["7.2.1"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
      {
        id: 11,
        nombre: "Protocolos de Trauma",
        descripcion: "",
        icono: "Activity",
        capitulos: [
          {
            id: "7.2.1",
            titulo: "Protocolos de Trauma",
            parte: 7,
            parteNombre: "Situaciones Especiales y Trauma",
            bloque: 11,
            bloqueNombre: "Protocolos de Trauma",
            rutaArchivo: "/manual/BLOQUE_11_PROTOCOLOS_TRAUMA/BLOQUE_11_0_PROTOCOLOS_TRAUMA.md",
            rutaUrl: "/manual/parte-vii-situaciones-especiales/bloque-11-trauma/7.2.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: ["trauma", "protocolo"],
            tipoContenido: "formativo",
            tiempoLectura: 14,
            navegacion: {
              anterior: "7.1.1",
              siguiente: "8.1.1",
              relacionados: ["7.1.1"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
  {
    id: 8,
    nombre: "Habilidades Profesionales",
    descripcion: "",
    icono: "User",
    bloques: [
      {
        id: 12,
        nombre: "Marco Legal, Ético y Profesional",
        descripcion: "",
        icono: "Scale",
        capitulos: [
          {
            id: "8.1.1",
            titulo: "Marco Legal, Ético y Profesional del TES",
            parte: 8,
            parteNombre: "Habilidades Profesionales",
            bloque: 12,
            bloqueNombre: "Marco Legal, Ético y Profesional",
            rutaArchivo: "/manual/BLOQUE_12_MARCO_LEGAL_ETICO_PROFESIONAL/BLOQUE_12_0_MARCO_LEGAL_ETICO_PROFESIONAL.md",
            rutaUrl: "/manual/parte-viii-habilidades/bloque-12-marco-legal/8.1.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 17,
            navegacion: {
              anterior: "7.2.1",
              siguiente: "8.2.1",
              relacionados: ["8.2.1", "8.3.1"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
      {
        id: 13,
        nombre: "Comunicación y Relación con el Paciente",
        descripcion: "",
        icono: "MessageSquare",
        capitulos: [
          {
            id: "8.2.1",
            titulo: "Comunicación y Relación con el Paciente",
            parte: 8,
            parteNombre: "Habilidades Profesionales",
            bloque: 13,
            bloqueNombre: "Comunicación y Relación con el Paciente",
            rutaArchivo: "/manual/BLOQUE_13_COMUNICACION_RELACION_PACIENTE/BLOQUE_13_0_COMUNICACION_RELACION_PACIENTE.md",
            rutaUrl: "/manual/parte-viii-habilidades/bloque-13-comunicacion/8.2.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 13,
            navegacion: {
              anterior: "8.1.1",
              siguiente: "8.3.1",
              relacionados: ["8.1.1", "8.3.1"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
      {
        id: 14,
        nombre: "Seguridad Personal y Salud del TES",
        descripcion: "",
        icono: "Shield",
        capitulos: [
          {
            id: "8.3.1",
            titulo: "Seguridad Personal y Salud del TES",
            parte: 8,
            parteNombre: "Habilidades Profesionales",
            bloque: 14,
            bloqueNombre: "Seguridad Personal y Salud del TES",
            rutaArchivo: "/manual/BLOQUE_14_SEGURIDAD_PERSONAL_SALUD_TES/BLOQUE_14_0_SEGURIDAD_PERSONAL_SALUD_TES.md",
            rutaUrl: "/manual/parte-viii-habilidades/bloque-14-seguridad/8.3.1",
            nivelDificultad: "intermedio",
            importancia: "media",
            palabrasClave: [],
            tipoContenido: "formativo",
            tiempoLectura: 11,
            navegacion: {
              anterior: "8.2.1",
              siguiente: null,
              relacionados: ["8.1.1", "8.2.1"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          },
        ]
      },
    ]
  },
];

// Función helper para obtener capítulo por ID
export function getCapituloById(id: string): Capitulo | null {
  for (const parte of manualIndex) {
    for (const bloque of parte.bloques) {
      const capitulo = bloque.capitulos.find(c => c.id === id);
      if (capitulo) return capitulo;
    }
  }
  return null;
}

// Función helper para obtener todos los capítulos
export function getAllCapitulos(): Capitulo[] {
  const capitulos: Capitulo[] = [];
  for (const parte of manualIndex) {
    for (const bloque of parte.bloques) {
      capitulos.push(...bloque.capitulos);
    }
  }
  return capitulos;
}