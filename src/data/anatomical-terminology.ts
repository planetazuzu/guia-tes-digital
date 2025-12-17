/**
 * Anatomía Operativa - Manual TES Digital
 * 
 * Capítulo 2.0 – Anatomía Operativa para Inmovilización y Movilización
 * 
 * Fuente: Manual TES Digital - Bloque 2
 */

export type AnatomicalCategory = 'direccion' | 'posiciones' | 'landmarks' | 'aplicacion';

export interface AnatomicalTerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  category: AnatomicalCategory;
  critical?: boolean;
}

export interface AnatomicalPosition {
  id: string;
  name: string;
  description: string;
  indication: string;
}

export interface AnatomicalLandmark {
  id: string;
  name: string;
  location: string;
  purpose: string;
  region: 'cabeza_cuello' | 'torax' | 'pelvis' | 'extremidades';
}

export interface AnatomicalApplication {
  id: string;
  step: number;
  title: string;
  instruction: string;
  critical?: boolean;
}

export interface AnatomicalTerminology {
  objective: string;
  scope: string;
  principles: string[];
  directionalTerms: AnatomicalTerm[];
  positions: AnatomicalPosition[];
  landmarks: AnatomicalLandmark[];
  applicationSteps: AnatomicalApplication[];
  criticalErrors: string[];
  keyPoints: string[];
}

