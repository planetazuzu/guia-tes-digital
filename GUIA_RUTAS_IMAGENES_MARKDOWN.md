# 📸 Guía: Rutas de Imágenes en Markdown

**Fecha:** 2024-12-19  
**Objetivo:** Cómo referenciar imágenes en archivos Markdown del manual

---

## ✅ RUTAS CORRECTAS

### Desde archivos en `public/manual/BLOQUE_X/`

**Estructura:**
```
public/
├── manual/
│   └── BLOQUE_X/
│       └── archivo.md
└── assets/
    └── infografias/
        └── bloque-X-tema/
            └── imagen.png
```

**Rutas correctas en Markdown:**

#### Opción 1: Ruta absoluta desde `/` (RECOMENDADO)
```markdown
![Descripción](/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png)
```

#### Opción 2: Ruta relativa desde `public/`
```markdown
![Descripción](./assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png)
```

#### Opción 3: Ruta relativa con `../`
```markdown
![Descripción](../assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png)
```

**Todas estas opciones funcionan** gracias a la adaptación del `MarkdownViewer`.

---

## 📁 ESTRUCTURA DE CARPETAS

```
public/
├── assets/
│   └── infografias/
│       ├── bloque-0-fundamentos/
│       │   ├── ALGORITMO OPERATIVO DEL TES.svg
│       │   ├── RESUMEN VISUAL DEL ALGORITMO START.svg
│       │   ├── flujo-rcp-transtelefonica.png
│       │   └── ...
│       ├── bloque-2-inmovilizacion/
│       │   ├── colocacion-collarin-paso-1-preparacion.png
│       │   ├── colocacion-collarin-paso-2-parte-posterior.png
│       │   └── ...
│       ├── bloque-3-material-sanitario/
│       │   ├── uso-correcto-pulsioximetro.png
│       │   └── ...
│       ├── bloque-7-conduccion/
│       │   └── configuracion-gps-antes-de-salir.png
│       └── bloque-12-marco-legal/
│           ├── diagrama-decisiones-eticas.png
│           └── diagrama-decisiones-eticas-urgencias.png
└── manual/
    └── BLOQUE_X/
        └── archivo.md
```

---

## 📝 EJEMPLOS POR BLOQUE

### Bloque 0 - Fundamentos

```markdown
![Algoritmo Operativo del TES](/assets/infografias/bloque-0-fundamentos/ALGORITMO OPERATIVO DEL TES.svg)

![Resumen Visual Algoritmo START](/assets/infografias/bloque-0-fundamentos/RESUMEN VISUAL DEL ALGORITMO START.svg)

![Flujo RCP Transtelefónica](/assets/infografias/bloque-0-fundamentos/flujo-rcp-transtelefonica.png)
```

### Bloque 2 - Inmovilización

```markdown
![Colocación de collarín - Paso 1](/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png)

![Colocación de collarín - Paso 2](/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-2-parte-posterior.png)

![Selección de talla de collarín](/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png)

![Componentes del sistema de inmovilización](/assets/infografias/bloque-2-inmovilizacion/componentes-sistema-inmovilizacion.png)
```

### Bloque 3 - Material Sanitario

```markdown
![Uso correcto del pulsioxímetro](/assets/infografias/bloque-3-material-sanitario/uso-correcto-pulsioximetro.png)

![Uso correcto del tensiómetro](/assets/infografias/bloque-3-material-sanitario/uso-correcto-tensiometro.png)

![Uso correcto del AMBU](/assets/infografias/bloque-3-material-sanitario/uso-correcto-ambu.png)
```

---

## 🔧 ADAPTACIÓN DEL MARKDOWNVIEWER

El `MarkdownViewer` ahora procesa automáticamente las rutas de imágenes:

1. **Rutas relativas** (`./assets/`, `../assets/`) → Se convierten a absolutas (`/assets/`)
2. **Rutas sin `/`** (`assets/`) → Se convierten a absolutas (`/assets/`)
3. **Rutas absolutas** (`/assets/`) → Se mantienen como están
4. **URLs externas** (`http://...`) → Se mantienen como están

**Ejemplo de procesamiento:**
```markdown
<!-- En el Markdown -->
![Imagen](./assets/infografias/bloque-2-inmovilizacion/imagen.png)

<!-- Se convierte automáticamente a -->
<img src="/assets/infografias/bloque-2-inmovilizacion/imagen.png" />
```

---

## ✅ BUENAS PRÁCTICAS

### 1. Usar rutas absolutas (recomendado)
```markdown
![Descripción](/assets/infografias/bloque-X-tema/imagen.png)
```

**Ventajas:**
- Funciona desde cualquier ubicación del archivo
- Más fácil de mantener
- No depende de la estructura de carpetas

### 2. Texto alternativo descriptivo
```markdown
✅ Bueno:
![Colocación de collarín cervical - Paso 1: Preparación](/assets/infografias/...)

❌ Malo:
![imagen](/assets/infografias/...)
```

### 3. Organizar por bloque
```markdown
<!-- Bloque 2 - Inmovilización -->
![...](/assets/infografias/bloque-2-inmovilizacion/...)

<!-- Bloque 3 - Material Sanitario -->
![...](/assets/infografias/bloque-3-material-sanitario/...)
```

---

## 🚨 PROBLEMAS COMUNES

### Problema 1: Imagen no se muestra

**Causa:** Ruta incorrecta o imagen no existe

**Solución:**
1. Verificar que la imagen existe en `public/assets/infografias/`
2. Verificar que la ruta en Markdown es correcta
3. Usar ruta absoluta desde `/`

### Problema 2: Ruta relativa no funciona

**Causa:** El navegador resuelve rutas desde la URL, no desde el archivo

**Solución:** Usar rutas absolutas desde `/` (el MarkdownViewer las procesa automáticamente)

### Problema 3: Imagen se ve en desarrollo pero no en producción

**Causa:** La imagen no está en `dist/` después del build

**Solución:**
1. Verificar que la imagen está en `public/assets/`
2. Ejecutar `npm run build`
3. Verificar que la imagen está en `dist/assets/`

---

## 📋 CHECKLIST

Antes de añadir una imagen en Markdown:

- [ ] La imagen existe en `public/assets/infografias/`
- [ ] La ruta en Markdown es correcta (absoluta desde `/`)
- [ ] El texto alternativo es descriptivo
- [ ] La imagen está en la carpeta correcta según el bloque
- [ ] Se ha probado en desarrollo (`npm run dev`)
- [ ] Se ha verificado en build (`npm run build`)

---

## 🎯 EJEMPLO COMPLETO

**Archivo:** `MANUAL_TES_DIGITAL/04_MATERIAL_E_INMOVILIZACION/BLOQUE_02_3_COLLARIN_CERVICAL.md`

```markdown
## Colocación del Collarín Cervical

### Paso 1: Preparación

![Colocación de collarín cervical - Paso 1: Preparación](/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png)

**Descripción:**
- Mantener inmovilización manual
- Medir talla aproximada
- Preparar collarín

### Paso 2: Parte Posterior

![Colocación de collarín cervical - Paso 2: Parte posterior](/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-2-parte-posterior.png)

**Descripción:**
- Colocar parte posterior del collarín
- Mantener control manual
- Verificar posición
```

---

**Última actualización:** 2024-12-19
