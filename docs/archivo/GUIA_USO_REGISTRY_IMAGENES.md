# 📸 Guía de Uso: Sistema de Registry de Imágenes

**Fecha:** 2025-12-23  
**Sistema:** Híbrido con Registry (Opción 4)

---

## 🎯 ¿Qué es el Registry?

El **Registry de Imágenes** es un sistema que permite usar **alias cortos** en lugar de rutas completas en los archivos Markdown.

### Antes (sistema antiguo):
```markdown
![Selección de talla de collarín cervical](/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png)
```

### Ahora (con registry):
```markdown
![collarin-seleccion]
```

**Ventajas:**
- ✅ Referencias más cortas y legibles
- ✅ Captions automáticos (se muestran debajo de la imagen)
- ✅ Metadatos centralizados (alt, tags, bloque)
- ✅ Fácil mantenimiento (cambiar ruta en un solo lugar)
- ✅ Compatible con rutas directas (sigue funcionando el sistema antiguo)

---

## 📝 CÓMO USAR EL REGISTRY

### 1. Usar Alias Existente

Si la imagen ya está en el registry, simplemente usa su ID:

```markdown
![collarin-seleccion]
![abcde-algoritmo]
![triage-start]
![uso-ambu]
```

**Resultado:**
- Se renderiza la imagen con su ruta correcta
- Se muestra el `alt` del registry
- Se muestra el `caption` automáticamente debajo (si existe)

---

### 2. Añadir Nueva Imagen al Registry

**Paso 1:** Añadir la imagen al registry en `src/data/image-registry.ts`:

```typescript
'rcp-paso-1': {
  id: 'rcp-paso-1',
  path: '/assets/infografias/bloque-4-rcp/rcp-paso-1-verificar.png',
  alt: 'Paso 1: Verificar consciencia y respiración',
  caption: 'Primer paso del protocolo RCP: verificar consciencia y respiración',
  block: 'bloque-4-rcp',
  tags: ['rcp', 'paso-1', 'verificacion', 'consciencia']
},
```

**Paso 2:** Usar en Markdown:

```markdown
![rcp-paso-1]
```

---

### 3. Usar Ruta Directa (Sistema Antiguo - Sigue Funcionando)

Si prefieres usar rutas directas, sigue funcionando:

```markdown
![Descripción](/assets/infografias/bloque-X-nombre/imagen.png)
```

**Nota:** Las rutas directas NO tienen captions automáticos, solo las del registry.

---

## 🔍 LISTA DE ALIAS DISPONIBLES

### Bloque 0: Fundamentos
- `abcde-algoritmo` - Algoritmo operativo del TES
- `triage-start` - Resumen visual del algoritmo START
- `diagrama-seleccion-oxigenoterapia` - Diagrama de selección de dispositivo
- `tabla-rangos-fio2` - Tabla de rangos de FiO2
- `flujo-rcp-transtelefonica` - Flujo de RCP transtelefónica
- `flujo-desa-telefono` - Flujo de uso de DESA transtelefónico

### Bloque 1: Procedimientos Básicos
- `registro-constantes-vitales` - Registro de constantes vitales
- `interpretacion-constantes-semaforo` - Interpretación sistema semáforo
- `uso-pulsioximetro` - Uso correcto del pulsioxímetro
- `uso-tensiometro` - Uso correcto del tensiómetro

### Bloque 2: Inmovilización
- `collarin-seleccion` - Selección de talla de collarín
- `collarin-medicion` - Medición anatómica para selección
- `collarin-tabla-tallas` - Tabla de tallas de collarín
- `collarin-paso-1` - Paso 1: Preparación
- `collarin-paso-2` - Paso 2: Parte posterior
- `collarin-paso-3` - Paso 3: Parte anterior
- `collarin-paso-4` - Paso 4: Ajuste de cierres
- `collarin-paso-5` - Paso 5: Verificación
- `collarin-paso-6` - Paso 6: Liberación controlada
- `collarin-verificaciones` - Verificaciones post-colocación
- `collarin-errores` - Errores frecuentes

### Bloque 3: Material Sanitario
- `canulas-guedel-nasofaringea` - Cánulas de Guedel y nasofaríngea
- `uso-ambu` - Uso correcto de la bolsa-mascarilla (Ambú)
- `configuracion-fio2-bvm` - Configuración máxima de FiO2 con BVM
- `guia-colocacion-oxigenoterapia` - Guía de colocación de dispositivos

---

## 🛠️ FUNCIONES HELPER

El registry incluye funciones helper para buscar imágenes:

### Buscar por bloque:
```typescript
import { findImagesByBlock } from '@/data/image-registry';

const imagenesCollarin = findImagesByBlock('bloque-2-inmovilizacion');
// Retorna: Array de ImageMetadata con todas las imágenes del bloque
```

### Buscar por tags:
```typescript
import { findImagesByTags } from '@/data/image-registry';

const imagenesRCP = findImagesByTags(['rcp', 'reanimacion']);
// Retorna: Array de ImageMetadata que tienen esos tags
```

### Buscar por ID:
```typescript
import { findImageById } from '@/data/image-registry';

const imagen = findImageById('collarin-seleccion');
// Retorna: ImageMetadata o undefined
```

### Verificar si existe:
```typescript
import { hasImageId } from '@/data/image-registry';

if (hasImageId('collarin-seleccion')) {
  // La imagen existe en el registry
}
```

---

## 📋 EJEMPLO COMPLETO

### Archivo Markdown:
```markdown
## 2.3.1 Selección de Talla

Para seleccionar la talla correcta del collarín:

1. Medir distancia entre mentón y esternón
2. Consultar tabla de tallas
3. Verificar ajuste

![collarin-seleccion]

### Pasos de Colocación

**Paso 1: Preparación**
![collarin-paso-1]

**Paso 2: Parte Posterior**
![collarin-paso-2]

**Paso 3: Parte Anterior**
![collarin-paso-3]
```

### Resultado Visual:
- Cada imagen se renderiza con su caption automático
- Las imágenes tienen estilos consistentes
- Los captions son descriptivos y útiles

---

## ✅ VENTAJAS DEL SISTEMA

1. **Referencias Cortas:**
   - Antes: `![Descripción](/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png)`
   - Ahora: `![collarin-seleccion]`

2. **Captions Automáticos:**
   - Se muestran debajo de la imagen automáticamente
   - No hay que escribirlos en cada referencia

3. **Metadatos Centralizados:**
   - Alt text para accesibilidad
   - Tags para búsqueda
   - Bloque temático
   - Fácil de mantener

4. **Validación:**
   - Si el alias no existe, se muestra un error claro
   - Fácil detectar imágenes faltantes

5. **Compatibilidad:**
   - Las rutas directas siguen funcionando
   - Migración progresiva sin romper nada

---

## 🚀 PRÓXIMOS PASOS

### Para añadir más imágenes:

1. **Añadir al registry** (`src/data/image-registry.ts`)
2. **Actualizar referencias en Markdown** (cambiar rutas por alias)
3. **Verificar que funciona** (build y preview)

### Para migrar imágenes existentes:

1. Buscar referencias con rutas completas en `.md`
2. Añadir imagen al registry si no está
3. Reemplazar ruta por alias
4. Verificar que se renderiza correctamente

---

## 📊 ESTADO ACTUAL

- **Imágenes en registry:** 20+
- **Referencias migradas:** 12
- **Referencias pendientes:** ~5 (resto de imágenes con rutas directas)

---

**Última actualización:** 2025-12-23
