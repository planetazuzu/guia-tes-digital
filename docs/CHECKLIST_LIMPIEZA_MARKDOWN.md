# 📋 Checklist de Limpieza Markdown - Paso 2

**Objetivo:** Dejar el sistema Markdown estable, coherente y defendible  
**Fecha:** 2025-12-23  
**Estado:** Listo para ejecución

---

## 🎯 Decisiones Firmes (Ya No Se Discuten)

### ✅ Markdown se mantiene como:
- Manual base
- Referencia textual
- Fuente editorial estable
- Soporte offline

### ❌ Markdown NO será:
- Sistema multimedia
- Guía educativa rica
- Lugar para casos clínicos complejos

👉 **Eso vendrá después con la Guía de Refuerzo.**

---

## 🔴 BLOQUE A — OBLIGATORIO

**Si no haces esto, todo lo demás se vuelve frágil.**

### A1. Renombrado de Archivos con Numeración Anómala

**Archivos afectados:** 9 archivos

| Archivo Actual | Nuevo Nombre | Acción |
|----------------|--------------|--------|
| `BLOQUE_02_X_INVENTARIO_MATERIAL.md` | `BLOQUE_02_14_INVENTARIO_MATERIAL.md` | Renombrar |
| `BLOQUE_03_X_INVENTARIO_MATERIAL_SANITARIO.md` | `BLOQUE_03_19_INVENTARIO_MATERIAL_SANITARIO.md` | Renombrar |
| `BLOQUE_03_X2_MALETIN_CURAS.md` | `BLOQUE_03_20_MALETIN_CURAS.md` | Renombrar |
| `BLOQUE_03_X3_BOLSA_MONITORIZACION.md` | `BLOQUE_03_21_BOLSA_MONITORIZACION.md` | Renombrar |
| `BLOQUE_03_X4_INVENTARIO_GLOBAL.md` | `BLOQUE_03_22_INVENTARIO_GLOBAL.md` | Renombrar |
| `BLOQUE_03_X5_CHECKLIST_MAESTRO.md` | `BLOQUE_03_23_CHECKLIST_MAESTRO.md` | Renombrar |
| `BLOQUE_03_99_CIERRE_BLOQUE_3.md` | `BLOQUE_03_24_CIERRE_BLOQUE_3.md` | Renombrar |
| `BLOQUE_04_0B_RECONOCIMIENTO_PCR.md` | `BLOQUE_04_0_RECONOCIMIENTO_PCR.md` | Renombrar |
| `BLOQUE_04_0_ACCESO_VASCULAR_BASICO.md` | `BLOQUE_04_10_ACCESO_VASCULAR_BASICO.md` | Renombrar (después de renombrar 0B) |
| `BLOQUE_05_0B_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md` | `BLOQUE_05_9_PROTOCOLOS_EMERGENCIAS_ESPECIFICAS.md` | Renombrar |

**Orden de ejecución:**

1. ✅ Renombrar todos los archivos (comando `mv` o desde IDE)
2. ✅ Actualizar `src/data/manual-index.ts` con nuevas rutas
3. ✅ Verificar que la app carga sin errores
4. ✅ Verificar que no hay enlaces rotos

**⏱️ Tiempo estimado:** 45-60 minutos

---

### A2. Corrección de Títulos (Mayúsculas + Paréntesis)

**Archivos afectados:** 12 archivos

#### Mayúsculas Inconsistentes (8 archivos)

