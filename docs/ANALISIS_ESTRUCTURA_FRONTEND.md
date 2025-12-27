# Análisis de Estructura Frontend - EMERGES TES
**Análisis Técnico y Arquitectónico para Preparación de Rediseño**

---

## 1️⃣ Análisis de Estructura del Proyecto

### 1.1 Estructura de Carpetas Principal

```
guia-tes/
├── src/                          # Código fuente principal
│   ├── components/               # Componentes React organizados por dominio
│   │   ├── layout/              # Componentes de estructura visual (Header, Footer, BottomNav)
│   │   ├── ui/                  # Componentes base de shadcn/ui (51 componentes)
│   │   ├── content/             # Visualizadores de contenido (MarkdownViewer)
│   │   ├── manual/              # Específico para manual
│   │   ├── tools/               # Calculadoras y herramientas (10 componentes)
│   │   ├── drugs/               # Componentes de fármacos (4 componentes)
│   │   ├── procedures/          # Procedimientos
│   │   ├── decision-trees/      # Árboles de decisión
│   │   ├── communication-scripts/ # Guiones de comunicación
│   │   ├── telephone-protocols/  # Protocolos transtelefónicos
│   │   ├── material-checklists/   # Checklists de material
│   │   ├── references/           # Referencias (terminología)
│   │   └── shared/               # Componentes compartidos (Badge, EmergencyButton)
│   │
│   ├── pages/                    # Páginas/Views principales (24 archivos)
│   │   ├── Index.tsx            # Página principal (Home)
│   │   ├── ManualIndex.tsx       # Índice del manual
│   │   ├── ManualViewer.tsx      # Visualizador de capítulos del manual
│   │   ├── RCP.tsx              # Página de RCP
│   │   ├── Ictus.tsx            # Página de Ictus
│   │   ├── Shock.tsx            # Página de Shock
│   │   ├── ViaAerea.tsx         # Página de Vía Aérea
│   │   └── [otros 17 archivos]  # Otras páginas funcionales
│   │
│   ├── data/                     # Datos estructurados y configuración
│   │   ├── manual-index.ts      # Índice completo del manual (estructura jerárquica)
│   │   ├── guia-refuerzo-rcp-adulto-svb.json  # Ejemplo de guía de refuerzo en JSON
│   │   ├── drugs.ts             # Datos de fármacos
│   │   ├── procedures.ts        # Procedimientos
│   │   ├── calculators.ts       # Configuración de calculadoras
│   │   ├── image-registry.ts    # Registro de imágenes con alias
│   │   └── [otros archivos de datos]
│   │
│   ├── hooks/                    # Custom hooks (6 hooks)
│   │   ├── useFavorites.ts      # Gestión de favoritos
│   │   ├── useSearchHistory.ts  # Historial de búsquedas
│   │   ├── usePWAInstall.ts     # Instalación PWA
│   │   ├── useServiceWorker.ts  # Service Worker
│   │   └── [otros hooks]
│   │
│   ├── utils/                    # Utilidades
│   │   └── markdownUtils.ts     # Procesamiento de Markdown
│   │
│   ├── lib/                      # Librerías y configuraciones
│   │   └── utils.ts              # Utilidades generales (cn, etc.)
│   │
│   ├── App.tsx                   # Componente raíz y configuración de rutas
│   ├── main.tsx                  # Punto de entrada
│   ├── index.css                 # Estilos globales y variables CSS
│   └── App.css                   # Estilos específicos de App (mínimo)
│
├── public/                        # Archivos estáticos servidos directamente
│   ├── manual/                   # Archivos Markdown del manual (92 archivos .md)
│   │   └── [estructura por bloques]
│   ├── assets/                   # Recursos estáticos
│   │   ├── infografias/          # Infografías (48 archivos PNG/SVG)
│   │   └── diagramas/            # Diagramas
│   ├── sw.js                     # Service Worker
│   ├── manifest.json             # PWA Manifest
│   └── [otros archivos estáticos]
│
├── docs/                          # Documentación
│   └── consolidado/              # Guías de refuerzo en Markdown (103 archivos)
│       └── [SECCION_XX_NOMBRE.md]
│
├── dist/                          # Build de producción (generado)
├── node_modules/                  # Dependencias
└── [archivos de configuración]
```

### 1.2 Layout Principal

