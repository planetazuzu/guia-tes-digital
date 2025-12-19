# PLAN DE REORGANIZACIÓN DEL MANUAL TES DIGITAL
## Arquitectura Editorial - Reorganización Estructural

**Fecha:** 2024-12-19  
**Versión:** 1.0  
**Tipo:** Plan de Reorganización Estructural (NO contenido clínico)  
**Arquitecto Editorial:** Revisión y Reorganización

---

## OBJETIVO

Reorganizar el manual existente para que coincida EXACTAMENTE con el índice definitivo, asegurando:
- Estructura coherente y consistente
- Plantilla obligatoria en todos los capítulos
- Eliminación de duplicados
- Reubicación de capítulos según nuevo índice
- Creación de estructura de capítulos nuevos

---

## ÍNDICE DEFINITIVO DE REFERENCIA

**Fuente:** `INDICE_COMPLETO_MANUAL_TES.md`

**Estructura:**
- 8 Partes
- 15 Bloques
- 93 Capítulos

---

## CAMBIOS ESTRUCTURALES IDENTIFICADOS

### A) REUBICACIONES DE CAPÍTULOS

#### 1. GLUCÓMETRO → BLOQUE 1

**Capítulo actual:**
- **Ubicación actual:** `04_OXIGENOTERAPIA/BLOQUE_03_11_GLUCOMETRO.md`
- **Bloque actual:** Bloque 3 (Material Sanitario y Oxigenoterapia)
- **Número actual:** 3.11

**Nueva ubicación:**
- **Nueva carpeta:** `02_PROCEDIMIENTOS_BASICOS/`
- **Nuevo bloque:** Bloque 1 (Procedimientos Básicos)
- **Nuevo número:** 1.5 (después de 1.4 Triage START)

**Acción:**
1. Mover archivo de `04_OXIGENOTERAPIA/` a `02_PROCEDIMIENTOS_BASICOS/`
2. Renombrar: `BLOQUE_01_5_GLUCOMETRO.md`
3. Actualizar referencias internas (3.11 → 1.5)
4. Actualizar referencias cruzadas en otros capítulos

---

### B) ELIMINACIÓN DE DUPLICADOS

#### 1. COLLARÍN CERVICAL (2.1 vs 2.3)

**Estado actual:**
- **2.1:** `BLOQUE_02_1_COLLARIN_CERVICAL.md` - Redirección a 2.3
- **2.3:** `BLOQUE_02_3_COLLARIN_CERVICAL.md` - Contenido completo

**Decisión:** Eliminar 2.1, mantener 2.3 como único capítulo

**Acción:**
1. Eliminar archivo `BLOQUE_02_1_COLLARIN_CERVICAL.md`
2. Renumerar 2.3 → 2.1 (si el índice lo requiere)
3. Actualizar referencias cruzadas (2.1 → 2.3 o mantener 2.3)

**Nota:** Según índice definitivo, el capítulo debe ser "3.1.3 Collarín Cervical", lo que sugiere mantener numeración 2.3 o ajustar según estructura final.

---

### C) CAPÍTULOS NUEVOS A CREAR (ESTRUCTURA)

#### BLOQUE 3 - VÍA AÉREA AVANZADA

**Capítulos nuevos:**
- **3.19** Gestión Operativa de la Vía Aérea Avanzada ⭐
- **3.20** Resolución de Problemas en la Vía Aérea ⭐
- **3.21** Monitorización de la Vía Aérea durante el Traslado ⭐

**Estado:** ✅ Ya existen con contenido
**Acción:** Verificar plantilla obligatoria

---

#### BLOQUE 4 - PCR AVANZADA

**Capítulos nuevos:**
- **4.10** Algoritmo de PCR Avanzada para Equipo TES ⭐
- **4.11** Arritmias Amenazantes ⭐

**Estado:** ✅ Ya existen con contenido
**Acción:** Verificar plantilla obligatoria

---

#### BLOQUE 5 - PROTOCOLOS TRANSTELEFÓNICOS

**Capítulos nuevos:**
- **5.0** Comunicación Transtelefónica Fundamental ⭐
- **5.1** RCP Transtelefónica Adultos ⭐
- **5.2** RCP Transtelefónica Niños ⭐
- **5.3** RCP Transtelefónica Lactantes ⭐
- **5.4** DESA Guiado por Teléfono ⭐
- **5.5** OVACE Transtelefónica ⭐
- **5.6** SCA Transtelefónico ⭐
- **5.7** ICTUS Transtelefónico ⭐
- **5.8** Comunicación con Coordinadores ⭐

**Estado:** ✅ Ya existen con contenido
**Acción:** Verificar plantilla obligatoria

---

#### BLOQUE 6 - FARMACOLOGÍA

**Capítulos nuevos:**
- **6.0** Principios de Administración ⭐
- **6.1** Del Vial a la Vena ⭐
- **6.2** Analgésicos y Sedantes ⭐
- **6.3** Vasoactivos y Aminas ⭐
- **6.4** Antiarrítmicos ⭐

