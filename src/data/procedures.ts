export type Priority = 'critico' | 'alto' | 'medio' | 'bajo';
export type AgeGroup = 'adulto' | 'pediatrico' | 'neonatal' | 'todos';
export type Category = 'soporte_vital' | 'patologias' | 'escena';

export interface Procedure {
  id: string;
  title: string;
  shortTitle: string;
  category: Category;
  subcategory?: string;
  priority: Priority;
  ageGroup: AgeGroup;
  steps: string[];
  warnings: string[];
  keyPoints?: string[];
  equipment?: string[];
  drugs?: string[];
}

export const procedures: Procedure[] = [
  {
    id: 'rcp-adulto-svb',
    title: 'RCP Adulto - Soporte Vital Básico',
    shortTitle: 'RCP Adulto SVB',
    category: 'soporte_vital',
    subcategory: 'rcp',
    priority: 'critico',
    ageGroup: 'adulto',
    steps: [
      'Garantizar seguridad de la escena',
      'Comprobar consciencia: estimular y preguntar "¿Se encuentra bien?"',
      'Si no responde, gritar pidiendo ayuda',
      'Abrir vía aérea: maniobra frente-mentón',
      'Comprobar respiración: VER-OÍR-SENTIR (máx. 10 segundos)',
      'Si no respira normal: llamar 112 y pedir DEA',
      'Iniciar compresiones torácicas: 30 compresiones',
      'Dar 2 ventilaciones de rescate',
      'Continuar ciclos 30:2 sin interrupción',
      'Cuando llegue DEA: encenderlo y seguir instrucciones',
    ],
    warnings: [
      'Profundidad compresiones: 5-6 cm',
      'Frecuencia: 100-120 compresiones/min',
      'Permitir descompresión completa',
      'Minimizar interrupciones (<10 seg)',
      'Cambiar reanimador cada 2 min',
    ],
    keyPoints: [
      'Compresiones de calidad salvan vidas',
      'No interrumpir para pulso hasta que haya signos de vida',
      'La desfibrilación precoz aumenta supervivencia',
    ],
    equipment: ['DEA', 'Bolsa-mascarilla', 'Cánula orofaríngea'],
    drugs: ['Adrenalina 1mg'],
  },
  {
    id: 'rcp-adulto-sva',
    title: 'RCP Adulto - Soporte Vital Avanzado',
    shortTitle: 'RCP Adulto SVA',
    category: 'soporte_vital',
    subcategory: 'rcp',
    priority: 'critico',
    ageGroup: 'adulto',
    steps: [
      'Continuar RCP 30:2 mientras se prepara monitorización',
      'Colocar monitor/desfibrilador y analizar ritmo',
      'Ritmo desfibrilable (FV/TVSP): descarga 150-200J bifásico',
      'Reiniciar RCP inmediatamente 2 minutos',
      'Obtener acceso IV/IO',
      'Administrar adrenalina 1mg IV cada 3-5 min (tras 3ª descarga si DF)',
      'Considerar amiodarona 300mg IV si FV/TVSP refractaria',
      'Asegurar vía aérea avanzada cuando sea posible',
      'Buscar y tratar causas reversibles (4H y 4T)',
      'Si ROSC: cuidados post-parada',
    ],
    warnings: [
      'Minimizar interrupciones de compresiones',
      'Adrenalina en ritmos no DF: lo antes posible',
      'Amiodarona: 150mg adicionales si persiste FV/TVSP',
      'Capnografía: objetivo ETCO2 >10 mmHg',
    ],
    keyPoints: [
      '4H: Hipoxia, Hipovolemia, Hipo/Hiperpotasemia, Hipotermia',
      '4T: Neumotórax a Tensión, Taponamiento, Tóxicos, TEP',
    ],
    equipment: ['Monitor/Desfibrilador', 'Material IOT', 'Acceso venoso'],
    drugs: ['Adrenalina', 'Amiodarona', 'Atropina'],
  },
  {
    id: 'rcp-pediatrico',
    title: 'RCP Pediátrico - SVB',
    shortTitle: 'RCP Pediátrico',
    category: 'soporte_vital',
    subcategory: 'rcp',
    priority: 'critico',
    ageGroup: 'pediatrico',
    steps: [
      'Garantizar seguridad',
      'Comprobar consciencia',
      'Abrir vía aérea: maniobra frente-mentón',
      'Comprobar respiración (máx. 10 segundos)',
      'Dar 5 ventilaciones de rescate iniciales',
      'Comprobar signos de vida/pulso (máx. 10 seg)',
      'Si no hay signos de vida: 15 compresiones torácicas',
      'Continuar con ciclos 15:2',
      'Si está solo: RCP 1 minuto antes de llamar 112',
    ],
    warnings: [
      'Lactante (<1 año): compresiones con 2 dedos',
      'Niño (1-8 años): talón de una mano',
      'Profundidad: 1/3 del tórax (4cm lactante, 5cm niño)',
      'Frecuencia: 100-120/min',
    ],
    keyPoints: [
      'La causa más frecuente es respiratoria',
      'Las 5 ventilaciones iniciales son cruciales',
      'Ratio 15:2 para profesionales',
    ],
  },
  {
    id: 'obstruccion-via-aerea',
    title: 'Obstrucción de Vía Aérea - OVACE',
    shortTitle: 'OVACE',
    category: 'soporte_vital',
    subcategory: 'via_aerea',
    priority: 'critico',
    ageGroup: 'todos',
    steps: [
      'Valorar gravedad: ¿Puede toser, hablar, respirar?',
      'OBSTRUCCIÓN LEVE: animar a toser, vigilar',
      'OBSTRUCCIÓN GRAVE consciente: 5 golpes interescapulares',
      'Si no se resuelve: 5 compresiones abdominales (Heimlich)',
      'Alternar 5 golpes + 5 compresiones hasta resolución',
      'Si pierde consciencia: iniciar RCP',
      'Antes de ventilar: revisar boca y extraer objeto visible',
    ],
    warnings: [
      'En embarazadas y obesos: compresiones torácicas',
      'Lactantes: 5 golpes en espalda + 5 compresiones torácicas',
      'NO hacer barrido digital a ciegas',
      'Derivar siempre tras maniobras de Heimlich',
    ],
    keyPoints: [
      'La tos es el mecanismo más efectivo',
      'No interferir si la tos es efectiva',
    ],
  },
  {
    id: 'shock-hemorragico',
    title: 'Shock Hemorrágico',
    shortTitle: 'Shock Hemorrágico',
    category: 'soporte_vital',
    subcategory: 'shock',
    priority: 'critico',
    ageGroup: 'adulto',
    steps: [
      'Control de hemorragia externa: presión directa',
      'Torniquete si hemorragia en extremidad no controlable',
      'Oxigenoterapia alto flujo',
      'Canalizar 2 vías IV gruesas (14-16G)',
      'Fluidos: cristaloides tibios (objetivo TAS 80-90 mmHg)',
      'Posición Trendelenburg si no hay TCE',
      'Evitar hipotermia: mantas térmicas',
      'Traslado urgente a hospital útil',
      'Considerar ácido tranexámico 1g IV',
    ],
    warnings: [
      'Hipotensión permisiva: TAS 80-90 mmHg',
      'Excepto en TCE: mantener TAS >90 mmHg',
      'Evitar sobrecarga de fluidos',
      'Torniquete: anotar hora de colocación',
    ],
    keyPoints: [
      'Clase I: <15% pérdida, FC normal, TA normal',
      'Clase II: 15-30%, taquicardia, TA normal',
      'Clase III: 30-40%, taquicardia, hipotensión',
      'Clase IV: >40%, bradicardia, shock severo',
    ],
    equipment: ['Torniquete', 'Agentes hemostáticos', 'Mantas térmicas'],
    drugs: ['Ácido tranexámico', 'Cristaloides'],
  },
];

export const getProceduresByCategory = (category: Category): Procedure[] => {
  return procedures.filter((p) => p.category === category);
};

export const getProcedureById = (id: string): Procedure | undefined => {
  return procedures.find((p) => p.id === id);
};

export const searchProcedures = (query: string): Procedure[] => {
  const lowerQuery = query.toLowerCase();
  return procedures.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.shortTitle.toLowerCase().includes(lowerQuery) ||
      p.steps.some((s) => s.toLowerCase().includes(lowerQuery))
  );
};
