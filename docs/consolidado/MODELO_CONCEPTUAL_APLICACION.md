# 🧠 Modelo Conceptual - EMERGES TES

**Fecha de análisis:** 2025-12-23  
**Analista:** Arquitecto de Producto y UX Senior - Aplicaciones Sanitarias Críticas  
**Objetivo:** Extraer el modelo conceptual abstracto de la aplicación

---

## 1️⃣ Modelo de Información

### Tipos de Información

La aplicación maneja **4 tipos fundamentales de entidades informativas**, cada una con estructura y propósito específico:

#### **1. Protocolos (Procedimientos)**
**Naturaleza:** Secuencias de acciones ordenadas temporalmente  
**Estructura:**
- **Identidad**: ID único, título completo, título corto
- **Clasificación**: Categoría (soporte_vital, patologias, escena), subcategoría, prioridad (crítico/alto/medio/bajo), grupo de edad (adulto/pediátrico/neonatal/todos)
- **Contenido operativo**: Lista ordenada de pasos, advertencias críticas, puntos clave, equipamiento necesario, fármacos relacionados
- **Metadatos**: Relaciones con otros protocolos, fármacos, herramientas

**Características distintivas:**
- Información **secuencial** (pasos numerados)
- Información **temporal** (orden de ejecución importa)
- Información **condicional** (variaciones por edad, contexto)

#### **2. Fármacos (Medicamentos)**
**Naturaleza:** Referencias farmacológicas con especificaciones técnicas  
**Estructura:**
- **Identidad**: Nombre genérico, nombre comercial
- **Clasificación**: Categoría farmacológica (cardiovascular, respiratorio, neurológico, etc.)
- **Especificaciones técnicas**: Presentación, dosis adulto, dosis pediátrica, vías de administración, dilución
- **Información de seguridad**: Indicaciones, contraindicaciones, efectos secundarios, antídoto
- **Información crítica especializada**: Puntos TES críticos (errores comunes, advertencias específicas del rol)

**Características distintivas:**
- Información **referencial** (consulta rápida)
- Información **técnica precisa** (dosis exactas, concentraciones)
- Información **de seguridad** (contraindicaciones destacadas)
- Información **especializada** (puntos críticos del rol profesional)

#### **3. Herramientas (Calculadoras y Tablas)**
**Naturaleza:** Instrumentos de cálculo y consulta rápida  
**Estructura:**
- **Tipo**: Calculadora interactiva, tabla de referencia, guía de terminología
- **Inputs**: Parámetros de entrada (peso, edad, valores clínicos)
- **Outputs**: Resultados calculados, interpretación del resultado, rangos de referencia
- **Contexto**: Cuándo usar, qué significa el resultado

**Características distintivas:**
- Información **interactiva** (requiere input del usuario)
- Información **calculada** (resultado derivado de inputs)
- Información **interpretativa** (explicación del significado del resultado)

#### **4. Manual (Documentación Completa)**
**Naturaleza:** Contenido formativo y de referencia extenso  
**Estructura:**
- **Jerarquía**: Parte → Bloque → Capítulo
- **Metadatos**: Nivel de dificultad, importancia, tipo de contenido (formativo/operativo/referencia), tiempo de lectura, palabras clave
- **Navegación**: Capítulo anterior, siguiente, relacionados
- **Contenido**: Markdown estructurado con texto, imágenes, tablas, listas

**Características distintivas:**
- Información **jerárquica** (estructura de árbol)
- Información **narrativa** (contenido extenso)
- Información **formativa** (aprendizaje y referencia)

### Relaciones entre Tipos de Información

**Red de relaciones:**

```
Protocolos ←→ Fármacos
    ↓            ↓
    └────→ Herramientas ←┘
              ↓
         Manual (contexto)
```

**Tipos de relaciones:**

1. **Protocolo → Fármaco**: "Este protocolo requiere estos fármacos"
   - Relación de **dependencia operativa**
   - Ejemplo: RCP → Adrenalina, Amiodarona

2. **Protocolo → Herramienta**: "Este protocolo usa esta herramienta"
   - Relación de **apoyo operativo**
   - Ejemplo: Trauma → Calculadora Glasgow

