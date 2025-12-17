/**
 * Abreviaturas y Terminología Farmacológica - Manual TES Digital
 * 
 * Capítulo 6.7 – Abreviaturas y Terminología Farmacológica
 * 
 * Fuente: Manual TES Digital - Bloque 6
 */

export type TerminologyCategory = 
  | 'unidades' 
  | 'vias' 
  | 'conceptos' 
  | 'seguridad';

export interface TerminologyTerm {
  id: string;
  abbreviation: string;
  fullTerm: string;
  explanation: string;
  danger?: string; // Advertencias de peligro
  category: TerminologyCategory;
}

export interface LookAlikePair {
  term1: string;
  term2: string;
  danger: string;
  prevention: string;
}

export interface PharmaceuticalTerminology {
  objective: string;
  scope: string;
  principles: string[];
  units: TerminologyTerm[];
  routes: TerminologyTerm[];
  concepts: TerminologyTerm[];
  lookAlikes: LookAlikePair[];
  criticalErrors: string[];
  keyPoints: string[];
}

export const pharmaceuticalTerminology: PharmaceuticalTerminology = {
  objective: 'Proporcionar una referencia operativa estandarizada de las abreviaturas, siglas y términos farmacológicos más utilizados en el ámbito TES, para garantizar una comunicación clara, una documentación precisa y minimizar errores de interpretación.',
  
  scope: 'Este glosario aplica a la terminología utilizada en la prescripción, preparación, administración y documentación de fármacos en el entorno prehospitalario. Se centra en términos de uso común por el TES. No es una lista exhaustiva de toda la terminología médica.',
  
  principles: [
    'Claridad sobre brevedad: Nunca uses una abreviatura ambigua para ahorrar tiempo. Escribe la palabra completa si existe duda.',
    'Documentación estandarizada: Usa únicamente las abreviaturas reconocidas en este manual y en los protocolos locales. Inventar abreviaturas es una fuente de errores.',
    'Verificación: Si recibes una orden o lees una documentación con una abreviatura que no comprendes, debes preguntar y confirmar. Asumir es un error crítico.',
  ],
  
  units: [
    {
      id: 'g',
      abbreviation: 'g',
      fullTerm: 'Gramo',
      explanation: 'Unidad base de peso',
      category: 'unidades'
    },
    {
      id: 'mg',
      abbreviation: 'mg',
      fullTerm: 'Miligramo',
      explanation: 'Milésima parte de un gramo (0.001 g). Usada para la mayoría de fármacos TES (AAS, adrenalina)',
      category: 'unidades'
    },
    {
      id: 'mcg',
      abbreviation: 'mcg (o µg)',
      fullTerm: 'Microgramo',
      explanation: 'Millonésima parte de un gramo (0.000001 g)',
      danger: 'Usar siempre "mcg". "µg" puede confundirse con "mg" (error x1000)',
      category: 'unidades'
    },
    {
      id: 'L',
      abbreviation: 'L',
      fullTerm: 'Litro',
      explanation: 'Unidad de volumen',
      category: 'unidades'
    },
    {
      id: 'ml',
      abbreviation: 'ml',
      fullTerm: 'Mililitro',
      explanation: 'Milésima parte de un litro (0.001 L). Usada para volúmenes inyectables o nebulizados',
      category: 'unidades'
    },
    {
      id: 'UI',
      abbreviation: 'UI',
      fullTerm: 'Unidades Internacionales',
      explanation: 'Usada para algunos fármacos (insulina, heparina)',
      danger: 'Escribir siempre "UI", nunca solo "U" (puede leerse como un cero)',
      category: 'unidades'
    },
    {
      id: 'kg',
      abbreviation: 'kg',
      fullTerm: 'Kilogramo',
      explanation: 'Unidad de peso para cálculo de dosis pediátricas. Fundamental',
      category: 'unidades'
    },
    {
      id: 'mEq',
      abbreviation: 'mEq',
      fullTerm: 'Miliequivalente',
      explanation: 'Unidad química usada en electrolitos',
      category: 'unidades'
    },
    {
      id: 'cc',
      abbreviation: 'cc',
      fullTerm: 'Centímetro cúbico',
      explanation: 'Evitar. Usar "ml" (son equivalentes, pero "ml" es el estándar)',
      category: 'unidades'
    },
    {
      id: 'c',
      abbreviation: 'c/… (ej., c/4h, c/8h)',
      fullTerm: 'Cada… horas',
      explanation: 'Frecuencia de administración (ej., cada 4 horas, cada 8 horas)',
      category: 'unidades'
    },
    {
      id: 'sos',
      abbreviation: 's.o.s.',
      fullTerm: 'Si opus sit (si fuera necesario)',
      explanation: 'Solo administrar si se presentan síntomas específicos',
      category: 'unidades'
    }
  ],
  
  routes: [
    {
      id: 'VO',
      abbreviation: 'VO / PO',
      fullTerm: 'Vía Oral / Por vía Oral',
      explanation: 'Por boca, tragando',
      category: 'vias'
    },
    {
      id: 'SL',
      abbreviation: 'SL',
      fullTerm: 'Sublingual',
      explanation: 'Bajo la lengua (ej., nitroglicerina)',
      category: 'vias'
    },
    {
      id: 'IM',
      abbreviation: 'IM',
      fullTerm: 'Intramuscular',
      explanation: 'Inyección en músculo (ej., adrenalina para anafilaxia en vasto externo)',
      category: 'vias'
    },
    {
      id: 'SC',
      abbreviation: 'SC',
      fullTerm: 'Subcutánea',
      explanation: 'Inyección en tejido subcutáneo (ej., insulina, glucagón alternativo)',
      category: 'vias'
    },
    {
      id: 'IV',
      abbreviation: 'IV',
      fullTerm: 'Intravenosa',
      explanation: 'Directamente en vena. Procedimiento generalmente fuera del alcance TES básico',
      category: 'vias'
    },
    {
      id: 'IO',
      abbreviation: 'IO',
      fullTerm: 'Intraósea',
      explanation: 'En cavidad medular de un hueso (ej., tibia proximal). Alternativa a IV en PCR',
      category: 'vias'
    },
    {
      id: 'IN',
      abbreviation: 'IN',
      fullTerm: 'Intranasal',
      explanation: 'A través de la mucosa nasal (ej., naloxona nasal)',
      category: 'vias'
    },
    {
      id: 'NEB',
      abbreviation: 'NEB',
      fullTerm: 'Nebulizada',
      explanation: 'Convertida en aerosol e inhalada (ej., salbutamol)',
      category: 'vias'
    },
    {
      id: 'MDI',
      abbreviation: 'MDI',
      fullTerm: 'Inhalador de Dosis Medida',
      explanation: 'Metered Dose Inhaler. Debe usarse con cámara espaciadora',
      category: 'vias'
    },
    {
      id: 'Top',
      abbreviation: 'Tóp.',
      fullTerm: 'Tópica',
      explanation: 'Aplicada sobre la piel',
      category: 'vias'
    }
  ],
  
  concepts: [
    {
      id: 'AAS',
      abbreviation: 'AAS',
      fullTerm: 'Ácido Acetilsalicílico',
      explanation: 'Antiagregante plaquetario. Dosis en SCA: 150-300 mg masticados',
      category: 'conceptos'
    },
    {
      id: 'ADR',
      abbreviation: 'ADR',
      fullTerm: 'Adrenalina (Epinefrina)',
      explanation: 'Verificar concentración: 1:1000 (1 mg/ml) para IM, 1:10.000 (0.1 mg/ml) para IV/IO',
      danger: 'Concentración diferente según uso. Leer etiqueta EN VOZ ALTA',
      category: 'conceptos'
    },
    {
      id: 'ATC',
      abbreviation: 'ATC',
      fullTerm: 'Anatomical Therapeutic Chemical',
      explanation: 'Clasificación internacional de fármacos. No se usa en documentación operativa diaria',
      category: 'conceptos'
    },
    {
      id: 'BVM',
      abbreviation: 'BVM',
      fullTerm: 'Bag-Valve-Mask (Bolsa-Válvula-Mascarilla)',
      explanation: 'Dispositivo para ventilación manual. No es un fármaco, pero es término clave en soporte',
      category: 'conceptos'
    },
    {
      id: 'CPA',
      abbreviation: 'CPA',
      fullTerm: 'Contraindicación Absoluta',
      explanation: 'Situación en la que nunca se debe administrar un fármaco (ej., alergia al AAS)',
      category: 'conceptos'
    },
    {
      id: 'CPR',
      abbreviation: 'CPR',
      fullTerm: 'Contraindicación Relativa',
      explanation: 'Situación que exige precaución extrema, pero donde el beneficio puede superar el riesgo (valoración médica)',
      category: 'conceptos'
    },
    {
      id: 'DEA',
      abbreviation: 'DEA/DESA',
      fullTerm: 'Desfibrilador Externo Automático/Semiautomático',
      explanation: 'Dispositivo para desfibrilación',
      category: 'conceptos'
    },
    {
      id: 'EA',
      abbreviation: 'EA',
      fullTerm: 'Efecto Adverso',
      explanation: 'Reacción no deseada a un fármaco. Debe documentarse',
      category: 'conceptos'
    },
    {
      id: 'EPOC',
      abbreviation: 'EPOC',
      fullTerm: 'Enfermedad Pulmonar Obstructiva Crónica',
      explanation: 'Paciente con objetivo de SpO₂ 88-92% con oxigenoterapia',
      category: 'conceptos'
    },
    {
      id: 'Fco',
      abbreviation: 'Fco.',
      fullTerm: 'Frasco o Frasco-ampolla',
      explanation: 'Presentación del fármaco',
      category: 'conceptos'
    },
    {
      id: 'HIPO',
      abbreviation: 'HIPO',
      fullTerm: 'Hipoglucemia',
      explanation: 'Bajo nivel de glucosa en sangre. Glucagón IM si inconsciente',
      category: 'conceptos'
    },
    {
      id: 'Ind',
      abbreviation: 'Ind.',
      fullTerm: 'Indicación',
      explanation: 'Razón clínica para administrar un fármaco',
      category: 'conceptos'
    },
    {
      id: 'PCR',
      abbreviation: 'PCR',
      fullTerm: 'Parada Cardiorrespiratoria',
      explanation: 'Contexto para uso de adrenalina 1:10.000 IV/IO',
      category: 'conceptos'
    },
    {
      id: 'SCA',
      abbreviation: 'SCA',
      fullTerm: 'Síndrome Coronario Agudo',
      explanation: 'Indicación para AAS masticado',
      category: 'conceptos'
    },
    {
      id: 'SVB',
      abbreviation: 'SVB/SVA',
      fullTerm: 'Soporte Vital Básico/Avanzado',
      explanation: '',
      category: 'conceptos'
    },
    {
      id: 'TES',
      abbreviation: 'TES',
      fullTerm: 'Técnico en Emergencias Sanitarias',
      explanation: 'Tú',
      category: 'conceptos'
    }
  ],
  
  lookAlikes: [
    {
      term1: 'Adrenalina 1:1000',
      term2: 'Adrenalina 1:10.000',
      danger: 'Concentración diferente. Administrar la concentración incorrecta es un error de dosis potencialmente mortal',
      prevention: 'Leer etiqueta EN VOZ ALTA: "¿Es para IM (1:1000) o para PCR (1:10.000)?"'
    },
    {
      term1: 'Cloruro potásico (KCl)',
      term2: 'Cloruro sódico (NaCl 0.9%)',
      danger: 'El KCl concentrado es letal si se inyecta IV en bolo',
      prevention: 'NUNCA lo tengas en la zona de preparación de emergencia. El suero fisiológico es NaCl'
    },
    {
      term1: 'Hidralazina',
      term2: 'Hidroclorotiazida',
      danger: 'Nombres similares, usos diferentes',
      prevention: 'Conoce los fármacos de tu protocolo'
    },
    {
      term1: 'mg',
      term2: 'mcg',
      danger: 'Diferencia de x1000',
      prevention: 'Siempre escribe "mcg" para microgramos. No uses "µg"'
    },
    {
      term1: 'Oxicodona',
      term2: 'OxyContin®',
      danger: 'Nombres similares',
      prevention: 'OxyContin® es una marca de liberación prolongada'
    },
    {
      term1: 'UI (Unidades)',
      term2: 'U (letra)',
      danger: '"10 U de insulina" puede leerse como "100"',
      prevention: 'Siempre escribe "UI"'
    }
  ],
  
  criticalErrors: [
    'Usar abreviaturas no estándar o inventadas en la documentación (ej., escribir "Ader" en lugar de "ADR")',
    'No verificar una abreviatura ambigua. Si dudas, escribe la palabra completa',
    'Confiar en la memoria para abreviaturas complejas. Consulta esta lista o el protocolo',
    'Usar "U" para Unidades. Siempre "UI"',
    'Interpretar "µg" como "mg". Exige que se use "mcg"',
    'No cuestionar una orden verbal con una abreviatura que no entiendes. La responsabilidad final es tuya',
    'Abreviar nombres de fármacos de forma no oficial (ej., "Meto" para Metoprolol). Usa el nombre completo o la abreviatura oficial si existe'
  ],
  
  keyPoints: [
    'Tu regla de oro: Si dudas, NO abrevies. Escribe la palabra completa. Es más lento pero infinitamente más seguro',
    'Las abreviaturas de este capítulo son tu estándar. Úsalas consistentemente con tu equipo',
    'La verificación en voz alta incluye el nombre del fármaco SIN ABREVIAR. Di "Adrenalina uno por mil" en lugar de "ADR uno mil"',
    'En la app, usa listas desplegables predefinidas para nombres de fármacos y vías. Elimina el error de escritura',
    'La documentación clara salva vidas. Un error de transcripción (mg por mcg) puede matar',
    'Capacita a los nuevos TES en esta terminología desde el primer día. La estandarización empieza con la formación'
  ]
};

export function getTermByAbbreviation(abbreviation: string): TerminologyTerm | undefined {
  const allTerms = [
    ...pharmaceuticalTerminology.units,
    ...pharmaceuticalTerminology.routes,
    ...pharmaceuticalTerminology.concepts
  ];
  return allTerms.find(term => 
    term.abbreviation.toLowerCase() === abbreviation.toLowerCase() ||
    term.abbreviation.toLowerCase().includes(abbreviation.toLowerCase()) ||
    abbreviation.toLowerCase().includes(term.abbreviation.toLowerCase())
  );
}

export function searchTerms(query: string): TerminologyTerm[] {
  const allTerms = [
    ...pharmaceuticalTerminology.units,
    ...pharmaceuticalTerminology.routes,
    ...pharmaceuticalTerminology.concepts
  ];
  const lowerQuery = query.toLowerCase();
  return allTerms.filter(term =>
    term.abbreviation.toLowerCase().includes(lowerQuery) ||
    term.fullTerm.toLowerCase().includes(lowerQuery) ||
    term.explanation.toLowerCase().includes(lowerQuery)
  );
}
