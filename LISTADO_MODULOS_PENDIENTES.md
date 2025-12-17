# LISTADO DE MÓDULOS PENDIENTES - FORMATO E INFORMACIÓN

**Fecha:** 2024-12-13  
**Estado:** Preparación para implementación

---

## 📋 RESUMEN EJECUTIVO

**Módulos completados:** 3/5 (60%)  
**Módulos pendientes:** 2/5 (40%)

- ✅ Módulo 1: Árboles de Decisión Binarios
- ✅ Módulo 2: Protocolos Transtelefónicos
- ❌ **Módulo 3: Guiones de Comunicación Operativa** ← PENDIENTE
- ✅ Módulo 4: Checklists de Material
- ❌ **Módulo 5: Material e Inmovilización** ← PENDIENTE

---

## 🔴 MÓDULO 3: GUIONES DE COMUNICACIÓN OPERATIVA

### 📄 INFORMACIÓN A EXTRAER DEL MANUAL

#### Fuente Principal: `BLOQUE_03_16_COMUNICACION_OPERATIVA.md`

**Sección 3.16.4 - Guiones Operativos (frases modelo):**

1. **Colocar gafas/mascarilla O₂**
   - Guión modelo: "Te voy a poner oxígeno para ayudarte a respirar mejor. Vas a notar el flujo de aire en la nariz/boca. Es normal, no te preocupes. ¿Me sigues?"
   - Variaciones según dispositivo (gafas nasales, mascarilla simple, mascarilla con reservorio)

2. **Aspiración (explicar sensación)**
   - Guión modelo: "Necesito limpiar tu boca/garganta para que respires mejor. Vas a notar una sensación de succión, puede ser un poco molesta pero es rápida. ¿Me sigues?"
   - Variaciones según tipo (Yankauer, sonda flexible)

3. **BVM/OPA/NPA**
   - Guión BVM: "Necesito ayudarte a respirar con una mascarilla. Voy a colocarla sobre tu nariz y boca. Puede ser un poco incómoda pero es necesaria. ¿Me sigues?"
   - Guión OPA/NPA: "Necesito ayudarte a respirar mejor. Voy a colocar un dispositivo en tu boca/nariz para mantener la vía aérea abierta. Puede ser un poco incómodo pero es necesario. ¿Me sigues?"

4. **Curas y vendajes**
   - Guión modelo: "Voy a limpiar y cubrir tu herida. Primero voy a limpiar, puede molestar un poco. Luego voy a cubrirla y fijarla. ¿Me sigues?"
   - Variaciones según tipo de herida (abrasión, laceración, quemadura)

5. **Transferencias a camilla/silla y evacuación**
   - Guión modelo: "Vamos a moverte a la camilla/silla para llevarte al hospital. Te voy a mover con cuidado, puede molestar un poco pero es necesario. ¿Me sigues?"
   - Variaciones según tipo (camilla, silla salvaescaleras)

6. **Control térmico**
   - Guión modelo: "Te voy a tapar con una manta para mantenerte caliente. Es importante para tu seguridad. ¿Me sigues?"

**Sección 3.16.5 - Comunicación en situaciones difíciles:**
- Paciente agitado
- Paciente con dolor intenso
- Barrera idiomática
- Paciente con familia alrededor

#### Fuentes Adicionales:

**De `BLOQUE_04_0_RECONOCIMIENTO_PCR.md` (Sección 4.0.2 - Guiones de Comunicación Inmediata):**
- Para testigos/parientes
- Para el Centro Coordinador (estructura ALSAR-T)
- Para el equipo

**De `BLOQUE_04_1_RCP_ADULTOS.md` (Sección 4.1.9 - Guiones de Comunicación Operativa):**
- Mando inicial
- Confirmación PCR
- Control de calidad
- DESA
- Con familiares

**De `BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md` (si existe sección de guiones):**
- Guiones para PLS

---

### 🏗️ ESTRUCTURA DE DATOS NECESARIA

```typescript
// src/data/communication-scripts.ts

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
  | 'inmovilizacion'
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

// Ejemplo de estructura:
{
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
  notes: 'Adaptar según dispositivo. Mantener tono tranquilo.',
  source: 'BLOQUE_03_16_COMUNICACION_OPERATIVA.md'
}
```

