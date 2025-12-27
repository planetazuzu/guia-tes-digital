# Arquitectura para Guías de Refuerzo - EMERGES TES
**Diseño de Sistema Paralelo para Modo Formativo**

---

## 1️⃣ DIAGNÓSTICO TÉCNICO (Solo Lectura)

### 1.1 Partes REUTILIZABLES Sin Cambios

**✅ Componentes UI Base (shadcn/ui)**
- **Ubicación:** `src/components/ui/` (51 componentes)
- **Razón:** Componentes modulares, bien diseñados, independientes
- **Uso:** Todos los componentes (Button, Card, Badge, Tabs, etc.)
- **Riesgo:** ⚠️ Ninguno - Son componentes base

**✅ Sistema de Variables CSS**
- **Ubicación:** `src/index.css`
- **Razón:** Centralizado, permite cambios globales sin tocar componentes
- **Uso:** Variables de color, espaciado, tipografía
- **Riesgo:** ⚠️ Ninguno - Sistema de diseño base

**✅ Hooks Personalizados**
- **Ubicación:** `src/hooks/`
- **Componentes:**
  - `useFavorites.ts` - Gestión de favoritos
  - `useSearchHistory.ts` - Historial de búsquedas
  - `usePWAInstall.ts` - Instalación PWA
  - `useServiceWorker.ts` - Service Worker
- **Razón:** Lógica reutilizable, bien implementada
- **Uso:** Favoritos y historial para guías de refuerzo
- **Riesgo:** ⚠️ Ninguno - Hooks independientes

**✅ Utilidades**
- **Ubicación:** `src/lib/utils.ts`, `src/utils/markdownUtils.ts`
- **Razón:** Funciones puras, sin dependencias de UI
- **Uso:** `cn()` para clases, procesamiento de Markdown
- **Riesgo:** ⚠️ Ninguno - Utilidades puras

**✅ Componentes Compartidos**
- **Ubicación:** `src/components/shared/`
- **Componentes:**
  - `Badge.tsx` - Badges con variantes
  - `EmergencyButton.tsx` - Botones de emergencia
- **Razón:** Componentes específicos del dominio, bien diseñados
- **Uso:** Badges para identificar tipo de guía, botones de navegación
- **Riesgo:** ⚠️ Ninguno - Componentes independientes

**✅ Sistema PWA**
- **Ubicación:** `public/sw.js`, `public/manifest.json`
- **Razón:** Sistema completo, funcional
- **Uso:** Guías de refuerzo funcionarán offline automáticamente
- **Riesgo:** ⚠️ Ninguno - Sistema independiente

### 1.2 Partes a ENVOLVER o EXTENDER (No Modificar)

**🔶 MarkdownViewer**
- **Ubicación:** `src/components/content/MarkdownViewer.tsx`
- **Estado Actual:** Carga archivos desde `public/`, renderiza Markdown
- **Estrategia:** Crear `GuideMarkdownViewer.tsx` que envuelva/extienda MarkdownViewer
- **Razón:** No modificar el existente, crear variante específica para guías
- **Extensión:**
  - Cargar desde `docs/consolidado/` (no `public/`)
  - Estilos específicos para guías (más espaciado, tipografía diferente)
  - Navegación entre secciones
  - Badges de "Modo Formación"
- **Riesgo:** ⚠️ Bajo - Nuevo componente, no toca el existente

**🔶 Layout Actual (App.tsx)**
- **Ubicación:** `src/App.tsx`
- **Estado Actual:** Layout único hardcodeado
- **Estrategia:** Crear `GuideLayout.tsx` nuevo, usar condicionalmente en App.tsx
- **Razón:** No modificar layout actual, agregar layout alternativo
- **Extensión:**
  - Layout específico para guías (más espaciado, sin BottomNav opcional)
  - Badge de "Modo Formación" visible
  - Navegación entre secciones de guía
