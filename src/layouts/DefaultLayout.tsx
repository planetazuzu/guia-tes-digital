import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';

interface DefaultLayoutProps {
  children: React.ReactNode;
  onSearchClick: () => void;
  onMenuClick: () => void;
}

/**
 * Layout por defecto (Modo Operativo)
 * 
 * Wrapper del layout actual de la app sin modificaciones.
 * Este layout se usa para todas las páginas operativas existentes.
 * 
 * Características:
 * - Header fijo superior
 * - BottomNav fijo inferior
 * - Footer
 * - Contenedor max-w-2xl centrado
 * - Padding para compensar elementos fijos
 */
export const DefaultLayout = ({ children, onSearchClick, onMenuClick }: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onSearchClick={onSearchClick}
        onMenuClick={onMenuClick}
      />

      <main className="pt-14 pb-safe flex-1">
        <div className="container max-w-2xl py-4">
          {children}
        </div>
      </main>

      <BottomNav />

      <Footer />
    </div>
  );
};

