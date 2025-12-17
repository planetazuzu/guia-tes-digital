# ESTÁNDAR DE FORMATO - Manual TES Digital

## Propósito

Este documento define el formato estándar que deben seguir todos los archivos `.md` del Manual TES Digital para garantizar coherencia, legibilidad y mantenibilidad.

---

## Estructura Estándar de un Capítulo

### 1. Encabezado Principal

**Formato:**
```markdown
# X.Y – Nombre del Capítulo (Mayúsculas solo en Iniciales)
```

**Ejemplos:**
- ✅ `# 1.1 – Constantes Vitales: Toma y Registro Operativo`
- ✅ `# 2.0 – Anatomía Operativa para Inmovilización y Movilización`
- ✅ `# 4.9 – Posición Lateral de Seguridad (PLS): Indicaciones y Técnica Operativa`
- ❌ `# BLOQUE 00 – Fundamentos...` (incorrecto, usar numeración decimal)
- ❌ `# 1.1- Constantes Vitales` (guión incorrecto, debe ser ene –)

**Reglas:**
- Usar numeración decimal: `X.Y` donde X es el bloque e Y es el capítulo
- Usar guión ene (–) para separar número y título
- Título con mayúsculas solo en iniciales de palabras significativas
- Si es el capítulo 0 del bloque, usar `X.0`

### 2. Subtítulo Identificativo

**Formato:**
```markdown
## Manual TES Digital – Descripción breve del contenido
```

**Ejemplos:**
- ✅ `## Manual TES Digital – Técnica operativa de toma de constantes vitales en campo`
- ✅ `## Manual TES Digital – Uso seguro de oxígeno`
- ✅ `## Manual TES Digital – Identificación rápida y fiable de PCR`

**Reglas:**
- Siempre presente después del título principal
- Usar guión ene (–) para separar
- Descripción en minúsculas salvo iniciales

### 3. Metadatos del Capítulo

**Formato:**
```markdown
**Versión:** 1.0  
**Fecha:** YYYY-MM-DD  
**Tipo:** Tipo de contenido
```

**Ejemplos:**
- `**Tipo:** Bloque Operativo - Procedimiento TES`
- `**Tipo:** Bloque Operativo - Referencia Anatómica`
- `**Tipo:** Bloque Fundacional`

**Reglas:**
- Formato de fecha: `YYYY-MM-DD`
- Versión: `1.0`, `1.1`, etc.
- Tipo: Descriptivo del contenido del capítulo
- Dos espacios al final de cada línea (excepto la última) para salto de línea

### 4. Separador de Sección

**Formato:**
```markdown
---
```

**Reglas:**
- Línea horizontal (`---`) después de metadatos
- Antes de comenzar el contenido principal

### 5. Estructura de Secciones Principales

**Formato estándar de numeración:**
```markdown
## X.Y.Z Nombre de la sección
```

**Ejemplos:**
- `## 1.1.1 Objetivo operativo`
- `## 2.0.2 Alcance y límites`
- `## 4.0.3 Principios TES`

**Reglas:**
- Usar numeración decimal completa: `X.Y.Z`
- Primera letra en minúscula después del número
- Punto y espacio después del número

### 6. Secciones Principales Obligatorias (Orden Estándar)

Todo capítulo operativo debe incluir, en este orden:

1. **`## X.Y.1 Objetivo operativo`**
   - Objetivo claro y conciso del capítulo

2. **`## X.Y.2 Alcance y límites`**
   - Qué cubre y qué NO cubre el capítulo
   - Subsecciones opcionales: `### Alcance del capítulo`, `### Límites del capítulo`, `### Integración`

3. **`## X.Y.3 Principios TES`** (opcional)
   - Principios fundamentales que guían el procedimiento

4. **`## X.Y.4 Material implicado`** (si aplica)
   - Lista de material necesario

5. **`## X.Y.5 Indicaciones operativas`** (si aplica)
   - Cuándo aplicar el procedimiento

6. **`## X.Y.6 Precauciones y situaciones complejas`** (si aplica)
   - Advertencias y casos especiales

7. **`## X.Y.7 Preparación previa`** (si aplica)
   - Pasos previos al procedimiento

8. **`## X.Y.8 Procedimiento paso a paso`** (si aplica)
   - Pasos detallados numerados o con viñetas

9. **`## X.Y.9 Errores críticos`** (recomendado)
   - Lista de errores comunes a evitar

10. **`## X.Y.10 Puntos clave TES`** (recomendado)
    - Resumen de puntos críticos

**Nota:** Los números de sección pueden ajustarse según el contenido específico del capítulo.

