# PLAN DE CONVERSIÓN: APP MANUAL TES DIGITAL COMPLETA

**Fecha:** 2025-12-17  
**Estado Actual:** App básica con datos estáticos  
**Objetivo:** Guía TES completa con 93 capítulos integrados

---

## 📊 ESTADO ACTUAL DE LA APP

### ✅ Lo que YA tiene:
- **Framework:** React + Vite + TypeScript
- **UI Components:** shadcn/ui (componentes completos)
- **Navegación básica:** React Router con rutas simples
- **Búsqueda básica:** SearchModal que busca en datos estáticos (`procedures.ts`, `drugs.ts`)
- **Menú lateral:** MenuSheet con opciones básicas
- **Navegación inferior:** BottomNav con acceso rápido
- **Páginas funcionales:** Index, SoporteVital, Farmacos, Herramientas, Material, Telefono, Comunicacion
- **Datos estáticos:** Archivos TypeScript con procedimientos, fármacos, calculadoras

### ❌ Lo que NO tiene (y necesita):
- **Integración con archivos .md:** No carga ni renderiza los 93 capítulos del manual
- **Navegación jerárquica:** No hay menú lateral organizado por partes/bloques
- **Sistema de favoritos:** Opción en menú pero sin funcionalidad
- **Progreso de lectura:** No hay tracking de capítulos leídos
- **Búsqueda en contenido:** Solo busca en datos estáticos, no en .md
- **Acceso a protocolos críticos:** Botones básicos pero no integrados con manual completo
- **Funcionalidad offline:** PWA mencionada pero no implementada completamente
- **Sistema de usuarios:** No hay login ni perfiles

---

## ✅ VERIFICACIÓN: ARCHIVOS .MD DEL ÍNDICE

### Resultado: ✅ **TODOS LOS ARCHIVOS EXISTEN**

- **Total según índice:** 93 capítulos
- **Archivos .md encontrados:** 93 archivos
- **Archivos faltantes:** 0
- **Completitud:** 100%

**Ubicación:** `manual-tes/TES_Manual_Digital/BLOQUE_X_*/`

Todos los capítulos del índice tienen su archivo .md correspondiente y están correctamente organizados en 15 bloques.

---

## 🔍 IDENTIFICACIÓN DE HUECOS EN EL CONTENIDO

### Análisis de Completitud por Bloque:

| Bloque | Capítulos Esperados | Archivos Encontrados | Estado |
|--------|-------------------|---------------------|--------|
| Bloque 0 | 1 | 1 | ✅ Completo |
| Bloque 1 | 4 | 4 | ✅ Completo |
| Bloque 2 | 14 | 14 | ✅ Completo |
| Bloque 3 | 28 | 28 | ✅ Completo |
| Bloque 4 | 11 | 11 | ✅ Completo |
| Bloque 5 | 10 | 10 | ✅ Completo |
| Bloque 6 | 8 | 8 | ✅ Completo |
| Bloque 7 | 6 | 6 | ✅ Completo |
| Bloque 8 | 5 | 5 | ✅ Completo |
| Bloque 9 | 1 | 1 | ✅ Completo |
| Bloque 10 | 1 | 1 | ✅ Completo |
| Bloque 11 | 1 | 1 | ✅ Completo |
| Bloque 12 | 1 | 1 | ✅ Completo |
| Bloque 13 | 1 | 1 | ✅ Completo |
| Bloque 14 | 1 | 1 | ✅ Completo |
| **TOTAL** | **93** | **93** | **✅ 100%** |

### Huecos Identificados:

#### 1. Contenido Visual (Prioridad Media)
- ❌ **No hay imágenes/diagramas:** Los archivos .md no contienen referencias a imágenes
- 💡 **Recomendación:** Considerar agregar diagramas de flujo, ilustraciones anatómicas, tablas visuales

#### 2. Contenido Interactivo (Prioridad Alta)
- ❌ **No hay tests/autoevaluaciones:** No hay sistema de preguntas por capítulo
- 💡 **Recomendación:** Crear tests por bloque para autoevaluación

#### 3. Contenido de Referencia Rápida (Prioridad Alta)
- ⚠️ **Algunos capítulos son muy extensos:** Pueden necesitar resúmenes ejecutivos
- 💡 **Recomendación:** Extraer "puntos clave" y "checklists rápidos" de cada capítulo

