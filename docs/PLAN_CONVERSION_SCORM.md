# 📦 Plan de Conversión Progresiva a SCORM

**Fecha:** 2024-12-30  
**Estado:** Planificación  
**Objetivo:** Convertir guías de refuerzo a SCORM sin romper la app actual

---

## 🎯 Resumen Ejecutivo

**Objetivo:** Convertir progresivamente las guías de refuerzo (actualmente en Markdown) a paquetes SCORM 1.2/2004, manteniendo la funcionalidad actual intacta y permitiendo que ambas versiones coexistan.

**Estrategia:** Arquitectura paralela que permite:
- ✅ Mantener guías actuales funcionando (Markdown)
- ✅ Generar paquetes SCORM progresivamente
- ✅ No modificar código existente
- ✅ Migración guía por guía
- ✅ Reversibilidad completa

---

## 📊 Situación Actual

### Estructura de Guías Actual

```
src/
├── data/
│   └── guides-index.ts          # Índice de guías (2 guías actualmente)
├── views/formativo/
│   ├── GuideIndex.tsx           # Lista de guías
│   ├── GuideViewer.tsx          # Visualizador con tabs
│   └── GuideSectionViewer.tsx  # Visualizador de sección individual
├── components/guide/
│   ├── GuideCard.tsx
│   ├── GuideHeader.tsx
│   ├── GuideNavigation.tsx
│   └── GuideMarkdownViewer.tsx  # Wrapper de MarkdownViewer
└── layouts/
    └── GuideLayout.tsx

docs/consolidado/
├── SECCION_01_ABCDE_OPERATIVO.md
├── SECCION_02_ABCDE_OPERATIVO.md
├── ... (8 secciones por guía)
├── SECCION_01_RCP_ADULTO_SVB.md
└── ... (8 secciones por guía)

public/docs/consolidado/
└── [81 archivos .md copiados]
```

### Características Actuales

- ✅ 8 secciones fijas por guía
- ✅ Navegación por tabs y URLs directas
- ✅ Contenido en Markdown
- ✅ Enlaces a protocolos operativos
- ✅ Badge "Modo Formación"
- ✅ Layout diferenciado (sin BottomNav)

### Guías Existentes

1. **ABCDE Operativo** (`abcde-operativo`)
   - 8 secciones
   - Protocolo operativo relacionado: `/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.2`

2. **RCP Adulto SVB** (`rcp-adulto-svb`)
   - 8 secciones
   - Protocolo operativo relacionado: `/rcp`

---

## 📚 Requisitos SCORM

### ¿Qué es SCORM?

**SCORM (Sharable Content Object Reference Model)** es un estándar para contenido e-learning que permite:
- Interoperabilidad entre LMS (Moodle, Blackboard, Canvas, etc.)
- Tracking de progreso (completado, tiempo, puntuación)
- Reutilización de contenido
- Portabilidad entre plataformas

### Versiones SCORM

- **SCORM 1.2** (más compatible, recomendado para empezar)
- **SCORM 2004** (más avanzado, mejor tracking)

### Estructura de un Paquete SCORM

```
paquete-scorm/
├── imsmanifest.xml          # Manifest principal (obligatorio)
├── [carpeta-contenido]/
│   ├── index.html          # Punto de entrada
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── sections/           # Secciones del curso
│       ├── section-01.html
│       ├── section-02.html
│       └── ...
└── [archivos SCORM API]
    ├── APIWrapper.js       # Wrapper SCORM API
    └── SCORM_API_1484_11.js # API SCORM 2004 (opcional)
```

### Funcionalidades SCORM Necesarias

1. **Tracking Básico:**
   - `cmi.core.lesson_status` (completed, incomplete, passed, failed)
   - `cmi.core.score.raw` (puntuación 0-100)
   - `cmi.core.total_time` (tiempo total)
   - `cmi.core.lesson_location` (última posición)

2. **Navegación:**
   - Progreso entre secciones
   - Botones anterior/siguiente
   - Indicador de progreso

3. **Contenido:**
   - HTML estático (no React)
   - CSS embebido o externo
   - JavaScript para SCORM API
   - Imágenes y assets

---

## 🏗️ Arquitectura Propuesta

### Principios de Diseño

1. **No romper nada existente**
   - Las guías actuales siguen funcionando
   - No modificar `GuideViewer`, `GuideMarkdownViewer`, etc.

2. **Arquitectura paralela**
   - Nueva carpeta `scorm/` para paquetes SCORM
   - Scripts de generación separados
   - Build independiente

3. **Migración progresiva**
   - Convertir guía por guía
   - Marcar en `guides-index.ts` si tiene versión SCORM
   - Permitir elegir formato (Markdown o SCORM)

