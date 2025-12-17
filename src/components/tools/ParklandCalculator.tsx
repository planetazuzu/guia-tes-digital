import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Badge from '@/components/shared/Badge';
import { AlertTriangle, Info } from 'lucide-react';
import { calculateParkland } from '@/data/calculators';

const ParklandCalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [burnPercentage, setBurnPercentage] = useState<string>('');
  const [hoursSinceBurn, setHoursSinceBurn] = useState<string>('');

  const weightNum = parseFloat(weight) || 0;
  const burnPercentNum = parseFloat(burnPercentage) || 0;
  const hoursNum = parseFloat(hoursSinceBurn) || 0;

  const isValid = weightNum > 0 && burnPercentNum > 0 && burnPercentNum <= 100 && hoursNum >= 0;
  const result = isValid ? calculateParkland(weightNum, burnPercentNum, hoursNum) : null;

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        🔥 Fórmula de Parkland (Quemados)
      </h3>

      <div className="space-y-4">
        {/* Información sobre la fórmula */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Fórmula de Parkland:</p>
              <p>4 ml × peso (kg) × % superficie corporal quemada</p>
              <p className="mt-2 text-xs">Aplicable para quemaduras &gt;20% SCQ en adultos</p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="weight" className="text-sm font-semibold text-foreground mb-2 block">
              Peso del paciente (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              inputMode="decimal"
              placeholder="Ej: 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <Label htmlFor="burnPercentage" className="text-sm font-semibold text-foreground mb-2 block">
              Superficie Corporal Quemada (%)
            </Label>
            <Input
              id="burnPercentage"
              type="number"
              inputMode="decimal"
              placeholder="Ej: 30"
              value={burnPercentage}
              onChange={(e) => setBurnPercentage(e.target.value)}
              className="w-full"
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Usar regla de los 9 o palma de la mano (1% SCQ)
            </p>
          </div>

          <div>
            <Label htmlFor="hoursSinceBurn" className="text-sm font-semibold text-foreground mb-2 block">
              Tiempo desde la quemadura (horas)
            </Label>
            <Input
              id="hoursSinceBurn"
              type="number"
              inputMode="decimal"
              placeholder="Ej: 2"
              value={hoursSinceBurn}
              onChange={(e) => setHoursSinceBurn(e.target.value)}
              className="w-full"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        {/* Resultados */}
        {result && (
          <div className="mt-6 space-y-4">
            {/* Total de líquidos en 24h */}
            <div className="p-4 bg-card border-2 border-primary rounded-xl">
              <p className="text-muted-foreground text-sm mb-1">Total de líquidos en primeras 24h</p>
              <p className="text-3xl font-bold text-foreground mb-2">
                {result.total24h.toLocaleString('es-ES', { maximumFractionDigits: 0 })} ml
              </p>
              <p className="text-sm text-muted-foreground">
                ≈ {result.total24hLiters.toFixed(1)} litros
              </p>
            </div>

            {/* Distribución según tiempo */}
            {hoursNum < 8 ? (
              <div className="space-y-3">
                <div className="p-4 bg-[hsl(var(--emergency-high))]/10 border border-[hsl(var(--emergency-high))]/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-high))]" />
                    <p className="font-semibold text-foreground">Primeras 8 horas</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {result.first8h.toLocaleString('es-ES', { maximumFractionDigits: 0 })} ml
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Velocidad: {result.rateFirst8h.toFixed(1)} ml/h
                  </p>
                  {hoursNum > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Ya transcurridas: {hoursNum.toFixed(1)}h | Restante: {(8 - hoursNum).toFixed(1)}h
                    </p>
                  )}
                </div>

                <div className="p-4 bg-muted/50 border border-border rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Siguientes 16 horas</p>
                  <p className="text-xl font-bold text-foreground">
                    {result.next16h.toLocaleString('es-ES', { maximumFractionDigits: 0 })} ml
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Velocidad: {result.rateNext16h.toFixed(1)} ml/h
                  </p>
                </div>
              </div>
            ) : hoursNum < 24 ? (
              <div className="p-4 bg-muted/50 border border-border rounded-lg">
                <p className="font-semibold text-foreground mb-1">Restante de primeras 24h</p>
                <p className="text-xl font-bold text-foreground">
                  {result.remaining24h.toLocaleString('es-ES', { maximumFractionDigits: 0 })} ml
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  En {(24 - hoursNum).toFixed(1)} horas restantes
                </p>
              </div>
            ) : (
              <div className="p-4 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-medium))]" />
                  <p className="font-semibold text-foreground">Pasadas primeras 24h</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mantenimiento según necesidades: ~{result.maintenance.toLocaleString('es-ES')} ml/día
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Considerar pérdidas por evaporación y necesidades basales
                </p>
              </div>
            )}

            {/* Advertencias */}
            <div className="space-y-2">
              <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border-l-4 border-[hsl(var(--emergency-medium))] rounded-r-lg">
                <p className="text-sm text-foreground font-semibold mb-1">⚠️ Consideraciones importantes:</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Usar Ringer Lactato como solución de elección</li>
                  <li>Monitorizar diuresis objetivo: 0.5-1 ml/kg/h</li>
                  <li>Ajustar según respuesta clínica y analítica</li>
                  <li>En pediatría: añadir glucosa al mantenimiento</li>
                  {burnPercentNum < 20 && (
                    <li className="text-[hsl(var(--emergency-medium))] font-semibold">
                      Quemaduras &lt;20% pueden requerir menos líquidos
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje cuando faltan datos */}
        {!isValid && (weight || burnPercentage || hoursSinceBurn) && (
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

export default ParklandCalculator;