| Archivo | Título Actual | Corrección |
|---------|--------------|------------|
| `BLOQUE_04_3_RCP_LACTANTES.md` | `# 4.3 – Rcp Básica en Lactantes` | `# 4.3 – RCP Básica en Lactantes` |
| `BLOQUE_04_4_USO_DESA.md` | `# 4.4 – Uso del Desa` | `# 4.4 – Uso del DESA` |
| `BLOQUE_04_5_RCP_DOS_INTERVINIENTES.md` | `# 4.5 – Rcp con Dos Intervinientes` | `# 4.5 – RCP con Dos Intervinientes` |
| `BLOQUE_04_7_OVACE_PEDIATRIA.md` | `# 4.7 – Ovace en Pediatría` | `# 4.7 – OVACE en Pediatría` |
| `BLOQUE_04_8_OVACE_LACTANTES.md` | `# 4.8 – Ovace en Lactantes` | `# 4.8 – OVACE en Lactantes` |
| `BLOQUE_05_2_OVACE_TRANSTELEFONICA.md` | `# 5.2 – Ovace Transtelefónica` | `# 5.2 – OVACE Transtelefónica` |
| `BLOQUE_04_0B_RECONOCIMIENTO_PCR.md` | `# 4.0 – Reconocimiento de la Parada Cardiorrespiratoria (Pcr)` | `# 4.0 – Reconocimiento de la Parada Cardiorrespiratoria (PCR)` |

**Regla:** Acrónimos siempre en mayúsculas: RCP, OVACE, DESA, PCR, ABCDE, START

#### Paréntesis Redundantes (4 archivos)

| Archivo | Título Actual | Corrección |
|---------|--------------|------------|
| `BLOQUE_03_11_GLUCOMETRO.md` | `# 3.11 – Glucómetro y Control de Glucemia: Uso Operativo (Tes)` | `# 3.11 – Glucómetro y Control de Glucemia: Uso Operativo` |
| `BLOQUE_03_9_EXPOSICION_AISLAMIENTO_TERMICO.md` | `# 3.9 – Exposición, Aislamiento Térmico y Prevención de Hipotermia (Operativo Tes)` | `# 3.9 – Exposición, Aislamiento Térmico y Prevención de Hipotermia` |
| `BLOQUE_03_99_CIERRE_BLOQUE_3.md` | `# 3.99 – Cierre del Bloque 3: Uso Operativo del Material en Intervención (Tes)` | `# 3.99 – Cierre del Bloque 3: Uso Operativo del Material en Intervención` |
| `BLOQUE_03_2_ASPIRACION.md` | `# 3.2 – Aspiración: Material y Uso Seguro (Operativo Tes)` | `# 3.2 – Aspiración: Material y Uso Seguro` |

**Regla:** Eliminar "(Tes)" y "(Operativo Tes)". El tipo se indica en YAML.

**⏱️ Tiempo estimado:** 30-40 minutos

---

### A3. YAML Mínimo en Protocolos Críticos

**Archivos afectados:** 10 archivos

**YAML a añadir (solo esto):**

```yaml
---
tipoContenido: "operativo"
capaApp: "operativa"
---
```

**Archivos:**

| Archivo | Ubicación |
|---------|-----------|
| `BLOQUE_04_1_RCP_ADULTOS.md` | Al inicio del archivo (después de título si no hay YAML) |
| `BLOQUE_04_2_RCP_PEDIATRIA.md` | Al inicio del archivo |
| `BLOQUE_04_3_RCP_LACTANTES.md` | Al inicio del archivo |
| `BLOQUE_04_4_USO_DESA.md` | Al inicio del archivo |
| `BLOQUE_04_6_OVACE_ADULTOS.md` | Al inicio del archivo |
| `BLOQUE_04_7_OVACE_PEDIATRIA.md` | Al inicio del archivo |
| `BLOQUE_04_8_OVACE_LACTANTES.md` | Al inicio del archivo |
| `BLOQUE_01_1_CONSTANTES_VITALES.md` | Al inicio del archivo |
| `BLOQUE_01_2_ABCDE_OPERATIVO.md` | Al inicio del archivo |
| `BLOQUE_01_3_GLASGOW_OPERATIVO.md` | Al inicio del archivo |

**Nota:** Si el archivo ya tiene YAML, solo añadir estas dos líneas si faltan.

**⏱️ Tiempo estimado:** 30 minutos

---

## 🟠 BLOQUE B — IMPORTANTE

**Mejora calidad, pero no rompe nada si se retrasa.**

### B1. YAML Mínimo al Resto de Archivos Operativos

**No hacerlo todo de golpe. Hacerlo por bloques:**