- **Riesgo:** ⚠️ Medio - Requiere cambio mínimo en App.tsx (condicional)

**🔶 Sistema de Rutas**
- **Ubicación:** `src/App.tsx` (líneas 71-99)
- **Estado Actual:** Rutas hardcodeadas
- **Estrategia:** Agregar rutas nuevas sin modificar las existentes
- **Razón:** Rutas nuevas no afectan rutas existentes
- **Extensión:**
  - `/guia-refuerzo/:guia` - Índice de guía
  - `/guia-refuerzo/:guia/seccion/:numero` - Sección específica
- **Riesgo:** ⚠️ Bajo - Solo agregar, no modificar

**🔶 Header y BottomNav**
- **Ubicación:** `src/components/layout/Header.tsx`, `BottomNav.tsx`
- **Estado Actual:** Funcionales, visibles en todas las páginas
- **Estrategia:** Usar condicionalmente, ocultar BottomNav en guías si es necesario
- **Razón:** No modificar componentes, solo controlar visibilidad
- **Extensión:**
  - Badge de modo en Header (opcional)
  - Ocultar BottomNav en guías (opcional, según diseño)
- **Riesgo:** ⚠️ Bajo - Solo control de visibilidad

### 1.3 Partes NO Deben Tocarse

**🔴 App.tsx - Estructura Principal**
- **Razón:** Componente raíz, cualquier cambio puede romper toda la app
- **Estrategia:** Cambios mínimos y reversibles (condicionales)
- **Riesgo:** 🔴 Alto - Solo cambios condicionales seguros

**🔴 Componentes de Layout Actuales**
- **Componentes:** Header.tsx, BottomNav.tsx, Footer.tsx
- **Razón:** Usados en toda la app, cambios afectan todas las páginas
- **Estrategia:** No modificar, solo usar condicionalmente
- **Riesgo:** 🔴 Alto - No modificar directamente

**🔴 Páginas Existentes**
- **Ubicación:** `src/pages/`
- **Razón:** Funcionales, no deben romperse
- **Estrategia:** No tocar, crear páginas nuevas
- **Riesgo:** 🔴 Alto - No modificar

**🔴 Estructura de Datos Existente**
- **Ubicación:** `src/data/procedures.ts`, `drugs.ts`, `manual-index.ts`
- **Razón:** Usados por páginas existentes
- **Estrategia:** Crear nuevos archivos de datos para guías
- **Riesgo:** 🔴 Alto - No modificar

**🔴 Sistema de Búsqueda Actual**
- **Ubicación:** `src/components/layout/SearchModal.tsx`
- **Razón:** Funcional, usado en toda la app
- **Estrategia:** No modificar, extender después si es necesario
- **Riesgo:** 🔴 Alto - No modificar inicialmente

### 1.4 Patrones Visuales Reutilizables

**✅ Patrón: Card Expandible**
- **Componente:** ProcedureCard, DrugCard
- **Aplicación:** Cards de guías de refuerzo con secciones expandibles
- **Ventaja:** Patrón conocido, consistente con app actual

**✅ Patrón: Tabs Horizontales**
- **Componente:** RCP.tsx, Farmacos.tsx, Herramientas.tsx
- **Aplicación:** Tabs para navegar entre secciones de guía (1-8)
- **Ventaja:** Patrón conocido, mobile-friendly

**✅ Patrón: Header de Página**
- **Componente:** RCP.tsx, Ictus.tsx
- **Aplicación:** Header con icono, título, subtítulo para guías
- **Ventaja:** Consistente con páginas existentes

**✅ Patrón: Navegación Anterior/Siguiente**
- **Componente:** ManualViewer.tsx
- **Aplicación:** Navegación entre secciones de guía
- **Ventaja:** Patrón conocido, útil para contenido largo

**✅ Patrón: Badge de Prioridad**
- **Componente:** Badge.tsx
- **Aplicación:** Badge "Modo Formación" para diferenciar de operativo
- **Ventaja:** Consistente con sistema de badges existente

