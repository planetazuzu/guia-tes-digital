/**
 * Registry de imágenes para el sistema de medios visuales
 * 
 * Permite usar alias cortos en Markdown en lugar de rutas completas:
 * ![collarin-seleccion] en lugar de ![Descripción](/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png)
 * 
 * Ventajas:
 * - Referencias más cortas y legibles
 * - Metadatos centralizados (alt, caption, tags)
 * - Validación centralizada
 * - Fácil mantenimiento (cambiar ruta en un solo lugar)
 */

export interface ImageMetadata {
  /** ID único del alias (usado en Markdown) */
  id: string;
  /** Ruta completa a la imagen */
  path: string;
  /** Texto alternativo para accesibilidad */
  alt: string;
  /** Caption opcional que se muestra debajo de la imagen */
  caption?: string;
  /** Bloque temático al que pertenece */
  block: string;
  /** Capítulo relacionado (opcional) */
  chapter?: string;
  /** Tags para búsqueda y filtrado */
  tags?: string[];
}

/**
 * Registry completo de imágenes
 * 
 * Organizado por bloques temáticos para fácil mantenimiento
 */
export const imageRegistry: Record<string, ImageMetadata> = {
  // ============================================
  // BLOQUE 0: FUNDAMENTOS
  // ============================================
  'abcde-algoritmo': {
    id: 'abcde-algoritmo',
    path: '/assets/infografias/bloque-0-fundamentos/ALGORITMO OPERATIVO DEL TES.svg',
    alt: 'Algoritmo operativo del TES - Evaluación ABCDE',
    caption: 'Diagrama de flujo del algoritmo ABCDE operativo para TES',
    block: 'bloque-0-fundamentos',
    tags: ['abcde', 'evaluacion', 'algoritmo', 'fundamentos']
  },
  'triage-start': {
    id: 'triage-start',
    path: '/assets/infografias/bloque-0-fundamentos/RESUMEN VISUAL DEL ALGORITMO START.svg',
    alt: 'Resumen visual del algoritmo START de triage',
    caption: 'Algoritmo START para clasificación rápida de víctimas',
    block: 'bloque-0-fundamentos',
    tags: ['triage', 'start', 'clasificacion', 'masivo']
  },
  'diagrama-seleccion-oxigenoterapia': {
    id: 'diagrama-seleccion-oxigenoterapia',
    path: '/assets/infografias/bloque-0-fundamentos/diagrama-seleccion-dispositivo-oxigenoterapia.png',
    alt: 'Diagrama de selección de dispositivo de oxigenoterapia',
    caption: 'Guía visual para seleccionar el dispositivo de oxigenoterapia adecuado',
    block: 'bloque-0-fundamentos',
    tags: ['oxigenoterapia', 'dispositivos', 'seleccion']
  },
  'tabla-rangos-fio2': {
    id: 'tabla-rangos-fio2',
    path: '/assets/infografias/bloque-0-fundamentos/tabla-rangos-fio2-oxigenoterapia.png',
    alt: 'Tabla de rangos de FiO2 por dispositivo de oxigenoterapia',
    caption: 'Rangos de fracción inspiratoria de oxígeno (FiO2) según dispositivo',
    block: 'bloque-0-fundamentos',
    tags: ['oxigenoterapia', 'fio2', 'tabla', 'rangos']
  },
  'flujo-rcp-transtelefonica': {
    id: 'flujo-rcp-transtelefonica',
    path: '/assets/infografias/bloque-0-fundamentos/flujo-rcp-transtelefonica.png',
    alt: 'Flujo de RCP transtelefónica',
    caption: 'Diagrama de flujo para RCP asistida por teléfono',
    block: 'bloque-0-fundamentos',
    tags: ['rcp', 'transtelefonica', 'flujo']
  },
  'flujo-desa-telefono': {
    id: 'flujo-desa-telefono',
    path: '/assets/infografias/bloque-0-fundamentos/flujo-desa-telefono.png',
    alt: 'Flujo de uso de DESA transtelefónico',
    caption: 'Diagrama de flujo para uso de DESA con asistencia telefónica',
    block: 'bloque-0-fundamentos',
    tags: ['desa', 'transtelefonica', 'flujo', 'desfibrilacion']
  },

  // ============================================
  // BLOQUE 1: PROCEDIMIENTOS BÁSICOS
  // ============================================
  'registro-constantes-vitales': {
    id: 'registro-constantes-vitales',
    path: '/assets/infografias/bloque-3-material-sanitario/registro-constantes-vitales.png',
    alt: 'Registro de constantes vitales',
    caption: 'Formato de registro de constantes vitales',
    block: 'bloque-1-procedimientos',
    tags: ['constantes', 'registro', 'monitorizacion']
  },
  'interpretacion-constantes-semaforo': {
    id: 'interpretacion-constantes-semaforo',
    path: '/assets/infografias/bloque-3-material-sanitario/interpretacion-constantes-semaforo.png',
    alt: 'Interpretación de constantes vitales - Sistema semáforo',
    caption: 'Sistema de interpretación rápida de constantes vitales (verde/amarillo/rojo)',
    block: 'bloque-1-procedimientos',
    tags: ['constantes', 'interpretacion', 'semaforo', 'alerta']
  },
  'uso-pulsioximetro': {
    id: 'uso-pulsioximetro',
    path: '/assets/infografias/bloque-3-material-sanitario/uso-correcto-pulsioximetro.png',
    alt: 'Uso correcto del pulsioxímetro',
    caption: 'Guía de colocación y uso correcto del pulsioxímetro',
    block: 'bloque-1-procedimientos',
    tags: ['pulsioximetro', 'spo2', 'oxigenacion', 'monitorizacion']
  },
  'uso-tensiometro': {
    id: 'uso-tensiometro',
    path: '/assets/infografias/bloque-3-material-sanitario/uso-correcto-tensiometro.png',
    alt: 'Uso correcto del tensiómetro',
    caption: 'Guía de colocación y uso correcto del tensiómetro',
    block: 'bloque-1-procedimientos',
    tags: ['tensiometro', 'presion', 'ta', 'monitorizacion']
  },

  // ============================================
  // BLOQUE 2: INMOVILIZACIÓN
  // ============================================
  'collarin-seleccion': {
    id: 'collarin-seleccion',
    path: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png',
    alt: 'Selección de talla de collarín cervical',
    caption: 'Guía visual para seleccionar la talla correcta de collarín cervical',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'inmovilizacion', 'seleccion', 'talla']
  },
  'collarin-medicion': {
    id: 'collarin-medicion',
    path: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-medicion-anatomica.png',
    alt: 'Medición anatómica para selección de talla de collarín',
    caption: 'Técnica de medición anatómica para determinar la talla correcta',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'medicion', 'anatomia', 'talla']
  },
  'collarin-tabla-tallas': {
    id: 'collarin-tabla-tallas',
    path: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-tabla-tallas.png',
    alt: 'Tabla de tallas de collarín cervical',
    caption: 'Tabla de referencia para selección de talla según medidas',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'tabla', 'tallas', 'referencia']
  },
  'collarin-paso-1': {
    id: 'collarin-paso-1',
    path: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png',
    alt: 'Paso 1: Preparación para colocación de collarín',
    caption: 'Preparación del paciente y material antes de colocar el collarín',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'colocacion', 'paso-1', 'preparacion']
  },
  'collarin-paso-2': {
    id: 'collarin-paso-2',
    path: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-2-parte-posterior.png',
    alt: 'Paso 2: Colocación de la parte posterior del collarín',
    caption: 'Colocación de la parte posterior del collarín cervical',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'colocacion', 'paso-2', 'posterior']
  },
  'collarin-paso-3': {
    id: 'collarin-paso-3',
    path: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-3-parte-anterior.png',
    alt: 'Paso 3: Colocación de la parte anterior del collarín',
    caption: 'Colocación de la parte anterior del collarín cervical',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'colocacion', 'paso-3', 'anterior']
  },
  'collarin-paso-4': {
    id: 'collarin-paso-4',
    path: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-4-ajuste-cierres.png',
    alt: 'Paso 4: Ajuste de cierres del collarín',
    caption: 'Ajuste correcto de los cierres del collarín cervical',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'colocacion', 'paso-4', 'ajuste']
  },
  'collarin-paso-5': {
    id: 'collarin-paso-5',
    path: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-5-verificacion.png',
    alt: 'Paso 5: Verificación de la colocación del collarín',
    caption: 'Verificación de la correcta colocación del collarín cervical',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'colocacion', 'paso-5', 'verificacion']
  },
  'collarin-paso-6': {
    id: 'collarin-paso-6',
    path: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-6-liberacion-controlada.png',
    alt: 'Paso 6: Liberación controlada del control manual',
    caption: 'Liberación controlada del control manual tras verificar el collarín',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'colocacion', 'paso-6', 'liberacion']
  },
  'collarin-verificaciones': {
    id: 'collarin-verificaciones',
    path: '/assets/infografias/bloque-2-inmovilizacion/verificaciones-post-colocacion-collarin.png',
    alt: 'Verificaciones post-colocación del collarín cervical',
    caption: 'Checklist de verificaciones después de colocar el collarín',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'verificaciones', 'checklist', 'post-colocacion']
  },
  'collarin-errores': {
    id: 'collarin-errores',
    path: '/assets/infografias/bloque-2-inmovilizacion/errores-frecuentes-collarin-cervical.png',
    alt: 'Errores frecuentes en la colocación del collarín cervical',
    caption: 'Errores comunes y cómo evitarlos al colocar el collarín',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'errores', 'prevencion', 'comunes']
  },

  // ============================================
  // BLOQUE 3: MATERIAL SANITARIO Y OXIGENOTERAPIA
  // ============================================
  'canulas-guedel-nasofaringea': {
    id: 'canulas-guedel-nasofaringea',
    path: '/assets/infografias/bloque-3-material-sanitario/canulas-guedel-nasofaringea.png',
    alt: 'Cánulas de Guedel y nasofaríngea',
    caption: 'Tipos de cánulas de vía aérea: orofaríngea (Guedel) y nasofaríngea',
    block: 'bloque-3-material-sanitario',
    tags: ['canulas', 'via-aerea', 'guedel', 'nasofaringea']
  },
  'uso-ambu': {
    id: 'uso-ambu',
    path: '/assets/infografias/bloque-3-material-sanitario/uso-correcto-ambu.png',
    alt: 'Uso correcto de la bolsa-mascarilla (Ambú)',
    caption: 'Técnica correcta de uso de la bolsa-mascarilla para ventilación',
    block: 'bloque-3-material-sanitario',
    tags: ['ambu', 'bvm', 'ventilacion', 'bolsa-mascarilla']
  },
  'configuracion-fio2-bvm': {
    id: 'configuracion-fio2-bvm',
    path: '/assets/infografias/bloque-3-material-sanitario/configuracion-maxima-fio2-bolsa-mascarilla.png',
    alt: 'Configuración máxima de FiO2 con bolsa-mascarilla',
    caption: 'Configuración para obtener máxima FiO2 con bolsa-mascarilla',
    block: 'bloque-3-material-sanitario',
    tags: ['bvm', 'fio2', 'configuracion', 'oxigenoterapia']
  },
  'guia-colocacion-oxigenoterapia': {
    id: 'guia-colocacion-oxigenoterapia',
    path: '/assets/infografias/bloque-0-fundamentos/guia-colocacion-dispositivos-oxigenoterapia.png',
    alt: 'Guía de colocación de dispositivos de oxigenoterapia',
    caption: 'Guía visual para la colocación correcta de dispositivos de oxigenoterapia',
    block: 'bloque-3-material-sanitario',
    tags: ['oxigenoterapia', 'colocacion', 'dispositivos', 'guia']
  },
};

/**
 * Buscar imágenes por bloque temático
 */
export const findImagesByBlock = (block: string): ImageMetadata[] => {
  return Object.values(imageRegistry).filter(img => img.block === block);
};

/**
 * Buscar imágenes por tags
 */
export const findImagesByTags = (tags: string[]): ImageMetadata[] => {
  return Object.values(imageRegistry).filter(img => 
    img.tags && tags.some(tag => img.tags?.includes(tag))
  );
};

/**
 * Buscar imagen por ID (alias)
 */
export const findImageById = (id: string): ImageMetadata | undefined => {
  return imageRegistry[id];
};

/**
 * Verificar si un ID existe en el registry
 */
export const hasImageId = (id: string): boolean => {
  return id in imageRegistry;
};
