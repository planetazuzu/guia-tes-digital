# 🔧 Esqueleto Técnico - Guía de Refuerzo

**Fecha:** 2025-12-23  
**Autor:** Arquitecto de Sistema de Contenido, Diseñador de Estructuras Formativas y Experto en Arquitectura de Información  
**Especialización:** Aplicaciones sanitarias críticas y guías profesionales  
**Versión:** 1.0  
**Estado:** Plantilla Estructural Definitiva

---

## 🎯 Propósito del Documento

Este documento define el **esqueleto técnico vacío** de la Guía de Refuerzo como estructura reutilizable para todas las Guías de Refuerzo de Categoría C.

**Objetivo:**
- Establecer estructura técnica sin contenido médico
- Definir campos, tipos y relaciones
- Crear plantilla reutilizable
- Establecer reglas de validación

**Uso:**
- Base para crear nuevas Guías de Refuerzo
- Contrato de estructura técnica
- Validación automática de guías
- Versionado y mantenimiento

---

## 1️⃣ FORMATO DEL ESQUELETO

### A) Esquema Estructural en YAML

```yaml
# Esqueleto Técnico - Guía de Refuerzo
# Versión: 1.0
# Uso: Plantilla para todas las Guías de Refuerzo Categoría C

guia_refuerzo:
  # Metadatos de nivel guía
  metadata:
    idGuia: ""                    # Identificador único (slug)
    titulo: ""                    # Título principal
    subtitulo: ""                 # Subtítulo descriptivo
    categoria: "C"                # Siempre "C" para este esqueleto
    modo: "formacion_refuerzo"    # Siempre "formacion_refuerzo"
    tiempoEstimado:
      minimo: 0                   # Minutos (solo secciones obligatorias)
      recomendado: 0              # Minutos (con secciones opcionales recomendadas)
      completo: 0                 # Minutos (todo el contenido)
    publicoObjetivo: ""           # Descripción del público objetivo
    advertenciaUso: ""            # Texto de advertencia sobre uso formativo
    protocoloOperativoRelacionado:
      id: ""                      # ID del protocolo operativo relacionado
      slug: ""                    # Slug del protocolo operativo
      titulo: ""                  # Título del protocolo operativo
    versionGuia: "1.0"            # Versión de la guía
    estadoGuia: "borrador"        # borrador | activa | archivada
    fechaCreacion: ""             # ISO 8601
    fechaRevision: ""             # ISO 8601
    fechaActualizacion: ""        # ISO 8601 (última actualización)
    autor: ""                     # Autor/es de la guía
    revisadoPor: ""               # Revisor/es médico/s técnico/s

  # Estructura de secciones (8 secciones estándar)
  secciones:
    - idSeccion: "seccion_01"
      nombreSeccion: "Introducción y Contexto"
      orden: 1                    # Orden fijo en la guía
      obligatoria: true
      tiempoEstimado: 3           # Minutos estimados
      objetivoPedagogico: ""      # Objetivo pedagógico de la sección
      tiposDeBloquePermitidos:    # Tipos de bloques que puede contener
        - "texto_explicativo"
        - "visual_explicativo"
        - "enlace_operativo"
      enlaceOperativoRecomendado: true
      bloques: []                 # Array de bloques (ver definición de bloques)

    - idSeccion: "seccion_02"
      nombreSeccion: "Explicación Clínica y Fisiopatología"
      orden: 2
      obligatoria: true
      tiempoEstimado: 5
      objetivoPedagogico: ""
      tiposDeBloquePermitidos:
        - "texto_explicativo"
        - "visual_explicativo"
        - "pedagogico_explicativo"
      enlaceOperativoRecomendado: false
      bloques: []

    - idSeccion: "seccion_03"
      nombreSeccion: "Algoritmo Comentado Visual"
      orden: 3
      obligatoria: true
      tiempoEstimado: 4
      objetivoPedagogico: ""
      tiposDeBloquePermitidos:
        - "visual_explicativo"
        - "texto_explicativo"
        - "enlace_operativo"
      enlaceOperativoRecomendado: true
      bloques: []

    - idSeccion: "seccion_04"
      nombreSeccion: "Medios Visuales y Demostración"
      orden: 4
      obligatoria: true
      tiempoEstimado: 5
      objetivoPedagogico: ""
      tiposDeBloquePermitidos:
        - "audiovisual"
        - "visual_explicativo"
        - "texto_explicativo"
      enlaceOperativoRecomendado: false
      bloques: []

    - idSeccion: "seccion_05"
      nombreSeccion: "Errores Frecuentes Visualizados"
      orden: 5
      obligatoria: true
      tiempoEstimado: 4
      objetivoPedagogico: ""
      tiposDeBloquePermitidos:
        - "error_frecuente"
        - "visual_explicativo"
        - "texto_explicativo"
        - "enlace_operativo"
      enlaceOperativoRecomendado: true
      bloques: []

    - idSeccion: "seccion_06"
      nombreSeccion: "Casos Clínicos"
      orden: 6
      obligatoria: false
      tiempoEstimado: 8
      objetivoPedagogico: ""
      tiposDeBloquePermitidos:
        - "caso_clinico"
        - "visual_explicativo"
        - "texto_explicativo"
      enlaceOperativoRecomendado: false
      bloques: []

    - idSeccion: "seccion_07"
      nombreSeccion: "Simulación Mental Guiada"
      orden: 7
      obligatoria: false
      tiempoEstimado: 5
      objetivoPedagogico: ""
      tiposDeBloquePermitidos:
        - "simulacion_mental"
        - "texto_explicativo"
      enlaceOperativoRecomendado: false
      bloques: []

    - idSeccion: "seccion_08"
      nombreSeccion: "Resumen Visual y Puente al Operativo"
      orden: 8
      obligatoria: true
      tiempoEstimado: 2
      objetivoPedagogico: ""
      tiposDeBloquePermitidos:
        - "resumen_visual"
        - "enlace_operativo"
        - "texto_explicativo"
      enlaceOperativoRecomendado: true
      bloques: []

  # Definición de tipos de bloques (plantillas reutilizables)
  tipos_de_bloques:
    texto_explicativo:
      idBloque: "texto_explicativo"
      tipoBloque: "texto_explicativo"
      proposito: "Proporcionar explicaciones narrativas que contextualizan y profundizan conceptos"
      camposEsperados:
        - id: ""                  # ID único del bloque
        - titulo: ""              # Título del bloque (opcional)
        - contenido: ""           # Contenido textual explicativo
        - relacionConMarkdown:    # Referencia al Markdown relacionado
            capituloId: ""
            enlace: ""
      reglasDeUso:
        - "Explica el 'por qué' de conceptos"
        - "Proporciona contexto clínico"
        - "Amplía conceptos del Markdown"
      restricciones:
        - "NO incluye pasos numerados exactos"
        - "NO incluye valores numéricos críticos"
        - "NO incluye contraindicaciones exactas"
        - "NO incluye advertencias críticas operativas"
      relacionConMarkdown: "amplia_conceptos"
      obligatorioEnGuiasC: false

    visual_explicativo:
      idBloque: "visual_explicativo"
      tipoBloque: "visual_explicativo"
      proposito: "Mostrar visualmente conceptos, técnicas o procesos que requieren comprensión visual"
      camposEsperados:
        - id: ""
        - titulo: ""
        - tipoVisual: ""          # infografia | diagrama | secuencia_fotografica | comparacion
        - urlImagen: ""           # URL o ruta a imagen/infografía
        - altText: ""             # Texto alternativo para accesibilidad
        - caption: ""             # Caption descriptivo (opcional)
        - relacionConMarkdown:
            capituloId: ""
            enlace: ""
      reglasDeUso:
        - "Visualiza algoritmos y flujos"
        - "Muestra técnicas paso a paso"
        - "Ilustra conceptos anatómicos o fisiológicos"
        - "Compara visualmente (correcto vs incorrecto)"
      restricciones:
        - "NO incluye valores numéricos exactos (solo rangos o conceptos)"
        - "NO incluye pasos operativos numerados exactos"
        - "NO incluye información crítica de seguridad sin enlace al operativo"
      relacionConMarkdown: "visualiza_conceptos"
      obligatorioEnGuiasC: false

    audiovisual:
      idBloque: "audiovisual"
      tipoBloque: "audiovisual"
      proposito: "Demostrar técnicas en movimiento y proporcionar experiencia sensorial completa"
      camposEsperados:
        - id: ""
        - titulo: ""
        - tipoAudiovisual: ""    # video | animacion | audio
        - urlVideo: ""            # URL o ruta a vídeo
        - duracion: 0             # Segundos
        - descripcion: ""         # Descripción del contenido del vídeo
        - transcripcion: ""       # Transcripción para accesibilidad (opcional)
        - relacionConMarkdown:
            capituloId: ""
            enlace: ""
      reglasDeUso:
        - "Demuestra técnicas que requieren movimiento"
        - "Muestra secuencias temporales complejas"
        - "Proporciona experiencia sensorial"
      restricciones:
        - "NO incluye valores numéricos exactos (solo demostración visual)"
        - "NO incluye pasos operativos numerados exactos"
        - "NO incluye información crítica sin enlace al operativo"
      relacionConMarkdown: "muestra_ejecucion"
      obligatorioEnGuiasC: false

    error_frecuente:
      idBloque: "error_frecuente"
      tipoBloque: "error_frecuente"
      proposito: "Prevenir errores mediante visualización comparativa y comprensión de consecuencias"
      camposEsperados:
        - id: ""
        - titulo: ""
        - descripcionError: ""    # Descripción del error frecuente
        - visualizacionCorrecto: # Visualización de técnica correcta
            urlImagen: ""
            altText: ""
        - visualizacionIncorrecto: # Visualización de técnica incorrecta
            urlImagen: ""
            altText: ""
        - consecuencias: ""       # Explicación de consecuencias del error
        - prevencion: ""          # Cómo evitar el error
        - relacionConMarkdown:
            capituloId: ""
            enlace: ""
            puntoCritico: ""      # Referencia a "Puntos críticos TES" del protocolo
      reglasDeUso:
        - "Visualiza comparación lado a lado (correcto vs incorrecto)"
        - "Explica consecuencias de errores frecuentes"
        - "Muestra cómo evitar errores comunes"
      restricciones:
        - "NO incluye pasos operativos exactos (solo comparación visual)"
        - "NO incluye valores numéricos exactos"
        - "NO incluye información crítica sin enlace al operativo"
      relacionConMarkdown: "visualiza_advertencias"
      obligatorioEnGuiasC: false

    caso_clinico:
      idBloque: "caso_clinico"
      tipoBloque: "caso_clinico"
      proposito: "Aprender mediante aplicación práctica del protocolo en situaciones reales o simuladas"
      camposEsperados:
        - id: ""
        - titulo: ""
        - nivelComplejidad: ""    # estandar | variaciones | complejo
        - presentacion:           # Presentación del caso
            situacion: ""
            lugar: ""
            paciente: ""
            contexto: ""
        - analisis:               # Análisis paso a paso
            pasos: []             # Array de pasos de análisis (NO pasos operativos)
            decisiones: []        # Array de decisiones tomadas
        - aprendizaje:            # Puntos de aprendizaje
            puntosClave: []       # Array de puntos clave aprendidos (máx 3-5)
            aplicacion: ""        # Aplicación a otras situaciones
        - relacionConMarkdown:
            capituloId: ""
            enlace: ""
      reglasDeUso:
        - "Muestra aplicación del protocolo en contexto"
        - "Valida comprensión profunda"
        - "Ilustra integración de múltiples conceptos"
      restricciones:
        - "NO incluye pasos operativos exactos (solo aplicación contextual)"
        - "NO incluye valores numéricos exactos"
        - "NO incluye información crítica sin enlace al operativo"
      relacionConMarkdown: "muestra_aplicacion"
      obligatorioEnGuiasC: false

    simulacion_mental:
      idBloque: "simulacion_mental"
      tipoBloque: "simulacion_mental"
      proposito: "Facilitar práctica mental del protocolo mediante escenarios guiados con decisiones y feedback"
      camposEsperados:
        - id: ""
        - titulo: ""
        - escenario: ""           # Descripción del escenario inicial
        - decisiones: []          # Array de decisiones
            - id: ""
              pregunta: ""
              opciones: []        # Array de opciones
              respuestaCorrecta: ""
              feedback: ""        # Explicación de la respuesta
        - reflexion: ""           # Reflexión post-simulación
        - relacionConMarkdown:
            capituloId: ""
            enlace: ""
      reglasDeUso:
        - "Facilita práctica mental del protocolo"
        - "Valida comprensión profunda"
        - "Entrena toma de decisiones"
      restricciones:
        - "NO incluye pasos operativos exactos (solo decisiones)"
        - "NO incluye valores numéricos exactos"
        - "NO incluye información crítica sin enlace al operativo"
      relacionConMarkdown: "basado_en_protocolo"
      obligatorioEnGuiasC: false

    resumen_visual:
      idBloque: "resumen_visual"
      tipoBloque: "resumen_visual"
      proposito: "Síntesis visual rápida de toda la guía para referencia posterior y puente al protocolo operativo"
      camposEsperados:
        - id: ""
        - titulo: ""
        - tipoResumen: ""         # infografia_una_pagina | algoritmo_visual | puntos_clave
        - urlInfografia: ""       # URL o ruta a infografía
        - puntosClave: []         # Array de puntos clave (5-7 puntos)
            - id: ""
              texto: ""
              icono: ""           # Opcional
        - relacionConMarkdown:
            capituloId: ""
            enlace: ""
      reglasDeUso:
        - "Sintetiza visualmente puntos clave aprendidos"
        - "Proporciona puente visual hacia protocolo operativo"
        - "Consolida aprendizaje"
      restricciones:
        - "NO incluye pasos operativos exactos (solo síntesis visual)"
        - "NO incluye valores numéricos exactos"
        - "NO incluye información crítica sin enlace al operativo"
      relacionConMarkdown: "resume_conceptos"
      obligatorioEnGuiasC: true  # Obligatorio en todas las guías C

    enlace_operativo:
      idBloque: "enlace_operativo"
      tipoBloque: "enlace_operativo"
      proposito: "Proporcionar acceso claro y destacado al protocolo operativo relacionado"
      camposEsperados:
        - id: ""
        - textoEnlace: ""         # Texto del enlace
        - tipoEnlace: ""          # boton_primario | boton_secundario | enlace_discreto
        - protocoloOperativo:
            id: ""
            slug: ""
            titulo: ""
        - mensajeContextual: ""   # Mensaje contextual (opcional)
      reglasDeUso:
        - "Proporciona acceso al protocolo operativo"
        - "Transición clara entre modos"
        - "Siempre disponible"
      restricciones:
        - "NO incluye información operativa exacta (solo enlace)"
        - "NO incluye valores numéricos exactos"
      relacionConMarkdown: "enlace_directo"
      obligatorioEnGuiasC: false  # Pero debe aparecer en múltiples puntos
```

