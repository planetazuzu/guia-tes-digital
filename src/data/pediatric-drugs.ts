/**
 * Fármacos comunes con dosis pediátricas para calculadora
 */

export interface PediatricDrug {
  id: string;
  name: string;
  presentation: string;
  concentration: string; // Ej: "1 mg/ml" o "150 mg/3 ml"
  dosePerKg: string; // Ej: "0.01 mg/kg" o "5 mg/kg"
  maxDose?: string; // Dosis máxima
  minDose?: string; // Dosis mínima
  route: string;
  indication: string;
  notes?: string[];
  warning?: string;
}

export const pediatricDrugs: PediatricDrug[] = [
  {
    id: 'adrenalina-anafilaxia',
    name: 'Adrenalina (Anafilaxia)',
    presentation: 'Ampolla 1 mg/1 ml (1:1000)',
    concentration: '1 mg/ml',
    dosePerKg: '0.01 mg/kg',
    maxDose: '0.5 mg',
    route: 'IM',
    indication: 'Anafilaxia grave',
    notes: [
      'Sitio IM: tercio medio del vasto externo (muslo lateral)',
      'Repetir a los 5 min si no mejora',
      'Efectos adversos esperados (temblor, taquicardia) son normales',
    ],
    warning: '⚠️ CONCENTRACIÓN CRÍTICA: Usar ampolla 1:1000 (1 mg/ml) para IM',
  },
  {
    id: 'adrenalina-pcr',
    name: 'Adrenalina (PCR)',
    presentation: 'Ampolla 1 mg/10 ml (1:10.000)',
    concentration: '0.1 mg/ml',
    dosePerKg: '0.01 mg/kg',
    route: 'IV/IO',
    indication: 'Parada cardiorrespiratoria',
    notes: [
      'Administrar durante pausa mínima en compresiones',
      'Lavado con 20 ml SSF',
      'Repetir cada 3-5 minutos',
    ],
    warning: '⚠️ CONCENTRACIÓN CRÍTICA: Usar ampolla 1:10.000 (0.1 mg/ml) para IV/IO',
  },
  {
    id: 'amiodarona',
    name: 'Amiodarona',
    presentation: 'Ampolla 150 mg/3 ml',
    concentration: '50 mg/ml',
    dosePerKg: '5 mg/kg',
    maxDose: '300 mg',
    route: 'IV/IO',
    indication: 'FV/TVSP refractaria',
    notes: [
      'Diluir en SG5% (precipita con SSF)',
      'Segunda dosis: 150 mg si persiste FV/TVSP',
    ],
  },
  {
    id: 'atropina',
    name: 'Atropina',
    presentation: 'Ampolla 1 mg/1 ml',
    concentration: '1 mg/ml',
    dosePerKg: '0.02 mg/kg',
    minDose: '0.1 mg',
    maxDose: '0.5 mg',
    route: 'IV/IO',
    indication: 'Bradicardia sintomática',
    notes: [
      'Dosis <0.5 mg pueden causar bradicardia paradójica',
      'Repetir cada 3-5 min si es necesario',
    ],
  },
  {
    id: 'midazolam-crisis',
    name: 'Midazolam (Crisis)',
    presentation: 'Ampolla 5 mg/1 ml o 10 mg/2 ml',
    concentration: '5 mg/ml',
    dosePerKg: '0.2-0.3 mg/kg',
    maxDose: '10 mg',
    route: 'Intranasal/Bucal',
    indication: 'Crisis convulsiva',
    notes: [
      'Vía intranasal o bucal preferida en pediatría',
      'Monitorizar respiración',
    ],
  },
  {
    id: 'salbutamol-nebulizacion',
    name: 'Salbutamol (Nebulización)',
    presentation: 'Ampolla 2.5 mg/2.5 ml',
    concentration: '1 mg/ml',
    dosePerKg: '0.15 mg/kg',
    route: 'Nebulizado',
    indication: 'Crisis asmática / Broncoespasmo',
    notes: [
      '<20 kg: 2.5 mg',
      '≥20 kg: 5 mg',
      'Repetir cada 20 min si es necesario',
    ],
  },
  {
    id: 'furosemida',
    name: 'Furosemida',
    presentation: 'Ampolla 20 mg/2 ml',
    concentration: '10 mg/ml',
    dosePerKg: '1-2 mg/kg',
    maxDose: '40 mg',
    route: 'IV/IO',
    indication: 'Edema pulmonar / Insuficiencia cardíaca',
    notes: [
      'Administrar lentamente',
      'Monitorizar diuresis',
    ],
  },
  {
    id: 'morfina',
    name: 'Morfina',
    presentation: 'Ampolla 10 mg/1 ml',
    concentration: '10 mg/ml',
    dosePerKg: '0.1-0.2 mg/kg',
    maxDose: '10 mg',
    route: 'IV/IO',
    indication: 'Dolor severo',
    notes: [
      'Administrar lentamente',
      'Monitorizar respiración',
      'Tener naloxona disponible',
    ],
    warning: '⚠️ Monitorizar respiración. Tener naloxona disponible',
  },
  {
    id: 'naloxona',
    name: 'Naloxona',
    presentation: 'Ampolla 0.4 mg/1 ml',
    concentration: '0.4 mg/ml',
    dosePerKg: '0.01-0.1 mg/kg',
    route: 'IV/IO/IM',
    indication: 'Intoxicación opioides / Depresión respiratoria',
    notes: [
      'Dosis inicial: 0.01 mg/kg',
      'Repetir si es necesario',
      'Efecto corto, puede requerir múltiples dosis',
    ],
  },
  {
    id: 'glucosa',
    name: 'Glucosa (Dextrosa)',
    presentation: 'Ampolla 50% 25 g/50 ml',
    concentration: '0.5 g/ml',
    dosePerKg: '0.5-1 g/kg',
    route: 'IV/IO',
    indication: 'Hipoglucemia',
    notes: [
      'Diluir al 10% o 25% según protocolo',
      'Administrar lentamente',
      'Monitorizar glucemia',
    ],
  },
];

