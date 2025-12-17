import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  /**
   * Ruta específica a la que volver. Si no se proporciona, usa history.back()
   */
  to?: string;
  /**
   * Texto del botón. Por defecto: "Volver"
   */
  label?: string;
  /**
   * Clases CSS adicionales
   */
  className?: string;
  /**
   * Variante del botón
   */
  variant?: 'default' | 'outline' | 'ghost' | 'link';
}

/**
 * Componente de botón de retroceso para PWA
 * 
 * Funcionalidad:
 * - Si se proporciona `to`, navega a esa ruta
 * - Si no, usa el historial del navegador (history.back())
 * - Funciona correctamente en PWA instalada
 */
const BackButton = ({ 
  to, 
  label = 'Volver', 
  className = '',
  variant = 'ghost'
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      // Usar historial del navegador para retroceso nativo
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        // Si no hay historial, ir al inicio
        navigate('/');
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={`flex items-center gap-2 ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </Button>
  );
};

export default BackButton;
