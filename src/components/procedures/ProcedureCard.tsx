import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, AlertTriangle, User, Baby, Share2 } from 'lucide-react';
import { Procedure, Priority } from '@/data/procedures';
import Badge from '@/components/shared/Badge';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'sonner';

interface ProcedureCardProps {
  procedure: Procedure;
  defaultExpanded?: boolean;
}

const priorityToBadgeVariant: Record<Priority, 'critical' | 'high' | 'medium' | 'low'> = {
  critico: 'critical',
  alto: 'high',
  medio: 'medium',
  bajo: 'low',
};

const ProcedureCard = ({ procedure, defaultExpanded = false }: ProcedureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { isFavorite, toggleFavorite: toggleFavoriteHook } = useFavorites();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteHook({
      id: procedure.id,
      type: 'procedure',
      title: procedure.shortTitle,
      path: `/soporte-vital?id=${procedure.id}`,
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const url = `${window.location.origin}/soporte-vital?id=${procedure.id}`;
    const shareData = {
      title: `${procedure.shortTitle} - EMERGES TES`,
      text: `Protocolo: ${procedure.shortTitle}\n\nPrioridad: ${procedure.priority}\nGrupo de edad: ${procedure.ageGroup}`,
      url: url,
    };

    try {
      // Intentar usar Web Share API nativa (móviles)
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Protocolo compartido');
      } else {
        // Fallback: copiar al portapapeles
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${url}`);
        toast.success('Enlace copiado al portapapeles');
      }
    } catch (error: any) {
      // El usuario canceló el share o hubo un error
      if (error.name !== 'AbortError') {
        // Si no es cancelación, intentar copiar al portapapeles
        try {
          await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${url}`);
          toast.success('Enlace copiado al portapapeles');
        } catch (clipboardError) {
          toast.error('No se pudo compartir');
        }
      }
    }
  };

  const isFav = isFavorite(procedure.id);

  return (
    <div className="card-procedure">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant={priorityToBadgeVariant[procedure.priority]}>
                {procedure.priority}
              </Badge>
              <Badge variant="info">
                {procedure.ageGroup === 'adulto' && <User className="w-3 h-3 mr-1" />}
                {procedure.ageGroup === 'pediatrico' && <Baby className="w-3 h-3 mr-1" />}
                {procedure.ageGroup}
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {procedure.shortTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Compartir protocolo"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFavorite}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                isFav ? 'text-warning' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Star className={cn('w-5 h-5', isFav && 'fill-current')} />
            </button>
            <div className="w-10 h-10 flex items-center justify-center">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">
              Pasos
            </h4>
            <ol className="space-y-3">
              {procedure.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="step-number">{index + 1}</span>
                  <span className="text-foreground pt-1 flex-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {procedure.warnings.length > 0 && (
            <div className="mt-6">
              <div className="warning-box">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <h4 className="font-semibold text-warning text-sm uppercase tracking-wide">
                    Puntos Clave
                  </h4>
                </div>
                <ul className="space-y-1">
                  {procedure.warnings.map((warning, index) => (
                    <li key={index} className="text-foreground text-sm flex items-start gap-2">
                      <span className="text-warning">⚠️</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {procedure.keyPoints && procedure.keyPoints.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide mb-2">
                Recuerda
              </h4>
              <ul className="space-y-1">
                {procedure.keyPoints.map((point, index) => (
                  <li key={index} className="text-foreground text-sm flex items-start gap-2">
                    <span className="text-info">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {procedure.equipment && procedure.equipment.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide mb-2">
                Material
              </h4>
              <div className="flex flex-wrap gap-2">
                {procedure.equipment.map((item, index) => (
                  <Badge key={index} variant="default">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcedureCard;
