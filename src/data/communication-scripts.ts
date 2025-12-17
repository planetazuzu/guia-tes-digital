/**
 * Guiones de Comunicación Operativa - Manual TES Digital
 * 
 * Este módulo contiene guiones operativos para comunicación efectiva
 * durante procedimientos, coordinación con equipo, y situaciones difíciles.
 * 
 * Fuente: Manual TES Digital
 * - BLOQUE_03_16_COMUNICACION_OPERATIVA.md
 * - BLOQUE_04_1_RCP_ADULTOS.md (sección 4.1.9)
 * - BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md (sección 4.9.4)
 */

export type ScriptContext = 
  | 'procedimiento'      // Durante procedimiento médico
  | 'coordinacion'       // Con equipo/coordinador
  | 'paciente'           // Directo al paciente
  | 'familiares'         // Con familiares
  | 'situacion_dificil'; // Situaciones difíciles

export type ScriptCategory = 
  | 'oxigenoterapia'
  | 'aspiracion'
  | 'bvm_canulas'
  | 'curas_vendajes'
  | 'transferencias'
  | 'control_termico'
  | 'rcp'
  | 'desa'
  | 'pls'
  | 'situaciones_dificiles';

export interface CommunicationScript {
  id: string;
  title: string;
  shortTitle: string;
  category: ScriptCategory;
  context: ScriptContext;
  situation: string; // Descripción de la situación
  script: string; // Frase completa para leer
  variations?: string[]; // Variaciones según dispositivo/situación
  whenToUse: string; // Cuándo usar este guión
  notes?: string; // Notas para el TES
  source?: string;
}

/**
 * Guiones de Procedimientos (BLOQUE_03_16_COMUNICACION_OPERATIVA.md)
 */

