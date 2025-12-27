import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { getGuideById, getGuideSection } from '@/data/guides-index';

interface GuideNavigationProps {
  guideId: string;
  currentSection: number;
}

/**
 * Navegación entre secciones de una guía
 * 
 * Muestra:
 * - Botón "Anterior" (si no es la primera sección)
 * - Indicador "Sección X de 8"
 * - Botón "Siguiente" (si no es la última sección)
 * - Botón opcional al protocolo operativo (si existe)
 */
export const GuideNavigation = ({ guideId, currentSection }: GuideNavigationProps) => {
  const guide = getGuideById(guideId);
  if (!guide) return null;

  const previousSection = currentSection > 1 ? currentSection - 1 : null;
  const nextSection = currentSection < guide.secciones.length ? currentSection + 1 : null;

  const previousSectionData = previousSection ? getGuideSection(guideId, previousSection) : null;
  const nextSectionData = nextSection ? getGuideSection(guideId, nextSection) : null;

  return (
    <div className="space-y-4 pt-6 border-t border-border">
      {/* Navegación anterior/siguiente */}
      <div className="flex justify-between items-center">
        {previousSectionData ? (
          <Link
            to={`/guia-refuerzo/${guideId}/seccion/${previousSection}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Anterior</div>
              <div className="font-medium text-foreground text-sm">{previousSectionData.titulo}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        <div className="text-center">
          <div className="text-xs text-muted-foreground">Sección</div>
          <div className="font-semibold text-foreground">
            {currentSection} / {guide.secciones.length}
          </div>
        </div>

        {nextSectionData ? (
          <Link
            to={`/guia-refuerzo/${guideId}/seccion/${nextSection}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors group"
          >
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Siguiente</div>
              <div className="font-medium text-foreground text-sm">{nextSectionData.titulo}</div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Botón opcional al protocolo operativo */}
      {guide.protocoloOperativo && (
        <div className="flex justify-center">
          <Link
            to={guide.protocoloOperativo.ruta}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <span>Ir a Protocolo Operativo</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

