/**
 * Checklists de Material - Manual TES Digital
 * 
 * Este módulo contiene checklists operativos para verificación de material
 * en tres momentos clave: inicio de turno, pre-escena y post-servicio.
 * 
 * Fuente: Manual TES Digital (Bloque 3, 3.X5)
 */

export type ChecklistPhase = 'inicio_turno' | 'pre_escena' | 'post_servicio';
export type ChecklistCategory = 'oxigeno' | 'dispositivos' | 'bvm' | 'aspiracion' | 'canulas' | 'curas' | 'monitorizacion' | 'epi' | 'cierre';

export interface ChecklistItem {
  id: string;
  text: string;
  category: ChecklistCategory;
  critical?: boolean; // Si es crítico, debe estar marcado antes de continuar
  notes?: string; // Notas adicionales
}

export interface ChecklistSection {
  id: string;
  title: string;
  category: ChecklistCategory;
  items: ChecklistItem[];
  notes?: string;
}

export interface MaterialChecklist {
  id: string;
  title: string;
  shortTitle: string;
  phase: ChecklistPhase;
  description: string;
  sections: ChecklistSection[];
  source?: string;
}

/**
 * Checklist: Inicio de Turno - Material Sanitario y Oxigenoterapia
 * Fuente: BLOQUE_03_X5_CHECKLIST_MAESTRO.md - Sección 3.X5.3
 */
