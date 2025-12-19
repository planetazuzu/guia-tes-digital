import { useEffect, useState } from 'react';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

/**
 * Componente que muestra notificación cuando hay una actualización disponible
 */
const UpdateNotification = () => {
  const { updateAvailable, updateServiceWorker, reloadPage } = useServiceWorker();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (updateAvailable) {
      setShowBanner(true);
    }
  }, [updateAvailable]);

  // No mostrar si no hay actualización o el usuario cerró el banner
  if (!updateAvailable || !showBanner) {
    return null;
  }

  const handleUpdate = () => {
    updateServiceWorker();
    reloadPage();
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 px-4 md:px-0">
      <div className="container max-w-2xl mx-auto">
        <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <div>
              <p className="font-semibold">Nueva versión disponible</p>
              <p className="text-sm opacity-90">
                Hay una actualización de la aplicación. Actualiza para obtener las últimas mejoras.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleUpdate}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Actualizar ahora
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              Más tarde
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
