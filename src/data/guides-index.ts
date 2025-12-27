/**
 * Índice de Guías de Refuerzo (Modo Formativo)
 * 
 * Este archivo contiene la estructura de datos para las Guías de Refuerzo.
 * Cada guía tiene exactamente 8 secciones que corresponden a archivos Markdown
 * en /docs/consolidado/
 */

export interface GuideSection {
  numero: number; // 1-8
  titulo: string;
  archivo: string; // Nombre del archivo sin ruta
  ruta: string; // Ruta completa desde raíz: /docs/consolidado/SECCION_XX_XXXX.md
}

export interface Guide {
  id: string; // Slug para URL (ej: "abcde-operativo")
  titulo: string;
  descripcion: string;
  icono: string; // Nombre de icono de lucide-react
  secciones: GuideSection[]; // Siempre 8 secciones
  protocoloOperativo?: {
    titulo: string;
    ruta: string; // Ruta al protocolo operativo relacionado
  };
}

export const guidesIndex: Guide[] = [
  {
    id: "abcde-operativo",
    titulo: "ABCDE Operativo",
    descripcion: "Guía de refuerzo para comprender el enfoque ABCDE como estructura mental de priorización aplicable a todas las emergencias prehospitalarias",
    icono: "Activity",
    secciones: [
      {
        numero: 1,
        titulo: "Introducción y Contexto",
        archivo: "SECCION_01_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_01_ABCDE_OPERATIVO.md"
      },
      {
        numero: 2,
        titulo: "Explicación Clínica y Fisiopatología",
        archivo: "SECCION_02_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_02_ABCDE_OPERATIVO.md"
      },
      {
        numero: 3,
        titulo: "Algoritmo Comentado Visual",
        archivo: "SECCION_03_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_03_ABCDE_OPERATIVO.md"
      },
      {
        numero: 4,
        titulo: "Medios Visuales y Demostración",
        archivo: "SECCION_04_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_04_ABCDE_OPERATIVO.md"
      },
      {
        numero: 5,
        titulo: "Errores Frecuentes Visualizados",
        archivo: "SECCION_05_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_05_ABCDE_OPERATIVO.md"
      },
      {
        numero: 6,
        titulo: "Casos Clínicos",
        archivo: "SECCION_06_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_06_ABCDE_OPERATIVO.md"
      },
      {
        numero: 7,
        titulo: "Simulación Mental Guiada",
        archivo: "SECCION_07_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_07_ABCDE_OPERATIVO.md"
      },
      {
        numero: 8,
        titulo: "Resumen Visual y Puente al Operativo",
        archivo: "SECCION_08_ABCDE_OPERATIVO.md",
        ruta: "/docs/consolidado/SECCION_08_ABCDE_OPERATIVO.md"
      }
    ],
    protocoloOperativo: {
      titulo: "ABCDE Operativo",
      ruta: "/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.2"
    }
  },
  {
    id: "rcp-adulto-svb",
    titulo: "RCP Adulto SVB",
    descripcion: "Guía de refuerzo para comprender en profundidad la Reanimación Cardiopulmonar Básica en adultos, su fisiopatología y aplicación correcta",
    icono: "Heart",
    secciones: [
      {
        numero: 1,
        titulo: "Introducción y Contexto",
        archivo: "SECCION_01_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_01_RCP_ADULTO_SVB.md"
      },
      {
        numero: 2,
        titulo: "Explicación Clínica y Fisiopatología",
        archivo: "SECCION_02_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_02_RCP_ADULTO_SVB.md"
      },
      {
        numero: 3,
        titulo: "Algoritmo Comentado Visual",
        archivo: "SECCION_03_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_03_RCP_ADULTO_SVB.md"
      },
      {
        numero: 4,
        titulo: "Medios Visuales y Demostración",
        archivo: "SECCION_04_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_04_RCP_ADULTO_SVB.md"
      },
      {
        numero: 5,
        titulo: "Errores Frecuentes Visualizados",
        archivo: "SECCION_05_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_05_RCP_ADULTO_SVB.md"
      },
      {
        numero: 6,
        titulo: "Casos Clínicos",
        archivo: "SECCION_06_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_06_RCP_ADULTO_SVB.md"
      },
      {
        numero: 7,
        titulo: "Simulación Mental Guiada",
        archivo: "SECCION_07_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_07_RCP_ADULTO_SVB.md"
      },
      {
        numero: 8,
        titulo: "Resumen Visual y Puente al Operativo",
        archivo: "SECCION_08_RCP_ADULTO_SVB.md",
        ruta: "/docs/consolidado/SECCION_08_RCP_ADULTO_SVB.md"
      }
    ],
    protocoloOperativo: {
      titulo: "RCP Adulto SVB",
      ruta: "/rcp"
    }
  }
];

/**
 * Obtiene una guía por su ID
 */
export function getGuideById(id: string): Guide | undefined {
  return guidesIndex.find(g => g.id === id);
}

/**
 * Obtiene una sección específica de una guía
 */
export function getGuideSection(guideId: string, numero: number): GuideSection | undefined {
  const guide = getGuideById(guideId);
  return guide?.secciones.find(s => s.numero === numero);
}

/**
 * Obtiene todas las guías disponibles
 */
export function getAllGuides(): Guide[] {
  return guidesIndex;
}

