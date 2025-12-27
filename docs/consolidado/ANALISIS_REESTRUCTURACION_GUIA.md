# 📚 Análisis y Reestructuración de la Guía TES Digital

**Fecha de análisis:** 2025-12-23  
**Analista:** Arquitecto de Información, Documentación Técnica y Contenido Sanitario  
**Objetivo:** Analizar estructura actual y proponer reestructuración coherente como manual profesional

---

## 1️⃣ Análisis de la Estructura Actual

### Organización Actual

**Estructura física:**
- **94 archivos Markdown** organizados en **17 bloques** (carpetas)
- Numeración de bloques: `BLOQUE_0` a `BLOQUE_15`
- Cada bloque contiene archivos con formato: `BLOQUE_XX_Y_NOMBRE.md`

**Jerarquía actual:**
```
public/manual/
├── BLOQUE_0_FUNDAMENTOS/ (1 archivo)
├── BLOQUE_1_PROCEDIMIENTOS_BASICOS/ (4 archivos)
├── BLOQUE_2_MATERIAL_E_INMOVILIZACION/ (15 archivos)
├── BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/ (30 archivos)
├── BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/ (11 archivos)
├── BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/ (10 archivos)
├── BLOQUE_6_FARMACOLOGIA/ (8 archivos)
├── BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/ (6 archivos)
├── BLOQUE_8_GESTION_OPERATIVA/ (vacío)
├── BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/ (5 archivos) ⚠️ DUPLICADO
├── BLOQUE_9_MEDICINA_EMERGENCIAS_APLICADA/ (1 archivo)
├── BLOQUE_10_SITUACIONES_ESPECIALES/ (1 archivo)
├── BLOQUE_11_PROTOCOLOS_TRAUMA/ (1 archivo)
├── BLOQUE_12_MARCO_LEGAL_ETICO_PROFESIONAL/ (1 archivo)
├── BLOQUE_13_COMUNICACION_RELACION_PACIENTE/ (1 archivo)
├── BLOQUE_14_SEGURIDAD_PERSONAL_SALUD_TES/ (1 archivo)
└── BLOQUE_15_ALTERACIONES_PSIQUIATRICAS_Y_CONTENCION/ (1 archivo)
```

### Criterios Aparentes de Organización

**Análisis de criterios utilizados:**

1. **Criterio Temático (Principal)**
   - Bloques organizados por temas: Fundamentos, Material, RCP, Farmacología, etc.
   - **Ventaja:** Agrupación lógica por área de conocimiento
   - **Problema:** No hay criterio claro de orden entre bloques

2. **Criterio Funcional (Secundario)**
   - Algunos bloques agrupan por función: "Procedimientos Básicos", "Gestión Operativa"
   - **Ventaja:** Agrupa acciones relacionadas
   - **Problema:** Mezcla con criterio temático crea confusión

3. **Criterio Cronológico (Implícito)**
   - Orden aparente: Fundamentos → Procedimientos → Material → RCP
   - **Ventaja:** Sigue flujo de aprendizaje básico
   - **Problema:** No es consistente (Bloque 9 "Medicina Emergencias" aparece después de RCP)

4. **Criterio Mixto (Actual)**
   - Combinación de temático, funcional y cronológico sin reglas claras
   - **Problema:** Falta de coherencia estructural

### Tipos de Contenido que Conviven

**Análisis de contenido por bloque:**

1. **Contenido Operativo Puro**
   - Pasos numerados de procedimientos
   - Checklists operativos
   - Protocolos de acción inmediata
   - **Ejemplos:** RCP Adultos, ABCDE Operativo, Constantes Vitales

2. **Contenido Formativo**
   - Explicaciones conceptuales
   - Fundamentos teóricos
   - Contexto clínico
   - **Ejemplos:** Fundamentos de Emergencias, Marco Legal

3. **Contenido Mixto**
   - Procedimientos con explicaciones extensas
   - Técnicas con fundamentos teóricos
   - **Ejemplos:** Oxigenoterapia (tiene técnica + fundamentos)

4. **Contenido de Referencia**
   - Inventarios de material
   - Tablas de referencia
   - Glosarios
   - **Ejemplos:** Inventario Material Sanitario, Abreviaturas

**Problema identificado:** Estos tipos conviven en el mismo nivel jerárquico sin diferenciación clara.

---

## 2️⃣ Detección de Inconsistencias

### Inconsistencias Estructurales Críticas

#### **1. Duplicación de Carpetas**

**Problema:**
- `BLOQUE_8_GESTION_OPERATIVA/` (vacía)
- `BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/` (5 archivos)

**Impacto:** Confusión sobre qué carpeta usar, posible pérdida de contenido

**Solución propuesta:** Fusionar en una sola carpeta `BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION`

---

#### **2. Contenido Duplicado**

**Ejemplos identificados:**

**a) Cánulas Orofaringeas:**
- `BLOQUE_03_2B_CANULA_OROFARINGEA.md` (capítulo específico)
- `BLOQUE_03_4_CANULAS.md` (capítulo general que incluye OPA y NPA)

**Problema:** Información sobre OPA aparece en dos lugares con posible inconsistencia

**Solución propuesta:** 
- Mantener `BLOQUE_03_4_CANULAS.md` como capítulo principal
- Eliminar `BLOQUE_03_2B_CANULA_OROFARINGEA.md` o convertirlo en referencia cruzada