**✅ Patrón: Empty State**
- **Componente:** SearchModal.tsx, Farmacos.tsx
- **Aplicación:** Estados vacíos en búsqueda de guías
- **Ventaja:** Consistente con UX actual

---

## 2️⃣ ARQUITECTURA PARALELA PROPUESTA

### 2.1 Estructura de Carpetas Nueva

```
src/
├── layouts/                          # NUEVO: Layouts alternativos
│   ├── DefaultLayout.tsx            # Layout actual (wrapper)
│   └── GuideLayout.tsx              # Layout específico para guías
│
├── views/                            # NUEVO: Vistas por modo
│   ├── formativo/                   # Vistas de modo formativo
│   │   ├── GuideIndex.tsx           # Índice de guías disponibles
│   │   ├── GuideViewer.tsx          # Visualizador de guía completa
│   │   └── GuideSectionViewer.tsx   # Visualizador de sección individual
│   │
│   └── operativo/                   # Vistas de modo operativo (actual)
│       └── [mantener estructura actual]
│
├── components/
│   ├── guide/                        # NUEVO: Componentes específicos de guías
│   │   ├── GuideCard.tsx            # Card de guía en lista
│   │   ├── GuideSectionCard.tsx     # Card de sección expandible
│   │   ├── GuideNavigation.tsx      # Navegación entre secciones
│   │   ├── GuideHeader.tsx          # Header específico de guía
│   │   ├── GuideMarkdownViewer.tsx  # Viewer de Markdown para guías
│   │   └── GuideModeBadge.tsx       # Badge "Modo Formación"
│   │
│   └── [mantener estructura actual]
│
├── data/
│   ├── guides-index.ts              # NUEVO: Índice de guías de refuerzo
│   └── [mantener estructura actual]
│
└── [resto de estructura actual]
```

### 2.2 Componentes Nuevos Necesarios

**1. GuideLayout.tsx**
- **Propósito:** Layout específico para guías de refuerzo
- **Características:**
  - Header con badge "Modo Formación"
  - Sin BottomNav (o opcional)
  - Más espaciado vertical
  - Navegación entre secciones visible
- **Dependencias:** Header (reutilizado), Footer (reutilizado)

**2. GuideIndex.tsx**
- **Propósito:** Lista de guías de refuerzo disponibles
- **Características:**
  - Cards de guías con iconos
  - Búsqueda/filtrado
  - Badge "Modo Formación"
- **Dependencias:** GuideCard, Badge, SearchModal (reutilizado)

**3. GuideViewer.tsx**
- **Propósito:** Visualizador de guía completa con navegación
- **Características:**
  - Tabs para secciones (1-8)
  - Navegación anterior/siguiente
  - Breadcrumbs opcionales
  - Enlace a protocolo operativo
- **Dependencias:** GuideMarkdownViewer, GuideNavigation, Tabs (reutilizado)

**4. GuideSectionViewer.tsx**
- **Propósito:** Visualizador de sección individual
- **Características:**
  - Carga sección específica
  - Navegación anterior/siguiente
  - Enlace a protocolo operativo
- **Dependencias:** GuideMarkdownViewer, GuideNavigation

**5. GuideMarkdownViewer.tsx**
- **Propósito:** Viewer de Markdown específico para guías
- **Características:**
  - Extiende MarkdownViewer
  - Carga desde `docs/consolidado/`
  - Estilos específicos (más espaciado, tipografía)
  - Badges de "Modo Formación"
- **Dependencias:** MarkdownViewer (envuelto)

**6. GuideCard.tsx**
- **Propósito:** Card de guía en lista
- **Características:**
  - Icono, título, descripción
  - Badge "Modo Formación"
  - Enlace a guía
- **Dependencias:** Badge, Card (reutilizado)

