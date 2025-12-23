# 📱 Instrucciones: Ver el Banner de Instalación

**Fecha:** 2025-12-23

---

## ✅ CÓMO VER EL BANNER

### Opción 1: Modo Desarrollo (Más Fácil)

En **modo desarrollo**, el banner se mostrará automáticamente después de **5 segundos**:

```bash
npm run dev
# Abrir http://localhost:8096
# Esperar 5 segundos
# El banner debería aparecer en la parte inferior
```

**Nota:** Esto funciona incluso si el evento `beforeinstallprompt` no se dispara, para que puedas ver cómo se ve el banner.

---

### Opción 2: Preview (Más Realista)

El preview simula mejor el entorno de producción:

```bash
npm run build
npm run preview
# Abrir http://localhost:4173
# Esperar 3-5 segundos
# El banner debería aparecer
```

---

### Opción 3: Producción con HTTPS

En producción con HTTPS, el banner aparecerá cuando:
1. El navegador detecte que la app es instalable
2. El evento `beforeinstallprompt` se dispare
3. Después de 3 segundos

**Requisitos:**
- ✅ HTTPS activo
- ✅ Service Worker registrado
- ✅ Manifest.json válido
- ✅ Navegador compatible (Chrome/Edge)

---

## 🔍 VERIFICAR EN CONSOLA

Abre DevTools (F12) > Console y busca estos mensajes:

```
[PWA Install] Hook initialized
[PWA Install] Setting up install prompt listeners
[PWA Install] Development mode: Will show banner after 5 seconds for testing
[InstallBanner] Development: Forcing banner to show for testing
[InstallBanner] ✅ Rendering banner!
```

**Si ves estos mensajes pero el banner no aparece:**
- Verificar z-index (puede estar detrás de otro elemento)
- Verificar que no hay errores de CSS
- Verificar React DevTools que el componente se renderiza

---

## 🚨 SI NO SE VE

### Paso 1: Verificar Consola
- Abrir DevTools (F12)
- Ir a Console
- Buscar mensajes `[PWA Install]` y `[InstallBanner]`

### Paso 2: Verificar React DevTools
- Instalar React DevTools (extensión del navegador)
- Buscar componente `InstallBanner`
- Verificar que existe y tiene las props correctas

### Paso 3: Verificar CSS
- Abrir DevTools > Elements
- Buscar elemento con clase `fixed bottom-20`
- Verificar que no está oculto (`display: none`)

### Paso 4: Resetear localStorage
```javascript
// En consola del navegador
localStorage.removeItem('pwa-install-dismissed')
// Recargar página (F5)
```

---

## 📋 CHECKLIST

- [ ] Abrir `http://localhost:8096` (o preview)
- [ ] Abrir DevTools (F12) > Console
- [ ] Esperar 5 segundos
- [ ] Ver mensaje `[InstallBanner] ✅ Rendering banner!`
- [ ] Ver banner en la parte inferior de la pantalla

---

**Última actualización:** 2025-12-23
