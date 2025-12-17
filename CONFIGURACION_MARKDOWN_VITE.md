# Configuración de Vite para Procesar Archivos Markdown

**Fecha:** 2025-12-17  
**Archivo:** `vite.config.ts`

---

## 📋 Configuración Implementada

Se ha agregado configuración en `vite.config.ts` para procesar archivos `.md` de las siguientes formas:

### 1. Assets Include

```typescript
assetsInclude: ["**/*.md"]
```

**Propósito:**  
Vite reconocerá los archivos `.md` como assets estáticos y los servirá correctamente.

**Uso:**  
Los archivos en `public/manual/` se sirven directamente vía URL:
```
/manual/BLOQUE_0_FUNDAMENTOS/archivo.md
```

### 2. Importación como Texto (`?raw`)

Vite soporta nativamente importar archivos como texto usando el sufijo `?raw`:

```typescript
// Ejemplo de uso
import markdownContent from './ruta/al/archivo.md?raw';

// markdownContent será un string con el contenido del archivo
console.log(markdownContent);
```

**Ventajas:**
- ✅ El contenido se incluye en el bundle
- ✅ No requiere fetch adicional
- ✅ Funciona offline
- ✅ TypeScript puede inferir el tipo como `string`

**Desventajas:**
- ⚠️ Aumenta el tamaño del bundle
- ⚠️ Todos los archivos importados se incluyen en el build

### 3. Configuración de Build

```typescript
build: {
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name?.endsWith('.md')) {
          const name = assetInfo.name || '';
          if (name.includes('manual')) {
            return 'manual/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
        return 'assets/[name]-[hash][extname]';
      },
    },
  },
  assetsInclude: ['**/*.md'],
}
```

**Propósito:**  
- Mantener la estructura de carpetas para archivos `.md` en `public/manual/`
- Asegurar que los archivos `.md` se copien correctamente al build

---

## 🚀 Métodos de Uso

### Método 1: Carga Dinámica con Fetch (Actual)

**Ubicación:** `src/components/content/MarkdownViewer.tsx`

```typescript
// Cargar desde public/manual/
fetch('/manual/BLOQUE_0_FUNDAMENTOS/archivo.md')
  .then(res => res.text())
  .then(content => {
    // Usar contenido
  });
```

**Ventajas:**
- ✅ Carga bajo demanda
- ✅ No aumenta el bundle inicial
- ✅ Fácil de actualizar sin rebuild

**Desventajas:**
- ⚠️ Requiere conexión (a menos que se cachee)
- ⚠️ Requiere manejo de estados de carga/error

### Método 2: Importación Estática con `?raw`

```typescript
// Importar archivo específico
import contenidoCapitulo1 from '/public/manual/BLOQUE_0_FUNDAMENTOS/archivo.md?raw';

function Componente() {
  return <MarkdownViewer content={contenidoCapitulo1} />;
}
```

**Cuándo usar:**
- Archivos críticos que siempre se necesitan
- Contenido pequeño que no afecta el bundle
- Cuando se necesita garantizar disponibilidad offline

### Método 3: Importación Dinámica con `?raw`

```typescript
// Importación dinámica
async function cargarCapitulo(ruta: string) {
  const modulo = await import(`/public/manual/${ruta}?raw`);
  return modulo.default;
}
```

**Nota:** Esto requiere configuración adicional de Vite para importaciones dinámicas con variables.

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Componente con Importación Estática

```typescript
import React from 'react';
import ReactMarkdown from 'react-markdown';
import contenidoManual from '../assets/manual/introduccion.md?raw';

const Introduccion = () => {
  return (
    <div>
      <ReactMarkdown>{contenidoManual}</ReactMarkdown>
    </div>
  );
};
```

### Ejemplo 2: Carga Condicional

```typescript
import { useState, useEffect } from 'react';

function useMarkdownFile(filePath: string) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(filePath)
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      });
  }, [filePath]);

  return { content, loading };
}
```

### Ejemplo 3: Preload de Archivos Críticos

```typescript
// Preload de archivos críticos en el componente principal
import capituloRCP from '/public/manual/BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/BLOQUE_04_1_RCP_ADULTOS.md?raw';

// Cachear para acceso rápido
const cache = new Map();
cache.set('rcp-adulto', capituloRCP);
```

---

## 🔧 Configuración Adicional Recomendada

### Para TypeScript (opcional)

Crear `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

declare module '*.md?raw' {
  const content: string;
  export default content;
}
```

Esto permite que TypeScript reconozca las importaciones `?raw` de archivos `.md`.

### Para Importaciones Dinámicas

Si necesitas importaciones dinámicas con variables, puedes usar:

```typescript
// vite.config.ts
export default defineConfig({
  // ... otras configuraciones
  build: {
    rollupOptions: {
      input: {
        // Definir entradas si es necesario
      },
    },
  },
});
```

Y luego usar `import.meta.glob`:

```typescript
// Cargar todos los archivos .md de una carpeta
const modules = import.meta.glob('/public/manual/**/*.md', { 
  query: '?raw',
  eager: false 
});

// Usar
const contenido = await modules['/public/manual/BLOQUE_0/archivo.md']();
```

---

## ✅ Verificación

### Build Exitoso
```bash
npm run build
# ✓ Build completado sin errores
# ✓ Archivos .md incluidos correctamente
```

### Desarrollo
```bash
npm run dev
# ✓ Archivos .md accesibles desde /manual/
# ✓ Fetch funciona correctamente
```

---

## 📊 Comparación de Métodos

| Método | Bundle Size | Offline | Carga | Complejidad |
|--------|-------------|----------|-------|-------------|
| Fetch dinámico | ✅ Bajo | ⚠️ Con cache | ⚠️ Async | ✅ Simple |
| Import `?raw` | ⚠️ Alto | ✅ Sí | ✅ Sync | ✅ Simple |
| Import dinámico | ✅ Bajo | ✅ Sí | ⚠️ Async | ⚠️ Media |

---

## 🎯 Recomendación Actual

Para este proyecto, se recomienda **continuar usando Fetch dinámico** porque:

1. ✅ Los archivos están en `public/manual/` (93 archivos)
2. ✅ No queremos aumentar el bundle inicial
3. ✅ La carga bajo demanda es más eficiente
4. ✅ Fácil de implementar Service Worker para cache offline

La configuración de `assetsInclude` asegura que Vite sirva correctamente los archivos `.md` desde `public/`.

---

**Estado:** ✅ **Configuración completada y verificada**