#### 4. Integración con App Actual (Prioridad Crítica)
- ❌ **Los datos estáticos (`procedures.ts`, `drugs.ts`) no están sincronizados con los .md**
- 💡 **Recomendación:** Migrar datos estáticos a .md o generar TypeScript desde .md

---

## 📐 ESTRUCTURA DE DATOS RECOMENDADA PARA LA APP

### 1. Archivo de Índice Principal (`src/data/manual-index.ts`)

```typescript
export interface Capitulo {
  id: string; // "1.1.1", "2.1.3", etc.
  titulo: string;
  subtitulo?: string;
  parte: number;
  parteNombre: string;
  bloque: number;
  bloqueNombre: string;
  rutaArchivo: string; // Ruta relativa al archivo .md
  rutaUrl: string; // "/manual/parte-i/bloque-0/1.1.1"
  nivelDificultad: 'basico' | 'intermedio' | 'avanzado';
  importancia: 'alta' | 'media' | 'baja';
  palabrasClave: string[];
  tipoContenido: 'formativo' | 'operativo' | 'referencia';
  tiempoLectura: number; // minutos estimados
  navegacion: {
    anterior: string | null; // ID del capítulo anterior
    siguiente: string | null; // ID del capítulo siguiente
    relacionados: string[]; // IDs de capítulos relacionados
  };
  metadata: {
    version: string;
    fechaActualizacion: string;
    autor: string;
  };
}

export interface Bloque {
  id: number;
  nombre: string;
  descripcion: string;
  capitulos: Capitulo[];
  icono?: string;
}

export interface Parte {
  id: number;
  nombre: string;
  descripcion: string;
  bloques: Bloque[];
  icono?: string;
}

export const manualIndex: Parte[] = [
  {
    id: 1,
    nombre: "Fundamentos y Evaluación Inicial",
    descripcion: "Conceptos básicos y procedimientos de evaluación",
    bloques: [
      {
        id: 0,
        nombre: "Fundamentos de Emergencias Prehospitalarias",
        descripcion: "Marco conceptual y operativo",
        capitulos: [
          {
            id: "1.1.1",
            titulo: "Fundamentos de Emergencias",
            parte: 1,
            parteNombre: "Fundamentos y Evaluación Inicial",
            bloque: 0,
            bloqueNombre: "Fundamentos de Emergencias Prehospitalarias",
            rutaArchivo: "manual-tes/TES_Manual_Digital/BLOQUE_0_FUNDAMENTOS/BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md",
            rutaUrl: "/manual/parte-i/bloque-0/1.1.1",
            nivelDificultad: "basico",
            importancia: "alta",
            palabrasClave: ["emergencias", "soporte vital", "cadena supervivencia"],
            tipoContenido: "formativo",
            tiempoLectura: 15,
            navegacion: {
              anterior: null,
              siguiente: "1.2.1",
              relacionados: ["1.2.1", "2.1.1"]
            },
            metadata: {
              version: "1.0",
              fechaActualizacion: "2024-12-13",
              autor: "Manual TES Digital"
            }
          }
          // ... resto de capítulos
        ]
      }
      // ... resto de bloques
    ]
  }
  // ... resto de partes
];
```

### 2. Sistema de Favoritos (`src/data/favorites.ts`)

```typescript
export interface Favorito {
  capituloId: string;
  fechaAgregado: string;
  etiquetas?: string[];
}

export interface ProgresoLectura {
  capituloId: string;
  ultimaLectura: string;
  progreso: number; // 0-100
  tiempoLectura: number; // minutos totales
  completado: boolean;
}

// Almacenamiento en localStorage
export const favoritesStorage = {
  get: (): Favorito[] => {
    const data = localStorage.getItem('manual-favorites');
    return data ? JSON.parse(data) : [];
  },
  add: (capituloId: string) => {
    const favorites = favoritesStorage.get();
    if (!favorites.find(f => f.capituloId === capituloId)) {
      favorites.push({ capituloId, fechaAgregado: new Date().toISOString() });
      localStorage.setItem('manual-favorites', JSON.stringify(favorites));
    }
  },
  remove: (capituloId: string) => {
    const favorites = favoritesStorage.get().filter(f => f.capituloId !== capituloId);
    localStorage.setItem('manual-favorites', JSON.stringify(favorites));
  },
  has: (capituloId: string): boolean => {
    return favoritesStorage.get().some(f => f.capituloId === capituloId);
  }
};

export const progressStorage = {
  get: (): ProgresoLectura[] => {
    const data = localStorage.getItem('manual-progress');
    return data ? JSON.parse(data) : [];
  },
  update: (capituloId: string, progreso: Partial<ProgresoLectura>) => {
    const progress = progressStorage.get();
    const index = progress.findIndex(p => p.capituloId === capituloId);
    if (index >= 0) {
      progress[index] = { ...progress[index], ...progreso };
    } else {
      progress.push({
        capituloId,
        ultimaLectura: new Date().toISOString(),
        progreso: 0,
        tiempoLectura: 0,
        completado: false,
        ...progreso
      });
    }
    localStorage.setItem('manual-progress', JSON.stringify(progress));
  },
  getCapitulo: (capituloId: string): ProgresoLectura | null => {
    return progressStorage.get().find(p => p.capituloId === capituloId) || null;
  }
};
```

