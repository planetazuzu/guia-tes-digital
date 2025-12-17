# 📤 Comandos para Subir a GitHub

**Repositorio:** https://github.com/planetazuzu/guia-tes-digital

---

## ✅ Estado Actual

- ✅ Git inicializado
- ✅ Remote configurado: `origin` → https://github.com/planetazuzu/guia-tes-digital.git
- ✅ Contenido remoto traído

---

## 🚀 Próximos Pasos

### 1. Hacer Commit

```bash
cd /home/planetazuzu/protocolo-r-pido

git add .
git commit -m "feat: Aplicación completa Manual TES Digital

- Integración de 93 capítulos del manual completo
- Componente MarkdownViewer para renderizar archivos .md
- Navegación jerárquica completa (ManualIndex)
- Sistema de búsqueda mejorado (busca en parte/bloque/capítulo)
- Página ManualViewer con navegación anterior/siguiente
- Scripts de verificación del manual
- Puerto configurado en 8096
- Configuración de despliegue (Vercel, Netlify, GitHub Pages)
- Todos los problemas detectados corregidos"
```

### 2. Subir al Repositorio

```bash
git push -u origin main
```

---

## ⚠️ Si Pide Autenticación

### Opción 1: Personal Access Token

1. Ve a: https://github.com/settings/tokens
2. Genera un token con permisos `repo`
3. Usa el token como contraseña cuando git lo pida

### Opción 2: SSH

```bash
# Cambiar a SSH
git remote set-url origin git@github.com:planetazuzu/guia-tes-digital.git
git push -u origin main
```

---

## 📋 Archivos que se Subirán

- ✅ Todo el código fuente (`src/`)
- ✅ Archivos de configuración
- ✅ Los 93 archivos .md del manual (`public/manual/`)
- ✅ Scripts de verificación
- ✅ Documentación

**NO se subirán:**
- ❌ `node_modules/` (se instalan con `npm install`)
- ❌ `dist/` (se genera con `npm run build`)

---

## ✅ Verificación Post-Push

Después del push, verificar en:
https://github.com/planetazuzu/guia-tes-digital

Debe mostrar:
- ✅ Carpeta `src/` con todo el código
- ✅ Carpeta `public/manual/` con los 93 archivos .md
- ✅ Archivos de configuración
- ✅ README.md actualizado

---

**¿Ejecuto el commit y push ahora?**
