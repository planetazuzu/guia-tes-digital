import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, AlertTriangle } from 'lucide-react';

interface BottleSize {
  id: string;
  name: string;
  capacity: number; // Litros
  pressure: number; // PSI cuando está llena
  factor: number; // Factor de conversión para cálculo
}

const bottleSizes: BottleSize[] = [
  { id: 'd', name: 'D (340L)', capacity: 340, pressure: 2000, factor: 0.16 },
  { id: 'e', name: 'E (680L)', capacity: 680, pressure: 2000, factor: 0.28 },
  { id: 'm', name: 'M (3450L)', capacity: 3450, pressure: 2000, factor: 1.56 },
  { id: 'g', name: 'G (6800L)', capacity: 6800, pressure: 2000, factor: 3.14 },
  { id: 'h', name: 'H (6900L)', capacity: 6900, pressure: 2200, factor: 3.14 },
];

const OxygenDurationCalculator = () => {
  const [selectedBottle, setSelectedBottle] = useState<string>('');
  const [currentPressure, setCurrentPressure] = useState<string>('');
  const [flowRate, setFlowRate] = useState<string>('');

  const bottle = bottleSizes.find((b) => b.id === selectedBottle);
  const pressureNum = parseFloat(currentPressure) || 0;
  const flowNum = parseFloat(flowRate) || 0;

  const isValid = bottle && pressureNum > 0 && pressureNum <= bottle.pressure && flowNum > 0 && flowNum <= 15;

  // Fórmula: Tiempo (minutos) = (Presión actual / Presión llena) × Capacidad (L) / Flujo (L/min)
  const calculateDuration = (): number => {
    if (!bottle || !isValid) return 0;
    const pressureRatio = pressureNum / bottle.pressure;
    const availableLiters = bottle.capacity * pressureRatio;
    return availableLiters / flowNum;
  };

  const duration = isValid ? calculateDuration() : 0;
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = Math.floor(duration % 60);

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        💨 Calculadora de Duración de Botella de Oxígeno
      </h3>

      <div className="space-y-4">
        {/* Información */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Fórmula:</p>
              <p>Tiempo = (Presión actual / Presión llena) × Capacidad (L) / Flujo (L/min)</p>
              <p className="mt-2 text-xs">Presión estándar: 2000 PSI (botellas D, E, M, G) o 2200 PSI (botella H)</p>
            </div>
          </div>
        </div>

        {/* Selección de botella */}
        <div>
          <Label htmlFor="bottle" className="text-sm font-semibold text-foreground mb-2 block">
            Tamaño de Botella
          </Label>
          <Select value={selectedBottle} onValueChange={setSelectedBottle}>
            <SelectTrigger id="bottle" className="w-full">
              <SelectValue placeholder="Selecciona el tamaño de botella" />
            </SelectTrigger>
            <SelectContent>
              {bottleSizes.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name} - {b.capacity}L @ {b.pressure} PSI
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Presión actual */}
        <div>
          <Label htmlFor="pressure" className="text-sm font-semibold text-foreground mb-2 block">
            Presión Actual (PSI)
          </Label>
          <Input
            id="pressure"
            type="number"
            inputMode="decimal"
            placeholder={`Ej: ${bottle ? bottle.pressure : '2000'}`}
            value={currentPressure}
            onChange={(e) => setCurrentPressure(e.target.value)}
            className="w-full"
            min="0"
            max={bottle ? bottle.pressure : 2200}
            step="50"
          />
          {bottle && (
            <p className="text-xs text-muted-foreground mt-1">
              Presión máxima: {bottle.pressure} PSI
            </p>
          )}
        </div>

        {/* Flujo */}
        <div>
          <Label htmlFor="flow" className="text-sm font-semibold text-foreground mb-2 block">
            Flujo de Oxígeno (L/min)
          </Label>
          <Input
            id="flow"
            type="number"
            inputMode="decimal"
            placeholder="Ej: 10"
            value={flowRate}
            onChange={(e) => setFlowRate(e.target.value)}
            className="w-full"
            min="0"
            max="15"
            step="0.5"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Rango típico: 1-15 L/min
          </p>
        </div>

        {/* Resultado */}
        {isValid && duration > 0 && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-card border-2 border-primary rounded-xl text-center">
              <p className="text-muted-foreground text-sm mb-1">Duración Estimada</p>
              <p className="text-4xl font-bold text-foreground mb-2">
                {durationHours > 0 && `${durationHours}h `}
                {durationMinutes} min
              </p>
              <p className="text-sm text-muted-foreground">
                ≈ {duration.toFixed(1)} minutos totales
              </p>
            </div>

            {/* Advertencias */}
            {duration < 30 && (
              <div className="p-3 bg-[hsl(var(--emergency-high))]/10 border border-[hsl(var(--emergency-high))]/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-high))]" />
                  <p className="text-sm text-[hsl(var(--emergency-high))] font-semibold">
                    ⚠️ Botella con poca duración. Considerar cambio o reducir flujo si es posible.
                  </p>
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Nota:</strong> Este cálculo es una estimación. La duración real puede variar según temperatura, 
                uso intermitente y otros factores. Verificar presión periódicamente durante el uso.
              </p>
            </div>
          </div>
        )}

        {/* Mensaje cuando faltan datos */}
        {!isValid && (selectedBottle || currentPressure || flowRate) && (
          <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Por favor, completa todos los campos con valores válidos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OxygenDurationCalculator;
