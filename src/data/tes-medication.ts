/**
 * Medicación que puede administrar el TES
 * Solo información de ejecución bajo prescripción facultativa
 * NO incluye dosis ni decisiones clínicas
 */

export interface TESMedication {
  id: string;
  name: string;
  category: 'hipoglucemia' | 'respiratorio' | 'anafilaxia';
  indication: string;
  presentation: string;
  route: string;
  notes?: string[];
  warning?: string;
}

export const tesMedications: TESMedication[] = [
  {
    id: 'glucagon',
    name: 'Glucagón',
    category: 'hipoglucemia',
    indication: 'Hipoglucemia severa con pérdida de consciencia',
    presentation: 'Polvo para reconstituir + disolvente',
    route: 'IM/SC',
    notes: [
      'Administrar si paciente inconsciente y no se puede administrar glucosa oral',
      'Efecto en 10-15 minutos',
      'Monitorizar glucemia tras administración',
    ],
    warning: 'Solo si paciente inconsciente y no se puede administrar glucosa oral',
  },
  {
    id: 'salbutamol-nebulizacion',
    name: 'Salbutamol (Nebulización)',
    category: 'respiratorio',
    indication: 'Crisis asmática / Broncoespasmo',
    presentation: 'Ampolla nebulización',
    route: 'Nebulizado',
    notes: [
      'Administrar con nebulizador y mascarilla',
      'Monitorizar respuesta respiratoria',
      'Puede repetirse según prescripción',
    ],
  },
  {
    id: 'atrovent-nebulizacion',
    name: 'Atrovent (Ipratropio)',
    category: 'respiratorio',
    indication: 'Crisis asmática / Broncoespasmo',
    presentation: 'Ampolla nebulización',
    route: 'Nebulizado',
    notes: [
      'Puede combinarse con Salbutamol según prescripción',
      'Administrar con nebulizador',
    ],
  },
  {
    id: 'pulmicort-nebulizacion',
    name: 'Pulmicort (Budesonida)',
    category: 'respiratorio',
    indication: 'Crisis asmática / Broncoespasmo',
    presentation: 'Suspensión para nebulización',
    route: 'Nebulizado',
    notes: [
      'Corticosteroide inhalado',
      'Efecto antiinflamatorio',
    ],
  },
  {
    id: 'combiprasal',
    name: 'Combiprasal',
    category: 'respiratorio',
    indication: 'Crisis asmática / Broncoespasmo',
    presentation: 'Combinación Salbutamol + Ipratropio',
    route: 'Nebulizado',
    notes: [
      'Combinación de broncodilatadores',
      'Administrar con nebulizador',
    ],
  },
  {
    id: 'adrenalina-anafilaxia',
    name: 'Adrenalina (Anafilaxia)',
    category: 'anafilaxia',
    indication: 'Anafilaxia grave',
    presentation: 'Ampolla 1 mg/1 ml (1:1000)',
    route: 'IM',
    notes: [
      'Sitio IM: tercio medio del vasto externo (muslo lateral)',
      'Fármaco salvavidas - administración precoz es crítica',
      'Efectos adversos esperados (temblor, taquicardia) son normales',
      'Repetir según prescripción si no hay mejoría',
    ],
    warning: '⚠️ CONCENTRACIÓN CRÍTICA: Usar ampolla 1:1000 (1 mg/ml) para IM. Leer etiqueta en voz alta.',
  },
  {
    id: 'urbason',
    name: 'Urbason (Metilprednisolona)',
    category: 'anafilaxia',
    indication: 'Anafilaxia grave (tratamiento complementario)',
    presentation: 'Ampolla inyectable',
    route: 'IV/IM',
    notes: [
      'Corticosteroide de acción rápida',
      'Complementa la acción de adrenalina',
      'Efecto antiinflamatorio y antialérgico',
    ],
  },
];

export const getMedicationsByCategory = (category: TESMedication['category']): TESMedication[] => {
  return tesMedications.filter((m) => m.category === category);
};

export const getMedicationById = (id: string): TESMedication | undefined => {
  return tesMedications.find((m) => m.id === id);
};