4. **Reutilización de contenido**
   - Convertir Markdown → HTML
   - Reutilizar estilos Tailwind (compilados)
   - Mantener estructura de 8 secciones

### Estructura de Carpetas Propuesta

```
proyecto/
├── src/                          # App React (NO TOCAR)
│   └── [estructura actual]
│
├── scorm/                        # 🆕 NUEVA: Paquetes SCORM
│   ├── generator/                # Scripts de generación
│   │   ├── markdown-to-html.ts  # Convertir MD → HTML
│   │   ├── scorm-builder.ts     # Generar paquete SCORM
│   │   ├── manifest-generator.ts # Generar imsmanifest.xml
│   │   └── package-builder.ts   # Empaquetar ZIP
│   │
│   ├── templates/                # Plantillas SCORM
│   │   ├── index.html           # Template principal
│   │   ├── section.html         # Template de sección
│   │   ├── scorm-api.js         # SCORM API wrapper
│   │   └── styles.css           # Estilos compilados
│   │
│   ├── packages/                 # Paquetes SCORM generados
│   │   ├── abcde-operativo/
│   │   │   ├── imsmanifest.xml
│   │   │   ├── index.html
│   │   │   └── ...
│   │   └── rcp-adulto-svb/
│   │       └── ...
│   │
│   └── dist/                     # Paquetes ZIP listos para LMS
│       ├── abcde-operativo-scorm-1.2.zip
│       └── rcp-adulto-svb-scorm-1.2.zip
│
├── docs/consolidado/             # Markdown original (NO TOCAR)
│   └── [archivos .md]
│
└── scripts/
    └── generate-scorm.ts        # Script principal de generación
```

---

## 🔄 Flujo de Conversión

### Proceso de Generación

```
1. Leer guides-index.ts
   ↓
2. Para cada guía marcada como "convertible a SCORM":
   ↓
3. Leer 8 archivos Markdown de docs/consolidado/
   ↓
4. Convertir Markdown → HTML (usando remark/rehype)
   ↓
5. Aplicar template HTML con estilos Tailwind
   ↓
6. Generar imsmanifest.xml con metadatos
   ↓
7. Inyectar SCORM API JavaScript
   ↓
8. Copiar assets (imágenes, etc.)
   ↓
9. Generar paquete ZIP
   ↓
10. Guardar en scorm/dist/
```

### Tracking SCORM

```javascript
// Ejemplo de tracking básico
SCORM.setValue("cmi.core.lesson_status", "incomplete");
SCORM.setValue("cmi.core.score.raw", "0");
SCORM.setValue("cmi.core.total_time", "00:00:00");

// Al completar una sección
SCORM.setValue("cmi.core.lesson_location", "section-3");
SCORM.setValue("cmi.core.score.raw", "37.5"); // 3/8 secciones

// Al completar todo
SCORM.setValue("cmi.core.lesson_status", "completed");
SCORM.setValue("cmi.core.score.raw", "100");
```

---

## 📋 Plan de Implementación por Fases

### FASE 1: Infraestructura Base (Sin tocar app actual)

**Objetivo:** Crear estructura y herramientas de generación

**Tareas:**
1. ✅ Crear carpeta `scorm/` y subcarpetas
2. ✅ Instalar dependencias necesarias:
   - `remark` / `rehype` (ya existen)
   - `jszip` (para generar ZIP)
   - `xml2js` o `fast-xml-parser` (para XML)
3. ✅ Crear templates HTML básicos
4. ✅ Crear SCORM API wrapper (JavaScript vanilla)
5. ✅ Script de prueba: convertir 1 sección MD → HTML

**Criterios de éxito:**
- ✅ Script genera HTML válido desde Markdown
- ✅ HTML se ve correctamente en navegador
- ✅ No se modifica código de la app React

**Tiempo estimado:** 2-3 días

---

### FASE 2: Generador de Paquetes SCORM

**Objetivo:** Generar paquete SCORM completo para 1 guía

**Tareas:**
1. ✅ Script para convertir 8 secciones MD → HTML
2. ✅ Generar `imsmanifest.xml` con metadatos correctos
3. ✅ Integrar SCORM API en HTML
4. ✅ Implementar tracking básico (progreso, tiempo)
5. ✅ Copiar assets (imágenes) al paquete
6. ✅ Generar ZIP del paquete

**Criterios de éxito:**
- ✅ Paquete ZIP se puede importar en LMS de prueba (Moodle)
- ✅ Tracking funciona (completado, progreso)
- ✅ Navegación entre secciones funciona
- ✅ Contenido se ve correctamente

**Tiempo estimado:** 3-4 días

---

### FASE 3: Integración Opcional en App (Sin romper actual)

**Objetivo:** Permitir descargar/visualizar SCORM desde la app (opcional)