export const inicioTurnoChecklist: MaterialChecklist = {
  id: 'inicio-turno-material',
  title: 'Checklist Inicio de Turno - Material Sanitario',
  shortTitle: 'Inicio Turno',
  phase: 'inicio_turno',
  description: 'Verificación completa de material sanitario y oxigenoterapia antes de iniciar servicio.',
  source: 'BLOQUE_03_X5_CHECKLIST_MAESTRO.md',
  sections: [
    {
      id: 'oxigeno',
      title: 'O₂: presión, fijación, regulador, tubuladuras, prueba de flujo',
      category: 'oxigeno',
      items: [
        { id: 'botellas-disponibles', text: 'Verificar que botellas están disponibles', critical: true },
        { id: 'presion-manometro', text: 'Leer presión en manómetro (verificar que presión es adecuada)', critical: true },
        { id: 'botellas-caducadas', text: 'Verificar que botellas no están caducadas (si aplica)' },
        { id: 'valvulas-funcionan', text: 'Verificar que válvulas funcionan', critical: true },
        { id: 'fijacion-segura', text: 'Verificar que botellas están fijadas correctamente en ambulancia', critical: true },
        { id: 'regulador-disponible', text: 'Verificar que regulador está disponible y bien conectado', critical: true },
        { id: 'caudalimetro-funciona', text: 'Verificar que caudalímetro funciona (ajuste de flujo)', critical: true },
        { id: 'tubuladuras-disponibles', text: 'Verificar que tubuladuras están disponibles y en buen estado', critical: true },
        { id: 'prueba-flujo', text: 'Prueba de flujo: verificar que flujo se ajusta correctamente', critical: true },
      ],
      notes: 'Registrar presión de botellas e incidencias (botella con poca presión, válvula que no funciona, etc.)',
    },
    {
      id: 'dispositivos-oxigeno',
      title: 'Dispositivos O₂: tallas, integridad',
      category: 'dispositivos',
      items: [
        { id: 'gafas-nasales', text: 'Gafas nasales: disponibles y en buen estado' },
        { id: 'mascarilla-simple', text: 'Mascarilla simple: disponible y en buen estado' },
        { id: 'mascarilla-reservorio', text: 'Mascarilla con reservorio: disponible, buen estado, reservorio funciona', critical: true },
        { id: 'mascarilla-venturi', text: 'Mascarilla Venturi: disponible, adaptadores/boquillas completos' },
        { id: 'nebulizador', text: 'Nebulizador (si aplica): disponible, cámara y mascarilla/boquilla en buen estado' },
        { id: 'mascarillas-pediatricas', text: 'Mascarillas pediátricas: verificar tallas disponibles y buen estado', critical: true },
      ],
      notes: 'Registrar incidencias (dispositivo faltante, dañado, tallas incompletas, etc.)',
    },
    {
      id: 'bvm',
      title: 'BVM: válvula, reservorio, mascarillas, filtro si aplica',
      category: 'bvm',
      items: [
        { id: 'bolsa-estado', text: 'Bolsa: verificar que está en buen estado (sin daños) y se expande/retorna correctamente', critical: true },
        { id: 'valvula-funciona', text: 'Válvula: verificar que funciona correctamente y no está obstruida', critical: true },
        { id: 'reservorio-disponible', text: 'Reservorio: disponible (si BVM lo lleva), buen estado, conexión correcta' },
        { id: 'mascarillas-tallas', text: 'Mascarillas: verificar por tallas (adulto, pediátrico, neonatal según dotación)', critical: true },
        { id: 'mascarillas-recambios', text: 'Mascarillas: verificar que hay recambios disponibles' },
        { id: 'valvula-peep', text: 'Válvula PEEP (si existe): disponible y funciona' },
        { id: 'filtros', text: 'Filtros (si se usan): disponibles y no obstruidos' },
      ],
      notes: 'Registrar incidencias (BVM dañada, válvula que no funciona, mascarillas faltantes, etc.)',
    },
    {
      id: 'aspiracion',
      title: 'Aspiración: batería, frasco, tubuladuras, prueba de succión',
      category: 'aspiracion',
      items: [
        { id: 'aspirador-disponible', text: 'Aspirador: disponible y enciende', critical: true },
        { id: 'bateria-cargada', text: 'Batería: cargada (si aplica)', critical: true },
        { id: 'regulador-funciona', text: 'Regulador/manómetro: funciona' },
        { id: 'frasco-disponible', text: 'Frasco: disponible, buen estado, tapas cierran correctamente', critical: true },
        { id: 'tubuladuras-aspiracion', text: 'Tubuladuras: disponibles y en buen estado (sin daños)' },
        { id: 'yankauer', text: 'Cánula Yankauer: disponible y en buen estado' },
        { id: 'sondas-flexibles', text: 'Sondas flexibles: tamaños disponibles y en buen estado' },
        { id: 'filtros-aspiracion', text: 'Filtros: disponibles y no obstruidos' },
        { id: 'prueba-succion', text: 'Prueba de succión: verificar que se genera vacío correctamente', critical: true },
      ],
      notes: 'Registrar incidencias (batería descargada, frasco dañado, vacío que no funciona, etc.)',
    },
    {
      id: 'canulas',
      title: 'Cánulas: tallas completas, lubricante si aplica',
      category: 'canulas',
      items: [
        { id: 'opa-tallas', text: 'Cánulas orofaríngeas (OPA): verificar tallas disponibles (0-1, 2-3, 4, 5-6, 7-8 según dotación)', critical: true },
        { id: 'opa-estado', text: 'OPA: verificar que están en buen estado' },
        { id: 'npa-tallas', text: 'Cánulas nasofaríngeas (NPA): verificar tallas disponibles (5-6, 7, 8 según dotación)' },
        { id: 'npa-estado', text: 'NPA: verificar que están en buen estado' },
        { id: 'lubricante', text: 'Lubricante (si aplica): disponible, no caducado, hidrosoluble' },
      ],
      notes: 'Registrar incidencias (tallas faltantes, cánulas dañadas, lubricante faltante, etc.)',
    },
    {
      id: 'curas',
      title: 'Curas/hemorragias: compresas/vendas/compresivos',
      category: 'curas',
      items: [
        { id: 'gasas-compresas', text: 'Gasas/compresas/apósitos: disponibles, buen estado (no caducados, no dañados), cantidades suficientes' },
        { id: 'vendas', text: 'Vendas (crepé/elástica/cohesiva/triangular/tubular si existe): disponibles, buen estado, tamaños adecuados' },
        { id: 'cinta-esparadrapo', text: 'Cinta/esparadrapo: disponible y en buen estado' },
        { id: 'apositos-compresivos', text: 'Apósitos compresivos (si hay): disponibles y en buen estado' },
        { id: 'hemostaticos', text: 'Hemostáticos/torniquete (si dotación y protocolo): disponibles y en buen estado (no caducados)' },
      ],
      notes: 'Registrar incidencias (material faltante, dañado, caducado, etc.)',
    },
    {
      id: 'monitorizacion',
      title: 'Monitorización: SpO₂, manguitos, electrodos, tiras glucemia, fundas termómetro',
      category: 'monitorizacion',
      items: [
        { id: 'pulsioximetro', text: 'Pulsioxímetro: disponible, pilas cargadas, sensor funciona', critical: true },
        { id: 'tensiometro-manual', text: 'Tensiómetro manual: disponible, manguitos (diferentes tallas), pera y manómetro funcionan' },
        { id: 'tensiometro-automatico', text: 'Tensiómetro automático: disponible, manguitos (diferentes tallas), batería cargada' },
        { id: 'ecg-monitor', text: 'ECG básico/monitor (si dotación): disponible, cables en buen estado, electrodos disponibles, batería cargada' },
        { id: 'glucometro', text: 'Glucómetro: disponible, batería cargada, tiras reactivas disponibles y en fecha, lancetas disponibles', critical: true },
        { id: 'termometro', text: 'Termómetro (IR frontal/timpánico/digital según dotación): disponible, batería cargada, fundas disponibles (si aplica)' },
      ],
      notes: 'Registrar incidencias (equipo que no funciona, batería baja, material faltante, etc.)',
    },
    {
      id: 'epi',
      title: 'EPI/residuos/punzantes',
      category: 'epi',
      items: [
        { id: 'guantes', text: 'Guantes: diferentes tallas, no caducados (si aplica)', critical: true },
        { id: 'proteccion-ocular', text: 'Protección ocular: disponible y en buen estado' },
        { id: 'mascarillas-epi', text: 'Mascarillas (quirúrgica/FFP según protocolo): no caducadas (si aplica)' },
        { id: 'chaleco', text: 'Chaleco alta visibilidad: disponible y en buen estado' },
        { id: 'casco', text: 'Casco (si aplica según protocolo): disponible y en buen estado' },
        { id: 'bolsas-residuos', text: 'Bolsas de residuos biológicos y no biológicos: disponibles' },
        { id: 'contenedor-punzantes', text: 'Contenedor de punzantes: disponible, no lleno, accesible', critical: true },
      ],
      notes: 'Registrar incidencias (EPI faltante, caducado, contenedor de punzantes lleno, etc.)',
    },
  ],
};