**Estado:** ✅ Ya existen con contenido
**Acción:** Verificar plantilla obligatoria

**Capítulos faltantes (mencionados en índice):**
- **6.5** Fármacos Cardiológicos ⭐ NUEVO (estructura)
- **6.6** Fármacos Respiratorios ⭐ NUEVO (estructura)
- **6.7** Fármacos Neurológicos/Metabólicos ⭐ NUEVO (estructura)
- **6.8** Soluciones de Reposición ⭐ NUEVO (estructura)

---

#### BLOQUE 8 - TRANSFERENCIA

**Capítulos nuevos:**
- **8.5** Transferencia al Hospital ⭐

**Estado:** ✅ Ya existe con contenido
**Acción:** Verificar plantilla obligatoria

**Capítulos faltantes (según índice):**
- **8.0** Fundamentos de Transferencia ⭐ NUEVO (estructura)
- **8.1** Preparación para Traslado ⭐ NUEVO (estructura)
- **8.2** Gestión durante Traslado ⭐ NUEVO (estructura)
- **8.3** Comunicación Pre-hospitalaria ⭐ NUEVO (estructura)
- **8.4** Documentación de Traslado ⭐ NUEVO (estructura)

---

## PLANTILLA OBLIGATORIA DE CAPÍTULO

**Estructura fija requerida para TODOS los capítulos:**

```markdown
# [NÚMERO] – [TÍTULO]: [SUBTÍTULO] (TES)

## Manual TES Digital – [Tipo de contenido]

**Versión:** 1.0  
**Fecha:** [Fecha]  
**Tipo:** [Tipo de capítulo]

---

## OBJETIVO DEL CAPÍTULO

[Descripción clara del objetivo y qué aporta]

---

## CUÁNDO SE APLICA

[Escenarios de uso, criterios de activación, indicaciones]

---

## DEPENDENCIAS

**Capítulos previos necesarios:**
- [X.Y] - [Razón de la dependencia]

**Capítulos relacionados:**
- [A.B] - [Razón de la relación]

**Capítulos siguientes:**
- [M.N] - [Razón de la secuencia]

---

## CONTENIDO PRINCIPAL

[Bloques/secciones internas organizadas]

---

## DECISIONES CLAVE DEL TES

[Puntos de decisión operativa]

---

## ERRORES FRECUENTES (Y CÓMO EVITARLOS)

| Error | Consecuencia | Prevención |
|-------|--------------|------------|
| [Error común] | [Qué pasa] | [Cómo evitarlo] |

---

## INDICADORES DE CALIDAD/SEGURIDAD

**Métricas de Éxito Operativo:**
- [Indicador 1]: [Valor objetivo]
- [Indicador 2]: [Valor objetivo]

**Señales de Alerta:**
- [Señal 1]: [Acción correctiva]
- [Señal 2]: [Acción correctiva]

---

## RELACIÓN CON OTROS CAPÍTULOS

**Capítulos Previos (Leer antes):**
- [X.Y] - [Razón]

**Capítulos Relacionados (Consultar junto):**
- [A.B] - [Razón]

**Capítulos Siguientes (Leer después):**
- [M.N] - [Razón]
```

---

## PLAN DE ACCIÓN DETALLADO

### FASE 1: REORGANIZACIÓN DE CAPÍTULOS EXISTENTES

#### 1.1 Mover Glucómetro al Bloque 1
- [ ] Mover archivo `BLOQUE_03_11_GLUCOMETRO.md` → `BLOQUE_01_5_GLUCOMETRO.md`
- [ ] Actualizar referencias internas (3.11 → 1.5)
- [ ] Actualizar referencias cruzadas en otros capítulos
- [ ] Verificar plantilla obligatoria

#### 1.2 Eliminar Duplicado Collarín Cervical
- [ ] Eliminar `BLOQUE_02_1_COLLARIN_CERVICAL.md`
- [ ] Verificar que 2.3 tiene contenido completo
- [ ] Actualizar referencias cruzadas (2.1 → 2.3)

---

### FASE 2: VERIFICAR PLANTILLA EN CAPÍTULOS EXISTENTES

#### 2.1 Capítulos Nuevos con Contenido
- [ ] Verificar 3.19, 3.20, 3.21 (Vía Aérea Avanzada)
- [ ] Verificar 4.10, 4.11 (PCR Avanzada)
- [ ] Verificar 5.0-5.8 (Protocolos Transtelefónicos)
- [ ] Verificar 6.0-6.4 (Farmacología)
- [ ] Verificar 8.5 (Transferencia)

**Para cada capítulo:**
- [ ] OBJETIVO DEL CAPÍTULO ✅/❌
- [ ] CUÁNDO SE APLICA ✅/❌
- [ ] DEPENDENCIAS ✅/❌
- [ ] CONTENIDO PRINCIPAL ✅/❌
- [ ] DECISIONES CLAVE DEL TES ✅/❌
- [ ] ERRORES FRECUENTES ✅/❌
- [ ] INDICADORES DE CALIDAD/SEGURIDAD ✅/❌
- [ ] RELACIÓN CON OTROS CAPÍTULOS ✅/❌