### 3. Sistema de Búsqueda (`src/data/search-index.ts`)

```typescript
export interface SearchResult {
  capituloId: string;
  titulo: string;
  snippet: string; // Fragmento de texto relevante
  tipo: 'titulo' | 'contenido' | 'palabra_clave';
  relevancia: number; // Score de relevancia
  rutaUrl: string;
}

// Índice de búsqueda pre-generado desde los .md
export const searchIndex: Map<string, SearchResult[]> = new Map();

// Función para buscar en contenido
export function buscarEnManual(query: string): SearchResult[] {
  const resultados: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  
  // Buscar en títulos
  manualIndex.forEach(parte => {
    parte.bloques.forEach(bloque => {
      bloque.capitulos.forEach(capitulo => {
        if (capitulo.titulo.toLowerCase().includes(queryLower)) {
          resultados.push({
            capituloId: capitulo.id,
            titulo: capitulo.titulo,
            snippet: capitulo.titulo,
            tipo: 'titulo',
            relevancia: 10,
            rutaUrl: capitulo.rutaUrl
          });
        }
        
        // Buscar en palabras clave
        if (capitulo.palabrasClave.some(kw => kw.toLowerCase().includes(queryLower))) {
          resultados.push({
            capituloId: capitulo.id,
            titulo: capitulo.titulo,
            snippet: `Palabra clave: ${query}`,
            tipo: 'palabra_clave',
            relevancia: 8,
            rutaUrl: capitulo.rutaUrl
          });
        }
      });
    });
  });
  
  // TODO: Buscar en contenido de archivos .md (requiere carga de contenido)
  
  return resultados.sort((a, b) => b.relevancia - a.relevancia);
}
```

### 4. Protocolos Críticos (`src/data/protocolos-criticos.ts`)

```typescript
export interface ProtocoloCritico {
  id: string;
  titulo: string;
  capituloId: string; // ID del capítulo relacionado
  prioridad: 'critica' | 'alta' | 'media';
  icono: string;
  color: string;
  accesoRapido: boolean; // Mostrar en home
  tiempoEstimado: number; // segundos para ejecutar
}

export const protocolosCriticos: ProtocoloCritico[] = [
  {
    id: 'rcp-adulto',
    titulo: 'RCP Adulto',
    capituloId: '2.1.3',
    prioridad: 'critica',
    icono: 'Heart',
    color: 'red',
    accesoRapido: true,
    tiempoEstimado: 30
  },
  {
    id: 'ovace-adulto',
    titulo: 'OVACE Adulto',
    capituloId: '2.1.8',
    prioridad: 'critica',
    icono: 'Wind',
    color: 'red',
    accesoRapido: true,
    tiempoEstimado: 20
  },
  {
    id: 'abcde',
    titulo: 'ABCDE Operativo',
    capituloId: '1.2.2',
    prioridad: 'alta',
    icono: 'Activity',
    color: 'orange',
    accesoRapido: true,
    tiempoEstimado: 60
  },
  // ... más protocolos
];
```

---

## 🧭 SISTEMA DE NAVEGACIÓN RECOMENDADO

### 1. Menú Lateral Jerárquico (`src/components/layout/ManualSidebar.tsx`)

**Características:**
- Expandible/colapsable por niveles (Parte → Bloque → Capítulo)
- Indicador visual del capítulo actual
- Búsqueda integrada
- Filtros por parte/bloque
- Indicadores de progreso (capítulos leídos)
- Marcadores de favoritos