### B) Representación Conceptual en Pseudo-Markdown (Vacía)

```markdown
# [TÍTULO DE LA GUÍA DE REFUERZO]

**Subtítulo:** [SUBTÍTULO DESCRIPTIVO]

---

## 📋 Metadatos de la Guía

- **ID Guía:** `[idGuia]`
- **Categoría:** C
- **Modo:** Formación / Refuerzo
- **Tiempo Estimado:** [minimo] min (mínimo) | [recomendado] min (recomendado) | [completo] min (completo)
- **Protocolo Operativo Relacionado:** [título] ([enlace])
- **Versión:** [versionGuia]
- **Estado:** [estadoGuia]

> ⚠️ **Advertencia:** [advertenciaUso]

---

## SECCIÓN 1: Introducción y Contexto

**Objetivo:** [objetivoPedagogico]

### Bloque: Texto Explicativo
[TÍTULO DEL BLOQUE]

[CONTENIDO EXPLICATIVO - Contexto, importancia, objetivos de aprendizaje]

### Bloque: Visual Explicativo
[TÍTULO DEL BLOQUE]

![Mini resumen visual del algoritmo]([urlImagen])
*[caption]*

### Bloque: Enlace Operativo
[Ver Protocolo Operativo [título]]([enlace]) [botón primario destacado]

---

## SECCIÓN 2: Explicación Clínica y Fisiopatología

**Objetivo:** [objetivoPedagogico]

### Bloque: Texto Explicativo
[TÍTULO DEL BLOQUE]

[CONTENIDO EXPLICATIVO - Fisiopatología, mecanismos, relaciones causa-efecto]

### Bloque: Visual Explicativo
[TÍTULO DEL BLOQUE]

![Diagrama del sistema cardiovascular]([urlImagen])
*[caption]*

---

## SECCIÓN 3: Algoritmo Comentado Visual

**Objetivo:** [objetivoPedagogico]

### Bloque: Visual Explicativo
[TÍTULO DEL BLOQUE]

![Algoritmo completo con comentarios]([urlImagen])
*[caption]*

### Bloque: Texto Explicativo
[TÍTULO DEL BLOQUE]

[COMENTARIOS EXPLICATIVOS POR PASO - Explicación del "por qué" de cada paso]

### Bloque: Enlace Operativo
[Ver pasos operativos exactos]([enlace]) [enlace discreto]

---

## SECCIÓN 4: Medios Visuales y Demostración

**Objetivo:** [objetivoPedagogico]

### Bloque: Audiovisual
[TÍTULO DEL BLOQUE]

[VIDEO DEMOSTRATIVO]
- Duración: [duracion] segundos
- Descripción: [descripcion]

### Bloque: Visual Explicativo
[TÍTULO DEL BLOQUE]

![Secuencia fotográfica paso a paso]([urlImagen])
*[caption]*

### Bloque: Texto Explicativo
[TÍTULO DEL BLOQUE]

[DESCRIPCIÓN DE QUÉ OBSERVAR - Qué observar en cada paso del vídeo]

---

## SECCIÓN 5: Errores Frecuentes Visualizados

**Objetivo:** [objetivoPedagogico]

### Bloque: Error Frecuente
[TÍTULO DEL ERROR]

**Descripción del error:** [descripcionError]

**Visualización:**
- ✅ Correcto: ![Técnica correcta]([urlImagenCorrecto])
- ❌ Incorrecto: ![Técnica incorrecta]([urlImagenIncorrecto])

**Consecuencias:** [consecuencias]

**Prevención:** [prevencion]

**Relación con Protocolo Operativo:** [enlace a punto crítico del protocolo]

---

## SECCIÓN 6: Casos Clínicos

**Objetivo:** [objetivoPedagogico]

### Bloque: Caso Clínico
**Caso [número]: [título]**

**Nivel de complejidad:** [nivelComplejidad]

**Presentación:**
- Situación: [situacion]
- Lugar: [lugar]
- Paciente: [paciente]
- Contexto: [contexto]

**Análisis:**
[ANÁLISIS PASO A PASO - Aplicación del protocolo en contexto]

**Puntos de aprendizaje:**
1. [puntoClave1]
2. [puntoClave2]
3. [puntoClave3]

---

## SECCIÓN 7: Simulación Mental Guiada

**Objetivo:** [objetivoPedagogico]

### Bloque: Simulación Mental
[TÍTULO DE LA SIMULACIÓN]

**Escenario:** [escenario]

**Decisiones:**
1. [pregunta]
   - Opción A: [opcionA]
   - Opción B: [opcionB]
   - Opción C: [opcionC]
   - ✅ Respuesta correcta: [respuestaCorrecta]
   - 💡 Feedback: [feedback]

**Reflexión:** [reflexion]

---

## SECCIÓN 8: Resumen Visual y Puente al Operativo

**Objetivo:** [objetivoPedagogico]

### Bloque: Resumen Visual
[TÍTULO DEL RESUMEN]

![Infografía de una página con algoritmo completo]([urlInfografia])
*[caption]*

**Puntos clave recordar:**
1. [puntoClave1]
2. [puntoClave2]
3. [puntoClave3]
4. [puntoClave4]
5. [puntoClave5]

### Bloque: Enlace Operativo
[Ir a Protocolo Operativo [título]]([enlace]) [botón primario destacado]

**Mensaje de cierre:** [mensaje de cierre que consolida aprendizaje y prepara para acción]
```

