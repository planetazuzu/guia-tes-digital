/**
 * Principios de Administración de Fármacos - Manual TES Digital
 * 
 * Capítulo 6.0 – Principios de Administración de Fármacos
 * 
 * Fuente: Manual TES Digital - Bloque 6
 */

export interface AdministrationPrinciple {
  id: string;
  title: string;
  description: string;
  critical?: boolean;
}

export interface AdministrationStep {
  id: string;
  order: number;
  title: string;
  instruction: string;
  critical?: boolean;
  notes?: string;
}

export interface DrugAdministration {
  objective: string;
  scope: string;
  principles: AdministrationPrinciple[];
  material: string[];
  indications: string[];
  precautions: {
    title: string;
    description: string;
  }[];
  preparationSteps: AdministrationStep[];
  procedureSteps: AdministrationStep[];
  criticalErrors: string[];
  keyPoints: string[];
}

export const drugAdministration: DrugAdministration = {
  objective: 'Establecer las reglas de seguridad y los pasos sistemáticos para la administración segura y efectiva de cualquier fármaco en el ámbito prehospitalario, minimizando el riesgo de error.',
  
  scope: 'Aplica a la administración de todos los fármacos incluidos en el vademécum operativo TES, por las vías autorizadas (vía oral, intramuscular, nebulización, etc.). No cubre la preparación de fármacos intravenosos continuos ni procedimientos fuera del protocolo TES.',
  
  principles: [
    {
      id: 'seguridad-absoluta',
      title: 'La seguridad del paciente es absoluta',
      description: 'Verificar 3 veces: al sacar, al preparar, al administrar.',
      critical: true
    },
    {
      id: 'conocimiento-farmaco',
      title: 'Conocer el fármaco',
      description: 'Conocer la indicación, dosis, vía, contraindicaciones y efectos adversos de cada fármaco.',
      critical: true
    },
    {
      id: 'documentacion',
      title: 'Documentar siempre',
      description: 'Documentar siempre: fármaco, dosis, vía, hora y efectos observados.',
      critical: true
    },
    {
      id: 'un-farmaco',
      title: 'Un solo fármaco a la vez',
      description: 'Nunca administrar múltiples fármacos nuevos simultáneamente.',
      critical: true
    }
  ],
  
  material: [
    'Guantes',
    'Fármaco prescrito y en buen estado (revisar caducidad, integridad)',
    'Material estéril según vía (jeringa, aguja, nebulizador, vaso con agua)',
    'Antiséptico (torunda con alcohol clorhexidina o povidona yodada para vía IM)',
    'Contenedor de objetos punzocortantes'
  ],
  
  indications: [
    'Administración de cualquier fármaco autorizado tras valoración clínica',
    'Seguir el protocolo específico para la patología del paciente (SCA, anafilaxia, crisis asmática, hipoglucemia, etc.)'
  ],
  
  precautions: [
    {
      title: 'Paciente inconsciente o con nivel de consciencia disminuido',
      description: 'Riesgo de aspiración con vía oral. Priorizar otras vías (IM, nebulización).'
    },
    {
      title: 'Paciente pediátrico',
      description: 'Calcular la dosis por peso (kg) con calculadora y verificar con compañero. Usar fórmulas pediátricas si existen.'
    },
    {
      title: 'Alergias declaradas',
      description: 'Confirmar que el fármaco a administrar no está contraindicado. Ante la menor duda, no administrar y consultar.'
    },
    {
      title: 'Entorno inestable (vehículo en movimiento)',
      description: 'Asegurar firmeza y seguridad antes de preparar o administrar. Si es posible, esperar a estar parado.'
    }
  ],
  
  preparationSteps: [
    {
      id: 'valoracion-clinica',
      order: 1,
      title: 'Valoración clínica',
      instruction: 'Confirmar que el paciente cumple los criterios del protocolo que indica el uso del fármaco.',
      critical: true
    },
    {
      id: 'verificacion-equipo',
      order: 2,
      title: 'Verificación en equipo',
      instruction: 'Anunciar en voz alta el fármaco, dosis y vía previstos. Un segundo TES debe confirmar.',
      critical: true
    },
    {
      id: 'preparacion-material',
      order: 3,
      title: 'Preparación del material',
      instruction: 'Organizar todo el material necesario en una superficie limpia.'
    },
    {
      id: 'preparacion-paciente',
      order: 4,
      title: 'Preparación del paciente',
      instruction: 'Explicar el procedimiento (si está consciente), asegurar privacidad y posición adecuada.'
    }
  ],
  
  procedureSteps: [
    {
      id: 'identificacion',
      order: 1,
      title: 'Paso 1: Identificación y selección',
      instruction: 'Sacar el fármaco del maletín o botiquín. 1ª Verificación: Leer en voz alta el nombre, concentración y fecha de caducidad. Comprobar que coincide con lo prescrito.',
      critical: true
    },
    {
      id: 'preparacion-dosis',
      order: 2,
      title: 'Paso 2: Preparación',
      instruction: 'Preparar la dosis exacta según protocolo. Para líquidos, aspirar a la marca de la jeringa. Para pastillas, contar las unidades.',
      notes: '2ª Verificación: Mostrar el fármaco preparado a un compañero y anunciar de nuevo: "[Nombre del fármaco], [dosis], por vía [vía], para [indicación concisa]". El compañero confirma.',
      critical: true
    },
    {
      id: 'administracion',
      order: 3,
      title: 'Paso 3: Administración',
      instruction: 'Aplicar técnica estéril según vía (limpiar zona de punción IM, etc.). 3ª Verificación: Preguntar al paciente su nombre y alergias (si está consciente) como último control. Administrar el fármaco con la técnica correcta.',
      critical: true
    },
    {
      id: 'post-administracion',
      order: 4,
      title: 'Paso 4: Post-administración',
      instruction: 'Desechar el material punzante inmediatamente en contenedor de seguridad. Documentar de inmediato en la hoja de registro: fármaco, dosis exacta, vía, hora exacta y firma. Monitorizar al paciente: Permanecer con el paciente, reevaluar constantes y buscar efectos terapéuticos o adversos.',
      critical: true
    }
  ],
  
  criticalErrors: [
    'Administrar sin verificación en voz alta por un segundo TES',
    'No comprobar alergias. Es una pregunta obligatoria antes de cualquier administración',
    'No calcular la dosis por peso en pediatría o hacer el cálculo mentalmente sin usar herramienta',
    'No documentar la administración de forma inmediata. Lo no documentado, no se hizo',
    'Administrar un fármaco del que se desconocen las contraindicaciones o efectos adversos principales',
    'Reutilizar o tapar una aguja. Desecho inmediato en contenedor de seguridad'
  ],
  
  keyPoints: [
    'La regla de las 3 verificaciones en voz alta es infranqueable. Es tu principal barrera contra el error.',
    'Paciente pediátrico = dosis por peso. Siempre. Usa la calculadora de la app o una física.',
    'Lo documentado es ley. Anota la hora exacta, dosis y tu firma.',
    'Quédate con el paciente. La monitorización post-administración es parte del procedimiento.',
    'En caso de efecto adverso: 1) Para la administración si es continua. 2) Mantén vía aérea y soporte vital. 3) Notifica a coordinación. 4) Documenta con precisión.'
  ]
};
