import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GuideModeBadge } from '@/components/guide/GuideModeBadge';

interface GuideLayoutProps {
  children: React.ReactNode;
  onSearchClick: () => void;
  onMenuClick: () => void;
}

/**
 * Layout específico para Guías de Refuerzo (Modo Formativo)
 * 
 * Características:
 * - Reutiliza Header y Footer existentes
 * - NO incluye BottomNav (diferencia visual con modo operativo)
 * - Badge "Modo Formación" visible
 * - Más espaciado vertical para mejor lectura
 * - No modifica componentes de layout existentes
 */
export const GuideLayout = ({ children, onSearchClick, onMenuClick }: GuideLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onSearchClick={onSearchClick}
        onMenuClick={onMenuClick}
      />
      
      <main className="pt-14 pb-8 flex-1">
        <div className="container max-w-2xl mx-auto py-6">
          <div className="mb-4">
            <GuideModeBadge />
          </div>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