---

## 2️⃣ METADATOS DE NIVEL GUÍA

### Campos Obligatorios

```yaml
metadata:
  # Identificación
  idGuia: ""                    # Slug único (ej: "rcp-adulto-svb")
  titulo: ""                    # Título principal (ej: "Guía de Refuerzo — RCP Adulto SVB")
  subtitulo: ""                 # Subtítulo descriptivo (ej: "Comprensión Profunda y Formación...")
  
  # Clasificación
  categoria: "C"                # Siempre "C" para este esqueleto
  modo: "formacion_refuerzo"    # Siempre "formacion_refuerzo"
  
  # Tiempo estimado
  tiempoEstimado:
    minimo: 0                   # Minutos (solo secciones obligatorias: 1-5, 8)
    recomendado: 0              # Minutos (con secciones opcionales recomendadas: +6)
    completo: 0                 # Minutos (todo el contenido: +7)
  
  # Público y uso
  publicoObjetivo: ""           # Descripción del público objetivo
  advertenciaUso: ""            # Texto de advertencia sobre uso formativo
  
  # Relación con protocolo operativo
  protocoloOperativoRelacionado:
    id: ""                      # ID del protocolo operativo
    slug: ""                    # Slug del protocolo operativo
    titulo: ""                  # Título del protocolo operativo
  
  # Versionado
  versionGuia: "1.0"            # Versión de la guía (semver)
  estadoGuia: "borrador"        # borrador | activa | archivada
  
  # Fechas (ISO 8601)
  fechaCreacion: ""             # Fecha de creación inicial
  fechaRevision: ""             # Fecha de última revisión médica/técnica
  fechaActualizacion: ""        # Fecha de última actualización de contenido
  
  # Autores
  autor: ""                     # Autor/es de la guía
  revisadoPor: ""               # Revisor/es médico/s técnico/s
```

### Ejemplo de Valores (Placeholders)