---

### 🎨 COMPONENTE DE VISUALIZACIÓN

**Archivo:** `src/components/communication-scripts/CommunicationScriptViewer.tsx`

**Funcionalidades:**
- Lista de guiones por categoría/contexto
- Visualización del guión principal
- Variaciones disponibles (si existen)
- Botón "Copiar" para copiar al portapapeles
- Búsqueda rápida por situación
- Filtros: categoría, contexto
- Modo "rápido": mostrar solo el guión sin explicaciones

**UI Sugerida:**
- Card con el guión destacado (texto grande, fácil de leer)
- Botón "Copiar" prominente
- Sección de variaciones (colapsable)
- Notas para el TES (colapsable)
- Búsqueda por palabras clave

---

### 📱 INTEGRACIÓN EN LA APP

**Opciones de integración:**
1. **Nueva página:** `/comunicacion` (similar a `/telefono` o `/material`)
2. **Componente reutilizable:** Usable en cualquier página (ej: botón flotante)
3. **Integración en Escena:** Nueva pestaña "Comunicación" en página Escena

**Recomendación:** Nueva página `/comunicacion` + acceso rápido desde Escena

---

### ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Extraer todos los guiones de `BLOQUE_03_16_COMUNICACION_OPERATIVA.md`
- [ ] Extraer guiones de `BLOQUE_04_0_RECONOCIMIENTO_PCR.md` (sección 4.0.2)
- [ ] Extraer guiones de `BLOQUE_04_1_RCP_ADULTOS.md` (sección 4.1.9)
- [ ] Extraer guiones de `BLOQUE_04_9_POSICION_LATERAL_SEGURIDAD.md` (si existe)
- [ ] Crear estructura de datos `communication-scripts.ts`
- [ ] Crear componente `CommunicationScriptViewer.tsx`
- [ ] Crear página `Comunicacion.tsx`
- [ ] Añadir ruta `/comunicacion` en `App.tsx`
- [ ] Añadir enlace en menú lateral (opcional)
- [ ] Añadir acceso rápido desde Escena (opcional)

---

## 🔴 MÓDULO 5: MATERIAL E INMOVILIZACIÓN

### 📄 INFORMACIÓN A EXTRAER DEL MANUAL

#### Fuente Principal: Bloque 2 - Material e Inmovilización

**Capítulos disponibles en `manual-tes/03_MATERIAL_E_INMOVILIZACION/`:**

1. **BLOQUE_02_0_ANATOMIA_OPERATIVA.md**
   - Landmarks óseos imprescindibles
   - Pulsos periféricos
   - Zonas de riesgo
   - Control neurovascular estandarizado
   - **Uso:** Referencia rápida de anatomía para TES

2. **BLOQUE_02_2_INMOVILIZACION_MANUAL.md**
   - Técnicas de inmovilización cervical y corporal manual
   - Coordinación del equipo
   - Transición a dispositivos

3. **BLOQUE_02_3_COLLARIN_CERVICAL.md**
   - Selección de talla
   - Colocación paso a paso
   - Verificación post-colocación
   - Errores críticos

4. **BLOQUE_02_4_CAMILLA_CUCHARA.md**
   - Técnica de colocación
   - Transferencia del paciente
   - Transición a sistemas definitivos

5. **BLOQUE_02_5_TABLERO_ESPINAL.md**
   - Colocación del tablero espinal
   - Fijación del paciente
   - Limitaciones
   - Transición a colchón de vacío

6. **BLOQUE_02_6_COLCHON_VACIO.md**
   - Técnica de colocación
   - Ajuste corporal
   - Extracción de aire
   - Ventajas para transporte prolongado

7. **BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md**
   - Extricación rápida vs controlada
   - Log-roll
   - Puente
   - Slide
   - Extricación desde vehículo

8. **BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md**
   - Transferencia lateral
   - Con camilla cuchara
   - Desde suelo
   - Sentado a decúbito
   - En espacios reducidos
   - Escaleras

9. **BLOQUE_02_9_ERRORES_CRITICOS.md**
   - Errores sistémicos
   - Prevención y corrección