---

### FASE 3: CREAR ESTRUCTURA DE CAPÍTULOS NUEVOS

#### 3.1 Bloque 6 - Farmacología (Faltantes)
- [ ] Crear estructura `BLOQUE_06_5_FARMACOS_CARDIOLOGICOS.md`
- [ ] Crear estructura `BLOQUE_06_6_FARMACOS_RESPIRATORIOS.md`
- [ ] Crear estructura `BLOQUE_06_7_FARMACOS_NEUROLOGICOS_METABOLICOS.md`
- [ ] Crear estructura `BLOQUE_06_8_SOLUCIONES_REPOSICION.md`

#### 3.2 Bloque 8 - Transferencia (Faltantes)
- [ ] Crear estructura `BLOQUE_08_0_FUNDAMENTOS_TRANSFERENCIA.md`
- [ ] Crear estructura `BLOQUE_08_1_PREPARACION_TRASLADO.md`
- [ ] Crear estructura `BLOQUE_08_2_GESTION_DURANTE_TRASLADO.md`
- [ ] Crear estructura `BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md`
- [ ] Crear estructura `BLOQUE_08_4_DOCUMENTACION_TRASLADO.md`

---

## ESTRUCTURA DE CAPÍTULOS NUEVOS (PLANTILLA)

### BLOQUE 6.5 - FÁRMACOS CARDIOLÓGICOS ⭐

```markdown
# 6.5 – Fármacos Cardiológicos: Uso Operativo TES

## Manual TES Digital – Vademécum Operativo

**Versión:** 1.0  
**Fecha:** 2024-12-19  
**Tipo:** Bloque Operativo - Vademécum

---

## OBJETIVO DEL CAPÍTULO

[ESTRUCTURA - NO CONTENIDO CLÍNICO]
Establecer el marco operativo para la preparación y administración de fármacos cardiológicos en entorno TES/SVA.

---

## CUÁNDO SE APLICA

[ESTRUCTURA - NO CONTENIDO CLÍNICO]
Escenarios donde se requiere preparación de fármacos cardiológicos según indicación médica.

---

## DEPENDENCIAS

**Capítulos previos necesarios:**
- 6.0 (Principios de Administración)
- 6.1 (Del Vial a la Vena)
- 1.1 (Constantes Vitales)

**Capítulos relacionados:**
- 4.10 (PCR Avanzada)
- 4.11 (Arritmias Amenazantes)

---

## CONTENIDO PRINCIPAL

[ESTRUCTURA - NO CONTENIDO CLÍNICO]
1. Preparación de fármacos cardiológicos
2. Dilución y cálculo de dosis
3. Administración según vía
4. Monitorización durante administración

---

## DECISIONES CLAVE DEL TES

[ESTRUCTURA - NO CONTENIDO CLÍNICO]
- Verificación de fármaco correcto
- Cálculo de dosis según peso/edad
- Selección de vía de administración
- Preparación de perfusión si aplica

---

## ERRORES FRECUENTES (Y CÓMO EVITARLOS)

[ESTRUCTURA - NO CONTENIDO CLÍNICO]
| Error | Consecuencia | Prevención |
|-------|--------------|------------|
| [Pendiente contenido clínico] | [Pendiente] | [Pendiente] |

---

## INDICADORES DE CALIDAD/SEGURIDAD

[ESTRUCTURA - NO CONTENIDO CLÍNICO]
**Métricas de Éxito Operativo:**
- Verificación completa de 5 correctos
- Precisión en cálculo de dosis
- Seguridad en preparación

---

## RELACIÓN CON OTROS CAPÍTULOS

**Capítulos Previos:**
- 6.0, 6.1 (Fundamentos farmacología)

**Capítulos Relacionados:**
- 4.10, 4.11 (Aplicación en PCR/Arritmias)

**Capítulos Siguientes:**
- 6.6, 6.7, 6.8 (Otros grupos farmacológicos)
```

---

## RESUMEN DE CAMBIOS

### Cambios Estructurales

1. **Reubicaciones:**
   - Glucómetro: 3.11 → 1.5

2. **Eliminaciones:**
   - Collarín Cervical 2.1 (duplicado)

3. **Capítulos Nuevos (Estructura):**
   - Bloque 6: 6.5, 6.6, 6.7, 6.8
   - Bloque 8: 8.0, 8.1, 8.2, 8.3, 8.4

4. **Verificaciones:**
   - Plantilla obligatoria en 23 capítulos nuevos existentes

---

## PRÓXIMOS PASOS

1. Ejecutar Fase 1 (Reorganización)
2. Ejecutar Fase 2 (Verificación)
3. Ejecutar Fase 3 (Creación de estructura)
4. Generar informe final de cambios

---

**Fin del plan de reorganización**