```yaml
metadata:
  idGuia: "[slug-unico-de-la-guia]"
  titulo: "[Título de la Guía de Refuerzo]"
  subtitulo: "[Subtítulo descriptivo del propósito formativo]"
  categoria: "C"
  modo: "formacion_refuerzo"
  tiempoEstimado:
    minimo: 15
    recomendado: 25
    completo: 35
  publicoObjetivo: "TES en formación inicial, formación continua y repaso"
  advertenciaUso: "Esta guía es para formación y comprensión. Para acción inmediata durante emergencia, usa el Protocolo Operativo."
  protocoloOperativoRelacionado:
    id: "[id-protocolo-operativo]"
    slug: "[slug-protocolo-operativo]"
    titulo: "[Título del Protocolo Operativo]"
  versionGuia: "1.0"
  estadoGuia: "borrador"
  fechaCreacion: "2025-12-23T00:00:00Z"
  fechaRevision: ""
  fechaActualizacion: "2025-12-23T00:00:00Z"
  autor: "[Nombre del autor]"
  revisadoPor: "[Nombre del revisor médico/técnico]"
```

---

## 3️⃣ ESTRUCTURA DE SECCIONES

### Sección 1: Introducción y Contexto

```yaml
- idSeccion: "seccion_01"
  nombreSeccion: "Introducción y Contexto"
  orden: 1
  obligatoria: true
  tiempoEstimado: 3
  objetivoPedagogico: "Establecer contexto clínico, importancia del protocolo y expectativas del usuario"
  tiposDeBloquePermitidos:
    - "texto_explicativo"
    - "visual_explicativo"
    - "enlace_operativo"
  enlaceOperativoRecomendado: true
  bloques: []
```

**Campos vacíos para contenido:**
- Texto explicativo: Contexto, importancia, objetivos de aprendizaje
- Visual explicativo: Mini infografía del algoritmo básico
- Enlace operativo: Botón destacado al protocolo operativo

---

### Sección 2: Explicación Clínica y Fisiopatología

```yaml
- idSeccion: "seccion_02"
  nombreSeccion: "Explicación Clínica y Fisiopatología"
  orden: 2
  obligatoria: true
  tiempoEstimado: 5
  objetivoPedagogico: "Proporcionar base científica que explica por qué funciona el protocolo"
  tiposDeBloquePermitidos:
    - "texto_explicativo"
    - "visual_explicativo"
    - "pedagogico_explicativo"
  enlaceOperativoRecomendado: false
  bloques: []
```

**Campos vacíos para contenido:**
- Texto explicativo: Fisiopatología, mecanismos, relaciones causa-efecto
- Visual explicativo: Diagramas del sistema cardiovascular/fisiológico
- Pedagógico explicativo: Explicaciones científicas profundas

---

### Sección 3: Algoritmo Comentado Visual

```yaml
- idSeccion: "seccion_03"
  nombreSeccion: "Algoritmo Comentado Visual"
  orden: 3
  obligatoria: true
  tiempoEstimado: 4
  objetivoPedagogico: "Visualizar el protocolo completo con explicaciones en cada paso"
  tiposDeBloquePermitidos:
    - "visual_explicativo"
    - "texto_explicativo"
    - "enlace_operativo"
  enlaceOperativoRecomendado: true
  bloques: []
```

**Campos vacíos para contenido:**
- Visual explicativo: Infografía del algoritmo completo con comentarios
- Texto explicativo: Comentarios explicativos por paso (explicación del "por qué")
- Enlace operativo: Enlace discreto a pasos operativos exactos

---

### Sección 4: Medios Visuales y Demostración

```yaml
- idSeccion: "seccion_04"
  nombreSeccion: "Medios Visuales y Demostración"
  orden: 4
  obligatoria: true
  tiempoEstimado: 5
  objetivoPedagogico: "Proporcionar experiencia sensorial mediante vídeo y secuencias fotográficas"
  tiposDeBloquePermitidos:
    - "audiovisual"
    - "visual_explicativo"
    - "texto_explicativo"
  enlaceOperativoRecomendado: false
  bloques: []
```

**Campos vacíos para contenido:**
- Audiovisual: Vídeo demostrativo de técnica correcta
- Visual explicativo: Galería de secuencias fotográficas paso a paso
- Texto explicativo: Descripción de qué observar en cada paso

---

### Sección 5: Errores Frecuentes Visualizados

```yaml
- idSeccion: "seccion_05"
  nombreSeccion: "Errores Frecuentes Visualizados"
  orden: 5
  obligatoria: true
  tiempoEstimado: 4
  objetivoPedagogico: "Prevenir errores mediante visualización comparativa y comprensión de consecuencias"
  tiposDeBloquePermitidos:
    - "error_frecuente"
    - "visual_explicativo"
    - "texto_explicativo"
    - "enlace_operativo"
  enlaceOperativoRecomendado: true
  bloques: []
```

**Campos vacíos para contenido:**
- Error frecuente: Comparación visual (correcto vs incorrecto), consecuencias, prevención
- Visual explicativo: Visualizaciones adicionales de errores
- Texto explicativo: Explicaciones de consecuencias
- Enlace operativo: Enlace a puntos críticos del protocolo operativo

---

### Sección 6: Casos Clínicos

```yaml
- idSeccion: "seccion_06"
  nombreSeccion: "Casos Clínicos"
  orden: 6
  obligatoria: false
  tiempoEstimado: 8
  objetivoPedagogico: "Aprender mediante aplicación práctica del protocolo en situaciones reales"
  tiposDeBloquePermitidos:
    - "caso_clinico"
    - "visual_explicativo"
    - "texto_explicativo"
  enlaceOperativoRecomendado: false
  bloques: []
```

**Campos vacíos para contenido:**
- Caso clínico: Presentación, análisis paso a paso, puntos de aprendizaje
- Visual explicativo: Diagramas de flujo de decisiones en el caso
- Texto explicativo: Análisis adicional del caso

---

### Sección 7: Simulación Mental Guiada

```yaml
- idSeccion: "seccion_07"
  nombreSeccion: "Simulación Mental Guiada"
  orden: 7
  obligatoria: false
  tiempoEstimado: 5
  objetivoPedagogico: "Facilitar práctica mental del protocolo mediante escenarios guiados"
  tiposDeBloquePermitidos:
    - "simulacion_mental"
    - "texto_explicativo"
  enlaceOperativoRecomendado: false
  bloques: []
```

**Campos vacíos para contenido:**
- Simulación mental: Escenario, decisiones con opciones múltiples, feedback, reflexión
- Texto explicativo: Reflexión adicional post-simulación

---

### Sección 8: Resumen Visual y Puente al Operativo

```yaml
- idSeccion: "seccion_08"
  nombreSeccion: "Resumen Visual y Puente al Operativo"
  orden: 8
  obligatoria: true
  tiempoEstimado: 2
  objetivoPedagogico: "Consolidar aprendizaje mediante síntesis visual y preparar para uso del protocolo operativo"
  tiposDeBloquePermitidos:
    - "resumen_visual"
    - "enlace_operativo"
    - "texto_explicativo"
  enlaceOperativoRecomendado: true
  bloques: []
```

**Campos vacíos para contenido:**
- Resumen visual: Infografía de una página con algoritmo completo y puntos clave
- Enlace operativo: Botón destacado "Ir a Protocolo Operativo"
- Texto explicativo: Síntesis de puntos clave aprendidos

---

## 4️⃣ DEFINICIÓN DE BLOQUES

### Bloque: Texto Explicativo

```yaml
texto_explicativo:
  idBloque: "texto_explicativo"
  tipoBloque: "texto_explicativo"
  proposito: "Proporcionar explicaciones narrativas que contextualizan y profundizan conceptos"
  camposEsperados:
    - id: ""                    # ID único del bloque
    - titulo: ""                # Título del bloque (opcional)
    - contenido: ""             # Contenido textual explicativo
    - relacionConMarkdown:      # Referencia al Markdown relacionado
        capituloId: ""
        enlace: ""
  reglasDeUso:
    - "Explica el 'por qué' de conceptos"
    - "Proporciona contexto clínico"
    - "Amplía conceptos del Markdown"
  restricciones:
    - "NO incluye pasos numerados exactos"
    - "NO incluye valores numéricos críticos"
    - "NO incluye contraindicaciones exactas"
    - "NO incluye advertencias críticas operativas"
  relacionConMarkdown: "amplia_conceptos"
  obligatorioEnGuiasC: false
```

