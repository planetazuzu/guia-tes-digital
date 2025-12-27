import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Guide } from '@/data/guides-index';
import { GuideModeBadge } from './GuideModeBadge';

interface GuideCardProps {
  guide: Guide;
}

/**
 * Card clicable para una guía de refuerzo
 * 
 * Muestra:
 * - Icono de la guía
 * - Título y descripción
 * - Badge "Modo Formación"
 * - Número de secciones
 */
export const GuideCard = ({ guide }: GuideCardProps) => {
  const Icon = (Icons as any)[guide.icono] as LucideIcon || Icons.BookOpen;

  return (
    <Link
      to={`/guia-refuerzo/${guide.id}`}
      className="block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-semibold text-foreground text-lg">{guide.titulo}</h3>
            <GuideModeBadge />
          </div>
          <p className="text-muted-foreground text-sm mb-3">{guide.descripcion}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{guide.secciones.length} secciones</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

