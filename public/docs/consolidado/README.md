# Guías de Refuerzo - Archivos Markdown

## ⚠️ IMPORTANTE

Los archivos Markdown de las Guías de Refuerzo deben estar en esta carpeta para que Vite los sirva correctamente.

## 📋 Instrucciones

Los archivos originales están en `docs/consolidado/` (raíz del proyecto).

**Para desarrollo:**
```bash
# Copiar archivos desde docs/consolidado/ a public/docs/consolidado/
cp -r ../../docs/consolidado/*.md .
```

**O crear un symlink (solo Linux/Mac):**
```bash
ln -s ../../docs/consolidado/*.md .
```

## 📁 Estructura Esperada

Esta carpeta debe contener:
- `SECCION_01_ABCDE_OPERATIVO.md`
- `SECCION_02_ABCDE_OPERATIVO.md`
- ... (todas las secciones de todas las guías)

## 🔄 Automatización Futura

En futuras iteraciones, se puede:
1. Configurar Vite para servir desde `docs/consolidado/` directamente
2. Crear un script de build que copie automáticamente
3. Usar un plugin de Vite para servir archivos fuera de `public/`