---

### Bloque: Visual Explicativo

```yaml
visual_explicativo:
  idBloque: "visual_explicativo"
  tipoBloque: "visual_explicativo"
  proposito: "Mostrar visualmente conceptos, técnicas o procesos que requieren comprensión visual"
  camposEsperados:
    - id: ""
    - titulo: ""
    - tipoVisual: ""            # infografia | diagrama | secuencia_fotografica | comparacion
    - urlImagen: ""             # URL o ruta a imagen/infografía
    - altText: ""               # Texto alternativo para accesibilidad
    - caption: ""               # Caption descriptivo (opcional)
    - relacionConMarkdown:
        capituloId: ""
        enlace: ""
  reglasDeUso:
    - "Visualiza algoritmos y flujos"
    - "Muestra técnicas paso a paso"
    - "Ilustra conceptos anatómicos o fisiológicos"
    - "Compara visualmente (correcto vs incorrecto)"
  restricciones:
    - "NO incluye valores numéricos exactos (solo rangos o conceptos)"
    - "NO incluye pasos operativos numerados exactos"
    - "NO incluye información crítica de seguridad sin enlace al operativo"
  relacionConMarkdown: "visualiza_conceptos"
  obligatorioEnGuiasC: false
```

---

### Bloque: Audiovisual

```yaml
audiovisual:
  idBloque: "audiovisual"
  tipoBloque: "audiovisual"
  proposito: "Demostrar técnicas en movimiento y proporcionar experiencia sensorial completa"
  camposEsperados:
    - id: ""
    - titulo: ""
    - tipoAudiovisual: ""      # video | animacion | audio
    - urlVideo: ""              # URL o ruta a vídeo
    - duracion: 0               # Segundos
    - descripcion: ""           # Descripción del contenido del vídeo
    - transcripcion: ""         # Transcripción para accesibilidad (opcional)
    - relacionConMarkdown:
        capituloId: ""
        enlace: ""
  reglasDeUso:
    - "Demuestra técnicas que requieren movimiento"
    - "Muestra secuencias temporales complejas"
    - "Proporciona experiencia sensorial"
  restricciones:
    - "NO incluye valores numéricos exactos (solo demostración visual)"
    - "NO incluye pasos operativos numerados exactos"
    - "NO incluye información crítica sin enlace al operativo"
  relacionConMarkdown: "muestra_ejecucion"
  obligatorioEnGuiasC: false
```

---

### Bloque: Error Frecuente

```yaml
error_frecuente:
  idBloque: "error_frecuente"
  tipoBloque: "error_frecuente"
  proposito: "Prevenir errores mediante visualización comparativa y comprensión de consecuencias"
  camposEsperados:
    - id: ""
    - titulo: ""
    - descripcionError: ""      # Descripción del error frecuente
    - visualizacionCorrecto:    # Visualización de técnica correcta
        urlImagen: ""
        altText: ""
    - visualizacionIncorrecto:  # Visualización de técnica incorrecta
        urlImagen: ""
        altText: ""
    - consecuencias: ""         # Explicación de consecuencias del error
    - prevencion: ""            # Cómo evitar el error
    - relacionConMarkdown:
        capituloId: ""
        enlace: ""
        puntoCritico: ""        # Referencia a "Puntos críticos TES" del protocolo
  reglasDeUso:
    - "Visualiza comparación lado a lado (correcto vs incorrecto)"
    - "Explica consecuencias de errores frecuentes"
    - "Muestra cómo evitar errores comunes"
  restricciones:
    - "NO incluye pasos operativos exactos (solo comparación visual)"
    - "NO incluye valores numéricos exactos"
    - "NO incluye información crítica sin enlace al operativo"
  relacionConMarkdown: "visualiza_advertencias"
  obligatorioEnGuiasC: false
```

---

### Bloque: Caso Clínico

```yaml
caso_clinico:
  idBloque: "caso_clinico"
  tipoBloque: "caso_clinico"
  proposito: "Aprender mediante aplicación práctica del protocolo en situaciones reales o simuladas"
  camposEsperados:
    - id: ""
    - titulo: ""
    - nivelComplejidad: ""      # estandar | variaciones | complejo
    - presentacion:             # Presentación del caso
        situacion: ""
        lugar: ""
        paciente: ""
        contexto: ""
    - analisis:                 # Análisis paso a paso
        pasos: []               # Array de pasos de análisis (NO pasos operativos)
        decisiones: []          # Array de decisiones tomadas
    - aprendizaje:              # Puntos de aprendizaje
        puntosClave: []         # Array de puntos clave aprendidos (máx 3-5)
        aplicacion: ""          # Aplicación a otras situaciones
    - relacionConMarkdown:
        capituloId: ""
        enlace: ""
  reglasDeUso:
    - "Muestra aplicación del protocolo en contexto"
    - "Valida comprensión profunda"
    - "Ilustra integración de múltiples conceptos"
  restricciones:
    - "NO incluye pasos operativos exactos (solo aplicación contextual)"
    - "NO incluye valores numéricos exactos"
    - "NO incluye información crítica sin enlace al operativo"
  relacionConMarkdown: "muestra_aplicacion"
  obligatorioEnGuiasC: false
```

---

### Bloque: Simulación Mental

```yaml
simulacion_mental:
  idBloque: "simulacion_mental"
  tipoBloque: "simulacion_mental"
  proposito: "Facilitar práctica mental del protocolo mediante escenarios guiados con decisiones y feedback"
  camposEsperados:
    - id: ""
    - titulo: ""
    - escenario: ""             # Descripción del escenario inicial
    - decisiones: []            # Array de decisiones
        - id: ""
          pregunta: ""
          opciones: []          # Array de opciones
          respuestaCorrecta: ""
          feedback: ""          # Explicación de la respuesta
    - reflexion: ""             # Reflexión post-simulación
    - relacionConMarkdown:
        capituloId: ""
        enlace: ""
  reglasDeUso:
    - "Facilita práctica mental del protocolo"
    - "Valida comprensión profunda"
    - "Entrena toma de decisiones"
  restricciones:
    - "NO incluye pasos operativos exactos (solo decisiones)"
    - "NO incluye valores numéricos exactos"
    - "NO incluye información crítica sin enlace al operativo"
  relacionConMarkdown: "basado_en_protocolo"
  obligatorioEnGuiasC: false
```

---

### Bloque: Resumen Visual

```yaml
resumen_visual:
  idBloque: "resumen_visual"
  tipoBloque: "resumen_visual"
  proposito: "Síntesis visual rápida de toda la guía para referencia posterior y puente al protocolo operativo"
  camposEsperados:
    - id: ""
    - titulo: ""
    - tipoResumen: ""           # infografia_una_pagina | algoritmo_visual | puntos_clave
    - urlInfografia: ""          # URL o ruta a infografía
    - puntosClave: []            # Array de puntos clave (5-7 puntos)
        - id: ""
          texto: ""
          icono: ""             # Opcional
    - relacionConMarkdown:
        capituloId: ""
        enlace: ""
  reglasDeUso:
    - "Sintetiza visualmente puntos clave aprendidos"
    - "Proporciona puente visual hacia protocolo operativo"
    - "Consolida aprendizaje"
  restricciones:
    - "NO incluye pasos operativos exactos (solo síntesis visual)"
    - "NO incluye valores numéricos exactos"
    - "NO incluye información crítica sin enlace al operativo"
  relacionConMarkdown: "resume_conceptos"
  obligatorioEnGuiasC: true     # Obligatorio en todas las guías C
```

