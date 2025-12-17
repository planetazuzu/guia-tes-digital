import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Syringe, Package } from 'lucide-react';
import { TESMedication } from '@/data/tes-medication';
import Badge from '@/components/shared/Badge';
import { cn } from '@/lib/utils';

interface TESMedicationCardProps {
  medication: TESMedication;
  defaultExpanded?: boolean;
}

const TESMedicationCard = ({ medication, defaultExpanded = false }: TESMedicationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const categoryLabels = {
    hipoglucemia: 'Hipoglucemias',
    respiratorio: 'Crisis Respiratorias',
    anafilaxia: 'Crisis Anafilácticas',
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
              <span className="text-2xl">💉</span>
              <h3 className="font-bold text-foreground text-lg">
                {medication.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="info" className="text-xs">
                {categoryLabels[medication.category]}
              </Badge>
              <Badge variant="default" className="text-xs">
                {medication.route}
              </Badge>
            </div>
          </div>

          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-4">
          {/* Aviso Legal */}
          <div className="p-4 bg-[hsl(var(--emergency-medium))]/10 border-2 border-[hsl(var(--emergency-medium))] rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-medium))] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  ⚠️ AVISO IMPORTANTE
                </p>
                <p className="text-sm text-muted-foreground">
                  Administración únicamente bajo prescripción facultativa (incluida prescripción telefónica del 112).
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  El TES NO decide la medicación. El TES conoce la indicación y administra solo bajo prescripción facultativa.
                </p>
              </div>
            </div>
          </div>

          {/* Indicación */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Indicación</p>
            <p className="text-foreground font-medium">{medication.indication}</p>
          </div>

          {/* Presentación */}
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Presentación</p>
              <p className="text-foreground font-medium">{medication.presentation}</p>
            </div>
          </div>

          {/* Vía de Administración */}
          <div className="flex items-start gap-3">
            <Syringe className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Vía de Administración</p>
              <Badge variant="info">{medication.route}</Badge>
            </div>
          </div>

          {/* Advertencia específica */}
          {medication.warning && (
            <div className="p-3 bg-[hsl(var(--emergency-high))]/10 border border-[hsl(var(--emergency-high))]/30 rounded-lg">
              <p className="text-sm text-[hsl(var(--emergency-high))] font-semibold">
                {medication.warning}
              </p>
            </div>
          )}

          {/* Notas */}
          {medication.notes && medication.notes.length > 0 && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Notas de Ejecución</p>
              <ul className="space-y-1">
                {medication.notes.map((note, index) => (
                  <li key={index} className="text-foreground text-sm flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{note}</span>
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

export default TESMedicationCard;
