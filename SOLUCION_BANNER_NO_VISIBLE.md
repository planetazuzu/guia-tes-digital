# 🔧 Solución: Banner de Instalación No Se Ve

**Fecha:** 2024-12-20

---

## 🐛 PROBLEMA

El banner de instalación PWA no aparece.

---

## ✅ SOLUCIONES IMPLEMENTADAS

### 1. Modo Desarrollo (Testing)

**En desarrollo (`npm run dev`), el banner se mostrará automáticamente después de 5 segundos** incluso si el evento `beforeinstallprompt` no se dispara.

**Esto permite:**
- Ver cómo se ve el banner
- Probar la UI
- Verificar que el componente funciona

**Para probar:**
```bash
npm run dev
# Abrir http://localhost:8096
# Esperar 5 segundos
# El banner debería aparecer
```

### 2. Logs de Debug

Se añadieron logs en consola para debugging:

```
[PWA Install] Hook initialized
[PWA Install] Setting up install prompt listeners
[PWA Install] Development mode: Will show banner after 5 seconds for testing
[PWA Install] Development: Showing banner for testing
[InstallBanner] Render - State: { isInstallable: true, showBanner: true }
[InstallBanner] ✅ Rendering banner!
```

**Abre DevTools (F12) > Console para ver estos mensajes.**

---

## 🔍 VERIFICACIONES

### 1. Abrir Consola del Navegador

Abre DevTools (F12) > Console y busca:

```
[PWA Install] Hook initialized
```

**Si NO ves este mensaje:**
- El hook no se está ejecutando
- Verificar que `InstallBanner` está en `App.tsx`

### 2. Verificar Estado

En la consola deberías ver:

```
[InstallBanner] Render - State: { isInstallable: false, showBanner: false }
```

**Después de 5 segundos en desarrollo:**
```
[PWA Install] Development: Showing banner for testing
[InstallBanner] Render - State: { isInstallable: true, showBanner: true }
[InstallBanner] ✅ Rendering banner!
```

### 3. Verificar que el Componente se Renderiza

Abre React DevTools:
1. Buscar componente `InstallBanner`
2. Verificar que existe en el árbol
3. Verificar props: `isInstallable`, `showBanner`

---

## 🚨 SI SIGUE SIN APARECER

### Solución Temporal: Forzar Mostrar

Añade esto temporalmente en `InstallBanner.tsx`:

```tsx
const InstallBanner = () => {
  const { isInstallable, showBanner, install, dismissBanner } = usePWAInstall();

  // TEMPORAL: Forzar mostrar para testing
  if (import.meta.env.DEV) {
    return (
      <div className="fixed bottom-20 left-0 right-0 z-50 bg-red-500 p-4">
        <p className="text-white">BANNER DE PRUEBA - Debería verse</p>
        <p className="text-white text-sm">isInstallable: {String(isInstallable)}</p>
        <p className="text-white text-sm">showBanner: {String(showBanner)}</p>
      </div>
    );
  }

  // ... resto del código
};
```

Si este banner de prueba SÍ se ve, entonces el problema es la lógica del hook.
Si NO se ve, entonces el problema es que el componente no se está renderizando.

---

## 📋 CHECKLIST RÁPIDO

- [ ] Abrir consola del navegador (F12)
- [ ] Ver mensajes `[PWA Install]`
- [ ] En desarrollo, esperar 5 segundos
- [ ] Ver mensaje `[InstallBanner] ✅ Rendering banner!`
- [ ] Verificar React DevTools que `InstallBanner` existe
- [ ] Verificar que no está en modo standalone (ya instalada)
- [ ] Verificar localStorage: `localStorage.getItem('pwa-install-dismissed')`

---

## 🧪 TEST RÁPIDO

```bash
# 1. Limpiar localStorage
# En consola del navegador:
localStorage.removeItem('pwa-install-dismissed')

# 2. Recargar página
# F5 o Ctrl+R

# 3. Esperar 5 segundos

# 4. Verificar consola
# Deberías ver: [InstallBanner] ✅ Rendering banner!
```

---

**Última actualización:** 2024-12-20
