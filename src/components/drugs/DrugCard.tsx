import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Package, Syringe, User, Baby, AlertCircle } from 'lucide-react';
import { Drug } from '@/data/drugs';
import Badge from '@/components/shared/Badge';
import { cn } from '@/lib/utils';

interface DrugCardProps {
  drug: Drug;
  defaultExpanded?: boolean;
}

const DrugCard = ({ drug, defaultExpanded = false }: DrugCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card-procedure">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">💊</span>
              <h3 className="font-bold text-foreground text-lg">
                {drug.genericName.toUpperCase()}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">({drug.tradeName})</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleFavorite}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                isFavorite ? 'text-warning' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Star className={cn('w-5 h-5', isFavorite && 'fill-current')} />
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
        <div className="mt-4 pt-4 border-t border-border space-y-4">
          {/* Presentation */}
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Presentación</p>
              <p className="text-foreground font-medium">{drug.presentation}</p>
            </div>
          </div>

          {/* Adult Dose */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Dosis Adulto</p>
              <p className="text-foreground font-medium">{drug.adultDose}</p>
            </div>
          </div>

          {/* Pediatric Dose */}
          {drug.pediatricDose && (
            <div className="flex items-start gap-3">
              <Baby className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Dosis Pediátrica</p>
                <p className="text-foreground font-medium">{drug.pediatricDose}</p>
              </div>
            </div>
          )}

          {/* Routes */}
          <div className="flex items-start gap-3">
            <Syringe className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Vías de Administración</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {drug.routes.map((route) => (
                  <Badge key={route} variant="info">
                    {route}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Dilution */}
          {drug.dilution && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Dilución</p>
              <p className="text-foreground">{drug.dilution}</p>
            </div>
          )}

          {/* Indications */}
          <div>
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
              <span className="text-success">✓</span> Indicaciones
            </p>
            <ul className="space-y-1">
              {drug.indications.map((indication, index) => (
                <li key={index} className="text-foreground text-sm flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span>{indication}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contraindications */}
          <div className="warning-box">
            <p className="text-sm text-warning mb-2 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-4 h-4" /> Contraindicaciones
            </p>
            <ul className="space-y-1">
              {drug.contraindications.map((contraindication, index) => (
                <li key={index} className="text-foreground text-sm flex items-start gap-2">
                  <span className="text-warning">•</span>
                  <span>{contraindication}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Antidote */}
          {drug.antidote && (
            <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-primary font-semibold">
                Antídoto: {drug.antidote}
              </p>
            </div>
          )}

          {/* Critical Points */}
          {drug.criticalPoints && drug.criticalPoints.length > 0 && (
            <div className="p-3 bg-red-50 border-2 border-red-300 rounded-lg">
              <p className="text-sm text-red-900 font-semibold mb-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Puntos TES Críticos
              </p>
              <ul className="space-y-1">
                {drug.criticalPoints.map((point, index) => (
                  <li key={index} className="text-red-900 text-sm flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes */}
          {drug.notes && drug.notes.length > 0 && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Notas</p>
              <ul className="space-y-1">
                {drug.notes.map((note, index) => (
                  <li key={index} className="text-foreground text-sm">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrugCard;
