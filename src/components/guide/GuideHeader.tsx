import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Guide } from '@/data/guides-index';
import { GuideModeBadge } from './GuideModeBadge';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface GuideHeaderProps {
  guide: Guide;
}

/**
 * Header específico para una guía de refuerzo
 * 
 * Muestra:
 * - Icono de la guía
 * - Título y descripción
 * - Badge "Modo Formación"
 * - Enlace al protocolo operativo (si existe)
 */
export const GuideHeader = ({ guide }: GuideHeaderProps) => {
  const Icon = (Icons as any)[guide.icono] as LucideIcon || Icons.BookOpen;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-3xl font-bold text-foreground">{guide.titulo}</h1>
            <GuideModeBadge />
          </div>
          <p className="text-muted-foreground">Guía de Refuerzo — Modo Formativo</p>
        </div>
      </div>

      {guide.protocoloOperativo && (
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Protocolo Operativo relacionado:</p>
              <p className="font-medium text-foreground">{guide.protocoloOperativo.titulo}</p>
            </div>
            <Link
              to={guide.protocoloOperativo.ruta}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <span>Ir a Protocolo</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