---

### Bloque: Enlace Operativo

```yaml
enlace_operativo:
  idBloque: "enlace_operativo"
  tipoBloque: "enlace_operativo"
  proposito: "Proporcionar acceso claro y destacado al protocolo operativo relacionado"
  camposEsperados:
    - id: ""
    - textoEnlace: ""           # Texto del enlace
    - tipoEnlace: ""            # boton_primario | boton_secundario | enlace_discreto
    - protocoloOperativo:
        id: ""
        slug: ""
        titulo: ""
    - mensajeContextual: ""     # Mensaje contextual (opcional)
  reglasDeUso:
    - "Proporciona acceso al protocolo operativo"
    - "Transición clara entre modos"
    - "Siempre disponible"
  restricciones:
    - "NO incluye información operativa exacta (solo enlace)"
    - "NO incluye valores numéricos exactos"
  relacionConMarkdown: "enlace_directo"
  obligatorioEnGuiasC: false    # Pero debe aparecer en múltiples puntos
```

---

## 5️⃣ REGLAS DE VALIDACIÓN

### Regla 1: Secciones Obligatorias

**Validación:** Toda Guía de Refuerzo Categoría C debe tener exactamente estas secciones obligatorias:

- ✅ Sección 1: Introducción y Contexto
- ✅ Sección 2: Explicación Clínica y Fisiopatología
- ✅ Sección 3: Algoritmo Comentado Visual
- ✅ Sección 4: Medios Visuales y Demostración
- ✅ Sección 5: Errores Frecuentes Visualizados
- ✅ Sección 8: Resumen Visual y Puente al Operativo

**Comprobación:**
- Contar secciones con `obligatoria: true`
- Verificar que existen exactamente 6 secciones obligatorias
- Verificar que el orden es correcto (1, 2, 3, 4, 5, 8)

---

### Regla 2: Resumen Visual Final Obligatorio

**Validación:** Toda Guía de Refuerzo Categoría C debe tener un bloque `resumen_visual` en la Sección 8.

**Comprobación:**
- Verificar que Sección 8 contiene al menos un bloque de tipo `resumen_visual`
- Verificar que el bloque `resumen_visual` tiene `tipoResumen` definido
- Verificar que el bloque `resumen_visual` tiene `puntosClave` con 5-7 puntos

---

### Regla 3: Enlaces al Protocolo Operativo

**Validación:** Toda Guía de Refuerzo Categoría C debe tener enlaces al protocolo operativo en al menos 3 puntos:

- ✅ Sección 1 (Introducción) - Botón primario destacado
- ✅ Sección 3 (Algoritmo Comentado) - Enlace discreto
- ✅ Sección 5 (Errores Frecuentes) - Enlace discreto
- ✅ Sección 8 (Resumen Final) - Botón primario destacado

**Comprobación:**
- Contar bloques de tipo `enlace_operativo` en secciones 1, 3, 5, 8
- Verificar que hay al menos 3 enlaces al protocolo operativo
- Verificar que Sección 1 tiene enlace con `tipoEnlace: "boton_primario"`
- Verificar que Sección 8 tiene enlace con `tipoEnlace: "boton_primario"`

---

### Regla 4: No Incluir Valores Numéricos Críticos

**Validación:** Ningún bloque de la Guía de Refuerzo debe incluir valores numéricos críticos exactos.

**Comprobación:**
- Buscar en todos los campos `contenido` patrones de valores numéricos críticos:
  - Profundidades exactas (ej: "5-6 cm")
  - Frecuencias exactas (ej: "100-120/min")
  - Dosis exactas (ej: "1mg")
  - Tiempos exactos (ej: "30 segundos")
- Si se encuentran, verificar que están en contexto explicativo, no operativo
- Verificar que no están en formato de pasos numerados

**Excepciones permitidas:**
- Valores en contexto explicativo (ej: "las compresiones de aproximadamente 5-6 cm")
- Rangos conceptuales (ej: "profundidad adecuada")
- Referencias a protocolo operativo (ej: "ver protocolo operativo para valores exactos")

---

### Regla 5: No Incluir Pasos Numerados Operativos

**Validación:** Ningún bloque de la Guía de Refuerzo debe incluir pasos numerados exactos del protocolo operativo.

**Comprobación:**
- Buscar en todos los campos `contenido` patrones de pasos numerados:
  - "1. [acción]"
  - "Paso 1: [acción]"
  - Listas numeradas de pasos operativos
- Si se encuentran, verificar que están en contexto explicativo o comentado, no como pasos operativos exactos
- Verificar que no están duplicando el protocolo operativo

**Excepciones permitidas:**
- Pasos en contexto de análisis de casos clínicos
- Pasos en contexto de explicación del "por qué"
- Referencias a pasos del protocolo operativo (ej: "el paso 1 del protocolo operativo")

---

### Regla 6: Advertencia de Uso Obligatoria

**Validación:** Toda Guía de Refuerzo Categoría C debe tener advertencia de uso en los metadatos.

**Comprobación:**
- Verificar que `metadata.advertenciaUso` no está vacío
- Verificar que la advertencia menciona uso formativo
- Verificar que la advertencia menciona NO usar en emergencia activa
- Verificar que la advertencia menciona usar protocolo operativo para acción inmediata

---

### Regla 7: Metadatos Completos

**Validación:** Toda Guía de Refuerzo Categoría C debe tener todos los metadatos obligatorios completos.

**Comprobación:**
- Verificar que todos los campos de `metadata` están presentes:
  - `idGuia` no vacío
  - `titulo` no vacío
  - `subtitulo` no vacío
  - `tiempoEstimado.minimo` > 0
  - `tiempoEstimado.recomendado` >= `tiempoEstimado.minimo`
  - `tiempoEstimado.completo` >= `tiempoEstimado.recomendado`
  - `publicoObjetivo` no vacío
  - `advertenciaUso` no vacío
  - `protocoloOperativoRelacionado.id` no vacío
  - `protocoloOperativoRelacionado.slug` no vacío
  - `protocoloOperativoRelacionado.titulo` no vacío
  - `versionGuia` no vacío
  - `estadoGuia` en ["borrador", "activa", "archivada"]
  - `fechaCreacion` en formato ISO 8601

---

### Regla 8: Relación con Protocolo Operativo

**Validación:** Toda Guía de Refuerzo Categoría C debe tener relación clara con protocolo operativo.

**Comprobación:**
- Verificar que `metadata.protocoloOperativoRelacionado` está completo
- Verificar que existe protocolo operativo con el ID especificado
- Verificar que los enlaces operativos en bloques apuntan al mismo protocolo operativo
- Verificar que no hay referencias a protocolos operativos diferentes

---

## 6️⃣ EJEMPLO DE INSTANCIA VACÍA

### Guía de Refuerzo — RCP Adulto SVB (VACÍA)