**b) Oxigenoterapia:**
- `BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md`
- `BLOQUE_03_0B_OXIGENOTERAPIA_FUNDAMENTOS.md`

**Problema:** Dos capítulos "0" sobre el mismo tema con nombres similares

**Solución propuesta:** Fusionar o clarificar diferencia (uno operativo, otro formativo)

---

#### **3. Niveles de Profundidad Desiguales**

**Análisis por bloque:**

| Bloque | Archivos | Profundidad | Problema |
|--------|----------|-------------|----------|
| BLOQUE_0 | 1 | Superficial | Solo introducción, falta desarrollo |
| BLOQUE_1 | 4 | Medio | Bien estructurado |
| BLOQUE_2 | 15 | Profundo | Muy detallado, bien organizado |
| BLOQUE_3 | 30 | Muy profundo | Excesivo, necesita subdivisión |
| BLOQUE_4 | 11 | Profundo | Bien estructurado |
| BLOQUE_5 | 10 | Profundo | Bien estructurado |
| BLOQUE_6 | 8 | Medio | Bien estructurado |
| BLOQUE_7 | 6 | Medio | Bien estructurado |
| BLOQUE_9-15 | 1 cada uno | Superficial | Solo introducciones, falta desarrollo |

**Problema:** 
- BLOQUE_3 tiene 30 archivos (demasiado extenso)
- Bloques 9-15 tienen solo 1 archivo cada uno (demasiado superficial)
- No hay equilibrio en profundidad

**Solución propuesta:** 
- Subdividir BLOQUE_3 en sub-bloques temáticos
- Desarrollar bloques 9-15 o fusionarlos con bloques relacionados

---

#### **4. Mezcla de Contenido Operativo y Formativo**

**Ejemplos identificados:**

**BLOQUE_3 (Material Sanitario):**
- `BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md` → Operativo
- `BLOQUE_03_0B_OXIGENOTERAPIA_FUNDAMENTOS.md` → Formativo
- `BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md` → Operativo
- `BLOQUE_03_99_CIERRE_BLOQUE_3.md` → Formativo/Metadatos

**Problema:** Mismo nivel jerárquico para contenido operativo y formativo

**Solución propuesta:** Separar en sub-bloques o etiquetar claramente

---

#### **5. Títulos Poco Homogéneos**

**Análisis de patrones de títulos:**

**Patrón 1:** `# X.Y – Título Descriptivo`
- Ejemplo: `# 3.11 – Glucómetro y Control de Glucemia: Uso Operativo (Tes)`
- **Uso:** Mayoría de archivos en BLOQUE_3

**Patrón 2:** `# X.Y – Título Simple`
- Ejemplo: `# 3.0 – Oxigenoterapia Básica`
- **Uso:** Algunos archivos en BLOQUE_3

**Patrón 3:** `# X.0 – Título con Subtítulo`
- Ejemplo: `# 0.0 – Fundamentos de la Atención en Emergencias Prehospitalarias`
- **Uso:** BLOQUE_0

**Patrón 4:** `# X.Y – Título con Especificación`
- Ejemplo: `# 1.1 – Constantes Vitales: Toma y Registro Operativo`
- **Uso:** BLOQUE_1

**Problemas identificados:**
- Inconsistencia en uso de dos puntos (`:`) después del título
- Inconsistencia en especificación de "(Tes)" o "(Operativo Tes)"
- Inconsistencia en uso de mayúsculas/minúsculas
- Algunos títulos muy largos, otros muy cortos

**Solución propuesta:** Establecer reglas editoriales claras para títulos

---

#### **6. Saltos Lógicos en Progresión**

**Ejemplos identificados:**

**a) Numeración de capítulos en índice:**
```
2.1.1 → 2.1.10 → 2.1.11 → 2.1.2 → 2.1.3 → ...
```
**Problema:** Orden lógico roto (10 y 11 aparecen antes de 2 y 3)

**b) Orden de bloques:**
- BLOQUE_4 (RCP) aparece antes de BLOQUE_9 (Medicina Emergencias)
- BLOQUE_9 debería ser contexto previo a protocolos específicos

**Problema:** Falta progresión lógica de lo general a lo específico

**c) Archivos con sufijos especiales:**
- `BLOQUE_04_0_ACCESO_VASCULAR_BASICO.md` (0)
- `BLOQUE_04_0B_RECONOCIMIENTO_PCR.md` (0B)
- `BLOQUE_03_X_INVENTARIO_MATERIAL_SANITARIO.md` (X)
- `BLOQUE_03_X2_MALETIN_CURAS.md` (X2)
- `BLOQUE_03_99_CIERRE_BLOQUE_3.md` (99)

**Problema:** Sistema de numeración inconsistente:
- `0` = Introducción
- `0B` = Introducción alternativa (?)
- `X` = Anexo/Inventario
- `X2, X3, X4, X5` = Anexos numerados
- `99` = Cierre

**Solución propuesta:** Establecer sistema de numeración claro y consistente

---

## 3️⃣ Identificación de Módulos y Bloques Reales

### Clasificación Propuesta

#### **MÓDULO 1: FUNDAMENTOS Y EVALUACIÓN INICIAL**

**Propósito:** Establecer base conceptual y evaluativa

