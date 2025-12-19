# 📋 PLAN DE RENUMERACIÓN COMPLETO - MANUAL TES DIGITAL

**Fecha:** 2024-12-19  
**Basado en:** MAPA_MAESTRO_MANUAL_TES_DIGITAL.md  
**Estado:** ⚠️ PLAN PROPUESTO (NO EJECUTADO)

---

## 🎯 OBJETIVO

Unificar toda la numeración del manual bajo una sola jerarquía numérica coherente, eliminando conflictos, duplicidades y versiones legacy, basándose exclusivamente en el **Índice Maestro (MAPA_MAESTRO)**.

---

## 📊 ESTRUCTURA OBJETIVO (Según Índice Maestro)

| Bloque | Tema | Ubicación Actual | Numeración Actual | Numeración Objetivo | Estado |
|--------|------|------------------|-------------------|---------------------|--------|
| **0** | Fundamentos | `01_FUNDAMENTOS_Y_CONCEPTOS/` | ✅ 0.x | ✅ 0.x | ✅ CORRECTO |
| **1** | Procedimientos Básicos | `02_PROCEDIMIENTOS_BASICOS/` | ✅ 1.x | ✅ 1.x | ✅ CORRECTO |
| **2** | Material e Inmovilización | `04_MATERIAL_E_INMOVILIZACION/` | ⚠️ 2.x | ✅ 2.x | ⚠️ MANTENER (pero resolver duplicado) |
| **3** | Material Sanitario y Oxigenoterapia | `05_OXIGENOTERAPIA_Y_MATERIAL_SANITARIO/` | ✅ 3.x | ✅ 3.x | ✅ CORRECTO |
| **4** | Soporte Vital Básico y RCP | `03_SOPORTE_VITAL_BASICO/` | 🔴 **2.x** | ✅ **4.x** | 🔴 **RENUMERAR** |
| **5** | Protocolos Transtelefónicos | `06_PROTOCOLOS_TRANSTELEFONICOS/` | ✅ 5.x | ✅ 5.x | ✅ CORRECTO |
| **6** | Farmacología | `07_FARMACOLOGIA_OPERATIVA/` | ✅ 6.x | ✅ 6.x | ✅ CORRECTO |
| **7** | Conducción en Urgencias | ❌ No encontrado | ❌ N/A | ✅ 7.x | 🔴 **CREAR/FIND** |
| **8** | Gestión Operativa | ❌ No encontrado | ❌ N/A | ✅ 8.x | 🔴 **CREAR/FIND** |
| **9** | Medicina de Emergencias Aplicada | ❌ No encontrado | ❌ N/A | ✅ 9.x | 🔴 **CREAR/FIND** |
| **10** | Situaciones Especiales | ❌ No encontrado | ❌ N/A | ✅ 10.x | 🔴 **CREAR/FIND** |
| **11** | Protocolos de Trauma | ❌ No encontrado | ❌ N/A | ✅ 11.x | 🔴 **CREAR/FIND** |
| **12** | Marco Legal, Ético y Profesional | ❌ No encontrado | ❌ N/A | ✅ 12.x | 🔴 **CREAR/FIND** |
| **13** | Comunicación y Relación con el Paciente | ❌ No encontrado | ❌ N/A | ✅ 13.x | 🔴 **CREAR/FIND** |
| **14** | Seguridad Personal y Salud del TES | ❌ No encontrado | ❌ N/A | ✅ 14.x | 🔴 **CREAR/FIND** |

**Nota sobre Triage:**
- **Ubicación actual:** `09_TRIAGE_MULTIPLES_VICTIMAS/` (numerado como Bloque 7)
- **Según usuario:** Índice dice Bloque 10
- **Según MAPA_MAESTRO:** No aparece explícitamente como bloque separado
- **Solución:** Verificar si Triage debe ser Bloque 9, 10 o parte de otro bloque

**Nota sobre Transferencia:**
- **Ubicación actual:** `08_TRANSFERENCIA_Y_TRASLADO/` (numerado como Bloque 8)
- **Según usuario:** Índice dice Bloque 10
- **Según MAPA_MAESTRO:** No aparece explícitamente
- **Solución:** Verificar numeración correcta

---