```yaml
guia_refuerzo:
  metadata:
    idGuia: "rcp-adulto-svb"
    titulo: "Guía de Refuerzo — RCP Adulto SVB"
    subtitulo: "Comprensión Profunda y Formación en Reanimación Cardiopulmonar Básica"
    categoria: "C"
    modo: "formacion_refuerzo"
    tiempoEstimado:
      minimo: 15
      recomendado: 25
      completo: 35
    publicoObjetivo: "TES en formación inicial, formación continua y repaso"
    advertenciaUso: "Esta guía es para formación y comprensión. Para acción inmediata durante emergencia, usa el Protocolo Operativo RCP Adulto."
    protocoloOperativoRelacionado:
      id: "rcp-adulto-svb"
      slug: "rcp-adulto-svb"
      titulo: "RCP Adulto SVB"
    versionGuia: "1.0"
    estadoGuia: "borrador"
    fechaCreacion: "2025-12-23T00:00:00Z"
    fechaRevision: ""
    fechaActualizacion: "2025-12-23T00:00:00Z"
    autor: ""
    revisadoPor: ""

  secciones:
    - idSeccion: "seccion_01"
      nombreSeccion: "Introducción y Contexto"
      orden: 1
      obligatoria: true
      tiempoEstimado: 3
      objetivoPedagogico: "Establecer contexto clínico, importancia del protocolo y expectativas del usuario"
      tiposDeBloquePermitidos:
        - "texto_explicativo"
        - "visual_explicativo"
        - "enlace_operativo"
      enlaceOperativoRecomendado: true
      bloques:
        - id: "bloque_01_01"
          tipoBloque: "texto_explicativo"
          titulo: ""
          contenido: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
        - id: "bloque_01_02"
          tipoBloque: "visual_explicativo"
          titulo: ""
          tipoVisual: "infografia"
          urlImagen: ""
          altText: ""
          caption: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
        - id: "bloque_01_03"
          tipoBloque: "enlace_operativo"
          textoEnlace: "Ver Protocolo Operativo RCP Adulto"
          tipoEnlace: "boton_primario"
          protocoloOperativo:
            id: "rcp-adulto-svb"
            slug: "rcp-adulto-svb"
            titulo: "RCP Adulto SVB"
          mensajeContextual: "Para acción inmediata durante emergencia"

    - idSeccion: "seccion_02"
      nombreSeccion: "Explicación Clínica y Fisiopatología"
      orden: 2
      obligatoria: true
      tiempoEstimado: 5
      objetivoPedagogico: "Proporcionar base científica que explica por qué funciona RCP"
      tiposDeBloquePermitidos:
        - "texto_explicativo"
        - "visual_explicativo"
        - "pedagogico_explicativo"
      enlaceOperativoRecomendado: false
      bloques:
        - id: "bloque_02_01"
          tipoBloque: "texto_explicativo"
          titulo: ""
          contenido: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
        - id: "bloque_02_02"
          tipoBloque: "visual_explicativo"
          titulo: ""
          tipoVisual: "diagrama"
          urlImagen: ""
          altText: ""
          caption: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""

    - idSeccion: "seccion_03"
      nombreSeccion: "Algoritmo Comentado Visual"
      orden: 3
      obligatoria: true
      tiempoEstimado: 4
      objetivoPedagogico: "Visualizar el protocolo completo con explicaciones en cada paso"
      tiposDeBloquePermitidos:
        - "visual_explicativo"
        - "texto_explicativo"
        - "enlace_operativo"
      enlaceOperativoRecomendado: true
      bloques:
        - id: "bloque_03_01"
          tipoBloque: "visual_explicativo"
          titulo: ""
          tipoVisual: "infografia"
          urlImagen: ""
          altText: ""
          caption: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
        - id: "bloque_03_02"
          tipoBloque: "texto_explicativo"
          titulo: ""
          contenido: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
        - id: "bloque_03_03"
          tipoBloque: "enlace_operativo"
          textoEnlace: "Ver pasos operativos exactos"
          tipoEnlace: "enlace_discreto"
          protocoloOperativo:
            id: "rcp-adulto-svb"
            slug: "rcp-adulto-svb"
            titulo: "RCP Adulto SVB"
          mensajeContextual: ""

    - idSeccion: "seccion_04"
      nombreSeccion: "Medios Visuales y Demostración"
      orden: 4
      obligatoria: true
      tiempoEstimado: 5
      objetivoPedagogico: "Proporcionar experiencia sensorial mediante vídeo y secuencias fotográficas"
      tiposDeBloquePermitidos:
        - "audiovisual"
        - "visual_explicativo"
        - "texto_explicativo"
      enlaceOperativoRecomendado: false
      bloques:
        - id: "bloque_04_01"
          tipoBloque: "audiovisual"
          titulo: ""
          tipoAudiovisual: "video"
          urlVideo: ""
          duracion: 0
          descripcion: ""
          transcripcion: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
        - id: "bloque_04_02"
          tipoBloque: "visual_explicativo"
          titulo: ""
          tipoVisual: "secuencia_fotografica"
          urlImagen: ""
          altText: ""
          caption: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""

    - idSeccion: "seccion_05"
      nombreSeccion: "Errores Frecuentes Visualizados"
      orden: 5
      obligatoria: true
      tiempoEstimado: 4
      objetivoPedagogico: "Prevenir errores mediante visualización comparativa y comprensión de consecuencias"
      tiposDeBloquePermitidos:
        - "error_frecuente"
        - "visual_explicativo"
        - "texto_explicativo"
        - "enlace_operativo"
      enlaceOperativoRecomendado: true
      bloques:
        - id: "bloque_05_01"
          tipoBloque: "error_frecuente"
          titulo: ""
          descripcionError: ""
          visualizacionCorrecto:
            urlImagen: ""
            altText: ""
          visualizacionIncorrecto:
            urlImagen: ""
            altText: ""
          consecuencias: ""
          prevencion: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
            puntoCritico: ""
        - id: "bloque_05_02"
          tipoBloque: "enlace_operativo"
          textoEnlace: "Ver puntos críticos del protocolo"
          tipoEnlace: "enlace_discreto"
          protocoloOperativo:
            id: "rcp-adulto-svb"
            slug: "rcp-adulto-svb"
            titulo: "RCP Adulto SVB"
          mensajeContextual: ""

    - idSeccion: "seccion_06"
      nombreSeccion: "Casos Clínicos"
      orden: 6
      obligatoria: false
      tiempoEstimado: 8
      objetivoPedagogico: "Aprender mediante aplicación práctica del protocolo en situaciones reales"
      tiposDeBloquePermitidos:
        - "caso_clinico"
        - "visual_explicativo"
        - "texto_explicativo"
      enlaceOperativoRecomendado: false
      bloques:
        - id: "bloque_06_01"
          tipoBloque: "caso_clinico"
          titulo: ""
          nivelComplejidad: "estandar"
          presentacion:
            situacion: ""
            lugar: ""
            paciente: ""
            contexto: ""
          analisis:
            pasos: []
            decisiones: []
          aprendizaje:
            puntosClave: []
            aplicacion: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""

    - idSeccion: "seccion_07"
      nombreSeccion: "Simulación Mental Guiada"
      orden: 7
      obligatoria: false
      tiempoEstimado: 5
      objetivoPedagogico: "Facilitar práctica mental del protocolo mediante escenarios guiados"
      tiposDeBloquePermitidos:
        - "simulacion_mental"
        - "texto_explicativo"
      enlaceOperativoRecomendado: false
      bloques:
        - id: "bloque_07_01"
          tipoBloque: "simulacion_mental"
          titulo: ""
          escenario: ""
          decisiones: []
          reflexion: ""
          relacionConMarkdown:
            capituloId: ""
            enlace: ""

    - idSeccion: "seccion_08"
      nombreSeccion: "Resumen Visual y Puente al Operativo"
      orden: 8
      obligatoria: true
      tiempoEstimado: 2
      objetivoPedagogico: "Consolidar aprendizaje mediante síntesis visual y preparar para uso del protocolo operativo"
      tiposDeBloquePermitidos:
        - "resumen_visual"
        - "enlace_operativo"
        - "texto_explicativo"
      enlaceOperativoRecomendado: true
      bloques:
        - id: "bloque_08_01"
          tipoBloque: "resumen_visual"
          titulo: ""
          tipoResumen: "infografia_una_pagina"
          urlInfografia: ""
          puntosClave: []
          relacionConMarkdown:
            capituloId: ""
            enlace: ""
        - id: "bloque_08_02"
          tipoBloque: "enlace_operativo"
          textoEnlace: "Ir a Protocolo Operativo RCP Adulto"
          tipoEnlace: "boton_primario"
          protocoloOperativo:
            id: "rcp-adulto-svb"
            slug: "rcp-adulto-svb"
            titulo: "RCP Adulto SVB"
          mensajeContextual: "Ahora que comprendes el protocolo, usa el Protocolo Operativo para acción inmediata"
```