**Tareas:**
1. ✅ Extender `guides-index.ts` con campo `scormAvailable: boolean`
2. ✅ Añadir botón "Descargar SCORM" en `GuideCard` (solo si disponible)
3. ✅ Servir paquetes ZIP desde `public/scorm/dist/`
4. ✅ Página de información sobre SCORM (opcional)

**Criterios de éxito:**
- ✅ Las guías actuales siguen funcionando igual
- ✅ Nueva funcionalidad es opcional y no afecta flujo actual
- ✅ Descarga de ZIP funciona

**Tiempo estimado:** 1-2 días

---

### FASE 4: Migración Progresiva de Guías

**Objetivo:** Convertir guías una por una

**Tareas:**
1. ✅ Convertir "ABCDE Operativo" a SCORM
2. ✅ Probar en LMS real
3. ✅ Ajustar estilos/tracking según feedback
4. ✅ Convertir "RCP Adulto SVB" a SCORM
5. ✅ Documentar proceso para futuras guías

**Criterios de éxito:**
- ✅ Ambas guías tienen versión SCORM funcional
- ✅ Proceso documentado para nuevas guías
- ✅ App React sigue funcionando igual

**Tiempo estimado:** 2-3 días por guía

---

### FASE 5: Mejoras y Optimización

**Objetivo:** Mejorar calidad y funcionalidades SCORM

**Tareas:**
1. ✅ Añadir tracking avanzado (tiempo por sección)
2. ✅ Mejorar estilos para diferentes LMS
3. ✅ Añadir cuestionarios/evaluaciones (opcional)
4. ✅ Optimizar tamaño de paquetes
5. ✅ Documentación completa

**Tiempo estimado:** 2-3 días

---

## 🛠️ Herramientas y Dependencias

### Dependencias Nuevas Necesarias

```json
{
  "devDependencies": {
    "jszip": "^3.10.1",              // Generar ZIP
    "fast-xml-parser": "^4.3.2",     // Generar XML
    "@types/jszip": "^3.4.1"
  }
}
```

### Herramientas Existentes (Reutilizar)

- ✅ `remark` / `rehype` (ya instalados)
- ✅ `react-markdown` (para referencia, pero SCORM usará HTML estático)
- ✅ Tailwind CSS (compilar a CSS estático)

### Scripts NPM Nuevos

```json
{
  "scripts": {
    "scorm:generate": "tsx scripts/generate-scorm.ts",
    "scorm:generate:abcde": "tsx scripts/generate-scorm.ts --guide abcde-operativo",
    "scorm:generate:rcp": "tsx scripts/generate-scorm.ts --guide rcp-adulto-svb",
    "scorm:build:all": "npm run scorm:generate"
  }
}
```

---

## 📐 Diseño Técnico Detallado

### 1. Conversión Markdown → HTML

**Estrategia:**
- Usar `remark` + `rehype` para parsear Markdown
- Convertir a HTML con plugins:
  - `remark-gfm` (tablas, strikethrough)
  - `rehype-highlight` (syntax highlighting)
  - `rehype-raw` (HTML crudo si existe)
- Aplicar clases Tailwind compiladas

**Código ejemplo:**
```typescript
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  
  return result.toString();
}
```

### 2. Template HTML SCORM

**Estructura:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Guía de Refuerzo - [Título]</title>
  <link rel="stylesheet" href="styles.css">
  <script src="scorm-api.js"></script>
</head>
<body>
  <div class="scorm-container">
    <header>
      <h1>[Título Guía]</h1>
      <div class="progress">Sección X de 8</div>
    </header>
    <main>
      <div class="section-content">
        [HTML de la sección convertida desde Markdown]
      </div>
      <nav class="section-navigation">
        <button id="prev">Anterior</button>
        <button id="next">Siguiente</button>
      </nav>
    </main>
  </div>
  <script src="scorm-tracker.js"></script>
</body>
</html>
```

### 3. SCORM API Wrapper

**Funcionalidades:**
- Detectar LMS (SCORM 1.2 o 2004)
- Inicializar comunicación
- Guardar progreso
- Manejar errores

**Ejemplo:**
```javascript
// scorm-api.js
const SCORM = {
  API: null,
  initialized: false,
  
  init() {
    // Buscar API del LMS
    this.API = this.findAPI();
    if (this.API) {
      this.initialized = true;
      this.setValue("cmi.core.lesson_status", "incomplete");
    }
  },
  
  setValue(element, value) {
    if (!this.initialized) return false;
    const result = this.API.LMSSetValue(element, value);
    return result === "true";
  },
  
  getValue(element) {
    if (!this.initialized) return "";
    return this.API.LMSGetValue(element);
  },
  
  save() {
    return this.API.LMSCommit("");
  }
};
```

### 4. Generación de imsmanifest.xml

**Estructura básica:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="abcde-operativo-scorm" version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
    <title>ABCDE Operativo - Guía de Refuerzo</title>
    <description>Guía formativa sobre el enfoque ABCDE</description>
  </metadata>
  <organizations default="TOC1">
    <organization identifier="TOC1">
      <title>ABCDE Operativo</title>
      <item identifier="ITEM1" identifierref="RES1">
        <title>Sección 1: Introducción</title>
      </item>
      <!-- ... más items ... -->
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES1" type="webcontent" adlcp:scormtype="sco"
              href="index.html">
      <file href="index.html"/>
      <file href="section-01.html"/>
      <!-- ... más archivos ... -->
    </resource>
  </resources>
</manifest>
```