**Bloques identificados:**

**Bloque 1.1: Fundamentos Conceptuales**
- Contenido actual: `BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md`
- **Tipo:** Formativo
- **Profundidad:** Necesita desarrollo (actualmente superficial)

**Bloque 1.2: Evaluación Primaria del Paciente**
- Contenido actual: `BLOQUE_1_PROCEDIMIENTOS_BASICOS/`
  - Constantes Vitales
  - ABCDE Operativo
  - Glasgow Operativo
  - Triage START
- **Tipo:** Operativo
- **Profundidad:** Adecuada

**Bloque 1.3: Seguridad en Escena**
- Contenido actual: Disperso en varios bloques
- **Tipo:** Operativo
- **Profundidad:** Necesita consolidación

---

#### **MÓDULO 2: SOPORTE VITAL Y PROCEDIMIENTOS CRÍTICOS**

**Propósito:** Protocolos de actuación inmediata en situaciones críticas

**Bloques identificados:**

**Bloque 2.1: Soporte Vital Básico (SVB)**
- Contenido actual: `BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/`
  - RCP Adultos, Pediatría, Lactantes
  - OVACE Adultos, Pediatría, Lactantes
  - Uso DESA
  - Posición Lateral de Seguridad
- **Tipo:** Operativo
- **Profundidad:** Adecuada

**Bloque 2.2: Protocolos Transtelefónicos**
- Contenido actual: `BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/`
- **Tipo:** Operativo
- **Profundidad:** Adecuada

**Bloque 2.3: Protocolos de Trauma**
- Contenido actual: `BLOQUE_11_PROTOCOLOS_TRAUMA.md` (superficial)
- **Tipo:** Operativo
- **Profundidad:** Necesita desarrollo

---

#### **MÓDULO 3: MATERIAL Y EQUIPAMIENTO**

**Propósito:** Uso operativo de material sanitario y de inmovilización

**Bloques identificados:**

**Bloque 3.1: Material de Inmovilización**
- Contenido actual: `BLOQUE_2_MATERIAL_E_INMOVILIZACION/`
- **Tipo:** Operativo
- **Profundidad:** Adecuada

**Bloque 3.2: Material Sanitario Básico**
- Contenido actual: `BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/` (parcial)
  - Sub-bloque 3.2.1: Oxigenoterapia
  - Sub-bloque 3.2.2: Vía Aérea Básica (Cánulas, BVM, Aspiración)
  - Sub-bloque 3.2.3: Monitorización (Glucometro, Termometría, Monitorización Básica)
  - Sub-bloque 3.2.4: Cuidados Básicos (Heridas, Quemaduras, Aislamiento Térmico)
  - Sub-bloque 3.2.5: Gestión de Material (Inventarios, Checklists, Organización)
- **Tipo:** Operativo
- **Profundidad:** Necesita subdivisión (actualmente 30 archivos)

**Bloque 3.3: Inventarios y Checklists**
- Contenido actual: Archivos con sufijo `_X_` en varios bloques
- **Tipo:** Referencia
- **Profundidad:** Consolidar en un solo bloque

---

#### **MÓDULO 4: FARMACOLOGÍA Y MEDICACIÓN**

**Propósito:** Administración segura de fármacos en emergencias

**Bloques identificados:**

**Bloque 4.1: Vademécum Operativo**
- Contenido actual: `BLOQUE_6_FARMACOLOGIA/`
- **Tipo:** Operativo/Referencia
- **Profundidad:** Adecuada

**Bloque 4.2: Principios de Administración**
- Contenido actual: `BLOQUE_06_0_PRINCIPIOS_ADMINISTRACION_FARMACOS.md`
- **Tipo:** Formativo/Operativo
- **Profundidad:** Adecuada

---

#### **MÓDULO 5: MEDICINA DE EMERGENCIAS APLICADA**

**Propósito:** Contexto clínico y manejo de patologías específicas

**Bloques identificados:**

**Bloque 5.1: Patologías por Sistemas**
- Contenido actual: `BLOQUE_9_MEDICINA_EMERGENCIAS_APLICADA.md` (superficial)
- **Tipo:** Formativo/Mixto
- **Profundidad:** Necesita desarrollo

**Bloque 5.2: Situaciones Especiales**
- Contenido actual: `BLOQUE_10_SITUACIONES_ESPECIALES.md` (superficial)
- **Tipo:** Formativo/Mixto
- **Profundidad:** Necesita desarrollo

**Bloque 5.3: Alteraciones Psiquiátricas**
- Contenido actual: `BLOQUE_15_ALTERACIONES_PSIQUIATRICAS_Y_CONTENCION.md` (superficial)
- **Tipo:** Operativo/Formativo
- **Profundidad:** Necesita desarrollo

---

#### **MÓDULO 6: GESTIÓN OPERATIVA Y PROFESIONAL**

**Propósito:** Aspectos organizativos, legales y profesionales

**Bloques identificados:**

**Bloque 6.1: Gestión Operativa**
- Contenido actual: `BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/`
- **Tipo:** Operativo/Formativo
- **Profundidad:** Adecuada

**Bloque 6.2: Comunicación y Relación con Paciente**
- Contenido actual: `BLOQUE_13_COMUNICACION_RELACION_PACIENTE.md` (superficial)
- **Tipo:** Formativo
- **Profundidad:** Necesita desarrollo

