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
];