---

## ✅ Checklist de Implementación

### Fase 1: Infraestructura
- [ ] Crear carpeta `scorm/` y subcarpetas
- [ ] Instalar dependencias (`jszip`, `fast-xml-parser`)
- [ ] Crear template HTML básico
- [ ] Crear SCORM API wrapper
- [ ] Script de prueba: MD → HTML

### Fase 2: Generador
- [ ] Script convertir 8 secciones MD → HTML
- [ ] Generar `imsmanifest.xml`
- [ ] Integrar SCORM API
- [ ] Implementar tracking
- [ ] Copiar assets
- [ ] Generar ZIP

### Fase 3: Integración (Opcional)
- [ ] Extender `guides-index.ts`
- [ ] Botón "Descargar SCORM" en `GuideCard`
- [ ] Servir paquetes desde `public/`
- [ ] Página información SCORM

### Fase 4: Migración
- [ ] Convertir "ABCDE Operativo"
- [ ] Probar en LMS
- [ ] Convertir "RCP Adulto SVB"
- [ ] Documentar proceso

### Fase 5: Mejoras
- [ ] Tracking avanzado
- [ ] Optimización estilos
- [ ] Documentación completa

---

## 🚨 Riesgos y Mitigaciones

### Riesgo 1: Estilos Tailwind no funcionan en HTML estático
**Mitigación:** Compilar Tailwind a CSS estático antes de generar SCORM

### Riesgo 2: Imágenes no se cargan en SCORM
**Mitigación:** Copiar todas las imágenes al paquete y usar rutas relativas

### Riesgo 3: SCORM no funciona en algunos LMS
**Mitigación:** Probar en múltiples LMS (Moodle, Canvas, Blackboard)

### Riesgo 4: Tamaño de paquetes muy grande
**Mitigación:** Optimizar imágenes, minificar CSS/JS, code splitting

### Riesgo 5: Tracking no se guarda correctamente
**Mitigación:** Implementar logging, probar en LMS real, manejar errores

---

## 📊 Métricas de Éxito

1. **Funcionalidad:**
   - ✅ Paquetes SCORM se importan correctamente en LMS
   - ✅ Tracking funciona (progreso, completado)
   - ✅ Navegación entre secciones funciona
   - ✅ Contenido se ve correctamente

2. **Calidad:**
   - ✅ HTML válido
   - ✅ CSS funciona correctamente
   - ✅ JavaScript sin errores
   - ✅ Accesibilidad (WCAG básico)

3. **Compatibilidad:**
   - ✅ SCORM 1.2 funciona
   - ✅ Compatible con Moodle, Canvas, Blackboard
   - ✅ Tamaño de paquete < 10MB (ideal)

4. **No regresiones:**
   - ✅ App React sigue funcionando igual
   - ✅ Guías Markdown siguen accesibles
   - ✅ No se rompe nada existente

---

## 📚 Recursos y Referencias

### Documentación SCORM
- [SCORM 1.2 Specification](https://www.adlnet.gov/scorm/scorm-1-2/)
- [SCORM 2004 Specification](https://www.adlnet.gov/scorm/scorm-2004-4th-edition/)
- [Rustici SCORM Cloud (para testing)](https://cloud.scorm.com/)

### Herramientas
- [SCORM Test Suite](https://www.adlnet.gov/adl-research/scorm/)
- [Moodle (LMS de prueba gratuito)](https://moodle.org/)

### Librerías JavaScript
- `jszip` - Generar archivos ZIP
- `fast-xml-parser` - Parsear/generar XML
- `remark` / `rehype` - Procesar Markdown (ya instalados)

---

## 🎯 Próximos Pasos Inmediatos

1. **Revisar y aprobar este plan**
2. **Crear estructura de carpetas `scorm/`**
3. **Instalar dependencias necesarias**
4. **Crear script de prueba básico (Fase 1)**
5. **Iterar y mejorar**

---

**Estado:** ✅ Plan completo listo para implementación  
**Última actualización:** 2024-12-30