**Bloque 6.3: Marco Legal y Ético**
- Contenido actual: `BLOQUE_12_MARCO_LEGAL_ETICO_PROFESIONAL.md` (superficial)
- **Tipo:** Formativo/Referencia
- **Profundidad:** Necesita desarrollo

**Bloque 6.4: Seguridad Personal y Salud del TES**
- Contenido actual: `BLOQUE_14_SEGURIDAD_PERSONAL_SALUD_TES.md` (superficial)
- **Tipo:** Formativo/Operativo
- **Profundidad:** Necesita desarrollo

**Bloque 6.5: Conducción y Seguridad Vial**
- Contenido actual: `BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/`
- **Tipo:** Formativo/Operativo
- **Profundidad:** Adecuada

---

### Mapeo de Contenido Actual → Nueva Estructura

| Contenido Actual | Módulo Propuesto | Bloque Propuesto | Acción |
|-----------------|------------------|------------------|--------|
| BLOQUE_0 | Módulo 1 | Bloque 1.1 | Mantener, desarrollar |
| BLOQUE_1 | Módulo 1 | Bloque 1.2 | Mantener |
| BLOQUE_2 | Módulo 3 | Bloque 3.1 | Mantener |
| BLOQUE_3 | Módulo 3 | Bloque 3.2 | Subdividir en 5 sub-bloques |
| BLOQUE_4 | Módulo 2 | Bloque 2.1 | Mantener |
| BLOQUE_5 | Módulo 2 | Bloque 2.2 | Mantener |
| BLOQUE_6 | Módulo 4 | Bloque 4.1 | Mantener |
| BLOQUE_7 | Módulo 6 | Bloque 6.5 | Mantener |
| BLOQUE_8 (duplicado) | Módulo 6 | Bloque 6.1 | Fusionar |
| BLOQUE_9 | Módulo 5 | Bloque 5.1 | Desarrollar |
| BLOQUE_10 | Módulo 5 | Bloque 5.2 | Desarrollar |
| BLOQUE_11 | Módulo 2 | Bloque 2.3 | Desarrollar |
| BLOQUE_12 | Módulo 6 | Bloque 6.3 | Desarrollar |
| BLOQUE_13 | Módulo 6 | Bloque 6.2 | Desarrollar |
| BLOQUE_14 | Módulo 6 | Bloque 6.4 | Desarrollar |
| BLOQUE_15 | Módulo 5 | Bloque 5.3 | Desarrollar |

---

## 4️⃣ Reestructuración como Documento Formal

### Índice General Propuesto

