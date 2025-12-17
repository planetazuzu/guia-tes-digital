/**
 * Protocolos Transtelefónicos - Manual TES Digital
 * 
 * Este módulo contiene protocolos para guiar a testigos por teléfono
 * en situaciones de emergencia (RCP, DESA, OVACE, SCA, Ictus).
 * 
 * Fuente: Manual TES Digital (Bloque 5)
 */

export type ProtocolCategory = 'rcp' | 'desa' | 'ovace' | 'sca' | 'ictus' | 'comunicacion';
export type AgeGroup = 'adulto' | 'pediatrico' | 'lactante' | 'todos';

export interface ProtocolStep {
  id: string;
  order: number;
  instruction: string; // Instrucción para leer al testigo
  verification?: string; // Pregunta para verificar que se está haciendo
  notes?: string; // Notas para el operador (no se leen al testigo)
  critical?: boolean; // Si es crítico, debe verificarse antes de continuar
}

export interface TelephoneProtocol {
  id: string;
  title: string;
  shortTitle: string;
  category: ProtocolCategory;
  ageGroup: AgeGroup;
  description: string;
  initialAssessment: string[]; // Preguntas de evaluación inicial
  steps: ProtocolStep[];
  importantNotes?: string[]; // Notas importantes para el operador
  source?: string;
}

/**
 * Protocolo: RCP Transtelefónica - Adultos
 * Fuente: BLOQUE_04_1_RCP_ADULTOS.md (adaptado para guía telefónica)
 */
export const rcpTelephoneAdult: TelephoneProtocol = {
  id: 'rcp-telephone-adult',
  title: 'RCP Transtelefónica - Adultos',
  shortTitle: 'RCP Adulto',
  category: 'rcp',
  ageGroup: 'adulto',
  description: 'Guía paso a paso para que un testigo realice RCP en un adulto mientras llega la ambulancia.',
  initialAssessment: [
    '¿Está la persona consciente? ¿Responde si le habla o le toca?',
    '¿Está respirando normalmente? (No cuente boqueadas o respiraciones muy lentas)',
    '¿Es seguro acercarse? (No hay riesgo de tráfico, electricidad, fuego, violencia)',
  ],
  steps: [
    {
      id: 'activar-112',
      order: 1,
      instruction: 'Primero, active el servicio de emergencias. ¿Ya ha llamado al 112?',
      verification: 'Confirme que ha llamado al 112 o que alguien más lo está haciendo',
      critical: true,
      notes: 'Si no ha llamado, guíe para que llame primero o que otra persona llame',
    },
    {
      id: 'colocar-superficie',
      order: 2,
      instruction: 'Coloque a la persona boca arriba sobre una superficie firme y plana, como el suelo.',
      verification: '¿Está la persona boca arriba sobre una superficie firme?',
      critical: true,
    },
    {
      id: 'abrir-via-aerea',
      order: 3,
      instruction: 'Incline suavemente la cabeza hacia atrás y levante la barbilla. Esto abre la vía aérea.',
      verification: '¿Puede ver que la cabeza está inclinada hacia atrás y la barbilla levantada?',
      notes: 'Si sospecha trauma cervical, indique que no mueva la cabeza',
    },
    {
      id: 'verificar-respiracion',
      order: 4,
      instruction: 'Acérquese y mire, escuche y sienta si respira normalmente. Hágalo durante 10 segundos máximo.',
      verification: '¿Respira normalmente? (No cuente boqueadas o respiraciones muy lentas)',
      critical: true,
    },
    {
      id: 'iniciar-compresiones',
      order: 5,
      instruction: 'Si NO respira normalmente, coloque el talón de una mano en el centro del pecho, entre los pezones. Coloque la otra mano encima y entrelace los dedos.',
      verification: '¿Tiene las manos colocadas correctamente en el centro del pecho?',
      critical: true,
    },
    {
      id: 'compresiones-tecnica',
      order: 6,
      instruction: 'Con los brazos rectos y los hombros sobre las manos, comprima el pecho hacia abajo unos 5-6 centímetros. Deje que el pecho vuelva completamente arriba después de cada compresión.',
      verification: '¿Está comprimiendo hacia abajo y dejando que el pecho vuelva completamente arriba?',
      critical: true,
      notes: 'La profundidad y el recoil completo son críticos',
    },
    {
      id: 'ritmo-compresiones',
      order: 7,
      instruction: 'Haga las compresiones a un ritmo rápido y constante, aproximadamente 100-120 por minuto. Puede contar en voz alta: "uno, dos, tres..." hasta "treinta".',
      verification: '¿Está haciendo las compresiones a un ritmo rápido y constante?',
      critical: true,
      notes: 'El ritmo es crítico: demasiado lento o rápido reduce la efectividad',
    },
    {
      id: 'ventilaciones',
      order: 8,
      instruction: 'Después de 30 compresiones, incline la cabeza hacia atrás, levante la barbilla, pellizque la nariz y dé 2 respiraciones de rescate. Cada respiración debe durar 1 segundo y ver que el pecho se eleva.',
      verification: '¿Está dando las respiraciones y ve que el pecho se eleva?',
      notes: 'Si no puede o no quiere dar respiraciones, continúe solo con compresiones',
    },
    {
      id: 'continuar-ciclos',
      order: 9,
      instruction: 'Continúe con ciclos de 30 compresiones seguidas de 2 respiraciones. No pare hasta que llegue la ambulancia o la persona empiece a respirar normalmente.',
      verification: '¿Está continuando con los ciclos sin parar?',
      critical: true,
    },
    {
      id: 'cambio-reanimador',
      order: 10,
      instruction: 'Si hay otra persona disponible, pueden turnarse cada 2 minutos para evitar el cansancio. El cambio debe ser rápido, en menos de 5 segundos.',
      verification: '¿Hay alguien más que pueda ayudar?',
      notes: 'Solo si hay más personas disponibles',
    },
  ],
  importantNotes: [
    'Si el testigo no puede o no quiere dar respiraciones, es mejor que continúe solo con compresiones que parar',
    'Las compresiones continuas sin respiraciones son mejores que no hacer nada',
    'No pare para buscar pulso: continúe hasta que llegue la ambulancia o la persona respire normalmente',
    'Si la persona empieza a respirar normalmente o se mueve, pare las compresiones y colóquela de lado',
  ],
  source: 'BLOQUE_04_1_RCP_ADULTOS.md',
};