/**
 * Checklist: Pre-Escena Rápido - Material Crítico
 * Fuente: BLOQUE_03_X5_CHECKLIST_MAESTRO.md - Sección 3.X5.4
 */
export const preEscenaChecklist: MaterialChecklist = {
  id: 'pre-escena-rapido',
  title: 'Checklist Pre-Escena Rápido',
  shortTitle: 'Pre-Escena',
  phase: 'pre_escena',
  description: 'Verificación rápida de material crítico antes de intervención (2-5 minutos).',
  source: 'BLOQUE_03_X5_CHECKLIST_MAESTRO.md',
  sections: [
    {
      id: 'evaluar-situacion',
      title: 'Evaluar situación y seleccionar módulos',
      category: 'oxigeno',
      items: [
        { id: 'tipo-situacion', text: 'Evaluar tipo de situación (trauma, médico, etc.)' },
        { id: 'material-critico', text: 'Identificar material crítico necesario' },
        { id: 'modulo-via-aerea', text: 'Módulo Vía Aérea: Si hay riesgo de compromiso de vía aérea o necesidad de oxigenoterapia', critical: true },
        { id: 'modulo-curas', text: 'Módulo Curas: Si hay heridas, hemorragias o quemaduras' },
        { id: 'modulo-monitor', text: 'Módulo Monitor: Si es necesario monitorizar constantes' },
        { id: 'modulo-termico', text: 'Módulo Térmico: Si hay riesgo de hipotermia o necesidad de control térmico' },
      ],
    },
    {
      id: 'verificacion-rapida',
      title: 'Verificación rápida de material crítico',
      category: 'oxigeno',
      items: [
        { id: 'material-disponible', text: 'Verificar que material crítico seleccionado está disponible', critical: true },
        { id: 'material-funciona', text: 'Verificar que material crítico funciona (prueba rápida si es necesario)', critical: true },
        { id: 'material-accesible', text: 'Verificar que material crítico está accesible' },
        { id: 'preparacion-inmediata', text: 'Preparar material crítico para uso inmediato' },
      ],
      notes: 'Tiempo estimado: 2-5 minutos aproximadamente',
    },
  ],
};

/**
 * Checklist: Post-Servicio - Cierre y Reposición
 * Fuente: BLOQUE_03_X5_CHECKLIST_MAESTRO.md - Sección 3.X5.5
 */
