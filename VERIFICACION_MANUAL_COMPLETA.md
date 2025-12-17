# Script de Verificación del Manual TES Digital

**Fecha:** 2025-12-17  
**Script:** `scripts/verificar-manual.ts`

---

## 📋 Descripción

Script completo de verificación que valida la integridad del Manual TES Digital, asegurando que todos los componentes funcionen correctamente.

---

## 🚀 Uso

```bash
npm run verify:manual
```

---

## ✅ Verificaciones Realizadas

### 1. Archivos .md Accesibles

**Qué verifica:**
- ✅ Que todos los 93 archivos .md existan en `public/manual/`
- ✅ Que los archivos se puedan leer correctamente
- ✅ Que los archivos no estén vacíos

**Método:**
- Lee el índice completo desde `src/data/manual-index.ts`
- Construye la ruta esperada en `public/manual/`
- Verifica existencia y legibilidad de cada archivo

**Salida:**
```
📁 Verificando archivos .md accesibles...
✅ Encontrados: X/93
❌ Faltantes: X
⚠️  Errores: X
```

### 2. Rutas

**Qué verifica:**
- ✅ Formato correcto de rutas URL (`/manual/parte-X/bloque-X/codigo`)
- ✅ Coincidencia entre código del capítulo y ruta URL
- ✅ Estructura consistente de rutas

**Método:**
- Valida formato de cada `rutaUrl`
- Verifica que el código en la ruta coincida con `capitulo.id`

**Salida:**
```
🔗 Verificando rutas...
✅ Rutas válidas: X/93
❌ Rutas inválidas: X
```

### 3. Navegación

**Qué verifica:**
- ✅ Que los capítulos anterior/siguiente existan
- ✅ Consistencia bidireccional (si A → B, entonces B ← A)
- ✅ Referencias circulares o rotas

**Método:**
- Para cada capítulo, verifica que `navegacion.anterior` y `navegacion.siguiente` apunten a capítulos existentes
- Verifica que las referencias sean bidireccionales

**Salida:**
```
🧭 Verificando navegación...
✅ Navegación válida: X/93
❌ Problemas de navegación: X
```

### 4. Búsqueda

**Qué verifica:**
- ✅ Que los capítulos sean encontrables por búsqueda
- ✅ Búsqueda por título
- ✅ Búsqueda por palabras clave
- ✅ Búsqueda por ID

**Queries de prueba:**
- Términos comunes: "RCP", "ABCDE", "Glasgow", "Triage", "Oxigenoterapia", etc.
- IDs específicos: "1.1.1", "2.1.3", etc.

**Método:**
- Simula búsqueda en títulos, palabras clave e IDs
- Verifica que cada query encuentre al menos un resultado

**Salida:**
```
🔍 Verificando búsqueda...
✅ "RCP": X resultado(s)
✅ "ABCDE": X resultado(s)
...
✅ Búsquedas exitosas: X/13
❌ Búsquedas fallidas: X
```

---

## 📊 Resumen Final

Al finalizar, el script muestra un resumen completo:

```
═══════════════════════════════════════════════════════
  RESUMEN FINAL
═══════════════════════════════════════════════════════

📁 Archivos: X/93 encontrados
🔗 Rutas: X/93 válidas
🧭 Navegación: X/93 válidas
🔍 Búsqueda: X/13 exitosas
```

---

## 🔧 Código de Salida

- **0** - Todas las verificaciones pasaron ✅
- **1** - Se encontraron problemas ❌

Útil para integración en CI/CD:

```yaml
# .github/workflows/verify.yml
- name: Verify Manual
  run: npm run verify:manual
```

---

## 🐛 Problemas Detectados

El script detectó los siguientes problemas:

### 1. Archivo Faltante
- **Capítulo:** 7.1.1
- **Problema:** El índice referencia `BLOQUE_11_0_SITUACIONES_ESPECIALES.md` pero el archivo real es `BLOQUE_10_0_SITUACIONES_ESPECIALES.md`
- **Solución:** Corregir el mapeo en `generar_indice_app.py`

### 2. Búsqueda sin Resultados
- **Query:** "Farmacología"
- **Problema:** No encuentra resultados (probablemente la palabra clave es "Farmacologia" sin tilde)
- **Solución:** Agregar variantes con/sin tildes a las palabras clave

---

## 📝 Ejemplo de Salida

```
═══════════════════════════════════════════════════════
  VERIFICACIÓN DEL MANUAL TES DIGITAL
═══════════════════════════════════════════════════════

📁 Verificando archivos .md accesibles...
✅ Encontrados: 92/93
❌ Faltantes: 1

🔗 Verificando rutas...
✅ Rutas válidas: 93/93

🧭 Verificando navegación...
✅ Navegación válida: 93/93

🔍 Verificando búsqueda...
✅ "RCP": 5 resultado(s)
✅ "ABCDE": 1 resultado(s)
...
✅ Búsquedas exitosas: 12/13
❌ Búsquedas fallidas: 1

═══════════════════════════════════════════════════════
  RESUMEN FINAL
═══════════════════════════════════════════════════════

📁 Archivos: 92/93 encontrados
🔗 Rutas: 93/93 válidas
🧭 Navegación: 93/93 válidas
🔍 Búsqueda: 12/13 exitosas

❌ Se encontraron 2 problema(s)
```

---

## 🔄 Integración Continua

### GitHub Actions

```yaml
name: Verify Manual

on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run verify:manual
```

### Pre-commit Hook

```bash
#!/bin/sh
npm run verify:manual
```

---

## 🎯 Próximas Mejoras

- [ ] Verificación de contenido (no solo existencia)
- [ ] Validación de front matter YAML
- [ ] Verificación de enlaces internos entre capítulos
- [ ] Validación de imágenes referenciadas
- [ ] Generación de reporte HTML detallado

---

**Estado:** ✅ **Script funcional y detectando problemas reales**