/**
 * Protocolo: RCP Transtelefónica - Pediatría
 * Fuente: BLOQUE_04_2_RCP_PEDIATRIA.md (adaptado para guía telefónica)
 */
export const rcpTelephonePediatric: TelephoneProtocol = {
  id: 'rcp-telephone-pediatric',
  title: 'RCP Transtelefónica - Pediatría',
  shortTitle: 'RCP Pediátrico',
  category: 'rcp',
  ageGroup: 'pediatrico',
  description: 'Guía paso a paso para que un testigo realice RCP en un niño (1 año hasta pubertad) mientras llega la ambulancia.',
  initialAssessment: [
    '¿Está el niño consciente? ¿Responde si le habla o le toca?',
    '¿Está respirando normalmente? (No cuente boqueadas o respiraciones muy lentas)',
    '¿Es seguro acercarse?',
    '¿Cuántos años tiene el niño aproximadamente?',
  ],
  steps: [
    {
      id: 'activar-112-ped',
      order: 1,
      instruction: 'Primero, active el servicio de emergencias. ¿Ya ha llamado al 112?',
      verification: 'Confirme que ha llamado al 112',
      critical: true,
      notes: 'Si está solo y el colapso no fue presenciado, puede hacer 2 minutos de RCP primero',
    },
    {
      id: 'colocar-superficie-ped',
      order: 2,
      instruction: 'Coloque al niño boca arriba sobre una superficie firme y plana. Si es pequeño, puede usar una mesa si es más firme que el suelo.',
      verification: '¿Está el niño boca arriba sobre una superficie firme?',
      critical: true,
    },
    {
      id: 'abrir-via-aerea-ped',
      order: 3,
      instruction: 'Incline suavemente la cabeza hacia atrás en posición neutra y levante la barbilla. Esto abre la vía aérea.',
      verification: '¿Puede ver que la cabeza está en posición neutra y la barbilla levantada?',
    },
    {
      id: 'verificar-respiracion-ped',
      order: 4,
      instruction: 'Acérquese y mire, escuche y sienta si respira normalmente. Hágalo durante 10 segundos máximo.',
      verification: '¿Respira normalmente?',
      critical: true,
    },
    {
      id: 'iniciar-compresiones-ped',
      order: 5,
      instruction: 'Si NO respira normalmente, coloque el talón de una mano (o dos manos si el niño es grande) en el centro del pecho, entre los pezones.',
      verification: '¿Tiene la(s) mano(s) colocada(s) correctamente en el centro del pecho?',
      critical: true,
      notes: 'Una mano para niños pequeños, dos manos para niños grandes/púberes',
    },
    {
      id: 'compresiones-tecnica-ped',
      order: 6,
      instruction: 'Comprima el pecho hacia abajo aproximadamente un tercio de la profundidad del pecho (unos 5 cm en la mayoría de niños). Deje que el pecho vuelva completamente arriba después de cada compresión.',
      verification: '¿Está comprimiendo hacia abajo y dejando que el pecho vuelva completamente arriba?',
      critical: true,
    },
    {
      id: 'ritmo-compresiones-ped',
      order: 7,
      instruction: 'Haga las compresiones a un ritmo rápido y constante, aproximadamente 100-120 por minuto. Cuente en voz alta: "uno, dos, tres..." hasta "quince" (si hay dos personas) o "treinta" (si está solo).',
      verification: '¿Está haciendo las compresiones a un ritmo rápido y constante?',
      critical: true,
    },
    {
      id: 'ventilaciones-ped',
      order: 8,
      instruction: 'Después de las compresiones (15 si hay dos personas, 30 si está solo), incline la cabeza, levante la barbilla, y dé 2 respiraciones de rescate cubriendo boca Y nariz del niño. Cada respiración debe durar 1 segundo y ver que el pecho se eleva.',
      verification: '¿Está dando las respiraciones cubriendo boca y nariz y ve que el pecho se eleva?',
      notes: 'En pediatría, la ventilación es tan importante como las compresiones',
    },
    {
      id: 'continuar-ciclos-ped',
      order: 9,
      instruction: 'Continúe con ciclos de compresiones y respiraciones. No pare hasta que llegue la ambulancia o el niño empiece a respirar normalmente.',
      verification: '¿Está continuando con los ciclos sin parar?',
      critical: true,
    },
  ],
  importantNotes: [
    'En pediatría, la ventilación es tan crítica como las compresiones',
    'Si está solo y el colapso no fue presenciado, haga 2 minutos de RCP primero, luego active el 112',
    'Si el colapso fue presenciado súbito, active el 112 inmediatamente',
    'Las compresiones deben ser proporcionales al tamaño del niño',
  ],
  source: 'BLOQUE_04_2_RCP_PEDIATRIA.md',
};

