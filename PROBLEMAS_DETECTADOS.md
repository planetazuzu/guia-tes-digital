# Problemas Detectados por el Script de Verificación

**Fecha:** 2025-12-17  
**Script:** `scripts/verificar-manual.ts`

---

## 🔴 PROBLEMA 1: Archivo Faltante

### Detalles

**Capítulo:** `7.1.1` - "Situaciones Especiales"  
**Ubicación en índice:** `src/data/manual-index.ts` línea 2395

**Problema:**
- El índice referencia: `BLOQUE_11_0_SITUACIONES_ESPECIALES.md`
- El archivo real es: `BLOQUE_10_0_SITUACIONES_ESPECIALES.md`

**Ruta esperada (incorrecta):**
```
public/manual/BLOQUE_10_SITUACIONES_ESPECIALES/BLOQUE_11_0_SITUACIONES_ESPECIALES.md
```

**Ruta real (correcta):**
```
public/manual/BLOQUE_10_SITUACIONES_ESPECIALES/BLOQUE_10_0_SITUACIONES_ESPECIALES.md
```

### Causa

Error en el script `generar_indice_app.py` que genera el índice. El mapeo tiene un error donde confunde el número de bloque (10) con el número de bloque siguiente (11).

### Solución

**Opción 1: Corregir el índice manualmente**
```typescript
// En src/data/manual-index.ts línea 2395
rutaArchivo: "manual-tes/TES_Manual_Digital/BLOQUE_10_SITUACIONES_ESPECIALES/BLOQUE_10_0_SITUACIONES_ESPECIALES.md",
```

**Opción 2: Corregir el script generador**
Corregir el mapeo en `generar_indice_app.py`:
```python
MAPEO_REAL = {
    # ...
    "7.1.1": "BLOQUE_10_0_SITUACIONES_ESPECIALES.md",  # Era BLOQUE_11_0
    # ...
}
```

Luego regenerar el índice:
```bash
python3 generar_indice_app.py
```

### Impacto

- ⚠️ **Alto:** El capítulo 7.1.1 no se puede cargar en la app
- ⚠️ La navegación desde 6.1.6 hacia 7.1.1 fallará
- ⚠️ La navegación desde 7.1.1 hacia 7.2.1 funcionará (pero el contenido no se mostrará)

---

## 🟡 PROBLEMA 2: Búsqueda sin Resultados

### Detalles

**Query:** `"Farmacología"`  
**Resultado:** Sin resultados encontrados

### Análisis

El script busca en:
1. ✅ Título del capítulo (`capitulo.titulo`)
2. ✅ Palabras clave (`capitulo.palabrasClave`)
3. ✅ ID del capítulo (`capitulo.id`)

**Problema:**
- "Farmacología" aparece en:
  - ✅ Nombres de parte: "Farmacología y Medicamentos"
  - ✅ Nombres de bloque: "Farmacología y Vademécum Operativo"
  - ❌ **NO** aparece en títulos de capítulos individuales
  - ❌ **NO** está en `palabrasClave` de los capítulos

**Capítulos relacionados con Farmacología:**
- 4.1.1 - "Principios de Administración de Fármacos"
- 4.1.2 - "Vademécum Operativo"
- 4.1.3 - "Oxígeno - Administración y Seguridad"
- 4.1.4 - "Adrenalina - Uso en Anafilaxia y RCP"
- 4.1.5 - "Aspirina - Uso en SCA"
- 4.1.6 - "Glucagón - Uso en Hipoglucemia"
- 4.1.7 - "Salbutamol - Uso en Crisis Asmática"
- 4.1.8 - "Abreviaturas y Terminología Farmacológica"

### Causa

Los capítulos no tienen "Farmacología" en sus títulos ni en sus palabras clave. Solo aparece en los nombres de parte/bloque que no se buscan.

### Solución

**Opción 1: Agregar palabras clave a los capítulos**

Modificar `generar_indice_app.py` para agregar palabras clave automáticamente:

```python
def extraer_palabras_clave(nombre: str, bloque: int) -> list:
    palabras_clave = []
    
    # Agregar palabras del nombre de bloque/parte
    if bloque == 6:  # Bloque de Farmacología
        palabras_clave.append("farmacologia")
        palabras_clave.append("farmacos")
        palabras_clave.append("medicamentos")
    
    # ... resto del código
```

**Opción 2: Mejorar la búsqueda en el componente**

Modificar `ManualIndex.tsx` para buscar también en nombres de parte/bloque:

```typescript
// Buscar también en nombres de parte y bloque
manualIndex.forEach(parte => {
  if (parte.nombre.toLowerCase().includes(queryLower)) {
    // Incluir todos los capítulos de esta parte
  }
  
  parte.bloques.forEach(bloque => {
    if (bloque.nombre.toLowerCase().includes(queryLower)) {
      // Incluir todos los capítulos de este bloque
    }
  });
});
```

### Impacto

- 🟡 **Medio:** Los usuarios no pueden encontrar capítulos de farmacología buscando "Farmacología"
- 🟡 Pueden encontrar buscando términos específicos como "Adrenalina", "Vademécum", etc.
- 🟡 La búsqueda funciona para términos más específicos

---

## 📊 Resumen de Problemas

| # | Problema | Severidad | Impacto | Solución |
|---|----------|-----------|---------|----------|
| 1 | Archivo faltante (7.1.1) | 🔴 Alta | Capítulo no cargable | Corregir ruta en índice |
| 2 | Búsqueda "Farmacología" | 🟡 Media | No encuentra resultados | Agregar palabras clave o mejorar búsqueda |

---

## ✅ Verificación Post-Corrección

Después de corregir los problemas, ejecutar:

```bash
npm run verify:manual
```

Debería mostrar:
- ✅ Archivos: 93/93 encontrados
- ✅ Búsqueda: 13/13 exitosas

---

## 🔧 Comandos para Corregir

### Corregir Problema 1:

```bash
# Opción A: Editar manualmente el índice
# Editar src/data/manual-index.ts línea 2395

# Opción B: Corregir y regenerar
# Editar generar_indice_app.py
python3 generar_indice_app.py
```

### Corregir Problema 2:

```bash
# Opción A: Mejorar búsqueda en ManualIndex.tsx
# Agregar búsqueda en nombres de parte/bloque

# Opción B: Agregar palabras clave
# Modificar generar_indice_app.py y regenerar
python3 generar_indice_app.py
```

---

**Estado:** ⚠️ **2 problemas detectados - Requieren corrección**
