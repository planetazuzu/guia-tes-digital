import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// CRÍTICO: Desregistrar Service Worker en desarrollo ANTES de cualquier otra cosa
// Esto evita que el SW intercepte peticiones de Vite HMR
if ('serviceWorker' in navigator) {
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]';
  
  if (isDevelopment) {
    // Desregistrar inmediatamente (síncrono si es posible)
    (async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length > 0) {
          console.log('[SW] 🧹 Development mode: unregistering', registrations.length, 'service worker(s)...');
          
          // Desregistrar todos
          await Promise.all(registrations.map(reg => reg.unregister()));
          
          // Limpiar caches
          if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            console.log('[SW] ✅ Caches cleared');
          }
          
          console.log('[SW] ✅ Service workers unregistered');
          
          // Si había un SW activo, recargar
          if (navigator.serviceWorker.controller) {
            console.log('[SW] 🔄 Reloading to apply changes...');
            window.location.reload();
            return; // No continuar con el resto del código
          }
        }
      } catch (error) {
        console.error('[SW] ❌ Error cleaning up:', error);
      }
    })();
  }
}

// Registrar Service Worker para PWA (solo en producción)
if ('serviceWorker' in navigator) {
  // No registrar SW en desarrollo para evitar conflictos con Vite HMR
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]';
  
  if (!isDevelopment) {
    // En producción, registrar SW normalmente
    window.addEventListener('load', () => {
      // Detectar base path dinámicamente (para GitHub Pages)
      const base = import.meta.env.BASE_URL || '/';
      navigator.serviceWorker
        .register(`${base}sw.js`, {
          updateViaCache: 'none', // Siempre verificar actualizaciones del SW
        })
      .then((registration) => {
        console.log('[SW] Registered:', registration.scope);
        
        // Verificar actualizaciones periódicamente
        const checkForUpdates = () => {
          registration.update().catch((err) => {
            console.log('[SW] Update check failed:', err);
          });
        };
        
        // Verificar cada hora
        setInterval(checkForUpdates, 60 * 60 * 1000);
        
        // Verificar también cuando la página recupera el foco
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden) {
            checkForUpdates();
          }
        });
        
        // Escuchar actualizaciones disponibles
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Hay una nueva versión instalada y esperando
              console.log('[SW] New version available');
              // El hook useServiceWorker manejará la notificación
            }
          });
        });
      })
      .catch((error) => {
        console.error('[SW] Registration failed:', error);
      });
    });
  }
}

createRoot(document.getElementById("root")!).render(<App />);
