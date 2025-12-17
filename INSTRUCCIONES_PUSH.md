# 📤 Instrucciones para Hacer Push a GitHub

**Repositorio:** https://github.com/planetazuzu/guia-tes-digital

---

## ✅ Estado Actual

- ✅ Git inicializado
- ✅ Remote configurado
- ✅ Archivos agregados al staging
- ⏳ Pendiente: Commit y Push

---

## 🚀 Comandos para Ejecutar

### Opción 1: Si ya hiciste commit (recomendado)

```bash
cd /home/planetazuzu/protocolo-r-pido

# Hacer push
git push -u origin main
```

### Opción 2: Si necesitas hacer commit primero

```bash
cd /home/planetazuzu/protocolo-r-pido

# Hacer commit
git commit -m "feat: Aplicación completa Manual TES Digital

- Integración de 93 capítulos del manual completo
- Componente MarkdownViewer para renderizar archivos .md
- Navegación jerárquica completa
- Sistema de búsqueda mejorado
- Scripts de verificación
- Puerto configurado en 8096
- Configuración de despliegue"

# Hacer push
git push -u origin main
```

---

## 🔐 Autenticación

Si te pide usuario/contraseña:

**Usuario:** `planetazuzu`

**Contraseña:** Usa un **Personal Access Token** de GitHub:
1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token (classic)"
3. Selecciona permisos: `repo` (todos)
4. Genera y copia el token
5. Úsalo como contraseña cuando git lo pida

---

## ✅ Verificación

Después del push, verifica en:
https://github.com/planetazuzu/guia-tes-digital

Debe mostrar todos los archivos del proyecto.

---

**Ejecuta:** `git push -u origin main`