10. **BLOQUE_02_10_FERULAS.md**
    - Clasificación global (familias)
    - Selección rápida
    - Procedimientos por familia
    - Férulas rígidas, SAM, escalera, vacío, neumáticas, dedo, cabestrillo, improvisadas

11. **BLOQUE_02_11_CINTURON_PELVICO.md**
    - Técnica de colocación
    - Ajuste de tensión
    - Verificación de posición (trocánteres mayores)
    - Errores críticos

12. **BLOQUE_02_12_FERULA_TRACCION.md**
    - Principios comunes
    - Procedimiento paso a paso
    - Variaciones por diseño (Hare, Sager/CT-6)
    - Integración con otras inmovilizaciones

13. **BLOQUE_02_13_CAMILLAS_SILLAS_EVACUACION.md**
    - Camilla principal
    - Plegable
    - Reeves
    - Canastilla
    - Sked
    - Silla de rescate
    - Salvaescaleras

14. **BLOQUE_02_X_INVENTARIO_MATERIAL.md**
    - Listado operativo completo
    - Por categorías
    - Con enlaces a capítulos

---

### 🏗️ ESTRUCTURA DE DATOS NECESARIA

```typescript
// src/data/immobilization.ts

export type ImmobilizationCategory = 
  | 'cervical'
  | 'espinal'
  | 'extremidades'
  | 'pelvica'
  | 'extricacion'
  | 'transferencias'
  | 'camillas';

export type ImmobilizationType = 
  | 'collar'
  | 'tablero'
  | 'colchon_vacio'
  | 'camilla_cuchara'
  | 'ferula'
  | 'ferula_traccion'
  | 'cinturon_pelvico'
  | 'inmovilizacion_manual'
  | 'extricacion'
  | 'transferencia'
  | 'camilla';

export interface ImmobilizationStep {
  id: string;
  order: number;
  instruction: string;
  critical?: boolean;
  notes?: string;
  warnings?: string[];
}

export interface ImmobilizationMaterial {
  id: string;
  name: string;
  category: ImmobilizationCategory;
  type: ImmobilizationType;
  description: string;
  indications: string[];
  contraindications?: string[];
  materialNeeded: string[];
  steps: ImmobilizationStep[];
  commonErrors?: string[];
  keyPoints?: string[];
  source?: string;
}

// Ejemplo:
{
  id: 'collar-cervical',
  name: 'Collarín Cervical',
  category: 'cervical',
  type: 'collar',
  description: 'Dispositivo de inmovilización externa para limitar movimientos cervicales',
  indications: [
    'Politraumatizados',
    'Accidentes de tráfico',
    'Caídas desde altura',
    'Paciente inconsciente',
    'Dolor cervical',
    'Déficit neurológico'
  ],
  contraindications: [
    'Lesión de vía aérea que impida colocación',
    'Vómito activo sin control'
  ],
  materialNeeded: [
    'Collarín cervical (talla correcta)',
    'Medidor de talla (si aplica)',
    'Acolchado (si necesario)'
  ],
  steps: [
    {
      id: 'medir-talla',
      order: 1,
      instruction: 'Medir talla: desde ángulo de mandíbula hasta parte superior del esternón',
      critical: true
    },
    // ... más pasos
  ],
  commonErrors: [
    'Colocar sin medir talla',
    'Colocar demasiado alto o bajo',
    'No verificar después de colocación'
  ],
  keyPoints: [
    'El collarín no inmoviliza por completo, solo limita movimientos',
    'Requiere combinación con inmovilización manual y corporal',
    'Si dudas, se coloca'
  ],
  source: 'BLOQUE_02_3_COLLARIN_CERVICAL.md'
}
```

---

### 🎨 COMPONENTE DE VISUALIZACIÓN

**Archivo:** `src/components/immobilization/ImmobilizationViewer.tsx`

**Funcionalidades:**
- Lista de materiales/procedimientos por categoría
- Visualización paso a paso del procedimiento
- Indicaciones y contraindicaciones
- Material necesario
- Errores comunes
- Puntos clave TES
- Búsqueda rápida por material o situación
- Filtros: categoría, tipo

