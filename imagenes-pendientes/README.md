# 📸 CARPETA DE IMÁGENES PENDIENTES

Esta carpeta es un **área de trabajo temporal** para las imágenes que estás creando antes de organizarlas en su ubicación final.

## 📋 PROPÓSITO

- ✅ Coloca aquí las imágenes que vas creando
- ✅ Úsala como área de trabajo temporal
- ✅ Una vez listas, organízalas usando el script de organización

## 🎨 FORMATOS ACEPTADOS

**Ambos formatos son válidos:**
- ✅ **PNG** (`.png`) - Para imágenes con muchos colores o fotografías
- ✅ **SVG** (`.svg`) - Para diagramas y gráficos vectoriales

**El formato no importa** - el script de organización manejará ambos correctamente.

## 🚀 CÓMO USAR ESTA CARPETA

### 1. Coloca tus imágenes aquí
Simplemente copia o guarda tus imágenes en esta carpeta (PNG o SVG, da igual).

### 2. Organiza automáticamente
Cuando tengas varias imágenes listas, puedes usar el script de organización:

```bash
# Opción interactiva (te pregunta cada imagen)
python scripts/organizar_infografias.py

# Opción automática (organiza según palabras clave)
python scripts/organizar_infografias_simple.py
```

### 3. Ubicación final
Las imágenes se moverán automáticamente a:
- `public/assets/infografias/bloque-X-nombre/` (según el bloque correspondiente)

## 📁 ESTRUCTURA RECOMENDADA

Puedes organizar temporalmente tus imágenes aquí si quieres:

```
imagenes-pendientes/
├── bloque-0/          ← Imágenes del Bloque 0
├── bloque-2/          ← Imágenes del Bloque 2
├── bloque-3/          ← Imágenes del Bloque 3
└── varias/            ← Imágenes sin clasificar aún
```

## 💡 CONSEJOS

- **Nombra tus archivos descriptivamente**: `diagrama-oxigeno.png` o `diagrama-oxigeno.svg` es mejor que `imagen1.png`
- **El formato no importa**: Puedes usar PNG o SVG, ambos funcionan igual
- **Mantén esta carpeta limpia**: Una vez organizadas, las imágenes se moverán automáticamente
- **El script reconoce palabras clave**: Nombres descriptivos ayudan al script a ubicarlas correctamente

## 📖 MÁS INFORMACIÓN

- Ver `public/assets/README_UBICACION_IMAGENES.md` para saber dónde va cada imagen
- Ver `scripts/README_ORGANIZADOR_INFOGRAFIAS.md` para más detalles sobre el script
- Ver `GUIA_ORGANIZAR_INFOGRAFIAS.md` en la raíz del proyecto

---

**Nota:** Esta carpeta puede estar en `.gitignore` si prefieres no versionar imágenes temporales.