```
MANUAL TES DIGITAL - GUÍA OPERATIVA Y FORMATIVA
Versión 2.0 - Estructura Reorganizada

═══════════════════════════════════════════════════════════════

PARTE I: FUNDAMENTOS Y EVALUACIÓN INICIAL
─────────────────────────────────────────

Módulo 1: Fundamentos y Evaluación Inicial
├── Capítulo 1.1: Fundamentos de Emergencias Prehospitalarias
│   ├── 1.1.1 Introducción y Marco Conceptual
│   ├── 1.1.2 Principios del Soporte Vital
│   ├── 1.1.3 Cadena de Supervivencia
│   └── 1.1.4 Rol y Alcance del TES
│
├── Capítulo 1.2: Evaluación Primaria del Paciente
│   ├── 1.2.1 Constantes Vitales: Toma y Registro Operativo
│   ├── 1.2.2 Evaluación Primaria ABCDE Operativo
│   ├── 1.2.3 Escala de Coma de Glasgow Operativo
│   └── 1.2.4 Triage START Operativo
│
└── Capítulo 1.3: Seguridad en Escena
    ├── 1.3.1 Evaluación de Seguridad de Escena
    ├── 1.3.2 Bioseguridad y EPI
    └── 1.3.3 Señalización y Seguridad Operativa

═══════════════════════════════════════════════════════════════

PARTE II: SOPORTE VITAL Y PROCEDIMIENTOS CRÍTICOS
──────────────────────────────────────────────────

Módulo 2: Soporte Vital y Procedimientos Críticos
├── Capítulo 2.1: Soporte Vital Básico (SVB)
│   ├── 2.1.1 Reconocimiento de Parada Cardiorrespiratoria
│   ├── 2.1.2 RCP Adulto SVB
│   ├── 2.1.3 RCP Pediátrico SVB
│   ├── 2.1.4 RCP Lactantes SVB
│   ├── 2.1.5 RCP con Dos Intervinientes
│   ├── 2.1.6 Uso del Desfibrilador Externo Automático (DEA)
│   ├── 2.1.7 OVACE Adultos
│   ├── 2.1.8 OVACE Pediátrico
│   ├── 2.1.9 OVACE Lactantes
│   └── 2.1.10 Posición Lateral de Seguridad
│
├── Capítulo 2.2: Protocolos Transtelefónicos
│   ├── 2.2.1 Introducción a Protocolos Transtelefónicos
│   ├── 2.2.2 PCR Transtelefónica
│   ├── 2.2.3 OVACE Transtelefónica
│   ├── 2.2.4 SCA Transtelefónico
│   ├── 2.2.5 Ictus Transtelefónico
│   ├── 2.2.6 Anafilaxia Transtelefónica
│   ├── 2.2.7 Crisis Asmática Transtelefónica
│   └── 2.2.8 Hipoglucemia Transtelefónica
│
└── Capítulo 2.3: Protocolos de Trauma
    ├── 2.3.1 Evaluación Primaria en Trauma
    ├── 2.3.2 Manejo de Hemorragias Masivas
    ├── 2.3.3 Shock Hemorrágico
    └── 2.3.4 Trauma Pediátrico

═══════════════════════════════════════════════════════════════

PARTE III: MATERIAL Y EQUIPAMIENTO
───────────────────────────────────

Módulo 3: Material y Equipamiento
├── Capítulo 3.1: Material de Inmovilización
│   ├── 3.1.1 Anatomía Operativa para Inmovilización
│   ├── 3.1.2 Inmovilización Manual
│   ├── 3.1.3 Collarín Cervical
│   ├── 3.1.4 Camilla Cuchara
│   ├── 3.1.5 Tablero Espinal
│   ├── 3.1.6 Colchón de Vacío
│   ├── 3.1.7 Extricación y Movimientos de Bloqueo
│   ├── 3.1.8 Transferencias y Movilización
│   ├── 3.1.9 Férulas
│   ├── 3.1.10 Cinturón Pélvico
│   ├── 3.1.11 Férula de Tracción
│   └── 3.1.12 Camillas y Sillas de Evacuación
│
├── Capítulo 3.2: Material Sanitario Básico
│   ├── 3.2.1 Oxigenoterapia Básica
│   │   ├── 3.2.1.1 Fundamentos de Oxigenoterapia
│   │   ├── 3.2.1.2 Dispositivos de Oxigenoterapia
│   │   └── 3.2.1.3 Seguridad en Oxigenoterapia
│   │
│   ├── 3.2.2 Vía Aérea Básica
│   │   ├── 3.2.2.1 Cánulas Orofaringeas (OPA)
│   │   ├── 3.2.2.2 Cánulas Nasofaringeas (NPA)
│   │   ├── 3.2.2.3 Ventilación con Bolsa-Mascarilla (BVM)
│   │   └── 3.2.2.4 Aspiración de Vía Aérea
│   │
│   ├── 3.2.3 Monitorización Básica
│   │   ├── 3.2.3.1 Monitorización de Constantes Vitales
│   │   ├── 3.2.3.2 Glucómetro y Control de Glucemia
│   │   └── 3.2.3.3 Termometría
│   │
│   ├── 3.2.4 Cuidados Básicos
│   │   ├── 3.2.4.1 Control de Hemorragias
│   │   ├── 3.2.4.2 Heridas y Vendajes
│   │   ├── 3.2.4.3 Quemaduras
│   │   └── 3.2.4.4 Exposición y Aislamiento Térmico
│   │
│   └── 3.2.5 Gestión de Material
│       ├── 3.2.5.1 Organización del Maletín
│       ├── 3.2.5.2 Gestión de Material en Escena
│       └── 3.2.5.3 Bioseguridad y Descontaminación
│
└── Capítulo 3.3: Inventarios y Checklists
    ├── 3.3.1 Inventario de Material de Inmovilización
    ├── 3.3.2 Inventario de Material Sanitario
    ├── 3.3.3 Checklist Maestro de Material
    └── 3.3.4 Documentación Operativa de Material

═══════════════════════════════════════════════════════════════

PARTE IV: FARMACOLOGÍA Y MEDICACIÓN
─────────────────────────────────────

Módulo 4: Farmacología y Medicación
├── Capítulo 4.1: Principios de Administración de Fármacos
│   ├── 4.1.1 Principios Generales
│   ├── 4.1.2 Vías de Administración
│   └── 4.1.3 Seguridad en Administración
│
└── Capítulo 4.2: Vademécum Operativo
    ├── 4.2.1 Oxígeno
    ├── 4.2.2 Adrenalina
    ├── 4.2.3 Amiodarona
    ├── 4.2.4 Atropina
    ├── 4.2.5 Midazolam
    ├── 4.2.6 Salbutamol
    ├── 4.2.7 Aspirina
    ├── 4.2.8 Glucagón
    └── 4.2.9 Abreviaturas y Terminología Farmacológica

═══════════════════════════════════════════════════════════════

PARTE V: MEDICINA DE EMERGENCIAS APLICADA
──────────────────────────────────────────

Módulo 5: Medicina de Emergencias Aplicada
├── Capítulo 5.1: Patologías por Sistemas
│   ├── 5.1.1 Patologías Respiratorias
│   ├── 5.1.2 Patologías Cardiovasculares
│   ├── 5.1.3 Patologías Neurológicas
│   ├── 5.1.4 Patologías Endocrinas
│   └── 5.1.5 Intoxicaciones
│
├── Capítulo 5.2: Situaciones Especiales
│   ├── 5.2.1 Emergencias Obstétricas
│   ├── 5.2.2 Emergencias Pediátricas Específicas
│   ├── 5.2.3 Emergencias Geriátricas
│   └── 5.2.4 Catástrofes y Múltiples Víctimas
│
└── Capítulo 5.3: Alteraciones Psiquiátricas y Contención
    ├── 5.3.1 Evaluación de Paciente Psiquiátrico
    ├── 5.3.2 Técnicas de Contención Verbal
    └── 5.3.3 Contención Física (si aplica según protocolo)

═══════════════════════════════════════════════════════════════

PARTE VI: GESTIÓN OPERATIVA Y PROFESIONAL
──────────────────────────────────────────

Módulo 6: Gestión Operativa y Profesional
├── Capítulo 6.1: Gestión Operativa
│   ├── 6.1.1 Introducción a Gestión Operativa
│   ├── 6.1.2 Documentación Clínica Prehospitalaria
│   ├── 6.1.3 Coordinación y Comunicación Operativa
│   ├── 6.1.4 Gestión de Recursos y Material
│   └── 6.1.5 Calidad y Mejora Continua
│
├── Capítulo 6.2: Comunicación y Relación con Paciente
│   ├── 6.2.1 Principios de Comunicación en Emergencias
│   ├── 6.2.2 Comunicación con Paciente
│   ├── 6.2.3 Comunicación con Familiares
│   └── 6.2.4 Comunicación con Coordinador
│
├── Capítulo 6.3: Marco Legal y Ético
│   ├── 6.3.1 Marco Legal del TES
│   ├── 6.3.2 Aspectos Éticos en Emergencias
│   └── 6.3.3 Responsabilidad Profesional
│
├── Capítulo 6.4: Seguridad Personal y Salud del TES
│   ├── 6.4.1 Prevención de Riesgos Laborales
│   ├── 6.4.2 Gestión del Estrés
│   └── 6.4.3 Salud y Bienestar del Profesional
│
└── Capítulo 6.5: Conducción y Seguridad Vial
    ├── 6.5.1 Fundamentos de Conducción en Urgencias
    ├── 6.5.2 Uso de Luces y Sirena
    ├── 6.5.3 Técnicas de Conducción en Emergencias
    ├── 6.5.4 Seguridad Vial y Prevención de Accidentes
    ├── 6.5.5 Gestión de Rutas y Navegación
    └── 6.5.6 Protocolos de Seguridad en Escena

═══════════════════════════════════════════════════════════════

ANEXOS
──────

Anexo A: Glosario de Términos
Anexo B: Abreviaturas Comunes
Anexo C: Tablas de Referencia
Anexo D: Índice Alfabético
```