export const anatomicalTerminology: AnatomicalTerminology = {
  objective: 'Proporcionar los conocimientos anatómicos y la terminología esencial para que el TES pueda realizar una valoración precisa, comunicarse efectivamente con el equipo y otros profesionales sanitarios, y fundamentar técnicamente todas las maniobras de movilización, inmovilización y manejo de material.',
  
  scope: 'Este capítulo establece la base anatómica y de lenguaje común para todos los procedimientos descritos en el manual. Se centra en la anatomía de superficie, puntos de referencia óseos, terminología direccional y posiciones del paciente relevantes para la intervención prehospitalaria. No es un tratado de anatomía médica profunda.',
  
  principles: [
    'El conocimiento anatómico es la base del razonamiento clínico operativo y la seguridad del paciente',
    'El uso de terminología precisa y estandarizada elimina ambigüedades y errores en la comunicación, especialmente con coordinación médica y personal de urgencias hospitalarias',
    '"Ver, palpar, localizar": La anatomía de superficie es tu herramienta para evaluar sin equipos complejos',
    'Toda maniobra de inmovilización o movilización debe respetar y proteger la integridad anatómica'
  ],
  
  directionalTerms: [
    {
      id: 'anterior',
      term: 'Anterior / Ventral',
      definition: 'Hacia la parte delantera del cuerpo',
      example: 'Herida incisa en región anterior del muslo',
      category: 'direccion',
      critical: true
    },
    {
      id: 'posterior',
      term: 'Posterior / Dorsal',
      definition: 'Hacia la parte trasera del cuerpo',
      example: 'Hematoma en región posterior del tórax',
      category: 'direccion',
      critical: true
    },
    {
      id: 'superior',
      term: 'Superior / Craneal / Cefálico',
      definition: 'Hacia la cabeza',
      example: 'El dolor se irradia en dirección craneal',
      category: 'direccion'
    },
    {
      id: 'inferior',
      term: 'Inferior / Caudal',
      definition: 'Hacia los pies',
      example: 'Edema en extremidad inferior izquierda',
      category: 'direccion'
    },
    {
      id: 'medial',
      term: 'Medial',
      definition: 'Hacia la línea media del cuerpo',
      example: 'Pulso medial al tendón de Aquiles (tibial posterior)',
      category: 'direccion',
      critical: true
    },
    {
      id: 'lateral',
      term: 'Lateral',
      definition: 'Alejado de la línea media del cuerpo',
      example: 'Deformidad lateral en tercio medio de clavícula',
      category: 'direccion',
      critical: true
    },
    {
      id: 'proximal',
      term: 'Proximal',
      definition: 'Más cerca del punto de unión con el tronco',
      example: 'Fractura en el tercio proximal del húmero',
      category: 'direccion',
      critical: true
    },
    {
      id: 'distal',
      term: 'Distal',
      definition: 'Más lejos del punto de unión con el tronco',
      example: 'Cuerpo extraño en falange distal',
      category: 'direccion',
      critical: true
    },
    {
      id: 'supino',
      term: 'Supino',
      definition: 'Posición del paciente: acostado sobre su espalda, cara hacia arriba',
      example: 'Colocar al paciente supino para valoración ABC',
      category: 'posiciones',
      critical: true
    },
    {
      id: 'prono',
      term: 'Prono',
      definition: 'Posición del paciente: acostado sobre su estómago',
      example: 'Encontrar al paciente prono. Realizar giro en bloque',
      category: 'posiciones',
      critical: true
    }
  ],
  
  positions: [
    {
      id: 'fowler',
      name: 'Posición de Fowler',
      description: 'Paciente semisentado',
      indication: 'Paciente consciente con disnea, para facilitar la respiración'
    },
    {
      id: 'trendelenburg',
      name: 'Trendelenburg',
      description: 'Paciente supino con la cabeza por debajo del plano de los pies',
      indication: 'Uso en controversia. Históricamente para shock, actualmente se desaconseja salvo indicación específica'
    },
    {
      id: 'antishock',
      name: 'Antishock (Trendelenburg Modificada)',
      description: 'Paciente supino con las extremidades inferiores elevadas 15-30º',
      indication: 'Valoración y manejo inicial del shock (sin trauma craneal/RA medular)'
    },
    {
      id: 'decubito_lateral',
      name: 'Decúbito Lateral (PLS)',
      description: 'De lado, con vía aérea protegida',
      indication: 'Paciente inconsciente con respiración espontánea'
    }
  ],
  
  landmarks: [
    // Cabeza y Cuello
    {
      id: 'mastoides',
      name: 'Apófisis mastoides',
      location: 'Prominencia ósea detrás de la oreja',
      purpose: 'Referencia para colocación de collarín, evitar compresión durante inmovilización',
      region: 'cabeza_cuello'
    },
    {
      id: 'angulo_mandibular',
      name: 'Ángulo mandibular',
      location: 'Punto donde la mandíbula forma un ángulo hacia atrás',
      purpose: 'Punto de referencia superior para medir talla de collarín cervical',
      region: 'cabeza_cuello'
    },
    {
      id: 'clavicula',
      name: 'Clavícula',
      location: 'Hueso horizontal en la parte superior del tórax, entre esternón y hombro',
      purpose: 'Referencia para colocación de collarín (parte inferior)',
      region: 'cabeza_cuello'
    },
    {
      id: 'espina_escapula',
      name: 'Espina de la escápula',
      location: 'Proyección ósea posterior del omóplato',
      purpose: 'Referencia para inmovilización de hombro, punto de apoyo',
      region: 'cabeza_cuello'
    },
    // Tórax
    {
      id: 'escotadura_supraesternal',
      name: 'Escotadura supraesternal',
      location: 'Depresión superior del esternón',
      purpose: 'Referencia para evaluación de vía aérea, referencia anatómica',
      region: 'torax'
    },
    {
      id: 'angulo_louis',
      name: 'Ángulo de Louis (2ª costilla)',
      location: 'Unión del manubrio y cuerpo del esternón',
      purpose: 'Referencia para localización de espacios intercostales, colocación de electrodos',
      region: 'torax'
    },
    {
      id: 'apendice_xifoides',
      name: 'Apéndice xifoides',
      location: 'Extremo inferior del esternón',
      purpose: 'Referencia para compresiones torácicas, límite superior del abdomen',
      region: 'torax'
    },
    {
      id: 'borde_costal',
      name: 'Borde costal',
      location: 'Borde inferior de las costillas',
      purpose: 'Referencia para evaluación abdominal, límites anatómicos',
      region: 'torax'
    },
    // Pelvis
    {
      id: 'cresta_iliaca',
      name: 'Cresta ilíaca',
      location: 'Borde superior del hueso ilíaco, palpable en la cintura',
      purpose: 'Referencia para colocación de cinturón pélvico, referencia para inmovilización pélvica',
      region: 'pelvis'
    },
    {
      id: 'eias',
      name: 'Espina ilíaca anterosuperior (EIAS)',
      location: 'Proyección anterior de la cresta ilíaca',
      purpose: 'Referencia anatómica para evaluaciones y procedimientos pélvicos',
      region: 'pelvis'
    },
    {
      id: 'sinfisis_pubis',
      name: 'Sínfisis del pubis',
      location: 'Unión anterior de los huesos pélvicos',
      purpose: 'Referencia para evaluación pélvica, límite anterior de la pelvis',
      region: 'pelvis'
    },
    // Extremidades
    {
      id: 'tuberculo_mayor',
      name: 'Tubérculo del mayor (húmero)',
      location: 'Prominencia ósea en la parte superior del húmero',
      purpose: 'Referencia para inmovilización de brazo, puntos de referencia',
      region: 'extremidades'
    },
    {
      id: 'epicondilos',
      name: 'Epicóndilos',
      location: 'Prominencias óseas en la parte inferior del húmero, en el codo',
      purpose: 'Referencia para inmovilización de codo, puntos de presión que requieren acolchado',
      region: 'extremidades'
    },
    {
      id: 'cabeza_perone',
      name: 'Cabeza del peroné',
      location: 'Extremo superior del peroné, lateral a la rodilla',
      purpose: 'Referencia para inmovilización de rodilla, punto de riesgo del nervio peroneo',
      region: 'extremidades'
    },
    {
      id: 'maleolos',
      name: 'Maléolos (tobillo)',
      location: 'Prominencias óseas medial y lateral del tobillo',
      purpose: 'Referencia para inmovilización de tobillo, pulso tibial posterior (detrás del maléolo medial)',
      region: 'extremidades'
    }
  ],
  
  applicationSteps: [
    {
      id: 'observacion',
      step: 1,
      title: 'Observación Global',
      instruction: 'Antes de tocar, observar la postura antálgica, deformidades evidentes, asimetrías. Pensar: "¿Qué estructura interna puede estar lesionada?"',
      critical: true
    },
    {
      id: 'comunicacion',
      step: 2,
      title: 'Comunicación Inicial',
      instruction: 'Usar términos anatómicos correctos desde el primer mensaje a coordinación: "Hombre 40 años, supino en calzada. Deformidad evidente en tercio distal de tibia derecha, actitud antálgica"',
      critical: true
    },
    {
      id: 'palpacion_circulacion',
      step: 3,
      title: 'Palpación Sistemática - Circulación',
      instruction: 'Durante la "C" (Circulación): Palpar el pulso femoral (ingle), pedio (empeine) y tibial posterior (detrás del maléolo medial). Conocer su ubicación exacta',
      critical: true
    },
    {
      id: 'palpacion_neurologico',
      step: 4,
      title: 'Palpación Sistemática - Neurológico',
      instruction: 'Durante la "D" (Discapacidad - Neurológico): Evaluar sensibilidad y movimiento en dermatomas y miótomos clave. Decir "Mueva los dedos de los pies" (no "mueva lo de abajo")',
      critical: true
    },
    {
      id: 'palpacion_exposicion',
      step: 5,
      title: 'Palpación Sistemática - Exposición',
      instruction: 'Durante la Exposición: Palpar la columna vertebral, las crestas ilíacas y todas las extremidades buscando puntos dolorosos, crepitación o inestabilidad',
      critical: true
    },
    {
      id: 'descripcion',
      step: 6,
      title: 'Descripción Precisa de Lesiones',
      instruction: 'Utilizar la terminología para ser inequívoco: "Herida punzante de 3 cm, longitudinal, en borde medial del antebrazo derecho, 10 cm distal al pliegue del codo". Evitar "herida en el brazo"',
      critical: true
    },
    {
      id: 'decisiones',
      step: 7,
      title: 'Toma de Decisiones de Inmovilización',
      instruction: 'Basarse en la anatomía: El collarín cervical se ajusta desde la base del mentón hasta la parte superior del tórax. El cinturón pélvico es a nivel de los trocánteres mayores. Las férulas deben inmovilizar la articulación proximal y distal a la fractura',
      critical: true
    },
    {
      id: 'documentacion',
      step: 8,
      title: 'Documentación',
      instruction: 'Registrar en la Hoja de Intervención utilizando la nomenclatura correcta. Es la base legal y clínica de la actuación',
      critical: true
    }
  ],
  
  criticalErrors: [
    'Utilizar términos coloquiales o imprecisos ("hueso de la risa", "corva") en la comunicación profesional',
    'No palpar puntos de referencia óseos clave antes de aplicar un dispositivo de inmovilización, llevando a una colocación incorrecta e inefectiva',
    'Confundir "proximal" con "distal" en la descripción de una lesión o al dar una orden. Puede conducir a un tratamiento erróneo',
    'Describir una lesión en referencia a un objeto externo ("herida cerca de la puerta") en lugar de usar referencias anatómicas del propio paciente',
    'No considerar la anatomía tridimensional. Una herida de entrada anterior en el tórax puede tener una trayectoria con salida posterior'
  ],
  
  keyPoints: [
    'Habla anatómicamente, comunica con precisión. Tu lenguaje define tu profesionalidad',
    '"Proximal y distal" son tus palabras clave en trauma osteoarticular. Úsalas siempre',
    'La palpación es tu TAC portátil. Entrénate para identificar estructuras bajo la piel',
    'Un gráfico mental del cuerpo te guía en la exploración. No explores al azar; sigue un orden lógico (cabeza-pies, anterior-posterior)',
    'La documentación anatómica correcta protege al paciente y al TES. Es tu mejor respaldo',
    'Repasa mentalmente la anatomía subyacente en cada procedimiento. Al colocar una férula de tracción, piensa en el trayecto del nervio ciático. Al mover un paciente, piensa en la integridad de su columna'
  ]
};

export function getTermsByCategory(category: AnatomicalCategory): AnatomicalTerm[] {
  return anatomicalTerminology.directionalTerms.filter(term => term.category === category);
}

export function searchTerms(query: string): AnatomicalTerm[] {
  const lowerQuery = query.toLowerCase();
  return anatomicalTerminology.directionalTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    (term.example && term.example.toLowerCase().includes(lowerQuery))
  );
}

export function getLandmarksByRegion(region: AnatomicalLandmark['region']): AnatomicalLandmark[] {
  return anatomicalTerminology.landmarks.filter(landmark => landmark.region === region);
}