3. **Fármaco → Protocolo**: "Este fármaco se usa en estos protocolos"
   - Relación **inversa de uso**
   - Ejemplo: Adrenalina → RCP, Anafilaxia

4. **Manual → Protocolo/Fármaco**: "Este capítulo explica este protocolo/fármaco"
   - Relación de **contexto formativo**
   - El manual proporciona profundidad y contexto

5. **Protocolo → Protocolo**: "Protocolos relacionados"
   - Relación de **secuencia** (uno sigue al otro)
   - Relación de **alternativa** (uno u otro según contexto)
   - Relación de **especialización** (adulto vs pediátrico)

### Jerarquía de Información

**Nivel 1: Información Primaria (Acción Inmediata)**
- Pasos numerados de protocolos críticos
- Dosis exactas de fármacos
- Resultados de calculadoras con interpretación
- Advertencias y contraindicaciones

**Características:**
- Visible sin interacción adicional
- Formato escaneable rápidamente
- Información que requiere acción inmediata

**Nivel 2: Información Secundaria (Confirmación y Contexto)**
- Puntos clave de protocolos
- Indicaciones de fármacos
- Explicaciones de resultados de calculadoras
- Equipamiento necesario

**Características:**
- Visible con expansión mínima (click)
- Formato estructurado pero no crítico
- Información que confirma o contextualiza

**Nivel 3: Información de Apoyo (Referencia y Formación)**
- Notas adicionales de fármacos
- Efectos secundarios
- Capítulos completos del manual
- Referencias bibliográficas

**Características:**
- Requiere navegación o expansión explícita
- Formato narrativo extenso
- Información para aprendizaje o referencia profunda

---

## 2️⃣ Modelo de Uso en Emergencias

### Flujo de Decisión del Usuario

**Patrón de uso identificado: "Consulta Crítica Rápida"**

#### **Fase 1: Identificación del Problema**
**Decisión del usuario:** "¿Qué situación tengo?"
- **Input**: Situación clínica observada
- **Acción del usuario**: Buscar o navegar a protocolo específico
- **Información necesaria**: Lista de protocolos disponibles, búsqueda rápida
- **Tiempo objetivo**: < 5 segundos

**Patrones de acceso:**
1. **Acceso directo**: Botones grandes de emergencias críticas (RCP, Ictus, Shock)
2. **Búsqueda**: Modal de búsqueda con autocompletado
3. **Navegación**: Bottom nav → Sección → Protocolo específico
4. **Historial**: Últimas consultas recientes

#### **Fase 2: Confirmación del Protocolo**
**Decisión del usuario:** "¿Es este el protocolo correcto?"
- **Input**: Protocolo encontrado
- **Acción del usuario**: Leer título, prioridad, grupo de edad
- **Información necesaria**: Título corto, badges de prioridad/edad, categoría
- **Tiempo objetivo**: < 2 segundos

**Elementos de confirmación visual:**
- Badge de prioridad (color crítico/alto/medio/bajo)
- Badge de grupo de edad (adulto/pediátrico)
- Título descriptivo corto
- Icono de categoría

#### **Fase 3: Ejecución del Protocolo**
**Decisión del usuario:** "¿Qué hago ahora?"
- **Input**: Protocolo seleccionado
- **Acción del usuario**: Seguir pasos numerados secuencialmente
- **Información necesaria**: Lista ordenada de pasos, advertencias críticas
- **Tiempo objetivo**: Acceso inmediato, lectura según necesidad

**Estructura de información para ejecución:**
- **Pasos numerados**: Orden claro, acción por acción
- **Advertencias destacadas**: Información crítica que previene errores
- **Puntos clave**: Recordatorios importantes
- **Material necesario**: Checklist de equipamiento

#### **Fase 4: Consulta de Fármacos (si aplica)**
**Decisión del usuario:** "¿Qué fármaco y cómo?"
- **Input**: Fármaco mencionado en protocolo o búsqueda directa
- **Acción del usuario**: Consultar dosis, vía, contraindicaciones
- **Información necesaria**: Dosis exacta, vía de administración, contraindicaciones, puntos críticos TES
- **Tiempo objetivo**: < 10 segundos