**Ubicación del Layout:**
- **Archivo principal:** `src/App.tsx` (líneas 62-121)
- **Componentes de layout:** `src/components/layout/`

**Estructura Visual Actual:**

```
┌─────────────────────────────────────┐
│ Header (fixed, top-0, z-50)        │ ← src/components/layout/Header.tsx
│ - Logo TES                          │
│ - Estado online/offline             │
│ - Botón búsqueda                    │
│ - Botón menú                        │
├─────────────────────────────────────┤
│                                     │
│ Main Content (pt-14 pb-safe)       │ ← Contenedor principal
│ ┌───────────────────────────────┐ │
│ │ Container (max-w-2xl)          │ │ ← Ancho máximo centrado
│ │ └── Routes (Suspense)          │ │ ← React Router
│ │     └── [Páginas lazy-loaded]  │ │
│ └───────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ BottomNav (fixed, bottom-0, z-50)  │ ← src/components/layout/BottomNav.tsx
│ - Home, Soporte, Patologías, etc.  │
├─────────────────────────────────────┤
│ Footer (hidden md:block)           │ ← src/components/layout/Footer.tsx
└─────────────────────────────────────┘
```

**Componentes de Layout:**
1. **Header.tsx** - Barra superior fija con navegación y acciones
2. **BottomNav.tsx** - Navegación inferior fija (mobile-first)
3. **Footer.tsx** - Pie de página (solo desktop)
4. **MenuSheet.tsx** - Menú lateral deslizable (Sheet component)
5. **SearchModal.tsx** - Modal de búsqueda
6. **InstallBanner.tsx** - Banner de instalación PWA
7. **UpdateNotification.tsx** - Notificación de actualizaciones

### 1.3 Gestión de Vistas/Pantallas

**Sistema de Rutas:**
- **Framework:** React Router v6.30.1
- **Configuración:** `src/App.tsx` (líneas 60-100)
- **Estrategia:** Lazy loading para todas las páginas excepto Home y NotFound

**Estructura de Rutas:**
```typescript
/                          → Index.tsx (Home) - Carga inmediata
/manual                    → ManualIndex.tsx - Índice del manual
/manual/:parte/:bloque/:capitulo → ManualViewer.tsx - Visualizador de capítulos
/rcp                       → RCP.tsx
/ictus                     → Ictus.tsx
/shock                     → Shock.tsx
/via-aerea                 → ViaAerea.tsx
/soporte-vital             → SoporteVital.tsx
[+ 18 rutas más]
```

**Lazy Loading:**
- Todas las páginas excepto Home y NotFound se cargan bajo demanda
- Usa `React.lazy()` y `Suspense` con `PageLoader` como fallback
- Code splitting automático por Vite (ver `vite.config.ts`)

### 1.4 Separación de Responsabilidades

**✅ Separación Existente:**

1. **Lógica de Negocio:**
   - `src/data/` - Datos estructurados y configuración
   - `src/hooks/` - Lógica reutilizable (favoritos, historial, PWA)
   - `src/utils/` - Utilidades puras (markdown, etc.)

2. **Presentación Visual:**
   - `src/components/ui/` - Componentes base (shadcn/ui)
   - `src/components/layout/` - Estructura visual
   - `src/components/[domain]/` - Componentes específicos por dominio
   - `src/pages/` - Vistas/pantallas completas

3. **Contenido:**
   - `public/manual/` - Archivos Markdown del manual operativo
   - `docs/consolidado/` - Guías de refuerzo en Markdown
   - `public/assets/` - Imágenes e infografías
   - `src/data/` - Metadatos y estructuras de datos

**⚠️ Acoplamientos Detectados:**

- `ManualViewer.tsx` depende directamente de `manual-index.ts` (estructura de datos)
- `MarkdownViewer.tsx` tiene lógica de procesamiento de imágenes mezclada con presentación
- Algunos componentes de `ui/` tienen estilos hardcodeados en lugar de usar variables CSS

---

## 2️⃣ Análisis de la Visualización Actual

### 2.1 Construcción de la Interfaz

**Arquitectura Visual:**
- **Framework CSS:** Tailwind CSS 3.4 con sistema de diseño personalizado
- **Componentes UI:** shadcn/ui (51 componentes basados en Radix UI)
- **Tema:** Dark mode por defecto, optimizado para uso nocturno en ambulancia
- **Responsive:** Mobile-first, con breakpoints estándar de Tailwind

