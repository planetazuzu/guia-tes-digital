/**
 * Árboles de Decisión Binarios - Manual TES Digital
 * 
 * Este módulo contiene árboles de decisión binarios (sí/no) para toma de decisiones
 * rápida en emergencias prehospitalarias.
 * 
 * Fuente: Manual TES Digital (Bloques 4.0, 4.1, etc.)
 */

export type DecisionNodeType = 'question' | 'action' | 'redirect';

export interface DecisionNode {
  id: string;
  type: DecisionNodeType;
  text: string;
  yes?: string; // ID del nodo siguiente si respuesta es SÍ
  no?: string; // ID del nodo siguiente si respuesta es NO
  action?: string; // Texto de acción si es tipo 'action'
  redirectTo?: string; // Ruta o referencia si es tipo 'redirect'
  notes?: string; // Notas adicionales
}

export interface DecisionTree {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'soporte_vital' | 'escena' | 'material' | 'comunicacion';
  rootNodeId: string;
  nodes: DecisionNode[];
  source?: string; // Referencia al capítulo del manual
}

/**
 * Árbol de Decisión: Reconocimiento de PCR (4.0)
 * Fuente: BLOQUE_04_0_RECONOCIMIENTO_PCR.md
 */
export const pcrRecognitionTree: DecisionTree = {
  id: 'pcr-recognition',
  title: 'Reconocimiento de PCR',
  shortTitle: 'PCR',
  description: 'Identificar PCR en <10 segundos. Decisión binaria rápida.',
  category: 'soporte_vital',
  rootNodeId: 'responds',
  source: 'BLOQUE_04_0_RECONOCIMIENTO_PCR.md',
  nodes: [
    {
      id: 'responds',
      type: 'question',
      text: '¿Responde? (Estímulo doloroso, voz fuerte)',
      yes: 'not-pcr',
      no: 'breathes',
    },
    {
      id: 'breathes',
      type: 'question',
      text: '¿Respira con normalidad? (Ver, oír, sentir <10"; buscar respiraciones agónicas/ineficaces)',
      yes: 'not-pcr-breathing',
      no: 'pcr-confirmed',
    },
    {
      id: 'pcr-confirmed',
      type: 'question',
      text: '¿Estoy solo o con equipo?',
      yes: 'pcr-with-team',
      no: 'pcr-alone',
    },
    {
      id: 'pcr-with-team',
      type: 'action',
      text: 'CON EQUIPO: Asignar roles',
      action: 'Asignar roles: "Tú, compresiones. Tú, prepara BVM y DESA. Yo lidero y cronometro". Iniciar RCP coordinada (Cap 4.5).',
      redirectTo: '/soporte-vital?id=rcp-dos-intervinientes',
      notes: 'Iniciar RCP coordinada inmediatamente',
    },
    {
      id: 'pcr-alone',
      type: 'action',
      text: 'SOLO: Activar y empezar RCP',
      action: 'Activar altavoz del portátil/radio: "Solicito recurso para PCR en [ubicación], único interviniente, inicio RCP". Iniciar RCP (Cap 4.1) inmediatamente.',
      redirectTo: '/soporte-vital?id=rcp-adulto-svb',
      notes: 'No demorar RCP por buscar material',
    },
    {
      id: 'not-pcr',
      type: 'action',
      text: 'NO ES PCR',
      action: 'Pasar a valoración ABCDE. Evaluar causa de inconsciencia.',
      redirectTo: '/escena?tab=abcde',
      notes: 'Paciente responde: no es PCR',
    },
    {
      id: 'not-pcr-breathing',
      type: 'action',
      text: 'NO ES PCR',
      action: 'Colocar en PLS (ver Cap 4.9) y valorar. Monitorizar continuamente.',
      redirectTo: '/soporte-vital?id=posicion-lateral-seguridad',
      notes: 'Respira normal pero inconsciente: PLS',
    },
  ],
};

/**
 * Árbol de Decisión: SVB Adulto (4.1)
 * Fuente: BLOQUE_04_1_RCP_ADULTOS.md
 */
export const svbAdultTree: DecisionTree = {
  id: 'svb-adult',
  title: 'SVB Adulto - Árbol de Decisión',
  shortTitle: 'SVB Adulto',
  description: 'Árbol de decisión para iniciar RCP básica en adultos.',
  category: 'soporte_vital',
  rootNodeId: 'safe',
  source: 'BLOQUE_04_1_RCP_ADULTOS.md',
  nodes: [
    {
      id: 'safe',
      type: 'question',
      text: '¿ES SEGURO?',
      yes: 'responds-svb',
      no: 'secure-scene',
    },
    {
      id: 'secure-scene',
      type: 'action',
      text: 'Asegurar escena',
      action: 'Asegura/retira riesgo si posible. No poner en riesgo tu seguridad.',
      notes: 'Si no es seguro, no proceder hasta asegurar escena',
    },
    {
      id: 'responds-svb',
      type: 'question',
      text: '¿RESPONDE?',
      yes: 'evaluate-abcde',
      no: 'breathes-svb',
    },
    {
      id: 'breathes-svb',
      type: 'question',
      text: '¿RESPIRA NORMAL?',
      yes: 'pls',
      no: 'start-rcp',
    },
    {
      id: 'start-rcp',
      type: 'action',
      text: 'INICIAR RCP',
      action: 'ACTIVAR 112 + PEDIR DESA. INICIAR RCP (C-A-B). DESA EN CUANTO LLEGUE (Bloque 4.4). Compresiones 100–120/min y profundidad 5–6 cm.',
      redirectTo: '/soporte-vital?id=rcp-adulto-svb',
      notes: 'PCR confirmada: iniciar RCP inmediatamente',
    },
    {
      id: 'pls',
      type: 'action',
      text: 'Posición Lateral de Seguridad',
      action: 'PLS (Bloque 4.9) + reevaluación continua. Monitorizar respiración y pulso.',
      redirectTo: '/soporte-vital?id=posicion-lateral-seguridad',
      notes: 'Respira normal pero inconsciente: PLS',
    },
    {
      id: 'evaluate-abcde',
      type: 'action',
      text: 'Valorar ABCDE',
      action: 'Valorar, monitorizar, buscar causa, 112 si procede. No es PCR.',
      redirectTo: '/escena?tab=abcde',
      notes: 'Paciente responde: evaluar ABCDE',
    },
  ],
};

/**
 * Lista de todos los árboles de decisión disponibles
 */
export const decisionTrees: DecisionTree[] = [
  pcrRecognitionTree,
  svbAdultTree,
];

/**
 * Obtener un árbol de decisión por ID
 */
export function getDecisionTreeById(id: string): DecisionTree | undefined {
  return decisionTrees.find((tree) => tree.id === id);
}

/**
 * Obtener árboles de decisión por categoría
 */
export function getDecisionTreesByCategory(
  category: DecisionTree['category']
): DecisionTree[] {
  return decisionTrees.filter((tree) => tree.category === category);
}

/**
 * Obtener el nodo raíz de un árbol
 */
export function getRootNode(tree: DecisionTree): DecisionNode | undefined {
  return tree.nodes.find((node) => node.id === tree.rootNodeId);
}

/**
 * Obtener un nodo por ID dentro de un árbol
 */
export function getNodeById(
  tree: DecisionTree,
  nodeId: string
): DecisionNode | undefined {
  return tree.nodes.find((node) => node.id === nodeId);
}