**Priorización de información de fármacos:**
1. **Dosis** (lo primero que se necesita)
2. **Vía de administración** (cómo administrarlo)
3. **Contraindicaciones** (qué evitar)
4. **Puntos críticos TES** (errores comunes del rol)
5. **Dilución** (si aplica)
6. **Efectos secundarios** (información secundaria)

#### **Fase 5: Cálculo o Medición (si aplica)**
**Decisión del usuario:** "¿Cuál es el valor correcto?"
- **Input**: Parámetros del paciente (peso, edad, valores clínicos)
- **Acción del usuario**: Introducir valores en calculadora
- **Información necesaria**: Resultado calculado, interpretación del resultado
- **Tiempo objetivo**: < 15 segundos

**Flujo de calculadoras:**
1. Identificar calculadora necesaria
2. Introducir valores (validación en tiempo real)
3. Ver resultado inmediato
4. Leer interpretación (severidad, rango normal)

### Orden de Necesidad de Información

**Prioridad Temporal (qué se necesita primero):**

1. **Identificación** (0-5 seg)
   - ¿Qué protocolo aplica?
   - ¿Es crítico/alto/medio/bajo?
   - ¿Adulto o pediátrico?

2. **Acción Inmediata** (5-30 seg)
   - Primeros pasos del protocolo
   - Dosis del fármaco crítico
   - Resultado de cálculo urgente

3. **Confirmación** (30 seg - 2 min)
   - Pasos completos del protocolo
   - Contraindicaciones del fármaco
   - Interpretación del cálculo

4. **Contexto** (2 min+)
   - Puntos clave adicionales
   - Notas y referencias
   - Capítulos relacionados del manual

### Información que Solo Necesita Confirmar

**Patrón: "Confirmación Rápida"**

El usuario NO necesita leer todo, solo confirmar:

1. **Protocolo correcto**: Título + prioridad + edad
2. **Dosis correcta**: Número exacto + unidad + vía
3. **Contraindicación ausente**: Lista rápida de exclusiones
4. **Resultado en rango**: Valor calculado + interpretación

**Diseño para confirmación:**
- Información crítica siempre visible (sin expansión)
- Formato escaneable (números grandes, badges de color)
- Estructura predecible (mismo lugar siempre)

---

## 3️⃣ Patrones de Presentación

### Patrones Visuales Identificados

#### **Patrón 1: Tarjeta Expandible (Card Pattern)**
**Uso:** Protocolos, fármacos, patologías  
**Estructura:**
- **Header colapsado**: Título, badges de clasificación, iconos de acción (favorito, compartir, expandir)
- **Contenido expandido**: Información detallada organizada en secciones

**Por qué este patrón:**
- **Reducción de carga visual**: Solo muestra lo esencial inicialmente
- **Acceso rápido**: Identificación sin scroll
- **Expansión bajo demanda**: Usuario controla profundidad de información
- **Escaneabilidad**: Múltiples items visibles simultáneamente

**Variaciones del patrón:**
- **Protocolos**: Header con prioridad + edad → Pasos numerados + Advertencias
- **Fármacos**: Header con nombre genérico → Dosis + Contraindicaciones + Puntos críticos
- **Patologías**: Header con nombre → Clínica + Actuación

#### **Patrón 2: Lista Numerada Secuencial**
**Uso:** Pasos de protocolos  
**Estructura:**
- Números grandes y visibles
- Cada paso en línea separada
- Acción clara y concisa por paso

**Por qué este patrón:**
- **Orden explícito**: Secuencia clara de ejecución
- **Progreso visual**: Usuario sabe dónde está en el proceso
- **Escaneabilidad**: Fácil seguir visualmente
- **Memoria de trabajo**: Reduce carga cognitiva (no necesita recordar orden)

#### **Patrón 3: Badges de Clasificación**
**Uso:** Prioridad, categoría, grupo de edad, vías de administración  
**Estructura:**
- Pequeños elementos visuales con color + texto
- Agrupados cerca del título
- Código de color consistente