**7. GuideNavigation.tsx**
- **Propósito:** Navegación entre secciones
- **Características:**
  - Botones anterior/siguiente
  - Indicador de sección actual
  - Enlace a protocolo operativo
- **Dependencias:** Button, ChevronLeft, ChevronRight (reutilizado)

**8. GuideModeBadge.tsx**
- **Propósito:** Badge distintivo "Modo Formación"
- **Características:**
  - Color distintivo (azul/verde, diferente de emergencia)
  - Texto claro
  - Visible en Header y páginas
- **Dependencias:** Badge (reutilizado)

### 2.3 Componentes Actuales Reutilizados

**✅ Componentes UI Base:**
- Button, Card, Badge, Tabs, Separator
- Todos los componentes de `src/components/ui/`

**✅ Componentes de Layout:**
- Header (con badge opcional)
- Footer (reutilizado)
- SearchModal (reutilizado, extender después)

**✅ Componentes Compartidos:**
- Badge (reutilizado, nueva variante "formativo")
- BackButton (reutilizado)

**✅ Hooks:**
- useFavorites (para favoritar guías)
- useSearchHistory (para historial de guías)

### 2.4 Conexión con Archivos Markdown

**Estructura de Archivos:**
```
docs/consolidado/
├── SECCION_01_ABCDE_OPERATIVO.md
├── SECCION_02_ABCDE_OPERATIVO.md
├── ...
├── SECCION_08_ABCDE_OPERATIVO.md
├── SECCION_01_RCP_ADULTO_SVB.md
├── ...
```

**Estrategia de Carga:**
1. **Índice de Guías:** `src/data/guides-index.ts`
   - Define guías disponibles
   - Mapea guía → archivos de secciones
   - Metadatos (título, descripción, icono)

2. **Carga Dinámica:**
   - GuideMarkdownViewer carga desde `docs/consolidado/`
   - Ruta: `/docs/consolidado/SECCION_XX_NOMBRE.md`
   - Fetch en runtime (igual que MarkdownViewer actual)

3. **Navegación:**
   - GuideNavigation maneja navegación entre secciones
   - URLs: `/guia-refuerzo/:guia/seccion/:numero`

### 2.5 Rutas Nuevas Propuestas

**Rutas para Guías de Refuerzo:**
```typescript
/guia-refuerzo                          → GuideIndex (lista de guías)
/guia-refuerzo/:guia                    → GuideViewer (guía completa con tabs)
/guia-refuerzo/:guia/seccion/:numero    → GuideSectionViewer (sección individual)
```

**Ejemplos:**
- `/guia-refuerzo/abcde-operativo` → Guía ABCDE completa
- `/guia-refuerzo/abcde-operativo/seccion/1` → Sección 1 de ABCDE
- `/guia-refuerzo/rcp-adulto-svb` → Guía RCP Adulto SVB completa

**Integración en App.tsx:**
```typescript
// Agregar después de rutas existentes, sin modificar las actuales
<Route path="/guia-refuerzo" element={<GuideIndex />} />
<Route path="/guia-refuerzo/:guia" element={<GuideViewer />} />
<Route path="/guia-refuerzo/:guia/seccion/:numero" element={<GuideSectionViewer />} />
```

---

## 3️⃣ PRIMEROS PASOS IMPLEMENTABLES (SEGUROS)

### 3.1 Checklist de Pasos Iniciales

**Fase 1: Preparación (Sin Código)**
- [ ] Crear carpeta `src/layouts/`
- [ ] Crear carpeta `src/views/formativo/`
- [ ] Crear carpeta `src/components/guide/`
- [ ] Crear archivo `src/data/guides-index.ts` (estructura vacía)

**Fase 2: Índice de Guías (Datos)**
- [ ] Crear `src/data/guides-index.ts` con estructura TypeScript
- [ ] Definir interface `Guide` y `GuideSection`
- [ ] Agregar 2-3 guías de ejemplo (ABCDE, RCP)
- [ ] Mapear archivos Markdown a secciones