## 🔴 ACCIÓN 1: RESOLVER CONFLICTO BLOQUE 2 (PRIORIDAD CRÍTICA)

### Problema
Dos bloques diferentes comparten numeración "Bloque 2":
1. **Soporte Vital Básico** (`03_SOPORTE_VITAL_BASICO/`) - Actualmente 2.0-2.8
2. **Material e Inmovilización** (`04_MATERIAL_E_INMOVILIZACION/`) - Actualmente 2.0-2.13

### Solución
**Renumerar Soporte Vital de Bloque 2 → Bloque 4**

#### Archivos a renumerar (9 archivos):

| Archivo Actual | Numeración Actual | Archivo Objetivo | Numeración Objetivo |
|----------------|-------------------|------------------|---------------------|
| `BLOQUE_02_0_RECONOCIMIENTO_PCR.md` | 2.0 | `BLOQUE_04_0_RECONOCIMIENTO_PCR.md` | 4.0 |
| `BLOQUE_02_1_RCP_ADULTOS.md` | 2.1 | `BLOQUE_04_1_RCP_ADULTOS.md` | 4.1 |
| `BLOQUE_02_2_RCP_PEDIATRIA.md` | 2.2 | `BLOQUE_04_2_RCP_PEDIATRIA.md` | 4.2 |
| `BLOQUE_02_3_RCP_LACTANTES.md` | 2.3 | `BLOQUE_04_3_RCP_LACTANTES.md` | 4.3 |
| `BLOQUE_02_4_USO_DESA.md` | 2.4 | `BLOQUE_04_4_USO_DESA.md` | 4.4 |
| `BLOQUE_02_5_VENTILACION_BVM.md` | 2.5 | `BLOQUE_04_5_VENTILACION_BVM.md` | 4.5 |
| `BLOQUE_02_6_USO_CANULAS_OPA_NPA.md` | 2.6 | `BLOQUE_04_6_USO_CANULAS_OPA_NPA.md` | 4.6 |
| `BLOQUE_02_7_ASPIRACION_SECRECIONES.md` | 2.7 | `BLOQUE_04_7_ASPIRACION_SECRECIONES.md` | 4.7 |
| `BLOQUE_02_8_POSICIONES_SEGURIDAD_MOVILIZACION.md` | 2.8 | `BLOQUE_04_8_POSICIONES_SEGURIDAD_MOVILIZACION.md` | 4.8 |

#### Tareas:
1. Renombrar archivos de `BLOQUE_02_*` → `BLOQUE_04_*`
2. Actualizar títulos internos de "2.x" → "4.x"
3. Actualizar todas las referencias cruzadas en otros capítulos
4. Actualizar enlaces en sección "🔗 Enlaces recomendados"

---

## 🔴 ACCIÓN 2: RESOLVER DUPLICIDADES (PRIORIDAD ALTA)

### 2.1 Glucómetro

**Problema:** Aparece en 2 ubicaciones con numeraciones diferentes:
- `BLOQUE_03_11_GLUCOMETRO.md` (título dice 1.5, archivo dice 3.11)
- `BLOQUE_01_7_GLUCOMETRO.md` (título dice 1.7)

**Solución:**
- **Ubicación definitiva:** 1.7 (según reubicación mencionada por usuario)
- **Eliminar:** `BLOQUE_03_11_GLUCOMETRO.md` o marcarlo como redirect
- **Actualizar:** Todas las referencias de 3.11 y 1.5 → 1.7
- **Limpiar:** Marcadores "LEGACY" y referencias a versiones antiguas

**Archivos afectados:**
- Referencias en Bloque 3 (oxigenoterapia)
- Referencias en Bloque 1 (procedimientos básicos)
- Sección "🔗 Enlaces recomendados" en múltiples capítulos

---

### 2.2 Collarín Cervical

**Problema:** Mencionado como "Versión Consolidada y Mejorada 1.1" en PDF, pero archivo muestra "Versión 1.0"

**Solución:**
- Verificar si existe versión 1.1 en backups
- Consolidar en una sola versión definitiva
- Eliminar referencias a versiones legacy
- Actualizar todas las referencias cruzadas

**Archivo:** `04_MATERIAL_E_INMOVILIZACION/BLOQUE_02_3_COLLARIN_CERVICAL.md`