---

### Criterios de Orden Propuestos

**Principio 1: De lo General a lo Específico**
- Fundamentos → Procedimientos → Material específico → Patologías específicas

**Principio 2: De lo Crítico a lo Avanzado**
- Soporte Vital Básico → Protocolos Transtelefónicos → Medicina Aplicada

**Principio 3: De lo Operativo a lo Formativo**
- Procedimientos operativos primero → Contexto formativo después

**Principio 4: Flujo Lógico de Aprendizaje**
- Evaluación → Actuación → Material → Farmacología → Contexto Clínico → Gestión

---

## 5️⃣ Separación Conceptual de Tipos de Contenido

### Clasificación Propuesta

#### **Contenido Operativo Puro**

**Características:**
- Pasos numerados claros
- Checklists operativos
- Valores exactos (dosis, frecuencias, profundidades)
- Advertencias críticas destacadas
- Sin explicaciones extensas

**Ejemplos:**
- RCP Adulto SVB
- ABCDE Operativo
- Constantes Vitales
- Uso DESA

**Etiquetado propuesto:** `[OPERATIVO]`

**Capa en app:** Capa operativa principal (acceso rápido)

---

#### **Contenido Formativo**

**Características:**
- Explicaciones conceptuales
- Fundamentos teóricos
- Contexto clínico
- Sin pasos operativos
- Narrativa extensa

**Ejemplos:**
- Fundamentos de Emergencias
- Marco Legal y Ético
- Principios de Comunicación

**Etiquetado propuesto:** `[FORMATIVO]`

**Capa en app:** Guía de Refuerzo (acceso formativo)

---

#### **Contenido Mixto**

**Características:**
- Procedimientos con explicaciones
- Técnicas con fundamentos teóricos
- Contexto + acción

**Ejemplos:**
- Oxigenoterapia (técnica + fundamentos)
- Protocolos Transtelefónicos (procedimiento + comunicación)
- Gestión Operativa (procedimientos + contexto organizativo)

**Etiquetado propuesto:** `[MIXTO]`

**Capa en app:** 
- Parte operativa → Capa operativa
- Parte formativa → Guía de Refuerzo
- Enlaces bidireccionales

---

#### **Contenido de Referencia**

**Características:**
- Tablas de datos
- Inventarios
- Glosarios
- Checklists de verificación
- Sin narrativa extensa

**Ejemplos:**
- Inventario de Material
- Vademécum (valores exactos)
- Abreviaturas
- Checklists Maestros

**Etiquetado propuesto:** `[REFERENCIA]`

**Capa en app:** Capa operativa (acceso rápido) o Anexos

---

### Recomendaciones de Etiquetado

**Sistema de etiquetas propuesto:**

```markdown
---
tipoContenido: "operativo" | "formativo" | "mixto" | "referencia"
capaApp: "operativa" | "refuerzo" | "ambas" | "anexos"
prioridad: "critica" | "alta" | "media" | "baja"
nivelDificultad: "basico" | "intermedio" | "avanzado"
---
```

**Ejemplo de uso:**

```markdown
---
tipoContenido: "operativo"
capaApp: "operativa"
prioridad: "critica"
nivelDificultad: "basico"
---

# 2.1.2 – RCP Adulto SVB
```