**Layout General:**
```
┌─────────────────────────────────────────┐
│ Header (fixed, h-14)                   │
├─────────────────────────────────────────┤
│ Main (pt-14 pb-safe)                    │
│ ┌─────────────────────────────────────┐ │
│ │ Container (max-w-2xl, mx-auto)      │ │ ← Ancho máximo 672px
│ │ └── Contenido de página              │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ BottomNav (fixed, h-16)                 │
└─────────────────────────────────────────┘
```

**Características del Layout:**
- **Ancho máximo:** `max-w-2xl` (672px) - Diseño centrado, legible
- **Padding superior:** `pt-14` - Compensación para Header fijo
- **Padding inferior:** `pb-safe` - Compensación para BottomNav + safe area
- **Contenedor:** Centrado con `mx-auto`

### 2.2 Componentes Visuales Existentes

**Componentes Base (shadcn/ui):**
- **Navegación:** Button, NavLink, Breadcrumb, Tabs
- **Contenedores:** Card, Sheet, Dialog, Drawer, Accordion
- **Formularios:** Input, Select, Checkbox, Radio, Switch, Slider
- **Feedback:** Toast, Alert, Progress, Skeleton
- **Datos:** Table, Pagination
- **Otros:** Tooltip, Popover, HoverCard, Command

**Componentes de Dominio:**
- **EmergencyButton** - Botones de emergencia con variantes (critical, high, medium, low)
- **Badge** - Badges con variantes de prioridad
- **MarkdownViewer** - Renderizador de Markdown con estilos personalizados
- **DrugCard** - Tarjetas de fármacos
- **ProcedureCard** - Tarjetas de procedimientos
- **Calculadoras** (10 componentes) - Herramientas interactivas

**Componentes de Layout:**
- **Header** - Barra superior con estado online/offline
- **BottomNav** - Navegación inferior con 6 items principales
- **MenuSheet** - Menú lateral deslizable
- **SearchModal** - Modal de búsqueda global
- **Footer** - Pie de página minimalista

### 2.3 Renderizado de Contenido

**Markdown:**
- **Componente:** `src/components/content/MarkdownViewer.tsx`
- **Librería:** react-markdown 10.1.0
- **Plugins:**
  - `remark-gfm` - GitHub Flavored Markdown
  - `remark-frontmatter` - Soporte para front matter
  - `rehype-raw` - HTML crudo
  - `rehype-sanitize` - Sanitización de seguridad
  - `rehype-highlight` - Syntax highlighting

**Carga de Archivos:**
- **Estrategia:** Fetch dinámico desde `public/manual/`
- **Rutas:** Normalizadas para empezar con `/`
- **Estados:** Loading, Error, Empty
- **Imágenes:** Sistema de registro con alias (`image-registry.ts`)

**Estilos de Markdown:**
- **Plugin:** `@tailwindcss/typography` (prose classes)
- **Clase base:** `prose prose-slate dark:prose-invert max-w-none`
- **Personalización:** Componentes customizados para cada elemento HTML

**Guías de Refuerzo:**
- **Formato actual:** Markdown en `docs/consolidado/`
- **Estructura:** 8 secciones por guía (SECCION_01 a SECCION_08)
- **Visualización:** NO implementada actualmente en la app
- **Datos JSON:** Existe ejemplo en `src/data/guia-refuerzo-rcp-adulto-svb.json`

### 2.4 Rigidez vs Flexibilidad

**✅ Partes Fáciles de Modificar:**

1. **Estilos Globales:**
   - `src/index.css` - Variables CSS centralizadas
   - `tailwind.config.ts` - Configuración de tema y colores
   - Variables CSS permiten cambios de tema sin tocar componentes

2. **Componentes UI Base:**
   - `src/components/ui/` - Componentes de shadcn/ui
   - Modificables individualmente sin afectar otros
   - Estilos mediante clases Tailwind, fácil de personalizar

3. **Componentes de Dominio:**
   - `src/components/[domain]/` - Componentes específicos
   - Aislados por dominio, modificables sin impacto global

4. **Contenido:**
   - `public/manual/` - Archivos Markdown independientes
   - `docs/consolidado/` - Guías de refuerzo independientes
   - Cambios de contenido no requieren cambios de código

