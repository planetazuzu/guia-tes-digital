# 📸 Sistema de Medios Visuales - Documentación Técnica

**Fecha:** 2024-12-19  
**Objetivo:** Explicar cómo funciona el sistema actual y proponer mejoras

---

## 🔍 CÓMO FUNCIONA ACTUALMENTE

### 1. Estructura de Archivos

```
public/
├── assets/
│   └── infografias/
│       ├── bloque-0-fundamentos/
│       │   ├── ALGORITMO OPERATIVO DEL TES.svg
│       │   ├── diagrama-seleccion-dispositivo-oxigenoterapia.png
│       │   └── ...
│       ├── bloque-2-inmovilizacion/
│       │   ├── colocacion-collarin-paso-1-preparacion.png
│       │   ├── seleccion-talla-collarin-cervical.png
│       │   └── ...
│       └── bloque-3-material-sanitario/
│           ├── canulas-guedel-nasofaringea.png
│           └── ...
└── manual/
    └── BLOQUE_X/
        └── BLOQUE_XX_X_NOMBRE.md
```

### 2. Referencias en Markdown

**Formato actual:**
```markdown
![Descripción de la imagen](/assets/infografias/bloque-X-nombre/imagen.png)
```

**Ejemplo real:**
```markdown
![Cánulas de Guedel y nasofaríngea](/assets/infografias/bloque-3-material-sanitario/canulas-guedel-nasofaringea.png)
```

### 3. Proceso de Renderizado

1. **ManualViewer.tsx** carga el archivo `.md` desde `public/manual/`
2. **MarkdownViewer.tsx** procesa el Markdown con `react-markdown`
3. **Componente `img` personalizado** (líneas 240-273):
   - Normaliza rutas relativas/absolutas
   - Convierte rutas relativas a absolutas desde `/public/`
   - Añade estilos (rounded, border, shadow)
   - Implementa `loading="lazy"` para carga diferida
   - Maneja errores con `onError`

### 4. Flujo Completo

```
Usuario → ManualViewer → Carga .md → MarkdownViewer → ReactMarkdown
                                                           ↓
                                                    Procesa ![...](ruta)
                                                           ↓
                                                    Componente img personalizado
                                                           ↓
                                                    Normaliza ruta
                                                           ↓
                                                    Renderiza <img src="/assets/...">
                                                           ↓
                                                    Navegador carga imagen
```

---

## 📊 ESTADO ACTUAL

### ✅ Lo que funciona bien:
- **Rutas absolutas:** `/assets/infografias/...` funcionan correctamente
- **Lazy loading:** Imágenes se cargan bajo demanda
- **Manejo de errores:** Imágenes rotas se ocultan automáticamente
- **Estilos consistentes:** Todas las imágenes tienen el mismo estilo
- **Organización:** Imágenes organizadas por bloques temáticos

### ⚠️ Limitaciones actuales:
- **Rutas manuales:** Hay que escribir la ruta completa en cada `.md`
- **Sin validación:** No se verifica que la imagen exista antes de referenciarla
- **Sin optimización:** No hay generación de thumbnails o múltiples tamaños
- **Sin metadatos:** No hay información sobre dimensiones, descripción, etc.
- **Dependencia de estructura:** Si cambia la estructura de carpetas, hay que actualizar todas las referencias

---

## 🚀 PROPUESTAS DE MEJORA

### Opción 1: Sistema de Referencias con Alias (Recomendado)

**Idea:** Crear un sistema de alias para referencias más cortas y mantenibles.

**Implementación:**

1. **Crear archivo de mapeo:** `src/data/image-aliases.ts`
```typescript
export const imageAliases: Record<string, string> = {
  'collarin-seleccion': '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png',
  'collarin-paso-1': '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png',
  'abcde-algoritmo': '/assets/infografias/bloque-0-fundamentos/ALGORITMO OPERATIVO DEL TES.svg',
  // ... más alias
};
```

