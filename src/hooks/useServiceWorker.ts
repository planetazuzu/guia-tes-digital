import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  registration: ServiceWorkerRegistration | null;
  updateAvailable: boolean;
  offline: boolean;
}

/**
 * Hook para gestionar el Service Worker y actualizaciones de la PWA
 */
export const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>({
    registration: null,
    updateAvailable: false,
    offline: !navigator.onLine,
  });

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    // No registrar SW en desarrollo para evitar conflictos con Vite HMR
    const isDevelopment = import.meta.env.DEV || 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      // En desarrollo, solo manejar estado online/offline
      const handleOnline = () => setState((prev) => ({ ...prev, offline: false }));
      const handleOffline = () => setState((prev) => ({ ...prev, offline: true }));

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    // Detectar cambios en conexión
    const handleOnline = () => setState((prev) => ({ ...prev, offline: false }));
    const handleOffline = () => setState((prev) => ({ ...prev, offline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Registrar Service Worker (solo en producción)
    const base = import.meta.env.BASE_URL || '/';
    navigator.serviceWorker
      .register(`${base}sw.js`)
      .then((registration) => {
        setState((prev) => ({ ...prev, registration }));

        // Verificar actualizaciones periódicamente
        const checkForUpdates = () => {
          registration.update();
        };

        // Verificar cada hora
        const updateInterval = setInterval(checkForUpdates, 60 * 60 * 1000);

        // Escuchar actualizaciones del Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Hay una nueva versión disponible
              setState((prev) => ({ ...prev, updateAvailable: true }));
            }
          });
        });

        // Limpiar intervalo al desmontar
        return () => {
          clearInterval(updateInterval);
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      })
      .catch((error) => {
        console.error('SW registration failed:', error);
      });
  }, []);

  /**
   * Forzar actualización del Service Worker
   */
  const updateServiceWorker = async () => {
    if (!state.registration) return;

    try {
      await state.registration.update();
      
      // Si hay un worker esperando, activarlo
      if (state.registration.waiting) {
        state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating service worker:', error);
    }
  };

  /**
   * Recargar la página para aplicar actualización
   */
  const reloadPage = () => {
    window.location.reload();
  };

  return {
    ...state,
    updateServiceWorker,
    reloadPage,
  };
};