---

### 2.3 Errores Críticos

**Problema:** Mencionado como "Versión 1.0 seguida inmediatamente por Versión 1.1" en mismo archivo

**Solución:**
- Limpiar referencias a múltiples versiones en mismo archivo
- Mantener solo versión actual

**Archivo:** `04_MATERIAL_E_INMOVILIZACION/BLOQUE_02_9_ERRORES_CRITICOS.md`

---

## 🔴 ACCIÓN 3: COMPLETAR CONTENIDO VACÍO (PRIORIDAD MEDIA)

### 3.1 Bloque 8 (Transferencia) - Capítulos 8.0-8.4

**Estado actual:** 5 de 6 capítulos tienen solo estructura, sin contenido clínico.

**Archivos afectados:**
- `BLOQUE_08_0_FUNDAMENTOS_TRANSFERENCIA.md` - 578 palabras (solo estructura)
- `BLOQUE_08_1_PREPARACION_TRASLADO.md` - 572 palabras (solo estructura)
- `BLOQUE_08_2_GESTION_DURANTE_TRASLADO.md` - 554 palabras (solo estructura)
- `BLOQUE_08_3_COMUNICACION_PRE_HOSPITALARIA.md` - 572 palabras (solo estructura)
- `BLOQUE_08_4_DOCUMENTACION_TRASLADO.md` - 517 palabras (solo estructura)

**Solución:**
- **Opción A:** Completar contenido clínico operativo para cada capítulo
- **Opción B:** Marcar claramente como "Pendiente de desarrollo - Estructura base" y mantener solo 8.5 con contenido

**Recomendación:** Opción B (marcar como pendiente) hasta que se complete el contenido.

---

## 🔴 ACCIÓN 4: CORREGIR SECUENCIAS (PRIORIDAD MEDIA)

### 4.1 Bloque 3 - Secuencia 3.13-3.18

**Problema:** Salto aparente de 3.12 → 3.19 en índice, pero archivos 3.13-3.18 SÍ EXISTEN

**Archivos existentes:**
- ✅ 3.13 – Confort, Dolor y Control Ambiental
- ✅ 3.14 – Bioseguridad y Descontaminación
- ✅ 3.15 – Gestión del Material en Escena
- ✅ 3.16 – Comunicación Operativa
- ✅ 3.17 – Señalización e Iluminación
- ✅ 3.18 – Documentación Operativa

**Solución:**
- Verificar si deben aparecer en índice principal del Bloque 3
- O mantener secuencia actual (3.0-3.18 base, 3.19-3.25 expansión SVA)

**Estado:** ✅ Los archivos existen, solo falta verificar índice

---

### 4.2 Bloque 2 (Material) - Falta 2.1

**Problema:** Secuencia salta de 2.0 a 2.2 (falta 2.1)

**Archivos existentes:**
- 2.0 – Anatomía Operativa
- 2.2 – Inmovilización Manual
- 2.3 – Collarín Cervical

**Según índice maestro:**
- 2.1 debería ser "Collarín Cervical (Procedimiento TES)"
- Pero existe 2.3 "Collarín Cervical: Selección, Colocación y Errores"

**Solución:**
- Verificar si 2.1 es necesario o si 2.3 cumple esa función
- Si 2.1 es necesario: crear o renumerar 2.3 → 2.1
- Si 2.3 cumple la función: mantener secuencia actual (2.0, 2.2, 2.3...)

---

## 🔴 ACCIÓN 5: VERIFICAR Y UBICAR BLOQUES FALTANTES (PRIORIDAD ALTA)

### Bloques según MAPA_MAESTRO que no se encuentran:

| Bloque | Tema | Estado | Acción |
|--------|------|--------|--------|
| **7** | Conducción en Urgencias | ❌ No encontrado | Buscar en backups o crear estructura |
| **8** | Gestión Operativa | ❌ No encontrado | Buscar en backups o crear estructura |
| **9** | Medicina de Emergencias Aplicada | ❌ No encontrado | Buscar en backups o crear estructura |
| **10** | Situaciones Especiales | ❌ No encontrado | Buscar en backups o crear estructura |
| **11** | Protocolos de Trauma | ❌ No encontrado | Buscar en backups o crear estructura |
| **12** | Marco Legal, Ético y Profesional | ❌ No encontrado | Buscar en backups o crear estructura |
| **13** | Comunicación y Relación con el Paciente | ❌ No encontrado | Buscar en backups o crear estructura |
| **14** | Seguridad Personal y Salud del TES | ❌ No encontrado | Buscar en backups o crear estructura |

