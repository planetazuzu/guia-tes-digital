# 🔧 Solución: No Veo Nada en el Navegador

## ✅ El Servidor Está Funcionando

El servidor está corriendo correctamente. El problema puede ser:

---

## 🔍 Problema Común: Puerto Incorrecto

**El servidor puede estar en un puerto diferente al 8080**

### Verificar Puerto Actual

```bash
# Ver qué puertos están en uso
lsof -i :8080 -i :8081 | grep LISTEN
```

### URLs a Probar

1. **Puerto 8080:** http://localhost:8080
2. **Puerto 8081:** http://localhost:8081 (si 8080 está ocupado)
3. **Puerto 3000:** http://localhost:3000 (si cambiaste el puerto)

---

## 🚀 Solución Rápida

### Paso 1: Detener todos los procesos

```bash
# Matar procesos en puertos 8080 y 8081
sudo lsof -ti:8080 | xargs kill -9
sudo lsof -ti:8081 | xargs kill -9
```

### Paso 2: Iniciar servidor limpio

```bash
cd /home/planetazuzu/protocolo-r-pido
npm run dev
```

### Paso 3: Abrir en navegador

**Abre esta URL exacta:**
```
http://localhost:8080
```

---

## 🌐 Si Estás en Red Local

Tu IP es: **192.168.1.136**

Desde otro dispositivo:
- http://192.168.1.136:8080
- http://192.168.1.136:8081

---

## 🔍 Verificación Paso a Paso

### 1. Verificar que el servidor responde

```bash
curl http://localhost:8080
```

**Debe mostrar HTML** (no error de conexión)

### 2. Verificar en el navegador

1. Abre el navegador (Chrome, Firefox, Edge)
2. Ve a: `http://localhost:8080`
3. Abre la consola del desarrollador (F12)
4. Revisa la pestaña "Console" por errores

### 3. Errores Comunes

**Error: "Cannot GET /"**
- ✅ Normal en desarrollo con React Router
- ✅ Debe mostrar la aplicación React

**Error: "Failed to load module"**
- ⚠️ Problema con dependencias
- Solución: `npm install`

**Página en blanco**
- ⚠️ Error de JavaScript
- Revisar consola del navegador (F12)

---

## 📱 Probar en Modo Incógnito

A veces las extensiones del navegador interfieren:

1. Abre ventana incógnita (Ctrl+Shift+N)
2. Ve a: http://localhost:8080
3. Debe funcionar sin extensiones

---

## 🎯 Comandos de Diagnóstico

```bash
# Ver procesos de Node/Vite
ps aux | grep -E "vite|node" | grep -v grep

# Ver puertos en uso
netstat -tulpn | grep -E "8080|8081"

# Probar conexión
curl -v http://localhost:8080

# Ver logs del servidor
# (en la terminal donde ejecutaste npm run dev)
```

---

## ✅ Lo Que Deberías Ver

Cuando todo funciona correctamente:

1. **Terminal muestra:**
   ```
   VITE v5.4.19  ready in XXX ms
   ➜  Local:   http://localhost:8080/
   ```

2. **Navegador muestra:**
   - Página de inicio con botones de emergencia
   - Menú superior con búsqueda
   - Navegación inferior
   - Tema oscuro

3. **Si ves página en blanco:**
   - Abre consola (F12)
   - Revisa errores en pestaña "Console"
   - Comparte los errores para diagnosticar

---

## 🆘 Si Nada Funciona

1. **Reiniciar todo:**
   ```bash
   # Matar todos los procesos
   pkill -f vite
   pkill -f "npm run dev"
   
   # Limpiar e instalar
   rm -rf node_modules
   npm install
   
   # Iniciar de nuevo
   npm run dev
   ```

2. **Verificar archivos:**
   ```bash
   # Verificar que existe index.html
   ls -la index.html
   
   # Verificar que existe src/main.tsx
   ls -la src/main.tsx
   
   # Verificar archivos .md
   ls -la public/manual/BLOQUE_0_FUNDAMENTOS/
   ```

---

**¿Qué ves exactamente en el navegador?**
- ¿Página completamente en blanco?
- ¿Error de conexión?
- ¿Algún mensaje de error?
- ¿Carga pero no muestra contenido?

Comparte lo que ves y puedo ayudarte mejor.
