import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Detectar base path dinámicamente (para GitHub Pages)
    const base = import.meta.env.BASE_URL || '/';
    navigator.serviceWorker
      .register(`${base}sw.js`)
      .then((registration) => {
        console.log('SW registered:', registration);
        
        // Verificar actualizaciones cada hora
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
