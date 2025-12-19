import { X, Star, History, Settings, Info, Share2, ClipboardCheck, Phone, MessageSquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuSheet = ({ isOpen, onClose }: MenuSheetProps) => {
  if (!isOpen) return null;

  const handleShare = async () => {
    const shareData = {
      title: 'EMERGES TES - Guía de Protocolos',
      text: 'Guía rápida de protocolos médicos de emergencias para Técnicos de Emergencias Sanitarias',
      url: window.location.origin,
    };

    try {
      // Intentar usar Web Share API nativa (móviles)
      if (navigator.share) {
        await navigator.share(shareData);
        onClose();
      } else {
        // Fallback: copiar URL al portapapeles
        await navigator.clipboard.writeText(shareData.url);
        alert('URL copiada al portapapeles');
        onClose();
      }
    } catch (error) {
      // Usuario canceló o error
      if ((error as Error).name !== 'AbortError') {
        console.error('Error al compartir:', error);
        // Fallback: copiar URL
        try {
          await navigator.clipboard.writeText(shareData.url);
          alert('URL copiada al portapapeles');
        } catch (clipboardError) {
          console.error('Error al copiar:', clipboardError);
        }
      }
    }
  };

  const menuItems = [
    { icon: <BookOpen className="w-5 h-5" />, label: 'Manual Completo', path: '/manual', onClick: onClose },
    { icon: <Phone className="w-5 h-5" />, label: 'Protocolos Transtelefónicos', path: '/telefono', onClick: onClose },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Guiones de Comunicación', path: '/comunicacion', onClick: onClose },
    { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Checklists Material', path: '/material', onClick: onClose },
    { icon: <Star className="w-5 h-5" />, label: 'Favoritos', onClick: () => {} },
    { icon: <History className="w-5 h-5" />, label: 'Historial', onClick: () => {} },
    { icon: <Share2 className="w-5 h-5" />, label: 'Compartir App', onClick: handleShare },
    { icon: <Settings className="w-5 h-5" />, label: 'Ajustes', onClick: () => {} },
    { icon: <Info className="w-5 h-5" />, label: 'Acerca de', onClick: () => {} },
  ];

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
            const content = (
              <>
                <span className="text-muted-foreground">{item.icon}</span>
                <span className="font-medium text-foreground">{item.label}</span>
              </>
            );

            if (item.path) {
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={index}
                onClick={item.onClick}
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
};

export default MenuSheet;