**Por qué este patrón:**
- **Reconocimiento rápido**: Color procesado más rápido que texto
- **Agrupación visual**: Información relacionada junta
- **Escaneabilidad**: Identificación sin lectura completa
- **Consistencia**: Mismo código de color en toda la app

**Código de color identificado:**
- **Rojo**: Crítico, Contraindicaciones, Errores
- **Naranja**: Alto, Advertencias
- **Amarillo**: Medio, Puntos clave
- **Azul**: Bajo, Información general
- **Verde**: Éxito, Indicaciones, Normal

#### **Patrón 4: Cajas Destacadas (Alert Boxes)**
**Uso:** Advertencias, contraindicaciones, puntos críticos TES  
**Estructura:**
- Fondo de color distintivo
- Borde destacado
- Icono de alerta
- Texto en lista con viñetas

**Por qué este patrón:**
- **Atención visual**: Rompe el flujo normal de lectura
- **Importancia**: Señala información crítica
- **Prevención de errores**: Destaca lo que NO debe olvidarse
- **Jerarquía visual**: Establece qué es más importante

**Variaciones:**
- **Advertencias**: Fondo amarillo/naranja, icono de alerta
- **Contraindicaciones**: Fondo rojo/amarillo, icono de prohibición
- **Puntos críticos TES**: Fondo rojo intenso, texto destacado

#### **Patrón 5: Grid de Acceso Rápido**
**Uso:** Home, emergencias críticas  
**Estructura:**
- Grid 2x2 de botones grandes
- Icono grande + título + subtítulo
- Color según prioridad/variante

**Por qué este patrón:**
- **Acceso directo**: Un click desde home
- **Reconocimiento visual**: Iconos grandes y distintivos
- **Priorización visual**: Tamaño y color indican importancia
- **Reducción de pasos**: Menos navegación = más rápido

#### **Patrón 6: Tabs de Contexto**
**Uso:** Adulto/Pediátrico, Categorías de fármacos, Sistemas de patologías  
**Estructura:**
- Tabs horizontales con iconos
- Contenido cambia según tab activo
- Tab activo destacado visualmente

**Por qué este patrón:**
- **Alternancia rápida**: Cambio de contexto sin navegación
- **Agrupación lógica**: Contenido relacionado junto
- **Reducción de scroll**: Menos contenido visible = menos abrumador
- **Contexto claro**: Usuario sabe qué variante está viendo

#### **Patrón 7: Formulario de Cálculo**
**Uso:** Calculadoras médicas  
**Estructura:**
- Inputs agrupados lógicamente
- Resultado destacado grande
- Interpretación del resultado debajo

**Por qué este patrón:**
- **Input claro**: Campos etiquetados y validados
- **Feedback inmediato**: Resultado calcula en tiempo real
- **Interpretación contextual**: No solo número, sino significado
- **Prevención de errores**: Validación de rangos

### Correspondencia Patrón-Tipo de Información

| Tipo de Información | Patrón Principal | Patrones Secundarios |
|---------------------|-----------------|---------------------|
| **Protocolos** | Tarjeta Expandible | Lista Numerada, Badges, Cajas Destacadas |
| **Fármacos** | Tarjeta Expandible | Badges, Cajas Destacadas (contraindicaciones), Lista con Viñetas |
| **Herramientas** | Formulario de Cálculo | Tabs, Tablas |
| **Manual** | Navegación Jerárquica | Markdown Renderizado, Breadcrumbs |
| **Patologías** | Tabs + Tarjetas | Lista con Viñetas, Badges |
| **Acceso Rápido** | Grid de Botones | Chips, Lista de Historial |

---

## 4️⃣ Principios de Diseño Implícitos

### Principio 1: Rapidez (Speed-First)

**Evidencia en el diseño:**
- Acceso directo a emergencias críticas desde home (1 click)
- Búsqueda con mínimo 2 caracteres (sin botón de buscar)
- Resultados instantáneos (sin espera de servidor)
- Información crítica visible sin expansión
- Botón flotante de emergencia siempre visible

**Objetivo:** Reducir tiempo de acceso a información crítica a < 30 segundos