export const postServicioChecklist: MaterialChecklist = {
  id: 'post-servicio-cierre',
  title: 'Checklist Post-Servicio - Cierre y Reposición',
  shortTitle: 'Post-Servicio',
  phase: 'post_servicio',
  description: 'Cierre, limpieza, reposición y documentación después del servicio.',
  source: 'BLOQUE_03_X5_CHECKLIST_MAESTRO.md',
  sections: [
    {
      id: 'desecho-punzantes',
      title: 'Desecho y punzantes',
      category: 'epi',
      items: [
        { id: 'punzantes-contenedor', text: 'Verificar que todos los punzantes están en contenedor', critical: true },
        { id: 'no-punzantes-fuera', text: 'No dejar punzantes fuera del contenedor', critical: true },
        { id: 'cerrar-contenedor', text: 'Cerrar contenedor si está lleno o al finalizar servicio' },
        { id: 'residuos-biologicos', text: 'Gestionar residuos biológicos en bolsas correspondientes' },
        { id: 'residuos-no-biologicos', text: 'Gestionar residuos no biológicos en bolsas correspondientes' },
        { id: 'cerrar-bolsas', text: 'Cerrar bolsas correctamente y gestionar según protocolo' },
      ],
    },
    {
      id: 'limpieza',
      title: 'Limpieza y desinfección',
      category: 'cierre',
      items: [
        { id: 'limpieza-preliminar', text: 'Limpieza preliminar: retirar suciedad visible con paños/toallitas' },
        { id: 'desinfeccion', text: 'Aplicar desinfectante según protocolo del servicio, respetar tiempos de contacto' },
        { id: 'secado', text: 'Secar material completamente (no guardar material húmedo)', critical: true },
        { id: 'verificar-seco', text: 'Verificar que material está seco' },
      ],
      notes: 'Ver 3.14 – Bioseguridad y Descontaminación del Material para procedimientos detallados',
    },
    {
      id: 'reposicion',
      title: 'Reposición',
      category: 'cierre',
      items: [
        { id: 'identificar-usado', text: 'Identificar material consumido durante servicio' },
        { id: 'identificar-danado', text: 'Identificar material dañado' },
        { id: 'reponer-consumido', text: 'Reponer material consumido si es posible', critical: true },
        { id: 'reponer-danado', text: 'Reponer material dañado si es posible' },
        { id: 'verificar-reposicion', text: 'Verificar que reposición es completa' },
        { id: 'solicitar-reposicion', text: 'Solicitar reposición de material faltante según protocolo si no es posible reponer' },
        { id: 'comunicar-prioridad', text: 'Comunicar prioridad si es necesario y documentar solicitud' },
      ],
    },
    {
      id: 'incidencias',
      title: 'Registro de incidencias',
      category: 'cierre',
      items: [
        { id: 'consumos-criticos', text: 'Registrar consumos críticos (O₂, mascarillas, BVM/filtros, aspiración, hemostáticos/torniquete si aplica)' },
        { id: 'mediciones-equipos', text: 'Registrar mediciones/equipos usados (electrodos, tiras glucemia, fundas termómetro si aplica)' },
        { id: 'incidencias-equipo', text: 'Registrar incidencias de equipo (batería baja, fugas, roturas, material caducado)' },
        { id: 'observaciones-seguridad', text: 'Registrar observaciones de seguridad (pinchazo, derrame, contaminación)' },
        { id: 'comunicar-incidencias', text: 'Comunicar incidencias según protocolo y necesidades de reposición' },
      ],
      notes: 'Ver 3.18 – Documentación Operativa del Material Usado e Incidencias para procedimientos detallados',
    },
    {
      id: 'cerrar-maletines',
      title: 'Cerrar maletines',
      category: 'cierre',
      items: [
        { id: 'verificar-completos', text: 'Verificar que maletines están completos (ver 3.5, 3.X2, 3.X3)', critical: true },
        { id: 'verificar-limpio-seco', text: 'Verificar que material está limpio y seco' },
        { id: 'verificar-no-falta', text: 'Verificar que no falta material crítico' },
        { id: 'cerrar-correctamente', text: 'Cerrar maletines correctamente' },
        { id: 'listos-siguiente', text: 'Verificar que maletines están listos para siguiente servicio' },
      ],
    },
  ],
};

/**
 * Lista de todos los checklists disponibles
 */
export const materialChecklists: MaterialChecklist[] = [
  inicioTurnoChecklist,
  preEscenaChecklist,
  postServicioChecklist,
];

/**
 * Obtener un checklist por ID
 */
export function getChecklistById(id: string): MaterialChecklist | undefined {
  return materialChecklists.find((checklist) => checklist.id === id);
}

/**
 * Obtener checklists por fase
 */
export function getChecklistsByPhase(phase: ChecklistPhase): MaterialChecklist[] {
  return materialChecklists.filter((checklist) => checklist.phase === phase);
}