**Estructura:**
```
📚 Manual TES Digital
├── 📖 Parte I: Fundamentos
│   ├── 🔹 Bloque 0: Fundamentos
│   │   └── ✅ 1.1.1 Fundamentos de Emergencias
│   └── 🔹 Bloque 1: Procedimientos Básicos
│       ├── ✅ 1.2.1 Constantes Vitales
│       ├── ⏳ 1.2.2 ABCDE Operativo (en progreso)
│       ├── ⭕ 1.2.3 Glasgow Operativo
│       └── ⭕ 1.2.4 Triage START
├── 💉 Parte II: Soporte Vital
│   └── ...
└── 🔍 Buscar...
```

### 2. Breadcrumbs (`src/components/layout/Breadcrumbs.tsx`)

```
Inicio > Parte I > Bloque 1 > 1.2.1 Constantes Vitales
```

**Funcionalidad:**
- Click en cualquier nivel para navegar
- Contexto visual de ubicación
- Navegación rápida a niveles superiores

### 3. Navegación Anterior/Siguiente

```tsx
<nav className="flex justify-between py-4 border-t">
  <Link to={capituloAnterior?.rutaUrl}>
    ← {capituloAnterior?.titulo}
  </Link>
  <Link to={capituloSiguiente?.rutaUrl}>
    {capituloSiguiente?.titulo} →
  </Link>
</nav>
```

### 4. Índice Rápido (Modal/Sidebar)

- Modal o sidebar deslizable
- Búsqueda instantánea
- Filtros por parte/bloque/tipo
- Acceso desde cualquier página (tecla `I`)

---

## 📱 FUNCIONALIDADES ADICIONALES RECOMENDADAS

### 1. Sistema de Favoritos
- ✅ Marcar capítulos como favoritos
- ✅ Carpeta de favoritos en menú
- ✅ Acceso rápido desde home
- ✅ Sincronización con localStorage

### 2. Progreso de Lectura
- ✅ Tracking de capítulos leídos
- ✅ Porcentaje de completitud por parte/bloque
- ✅ Historial de lectura
- ✅ Continuar leyendo desde donde se quedó

### 3. Búsqueda Avanzada
- ✅ Búsqueda por texto completo en contenido .md
- ✅ Filtros por parte, bloque, tipo de contenido
- ✅ Búsqueda por palabras clave
- ✅ Historial de búsquedas
- ✅ Sugerencias mientras escribes

### 4. Acceso Rápido a Protocolos Críticos
- ✅ Botones grandes en home para emergencias críticas
- ✅ Acceso directo desde cualquier página (botón flotante)
- ✅ Modo "emergencia" que muestra solo protocolos críticos
- ✅ Atajos de teclado (ej: `E` para emergencias)

### 5. Modo Offline (PWA)
- ✅ Service Worker para cache agresivo
- ✅ Instalación como app móvil
- ✅ Funcionamiento sin conexión
- ✅ Sincronización cuando hay conexión

### 6. Personalización
- ✅ Modo oscuro/claro
- ✅ Tamaño de fuente ajustable
- ✅ Notas/annotaciones por capítulo
- ✅ Marcadores personalizados

---

## 🎯 PLAN DE IMPLEMENTACIÓN POR FASES

### FASE 1: Integración Básica (Prioridad Crítica)

**Objetivo:** Conectar los 93 archivos .md con la app

1. **Crear sistema de carga de .md**
   - Instalar `react-markdown` o `marked`
   - Crear componente `MarkdownViewer`
   - Cargar archivos .md desde `public/` o importarlos

2. **Generar índice desde estructura**
   - Script para generar `manual-index.ts` desde estructura de carpetas
   - Mapear todos los 93 capítulos
   - Incluir metadatos básicos

3. **Crear rutas dinámicas**
   - Ruta `/manual/:parte/:bloque/:capitulo`
   - Componente `ManualViewer` que carga y renderiza .md
   - Navegación básica anterior/siguiente

**Tiempo estimado:** 2-3 días

### FASE 2: Navegación Jerárquica (Prioridad Alta)

**Objetivo:** Menú lateral completo y navegación intuitiva

1. **Crear ManualSidebar**
   - Componente jerárquico expandible
   - Integrar con `manual-index.ts`
   - Indicadores de progreso y favoritos

2. **Implementar Breadcrumbs**
   - Componente de migas de pan
   - Navegación por niveles

3. **Mejorar SearchModal**
   - Integrar búsqueda en `manual-index.ts`
   - Buscar en títulos y palabras clave
   - Resultados con contexto

**Tiempo estimado:** 3-4 días

### FASE 3: Funcionalidades Avanzadas (Prioridad Media)

**Objetivo:** Favoritos, progreso, búsqueda completa

