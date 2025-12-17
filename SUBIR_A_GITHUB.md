# 📤 Subir Proyecto a GitHub

**Repositorio:** https://github.com/planetazuzu/guia-tes-digital

---

## 🚀 Pasos para Subir el Proyecto

### Opción 1: Si el repositorio está vacío o quieres sobrescribir

```bash
cd /home/planetazuzu/protocolo-r-pido

# 1. Inicializar git (si no está inicializado)
git init

# 2. Agregar remote
git remote add origin https://github.com/planetazuzu/guia-tes-digital.git

# 3. Verificar qué hay en el repositorio remoto
git fetch origin

# 4. Agregar todos los archivos
git add .

# 5. Hacer commit inicial
git commit -m "feat: Aplicación completa con Manual TES Digital integrado

- Integración de 93 capítulos del manual
- Componente MarkdownViewer para renderizar .md
- Navegación jerárquica completa
- Sistema de búsqueda mejorado
- Puerto configurado en 8096
- Scripts de verificación incluidos"

# 6. Subir al repositorio
git push -u origin main
# O si la rama se llama master:
# git push -u origin master
```

### Opción 2: Si el repositorio ya tiene contenido

```bash
cd /home/planetazuzu/protocolo-r-pido

# 1. Inicializar git
git init

# 2. Agregar remote
git remote add origin https://github.com/planetazuzu/guia-tes-digital.git

# 3. Traer contenido remoto
git fetch origin
git branch -M main
git checkout -b main

# 4. Hacer merge o pull del contenido remoto
git pull origin main --allow-unrelated-histories

# 5. Resolver conflictos si los hay, luego:
git add .
git commit -m "feat: Integración completa del Manual TES Digital"
git push -u origin main
```

---

## ⚠️ Archivos que NO se Subirán (por .gitignore)

- `node_modules/` - Dependencias (se instalan con `npm install`)
- `dist/` - Build de producción (se genera con `npm run build`)
- Archivos temporales y logs

---

## 📋 Archivos Importantes que SÍ se Subirán

- ✅ Todo el código fuente (`src/`)
- ✅ Archivos de configuración (`package.json`, `vite.config.ts`, etc.)
- ✅ Archivos .md del manual (`public/manual/`)
- ✅ Scripts de verificación (`scripts/`)
- ✅ Documentación (archivos .md de documentación)

---

## 🔐 Autenticación GitHub

Si te pide credenciales:

**Opción 1: Personal Access Token**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generar token con permisos `repo`
3. Usar token como contraseña

**Opción 2: SSH**
```bash
# Cambiar remote a SSH
git remote set-url origin git@github.com:planetazuzu/guia-tes-digital.git
```

---

## ✅ Verificación Post-Push

Después de hacer push, verificar:

1. Ir a: https://github.com/planetazuzu/guia-tes-digital
2. Verificar que todos los archivos estén presentes
3. Verificar que `public/manual/` tenga los 93 archivos .md

---

## 🎯 Comandos Rápidos

```bash
# Inicializar y subir
git init
git remote add origin https://github.com/planetazuzu/guia-tes-digital.git
git add .
git commit -m "feat: Aplicación completa Manual TES Digital"
git branch -M main
git push -u origin main
```

---

**¿Quieres que ejecute estos comandos ahora?**
