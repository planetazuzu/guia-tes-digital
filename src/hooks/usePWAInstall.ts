import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Hook para gestionar la instalación de la PWA
 */
export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    console.log('[PWA Install] Hook initialized');
    
    // Verificar si ya está instalada
    const checkIfInstalled = () => {
      // En modo standalone (instalada)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('[PWA Install] App is already installed (standalone mode)');
        setIsInstalled(true);
        return true;
      }
      
      // En iOS, verificar si está en la pantalla de inicio
      if ((window.navigator as any).standalone === true) {
        console.log('[PWA Install] App is already installed (iOS standalone)');
        setIsInstalled(true);
        return true;
      }
      
      return false;
    };

    if (checkIfInstalled()) {
      console.log('[PWA Install] App already installed, skipping install prompt');
      return;
    }

    console.log('[PWA Install] Setting up install prompt listeners');

    // Escuchar el evento beforeinstallprompt (Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que el navegador muestre su propio banner
      e.preventDefault();
      
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
      
      // Mostrar banner después de un pequeño delay (mejor UX)
      setTimeout(() => {
        setShowBanner(true);
      }, 3000); // 3 segundos después de cargar
    };

    // Escuchar cuando se instala la app
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowBanner(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Verificar si ya está instalada al cargar
    const isAlreadyInstalled = checkIfInstalled();
    
    // Si no está instalada, verificar si hay un prompt guardado de una sesión anterior
    if (!isAlreadyInstalled) {
      // En desarrollo, mostrar banner después de un delay para testing
      // Esto permite ver el banner incluso si beforeinstallprompt no se dispara
      let devTimeout: NodeJS.Timeout | null = null;
      
      if (import.meta.env.DEV) {
        console.log('[PWA Install] Development mode: Will show banner after 5 seconds for testing');
        devTimeout = setTimeout(() => {
          console.log('[PWA Install] Development: Showing banner for testing');
          setIsInstallable(true);
          setShowBanner(true);
        }, 5000);
      }

      return () => {
        if (devTimeout) clearTimeout(devTimeout);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /**
   * Instalar la PWA
   */
  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      console.log('[PWA Install] install() called but no deferredPrompt available');
      // En desarrollo, simular instalación exitosa para testing
      if (import.meta.env.DEV) {
        console.log('[PWA Install] Development: Simulating successful installation');
        setIsInstalled(true);
        setShowBanner(false);
        return true;
      }
      return false;
    }

    try {
      console.log('[PWA Install] Showing install prompt');
      // Mostrar el prompt de instalación
      await deferredPrompt.prompt();
      
      // Esperar a que el usuario responda
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[PWA Install] User choice:', outcome);
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowBanner(false);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('[PWA Install] Error installing PWA:', error);
      return false;
    } finally {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  /**
   * Cerrar el banner
   */
  const dismissBanner = () => {
    setShowBanner(false);
    // Guardar en localStorage que el usuario cerró el banner
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };


  return {
    isInstallable,
    isInstalled,
    showBanner,
    install,
    dismissBanner,
  };
};