**Implementación:**
- Información primaria siempre visible
- Navegación mínima (máximo 2-3 clicks)
- Carga progresiva (lo esencial primero)
- Caché offline (sin dependencia de red)

### Principio 2: Reducción de Carga Cognitiva

**Evidencia en el diseño:**
- Información estructurada en niveles (primaria/secundaria/apoyo)
- Tarjetas colapsables (solo lo necesario visible)
- Código de color consistente (rojo=crítico, amarillo=advertencia)
- Listas numeradas (orden explícito, no requiere recordar)
- Badges visuales (clasificación sin leer texto completo)

**Objetivo:** Usuario puede encontrar información sin pensar demasiado

**Implementación:**
- Agrupación lógica (protocolos juntos, fármacos juntos)
- Estructura predecible (mismo formato siempre)
- Reducción de opciones visibles (tabs, filtros)
- Iconografía consistente (mismo icono = mismo significado)

### Principio 3: Jerarquía Visual Clara

**Evidencia en el diseño:**
- Tamaños de texto diferenciados (títulos grandes, detalles pequeños)
- Colores según importancia (rojo crítico, azul información)
- Espaciado generoso (separación clara entre secciones)
- Contraste alto (texto legible en cualquier condición)
- Agrupación visual (elementos relacionados juntos)

**Objetivo:** Usuario identifica inmediatamente qué es más importante

**Implementación:**
- Títulos grandes y destacados
- Información crítica en cajas destacadas
- Badges de prioridad siempre visibles
- Espaciado vertical generoso entre secciones

### Principio 4: Prevención de Errores

**Evidencia en el diseño:**
- Contraindicaciones destacadas en rojo
- Puntos críticos TES en cajas especiales
- Advertencias antes de pasos críticos
- Validación de inputs en calculadoras (rangos)
- Confirmación visual de dosis (números grandes)

**Objetivo:** Reducir errores que pueden ser críticos en emergencias

**Implementación:**
- Información de seguridad siempre visible
- Errores comunes explícitamente mencionados
- Validación de valores de entrada
- Formato claro de dosis (evitar ambigüedad)

### Principio 5: Uso Bajo Estrés

**Evidencia en el diseño:**
- Interfaz simple y clara (sin distracciones)
- Botones grandes y fáciles de tocar
- Contraste alto (legible en condiciones adversas)
- Información escaneable (no requiere lectura completa)
- Acceso redundante (múltiples formas de llegar a lo mismo)

**Objetivo:** Funcionar bien incluso bajo presión y estrés

**Implementación:**
- Diseño minimalista (sin elementos decorativos innecesarios)
- Tamaños de toque generosos (mínimo 44x44px)
- Feedback visual inmediato (hover, active states)
- Navegación intuitiva (bottom nav siempre visible)
- Sin modales bloqueantes (búsqueda en overlay, no bloquea)

### Principio 6: Offline-First

**Evidencia en el diseño:**
- Service Worker cachea todo
- Datos estáticos (no requiere servidor)
- Funciona sin conexión después de instalación
- Indicador de estado online/offline

**Objetivo:** Funcionar en cualquier condición, incluso sin internet

**Implementación:**
- Caché agresivo de recursos estáticos
- Datos embebidos en la aplicación
- Sin dependencias de API externas
- Estrategia Cache-First para assets

### Principio 7: Especialización del Rol

**Evidencia en el diseño:**
- "Puntos críticos TES" (información específica del rol)
- Errores comunes del rol explícitamente mencionados
- Terminología técnica apropiada (no simplificada)
- Checklists específicos del rol profesional

**Objetivo:** Información relevante para el profesional específico

**Implementación:**
- Sección especial "Puntos TES Críticos" en fármacos
- Errores comunes del rol destacados
- Terminología médica precisa
- Checklists operativos específicos

---

## 5️⃣ Modelo Abstracto Reutilizable

### Descripción del Modelo

**"Aplicación de Consulta Crítica Basada en Entidades Especializadas"**

### Componentes del Modelo

#### **1. Tipos de Entidades (4 tipos fundamentales)**

