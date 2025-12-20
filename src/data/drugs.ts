export type DrugCategory = 'cardiovascular' | 'respiratorio' | 'neurologico' | 'analgesia' | 'oxigenoterapia' | 'otros';
export type AdministrationRoute = 'IV' | 'IM' | 'SC' | 'IO' | 'Nebulizado' | 'SL' | 'Rectal' | 'Nasal';

export interface Drug {
  id: string;
  genericName: string;
  tradeName: string;
  category: DrugCategory;
  presentation: string;
  adultDose: string;
  pediatricDose?: string;
  routes: AdministrationRoute[];
  dilution?: string;
  indications: string[];
  contraindications: string[];
  sideEffects?: string[];
  antidote?: string;
  notes?: string[];
  criticalPoints?: string[]; // Puntos TES críticos específicos
  source?: string; // Fuente del manual
}

export const drugs: Drug[] = [
  {
    id: 'oxigeno',
    genericName: 'Oxígeno (O₂)',
    tradeName: 'Oxígeno medicinal',
    category: 'oxigenoterapia',
    presentation: 'Gas medicinal. Balas de 2L, 5L, 10L, 15L. Concentración variable según dispositivo.',
    adultDose: 'Mascarilla con reservorio: 10-15 L/min (FiO₂ ~85%). Mascarilla simple: 5-10 L/min (FiO₂ ~40-60%). Gafas nasales: 1-6 L/min (FiO₂ 24-44%).',
    pediatricDose: 'Ajustar por respuesta. Gafas nasales: 1-4 L/min. Mascarilla simple: 5-8 L/min. En lactantes, evitar flujos >4L/min por riesgo de retinopatía.',
    routes: ['Inhalatoria'],
    indications: [
      'Hipoxia (SpO₂ <94%)',
      'Parada cardiorrespiratoria',
      'Ictus',
      'Síndrome Coronario Agudo',
      'Trauma grave',
    ],
    contraindications: [
      'En EPOC conocida con riesgo de hipercapnia: usar Venturi 28% y titular a SpO₂ 88-92%',
    ],
    notes: [
      'NO es un fármaco inocuo',
      'Humedecer si uso prolongado >2h',
      'En EPOC conocida: usar Venturi 28% y titular a SpO₂ 88-92%',
    ],
    criticalPoints: [
      'Terapia, no placebo. Usarlo con indicación y precaución en EPOC',
      'En EPOC conocida con riesgo de hipercapnia, usar Venturi 28% y titular a SpO₂ 88-92%',
    ],
    source: 'BLOQUE_06_1_VADEMECUM_OPERATIVO.md'
  },
  {
    id: 'adrenalina',
    genericName: 'Adrenalina (Epinefrina)',
    tradeName: 'Adrenalina Braun®',
    category: 'cardiovascular',
    presentation: 'ANAFILAXIA: Ampolla 1 mg/1 ml (1:1000). PCR: Ampolla 1 mg/10 ml (1:10.000). ¡LEER ETIQUETA EN VOZ ALTA!',
    adultDose: 'ANAFILAXIA: 0.5 mg IM (0.5 ml de ampolla 1:1000). Repetir a los 5 min si no mejora. PCR: 1 mg IV/IO (10 ml de ampolla 1:10.000) cada 3-5 min.',
    pediatricDose: 'ANAFILAXIA: 0.01 mg/kg IM (Máx. 0.5 mg). Ej: 20kg → 0.2 mg = 0.2 ml. PCR: 0.01 mg/kg IV/IO (o según protocolo local).',
    routes: ['IM', 'IV', 'IO'],
    dilution: 'ANAFILAXIA: Sin diluir. PCR: Sin diluir (usar ampolla 1:10.000 directamente).',
    indications: [
      'Anafilaxia grave: Reacción alérgica sistémica con afectación respiratoria (estridor, sibilancias, disnea) y/o cardiovascular (hipotensión, taquicardia, colapso)',
      'Parada cardiorrespiratoria: Cualquier ritmo (FV/TVSP, AESP, ACR) como parte del algoritmo SVA, una vez establecida vía IV/IO',
    ],
    contraindications: [
      'No hay contraindicaciones absolutas en emergencias vitales',
      'Paciente anciano o con cardiopatía isquémica: El beneficio en anafilaxia grave supera el riesgo. Administrar y monitorizar estrechamente',
    ],
    sideEffects: ['Temblor', 'Taquicardia', 'Palidez', 'HTA', 'Arritmias'],
    notes: [
      '⚠️ CONCENTRACIÓN CRÍTICA: 1:1000 (1 mg/ml) para Anafilaxia IM. 1:10.000 (0.1 mg/ml) para PCR IV/IO',
      'ANAFILAXIA: Fármaco salvavidas. Administración IM precoz es la intervención más importante. No esperar',
      'ANAFILAXIA: Sitio IM = TERCIO MEDIO DEL VASTO EXTERNO (muslo lateral). Alternativa: deltoides',
      'ANAFILAXIA: Técnica IM: Aguja perpendicular (90º), inyección con decisión, no masajear zona',
      'ANAFILAXIA: Efectos adversos esperados (temblor, taquicardia, palidez) NO son motivo para retener la dosis',
      'ANAFILAXIA: Valorar respuesta a los 2-3 min. Si NO hay mejoría a los 5 MIN, preparar segunda dosis en otro muslo',
      'PCR: La adrenalina es secundaria a RCP de alta calidad y desfibrilación temprana',
      'PCR: Administrar durante pausa mínima en compresiones, seguido de lavado con 20 ml SSF',
      'PCR: Reanudar compresiones inmediatamente tras administración',
      'PCR: Repetir cada 3-5 minutos mientras persista la PCR',
      'PEDIATRÍA: Calcular estrictamente por peso. Un error decimal es grave. Usar calculadora y verificar',
      'EMBARAZO: La adrenalina es el tratamiento de elección. Salva a la madre y al feto. Administrar IM en vasto externo',
      'BETABLOQUEANTES: Pueden tener respuesta atenuada o reacción bifásica. Notificar en el parte',
    ],
    criticalPoints: [
      '⚠️ ERROR CRÍTICO: Confundir 1:1000 con 1:10.000. Administrar 1 mg/ml (1:1000) por vía IV en PCR equivale a 10 mg (LETAL)',
      '⚠️ ERROR CRÍTICO: Retrasar administración en anafilaxia por "ver si mejora". El tratamiento es URGENTE',
      '⚠️ ERROR CRÍTICO: No preparar segunda dosis en anafilaxia cuando no hay respuesta. Es frecuentemente necesaria',
      '⚠️ ERROR CRÍTICO: Administrar IM por vía subcutánea. La absorción es más lenta e inefectiva',
      '⚠️ ERROR CRÍTICO: Administrar IV/IO en PCR sin asegurar RCP de alta calidad. El fármaco no circula sin compresiones efectivas',
      '⚠️ ERROR CRÍTICO: No verificar peso pediátrico y adivinar la dosis',
      '⚠️ ERROR CRÍTICO: Documentar "1 ampolla" en lugar de dosis exacta en mg y ml',
      'Anafilaxia: 1:1000 IM en el MUSLO. 0.5 mg adultos, 0.01 mg/kg niños. Repetir a los 5 min si no mejora',
      'PCR: 1:10.000 IV/IO. 1 mg adultos, 0.01 mg/kg niños. Cada 3-5 min',
      '¡CONCENTRACIÓN! Es lo primero que compruebas al coger la ampolla. Grítala en voz alta',
      'La vía IM para anafilaxia es segura y rápida. No temas a sus efectos adversos leves; son signo de que el fármaco actúa',
      'En PCR, la adrenalina es un acompañante de la RCP, no su sustituto. Primero compresiones y DESA',
    ],
    source: 'BLOQUE_06_3_ADRENALINA.md'
  },
  {
    id: 'amiodarona',
    source: 'Vademécum base',
    genericName: 'Amiodarona',
    tradeName: 'Trangorex®',
    category: 'cardiovascular',
    presentation: '150 mg/3 ml (ampolla)',
    adultDose: 'FV/TVSP: 300mg IV en bolo | Mantenimiento: 900mg/24h',
    pediatricDose: '5 mg/kg IV/IO (máx 300mg)',
    routes: ['IV', 'IO'],
    dilution: 'Diluir en SG5% (precipita con SSF)',
    indications: [
      'FV/TVSP refractaria a descargas',
      'Taquicardia ventricular estable',
      'Control de frecuencia en FA',
    ],
    contraindications: [
      'Bradicardia sinusal',
      'Bloqueo AV 2º-3º grado sin marcapasos',
      'Disfunción tiroidea severa',
      'Hipersensibilidad al yodo',
    ],
    sideEffects: ['Hipotensión', 'Bradicardia', 'Flebitis'],
    notes: [
      'Segunda dosis en PCR: 150mg si persiste FV/TVSP',
      'Usar vía central si es posible',
    ],
  },
  {
    id: 'atropina',
    genericName: 'Atropina',
    tradeName: 'Atropina Braun®',
    category: 'cardiovascular',
    presentation: '1 mg/1 ml (ampolla)',
    adultDose: 'Bradicardia: 0.5mg IV cada 3-5 min (máx 3mg)',
    pediatricDose: '0.02 mg/kg IV (mín 0.1mg, máx 0.5mg)',
    routes: ['IV', 'IO', 'IM'],
    indications: [
      'Bradicardia sintomática',
      'Intoxicación por organofosforados',
      'Premedicación antes de IOT',
    ],
    contraindications: [
      'Glaucoma de ángulo estrecho',
      'Retención urinaria',
      'Íleo paralítico',
    ],
    sideEffects: ['Taquicardia', 'Sequedad de boca', 'Retención urinaria', 'Midriasis'],
    antidote: 'Fisostigmina',
    notes: [
      'Dosis <0.5mg pueden causar bradicardia paradójica',
      'Ya NO se usa en PCR según guías actuales',
    ],
  },
  {
    id: 'midazolam',
    source: 'Vademécum base',
    genericName: 'Midazolam',
    tradeName: 'Dormicum®',
    category: 'neurologico',
    presentation: '15 mg/3 ml o 5 mg/5 ml (ampolla)',
    adultDose: 'Sedación: 1-2.5mg IV titulando | Crisis: 10mg IM/Intranasal',
    pediatricDose: 'Crisis: 0.2-0.3 mg/kg intranasal/bucal (máx 10mg)',
    routes: ['IV', 'IM', 'Nasal', 'Rectal'],
    dilution: 'Puede administrarse sin diluir IV lento',
    indications: [
      'Status epiléptico',
      'Sedación para procedimientos',
      'Premedicación anestésica',
      'Agitación severa',
    ],
    contraindications: [
      'Miastenia gravis',
      'Insuficiencia respiratoria severa',
      'Shock',
    ],
    sideEffects: ['Depresión respiratoria', 'Hipotensión', 'Amnesia'],
    antidote: 'Flumazenilo',
    notes: [
      'En crisis: vía intranasal con atomizador (MAD)',
      'Inicio de acción IV: 1-2 min, IM/IN: 5-10 min',
    ],
  },
  {
    id: 'salbutamol',
    genericName: 'Salbutamol',
    tradeName: 'Ventolin®',
    category: 'respiratorio',
    presentation: 'Nebulización: 5 mg/ml | MDI: 100 mcg/puff',
    adultDose: 'Nebulización: 2.5-5mg | MDI: 4-8 puffs con cámara',
    pediatricDose: 'Nebulización: 2.5mg (<20kg) o 5mg (>20kg) | MDI: 4-6 puffs',
    routes: ['Nebulizado'],
    dilution: 'Diluir en 3ml de SSF para nebulizar',
    indications: [
      'Crisis asmática',
      'EPOC reagudizado',
      'Broncoespasmo',
      'Hiperpotasemia (coadyuvante)',
    ],
    contraindications: [
      'Hipersensibilidad conocida',
      'Usar con precaución en cardiopatía isquémica',
    ],
    sideEffects: ['Taquicardia', 'Temblor', 'Hipopotasemia', 'Nerviosismo'],
    notes: [
      'En crisis grave: nebulización continua',
      'Puede repetirse cada 20 min las primeras horas',
      'Asociar ipratropio en crisis moderada-grave',
    ],
  },
];

export const getDrugsByCategory = (category: DrugCategory): Drug[] => {
  return drugs.filter((d) => d.category === category);
};

export const getDrugById = (id: string): Drug | undefined => {
  return drugs.find((d) => d.id === id);
};

export const searchDrugs = (query: string): Drug[] => {
  const lowerQuery = query.toLowerCase();
  return drugs.filter(
    (d) =>
      d.genericName.toLowerCase().includes(lowerQuery) ||
      d.tradeName.toLowerCase().includes(lowerQuery) ||
      d.indications.some((i) => i.toLowerCase().includes(lowerQuery))
  );
};
