# Instrucciones para Servir la Aplicación en Local

**Fecha:** 2025-12-17

---

## 🚀 Servir en Local - Opción 1: Desarrollo (Recomendado)

### Comando Principal

```bash
npm run dev
```

**Qué hace:**
- ✅ Inicia servidor de desarrollo Vite
- ✅ Hot-reload automático (cambios se reflejan al instante)
- ✅ Puerto: `8080`
- ✅ URL: `http://localhost:8080`

### Pasos Completos

```bash
# 1. Navegar al directorio del proyecto
cd /home/planetazuzu/protocolo-r-pido

# 2. Instalar dependencias (si no están instaladas)
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

**Salida esperada:**
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://[::]:8080/
  ➜  press h to show help
```

### Acceder a la Aplicación

Abrir en el navegador:
- **Local:** http://localhost:8080
- **Red local:** http://[tu-ip]:8080 (accesible desde otros dispositivos en la misma red)

---

## 🏗️ Servir en Local - Opción 2: Build de Producción

### Pasos

```bash
# 1. Crear build de producción
npm run build

# 2. Previsualizar build localmente
npm run preview
```

**Qué hace:**
- ✅ Crea build optimizado en `dist/`
- ✅ Inicia servidor de preview con el build de producción
- ✅ Simula el comportamiento en producción

**URL:** `http://localhost:4173` (puerto por defecto de Vite preview)

---

## 🌐 Servir en Red Local (Acceso desde otros dispositivos)

### Opción A: Vite Dev Server

El servidor de desarrollo de Vite ya está configurado para aceptar conexiones de red:

```bash
npm run dev
```

Luego acceder desde otros dispositivos usando:
- `http://[IP-DE-TU-PC]:8080`

**Encontrar tu IP:**
```bash
# Linux
ip addr show | grep "inet " | grep -v 127.0.0.1

# O más simple
hostname -I
```

### Opción B: Servidor HTTP Simple

Si necesitas servir solo el build estático:

```bash
# Opción 1: Python
cd dist
python3 -m http.server 8080

# Opción 2: Node.js (http-server)
npx http-server dist -p 8080 -a 0.0.0.0

# Opción 3: PHP
cd dist
php -S 0.0.0.0:8080
```

---

## 📋 Verificación de Funcionalidad

### Checklist de Verificación Local

1. **Servidor iniciado:**
   ```bash
   npm run dev
   # Debe mostrar: "ready in XXX ms"
   ```

2. **Página principal carga:**
   - Abrir: http://localhost:8080
   - Debe mostrar la página de inicio

3. **Manual completo funciona:**
   - Ir a: http://localhost:8080/manual
   - Debe mostrar el índice jerárquico

4. **Capítulos se cargan:**
   - Click en cualquier capítulo
   - Debe cargar el contenido Markdown

5. **Archivos .md accesibles:**
   - Verificar: http://localhost:8080/manual/BLOQUE_0_FUNDAMENTOS/BLOQUE_00_0_FUNDAMENTOS_EMERGENCIAS.md
   - Debe mostrar el contenido del archivo

---

## 🔧 Solución de Problemas

### Puerto 8080 ocupado

**Error:** `Port 8080 is already in use`

**Solución:**
```bash
# Opción 1: Usar otro puerto
npm run dev -- --port 3000

# Opción 2: Matar proceso en puerto 8080
# Linux
sudo lsof -ti:8080 | xargs kill -9

# O cambiar puerto en vite.config.ts
```

### Archivos .md no se cargan

**Problema:** Los archivos Markdown dan 404

**Solución:**
1. Verificar que los archivos estén en `public/manual/`
2. Verificar que el servidor esté sirviendo desde la raíz correcta
3. Verificar rutas en el código (deben ser `/manual/...`)

### Hot-reload no funciona

**Solución:**
- Verificar que no haya errores en la consola
- Recargar página manualmente (F5)
- Reiniciar servidor (`Ctrl+C` y `npm run dev`)

---

## 📱 Acceso desde Móvil (Misma Red)

1. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

2. **Encontrar IP de tu PC:**
   ```bash
   hostname -I
   # Ejemplo: 192.168.1.100
   ```

3. **Acceder desde móvil:**
   - Conectar móvil a la misma red WiFi
   - Abrir navegador en móvil
   - Ir a: `http://192.168.1.100:8080`

**Nota:** Asegurar que el firewall permita conexiones en el puerto 8080.

---

## 🎯 Comandos Útiles

```bash
# Desarrollo con hot-reload
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Verificar manual (verifica archivos .md)
npm run verify:manual

# Linter
npm run lint
```

---

## ✅ Estado Actual

- ✅ Servidor de desarrollo configurado
- ✅ Puerto 8080 configurado
- ✅ Hot-reload funcionando
- ✅ Archivos .md accesibles desde `public/manual/`
- ✅ Rutas de React Router funcionando

**Listo para usar:** Solo ejecutar `npm run dev` y abrir http://localhost:8080

---

**Para iniciar ahora:**
```bash
cd /home/planetazuzu/protocolo-r-pido
npm run dev
```