**Entidad Tipo A: Procedimientos Secuenciales**
- Información que describe **cómo hacer algo paso a paso**
- Características: Orden temporal, acciones concretas, contexto específico
- Ejemplos en otros dominios: Procedimientos de seguridad, protocolos de mantenimiento, recetas de cocina profesional

**Entidad Tipo B: Referencias Técnicas**
- Información que describe **especificaciones técnicas precisas**
- Características: Valores exactos, condiciones de uso, restricciones
- Ejemplos en otros dominios: Especificaciones de componentes, parámetros de configuración, estándares técnicos

**Entidad Tipo C: Herramientas de Cálculo**
- Información que **transforma inputs en outputs interpretables**
- Características: Inputs del usuario, cálculo automático, interpretación contextual
- Ejemplos en otros dominios: Calculadoras financieras, herramientas de diseño, simuladores

**Entidad Tipo D: Documentación Completa**
- Información que proporciona **contexto formativo y referencia profunda**
- Características: Estructura jerárquica, contenido extenso, navegación relacionada
- Ejemplos en otros dominios: Manuales técnicos, guías de referencia, documentación de sistemas

#### **2. Jerarquía de Información (3 niveles)**

**Nivel 1: Acción Inmediata**
- Información necesaria para **tomar acción ahora**
- Visible sin interacción
- Formato escaneable rápidamente
- **Aplicación universal**: Siempre hay información que requiere acción inmediata

**Nivel 2: Confirmación y Contexto**
- Información que **confirma o contextualiza** la acción
- Visible con expansión mínima
- Formato estructurado
- **Aplicación universal**: Siempre hay información de apoyo a la acción

**Nivel 3: Referencia y Formación**
- Información para **aprendizaje o referencia profunda**
- Requiere navegación explícita
- Formato narrativo extenso
- **Aplicación universal**: Siempre hay información de fondo disponible

#### **3. Flujos de Uso (5 fases)**

**Fase 1: Identificación**
- Usuario identifica qué necesita
- Patrón: Búsqueda o navegación directa
- **Aplicación universal**: Siempre hay un punto de entrada

**Fase 2: Confirmación**
- Usuario confirma que encontró lo correcto
- Patrón: Información de clasificación visible
- **Aplicación universal**: Siempre hay necesidad de confirmar

**Fase 3: Ejecución**
- Usuario sigue instrucciones o consulta información
- Patrón: Información estructurada secuencialmente
- **Aplicación universal**: Siempre hay una acción a realizar

**Fase 4: Consulta Relacionada**
- Usuario consulta información relacionada si es necesario
- Patrón: Navegación a entidades relacionadas
- **Aplicación universal**: Las entidades siempre tienen relaciones

**Fase 5: Cálculo o Medición**
- Usuario calcula valores si es necesario
- Patrón: Herramienta interactiva con inputs/outputs
- **Aplicación universal**: Muchos dominios requieren cálculos

#### **4. Patrones de Presentación (7 patrones base)**

1. **Tarjeta Expandible**: Para entidades con información en niveles
2. **Lista Numerada**: Para secuencias de acciones
3. **Badges de Clasificación**: Para metadatos importantes
4. **Cajas Destacadas**: Para información crítica de seguridad
5. **Grid de Acceso Rápido**: Para acceso directo a entidades prioritarias
6. **Tabs de Contexto**: Para variantes de la misma entidad
7. **Formulario de Cálculo**: Para herramientas interactivas

#### **5. Principios de Diseño (7 principios)**

1. **Rapidez**: Acceso rápido a información crítica
2. **Reducción de Carga Cognitiva**: Estructura clara, información escaneable
3. **Jerarquía Visual**: Importancia clara mediante diseño
4. **Prevención de Errores**: Información de seguridad destacada
5. **Uso Bajo Estrés**: Interfaz simple, accesible, redundante
6. **Offline-First**: Funciona sin dependencias externas
7. **Especialización del Rol**: Información específica del usuario profesional

### Aplicación del Modelo a Otros Dominios

#### **Ejemplo 1: Aplicación para Técnicos de Mantenimiento Industrial**

