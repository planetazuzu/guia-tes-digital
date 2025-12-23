# 🧪 Test: Banner de Instalación PWA

**Fecha:** 2025-12-23

---

## 🔍 DEBUGGING: Banner No Se Ve

Si el banner no aparece, sigue estos pasos:

---

## ✅ PASO 1: Verificar Consola

Abre DevTools (F12) > Console y busca estos mensajes:

```
[PWA Install] Hook initialized
[PWA Install] Setting up install prompt listeners
[InstallBanner] Render - State: { isInstallable: false, showBanner: false }
```

**Si ves estos mensajes pero el banner no aparece:**
- El evento `beforeinstallprompt` no se está disparando
- Verifica los requisitos (ver abajo)

---

## ✅ PASO 2: Modo Desarrollo (Testing)

En **modo desarrollo**, el banner se mostrará automáticamente después de 5 segundos **incluso si no hay prompt real**, para que puedas ver cómo se ve.

**Para probar:**
```bash
npm run dev
# Abrir http://localhost:8096
# Esperar 5 segundos
# El banner debería aparecer
```

---

## ✅ PASO 3: Verificar Requisitos PWA

El banner solo aparece si se cumplen TODOS estos requisitos:

### 1. Manifest.json ✅
```bash
# Verificar que existe
ls -la public/manifest.json
ls -la dist/manifest.json
```

### 2. Service Worker ✅
```bash
# Verificar que existe
ls -la public/sw.js
ls -la dist/sw.js

# En DevTools > Application > Service Workers
# Debe estar "activated and is running"
```

### 3. HTTPS o Localhost ✅
- **Desarrollo:** `localhost` funciona
- **Preview:** `npm run preview` usa localhost
- **Producción:** Debe estar en HTTPS

### 4. Navegador Compatible ✅
- ✅ Chrome (Desktop y Android)
- ✅ Edge (Desktop y Android)
- ✅ Opera
- ❌ Safari - NO soporta `beforeinstallprompt`
- ❌ Firefox - NO soporta `beforeinstallprompt`

### 5. No Estar Ya Instalada ✅
Si la app ya está instalada, el banner NO aparece.

**Verificar:**
```javascript
// En consola del navegador
window.matchMedia('(display-mode: standalone)').matches
// Si es true, la app ya está instalada
```

---

## 🧪 TEST MANUAL

### Test 1: Verificar Evento en Consola

Abre la consola del navegador y ejecuta:

```javascript
// Escuchar el evento
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('✅ beforeinstallprompt detected!', e);
  e.preventDefault();
});

// Recargar la página
// Si ves el mensaje, el evento se está disparando
```

### Test 2: Forzar Mostrar Banner (Desarrollo)

El código ya tiene un fallback en desarrollo que muestra el banner después de 5 segundos incluso sin prompt real.

**Para verificar:**
1. Abrir `http://localhost:8096`
2. Esperar 5 segundos
3. El banner debería aparecer
4. Verificar consola para mensajes `[PWA Install]`

### Test 3: Verificar Estado del Hook

Abre React DevTools y busca el componente `InstallBanner`:
- Verifica las props: `isInstallable`, `showBanner`
- Si ambos son `true`, el banner debería mostrarse

---

## 🔧 SOLUCIONES RÁPIDAS

### Solución 1: Resetear localStorage

Si cerraste el banner antes, puede estar guardado:

```javascript
// En consola del navegador
localStorage.removeItem('pwa-install-dismissed')
// Recargar página
```

### Solución 2: Usar Preview en lugar de Dev

El evento `beforeinstallprompt` puede no dispararse en `npm run dev`:

```bash
npm run build
npm run preview
# Abrir http://localhost:4173
```

### Solución 3: Verificar Build

Asegúrate de que el build incluye los archivos necesarios:

```bash
npm run build
ls -la dist/sw.js dist/manifest.json
# Ambos deben existir
```

---

## 📋 CHECKLIST RÁPIDO

- [ ] Consola muestra `[PWA Install] Hook initialized`
- [ ] Consola muestra `[InstallBanner] Render`
- [ ] Navegador es Chrome/Edge (no Safari/Firefox)
- [ ] Service Worker está registrado (DevTools > Application)
- [ ] Manifest es válido (DevTools > Application > Manifest)
- [ ] No está en modo standalone (ya instalada)
- [ ] localStorage no tiene `pwa-install-dismissed` reciente
- [ ] En desarrollo, esperar 5 segundos para fallback

---

## 🚨 SI SIGUE SIN APARECER

1. **Verificar que el componente se renderiza:**
   - Abrir React DevTools
   - Buscar `InstallBanner`
   - Verificar que existe en el árbol de componentes

2. **Añadir banner de prueba siempre visible:**
   - Temporalmente, cambiar la condición en `InstallBanner.tsx`:
   ```tsx
   if (true) { // Cambiar esto temporalmente
     return <div>BANNER DE PRUEBA</div>;
   }
   ```

3. **Verificar z-index:**
   - El banner tiene `z-40`
   - Verificar que no hay otros elementos con z-index mayor

---

**Última actualización:** 2025-12-23
