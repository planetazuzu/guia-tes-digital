import { useState } from 'react';
import { Settings, Moon, Sun, Monitor, Trash2, AlertCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { useSearchHistory } from '@/hooks/useSearchHistory';

const Ajustes = () => {
  const { theme, setTheme } = useTheme();
  const { clearFavorites } = useFavorites();
  const { clearHistory } = useSearchHistory();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    clearFavorites();
    clearHistory();
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Ajustes</h1>
        <p className="text-muted-foreground text-sm">
          Configuración de la aplicación
        </p>
      </div>

      {/* Tema */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Apariencia</h2>
        <div className="space-y-2">
          <button
            onClick={() => setTheme('light')}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ${
              theme === 'light'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border hover:border-primary/50'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span className="font-medium">Claro</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border hover:border-primary/50'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span className="font-medium">Oscuro</span>
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ${
              theme === 'system'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border hover:border-primary/50'
            }`}
          >
            <Monitor className="w-5 h-5" />
            <span className="font-medium">Sistema</span>
          </button>
        </div>
      </section>

      {/* Datos */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Datos</h2>
        <div className="p-4 bg-card border border-border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Favoritos</p>
              <p className="text-sm text-muted-foreground">
                Guardados localmente en tu dispositivo
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearFavorites();
              }}
            >
              Limpiar
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Historial</p>
              <p className="text-sm text-muted-foreground">
                Búsquedas recientes (sesión)
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearHistory();
              }}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </section>

      {/* Información */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Información</h2>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Versión</p>
            <p className="text-sm font-medium text-foreground">1.0.0</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Almacenamiento</p>
            <p className="text-sm font-medium text-foreground">Local</p>
          </div>
        </div>
      </section>

      {/* Advertencia */}
      <div className="p-4 bg-muted border border-border rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground mb-1">
            Datos locales
          </p>
          <p className="text-sm text-muted-foreground">
            Todos los datos se guardan localmente en tu dispositivo. Si limpias el almacenamiento del navegador, se perderán.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ajustes;
