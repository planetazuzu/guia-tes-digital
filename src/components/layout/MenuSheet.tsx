import { X, Star, History, Settings, Info, Share2 } from 'lucide-react';

interface MenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuSheet = ({ isOpen, onClose }: MenuSheetProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: <Star className="w-5 h-5" />, label: 'Favoritos', onClick: () => {} },
    { icon: <History className="w-5 h-5" />, label: 'Historial', onClick: () => {} },
    { icon: <Share2 className="w-5 h-5" />, label: 'Compartir App', onClick: () => {} },
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
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors text-left"
            >
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="font-medium text-foreground">{item.label}</span>
            </button>
          ))}
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
