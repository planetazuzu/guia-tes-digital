# Scripts de Verificación

## Scripts Disponibles

### `verificar-manual.ts`

Script de verificación completa del Manual TES Digital.

**Uso:**
```bash
npm run verify:manual
```

**Qué verifica:**

1. **Archivos .md accesibles**
   - Verifica que todos los 93 archivos .md existan en `public/manual/`
   - Verifica que los archivos se puedan leer
   - Detecta archivos vacíos

2. **Rutas**
   - Verifica el formato de las rutas URL
   - Verifica que el código del capítulo coincida con la ruta
   - Valida estructura de rutas

3. **Navegación**
   - Verifica que los capítulos anterior/siguiente existan
   - Verifica consistencia bidireccional de navegación
   - Detecta referencias rotas

4. **Búsqueda**
   - Prueba búsquedas con términos comunes
   - Verifica que los capítulos sean encontrables por:
     - Título
     - Palabras clave
     - ID

**Salida:**

El script muestra:
- ✅ Verificaciones exitosas
- ❌ Problemas encontrados
- Resumen final con estadísticas

**Código de salida:**
- `0` - Todas las verificaciones pasaron
- `1` - Se encontraron problemas

**Ejemplo de uso en CI/CD:**

```yaml
# .github/workflows/verify.yml
- name: Verify Manual
  run: npm run verify:manual
```
