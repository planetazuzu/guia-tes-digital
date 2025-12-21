import { Search, Menu, Wifi, WifiOff, Star, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
}

// Memoizar iconos para evitar re-renders
const MenuIcon = memo(() => <Menu className="w-5 h-5 text-muted-foreground" />);
MenuIcon.displayName = 'MenuIcon';

const SearchIcon = memo(() => <Search className="w-5 h-5 text-muted-foreground" />);
SearchIcon.displayName = 'SearchIcon';

const Header = memo(({ onSearchClick, onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mostrar botón de retroceso si no estamos en la página principal
  const showBackButton = useMemo(() => location.pathname !== '/', [location.pathname]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Memoizar handlers para evitar re-renders
  const handleMenuClick = useCallback(() => {
    // Usar requestAnimationFrame para no bloquear
    requestAnimationFrame(() => {
      onMenuClick();
    });
  }, [onMenuClick]);

  const handleSearchClick = useCallback(() => {
    // Usar requestAnimationFrame para no bloquear
    requestAnimationFrame(() => {
      onSearchClick();
    });
  }, [onSearchClick]);

  // Memoizar clases del estado online
  const onlineStatusClasses = useMemo(() => 
    isOnline
      ? 'bg-success/20 text-success'
      : 'bg-warning/20 text-warning',
    [isOnline]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              onClick={handleBack}
              variant="ghost"
              size="icon"
              className="w-9 h-9"
              aria-label="Volver"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">TES</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-semibold text-foreground text-sm">EMERGES TES</h1>
            <p className="text-2xs text-muted-foreground">Guía de Protocolos</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-2xs font-medium ${
              isOnline
                ? 'bg-success/20 text-success'
                : 'bg-warning/20 text-warning'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                <span className="hidden sm:inline">Offline</span>
              </>
            )}
          </div>

          <button
            onClick={handleSearchClick}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>

          <button
            onClick={handleMenuClick}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Menú"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
