import { X, Star, History, Settings, Info, Share2, ClipboardCheck, Phone, MessageSquare, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo, useCallback, memo } from 'react';
import { toast } from 'sonner';

interface MenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Memoizar iconos para evitar re-creación
const MenuIcon = memo(({ Icon, className }: { Icon: any; className?: string }) => (
  <Icon className={className || "w-5 h-5"} />
));
MenuIcon.displayName = 'MenuIcon';

const MenuSheet = memo(({ isOpen, onClose }: MenuSheetProps) => {
  if (!isOpen) return null;

  const handleShare = useCallback(() => {
    // Usar setTimeout para no bloquear la UI
    setTimeout(async () => {
      const shareData = {
        title: 'EMERGES TES - Guía de Protocolos',
        text: 'Guía rápida de protocolos médicos de emergencias para Técnicos de Emergencias Sanitarias',
        url: window.location.origin,
      };

      try {
        // Intentar usar Web Share API nativa (móviles)
        if (navigator.share) {
          await navigator.share(shareData);
          // Cerrar después de compartir exitosamente
          setTimeout(() => onClose(), 0);
        } else {
          // Fallback: copiar URL al portapapeles
          await navigator.clipboard.writeText(shareData.url);
          toast.success('URL copiada al portapapeles');
          setTimeout(() => onClose(), 0);
        }
      } catch (error) {
        // Usuario canceló o error
        if ((error as Error).name !== 'AbortError') {
          console.error('Error al compartir:', error);
          // Fallback: copiar URL
          try {
            await navigator.clipboard.writeText(shareData.url);
            toast.success('URL copiada al portapapeles');
          } catch (clipboardError) {
            console.error('Error al copiar:', clipboardError);
            toast.error('No se pudo copiar al portapapeles');
          }
        }
      }
    }, 0);
  }, [onClose]);

  // Memoizar menuItems para evitar re-creación en cada render
  const menuItems = useMemo(() => [
    { icon: BookOpen, label: 'Manual Completo', path: '/manual', onClick: onClose },
    { icon: GraduationCap, label: 'Guías de Refuerzo', path: '/guia-refuerzo', onClick: onClose },
    { icon: Phone, label: 'Protocolos Transtelefónicos', path: '/telefono', onClick: onClose },
    { icon: MessageSquare, label: 'Guiones de Comunicación', path: '/comunicacion', onClick: onClose },
    { icon: ClipboardCheck, label: 'Checklists Material', path: '/material', onClick: onClose },
    { icon: Star, label: 'Favoritos', path: '/favoritos', onClick: onClose },
    { icon: History, label: 'Historial', path: '/historial', onClick: onClose },
    { icon: Share2, label: 'Compartir App', onClick: handleShare },
    { icon: Settings, label: 'Ajustes', path: '/ajustes', onClick: onClose },
    { icon: Info, label: 'Acerca de', path: '/acerca', onClick: onClose },
  ], [onClose, handleShare]);

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 bottom-0 z-[95] w-80 max-w-[85vw] bg-card border-l border-border shadow-xl">
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Menú</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="text-muted-foreground"><Icon className="w-5 h-5" /></span>
                <span className="font-medium text-foreground">{item.label}</span>
              </>
            );

            if (item.path) {
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={(e) => {
                    // Permitir navegación normal, pero ejecutar onClick de forma no bloqueante
                    if (item.onClick) {
                      requestAnimationFrame(() => {
                        item.onClick?.();
                      });
                    }
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  // Usar requestAnimationFrame para no bloquear la UI
                  requestAnimationFrame(() => {
                    item.onClick?.();
                  });
                }}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors text-left"
              >
                {content}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <p className="text-2xs text-muted-foreground text-center">
            EMERGES TES v1.0.0
          </p>
          <p className="text-2xs text-muted-foreground text-center mt-1">
            Guía de Protocolos para TES
          </p>
        </div>
      </div>
    </>
  );
});

MenuSheet.displayName = 'MenuSheet';

export default MenuSheet;
