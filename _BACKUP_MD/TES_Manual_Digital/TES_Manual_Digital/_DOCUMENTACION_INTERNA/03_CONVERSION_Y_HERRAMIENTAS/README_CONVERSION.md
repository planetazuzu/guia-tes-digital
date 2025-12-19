# 📄 Conversión de Manual TES Digital a Word (.docx)

Este directorio contiene herramientas para convertir los archivos Markdown del Manual TES Digital a formato Word (.docx) editable.

## 🚀 Inicio Rápido

### Opción 1: Usando Pandoc (Recomendado)

**Pandoc** es la herramienta más potente y produce mejores resultados. Está disponible en la mayoría de sistemas operativos.

#### Instalación de Pandoc

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install pandoc
```

**macOS:**
```bash
brew install pandoc
```

**Windows:**
```bash
# Con Chocolatey
choco install pandoc

# O descargar desde: https://pandoc.org/installing.html
```

#### Uso

```bash
cd /home/planetazuzu/protocolo-r-pido/manual-tes/TES_Manual_Digital
python3 convertir_a_word.py
```

Los archivos .docx se guardarán en `Manual_Word/` manteniendo la estructura de carpetas original.

---

### Opción 2: Usando Python-docx (Alternativa)

Si Pandoc no está disponible, el script puede usar bibliotecas Python (aunque con menor fidelidad al formato original).

#### Instalación

```bash
pip install -r requirements_word.txt
```

O manualmente:
```bash
pip install python-docx markdown
```

#### Uso

```bash
python3 convertir_a_word.py --no-pandoc
```

---

## 📋 Opciones del Script

```bash
python3 convertir_a_word.py [OPCIONES]

Opciones:
  --directorio DIR     Directorio fuente con archivos .md (default: directorio actual)
  --salida DIR_SALIDA  Directorio de salida para archivos .docx (default: Manual_Word)
  --no-pandoc          Forzar uso de python-docx en lugar de pandoc
  -h, --help           Mostrar ayuda
```

### Ejemplos

```bash
# Convertir desde un directorio específico
python3 convertir_a_word.py --directorio ./TES_Manual_Digital --salida ./Manual_Word

# Convertir solo un bloque específico
python3 convertir_a_word.py --directorio ./BLOQUE_1_PROCEDIMIENTOS_BASICOS --salida ./Bloque1_Word

# Forzar uso de python-docx
python3 convertir_a_word.py --no-pandoc
```

---

## 📁 Estructura de Salida

El script mantiene la estructura de carpetas original:

```
Manual_Word/
├── BLOQUE_0_FUNDAMENTOS/
│   └── BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.docx
├── BLOQUE_1_PROCEDIMIENTOS_BASICOS/
│   ├── BLOQUE_01_1_CONSTANTES_VITALES.docx
│   ├── BLOQUE_01_2_ABCDE_OPERATIVO.docx
│   └── ...
└── ...
```

---

## ⚙️ Configuración Avanzada

### Usar una Plantilla Personalizada de Word

Puedes crear una plantilla personalizada (.docx) y usarla como referencia:

1. Crea un documento Word con el formato deseado (fuentes, márgenes, estilos, etc.)
2. Guárdalo como `plantilla.docx` en el mismo directorio del script
3. Modifica el script para usar `--reference-doc=plantilla.docx` en el comando pandoc

### Convertir a Otros Formatos

Pandoc soporta múltiples formatos. Puedes modificar el script para convertir a:

- **PDF:** `pandoc archivo.md -o salida.pdf`
- **HTML:** `pandoc archivo.md -o salida.html`
- **RTF:** `pandoc archivo.md -o salida.rtf`
- **ODT:** `pandoc archivo.md -o salida.odt` (OpenDocument Text)

---

## 🔍 Solución de Problemas

### Error: "pandoc: command not found"

**Solución:** Instala pandoc siguiendo las instrucciones arriba, o usa `--no-pandoc` para usar python-docx.

### Error: "Biblioteca faltante: python-docx"

**Solución:** Instala las dependencias:
```bash
pip install -r requirements_word.txt
```

### Los archivos Word no mantienen el formato correcto

**Solución:** 
- Usa Pandoc en lugar de python-docx (mejor calidad)
- Crea y usa una plantilla personalizada de Word
- Verifica que el archivo Markdown tenga el formato correcto

### Algunos archivos fallan al convertir

**Solución:**
- Revisa el mensaje de error en el resumen
- Verifica que los archivos .md estén en formato válido
- Archivos muy grandes pueden necesitar más tiempo (aumenta el timeout en el script)

---

## 📊 Formatos Soportados

### Entrada (Input)
- ✅ Markdown (.md)
- ✅ Todos los archivos del Manual TES Digital

### Salida (Output)
- ✅ Microsoft Word (.docx) - **Formato por defecto**
- 🔄 PDF (requiere LaTeX o wkhtmltopdf)
- 🔄 HTML
- 🔄 RTF
- 🔄 ODT

---

## 💡 Consejos

1. **Mejor calidad:** Usa Pandoc siempre que sea posible
2. **Revisión:** Revisa los archivos convertidos, especialmente tablas y listas complejas
3. **Estructura:** El script mantiene la estructura de carpetas para facilitar la navegación
4. **Backup:** Los archivos originales .md no se modifican

---

## 📝 Notas

- Los archivos en `_DOCUMENTACION_INTERNA/` se excluyen automáticamente
- Los archivos `MAPA_MAESTRO*` y `INFORME*` también se excluyen
- El script preserva enlaces internos cuando es posible
- Las tablas se convierten correctamente con Pandoc

---

**Fecha de creación:** 2024-12-14  
**Versión del script:** 1.0