**⚠️ Partes Rígidas (Requieren Cuidado):**

1. **Layout Principal:**
   - `src/App.tsx` - Estructura fija con Header/BottomNav/Footer
   - Cambios requieren modificar el componente raíz
   - Afecta todas las páginas

2. **Sistema de Rutas:**
   - `src/App.tsx` (líneas 71-99) - Rutas hardcodeadas
   - Agregar nuevas rutas requiere modificar App.tsx
   - No hay sistema de rutas dinámicas

3. **MarkdownViewer:**
   - `src/components/content/MarkdownViewer.tsx` - Lógica de renderizado mezclada
   - Procesamiento de imágenes integrado en el componente
   - Difícil de extender sin modificar el componente base

4. **Estructura de Datos:**
   - `src/data/manual-index.ts` - Estructura jerárquica fija
   - Tipos TypeScript estrictos
   - Cambios requieren actualizar tipos y datos

### 2.5 Tipo de Diseño

**Arquitectura de Diseño:**
- **Tipo:** Híbrido (Componentes + Rutas)
- **Base:** Componentes reutilizables (shadcn/ui)
- **Estructura:** Basada en rutas/páginas (React Router)
- **Estilos:** Utility-first (Tailwind CSS)

**Características:**
- ✅ **Componentes reutilizables:** shadcn/ui proporciona base sólida
- ✅ **Rutas/páginas:** Cada funcionalidad tiene su página dedicada
- ⚠️ **Monolítico parcial:** Layout principal está acoplado en App.tsx
- ✅ **Flexibilidad:** Componentes individuales son modulares

---

## 3️⃣ Identificación de Puntos Críticos

### 3.1 Archivos/Carpetas NO Tocar Sin Copia

**🔴 CRÍTICOS (Riesgo Alto):**

1. **`src/App.tsx`**
   - **Razón:** Componente raíz, estructura de layout, rutas principales
   - **Riesgo:** Cualquier cambio puede romper toda la aplicación
   - **Dependencias:** Header, BottomNav, Footer, Routes, Providers

2. **`src/components/layout/Header.tsx`**
   - **Razón:** Navegación principal, estado online/offline, búsqueda
   - **Riesgo:** Cambios afectan todas las páginas
   - **Dependencias:** App.tsx, SearchModal, MenuSheet

3. **`src/components/layout/BottomNav.tsx`**
   - **Razón:** Navegación inferior, visible en todas las páginas
   - **Riesgo:** Cambios afectan UX global
   - **Dependencias:** React Router NavLink

4. **`src/data/manual-index.ts`**
   - **Razón:** Estructura de datos del manual, tipos TypeScript
   - **Riesgo:** Cambios pueden romper ManualIndex y ManualViewer
   - **Dependencias:** ManualIndex.tsx, ManualViewer.tsx

5. **`src/components/content/MarkdownViewer.tsx`**
   - **Razón:** Renderizado de todo el contenido Markdown
   - **Riesgo:** Cambios afectan visualización de manual y guías
   - **Dependencias:** Todas las páginas que muestran Markdown

6. **`tailwind.config.ts`**
   - **Razón:** Configuración de tema, colores, tipografía
   - **Riesgo:** Cambios afectan estilos globales
   - **Dependencias:** Todos los componentes

7. **`src/index.css`**
   - **Razón:** Variables CSS, estilos base, clases utilitarias
   - **Riesgo:** Cambios afectan apariencia global
   - **Dependencias:** Todo el sistema visual

**🟡 IMPORTANTES (Riesgo Medio):**

8. **`src/components/ui/` (cualquier componente)**
   - **Razón:** Componentes base usados en toda la app
   - **Riesgo:** Cambios pueden afectar múltiples páginas
   - **Mitigación:** Cambios menores son seguros, refactors grandes requieren cuidado

9. **`vite.config.ts`**
   - **Razón:** Configuración de build, code splitting, rutas de assets
   - **Riesgo:** Cambios pueden romper el build o rutas de assets
   - **Dependencias:** Sistema de build completo

10. **`public/manual/` (estructura de carpetas)**
    - **Razón:** Archivos Markdown referenciados por manual-index.ts
    - **Riesgo:** Cambios de estructura requieren actualizar manual-index.ts
    - **Dependencias:** manual-index.ts, ManualViewer.tsx

### 3.2 Dependencias Visuales Importantes

