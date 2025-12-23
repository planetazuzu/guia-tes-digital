# 🔍 Guía de Debug: Banner de Instalación PWA

**Fecha:** 2024-12-20

---

## 🐛 PROBLEMA: Banner No Se Ve

Si el banner de instalación no aparece, sigue esta guía de debugging.

---

## ✅ VERIFICACIONES PASO A PASO

### 1. Verificar Consola del Navegador

Abre DevTools (F12) y busca estos mensajes:

```
[PWA Install] Hook initialized
[PWA Install] Setting up install prompt listeners
[PWA Install] beforeinstallprompt event detected
[PWA Install] Showing banner in 3 seconds
[InstallBanner] State: { isInstallable: true, showBanner: true }
```

**Si NO ves estos mensajes:**
- El evento `beforeinstallprompt` no se está disparando
- Verifica los requisitos PWA (ver abajo)

---

### 2. Verificar Requisitos PWA

El banner solo aparece si se cumplen TODOS estos requisitos:

#### ✅ Manifest.json
```bash
# Verificar que existe
ls -la public/manifest.json

# Verificar que se copia al build
ls -la dist/manifest.json
```

#### ✅ Service Worker
```bash
# Verificar que existe
ls -la public/sw.js

# Verificar que se copia al build
ls -la dist/sw.js

# En DevTools > Application > Service Workers
# Debe estar registrado y activo
```

#### ✅ HTTPS (o localhost)
- **Producción:** Debe estar en HTTPS
- **Desarrollo:** `localhost` funciona
- **Preview:** `npm run preview` usa localhost

#### ✅ No estar ya instalada
- Si la app ya está instalada, el banner NO aparece
- Verificar en DevTools: `window.matchMedia('(display-mode: standalone)').matches`

---

### 3. Verificar Navegador

El evento `beforeinstallprompt` solo funciona en:
- ✅ Chrome (Desktop y Android)
- ✅ Edge (Desktop y Android)
- ✅ Opera (Desktop y Android)
- ✅ Samsung Internet
- ❌ Safari (iOS) - NO soporta `beforeinstallprompt`
- ❌ Firefox - NO soporta `beforeinstallprompt` (aún)

**Test rápido:**
```javascript
// En consola del navegador
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt detected!', e);
});
```

Si no aparece nada, el navegador no soporta el evento.

---

### 4. Verificar Estado del Hook

Añade esto temporalmente en `InstallBanner.tsx`:

```tsx
const InstallBanner = () => {
  const { isInstallable, showBanner, install, dismissBanner } = usePWAInstall();

  // Debug temporal
  console.log('InstallBanner render:', { isInstallable, showBanner });

  // Mostrar siempre para debug (temporal)
  if (true) {
    return (
      <div className="fixed bottom-20 left-0 right-0 z-50 bg-red-500 p-4">
        <p>DEBUG: isInstallable={String(isInstallable)}, showBanner={String(showBanner)}</p>
      </div>
    );
  }

  // ... resto del código
};
```

---

### 5. Verificar localStorage

El banner puede estar oculto si el usuario lo cerró:

```javascript
// En consola del navegador
localStorage.getItem('pwa-install-dismissed')
// Si devuelve un timestamp, el banner fue cerrado
// Se mostrará de nuevo después de 7 días

// Para resetear (solo para testing):
localStorage.removeItem('pwa-install-dismissed')
```

---

## 🔧 SOLUCIONES COMUNES

### Problema 1: No aparece en desarrollo local

**Causa:** El evento `beforeinstallprompt` requiere HTTPS o localhost, pero a veces no se dispara en desarrollo.

**Solución:**
1. Usar `npm run preview` (simula mejor el entorno de producción)
2. O desplegar en un servidor con HTTPS

### Problema 2: Ya está instalada

**Causa:** Si la app ya está instalada, el banner no aparece.

**Solución:**
- Desinstalar la app primero
- O verificar en modo incógnito

### Problema 3: Navegador no compatible

**Causa:** Safari y Firefox no soportan `beforeinstallprompt`.

**Solución:**
- Usar Chrome/Edge para testing
- En Safari iOS, usar método manual (Compartir → Añadir a pantalla de inicio)

### Problema 4: Service Worker no registrado

**Causa:** El SW no se registró correctamente.

**Solución:**
1. Verificar en DevTools > Application > Service Workers
2. Si no está, verificar que `sw.js` existe en `dist/`
3. Verificar que se registra en `src/main.tsx`

### Problema 5: Manifest.json no válido

**Causa:** El manifest tiene errores.

**Solución:**
1. Verificar en DevTools > Application > Manifest
2. Debe mostrar "Add to homescreen" disponible
3. Verificar que no hay errores en la consola

---

## 🧪 TEST MANUAL

### Test 1: Verificar Evento
```javascript
// En consola del navegador
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('✅ beforeinstallprompt detected!', e);
  e.preventDefault();
  deferredPrompt = e;
});

// Después de unos segundos
console.log('deferredPrompt:', deferredPrompt);
```

### Test 2: Verificar Estado del Hook
```javascript
// En consola del navegador (después de cargar la app)
// Abrir React DevTools
// Buscar InstallBanner component
// Verificar props: isInstallable, showBanner
```

### Test 3: Forzar Mostrar Banner
Añade esto temporalmente en `usePWAInstall.ts`:

```ts
// Al final del useEffect, después de setup
setTimeout(() => {
  console.log('[PWA Install] FORCING banner to show (DEBUG)');
  setIsInstallable(true);
  setShowBanner(true);
}, 5000);
```

---

## 📋 CHECKLIST DE DEBUG

- [ ] Consola muestra mensajes `[PWA Install]`
- [ ] `beforeinstallprompt` se dispara
- [ ] Service Worker está registrado
- [ ] Manifest.json es válido
- [ ] Navegador es compatible (Chrome/Edge)
- [ ] No está en modo standalone (ya instalada)
- [ ] localStorage no tiene `pwa-install-dismissed` reciente
- [ ] Build incluye `sw.js` y `manifest.json`
- [ ] HTTPS o localhost activo

---

## 🚨 SI NADA FUNCIONA

1. **Verificar build:**
   ```bash
   npm run build
   ls -la dist/sw.js dist/manifest.json
   ```

2. **Verificar en preview:**
   ```bash
   npm run preview
   # Abrir http://localhost:4173
   ```

3. **Verificar en producción:**
   - Desplegar en servidor con HTTPS
   - Abrir en Chrome/Edge
   - Verificar consola

4. **Añadir fallback visual:**
   - Mostrar banner siempre (para testing)
   - O añadir botón manual en menú

---

**Última actualización:** 2024-12-20