2. **Modificar MarkdownViewer para resolver alias:**
```typescript
img: ({ node, src, alt, ...props }: any) => {
  let imageSrc = src || '';
  
  // Resolver alias si existe
  if (imageAliases[imageSrc]) {
    imageSrc = imageAliases[imageSrc];
  }
  
  // ... resto de normalización
}
```

3. **Uso en Markdown:**
```markdown
![Selección de collarín](collarin-seleccion)
![Paso 1: Preparación](collarin-paso-1)
```

**Ventajas:**
- ✅ Referencias más cortas y legibles
- ✅ Fácil de mantener (cambiar ruta en un solo lugar)
- ✅ Validación centralizada
- ✅ Sin cambios en estructura de archivos

**Desventajas:**
- ⚠️ Requiere crear y mantener el archivo de alias
- ⚠️ Dos lugares donde buscar (alias vs ruta directa)

---

### Opción 2: Sistema de Metadatos en Frontmatter

**Idea:** Usar frontmatter YAML en los archivos `.md` para definir imágenes.

**Implementación:**

1. **Frontmatter en `.md`:**
```markdown
---
images:
  - id: collarin-seleccion
    path: /assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png
    alt: Selección de talla de collarín cervical
    caption: Guía visual para seleccionar la talla correcta
  - id: collarin-paso-1
    path: /assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png
    alt: Paso 1: Preparación
---
```

2. **Uso en Markdown:**
```markdown
![collarin-seleccion]
![collarin-paso-1]
```

3. **Procesar en MarkdownViewer:**
```typescript
// Extraer frontmatter con remark-frontmatter
// Resolver referencias a imágenes desde frontmatter
```

**Ventajas:**
- ✅ Metadatos junto al contenido
- ✅ Descripciones y captions centralizados
- ✅ Validación al parsear frontmatter

**Desventajas:**
- ⚠️ Requiere procesar frontmatter
- ⚠️ Más complejo de implementar
- ⚠️ Cambia el formato de los archivos `.md`

---

### Opción 3: Componente de Imagen Personalizado con Auto-detección

**Idea:** Detectar automáticamente imágenes relacionadas por nombre de archivo.

**Implementación:**

1. **Crear función de auto-detección:**
```typescript
const findImageByPattern = (chapterId: string, imageName: string): string | null => {
  // Buscar en estructura conocida
  const patterns = [
    `/assets/infografias/bloque-${chapterId}/${imageName}`,
    `/assets/infografias/${imageName}`,
    // ... más patrones
  ];
  
  // Intentar cargar y verificar existencia
  return patterns.find(p => imageExists(p)) || null;
};
```

2. **Uso en Markdown:**
```markdown
![collarin-seleccion]  <!-- Busca automáticamente -->
![colocacion-collarin-paso-1]  <!-- Auto-detecta -->
```

**Ventajas:**
- ✅ Referencias muy cortas
- ✅ Auto-detección inteligente
- ✅ Menos mantenimiento

**Desventajas:**
- ⚠️ Puede ser lento (verificar existencia de archivos)
- ⚠️ Menos explícito (puede confundir)
- ⚠️ Requiere convenciones de nombres estrictas

---

### Opción 4: Sistema Híbrido (Recomendado para Escalabilidad)

**Idea:** Combinar alias + auto-detección + validación.

**Implementación:**

1. **Archivo de configuración:** `src/data/image-registry.ts`
```typescript
export interface ImageMetadata {
  id: string;
  path: string;
  alt: string;
  caption?: string;
  block: string;
  chapter?: string;
  tags?: string[];
}

export const imageRegistry: Record<string, ImageMetadata> = {
  'collarin-seleccion': {
    id: 'collarin-seleccion',
    path: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png',
    alt: 'Selección de talla de collarín cervical',
    caption: 'Guía visual para seleccionar la talla correcta según anatomía del paciente',
    block: 'bloque-2-inmovilizacion',
    tags: ['collarin', 'inmovilizacion', 'seleccion']
  },
  // ... más imágenes
};

// Función helper para buscar por tags o bloque
export const findImagesByBlock = (block: string): ImageMetadata[] => {
  return Object.values(imageRegistry).filter(img => img.block === block);
};
```