/**
 * Protocolo: DESA Guiado por Teléfono
 * Fuente: BLOQUE_04_4_USO_DESA.md (adaptado para guía telefónica)
 */
export const desaTelephone: TelephoneProtocol = {
  id: 'desa-telephone',
  title: 'DESA Guiado por Teléfono',
  shortTitle: 'DESA Teléfono',
  category: 'desa',
  ageGroup: 'todos',
  description: 'Guía paso a paso para que un testigo use un DESA mientras se realiza RCP.',
  initialAssessment: [
    '¿Hay un DESA disponible cerca?',
    '¿Se está realizando RCP en este momento?',
    '¿La persona está en una superficie seca y segura?',
  ],
  steps: [
    {
      id: 'continuar-rcp',
      order: 1,
      instruction: 'Mientras alguien trae el DESA, continúe con las compresiones torácicas sin parar.',
      verification: '¿Se están haciendo compresiones continuamente?',
      critical: true,
      notes: 'La RCP no debe parar mientras se prepara el DESA',
    },
    {
      id: 'encender-desa',
      order: 2,
      instruction: 'Cuando tenga el DESA, ábralo o pulse el botón de encendido. El dispositivo le dará instrucciones verbales. Siga sus indicaciones.',
      verification: '¿Está encendido el DESA y puede oír las instrucciones?',
      critical: true,
    },
    {
      id: 'preparar-torax',
      order: 3,
      instruction: 'Exponga el pecho de la persona. Si está mojado, séquelo rápidamente con una toalla. Si hay mucho vello, rasure la zona rápidamente si es posible.',
      verification: '¿Está el pecho expuesto, seco y sin vello que interfiera?',
      notes: 'Solo pare RCP por menos de 10 segundos para esta preparación',
    },
    {
      id: 'colocar-parches',
      order: 4,
      instruction: 'Retire los parches del DESA. Coloque un parche en el lado derecho del pecho, debajo de la clavícula, junto al esternón. Coloque el otro parche en el lado izquierdo, debajo y a la izquierda del pezón. Presione firmemente cada parche durante 5 segundos.',
      verification: '¿Están los parches colocados y bien pegados?',
      critical: true,
      notes: 'Colocación estándar: esternal (derecho) y apical (izquierdo)',
    },
    {
      id: 'conectar-cable',
      order: 5,
      instruction: 'Conecte el cable al DESA si no está pre-conectado. Debería encajarse con un clic.',
      verification: '¿Está el cable conectado correctamente?',
    },
    {
      id: 'analizar-ritmo',
      order: 6,
      instruction: 'El DESA le dirá "Alto, analizando ritmo" o similar. En ese momento, pare las compresiones y asegúrese de que NADIE toca a la persona. Grite "¡Todos fuera!" para asegurarse.',
      verification: '¿Está todo el mundo alejado de la persona?',
      critical: true,
      notes: 'Nadie debe tocar durante el análisis',
    },
    {
      id: 'seguir-ordenes',
      order: 7,
      instruction: 'El DESA analizará el ritmo. Siga exactamente las instrucciones que le dé.',
      verification: '¿Está escuchando las instrucciones del DESA?',
      critical: true,
    },
    {
      id: 'descarga-si-indicada',
      order: 8,
      instruction: 'Si el DESA dice "Se recomienda descarga" o similar, confirme en voz alta "DESCARGA RECOMENDADA". Asegúrese de que NADIE toca a la persona. Pulse el botón de descarga (parpadeante) y manténgalo pulsado hasta que se administre.',
      verification: '¿Está todo el mundo alejado antes de pulsar el botón de descarga?',
      critical: true,
      notes: 'Verificación final de seguridad antes de descargar',
    },
    {
      id: 'reanudar-rcp',
      order: 9,
      instruction: 'Inmediatamente después de la descarga (o si el DESA dice "No se recomienda descarga"), reanude las compresiones torácicas sin demora. Continúe con ciclos de 30 compresiones y 2 respiraciones.',
      verification: '¿Ha reanudado las compresiones inmediatamente?',
      critical: true,
    },
    {
      id: 'continuar-ciclos-desa',
      order: 10,
      instruction: 'El DESA le pedirá que pare cada 2 minutos para analizar de nuevo. Siga sus instrucciones. Continúe hasta que llegue la ambulancia o la persona empiece a respirar normalmente.',
      verification: '¿Está siguiendo las instrucciones del DESA?',
      critical: true,
    },
  ],
  importantNotes: [
    'NUNCA toque a la persona durante el análisis o la descarga',
    'La RCP solo se para para analizar y descargar, no para colocar parches',
    'Si el DESA no recomienda descarga, reanude RCP inmediatamente',
    'El DESA guiará los ciclos completos de 2 minutos',
  ],
  source: 'BLOQUE_04_4_USO_DESA.md',
};