**Orden sugerido:**

1. **BLOQUE_4** (resto de archivos) - 3 archivos
2. **BLOQUE_1** (resto de archivos) - 1 archivo
3. **BLOQUE_2** - 14 archivos
4. **BLOQUE_3** (resto de archivos) - ≈20 archivos
5. **BLOQUE_5** - 10 archivos
6. **BLOQUE_7** - 6 archivos
7. **BLOQUE_8** - 5 archivos

**YAML a añadir:**

```yaml
---
tipoContenido: "operativo"
capaApp: "operativa"
---
```

**Excepciones (archivos formativos):**

| Archivo | tipoContenido | capaApp |
|---------|---------------|---------|
| `BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md` | `formativo` | `refuerzo` |
| `BLOQUE_12_0_MARCO_LEGAL_ETICO_PROFESIONAL.md` | `formativo` | `refuerzo` |
| `BLOQUE_13_0_COMUNICACION_RELACION_PACIENTE.md` | `formativo` | `refuerzo` |
| `BLOQUE_14_0_SEGURIDAD_PERSONAL_SALUD_TES.md` | `formativo` | `refuerzo` |
| `BLOQUE_15_0_INTRODUCCION_ALTERACIONES_PSIQUIATRICAS.md` | `formativo` | `refuerzo` |
| `BLOQUE_09_0_MEDICINA_EMERGENCIAS_APLICADA.md` | `mixto` | `ambas` |
| `BLOQUE_10_0_SITUACIONES_ESPECIALES.md` | `mixto` | `ambas` |

**Archivos de referencia (inventarios, checklists):**

| Archivo | tipoContenido | capaApp |
|---------|---------------|---------|
| `BLOQUE_02_14_INVENTARIO_MATERIAL.md` | `referencia` | `anexos` |
| `BLOQUE_03_19_INVENTARIO_MATERIAL_SANITARIO.md` | `referencia` | `anexos` |
| `BLOQUE_03_20_MALETIN_CURAS.md` | `referencia` | `anexos` |
| `BLOQUE_03_21_BOLSA_MONITORIZACION.md` | `referencia` | `anexos` |
| `BLOQUE_03_22_INVENTARIO_GLOBAL.md` | `referencia` | `anexos` |
| `BLOQUE_03_23_CHECKLIST_MAESTRO.md` | `referencia` | `anexos` |
| `BLOQUE_06_7_ABREVIATURAS_TERMINOLOGIA_FARMACOLOGICA.md` | `referencia` | `anexos` |

**⏱️ Tiempo estimado:** 1-2 sesiones cortas (30-45 min cada bloque)

---

### B2. Enlaces "Ver También" SOLO en Capítulos Troncales

**❌ NO enlaces todo con todo**  
**❌ NO conviertas esto en Wikipedia**  
**✔ Solo en estos archivos principales:**

| Archivo | Enlaces Recomendados (máx. 5) |
|---------|------------------------------|
| `BLOQUE_04_1_RCP_ADULTOS.md` | → `BLOQUE_04_2_RCP_PEDIATRIA.md`<br>→ `BLOQUE_04_3_RCP_LACTANTES.md`<br>→ `BLOQUE_04_4_USO_DESA.md`<br>→ `BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md` |
| `BLOQUE_04_6_OVACE_ADULTOS.md` | → `BLOQUE_04_7_OVACE_PEDIATRIA.md`<br>→ `BLOQUE_04_8_OVACE_LACTANTES.md` |
| `BLOQUE_01_2_ABCDE_OPERATIVO.md` | → `BLOQUE_01_1_CONSTANTES_VITALES.md`<br>→ `BLOQUE_01_3_GLASGOW_OPERATIVO.md` |
| `BLOQUE_03_0_OXIGENOTERAPIA_COMPLETA.md` | → `BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md`<br>→ `BLOQUE_03_4_CANULAS.md` |
| `BLOQUE_03_4_CANULAS.md` | → `BLOQUE_03_1B_VENTILACION_BOLSA_MASCARILLA.md`<br>→ `BLOQUE_03_2_ASPIRACION.md` |

