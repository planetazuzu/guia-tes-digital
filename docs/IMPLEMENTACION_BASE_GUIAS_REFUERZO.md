# Implementación Base - Sistema de Guías de Refuerzo (Modo Formativo)

## ✅ Estado: COMPLETADO

La arquitectura paralela para el Modo Formativo está completamente implementada y lista para usar.

---

## 📁 Estructura de Carpetas Creada

```
src/
├── layouts/
│   ├── DefaultLayout.tsx      ✅ Wrapper del layout actual (modo operativo)
│   └── GuideLayout.tsx        ✅ Layout exclusivo para guías formativas
│
├── views/
│   └── formativo/
│       ├── GuideIndex.tsx     ✅ Lista de todas las guías
│       ├── GuideViewer.tsx     ✅ Visualizador completo de guía (con tabs)
│       └── GuideSectionViewer.tsx  ✅ Visualizador de sección individual
│
├── components/
│   └── guide/
│       ├── GuideCard.tsx      ✅ Card clicable para cada guía
│       ├── GuideHeader.tsx    ✅ Header de guía con icono y badge
│       ├── GuideNavigation.tsx ✅ Navegación anterior/siguiente
│       ├── GuideMarkdownViewer.tsx ✅ Wrapper de MarkdownViewer
│       └── GuideModeBadge.tsx ✅ Badge "Modo Formación"
│
└── data/
    └── guides-index.ts        ✅ Índice de guías con 2 guías configuradas
```

---

## 🛣️ Rutas Configuradas

Todas las rutas están integradas en `App.tsx` sin modificar las existentes:

- ✅ `/guia-refuerzo` → Lista de guías (GuideIndex)
- ✅ `/guia-refuerzo/:guia` → Visualizador completo (GuideViewer con tabs)
- ✅ `/guia-refuerzo/:guia/seccion/:numero` → Sección individual (GuideSectionViewer)

---

## 📊 Guías Configuradas

### 1. ABCDE Operativo
- **ID:** `abcde-operativo`
- **8 secciones:** Todas configuradas
- **Protocolo operativo:** `/manual/parte-i-fundamentos/bloque-1-procedimientos-basicos/1.2.2`

### 2. RCP Adulto SVB
- **ID:** `rcp-adulto-svb`
- **8 secciones:** Todas configuradas
- **Protocolo operativo:** `/rcp`

---

## 🎨 Características del Layout Formativo

### GuideLayout
- ✅ Reutiliza `Header` y `Footer` existentes
- ✅ **NO incluye** `BottomNav` (diferencia visual con modo operativo)
- ✅ Badge "Modo Formación" visible
- ✅ Contenedor `max-w-2xl` centrado
- ✅ Más espaciado vertical (`py-6`) para mejor lectura

### Diferencias Visuales
- **Modo Operativo:** Header + BottomNav + Footer
- **Modo Formativo:** Header + Badge + Footer (sin BottomNav)

---

## 📄 Archivos Markdown

### Ubicación
- **Fuente:** `docs/consolidado/*.md`
- **Destino:** `public/docs/consolidado/*.md` (para que Vite los sirva)

### Script de Copia
```bash
./scripts/copiar-guias-markdown.sh
```

**Estado:** ✅ 81 archivos Markdown copiados correctamente

---

## 🔧 Componentes Clave

### GuideMarkdownViewer
- Wrapper de `MarkdownViewer` existente
- **NO modifica** el componente original
- Estilos optimizados para lectura formativa
- Carga archivos desde `/docs/consolidado/`

### GuideCard
- Card clicable con icono, título, descripción
- Badge "Modo Formación" visible
- Link a `/guia-refuerzo/:guia`

### GuideNavigation
- Navegación anterior/siguiente entre secciones
- Indicador de sección actual (ej: "3 / 8")
- Botones deshabilitados en primera/última sección

---

## 🚀 Uso

### Acceso
1. Navegar a `/guia-refuerzo`
2. Ver lista de guías disponibles
3. Click en una guía para ver todas las secciones
4. Navegar entre secciones con tabs o navegación

### Agregar Nueva Guía
1. Agregar entrada en `src/data/guides-index.ts`
2. Asegurar que los 8 archivos Markdown existan en `docs/consolidado/`
3. Ejecutar `./scripts/copiar-guias-markdown.sh`
4. La guía aparecerá automáticamente en la lista

---

## ✅ Verificaciones

- ✅ No se modificaron componentes existentes
- ✅ No se modificaron estilos globales
- ✅ Rutas integradas sin conflictos
- ✅ Lazy loading implementado
- ✅ TypeScript sin errores
- ✅ Linter sin errores
- ✅ Archivos Markdown copiados correctamente

---

## 📝 Próximos Pasos (Opcionales)

1. **Búsqueda en guías:** Agregar búsqueda dentro de las guías
2. **Favoritos:** Permitir marcar secciones como favoritas
3. **Progreso:** Guardar progreso de lectura
4. **Compartir:** Compartir secciones específicas
5. **Modo offline:** Asegurar que las guías funcionen offline (PWA)

---

## 🔒 Seguridad

- ✅ Layout actual **NO modificado**
- ✅ Componentes existentes **NO modificados**
- ✅ Rutas existentes **NO modificadas**
- ✅ Arquitectura **paralela** y **reversible**

---

**Fecha de implementación:** 2024-12-27  
**Estado:** ✅ Listo para producción

