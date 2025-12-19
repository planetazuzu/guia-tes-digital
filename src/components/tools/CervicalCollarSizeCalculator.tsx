import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Badge from '@/components/shared/Badge';
import { Info, AlertTriangle } from 'lucide-react';

interface CollarSize {
  name: string;
  description: string;
  chinToSternumRange: { min: number; max: number };
  ageRange?: string;
  color: string;
}

const collarSizes: CollarSize[] = [
  {
    name: 'Pediátrico',
    description: 'Lactantes y niños pequeños',
    chinToSternumRange: { min: 0, max: 8 },
    ageRange: '0-3 años',
    color: 'info',
  },
  {
    name: 'Pequeño',
    description: 'Niños y adolescentes',
    chinToSternumRange: { min: 8, max: 12 },
    ageRange: '4-12 años',
    color: 'info',
  },
  {
    name: 'Mediano',
    description: 'Adultos de tamaño promedio',
    chinToSternumRange: { min: 12, max: 16 },
    ageRange: 'Adultos',
    color: 'default',
  },
  {
    name: 'Grande',
    description: 'Adultos de gran tamaño',
    chinToSternumRange: { min: 16, max: 25 },
    ageRange: 'Adultos grandes',
    color: 'default',
  },
];

const CervicalCollarSizeCalculator = () => {
  const [chinToSternum, setChinToSternum] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const distanceNum = parseFloat(chinToSternum) || 0;
  const heightNum = parseFloat(height) || 0;
  const ageNum = parseFloat(age) || 0;

  const isValid = distanceNum > 0 && distanceNum <= 30;

  // Determinar talla según distancia mentón-esternón
  const determineSize = (): CollarSize | null => {
    if (!isValid) return null;

    for (const size of collarSizes) {
      if (
        distanceNum >= size.chinToSternumRange.min &&
        distanceNum <= size.chinToSternumRange.max
      ) {
        return size;
      }
    }

    // Si está fuera de rango, devolver el más cercano
    if (distanceNum < 8) return collarSizes[0];
    if (distanceNum > 16) return collarSizes[3];
    return collarSizes[2]; // Mediano por defecto
  };

  const recommendedSize = determineSize();

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        📏 Calculadora de Talla de Collarín Cervical
      </h3>

      <div className="space-y-4">
        {/* Información */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Método de medición:</p>
              <p>Mide la distancia desde el ángulo de la mandíbula (punto superior) hasta el hombro/trapecio (punto inferior).</p>
              <p className="mt-2 text-xs">
                <strong>Importante:</strong> El collarín debe quedar ajustado pero no comprimir la vía aérea.
              </p>
            </div>
          </div>
        </div>

        {/* Distancia mentón-esternón */}
        <div>
          <Label htmlFor="distance" className="text-sm font-semibold text-foreground mb-2 block">
            Distancia Mentón-Esternón (cm)
          </Label>
          <Input
            id="distance"
            type="number"
            inputMode="decimal"
            placeholder="Ej: 14"
            value={chinToSternum}
            onChange={(e) => setChinToSternum(e.target.value)}
            className="w-full"
            min="0"
            max="30"
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Medir desde el ángulo de la mandíbula hasta el hombro/trapecio
          </p>
        </div>

        {/* Altura (opcional, para validación) */}
        <div>
          <Label htmlFor="height" className="text-sm font-semibold text-foreground mb-2 block">
            Altura del Paciente (cm) <span className="text-muted-foreground font-normal">(Opcional)</span>
          </Label>
          <Input
            id="height"
            type="number"
            inputMode="decimal"
            placeholder="Ej: 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full"
            min="0"
            max="250"
            step="0.1"
          />
        </div>

        {/* Edad (opcional, para validación) */}
        <div>
          <Label htmlFor="age" className="text-sm font-semibold text-foreground mb-2 block">
            Edad Aproximada (años) <span className="text-muted-foreground font-normal">(Opcional)</span>
          </Label>
          <Input
            id="age"
            type="number"
            inputMode="decimal"
            placeholder="Ej: 35"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full"
            min="0"
            max="120"
            step="1"
          />
        </div>

        {/* Resultados */}
        {recommendedSize && (
          <div className="mt-6 space-y-4">
            {/* Resultado principal */}
            <div className="p-4 bg-card border-2 border-primary rounded-xl text-center">
              <p className="text-muted-foreground text-sm mb-1">Talla Recomendada</p>
              <p className="text-3xl font-bold text-foreground mb-2">
                {recommendedSize.name}
              </p>
              <Badge variant={recommendedSize.color as any} className="text-sm px-3 py-1">
                {recommendedSize.description}
              </Badge>
            </div>

            {/* Tabla de tallas */}
            <div className="p-3 bg-muted/50 border border-border rounded-lg">
              <p className="text-xs font-semibold text-foreground mb-2">Rangos de Tallas:</p>
              <div className="space-y-2">
                {collarSizes.map((size) => (
                  <div
                    key={size.name}
                    className={`p-2 rounded border ${
                      size.name === recommendedSize.name
                        ? 'bg-primary/10 border-primary'
                        : 'bg-background border-border'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-semibold text-foreground">{size.name}</span>
                        {size.ageRange && (
                          <span className="text-xs text-muted-foreground ml-2">({size.ageRange})</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {size.chinToSternumRange.min}-{size.chinToSternumRange.max} cm
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advertencias */}
            {distanceNum < 8 && (
              <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-medium))]" />
                  <p className="text-sm text-[hsl(var(--emergency-medium))] font-semibold">
                    ⚠️ Distancia muy pequeña. Verificar medición y considerar collarín pediátrico.
                  </p>
                </div>
              </div>
            )}

            {distanceNum > 20 && (
              <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-medium))]" />
                  <p className="text-sm text-[hsl(var(--emergency-medium))] font-semibold">
                    ⚠️ Distancia muy grande. Verificar medición y considerar collarín extra grande si está disponible.
                  </p>
                </div>
              </div>
            )}

            {/* Instrucciones importantes */}
            <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border-l-4 border-[hsl(var(--emergency-medium))] rounded-r-lg">
              <p className="text-xs text-foreground font-semibold mb-1">⚠️ Verificaciones importantes:</p>
              <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>El collarín debe quedar ajustado pero sin comprimir la vía aérea</li>
                <li>Collarín demasiado grande → hiperextensión cervical</li>
                <li>Collarín pequeño → flexión cervical</li>
                <li>El collarín es parte de un sistema completo de inmovilización</li>
                <li>Mantener control manual durante la colocación</li>
              </ul>
            </div>
          </div>
        )}

        {/* Mensaje cuando faltan datos */}
        {!isValid && chinToSternum && (
          <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Por favor, ingresa una distancia válida (0-30 cm)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CervicalCollarSizeCalculator;
