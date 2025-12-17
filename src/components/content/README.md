# Componente MarkdownViewer

Componente que carga y renderiza archivos Markdown dinámicamente con estilos consistentes.

## Ubicación

`src/components/content/MarkdownViewer.tsx`

## Características

✅ **Carga dinámica** - Carga archivos .md desde `public/` usando fetch  
✅ **Renderizado avanzado** - Usa react-markdown con plugins completos  
✅ **Estilos consistentes** - Integrado con el sistema de diseño de la app  
✅ **Estados de carga** - Maneja loading, error y contenido vacío  
✅ **Syntax highlighting** - Resaltado de código con highlight.js  
✅ **Seguridad** - Sanitización de HTML para prevenir XSS  
✅ **Accesibilidad** - Componentes semánticos y navegación por teclado  

## Uso Básico

```tsx
import MarkdownViewer from '@/components/content/MarkdownViewer';

<MarkdownViewer filePath="/manual/BLOQUE_0_FUNDAMENTOS/archivo.md" />
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `filePath` | `string` | ✅ | Ruta del archivo .md desde `public/` |
| `className` | `string` | ❌ | Clases CSS adicionales |
| `showLoading` | `boolean` | ❌ | Mostrar estado de carga (default: `true`) |
| `onError` | `(error: Error) => void` | ❌ | Callback para manejar errores |

## Ejemplos

### Ejemplo 1: Uso básico

```tsx
<MarkdownViewer filePath="/manual/BLOQUE_0_FUNDAMENTOS/BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md" />
```

### Ejemplo 2: Con clases personalizadas

```tsx
<MarkdownViewer 
  filePath="/manual/BLOQUE_1_PROCEDIMIENTOS_BASICOS/BLOQUE_01_1_CONSTANTES_VITALES.md"
  className="max-w-4xl mx-auto"
/>
```

### Ejemplo 3: Sin estado de carga

```tsx
<MarkdownViewer 
  filePath="/manual/BLOQUE_2_MATERIAL_E_INMOVILIZACION/BLOQUE_02_0_ANATOMIA_OPERATIVA.md"
  showLoading={false}
/>
```

### Ejemplo 4: Con manejo de errores

```tsx
<MarkdownViewer 
  filePath="/manual/BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/BLOQUE_03_0A_OXIGENOTERAPIA_BASICA.md"
  onError={(error) => {
    console.error('Error cargando archivo:', error);
    // Mostrar notificación al usuario
  }}
/>
```

## Estructura de Rutas

Los archivos .md deben estar en `public/manual/` con la siguiente estructura:

```
public/
  manual/
    BLOQUE_0_FUNDAMENTOS/
      BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md
    BLOQUE_1_PROCEDIMIENTOS_BASICOS/
      BLOQUE_01_1_CONSTANTES_VITALES.md
      ...
```

## Plugins Configurados

### Remark Plugins (procesamiento de Markdown)
- `remark-gfm` - GitHub Flavored Markdown (tablas, checkboxes, etc.)
- `remark-frontmatter` - Procesamiento de front matter YAML

### Rehype Plugins (procesamiento de HTML)
- `rehype-raw` - Renderizado de HTML crudo
- `rehype-sanitize` - Sanitización de HTML para seguridad
- `rehype-highlight` - Syntax highlighting para código

## Estilos Aplicados

Todos los elementos Markdown tienen estilos consistentes con el sistema de diseño:

- **Headings** - Tamaños y pesos de fuente consistentes con bordes
- **Párrafos** - Espaciado y line-height optimizados para lectura
- **Listas** - Indentación y espaciado adecuados
- **Código** - Fondo oscuro, fuente monoespaciada, scroll horizontal
- **Tablas** - Bordes, hover states, responsive
- **Enlaces** - Color primario, hover underline
- **Blockquotes** - Borde izquierdo, fondo sutil, texto italic

## Estados del Componente

### Loading
Muestra un spinner y mensaje "Cargando contenido..."

### Error
Muestra un icono de alerta, mensaje de error y la ruta del archivo

### Contenido Vacío
Muestra un icono de archivo y mensaje "No hay contenido para mostrar"

### Contenido Cargado
Renderiza el Markdown con todos los estilos aplicados

## Notas

- El componente carga archivos desde `public/` usando fetch
- Las rutas deben ser relativas a `public/` (ej: `/manual/...`)
- El componente maneja automáticamente errores de red y archivos no encontrados
- Los enlaces externos se abren en nueva pestaña con `rel="noopener noreferrer"`
- Las imágenes tienen lazy loading habilitado