**Fase 3: Componentes Base**
- [ ] Crear `GuideModeBadge.tsx` (badge simple)
- [ ] Crear `GuideCard.tsx` (card básico)
- [ ] Crear `GuideMarkdownViewer.tsx` (wrapper de MarkdownViewer)

**Fase 4: Layout de Prueba**
- [ ] Crear `GuideLayout.tsx` (layout básico)
- [ ] Incluir Header con badge
- [ ] Sin BottomNav (o condicional)
- [ ] Contenedor con más espaciado

**Fase 5: Vista de Prueba**
- [ ] Crear `GuideIndex.tsx` (lista simple)
- [ ] Mostrar 2-3 guías con GuideCard
- [ ] Sin funcionalidad completa, solo visual

**Fase 6: Integración Mínima**
- [ ] Agregar ruta `/guia-refuerzo` en App.tsx
- [ ] Usar GuideLayout condicionalmente
- [ ] Probar que no rompe rutas existentes

### 3.2 Código Inicial (Implementable Ya)

#### Paso 1: Estructura de Datos (`src/data/guides-index.ts`)

```typescript
export interface GuideSection {
  numero: number;
  titulo: string;
  archivo: string; // Ej: "SECCION_01_ABCDE_OPERATIVO.md"
  ruta: string; // Ej: "/docs/consolidado/SECCION_01_ABCDE_OPERATIVO.md"
}

export interface Guide {
  id: string; // Ej: "abcde-operativo"
  titulo: string; // Ej: "ABCDE Operativo"
  descripcion: string;
  icono: string; // Nombre de icono de lucide-react
  secciones: GuideSection[];
  protocoloOperativo?: {
    titulo: string;
    ruta: string; // Ej: "/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.2"
  };
}

export const guidesIndex: Guide[] = [
  {
    id: "abcde-operativo",
    titulo: "ABCDE Operativo",
    descripcion: "Guía de refuerzo para comprender el enfoque ABCDE como estructura mental de priorización",
    icono: "Activity",
    secciones: [
      { numero: 1, titulo: "Introducción y Contexto", archivo: "SECCION_01_ABCDE_OPERATIVO.md", ruta: "/docs/consolidado/SECCION_01_ABCDE_OPERATIVO.md" },
      { numero: 2, titulo: "Explicación Clínica y Fisiopatología", archivo: "SECCION_02_ABCDE_OPERATIVO.md", ruta: "/docs/consolidado/SECCION_02_ABCDE_OPERATIVO.md" },
      // ... resto de secciones
    ],
    protocoloOperativo: {
      titulo: "ABCDE Operativo",
      ruta: "/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.2"
    }
  },
  // ... más guías
];

export function getGuideById(id: string): Guide | undefined {
  return guidesIndex.find(g => g.id === id);
}

export function getGuideSection(guideId: string, numero: number): GuideSection | undefined {
  const guide = getGuideById(guideId);
  return guide?.secciones.find(s => s.numero === numero);
}
```

#### Paso 2: Badge de Modo (`src/components/guide/GuideModeBadge.tsx`)

```typescript
import Badge from '@/components/shared/Badge';

export const GuideModeBadge = () => {
  return (
    <Badge variant="info" className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
      Modo Formación
    </Badge>
  );
};
```

#### Paso 3: Layout de Guías (`src/layouts/GuideLayout.tsx`)

```typescript
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GuideModeBadge } from '@/components/guide/GuideModeBadge';

interface GuideLayoutProps {
  children: React.ReactNode;
  onSearchClick: () => void;
  onMenuClick: () => void;
}

export const GuideLayout = ({ children, onSearchClick, onMenuClick }: GuideLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onSearchClick={onSearchClick}
        onMenuClick={onMenuClick}
      />
      
      <main className="pt-14 pb-8 flex-1">
        <div className="container max-w-2xl mx-auto py-6">
          <div className="mb-4">
            <GuideModeBadge />
          </div>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};
```