**Entidades:**
- **Procedimientos**: Protocolos de reparación paso a paso
- **Referencias**: Especificaciones de componentes, torque, presión
- **Herramientas**: Calculadoras de torque, tablas de conversión
- **Manual**: Documentación técnica completa

**Flujos:**
- Identificar problema → Confirmar procedimiento → Ejecutar pasos → Consultar especificaciones → Calcular valores

**Patrones:**
- Tarjetas de procedimientos con pasos numerados
- Badges de prioridad (crítico/alto/medio)
- Cajas destacadas para advertencias de seguridad
- Calculadoras de torque y presión

#### **Ejemplo 2: Aplicación para Pilotos de Emergencia**

**Entidades:**
- **Procedimientos**: Checklists de emergencia
- **Referencias**: Especificaciones de aeronave, límites operativos
- **Herramientas**: Calculadoras de combustible, tablas de viento
- **Manual**: Manual de operaciones completo

**Flujos:**
- Identificar emergencia → Confirmar checklist → Ejecutar procedimiento → Consultar límites → Calcular parámetros

**Patrones:**
- Checklists expandibles con pasos numerados
- Badges de severidad (crítico/urgente/normal)
- Cajas destacadas para advertencias críticas
- Calculadoras de combustible y tiempo

#### **Ejemplo 3: Aplicación para Cocineros Profesionales**

**Entidades:**
- **Procedimientos**: Recetas paso a paso
- **Referencias**: Especificaciones de ingredientes, temperaturas, tiempos
- **Herramientas**: Calculadoras de porciones, conversores de unidades
- **Manual**: Guía completa de técnicas culinarias

**Flujos:**
- Identificar plato → Confirmar receta → Ejecutar pasos → Consultar especificaciones → Calcular porciones

**Patrones:**
- Tarjetas de recetas con pasos numerados
- Badges de dificultad (fácil/medio/avanzado)
- Cajas destacadas para puntos críticos (temperatura, tiempo)
- Calculadoras de porciones y conversión

### Elementos Clave del Modelo Abstracto

**1. Separación de Tipos de Información**
- Cada tipo tiene estructura y propósito específico
- Las relaciones entre tipos están definidas
- La presentación se adapta al tipo

**2. Jerarquía de Acceso**
- Información primaria siempre accesible
- Información secundaria con expansión mínima
- Información de apoyo con navegación explícita

**3. Flujos de Decisión Claros**
- Identificación → Confirmación → Ejecución → Consulta → Cálculo
- Cada fase tiene información específica
- Transiciones entre fases son fluidas

**4. Patrones Visuales Consistentes**
- Cada patrón tiene propósito específico
- Los patrones se combinan según necesidad
- La consistencia reduce carga cognitiva

**5. Principios de Diseño Aplicables**
- Los principios son universales para aplicaciones críticas
- Se adaptan al dominio específico
- Priorizan rapidez y prevención de errores

### Replicabilidad del Modelo

**Para replicar este modelo en otro dominio:**

1. **Identificar los 4 tipos de entidades** del dominio
2. **Definir la jerarquía de información** (qué es primario/secundario/apoyo)
3. **Mapear los flujos de uso** (cómo el usuario toma decisiones)
4. **Aplicar los 7 patrones de presentación** según corresponda
5. **Implementar los 7 principios de diseño** adaptados al dominio

**El modelo es reutilizable porque:**
- Es independiente del dominio específico
- Los patrones son universales
- Los principios se aplican a cualquier contexto crítico
- La estructura es flexible pero consistente

---

## Conclusión

El modelo conceptual de EMERGES TES es una **arquitectura de información especializada para consulta crítica bajo presión**. Se basa en:

- **4 tipos de entidades** con relaciones claras
- **3 niveles de jerarquía** de información
- **5 fases de flujo** de uso
- **7 patrones visuales** consistentes
- **7 principios de diseño** universales

Este modelo puede replicarse en cualquier dominio donde profesionales necesiten acceso rápido a información técnica crítica, con estructura clara, prevención de errores y uso bajo estrés.

---

**Fin del Análisis Conceptual**

*Este informe extrae el modelo conceptual abstracto de la aplicación, independiente de la implementación técnica específica.*