**Formato estándar:**

```markdown
---

## Relación con Otros Capítulos

- **4.2 – RCP Básica en Pediatría** (variante pediátrica)
- **4.4 – Uso del DESA** (equipamiento relacionado)
- **3.1 – Ventilación con Bolsa-Mascarilla** (técnica relacionada)
```

**⏱️ Tiempo estimado:** 45 minutos

---

## 🟢 BLOQUE C — OPCIONAL

**NO hacer ahora. Esto NO bloquea nada y puede esperar.**

- ❌ Navegación anterior/siguiente
- ❌ Índices por bloque
- ❌ Metadatos extra (nivelDificultad, importancia, palabrasClave)
- ❌ Notas de "desarrollo futuro"

**📌 Recomendación:** No lo hagas ahora. Te distrae del objetivo.

---

## ❌ Qué NO Hacer en el Paso 2

**Muy importante:**

- ❌ **NO dividir** capítulos largos
- ❌ **NO fusionar** capítulos salvo duplicados claros
- ❌ **NO mover** carpetas
- ❌ **NO reescribir** texto
- ❌ **NO adaptar** aún al modelo de Guía de Refuerzo

👉 **Todo eso viene después, con criterio y calma.**

---

## ✅ Resultado Esperado al Terminar el Paso 2

Cuando acabes el Paso 2, tu sistema tendrá:

- ✅ Numeración limpia y predecible
- ✅ Títulos coherentes
- ✅ Tipos de contenido explícitos
- ✅ Manual defendible como documento profesional
- ✅ Base sólida para:
  - Refactor futuro
  - Guía de refuerzo
  - Renderers más ricos

---

## 🎯 Señal Clara de que Puedes Pasar al Paso 3

**Cuando se cumplan estas 4 cosas:**

1. ✅ **No queda ningún archivo** X / X2 / 0B / 99
2. ✅ **Todos los títulos** de RCP / OVACE están bien escritos
3. ✅ **Los protocolos críticos** tienen YAML
4. ✅ **La app carga** sin enlaces rotos

👉 **PARA.**  
👉 **No sigas limpiando.**  
👉 **Escríbeme y pasamos al Paso 3.**

---

## 📝 Orden de Ejecución Recomendado

### Sesión 1: Bloque A Completo (≈2 horas)

1. **A1:** Renombrar archivos (45-60 min)
   - Renombrar todos los archivos
   - Actualizar `manual-index.ts`
   - Verificar carga

2. **A2:** Corregir títulos (30-40 min)
   - Buscar y reemplazar mayúsculas
   - Eliminar paréntesis redundantes
   - Verificar formato

3. **A3:** Añadir YAML crítico (30 min)
   - Añadir YAML a 10 archivos críticos
   - Verificar formato válido

**✅ Al finalizar:** Verificar que la app funciona correctamente.

---

### Sesión 2: Bloque B (cuando tengas tiempo)

1. **B1:** YAML por bloques (1-2 sesiones)
   - Empezar por BLOQUE_4
   - Continuar con otros bloques cuando puedas

2. **B2:** Enlaces "Ver También" (45 min)
   - Solo en archivos principales
   - Máximo 5 enlaces por archivo

---

## ✅ Checklist de Verificación Final

Antes de considerar completado el Paso 2:

- [ ] Todos los archivos con numeración especial renombrados (9 archivos)
- [ ] Todos los títulos con mayúsculas consistentes (8 archivos)
- [ ] Todos los títulos sin paréntesis redundantes (4 archivos)
- [ ] YAML mínimo añadido a protocolos críticos (10 archivos)
- [ ] `manual-index.ts` actualizado con nuevas rutas
- [ ] Sin enlaces rotos en la aplicación
- [ ] La app carga sin errores

**Si todo está marcado:** ✅ **Paso 2 completado. Listo para Paso 3.**

---

**Fin del Checklist - Paso 2**

*Este documento debe actualizarse conforme se completen las acciones.*
