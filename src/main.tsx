import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
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

createRoot(document.getElementById("root")!).render(<App />);