2. **Componente mejorado en MarkdownViewer:**
```typescript
img: ({ node, src, alt, ...props }: any) => {
  let imageSrc = src || '';
  let imageAlt = alt || '';
  let imageCaption = '';
  
  // 1. Intentar resolver desde registry
  if (imageRegistry[imageSrc]) {
    const metadata = imageRegistry[imageSrc];
    imageSrc = metadata.path;
    imageAlt = metadata.alt;
    imageCaption = metadata.caption || '';
  }
  // 2. Si no, normalizar ruta directa
  else {
    // ... normalización actual
  }
  
  return (
    <figure className="my-6">
      <img 
        className="rounded-lg max-w-full h-auto border border-border shadow-sm" 
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        {...props} 
      />
      {imageCaption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
          {imageCaption}
        </figcaption>
      )}
    </figure>
  );
}
```

3. **Uso en Markdown:**
```markdown
<!-- Por alias -->
![collarin-seleccion]

<!-- Por ruta directa (sigue funcionando) -->
![Descripción](/assets/infografias/bloque-2-inmovilizacion/imagen.png)
```

**Ventajas:**
- ✅ Compatible con sistema actual
- ✅ Metadatos centralizados
- ✅ Búsqueda por tags/bloque
- ✅ Captions automáticos
- ✅ Validación centralizada
- ✅ Escalable

**Desventajas:**
- ⚠️ Requiere crear y mantener registry
- ⚠️ Más código inicial

---

## 🎯 RECOMENDACIÓN

### Fase 1: Mejoras Inmediatas (Sin cambios grandes)

1. **Mejorar componente `img` actual:**
   - Añadir `<figure>` y `<figcaption>` para captions
   - Mejorar manejo de errores (mostrar placeholder)
   - Añadir opción de lightbox/modal para ampliar

2. **Script de validación:**
   - Crear script que verifique que todas las referencias en `.md` apuntan a archivos existentes
   - Ejecutar en CI/CD o pre-commit

### Fase 2: Sistema de Registry (Escalable)

1. **Crear `image-registry.ts`** con todas las imágenes organizadas
2. **Implementar resolución de alias** en MarkdownViewer
3. **Migrar progresivamente** referencias a alias
4. **Añadir funcionalidades:**
   - Búsqueda de imágenes por tags
   - Galería de imágenes por bloque
   - Validación automática

---

## 📝 EJEMPLO DE MIGRACIÓN

### Antes:
```markdown
![Selección de talla de collarín cervical](/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png)
```

### Después (con registry):
```markdown
![collarin-seleccion]
```

O con caption:
```markdown
![collarin-seleccion]
<!-- Se renderiza automáticamente con caption desde registry -->
```

---

## 🔧 IMPLEMENTACIÓN PRÁCTICA

### Paso 1: Crear Registry Básico

```typescript
// src/data/image-registry.ts
export const imageRegistry = {
  // Bloque 2: Inmovilización
  'collarin-seleccion': {
    path: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png',
    alt: 'Selección de talla de collarín cervical',
    block: 'bloque-2-inmovilizacion'
  },
  'collarin-paso-1': {
    path: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png',
    alt: 'Paso 1: Preparación para colocación de collarín',
    block: 'bloque-2-inmovilizacion'
  },
  // ... más imágenes
};
```

### Paso 2: Actualizar MarkdownViewer

Añadir resolución de alias antes de normalizar rutas.

### Paso 3: Migrar Referencias

Ir actualizando los `.md` para usar alias en lugar de rutas completas.

---

## ✅ VENTAJAS DEL SISTEMA PROPUESTO

1. **Mantenibilidad:** Cambiar ruta en un solo lugar
2. **Validación:** Verificar que todas las imágenes existen
3. **Metadatos:** Descripciones, captions, tags centralizados
4. **Búsqueda:** Encontrar imágenes por tags o bloque
5. **Compatibilidad:** Sigue funcionando con rutas directas
6. **Escalabilidad:** Fácil añadir nuevas imágenes

---

**Última actualización:** 2024-12-19
