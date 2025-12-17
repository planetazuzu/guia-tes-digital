# 🔧 Guía de Instalación - Conversión a Word

## Instalación Rápida

### Opción 1: Pandoc (Recomendado - Mejor Calidad)

Pandoc es una herramienta de línea de comandos muy potente que produce conversiones de alta calidad.

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install pandoc
```

#### macOS:
```bash
brew install pandoc
```

#### Windows:
```bash
# Con Chocolatey
choco install pandoc

# O descargar el instalador desde:
# https://github.com/jgm/pandoc/releases/latest
```

**Verificar instalación:**
```bash
pandoc --version
```

---

### Opción 2: Python-docx (Alternativa)

Si no puedes instalar Pandoc, puedes usar bibliotecas Python.

#### Instalación:
```bash
pip install python-docx
```

O usando el archivo de requisitos:
```bash
pip install -r requirements_word.txt
```

**Nota:** La calidad de conversión con python-docx es menor que con Pandoc, pero funciona sin dependencias externas.

---

## Uso del Script

Una vez instalado Pandoc o python-docx:

```bash
cd /home/planetazuzu/protocolo-r-pido/manual-tes/TES_Manual_Digital
python3 convertir_a_word.py
```

El script detectará automáticamente qué herramienta usar:
- Si Pandoc está disponible, lo usará
- Si no, intentará usar python-docx
- Si ninguna está disponible, mostrará un error con instrucciones

---

## Solución de Problemas

### Error: "pandoc: command not found"

**Solución:**
1. Instala Pandoc siguiendo las instrucciones arriba, O
2. Usa `python3 convertir_a_word.py --no-pandoc` para forzar python-docx

### Error: "No module named 'docx'"

**Solución:**
```bash
pip install python-docx
```

### Error: "Permission denied" al instalar

**Solución:**
- Ubuntu/Debian: Usa `sudo` para apt
- Python: Usa `pip install --user python-docx` o `pip3 install --user python-docx`

---

## Comparación: Pandoc vs python-docx

| Característica | Pandoc | python-docx |
|----------------|--------|-------------|
| Calidad de conversión | ⭐⭐⭐⭐⭐ Excelente | ⭐⭐⭐ Buena |
| Formato de tablas | ✅ Perfecto | ⚠️ Básico |
| Enlaces | ✅ Funcionan | ⚠️ Limitado |
| Listas anidadas | ✅ Perfecto | ⚠️ Básico |
| Código | ✅ Resaltado | ❌ Texto plano |
| Instalación | Requiere sistema | Solo pip |
| Velocidad | Rápido | Rápido |

**Recomendación:** Usa Pandoc si es posible para mejor calidad.