1. **Sistema de Favoritos**
   - localStorage para persistencia
   - UI para marcar/desmarcar
   - Página de favoritos

2. **Tracking de Progreso**
   - localStorage para progreso
   - Indicadores visuales
   - Estadísticas de lectura

3. **Búsqueda en Contenido**
   - Indexar contenido de .md
   - Búsqueda full-text
   - Resultados con snippets

**Tiempo estimado:** 4-5 días

### FASE 4: Optimización y PWA (Prioridad Media)

**Objetivo:** Modo offline y optimización

1. **Service Worker**
   - Cache de archivos .md
   - Cache de assets
   - Estrategia offline-first

2. **Optimización de Carga**
   - Lazy loading de capítulos
   - Code splitting
   - Preload de capítulos críticos

**Tiempo estimado:** 2-3 días

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### Integración con .md
- [ ] Instalar librería de Markdown (`react-markdown` o `marked`)
- [ ] Crear componente `MarkdownViewer`
- [ ] Configurar carga de archivos .md
- [ ] Generar `manual-index.ts` desde estructura
- [ ] Crear rutas dinámicas `/manual/:parte/:bloque/:capitulo`
- [ ] Implementar navegación anterior/siguiente

### Navegación
- [ ] Crear `ManualSidebar` jerárquico
- [ ] Implementar Breadcrumbs
- [ ] Mejorar SearchModal con búsqueda en índice
- [ ] Crear página de índice rápido

### Funcionalidades
- [ ] Sistema de favoritos (localStorage)
- [ ] Tracking de progreso (localStorage)
- [ ] Búsqueda en contenido de .md
- [ ] Acceso rápido a protocolos críticos

### PWA y Optimización
- [ ] Configurar Service Worker
- [ ] Cache de archivos .md
- [ ] Lazy loading de capítulos
- [ ] Optimización de bundle

---

## 🎨 RECOMENDACIONES DE UX/UI

### Diseño Móvil-First
- Navegación optimizada para una mano
- Botones grandes y accesibles
- Swipe gestures para navegación
- Modo landscape para tablets

### Accesibilidad
- Contraste adecuado
- Tamaños de fuente legibles
- Navegación por teclado
- Screen reader friendly

### Performance
- Carga inicial < 2 segundos
- Transiciones suaves
- Sin lag al navegar
- Cache inteligente

---

## 📊 MEDIOS FALTANTES CON PRIORIDAD

### Resultado del Análisis: ✅ **NO HAY MEDIOS FALTANTES**

No se encontraron referencias a imágenes, videos o documentos en los archivos .md.

### Recomendaciones Futuras (si se agregan medios):

#### Prioridad Alta (si se agregan):
1. **Diagramas de flujo de protocolos** (RCP, ABCDE, etc.)
   - Formato: SVG o PNG de alta calidad
   - Ubicación: `public/assets/imagenes/diagramas/`
   - Referencia en .md: `![Diagrama RCP](../assets/imagenes/diagramas/rcp-flujo.svg)`

2. **Ilustraciones anatómicas** (para Bloque 2)
   - Formato: SVG o PNG
   - Ubicación: `public/assets/imagenes/anatomia/`
   - Referencia: `![Anatomía Columna](../assets/imagenes/anatomia/columna-vertebral.svg)`

#### Prioridad Media:
3. **Tablas visuales de fármacos**
   - Formato: PNG o SVG
   - Ubicación: `public/assets/imagenes/tablas/`

4. **Videos de técnicas** (opcional, futuro)
   - Formato: MP4 (optimizado para web)
   - Ubicación: `public/assets/videos/`

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

1. **Instalar dependencias necesarias:**
   ```bash
   npm install react-markdown remark-gfm rehype-highlight
   ```

2. **Crear estructura de datos:**
   - Generar `manual-index.ts` desde estructura de carpetas
   - Crear tipos TypeScript para capítulos/bloques/partes

3. **Crear componente MarkdownViewer:**
   - Componente que carga y renderiza .md
   - Estilos para Markdown
   - Navegación integrada

4. **Implementar rutas dinámicas:**
   - `/manual/parte-i/bloque-0/1.1.1`
   - Cargar archivo correspondiente
   - Renderizar con MarkdownViewer

5. **Crear ManualSidebar:**
   - Navegación jerárquica
   - Integración con manual-index

---

**Este plan proporciona una hoja de ruta completa para convertir la app actual en una guía TES completa con todos los 93 capítulos integrados.**