**Nota:** Estos bloques pueden estar:
- En backups (`_BACKUP_MD/`)
- En otras carpetas no analizadas
- Pendientes de creación

**Acción requerida:**
- Buscar en todos los backups
- Verificar si existen con otros nombres
- Si no existen, crear estructura base

---

## 🔴 ACCIÓN 6: RESOLVER CONFLICTOS TRIAGE Y TRANSFERENCIA (PRIORIDAD CRÍTICA)

### Triage Múltiples Víctimas

**Ubicación actual:** `09_TRIAGE_MULTIPLES_VICTIMAS/`  
**Numeración actual:** Bloque 7 (7.1-7.7)  
**Según usuario:** Índice dice Bloque 10  
**Según MAPA_MAESTRO:** No aparece explícitamente

**Solución propuesta:**
- Verificar índice definitivo
- Si debe ser Bloque 10: Renumerar de 7.x → 10.x
- Si debe ser Bloque 9: Renumerar de 7.x → 9.x

---

### Transferencia y Traslado

**Ubicación actual:** `08_TRANSFERENCIA_Y_TRASLADO/`  
**Numeración actual:** Bloque 8 (8.0-8.5)  
**Según usuario:** Índice dice Bloque 10  
**Según MAPA_MAESTRO:** No aparece explícitamente

**Conflicto:** Tanto Triage como Transferencia están marcados como Bloque 10 según diferentes fuentes.

**Solución propuesta:**
- Verificar índice definitivo
- Si Transferencia es Bloque 10: Renumerar de 8.x → 10.x
- Si Triage es Bloque 10: Renumerar de 7.x → 10.x
- **NO pueden ser ambos Bloque 10**

---

## 📋 RESUMEN DE ACCIONES REQUERIDAS

### Prioridad CRÍTICA (Ejecutar primero):
1. ✅ **Renumerar Soporte Vital:** 2.x → 4.x (9 archivos)
2. ✅ **Resolver Glucómetro:** Eliminar duplicado, actualizar referencias
3. ✅ **Verificar Triage/Transferencia:** Determinar numeración correcta

### Prioridad ALTA:
4. ✅ **Limpiar versiones legacy:** Collarín, Errores Críticos
5. ✅ **Buscar bloques faltantes:** 7, 8, 9, 10, 11, 12, 13, 14

### Prioridad MEDIA:
6. ✅ **Completar o marcar contenido vacío:** Bloque 8 (8.0-8.4)
7. ✅ **Verificar secuencias:** Bloque 3 (3.13-3.18), Bloque 2 (2.1)

---

## ⚠️ ADVERTENCIAS CRÍTICAS

1. **NO ejecutar renumeración sin:**
   - Confirmar índice maestro definitivo
   - Hacer backup completo
   - Actualizar TODAS las referencias cruzadas

2. **Referencias cruzadas a actualizar:**
   - Enlaces en sección "🔗 Enlaces recomendados"
   - Referencias en texto (ej: "ver 2.1" → "ver 4.1")
   - Dependencias declaradas
   - Relación con otros capítulos

3. **Impacto estimado:**
   - ~50-70 archivos requieren actualización de referencias
   - ~9 archivos requieren renumeración
   - ~5 archivos requieren limpieza de duplicidades

---

## ✅ CONCLUSIÓN

**Estado:** ⚠️ **REQUIERE RENUMERACIÓN SISTEMÁTICA**

El manual tiene una **excelente estructura individual de capítulos**, pero la **arquitectura global es inconsistente** debido a conflictos de numeración y desfases con el índice maestro.

**Recomendación:** Proceder con renumeración total basada en el índice maestro, ejecutando las acciones en el orden de prioridad indicado.

---

**Última actualización:** 2024-12-19  
**Próximo paso:** Confirmar índice maestro definitivo y proceder con Fase 1 (Renumeración Bloque 2 → 4)