/**
 * Protocolo: OVACE Transtelefónica - Adultos
 * Fuente: BLOQUE_04_6_OVACE_ADULTOS.md (adaptado para guía telefónica)
 */
export const ovaceTelephoneAdult: TelephoneProtocol = {
  id: 'ovace-telephone-adult',
  title: 'OVACE Transtelefónica - Adultos',
  shortTitle: 'OVACE Adulto',
  category: 'ovace',
  ageGroup: 'adulto',
  description: 'Guía paso a paso para que un testigo resuelva una obstrucción de vía aérea en un adulto.',
  initialAssessment: [
    '¿La persona puede hablar o toser?',
    '¿Se está llevando las manos al cuello? (signo universal de atragantamiento)',
    '¿Está consciente o inconsciente?',
    '¿Es una persona obesa o embarazada?',
  ],
  steps: [
    {
      id: 'evaluar-gravedad',
      order: 1,
      instruction: 'Primero, evalúe la gravedad. ¿Puede la persona hablar, toser o respirar?',
      verification: '¿Puede hablar/toser efectivamente o no puede?',
      critical: true,
      notes: 'Si puede toser efectivamente: animar a toser, no intervenir',
    },
    {
      id: 'ovace-leve',
      order: 2,
      instruction: 'Si puede toser con fuerza, anímela a seguir tosiendo. No haga nada más. La tos es el mejor mecanismo para desobstruir.',
      verification: '¿Está tosiendo con fuerza?',
      notes: 'Solo si la tos es efectiva',
    },
    {
      id: 'ovace-grave-consciente',
      order: 3,
      instruction: 'Si NO puede hablar, toser o respirar, y está consciente, colóquese de pie detrás de la persona. Rodee su cintura con sus brazos.',
      verification: '¿Está detrás de la persona con los brazos alrededor de su cintura?',
      critical: true,
      notes: 'Solo si está consciente y la obstrucción es grave',
    },
    {
      id: 'heimlich',
      order: 4,
      instruction: 'Coloque el puño (con el pulgar hacia dentro) en la línea media del abdomen, entre el ombligo y el final del esternón. Agarre su puño con la otra mano.',
      verification: '¿Tiene el puño en la posición correcta?',
      critical: true,
    },
    {
      id: 'compresiones-abdominales',
      order: 5,
      instruction: 'Aplique compresiones rápidas hacia dentro y hacia arriba, como si intentara levantar a la persona. Haga 5 compresiones separadas y distintas.',
      verification: '¿Está haciendo compresiones hacia dentro y hacia arriba?',
      critical: true,
    },
    {
      id: 'reevaluar',
      order: 6,
      instruction: 'Después de 5 compresiones, pregunte: "¿Ha salido? ¿Puede respirar?" Si puede hablar/toser efectivamente, pare. Si no, repita las 5 compresiones.',
      verification: '¿Puede ahora hablar o toser efectivamente?',
      critical: true,
    },
    {
      id: 'si-inconsciente',
      order: 7,
      instruction: 'Si la persona pierde el conocimiento, guíela al suelo con control. Active el 112 si no lo ha hecho. Inicie RCP inmediatamente (ver protocolo RCP).',
      verification: '¿Está inconsciente? ¿Ha activado el 112?',
      critical: true,
      notes: 'Si pierde consciencia, tratar como PCR y seguir protocolo RCP',
    },
    {
      id: 'embarazada-obeso',
      order: 8,
      instruction: 'Si la persona está embarazada o es obesa, haga compresiones TORÁCICAS (sobre el esternón) en lugar de abdominales. Use la misma técnica pero sobre el pecho.',
      verification: '¿Está haciendo compresiones sobre el pecho en lugar del abdomen?',
      notes: 'Solo si está embarazada o es obesa',
    },
  ],
  importantNotes: [
    'Si puede toser efectivamente: NO intervenir, animar a toser',
    'Si está inconsciente: iniciar RCP inmediatamente',
    'En embarazadas/obesos: usar compresiones torácicas, no abdominales',
    'Después de desobstruir, siempre evaluar y considerar traslado',
  ],
  source: 'BLOQUE_04_6_OVACE_ADULTOS.md',
};

