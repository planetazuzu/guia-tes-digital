export type DrugCategory = 'cardiovascular' | 'respiratorio' | 'neurologico' | 'analgesia' | 'otros';
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
}

export const drugs: Drug[] = [
  {
    id: 'adrenalina',
    genericName: 'Adrenalina',
    tradeName: 'Adrenalina Braun®',
    category: 'cardiovascular',
    presentation: '1 mg/1 ml (ampolla)',
    adultDose: 'PCR: 1mg IV/IO cada 3-5 min | Anafilaxia: 0.3-0.5mg IM',
    pediatricDose: 'PCR: 0.01 mg/kg IV/IO | Anafilaxia: 0.01 mg/kg IM (máx 0.3mg)',
    routes: ['IV', 'IO', 'IM'],
    dilution: 'PCR: sin diluir | Perfusión: 1mg en 100ml SSF (10 mcg/ml)',
    indications: [
      'Parada cardiorrespiratoria',
      'Anafilaxia',
      'Shock séptico refractario',
      'Bradicardia sintomática',
      'Crisis asmática severa',
    ],
    contraindications: [
      'No hay contraindicaciones absolutas en emergencias vitales',
    ],
    sideEffects: ['Taquicardia', 'HTA', 'Arritmias', 'Ansiedad'],
    notes: [
      'En anafilaxia: vía IM en cara anterolateral del muslo',
      'Repetir cada 5-15 min si persisten síntomas',
    ],
  },
  {
    id: 'amiodarona',
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