export const oxigenoGafasNasales: CommunicationScript = {
  id: 'oxigeno-gafas-nasales',
  title: 'Colocar Gafas Nasales O₂',
  shortTitle: 'O₂ Gafas',
  category: 'oxigenoterapia',
  context: 'paciente',
  situation: 'Colocar gafas nasales de oxígeno',
  script: 'Te voy a poner oxígeno para ayudarte a respirar mejor. Vas a notar el flujo de aire en la nariz. Es normal, no te preocupes. ¿Me sigues?',
  variations: [
    'Para mascarilla simple: "...en la nariz y boca"',
    'Para mascarilla con reservorio: "...flujo de aire más concentrado"'
  ],
  whenToUse: 'Al colocar cualquier dispositivo de oxigenoterapia',
  notes: 'Adaptar según dispositivo. Mantener tono tranquilo. Estructura: qué hacemos + qué notará + tranquilizar.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const aspiracion: CommunicationScript = {
  id: 'aspiracion',
  title: 'Aspiración',
  shortTitle: 'Aspiración',
  category: 'aspiracion',
  context: 'paciente',
  situation: 'Realizar aspiración de vía aérea',
  script: 'Necesito limpiar tu boca/garganta para que respires mejor. Vas a notar una sensación de succión, puede ser un poco molesta pero es rápida. ¿Me sigues?',
  variations: [
    'Para Yankauer: "...sensación de succión en la boca"',
    'Para sonda flexible: "...sensación de succión más profunda"'
  ],
  whenToUse: 'Antes de realizar aspiración de vía aérea',
  notes: 'Anticipar sensación (succión, puede ser molesta). Adaptar según tipo de aspiración.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const bvm: CommunicationScript = {
  id: 'bvm',
  title: 'Bolsa-Válvula-Mascarilla (BVM)',
  shortTitle: 'BVM',
  category: 'bvm_canulas',
  context: 'paciente',
  situation: 'Colocar BVM para ventilación asistida',
  script: 'Necesito ayudarte a respirar con una mascarilla. Voy a colocarla sobre tu nariz y boca. Puede ser un poco incómoda pero es necesaria. ¿Me sigues?',
  variations: [],
  whenToUse: 'Al colocar BVM para ventilación asistida',
  notes: 'Ser prudente (no prometer que no dolerá si puede doler). Mantener términos operativos.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const opaNpa: CommunicationScript = {
  id: 'opa-npa',
  title: 'Cánulas OPA/NPA',
  shortTitle: 'OPA/NPA',
  category: 'bvm_canulas',
  context: 'paciente',
  situation: 'Colocar cánula orofaríngea o nasofaríngea',
  script: 'Necesito ayudarte a respirar mejor. Voy a colocar un dispositivo en tu boca/nariz para mantener la vía aérea abierta. Puede ser un poco incómodo pero es necesario. ¿Me sigues?',
  variations: [
    'Para OPA: "...dispositivo en tu boca"',
    'Para NPA: "...dispositivo en tu nariz"'
  ],
  whenToUse: 'Al colocar cánulas orofaríngeas o nasofaríngeas',
  notes: 'Ser prudente. Mantener términos operativos. Adaptar según dispositivo.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const curasVendajes: CommunicationScript = {
  id: 'curas-vendajes',
  title: 'Curas y Vendajes',
  shortTitle: 'Curas',
  category: 'curas_vendajes',
  context: 'paciente',
  situation: 'Realizar curas y aplicar vendajes',
  script: 'Voy a limpiar y cubrir tu herida. Primero voy a limpiar, puede molestar un poco. Luego voy a cubrirla y fijarla. ¿Me sigues?',
  variations: [
    'Para abrasión: "...limpiar la rozadura"',
    'Para laceración: "...limpiar el corte"',
    'Para quemadura: "...limpiar la quemadura, puede ser más molesto"'
  ],
  whenToUse: 'Al realizar curas y aplicar vendajes',
  notes: 'Anticipar sensaciones (limpieza puede molestar, presión al fijar). Adaptar según tipo de herida.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const transferencias: CommunicationScript = {
  id: 'transferencias',
  title: 'Transferencias a Camilla/Silla',
  shortTitle: 'Transferencias',
  category: 'transferencias',
  context: 'paciente',
  situation: 'Transferir paciente a camilla o silla de evacuación',
  script: 'Vamos a moverte a la camilla/silla para llevarte al hospital. Te voy a mover con cuidado, puede molestar un poco pero es necesario. ¿Me sigues?',
  variations: [
    'Para camilla: "...a la camilla"',
    'Para silla salvaescaleras: "...a la silla para bajar las escaleras"'
  ],
  whenToUse: 'Antes de transferir paciente a camilla o silla',
  notes: 'Anticipar movimiento (puede molestar, pero es necesario). Adaptar según tipo de transferencia.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const controlTermico: CommunicationScript = {
  id: 'control-termico',
  title: 'Control Térmico',
  shortTitle: 'Control Térmico',
  category: 'control_termico',
  context: 'paciente',
  situation: 'Aplicar medidas de control térmico',
  script: 'Te voy a tapar con una manta para mantenerte caliente. Es importante para tu seguridad. ¿Me sigues?',
  variations: [
    'Para manta térmica: "...con una manta térmica"',
    'Para aislamiento: "...con mantas para aislarte del frío"'
  ],
  whenToUse: 'Al aplicar medidas de control térmico',
  notes: 'Explicar importancia (mantener caliente, seguridad). Adaptar según situación.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

/**
 * Guiones de RCP (BLOQUE_04_1_RCP_ADULTOS.md - sección 4.1.9)
 */

export const rcpMandoInicial: CommunicationScript = {
  id: 'rcp-mando-inicial',
  title: 'Mando Inicial - RCP',
  shortTitle: 'Mando RCP',
  category: 'rcp',
  context: 'coordinacion',
  situation: 'Asignar roles al inicio de RCP',
  script: 'Yo llevo el mando. Tú 112. Tú DESA. Tú BVM y oxígeno.',
  variations: [],
  whenToUse: 'Al inicio de RCP, para asignar roles al equipo',
  notes: 'Órdenes claras en los primeros 15-30 segundos. Un solo líder.',
  source: 'BLOQUE_04_1_RCP_ADULTOS.md'
};

export const rcpConfirmacion: CommunicationScript = {
  id: 'rcp-confirmacion',
  title: 'Confirmación PCR',
  shortTitle: 'Confirmar PCR',
  category: 'rcp',
  context: 'coordinacion',
  situation: 'Confirmar PCR al equipo',
  script: 'No responde y no respira normal: es una PCR. Empiezo compresiones.',
  variations: [],
  whenToUse: 'Tras confirmar PCR, comunicar al equipo',
  notes: 'Comunicación clara y directa. Iniciar compresiones inmediatamente.',
  source: 'BLOQUE_04_1_RCP_ADULTOS.md'
};

export const rcpControlCalidad: CommunicationScript = {
  id: 'rcp-control-calidad',
  title: 'Control de Calidad - RCP',
  shortTitle: 'Calidad RCP',
  category: 'rcp',
  context: 'coordinacion',
  situation: 'Dar feedback sobre calidad de compresiones',
  script: 'Ritmo 100–120, profundo 5–6, suelta del todo.',
  variations: [
    'Para cambio de reanimador: "Cambio en 3…2…1… ¡cambio!"'
  ],
  whenToUse: 'Durante RCP, para mantener calidad de compresiones',
  notes: 'Feedback continuo. Cambiar reanimador cada 2 minutos o antes si baja la calidad.',
  source: 'BLOQUE_04_1_RCP_ADULTOS.md'
};

export const rcpDesa: CommunicationScript = {
  id: 'rcp-desa',
  title: 'Comandos DESA',
  shortTitle: 'DESA',
  category: 'desa',
  context: 'coordinacion',
  situation: 'Coordinación durante uso de DESA',
  script: 'Coloca parches sin parar compresiones.',
  variations: [
    'Antes de análisis: "¡Nadie toca! Analiza."',
    'Antes de descarga: "¡Descarga! Reanudo compresiones ya."'
  ],
  whenToUse: 'Durante uso de DESA en RCP',
  notes: 'Continuar compresiones durante colocación de parches. Pausa solo en análisis/descarga.',
  source: 'BLOQUE_04_1_RCP_ADULTOS.md'
};

export const rcpFamiliares: CommunicationScript = {
  id: 'rcp-familiares',
  title: 'Comunicación con Familiares - RCP',
  shortTitle: 'RCP Familiares',
  category: 'rcp',
  context: 'familiares',
  situation: 'Comunicar situación a familiares durante RCP',
  script: 'Ahora lo más importante es el masaje cardíaco. Estamos actuando y ya viene ayuda.',
  variations: [],
  whenToUse: 'Cuando hay familiares presentes durante RCP',
  notes: 'Mantener foco en paciente. Comunicación breve y tranquilizadora. No prometer resultados.',
  source: 'BLOQUE_04_1_RCP_ADULTOS.md'
};

/**
 * Guiones de PLS (BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md - sección 4.9.4)
 */

export const plsPaciente: CommunicationScript = {
  id: 'pls-paciente',
  title: 'PLS - Para el Paciente',
  shortTitle: 'PLS Paciente',
  category: 'pls',
  context: 'paciente',
  situation: 'Colocar paciente en Posición Lateral de Seguridad',
  script: 'Le voy a mover de lado para que respire mejor.',
  variations: [],
  whenToUse: 'Antes de colocar paciente en PLS',
  notes: 'Hablar en voz alta al paciente aunque esté inconsciente. Tono calmado y profesional.',
  source: 'BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md'
};

export const plsEquipo: CommunicationScript = {
  id: 'pls-equipo',
  title: 'PLS - Para el Equipo/Testigos',
  shortTitle: 'PLS Equipo',
  category: 'pls',
  context: 'coordinacion',
  situation: 'Coordinar colocación de PLS con equipo o testigos',
  script: 'Voy a ponerlo en posición lateral de seguridad. Ayúdame a [despejar espacio/colocar una manta].',
  variations: [
    'Para testigos: "Soy técnico de emergencias. Voy a colocarlo en una posición segura para que respire mejor. Necesito espacio para trabajar."',
    'Para equipo: "Paciente inconsciente, respira, pulso presente. Voy a colocarlo en PLS. Tú [nombre], prepárate para monitorizar."'
  ],
  whenToUse: 'Al coordinar PLS con equipo o testigos',
  notes: 'Mantener foco en paciente. Coordinar brevemente. No perder control de situación.',
  source: 'BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md'
};

export const plsCoordinador: CommunicationScript = {
  id: 'pls-coordinador',
  title: 'PLS - Para Centro Coordinador',
  shortTitle: 'PLS Coordinador',
  category: 'pls',
  context: 'coordinacion',
  situation: 'Comunicar situación a centro coordinador',
  script: 'Paciente inconsciente, respiración espontánea, pulso presente. Colocado en PLS. Precisa traslado para valoración. Llevo X minutos en escena.',
  variations: [],
  whenToUse: 'Al comunicar situación a centro coordinador (estructura ALSAR-T)',
  notes: 'Estructura ALSAR-T: ALERTA - LOCALIZACIÓN - SITUACIÓN - RECURSOS - TIEMPO.',
  source: 'BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md'
};

/**
 * Situaciones Difíciles (BLOQUE_03_16_COMUNICACION_OPERATIVA.md - sección 3.16.5)
 */

export const pacienteAgitado: CommunicationScript = {
  id: 'paciente-agitado',
  title: 'Paciente Agitado',
  shortTitle: 'Agitado',
  category: 'situaciones_dificiles',
  context: 'situacion_dificil',
  situation: 'Comunicación con paciente agitado',
  script: 'Mantener tono tranquilo y liderazgo. Explicar brevemente qué se va a hacer. Dar instrucciones simples, de una en una. No discutir ni perder control de situación.',
  variations: [],
  whenToUse: 'Cuando el paciente está agitado o agresivo',
  notes: 'Mantener liderazgo. Tono tranquilo. Instrucciones simples. No discutir.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const pacienteDolor: CommunicationScript = {
  id: 'paciente-dolor',
  title: 'Paciente con Dolor Intenso',
  shortTitle: 'Dolor',
  category: 'situaciones_dificiles',
  context: 'situacion_dificil',
  situation: 'Comunicación con paciente con dolor intenso',
  script: 'Sé que duele. Voy a [acción]. Es necesario para [razón]. Puede molestar un poco más, pero es rápido.',
  variations: [],
  whenToUse: 'Cuando el paciente tiene dolor intenso',
  notes: 'Reconocer dolor brevemente. Explicar qué se va a hacer y por qué. Anticipar sensaciones. Trabajar con ritmo adecuado, hacer pausas si es posible.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const barreraIdiomatica: CommunicationScript = {
  id: 'barrera-idiomatica',
  title: 'Barrera Idiomática',
  shortTitle: 'Idioma',
  category: 'situaciones_dificiles',
  context: 'situacion_dificil',
  situation: 'Comunicación con barrera idiomática',
  script: 'Usar gestos simples y claros. Dar órdenes simples: "respira", "tranquilo", "no te muevas". Usar lenguaje corporal claro.',
  variations: [],
  whenToUse: 'Cuando hay barrera idiomática con el paciente',
  notes: 'Gestos simples. Órdenes simples. Lenguaje corporal claro. Coordinar con otros intervinientes si es posible.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

export const pacienteFamilia: CommunicationScript = {
  id: 'paciente-familia',
  title: 'Paciente con Familia Alrededor',
  shortTitle: 'Con Familia',
  category: 'situaciones_dificiles',
  context: 'situacion_dificil',
  situation: 'Mantener foco con familia presente',
  script: 'Mantener foco en paciente, no en familia. Coordinar con familia brevemente si es necesario: "necesito espacio para trabajar". No discutir con familia.',
  variations: [],
  whenToUse: 'Cuando hay familia alrededor del paciente',
  notes: 'Mantener foco en paciente. Coordinar brevemente si es necesario. No discutir. Mantener liderazgo y control de situación.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
};

/**
 * Array completo de guiones
 */
export const communicationScripts: CommunicationScript[] = [
  // Procedimientos
  oxigenoGafasNasales,
  aspiracion,
  bvm,
  opaNpa,
  curasVendajes,
  transferencias,
  controlTermico,
  // RCP
  rcpMandoInicial,
  rcpConfirmacion,
  rcpControlCalidad,
  rcpDesa,
  rcpFamiliares,
  // PLS
  plsPaciente,
  plsEquipo,
  plsCoordinador,
  // Situaciones difíciles
  pacienteAgitado,
  pacienteDolor,
  barreraIdiomatica,
  pacienteFamilia
];

/**
 * Funciones helper
 */
export function getScriptById(id: string): CommunicationScript | undefined {
  return communicationScripts.find(script => script.id === id);
}

export function getScriptsByCategory(category: ScriptCategory): CommunicationScript[] {
  return communicationScripts.filter(script => script.category === category);
}

export function getScriptsByContext(context: ScriptContext): CommunicationScript[] {
  return communicationScripts.filter(script => script.context === context);
}

export function searchScripts(query: string): CommunicationScript[] {
  const lowerQuery = query.toLowerCase();
  return communicationScripts.filter(script => 
    script.title.toLowerCase().includes(lowerQuery) ||
    script.shortTitle.toLowerCase().includes(lowerQuery) ||
    script.situation.toLowerCase().includes(lowerQuery) ||
    script.script.toLowerCase().includes(lowerQuery)
  );
}
