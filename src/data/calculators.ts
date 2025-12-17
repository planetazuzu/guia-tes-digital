export interface GlasgowOption {
  label: string;
  value: number;
}

export interface GlasgowCategory {
  name: string;
  options: GlasgowOption[];
}

export const glasgowScale: GlasgowCategory[] = [
  {
    name: 'Apertura Ocular',
    options: [
      { label: 'Espontánea', value: 4 },
      { label: 'A la orden verbal', value: 3 },
      { label: 'Al dolor', value: 2 },
      { label: 'No abre', value: 1 },
    ],
  },
  {
    name: 'Respuesta Verbal',
    options: [
      { label: 'Orientado', value: 5 },
      { label: 'Confuso', value: 4 },
      { label: 'Palabras inapropiadas', value: 3 },
      { label: 'Sonidos incomprensibles', value: 2 },
      { label: 'Sin respuesta', value: 1 },
    ],
  },
  {
    name: 'Respuesta Motora',
    options: [
      { label: 'Obedece órdenes', value: 6 },
      { label: 'Localiza el dolor', value: 5 },
      { label: 'Retirada al dolor', value: 4 },
      { label: 'Flexión anormal (decorticación)', value: 3 },
      { label: 'Extensión anormal (descerebración)', value: 2 },
      { label: 'Sin respuesta', value: 1 },
    ],
  },
];

export const getGlasgowInterpretation = (score: number): { severity: string; color: string } => {
  if (score <= 8) return { severity: 'TCE Grave - IOT', color: 'critical' };
  if (score <= 12) return { severity: 'TCE Moderado', color: 'high' };
  return { severity: 'TCE Leve', color: 'low' };
};

export interface InfusionRow {
  weight: number;
  doses: { [key: string]: string };
}

export interface InfusionTable {
  id: string;
  name: string;
  drugName: string;
  preparation: string;
  unit: string;
  doseRange: string;
  columns: string[];
  rows: InfusionRow[];
}

export const infusionTables: InfusionTable[] = [
  {
    id: 'dopamina',
    name: 'Perfusión Dopamina',
    drugName: 'Dopamina',
    preparation: '200mg en 100ml SG5% = 2000 mcg/ml',
    unit: 'ml/h',
    doseRange: '2-20 mcg/kg/min',
    columns: ['5 mcg/kg/min', '10 mcg/kg/min', '15 mcg/kg/min', '20 mcg/kg/min'],
    rows: [
      { weight: 50, doses: { '5 mcg/kg/min': '7.5', '10 mcg/kg/min': '15', '15 mcg/kg/min': '22.5', '20 mcg/kg/min': '30' } },
      { weight: 60, doses: { '5 mcg/kg/min': '9', '10 mcg/kg/min': '18', '15 mcg/kg/min': '27', '20 mcg/kg/min': '36' } },
      { weight: 70, doses: { '5 mcg/kg/min': '10.5', '10 mcg/kg/min': '21', '15 mcg/kg/min': '31.5', '20 mcg/kg/min': '42' } },
      { weight: 80, doses: { '5 mcg/kg/min': '12', '10 mcg/kg/min': '24', '15 mcg/kg/min': '36', '20 mcg/kg/min': '48' } },
      { weight: 90, doses: { '5 mcg/kg/min': '13.5', '10 mcg/kg/min': '27', '15 mcg/kg/min': '40.5', '20 mcg/kg/min': '54' } },
      { weight: 100, doses: { '5 mcg/kg/min': '15', '10 mcg/kg/min': '30', '15 mcg/kg/min': '45', '20 mcg/kg/min': '60' } },
    ],
  },
  {
    id: 'noradrenalina',
    name: 'Perfusión Noradrenalina',
    drugName: 'Noradrenalina',
    preparation: '8mg en 100ml SG5% = 80 mcg/ml',
    unit: 'ml/h',
    doseRange: '0.05-1 mcg/kg/min',
    columns: ['0.1 mcg/kg/min', '0.2 mcg/kg/min', '0.3 mcg/kg/min', '0.5 mcg/kg/min'],
    rows: [
      { weight: 50, doses: { '0.1 mcg/kg/min': '3.75', '0.2 mcg/kg/min': '7.5', '0.3 mcg/kg/min': '11.25', '0.5 mcg/kg/min': '18.75' } },
      { weight: 60, doses: { '0.1 mcg/kg/min': '4.5', '0.2 mcg/kg/min': '9', '0.3 mcg/kg/min': '13.5', '0.5 mcg/kg/min': '22.5' } },
      { weight: 70, doses: { '0.1 mcg/kg/min': '5.25', '0.2 mcg/kg/min': '10.5', '0.3 mcg/kg/min': '15.75', '0.5 mcg/kg/min': '26.25' } },
      { weight: 80, doses: { '0.1 mcg/kg/min': '6', '0.2 mcg/kg/min': '12', '0.3 mcg/kg/min': '18', '0.5 mcg/kg/min': '30' } },
      { weight: 90, doses: { '0.1 mcg/kg/min': '6.75', '0.2 mcg/kg/min': '13.5', '0.3 mcg/kg/min': '20.25', '0.5 mcg/kg/min': '33.75' } },
      { weight: 100, doses: { '0.1 mcg/kg/min': '7.5', '0.2 mcg/kg/min': '15', '0.3 mcg/kg/min': '22.5', '0.5 mcg/kg/min': '37.5' } },
    ],
  },
  {
    id: 'adrenalina',
    name: 'Perfusión Adrenalina',
    drugName: 'Adrenalina',
    preparation: '1mg en 100ml SG5% = 10 mcg/ml',
    unit: 'ml/h',
    doseRange: '0.05-0.5 mcg/kg/min',
    columns: ['0.1 mcg/kg/min', '0.2 mcg/kg/min', '0.3 mcg/kg/min', '0.5 mcg/kg/min'],
    rows: [
      { weight: 50, doses: { '0.1 mcg/kg/min': '30', '0.2 mcg/kg/min': '60', '0.3 mcg/kg/min': '90', '0.5 mcg/kg/min': '150' } },
      { weight: 60, doses: { '0.1 mcg/kg/min': '36', '0.2 mcg/kg/min': '72', '0.3 mcg/kg/min': '108', '0.5 mcg/kg/min': '180' } },
      { weight: 70, doses: { '0.1 mcg/kg/min': '42', '0.2 mcg/kg/min': '84', '0.3 mcg/kg/min': '126', '0.5 mcg/kg/min': '210' } },
      { weight: 80, doses: { '0.1 mcg/kg/min': '48', '0.2 mcg/kg/min': '96', '0.3 mcg/kg/min': '144', '0.5 mcg/kg/min': '240' } },
      { weight: 90, doses: { '0.1 mcg/kg/min': '54', '0.2 mcg/kg/min': '108', '0.3 mcg/kg/min': '162', '0.5 mcg/kg/min': '270' } },
      { weight: 100, doses: { '0.1 mcg/kg/min': '60', '0.2 mcg/kg/min': '120', '0.3 mcg/kg/min': '180', '0.5 mcg/kg/min': '300' } },
    ],
  },
];

