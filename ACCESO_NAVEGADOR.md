# 🌐 Cómo Acceder desde el Navegador

## ✅ Estado Actual

**Hay 2 servidores corriendo:**
- ✅ Puerto **8080** - http://localhost:8080
- ✅ Puerto **8081** - http://localhost:8081

**Ambos están funcionando correctamente.**

---

## 🚀 Acceso Rápido

### Opción 1: Puerto 8080 (Principal)

**Abre en tu navegador:**
```
http://localhost:8080
```

### Opción 2: Puerto 8081 (Alternativo)

**Abre en tu navegador:**
```
http://localhost:8081
```

---

## 📱 Desde Otros Dispositivos (Misma Red)

Tu IP es: **192.168.1.136**

**Desde móvil/tablet:**
- http://192.168.1.136:8080
- http://192.168.1.136:8081

---

## 🔍 Si No Ves Nada en el Navegador

### Paso 1: Verificar URL Exacta

**Asegúrate de escribir exactamente:**
- ✅ `http://localhost:8080` (con http://)
- ❌ NO `localhost:8080` (sin http)
- ❌ NO `https://localhost:8080` (no usar https)

### Paso 2: Abrir Consola del Navegador

1. Presiona **F12** (o clic derecho → Inspeccionar)
2. Ve a la pestaña **"Console"**
3. Revisa si hay errores en rojo

### Paso 3: Verificar Qué Ves

**¿Qué aparece exactamente?**
- [ ] Página completamente en blanco
- [ ] Error "No se puede conectar"
- [ ] Error 404
- [ ] Carga pero no muestra contenido
- [ ] Otro error (especificar)

---

## 🎯 Lo Que Deberías Ver

Cuando funciona correctamente deberías ver:

1. **Header superior** con:
   - Logo/título "EMERGES TES"
   - Botón de búsqueda
   - Botón de menú

2. **Contenido principal** con:
   - Barra de búsqueda
   - Botones de emergencias críticas (RCP, Ictus, Shock, Vía Aérea)
   - Accesos rápidos
   - Últimas consultas

3. **Navegación inferior** con iconos

---

## 🔧 Solución Rápida

### Limpiar y Reiniciar

```bash
# 1. Detener todos los servidores
pkill -f vite
pkill -f "npm run dev"

# 2. Esperar 2 segundos
sleep 2

# 3. Iniciar servidor limpio
cd /home/planetazuzu/protocolo-r-pido
npm run dev
```

**Luego espera a ver este mensaje:**
```
VITE v5.4.19  ready in XXX ms
➜  Local:   http://localhost:8080/
```

**Y abre:** http://localhost:8080

---

## 📋 Checklist de Verificación

- [ ] Servidor muestra "ready" en la terminal
- [ ] URL es exactamente `http://localhost:8080`
- [ ] Navegador no está en modo offline
- [ ] No hay extensiones bloqueando (probar modo incógnito)
- [ ] Consola del navegador (F12) no muestra errores críticos

---

## 🆘 Comandos de Diagnóstico

```bash
# Ver si el servidor responde
curl http://localhost:8080 | head -20

# Ver procesos corriendo
ps aux | grep vite

# Ver puertos en uso
lsof -i :8080 -i :8081
```

---

**¿Qué ves exactamente cuando abres http://localhost:8080 en el navegador?**