/**
 * Protocolo: SCA Transtelefónico
 * Fuente: Manual TES Digital (Bloque 5.6)
 */
export const scaTelephone: TelephoneProtocol = {
  id: 'sca-telephone',
  title: 'Sospecha de Síndrome Coronario Agudo (SCA)',
  shortTitle: 'SCA',
  category: 'sca',
  ageGroup: 'adulto',
  description: 'Reconocimiento de síntomas de SCA y primeros auxilios mientras llega la ambulancia.',
  initialAssessment: [
    '¿Tiene dolor en el pecho? ¿Cómo lo describe? (presión, opresión, ardor)',
    '¿El dolor se extiende a brazos, cuello, mandíbula o espalda?',
    '¿Tiene dificultad para respirar?',
    '¿Tiene náuseas, sudoración o mareo?',
    '¿Tiene antecedentes de problemas cardíacos?',
  ],
  steps: [
    {
      id: 'activar-112-sca',
      order: 1,
      instruction: 'Active el servicio de emergencias inmediatamente. Llame al 112 y explique que sospecha un problema cardíaco.',
      verification: '¿Ha llamado al 112?',
      critical: true,
    },
    {
      id: 'posicion-comoda',
      order: 2,
      instruction: 'Coloque a la persona en una posición cómoda, preferiblemente semisentada o recostada con la cabeza elevada. Evite que se acueste completamente plano.',
      verification: '¿Está en una posición cómoda?',
    },
    {
      id: 'aflojar-ropa',
      order: 3,
      instruction: 'Afloje cualquier ropa ajustada, especialmente alrededor del cuello y el pecho.',
      verification: '¿Está la ropa aflojada?',
    },
    {
      id: 'aspirina-si-protocolo',
      order: 4,
      instruction: 'Si la persona está consciente, no es alérgica a la aspirina, y su protocolo local lo contempla, puede darle una aspirina (300 mg) para masticar. NO la trague entera.',
      verification: '¿Puede tomar aspirina? (Consulte si es alérgica)',
      notes: 'Solo si protocolo local contempla y no es alérgica',
    },
    {
      id: 'monitorizar',
      order: 5,
      instruction: 'Mantenga a la persona tranquila y monitorice su estado. Si pierde el conocimiento o deja de respirar, inicie RCP (ver protocolo RCP).',
      verification: '¿Está consciente y respirando?',
      critical: true,
    },
    {
      id: 'preparar-para-traslado',
      order: 6,
      instruction: 'Prepare a la persona para el traslado. No le dé de comer ni beber. Mantenga la calma y espere a la ambulancia.',
      verification: '¿Está preparado para cuando llegue la ambulancia?',
    },
  ],
  importantNotes: [
    'El tiempo es crítico: activar 112 inmediatamente',
    'No dar aspirina si es alérgica o si protocolo local no lo contempla',
    'Si pierde consciencia o deja de respirar, iniciar RCP',
    'Mantener a la persona tranquila y en posición cómoda',
  ],
  source: 'BLOQUE_05_6_SCA_TRANSTELEFONICO.md',
};