---

## 7️⃣ NOTAS DE USO Y ESCALABILIDAD

### Cómo Reutilizar Esta Plantilla

**Pasos para crear una nueva Guía de Refuerzo:**

1. **Copiar el esqueleto completo** (YAML o estructura equivalente)
2. **Completar metadatos:**
   - `idGuia`: Slug único de la nueva guía
   - `titulo`: Título de la nueva guía
   - `subtitulo`: Subtítulo descriptivo
   - `protocoloOperativoRelacionado`: ID, slug y título del protocolo relacionado
   - `tiempoEstimado`: Estimar tiempos según contenido
   - `publicoObjetivo`: Definir público objetivo específico
   - `advertenciaUso`: Adaptar advertencia al protocolo específico

3. **Completar secciones obligatorias (1-5, 8):**
   - Sección 1: Introducción y contexto del protocolo
   - Sección 2: Explicación clínica específica del protocolo
   - Sección 3: Algoritmo comentado visual del protocolo
   - Sección 4: Medios visuales específicos del protocolo
   - Sección 5: Errores frecuentes específicos del protocolo
   - Sección 8: Resumen visual específico del protocolo

4. **Completar secciones opcionales (6-7) si aplica:**
   - Sección 6: Casos clínicos relevantes al protocolo
   - Sección 7: Simulación mental específica del protocolo

5. **Validar según reglas de validación:**
   - Verificar secciones obligatorias
   - Verificar enlaces al protocolo operativo
   - Verificar que no hay valores numéricos críticos
   - Verificar que no hay pasos numerados operativos
   - Verificar advertencia de uso

---

### Cómo Crear Nuevas Guías a Partir de Esta Plantilla

**Proceso recomendado:**

1. **Identificar protocolo operativo relacionado:**
   - Verificar que existe protocolo operativo en el sistema
   - Obtener ID, slug y título del protocolo operativo
   - Revisar contenido del protocolo operativo para entender qué explicar

2. **Completar metadatos básicos:**
   - Generar `idGuia` único (slug)
   - Definir título y subtítulo
   - Establecer relación con protocolo operativo
   - Estimar tiempos según complejidad

3. **Completar secciones en orden:**
   - Empezar por Sección 1 (Introducción)
   - Continuar con Sección 2 (Explicación Clínica)
   - Completar secciones obligatorias restantes
   - Añadir secciones opcionales si aplica

4. **Añadir bloques según necesidad:**
   - Usar tipos de bloques permitidos en cada sección
   - Seguir reglas de uso de cada tipo de bloque
   - Respetar restricciones de cada tipo de bloque

5. **Validar y revisar:**
   - Ejecutar validaciones automáticas
   - Revisar manualmente contenido
   - Verificar relación con protocolo operativo
   - Obtener revisión médica/técnica

---

### Cómo Evitar Inconsistencias

**Estrategias:**

1. **Usar siempre la plantilla:**
   - No crear guías sin seguir la plantilla
   - No modificar estructura de secciones
   - No añadir secciones adicionales sin justificación

2. **Validar automáticamente:**
   - Ejecutar reglas de validación antes de publicar
   - Verificar que no hay valores numéricos críticos
   - Verificar que no hay pasos numerados operativos
   - Verificar enlaces al protocolo operativo

3. **Mantener relación con protocolo operativo:**
   - Siempre enlazar al protocolo operativo correcto
   - No duplicar información operativa
   - Verificar que protocolo operativo existe

4. **Revisar contenido periódicamente:**
   - Revisar cuando cambia protocolo operativo relacionado
   - Actualizar fechas de revisión
   - Mantener versionado claro

---

### Cómo Versionar Guías

**Estrategia de versionado:**

1. **Versión semántica (semver):**
   - `MAJOR.MINOR.PATCH`
   - `MAJOR`: Cambios incompatibles (estructura, secciones)
   - `MINOR`: Nuevas funcionalidades (nuevos bloques, secciones opcionales)
   - `PATCH`: Correcciones y actualizaciones menores

2. **Campos de versionado:**
   - `versionGuia`: Versión actual de la guía
   - `fechaCreacion`: Fecha de creación inicial
   - `fechaRevision`: Fecha de última revisión médica/técnica
   - `fechaActualizacion`: Fecha de última actualización de contenido

3. **Historial de versiones:**
   - Mantener registro de cambios entre versiones
   - Documentar razones de cambios
   - Mantener compatibilidad con protocolo operativo

---

### Cómo Revisar Guías Cuando Cambia el Protocolo Operativo

**Proceso de revisión:**

1. **Identificar cambio en protocolo operativo:**
   - Detectar actualización del protocolo operativo relacionado
   - Revisar cambios específicos en el protocolo operativo
   - Identificar impacto en la Guía de Refuerzo

2. **Revisar Guía de Refuerzo:**
   - Verificar que explicaciones siguen siendo válidas
   - Verificar que visualizaciones siguen siendo correctas
   - Verificar que casos clínicos siguen siendo relevantes
   - Verificar que errores frecuentes siguen siendo actuales

3. **Actualizar si es necesario:**
   - Actualizar explicaciones si cambian fundamentos
   - Actualizar visualizaciones si cambian técnicas
   - Actualizar casos clínicos si cambian protocolos
   - Actualizar errores frecuentes si cambian técnicas

4. **Versionar actualización:**
   - Incrementar versión según tipo de cambio
   - Actualizar `fechaActualizacion`
   - Actualizar `fechaRevision` si hay revisión médica/técnica
   - Documentar cambios en historial de versiones

5. **Validar después de actualización:**
   - Ejecutar validaciones automáticas
   - Verificar relación con protocolo operativo actualizado
   - Obtener revisión médica/técnica si hay cambios significativos

---

## 📊 RESUMEN EJECUTIVO

### Estructura Técnica Definida

- **Metadatos:** 15 campos obligatorios definidos
- **Secciones:** 8 secciones estándar (6 obligatorias, 2 opcionales)
- **Bloques:** 8 tipos de bloques reutilizables definidos
- **Validación:** 8 reglas de validación conceptuales

### Formato del Esqueleto

- **YAML:** Esquema estructural completo en YAML
- **Pseudo-Markdown:** Representación conceptual vacía

### Ejemplo de Instancia

- **RCP Adulto SVB:** Instancia vacía completa como ejemplo

### Notas de Uso

- **Reutilización:** Proceso paso a paso para crear nuevas guías
- **Escalabilidad:** Estrategias para evitar inconsistencias
- **Versionado:** Estrategia de versionado semántico
- **Revisión:** Proceso de revisión cuando cambia protocolo operativo

---

**Fin del Esqueleto Técnico**

*Este documento establece la estructura técnica definitiva y reutilizable para todas las Guías de Refuerzo de Categoría C. Debe usarse como base para crear nuevas guías y validar guías existentes.*