**Jerarquía de Dependencias:**

```
App.tsx
├── ThemeProvider (next-themes)
│   └── Variables CSS (index.css)
│       └── tailwind.config.ts
│
├── Layout Components
│   ├── Header.tsx
│   │   ├── Button (ui/button)
│   │   └── SearchModal, MenuSheet
│   │
│   ├── BottomNav.tsx
│   │   └── NavLink (react-router)
│   │
│   └── Footer.tsx
│
└── Pages
    ├── ManualViewer.tsx
    │   ├── MarkdownViewer
    │   │   ├── react-markdown
    │   │   ├── prose (tailwind-typography)
    │   │   └── image-registry.ts
    │   └── manual-index.ts
    │
    └── [Otras páginas]
        └── Componentes UI base
```

**Variables CSS Críticas:**
- `--background`, `--foreground` - Colores base
- `--primary`, `--primary-foreground` - Color principal (rojo emergencia)
- `--emergency-critical`, `--emergency-high`, etc. - Colores de emergencia
- `--radius` - Border radius global
- Variables de sidebar (aunque no se usa actualmente)

### 3.3 Riesgos Potenciales

**Si se Modifica el Layout Directamente:**

1. **Riesgo de Romper Responsive:**
   - Header y BottomNav son fixed
   - Cambios en padding/margin pueden solapar contenido
   - Safe area insets pueden verse afectados

2. **Riesgo de Romper Navegación:**
   - BottomNav usa React Router NavLink
   - Cambios en rutas pueden romper navegación
   - Header tiene botón de retroceso que depende de history

3. **Riesgo de Romper PWA:**
   - Layout optimizado para PWA (safe areas, touch targets)
   - Cambios pueden afectar instalación o uso offline

4. **Riesgo de Romper Accesibilidad:**
   - Focus states, ARIA labels, touch targets
   - Cambios pueden afectar usabilidad con guantes

5. **Riesgo de Romper Tema:**
   - Dark mode por defecto optimizado para uso nocturno
   - Cambios pueden afectar legibilidad en ambulancias

### 3.4 Acoplamientos Fuertes

**Acoplamientos Detectados:**

1. **App.tsx ↔ Layout Components:**
   - App.tsx importa directamente Header, BottomNav, Footer
   - Cambios en layout requieren modificar App.tsx
   - **Solución potencial:** Layout component wrapper

2. **ManualViewer ↔ manual-index.ts:**
   - ManualViewer depende de estructura fija de manual-index.ts
   - Cambios en estructura requieren actualizar ambos
   - **Solución potencial:** Abstracción de datos

3. **MarkdownViewer ↔ image-registry.ts:**
   - Lógica de imágenes mezclada en MarkdownViewer
   - Cambios en sistema de imágenes requieren modificar MarkdownViewer
   - **Solución potencial:** Hook o utilidad separada

4. **Pages ↔ Components:**
   - Páginas importan componentes directamente
   - No hay capa de abstracción
   - **Impacto:** Bajo, pero limita reutilización

---

## 4️⃣ Propuesta de Copia Segura

### 4.1 Estrategia de Copia

**Comando Recomendado:**

```bash
# Desde el directorio padre de guia-tes
cd /home/planetazuzu
cp -r guia-tes guia-tes-ui-experimental
```

**Alternativa con rsync (más control):**

```bash
rsync -av --exclude='node_modules' \
         --exclude='dist' \
         --exclude='.git' \
         --exclude='logs' \
         --exclude='*.log' \
         guia-tes/ guia-tes-ui-experimental/
```

### 4.2 Nombre Recomendado

**Opción 1 (Recomendada):** `guia-tes-ui-experimental`
- **Ventajas:** Claro que es experimental, indica que es para UI
- **Uso:** Desarrollo de nuevas visualizaciones sin riesgo

**Otras opciones:**
- `guia-tes-v2` - Si es una versión completa
- `guia-tes-visual-lab` - Si es un laboratorio de diseño
- `guia-tes-refactor` - Si es un refactor completo

### 4.3 Archivos/Carpetas a Excluir

**Excluir de la Copia:**

1. **`node_modules/`**
   - **Razón:** Se regenera con `npm install`
   - **Tamaño:** Muy grande, innecesario

2. **`dist/`**
   - **Razón:** Build de producción, se regenera
   - **Tamaño:** Grande, innecesario