#### Paso 4: Card de Guía (`src/components/guide/GuideCard.tsx`)

```typescript
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Guide } from '@/data/guides-index';
import { GuideModeBadge } from './GuideModeBadge';
import * as Icons from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
}

export const GuideCard = ({ guide }: GuideCardProps) => {
  const Icon = (Icons as any)[guide.icono] as LucideIcon || Icons.BookOpen;

  return (
    <Link
      to={`/guia-refuerzo/${guide.id}`}
      className="block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground text-lg">{guide.titulo}</h3>
            <GuideModeBadge />
          </div>
          <p className="text-muted-foreground text-sm mb-3">{guide.descripcion}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{guide.secciones.length} secciones</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
```

#### Paso 5: Índice de Guías (`src/views/formativo/GuideIndex.tsx`)

```typescript
import { guidesIndex } from '@/data/guides-index';
import { GuideCard } from '@/components/guide/GuideCard';

export const GuideIndex = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Guías de Refuerzo</h1>
        <p className="text-muted-foreground">
          Contenido formativo para comprensión profunda de protocolos
        </p>
      </div>

      <div className="space-y-4">
        {guidesIndex.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
};
```

#### Paso 6: Integración Mínima en App.tsx

```typescript
// Agregar al inicio del archivo (imports)
import { GuideLayout } from '@/layouts/GuideLayout';
import { GuideIndex } from '@/views/formativo/GuideIndex';

// Agregar en el componente App (dentro de Routes, después de rutas existentes)
<Route
  path="/guia-refuerzo"
  element={
    <GuideLayout
      onSearchClick={() => setIsSearchOpen(true)}
      onMenuClick={() => setIsMenuOpen(true)}
    >
      <GuideIndex />
    </GuideLayout>
  }
/>
```

### 3.3 Verificación de Seguridad

**✅ No Modifica:**
- Layout actual (DefaultLayout sigue igual)
- Rutas existentes (solo agrega nuevas)
- Componentes existentes (solo crea nuevos)
- Estructura de datos existente (solo crea nuevo archivo)

**✅ Fácil de Revertir:**
- Eliminar carpeta `src/layouts/`
- Eliminar carpeta `src/views/formativo/`
- Eliminar carpeta `src/components/guide/`
- Eliminar archivo `src/data/guides-index.ts`
- Eliminar ruta en App.tsx

**✅ Incremental:**
- Cada paso es independiente
- Puede probarse por separado
- No requiere funcionalidad completa

---

## Resumen Ejecutivo

### Diagnóstico
- **Reutilizables:** Componentes UI, hooks, utilidades, sistema PWA
- **Extensibles:** MarkdownViewer (wrapper), Layout (nuevo), Rutas (agregar)
- **No tocar:** App.tsx estructura, componentes layout, páginas existentes
- **Patrones:** Cards, tabs, navegación anterior/siguiente

### Arquitectura
- **Nuevas carpetas:** `layouts/`, `views/formativo/`, `components/guide/`
- **Nuevos componentes:** 8 componentes específicos de guías
- **Rutas nuevas:** `/guia-refuerzo`, `/guia-refuerzo/:guia`, `/guia-refuerzo/:guia/seccion/:numero`
- **Datos:** `guides-index.ts` mapea guías a archivos Markdown

### Pasos Iniciales
1. Crear estructura de carpetas
2. Crear `guides-index.ts` con datos
3. Crear componentes base (Badge, Card, Layout)
4. Crear vista de prueba (GuideIndex)
5. Integrar ruta mínima en App.tsx

**Estado:** Listo para implementación incremental y segura

---

**Documento generado:** Arquitectura para Guías de Refuerzo
**Fecha:** 2025-01-XX
**Estado:** Diseño completo, listo para implementación