---

## 6️⃣ Reglas Editoriales y de Coherencia

### Reglas de Nomenclatura de Capítulos

#### **Formato de Título Principal**

**Regla 1: Estructura**
```
# X.Y – Título Descriptivo: Subtítulo Opcional (Especificación Opcional)
```

**Componentes:**
- `X.Y` = Número de módulo y capítulo (obligatorio)
- `Título Descriptivo` = Nombre principal (obligatorio)
- `: Subtítulo` = Especificación adicional (opcional)
- `(Especificación)` = Aclaración de tipo o alcance (opcional)

**Ejemplos correctos:**
```markdown
# 2.1.2 – RCP Adulto SVB
# 3.2.1.1 – Fundamentos de Oxigenoterapia
# 1.2.1 – Constantes Vitales: Toma y Registro Operativo
# 4.2.1 – Oxígeno (Vademécum Operativo)
```

**Ejemplos incorrectos:**
```markdown
# RCP Adulto  ← Falta numeración
# 2.1.2 RCP Adulto SVB  ← Falta guión después de numeración
# 2.1.2 – RCP Adulto SVB:  ← Dos puntos sin subtítulo
```

---

#### **Regla 2: Uso de Especificaciones**

**Especificaciones permitidas:**
- `(Operativo)` → Contenido operativo puro
- `(Formativo)` → Contenido formativo puro
- `(Vademécum Operativo)` → Referencia farmacológica
- `(Checklist)` → Lista de verificación
- `(Inventario)` → Lista de material

**No usar:**
- `(Tes)` → Redundante (todo el manual es para TES)
- `(Operativo Tes)` → Redundante
- Especificaciones inconsistentes

---

#### **Regla 3: Consistencia en Subtítulos**

**Patrón recomendado:**
- Si el capítulo es operativo: `: Técnica Operativa` o `: Procedimiento Operativo`
- Si el capítulo es formativo: `: Fundamentos` o `: Marco Conceptual`
- Si el capítulo es mixto: Sin subtítulo o `: Guía Completa`

**Ejemplos:**
```markdown
# 1.2.1 – Constantes Vitales: Toma y Registro Operativo
# 1.1.1 – Fundamentos de Emergencias: Marco Conceptual
# 3.2.1 – Oxigenoterapia Básica: Guía Completa
```

---

### Reglas de Longitud y Profundidad

#### **Por Tipo de Contenido**

**Contenido Operativo:**
- **Longitud:** 300-800 palabras
- **Profundidad:** Pasos claros, sin explicaciones extensas
- **Estructura:** Objetivo → Alcance → Pasos → Advertencias → Puntos Clave

**Contenido Formativo:**
- **Longitud:** 800-2000 palabras
- **Profundidad:** Explicaciones extensas, contexto completo
- **Estructura:** Introducción → Desarrollo → Conclusiones → Referencias

**Contenido Mixto:**
- **Longitud:** 1000-2500 palabras
- **Profundidad:** Equilibrio entre explicación y procedimiento
- **Estructura:** Introducción → Fundamentos → Procedimiento → Contexto → Referencias

**Contenido de Referencia:**
- **Longitud:** Variable (tablas, listas)
- **Profundidad:** Datos organizados, sin narrativa
- **Estructura:** Tabla/Lista → Descripción breve → Uso

---

#### **Por Nivel Jerárquico**

**Capítulo Principal (X.Y):**
- **Longitud:** 1000-2500 palabras
- **Subcapítulos:** 3-8 subcapítulos

**Subcapítulo (X.Y.Z):**
- **Longitud:** 500-1500 palabras
- **Subsecciones:** 2-5 subsecciones

**Subsección (X.Y.Z.W):**
- **Longitud:** 200-800 palabras
- **Sin subsecciones adicionales**

---

### Reglas de Uso de Elementos

#### **Listas**

**Listas numeradas (pasos operativos):**
```markdown
1. Primer paso
2. Segundo paso
3. Tercer paso
```

**Listas con viñetas (características, items):**
```markdown
- Característica 1
- Característica 2
- Característica 3
```

**Listas anidadas (sub-pasos):**
```markdown
1. Paso principal
   - Sub-paso a
   - Sub-paso b
2. Siguiente paso principal
```

**Regla:** Usar listas numeradas solo para pasos secuenciales. Usar viñetas para listas no secuenciales.

---

#### **Tablas**

**Formato estándar:**
```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|----------|
| Dato 1    | Dato 2    | Dato 3   |
| Dato 4    | Dato 5    | Dato 6   |
```

**Uso recomendado:**
- Valores de referencia (dosis, frecuencias)
- Comparaciones sistemáticas
- Clasificaciones
- Inventarios estructurados

**Regla:** Todas las tablas deben tener encabezados claros y alineación consistente.

---

#### **Imágenes**

**Formato de referencia:**
```markdown
![Descripción de la imagen](/ruta/a/imagen.png)
```

**Reglas:**
- Todas las imágenes deben tener texto alternativo descriptivo
- Usar sistema de alias cuando aplique (`![alias-imagen]`)
- Incluir caption cuando sea necesario
- Organizar en carpetas por bloque temático

**Ubicación:**
- Imágenes operativas: `public/assets/infografias/bloque-X-nombre/`
- Diagramas: `public/assets/diagramas/`

