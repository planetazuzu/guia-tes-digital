# 🚀 SCORM Quick Start Guide

**Guía rápida para empezar la conversión a SCORM**

---

## 📋 Checklist Rápido

### Antes de Empezar

- [ ] Leer `PLAN_CONVERSION_SCORM.md` completo
- [ ] Entender estructura actual de guías
- [ ] Tener acceso a un LMS de prueba (Moodle, Canvas, etc.)

### Fase 1: Setup Inicial

```bash
# 1. Crear estructura de carpetas
mkdir -p scorm/{generator,templates,packages,dist}

# 2. Instalar dependencias
npm install --save-dev jszip fast-xml-parser @types/jszip

# 3. Crear script base
touch scripts/generate-scorm.ts
```

---

## 🎯 Objetivo de la Primera Iteración

**Convertir 1 sección de Markdown a HTML estático con:**
- ✅ HTML válido
- ✅ Estilos básicos
- ✅ Estructura SCORM básica

---

## 📝 Ejemplo de Código Inicial

### `scripts/generate-scorm.ts` (Esqueleto)

```typescript
import { readFile } from 'fs/promises';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

async function convertMarkdownToHtml(markdownPath: string): Promise<string> {
  const markdown = await readFile(markdownPath, 'utf-8');
  
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  
  return result.toString();
}

// Uso
const html = await convertMarkdownToHtml('docs/consolidado/SECCION_01_ABCDE_OPERATIVO.md');
console.log(html);
```

---

## 🧪 Testing Inicial

1. **Probar conversión MD → HTML:**
   ```bash
   npm run scorm:test
   ```

2. **Verificar HTML generado:**
   - Abrir en navegador
   - Verificar que se ve correctamente
   - Verificar que no hay errores

3. **Probar en LMS (cuando tengas paquete):**
   - Importar ZIP en Moodle/Canvas
   - Verificar que se carga
   - Verificar tracking básico

---

## 📚 Recursos Útiles

- **SCORM Test Suite:** https://www.adlnet.gov/adl-research/scorm/
- **Moodle (gratis):** https://moodle.org/
- **SCORM Cloud (testing):** https://cloud.scorm.com/

---

## ⚠️ Recordatorios Importantes

1. **NO modificar código existente** de la app React
2. **NO tocar** `GuideViewer`, `GuideMarkdownViewer`, etc.
3. **Sí crear** nueva carpeta `scorm/` separada
4. **Sí probar** cada paso antes de continuar

---

**Siguiente paso:** Revisar `PLAN_CONVERSION_SCORM.md` y empezar Fase 1