**UI Sugerida:**
- Similar a `ProcedureCard` pero específico para inmovilización
- Secciones expandibles: indicaciones, material, pasos, errores
- Badges para categorías
- Iconos por tipo de material

---

### 📱 INTEGRACIÓN EN LA APP

**Opciones de integración:**
1. **Nueva página:** `/inmovilizacion` (similar a `/material`)
2. **Extensión de Escena:** Nueva pestaña "Inmovilización" en página Escena
3. **Integración en Material:** Sección dentro de `/material`

**Recomendación:** Nueva página `/inmovilizacion` + acceso desde Escena (pestaña existente "Inmovil.")

---

### ✅ CHECKLIST DE IMPLEMENTACIÓN

#### Fase 1: Estructura de Datos
- [ ] Leer `BLOQUE_02_0_ANATOMIA_OPERATIVA.md` (referencia, no procedimiento)
- [ ] Leer `BLOQUE_02_2_INMOVILIZACION_MANUAL.md`
- [ ] Leer `BLOQUE_02_3_COLLARIN_CERVICAL.md`
- [ ] Leer `BLOQUE_02_4_CAMILLA_CUCHARA.md`
- [ ] Leer `BLOQUE_02_5_TABLERO_ESPINAL.md`
- [ ] Leer `BLOQUE_02_6_COLCHON_VACIO.md`
- [ ] Leer `BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md`
- [ ] Leer `BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md`
- [ ] Leer `BLOQUE_02_10_FERULAS.md`
- [ ] Leer `BLOQUE_02_11_CINTURON_PELVICO.md`
- [ ] Leer `BLOQUE_02_12_FERULA_TRACCION.md`
- [ ] Leer `BLOQUE_02_13_CAMILLAS_SILLAS_EVACUACION.md`
- [ ] Crear estructura de datos `immobilization.ts` con todos los procedimientos

#### Fase 2: Componentes
- [ ] Crear componente `ImmobilizationViewer.tsx`
- [ ] Crear componente `ImmobilizationCard.tsx` (similar a ProcedureCard)
- [ ] Crear página `Inmovilizacion.tsx`

#### Fase 3: Integración
- [ ] Añadir ruta `/inmovilizacion` en `App.tsx`
- [ ] Actualizar pestaña "Inmovil." en Escena para enlazar a nueva página (opcional)
- [ ] Añadir enlace en menú lateral (opcional)

---

## 📊 RESUMEN DE PRIORIDADES

### Módulo 3: Guiones de Comunicación Operativa
**Prioridad:** Alta  
**Complejidad:** Media  
**Fuentes:** 3-4 archivos del manual  
**Tiempo estimado:** 2-3 horas

**Ventajas:**
- Contenido ya estructurado en el manual
- Guiones claros y listos para usar
- Alto valor operativo (uso diario)

### Módulo 5: Material e Inmovilización
**Prioridad:** Alta  
**Complejidad:** Alta  
**Fuentes:** 14 archivos del manual  
**Tiempo estimado:** 4-6 horas

**Ventajas:**
- Contenido completo en el manual
- Procedimientos paso a paso detallados
- Alto valor operativo (selección rápida de material)

**Desafíos:**
- Mucho contenido para estructurar
- Múltiples familias de material
- Necesita organización clara por categorías

---

## 🎯 RECOMENDACIÓN DE ORDEN

1. **Módulo 3 primero** (más rápido, contenido más simple)
2. **Módulo 5 después** (más complejo, requiere más tiempo)

---

## 📝 NOTAS IMPORTANTES

### Principios a Mantener:
- ✅ Todo aditivo (no modificar existente)
- ✅ Reutilizar componentes UI existentes
- ✅ Seguir patrones de código establecidos
- ✅ Mantener compatibilidad hacia atrás
- ✅ Fuente única: Manual TES Digital (no inventar contenido)

### Formato de Datos:
- Todos los módulos usan TypeScript con tipos claros
- Estructura similar a módulos existentes
- Funciones helper para filtrado/búsqueda
- Referencias a fuente del manual

### Componentes UI:
- Reutilizar: Button, Card, Alert, Badge, etc.
- Seguir patrones de visualización existentes
- Mantener consistencia visual

---

**Listado completo preparado para implementación**