/**
 * Calcula la reposición de líquidos según la Fórmula de Parkland para quemaduras
 * @param weight Peso del paciente en kg
 * @param burnPercentage Porcentaje de superficie corporal quemada (0-100)
 * @param hoursSinceBurn Horas transcurridas desde la quemadura
 * @returns Objeto con los cálculos de líquidos
 */
export const calculateParkland = (
  weight: number,
  burnPercentage: number,
  hoursSinceBurn: number = 0
): {
  total24h: number;
  total24hLiters: number;
  first8h: number;
  next16h: number;
  rateFirst8h: number;
  rateNext16h: number;
  remaining24h: number;
  maintenance: number;
} => {
  // Fórmula de Parkland: 4 ml × peso (kg) × % SCQ
  const total24h = 4 * weight * burnPercentage;
  const total24hLiters = total24h / 1000;

  // Distribución: 50% en primeras 8h, 50% en siguientes 16h
  const first8h = total24h * 0.5;
  const next16h = total24h * 0.5;

  // Velocidades de infusión
  const rateFirst8h = first8h / 8; // ml/h
  const rateNext16h = next16h / 16; // ml/h

  // Calcular líquidos restantes si ya pasaron horas
  let remaining24h = total24h;
  if (hoursSinceBurn < 8) {
    // Aún en primeras 8h
    const alreadyGiven = (hoursSinceBurn / 8) * first8h;
    remaining24h = total24h - alreadyGiven;
  } else if (hoursSinceBurn < 24) {
    // Pasadas primeras 8h, calcular restante
    const remainingHours = 24 - hoursSinceBurn;
    remaining24h = (remainingHours / 16) * next16h;
  } else {
    // Pasadas 24h, solo mantenimiento
    remaining24h = 0;
  }

  // Mantenimiento después de 24h: ~2000-2500 ml/día + pérdidas por evaporación
  // Estimación conservadora: 30-50 ml/kg/día para quemaduras extensas
  const maintenance = weight * 40; // ml/día

  return {
    total24h: Math.round(total24h),
    total24hLiters: total24hLiters,
    first8h: Math.round(first8h),
    next16h: Math.round(next16h),
    rateFirst8h,
    rateNext16h,
    remaining24h: Math.round(remaining24h),
    maintenance: Math.round(maintenance),
  };
};