/**
 * Calcula la dosis pediátrica de un fármaco
 */
export const calculatePediatricDose = (
  drug: PediatricDrug,
  weightKg: number
): {
  doseMg: number;
  doseMl: number;
  isValid: boolean;
  warning?: string;
  message?: string;
} => {
  // Extraer dosis por kg del string (ej: "0.01 mg/kg" -> 0.01)
  const doseMatch = drug.dosePerKg.match(/([\d.]+)\s*mg\/kg/);
  if (!doseMatch) {
    return {
      doseMg: 0,
      doseMl: 0,
      isValid: false,
      message: 'Error al parsear dosis por kg',
    };
  }

  const dosePerKg = parseFloat(doseMatch[1]);
  let doseMg = weightKg * dosePerKg;

  // Aplicar dosis mínima si existe
  if (drug.minDose) {
    const minMatch = drug.minDose.match(/([\d.]+)\s*mg/);
    if (minMatch) {
      const minDose = parseFloat(minMatch[1]);
      if (doseMg < minDose) {
        doseMg = minDose;
      }
    }
  }

  // Aplicar dosis máxima si existe
  let warning: string | undefined;
  if (drug.maxDose) {
    const maxMatch = drug.maxDose.match(/([\d.]+)\s*mg/);
    if (maxMatch) {
      const maxDose = parseFloat(maxMatch[1]);
      if (doseMg > maxDose) {
        warning = `⚠️ Dosis calculada (${doseMg.toFixed(2)} mg) excede el máximo (${maxDose} mg). Usar dosis máxima: ${maxDose} mg`;
        doseMg = maxDose;
      }
    }
  }

  // Calcular ml según concentración
  const concMatch = drug.concentration.match(/([\d.]+)\s*mg\/ml/);
  if (!concMatch) {
    return {
      doseMg,
      doseMl: 0,
      isValid: false,
      message: 'Error al parsear concentración',
    };
  }

  const concentration = parseFloat(concMatch[1]);
  const doseMl = doseMg / concentration;

  return {
    doseMg: Math.round(doseMg * 100) / 100, // Redondear a 2 decimales
    doseMl: Math.round(doseMl * 1000) / 1000, // Redondear a 3 decimales
    isValid: true,
    warning,
  };
};
