# 📤 Cambios Pendientes para GitHub

**Fecha:** 2025-12-17

---

## 📊 Estado Actual

✅ **Código inicial subido a GitHub**  
⏳ **Cambios de limpieza pendientes de subir**

---

## 🔄 Cambios Pendientes

### Archivos Modificados
1. **`src/data/manual-index.ts`**
   - ✅ Rutas actualizadas de `manual-tes/...` a `/manual/...`
   - ✅ 93 rutas actualizadas

2. **`src/pages/ManualViewer.tsx`**
   - ✅ Simplificado para usar rutas directas del índice
   - ✅ Eliminada lógica de conversión de rutas

### Archivos Nuevos (Sin Rastrear)
1. **Scripts de Limpieza:**
   - `scripts/limpiar_manual.py` - Script de limpieza e integración
   - `scripts/actualizar_rutas_indice.py` - Script de actualización de rutas

2. **Documentación:**
   - `REPORTE_LIMPIEZA_MANUAL.md` - Reporte detallado de limpieza
   - `RESUMEN_LIMPIEZA_COMPLETA.md` - Resumen ejecutivo
   - `LIMPIEZA_COMPLETADA.md` - Documentación final
   - `DEPLOYMENT_GITHUB.md` - Guía de despliegue
   - `COMANDOS_GIT.md` - Comandos Git útiles
   - `INSTRUCCIONES_PUSH.md` - Instrucciones de push
   - `PUSH_FINAL.md` - Guía final de push

3. **Backup:**
   - `backup_manual_pre_limpieza/` - Backup completo (432 archivos)

---

## 🚀 Comandos para Subir Cambios

### Opción 1: Subir Todo (Recomendado)
```bash
cd /home/planetazuzu/protocolo-r-pido

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m "feat: Limpieza e integración completa del Manual TES

- Actualizadas 93 rutas en manual-index.ts para apuntar a /manual/
- Simplificado ManualViewer para usar rutas directas
- Agregados scripts de limpieza y actualización
- Documentación completa de la limpieza
- Backup completo de archivos originales
- 93 archivos del manual organizados en public/manual/"

# Subir cambios
git push origin main
```

### Opción 2: Subir Solo Cambios Esenciales
```bash
cd /home/planetazuzu/protocolo-r-pido

# Solo archivos modificados (sin backup ni docs)
git add src/data/manual-index.ts src/pages/ManualViewer.tsx

# Commit
git commit -m "fix: Actualizar rutas del manual a /manual/"

# Push
git push origin main
```

### Opción 3: Excluir Backup del Repositorio
```bash
cd /home/planetazuzu/protocolo-r-pido

# Agregar .gitignore para backup si no existe
echo "backup_manual_pre_limpieza/" >> .gitignore

# Agregar cambios (sin backup)
git add src/ scripts/ *.md
git add .gitignore

# Commit y push
git commit -m "feat: Limpieza e integración completa"
git push origin main
```

---

## 📋 Checklist Antes de Subir

- [ ] Verificar que `public/manual/` tenga los 93 archivos
- [ ] Verificar que las rutas en `manual-index.ts` sean correctas
- [ ] Probar localmente que la app funcione (`npm run dev`)
- [ ] Decidir si incluir el backup en el repositorio (recomendado: NO)
- [ ] Revisar qué documentación incluir

---

## ⚠️ Recomendaciones

### ✅ Incluir en el Repositorio
- ✅ Código fuente (`src/`)
- ✅ Scripts de utilidad (`scripts/`)
- ✅ Documentación esencial (`*.md` excepto backups)
- ✅ Configuración (`package.json`, `vite.config.ts`, etc.)

### ❌ NO Incluir en el Repositorio
- ❌ Backup completo (`backup_manual_pre_limpieza/`) - Muy pesado
- ❌ `node_modules/` - Ya está en `.gitignore`
- ❌ `dist/` - Se genera en build

---

## 🎯 Próximos Pasos Sugeridos

1. **Subir cambios de limpieza** (este documento)
2. **Configurar despliegue automático** (Vercel/Netlify/GitHub Pages)
3. **Probar la aplicación en producción**
4. **Documentar el proceso de despliegue**

---

**¿Quieres que suba estos cambios ahora o prefieres hacerlo manualmente?**