3. **`.git/`**
   - **Razón:** Historial de git (opcional, según preferencia)
   - **Alternativa:** Si quieres historial, mantenerlo

4. **`logs/`**
   - **Razón:** Logs de PM2, se regeneran
   - **Tamaño:** Pequeño pero innecesario

5. **`*.log`**
   - **Razón:** Archivos de log temporales

**Mantener en la Copia:**

- ✅ Todo `src/` - Código fuente
- ✅ Todo `public/` - Archivos estáticos
- ✅ Todo `docs/` - Documentación y guías
- ✅ `package.json`, `package-lock.json` - Dependencias
- ✅ `tailwind.config.ts`, `vite.config.ts` - Configuraciones
- ✅ `tsconfig.json` - Configuración TypeScript
- ✅ `.gitignore` - Si se va a versionar

### 4.4 Buenas Prácticas para Trabajo en Paralelo

**1. Gestión de Dependencias:**

```bash
# En la copia experimental
cd guia-tes-ui-experimental
npm install  # Regenerar node_modules
```

**2. Puerto de Desarrollo Diferente:**

Modificar `vite.config.ts` en la copia:
```typescript
server: {
  port: 8097,  // Cambiar de 8096 a 8097
}
```

**3. Variables de Entorno:**

Crear `.env.local` en la copia con configuración diferente si es necesario.

**4. Git (Opcional):**

```bash
cd guia-tes-ui-experimental
git init
git add .
git commit -m "Initial experimental copy"
# Crear rama experimental
git checkout -b ui-redesign
```

**5. Scripts de Desarrollo:**

Mantener scripts de `package.json` iguales, pero ejecutar en directorio diferente.

**6. Testing de Cambios:**

- Probar cambios en la copia experimental
- Comparar visualmente con la original
- Validar que no se rompe funcionalidad existente

**7. Integración Gradual:**

- Cambios pequeños y probados se pueden portar a la original
- Mantener ambas versiones hasta validación completa

---

## 5️⃣ Preparación para Rediseño Futuro

### 5.1 Estructura Ideal para Nueva Visualización

**Arquitectura Recomendada:**

```
src/
├── layouts/                      # NUEVO: Layouts alternativos
│   ├── DefaultLayout.tsx        # Layout actual (Header + BottomNav)
│   ├── GuideLayout.tsx          # Layout para guías de refuerzo
│   ├── OperationalLayout.tsx    # Layout para protocolos operativos
│   └── MinimalLayout.tsx        # Layout minimalista
│
├── views/                        # NUEVO: Vistas por modo
│   ├── formativo/               # Vistas de modo formativo
│   │   ├── GuideViewer.tsx      # Visualizador de guías
│   │   └── GuideIndex.tsx       # Índice de guías
│   │
│   └── operativo/               # Vistas de modo operativo
│       ├── ProtocolViewer.tsx   # Visualizador de protocolos
│       └── ProtocolIndex.tsx    # Índice de protocolos
│
├── components/
│   ├── guide/                    # NUEVO: Componentes específicos de guías
│   │   ├── GuideSection.tsx     # Sección de guía
│   │   ├── GuideBlock.tsx       # Bloque de contenido
│   │   ├── GuideVisual.tsx      # Visualizador de infografías
│   │   └── GuideNavigation.tsx # Navegación entre secciones
│   │
│   └── [mantener estructura actual]
│
└── [resto de estructura actual]
```

**Sistema de Modos:**

```typescript
// src/contexts/ViewModeContext.tsx (NUEVO)
type ViewMode = 'formativo' | 'operativo' | 'auto';

interface ViewModeContext {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  isFormative: boolean;
  isOperational: boolean;
}
```

### 5.2 Capacidades Actuales de la App

**✅ Permite Capa Visual Alternativa:**

- **Sistema de temas:** next-themes ya implementado
- **Componentes modulares:** shadcn/ui permite variantes
- **CSS variables:** Sistema de variables permite temas alternativos
- **Tailwind:** Utility classes permiten variaciones rápidas

**✅ Permite Nuevo Layout:**

- **React Router:** Permite layouts por ruta
- **Componentes aislados:** Layout components son independientes
- **Estructura flexible:** App.tsx puede envolver diferentes layouts

**⚠️ Limitaciones Actuales:**