---

#### **Cajas de Advertencia**

**Formato estándar:**
```markdown
> ⚠️ **ADVERTENCIA:** Texto de advertencia crítica
```

**Tipos:**
- `⚠️ ADVERTENCIA` → Información crítica de seguridad
- `✅ IMPORTANTE` → Información importante a destacar
- `❌ ERROR COMÚN` → Errores frecuentes a evitar
- `💡 CONSEJO` → Consejos prácticos

**Regla:** Usar solo para información crítica. No abusar de cajas de advertencia.

---

### Reglas de Consistencia entre Capítulos Similares

#### **Estructura Estándar para Capítulos Operativos**

**Todos los capítulos operativos deben seguir:**

```markdown
# X.Y – Título: Subtítulo

## Objetivo Operativo
[1-2 párrafos describiendo el objetivo]

## Alcance y Límites
### Alcance del capítulo
[Qué cubre]

### Límites del capítulo
[Qué NO cubre]

## Material Necesario
[Lista de material requerido]

## Procedimiento Paso a Paso
1. Paso 1
2. Paso 2
...

## Advertencias Críticas
- Advertencia 1
- Advertencia 2

## Errores Frecuentes
- Error común 1
- Error común 2

## Puntos Clave TES
- Punto clave 1
- Punto clave 2

## Integración con Otros Protocolos
[Enlaces a protocolos relacionados]
```

---

#### **Estructura Estándar para Capítulos Formativos**

**Todos los capítulos formativos deben seguir:**

```markdown
# X.Y – Título: Subtítulo

## Introducción
[Contexto y objetivos del capítulo]

## Desarrollo del Tema
### Subtema 1
[Desarrollo]

### Subtema 2
[Desarrollo]

## Conclusiones
[Resumen de puntos clave]

## Referencias
[Enlaces a guías oficiales, bibliografía]
```

---

#### **Estructura Estándar para Capítulos Mixtos**

**Todos los capítulos mixtos deben seguir:**

```markdown
# X.Y – Título: Subtítulo

## Introducción
[Contexto]

## Fundamentos
[Explicación teórica]

## Procedimiento Operativo
[Pasos operativos]

## Contexto Clínico
[Cuándo y por qué usar]

## Referencias
[Enlaces relacionados]
```

---

### Reglas de Navegación y Enlaces

#### **Enlaces Internos**

**Formato:**
```markdown
[Texto del enlace](/manual/parte-X/modulo-Y/capitulo-Z)
```

**Reglas:**
- Todos los capítulos deben tener enlaces a capítulos anteriores y siguientes
- Enlaces relacionados deben ser relevantes (máximo 5)
- Usar breadcrumbs en la aplicación

---

#### **Referencias Cruzadas**

**Formato:**
```markdown
Ver también: [Capítulo relacionado](/ruta)
```

**Reglas:**
- Referencias cruzadas solo cuando sea necesario para comprensión
- No crear dependencias circulares
- Agrupar referencias al final del capítulo

---

## Resumen de Recomendaciones

### Acciones Inmediatas

1. ✅ **Fusionar BLOQUE_8 duplicado**
   - Eliminar `BLOQUE_8_GESTION_OPERATIVA/` vacía
   - Mantener `BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/`

2. ✅ **Eliminar contenido duplicado**
   - Fusionar `BLOQUE_03_0A` y `BLOQUE_03_0B` (oxigenoterapia)
   - Eliminar `BLOQUE_03_2B_CANULA_OROFARINGEA.md` o convertir en referencia cruzada

3. ✅ **Subdividir BLOQUE_3**
   - Crear 5 sub-bloques temáticos dentro de Material Sanitario
   - Reorganizar 30 archivos en estructura lógica

4. ✅ **Desarrollar bloques superficiales**
   - BLOQUE_9, BLOQUE_10, BLOQUE_11, BLOQUE_12, BLOQUE_13, BLOQUE_14, BLOQUE_15
   - O fusionarlos con bloques relacionados

5. ✅ **Estandarizar nomenclatura**
   - Aplicar reglas editoriales a todos los títulos
   - Unificar formato de numeración

### Acciones a Medio Plazo

1. ⏳ **Reorganizar estructura física**
   - Crear nueva estructura de carpetas según módulos propuestos
   - Migrar archivos manteniendo referencias

2. ⏳ **Implementar sistema de etiquetado**
   - Añadir metadatos YAML a todos los archivos
   - Actualizar sistema de navegación

3. ⏳ **Crear índices automáticos**
   - Generar índices desde estructura de archivos
   - Mantener sincronización con contenido

---

## Conclusión

La guía actual tiene **contenido valioso pero estructura inconsistente**. La reestructuración propuesta:

1. ✅ **Elimina duplicaciones** y confusiones
2. ✅ **Establece jerarquía clara** (Parte → Módulo → Capítulo)
3. ✅ **Separa tipos de contenido** (Operativo vs Formativo)
4. ✅ **Define reglas editoriales** para coherencia
5. ✅ **Proporciona progresión lógica** de aprendizaje

**El resultado será un manual profesional coherente, navegable y escalable.**

---

**Fin del Análisis**

*Este documento sirve como base para la reorganización editorial de la guía, sin proponer código ni migraciones específicas aún.*