/**
 * Protocolo: Ictus Transtelefónico
 * Fuente: Manual TES Digital (Bloque 5.7)
 */
export const ictusTelephone: TelephoneProtocol = {
  id: 'ictus-telephone',
  title: 'Sospecha de Ictus',
  shortTitle: 'Ictus',
  category: 'ictus',
  ageGroup: 'adulto',
  description: 'Reconocimiento de síntomas de ictus (FAST) y primeros auxilios mientras llega la ambulancia.',
  initialAssessment: [
    '¿Puede sonreír normalmente? ¿Tiene la cara caída de un lado?',
    '¿Puede levantar ambos brazos? ¿Tiene un brazo débil o caído?',
    '¿Puede hablar con claridad? ¿Tiene dificultad para hablar o habla arrastrado?',
    '¿Cuándo empezaron los síntomas?',
  ],
  steps: [
    {
      id: 'activar-112-ictus',
      order: 1,
      instruction: 'Active el servicio de emergencias INMEDIATAMENTE. Llame al 112 y explique que sospecha un ictus. El tiempo es crítico.',
      verification: '¿Ha llamado al 112?',
      critical: true,
      notes: 'El tiempo es crítico: cada minuto cuenta',
    },
    {
      id: 'test-fast',
      order: 2,
      instruction: 'Realice el test FAST: Pida que sonría (F - Face/cara), levante ambos brazos (A - Arms/brazos), y repita una frase simple (S - Speech/habla). Si alguno falla, es probable ictus.',
      verification: '¿Algún test FAST es anormal?',
      critical: true,
    },
    {
      id: 'posicion-segura',
      order: 3,
      instruction: 'Coloque a la persona en una posición segura. Si está consciente, semisentada con la cabeza elevada. Si está inconsciente pero respira, posición lateral de seguridad.',
      verification: '¿Está en una posición segura?',
    },
    {
      id: 'no-dar-comida',
      order: 4,
      instruction: 'NO le dé de comer ni beber. La persona puede tener dificultad para tragar y puede atragantarse.',
      verification: '¿Ha evitado dar comida o bebida?',
      critical: true,
    },
    {
      id: 'monitorizar-consciencia',
      order: 5,
      instruction: 'Monitorice su nivel de consciencia. Si pierde el conocimiento o deja de respirar, inicie RCP (ver protocolo RCP).',
      verification: '¿Está consciente y respirando?',
      critical: true,
    },
    {
      id: 'anotar-hora',
      order: 6,
      instruction: 'Anote la hora exacta en que empezaron los síntomas. Esta información es muy importante para el tratamiento.',
      verification: '¿Sabe cuándo empezaron los síntomas?',
      notes: 'Información crítica para tratamiento',
    },
    {
      id: 'preparar-para-traslado-ictus',
      order: 7,
      instruction: 'Prepare a la persona para el traslado urgente. Mantenga la calma y espere a la ambulancia. El tiempo es crítico.',
      verification: '¿Está preparado para cuando llegue la ambulancia?',
    },
  ],
  importantNotes: [
    'El tiempo es CRÍTICO: activar 112 inmediatamente',
    'Test FAST: Face (cara), Arms (brazos), Speech (habla), Time (tiempo)',
    'NO dar comida ni bebida: riesgo de atragantamiento',
    'Anotar hora de inicio de síntomas: información crítica',
    'Si pierde consciencia o deja de respirar, iniciar RCP',
  ],
  source: 'BLOQUE_05_7_ICTUS_TRANSTELEFONICO.md',
};

/**
 * Lista de todos los protocolos transtelefónicos disponibles
 */
export const telephoneProtocols: TelephoneProtocol[] = [
  rcpTelephoneAdult,
  rcpTelephonePediatric,
  desaTelephone,
  ovaceTelephoneAdult,
  scaTelephone,
  ictusTelephone,
];

/**
 * Obtener un protocolo por ID
 */
export function getProtocolById(id: string): TelephoneProtocol | undefined {
  return telephoneProtocols.find((protocol) => protocol.id === id);
}

/**
 * Obtener protocolos por categoría
 */
export function getProtocolsByCategory(category: ProtocolCategory): TelephoneProtocol[] {
  return telephoneProtocols.filter((protocol) => protocol.category === category);
}

/**
 * Obtener protocolos por grupo etario
 */
export function getProtocolsByAgeGroup(ageGroup: AgeGroup): TelephoneProtocol[] {
  return telephoneProtocols.filter((protocol) => protocol.ageGroup === ageGroup || protocol.ageGroup === 'todos');
}