- **Layout único:** App.tsx tiene un solo layout hardcodeado
- **Sin sistema de modos:** No hay diferenciación formativo/operativo
- **Rutas fijas:** No hay rutas dinámicas para guías de refuerzo
- **MarkdownViewer único:** Un solo componente para todo el Markdown

### 5.3 Información Adicional Necesaria

**Antes de Empezar el Rediseño, Necesitamos:**

1. **Requisitos de Usuario:**
   - ¿Cómo debe diferenciarse visualmente "Modo Formación" vs "Modo Operativo"?
   - ¿Qué elementos visuales son críticos para cada modo?
   - ¿Hay preferencias de layout (sidebar, tabs, accordion)?

2. **Estructura de Contenido:**
   - ¿Cómo se accederá a las guías de refuerzo? (ruta, menú, búsqueda)
   - ¿Las guías tendrán navegación entre secciones?
   - ¿Habrá índice de guías o solo acceso directo?

3. **Diseño Visual:**
   - ¿Paleta de colores diferente para modo formativo?
   - ¿Tipografía diferente?
   - ¿Espaciado y densidad de información diferente?

4. **Funcionalidades:**
   - ¿Las guías tendrán interactividad? (simulaciones, quizzes)
   - ¿Habrá progreso de lectura?
   - ¿Favoritos específicos para guías?

5. **Rendimiento:**
   - ¿Cuántas guías habrá aproximadamente?
   - ¿Se cargarán todas o bajo demanda?
   - ¿Necesitan búsqueda específica?

6. **Compatibilidad:**
   - ¿Debe funcionar offline? (PWA)
   - ¿Compatibilidad con navegadores específicos?
   - ¿Restricciones de tamaño de bundle?

### 5.4 Recomendaciones para el Rediseño

**Estrategia Recomendada:**

1. **Fase 1 - Preparación:**
   - Crear copia segura
   - Documentar estructura actual (este documento)
   - Definir requisitos de diseño

2. **Fase 2 - Infraestructura:**
   - Crear sistema de modos (contexto React)
   - Crear layouts alternativos
   - Crear rutas para guías de refuerzo

3. **Fase 3 - Componentes:**
   - Crear componentes específicos de guías
   - Extender MarkdownViewer o crear GuideViewer
   - Implementar navegación entre secciones

4. **Fase 4 - Integración:**
   - Integrar guías en el sistema de rutas
   - Conectar con sistema de búsqueda
   - Añadir a menús y navegación

5. **Fase 5 - Refinamiento:**
   - Ajustar estilos y UX
   - Optimizar rendimiento
   - Testing completo

**Principios de Diseño:**

- ✅ **No romper funcionalidad existente**
- ✅ **Mantener compatibilidad con PWA**
- ✅ **Preservar accesibilidad y usabilidad con guantes**
- ✅ **Mantener rendimiento (lazy loading, code splitting)**
- ✅ **Separar concerns (lógica, presentación, datos)**

---

## Resumen Ejecutivo

### Estado Actual

- ✅ **Arquitectura sólida:** React + TypeScript + Tailwind + shadcn/ui
- ✅ **Separación de concerns:** Lógica, presentación y contenido separados
- ✅ **Componentes modulares:** Base reutilizable con shadcn/ui
- ⚠️ **Layout acoplado:** App.tsx tiene estructura fija
- ⚠️ **Sin sistema de modos:** No hay diferenciación formativo/operativo
- ❌ **Guías no implementadas:** Existen archivos pero no hay visualización

### Puntos Críticos

1. **App.tsx** - Componente raíz, NO tocar sin copia
2. **Layout components** - Estructura visual global
3. **manual-index.ts** - Estructura de datos crítica
4. **MarkdownViewer** - Renderizado de contenido
5. **tailwind.config.ts** - Sistema de diseño

### Próximos Pasos Recomendados

1. ✅ **Crear copia segura:** `guia-tes-ui-experimental`
2. ✅ **Documentar requisitos:** Definir diseño de guías de refuerzo
3. ⏳ **Diseñar arquitectura:** Sistema de modos y layouts
4. ⏳ **Implementar gradualmente:** Sin romper funcionalidad existente

---

**Documento generado:** Análisis completo de estructura frontend
**Fecha:** 2025-01-XX
**Estado:** Listo para iniciar rediseño con seguridad