### 7. Subsecciones

**Formato:**
```markdown
### Nombre de subsección
```

**Reglas:**
- Sin numeración en subsecciones
- Mayúscula inicial
- Sin punto final si es título

### 8. Listas

**Listas con viñetas:**
```markdown
- Elemento 1
- Elemento 2
  - Subelemento 2.1 (indentado con 2 espacios)
```

**Listas numeradas:**
```markdown
1. Paso primero
2. Paso segundo
```

**Listas con énfasis:**
```markdown
- ✅ **Correcto:** Descripción
- ❌ **Incorrecto:** Descripción
```

### 9. Énfasis de Texto

**Negritas:**
- Para términos importantes: `**término importante**`
- Para pasos críticos: `**CRÍTICO:**`

**Cursivas:**
- Para énfasis: `*énfasis*`
- Para términos técnicos en otros idiomas: `*Bag-Valve-Mask*`

**Código inline:**
- Para nombres de archivos, variables: `` `nombre` ``

### 10. Tablas

**Formato:**
```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
```

### 11. Bloques de Código o Texto Especial

**Bloques de advertencia/nota:**
```markdown
**📌 Nota importante:**
Texto de la nota.

**⚠️ Advertencia:**
Texto de advertencia.
```

### 12. Separadores

**Separador horizontal:**
```markdown
---
```
- Usar solo entre secciones principales
- No usar múltiples separadores seguidos

### 13. Espaciado

**Reglas:**
- Una línea en blanco después de cada título (#, ##, ###)
- Una línea en blanco antes de cada título de sección
- Una línea en blanco entre párrafos
- Sin líneas en blanco al final del archivo

### 14. Enlaces Internos

**Formato:**
```markdown
[Texto del enlace](ruta/relativa/al/archivo.md)
```

**Ejemplo:**
```markdown
Ver capítulo 4.1: [RCP Básica en Adultos](../BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_1_RCP_ADULTOS.md)
```

---

## Formato Especial para Capítulos de Bloque Completo

Para capítulos que representan bloques completos (ej: Bloque 0):

**Título:**
```markdown
# BLOQUE X – Nombre del Bloque Completo
```

**Sustituye el subtítulo estándar por:**
```markdown
## Manual TES Digital – Marco Operativo y Conceptual
```

**Secciones principales:**
- Usar numeración: `## 1. OBJETIVO DEL BLOQUE` (mayúsculas, sin decimales)
- `## 2. PRINCIPIOS...`
- Etc.

---

## Ejemplo Completo de Formato Estándar

```markdown
# 3.5 – Organización del Maletín de Vía Aérea y Oxigenoterapia

## Manual TES Digital – Organización y chequeo operativo del material

**Versión:** 1.0  
**Fecha:** 2024-12-13  
**Tipo:** Bloque Operativo - Procedimiento TES

---

## 3.5.1 Objetivo operativo

Proporcionar al TES un sistema organizativo claro para el maletín de vía aérea y oxigenoterapia, garantizando localización rápida del material y verificación eficiente.

Este capítulo se centra en **organización, estructura y verificación**, no en el uso del material (ver capítulos específicos).

---

## 3.5.2 Alcance y límites

### Alcance del capítulo

Este capítulo cubre:
- Principios de organización del maletín
- Estructura recomendada por categorías
- Checklist de verificación

### Límites del capítulo

**Este capítulo NO cubre:**
- Uso específico de cada dispositivo (ver capítulos 3.1, 3.2, etc.)

---

## 3.5.3 Principios TES

- **Accesibilidad:** Material más usado en posiciones más accesibles
- **Agrupación lógica:** Material relacionado agrupado
- **Verificación sistemática:** Checklist siempre en el mismo orden
```

---

## Checklist de Validación

Antes de considerar un archivo como "formateado correctamente", verificar:

- [ ] Título principal con formato `# X.Y – Nombre`
- [ ] Subtítulo `## Manual TES Digital – ...`
- [ ] Metadatos (Versión, Fecha, Tipo) presentes
- [ ] Separador `---` después de metadatos
- [ ] Secciones numeradas con formato `## X.Y.Z`
- [ ] Orden lógico de secciones principales
- [ ] Espaciado consistente
- [ ] Listas correctamente indentadas
- [ ] Énfasis usado de forma consistente
- [ ] Sin líneas en blanco al final del archivo

---

## Herramientas de Validación

Para validar automáticamente el formato, se puede usar:
- Scripts de validación markdown
- Linters específicos para documentación técnica
- Revisión manual siguiendo este estándar
