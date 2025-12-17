import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';

const DripRateCalculator = () => {
  const [volume, setVolume] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [dripFactor, setDripFactor] = useState<string>('20');
  const [calculationType, setCalculationType] = useState<'drops' | 'mlh'>('drops');

  const volumeNum = parseFloat(volume) || 0;
  const timeNum = parseFloat(time) || 0;
  const factorNum = parseFloat(dripFactor) || 20;

  const isValid = volumeNum > 0 && timeNum > 0 && factorNum > 0;

  // Cálculo de gotas/minuto
  const calculateDropsPerMinute = (): number => {
    if (!isValid) return 0;
    const timeInMinutes = timeNum;
    return (volumeNum * factorNum) / timeInMinutes;
  };

  // Cálculo de ml/hora
  const calculateMlPerHour = (): number => {
    if (!isValid) return 0;
    const timeInHours = timeNum / 60;
    return volumeNum / timeInHours;
  };

  const dropsPerMin = isValid ? calculateDropsPerMinute() : 0;
  const mlPerHour = isValid ? calculateMlPerHour() : 0;

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        💉 Calculadora de Goteo
      </h3>

      <div className="space-y-4">
        {/* Información */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Fórmulas:</p>
              <p><strong>Gotas/min:</strong> (Volumen × Factor goteo) / Tiempo (min)</p>
              <p><strong>ml/h:</strong> Volumen / Tiempo (h)</p>
              <p className="mt-2 text-xs">
                Factor goteo: 20 gotas/ml (macrogoteo) o 60 gotas/ml (microgoteo)
              </p>
            </div>
          </div>
        </div>

        {/* Tipo de cálculo */}
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">
            Tipo de Cálculo
          </Label>
          <Select value={calculationType} onValueChange={(v) => setCalculationType(v as 'drops' | 'mlh')}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drops">Gotas por minuto</SelectItem>
              <SelectItem value="mlh">Mililitros por hora</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Volumen */}
        <div>
          <Label htmlFor="volume" className="text-sm font-semibold text-foreground mb-2 block">
            Volumen Total (ml)
          </Label>
          <Input
            id="volume"
            type="number"
            inputMode="decimal"
            placeholder="Ej: 500"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full"
            min="0"
            step="1"
          />
        </div>

        {/* Tiempo */}
        <div>
          <Label htmlFor="time" className="text-sm font-semibold text-foreground mb-2 block">
            Tiempo de Infusión ({calculationType === 'drops' ? 'minutos' : 'minutos'})
          </Label>
          <Input
            id="time"
            type="number"
            inputMode="decimal"
            placeholder={calculationType === 'drops' ? 'Ej: 60' : 'Ej: 60'}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full"
            min="0"
            step="1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {calculationType === 'drops' 
              ? 'Tiempo total en minutos para administrar el volumen'
              : 'Tiempo total en minutos (se convertirá a horas)'}
          </p>
        </div>

        {/* Factor de goteo (solo para gotas/min) */}
        {calculationType === 'drops' && (
          <div>
            <Label htmlFor="factor" className="text-sm font-semibold text-foreground mb-2 block">
              Factor de Goteo (gotas/ml)
            </Label>
            <Select value={dripFactor} onValueChange={setDripFactor}>
              <SelectTrigger id="factor" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 gotas/ml (Macrogoteo)</SelectItem>
                <SelectItem value="60">60 gotas/ml (Microgoteo)</SelectItem>
                <SelectItem value="15">15 gotas/ml (Algunos sistemas)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Resultados */}
        {isValid && (
          <div className="mt-6 space-y-4">
            {calculationType === 'drops' ? (
              <div className="p-4 bg-card border-2 border-primary rounded-xl text-center">
                <p className="text-muted-foreground text-sm mb-1">Velocidad de Goteo</p>
                <p className="text-4xl font-bold text-foreground mb-2">
                  {Math.round(dropsPerMin)} gotas/min
                </p>
                <p className="text-sm text-muted-foreground">
                  Equivalente: {mlPerHour.toFixed(1)} ml/h
                </p>
              </div>
            ) : (
              <div className="p-4 bg-card border-2 border-primary rounded-xl text-center">
                <p className="text-muted-foreground text-sm mb-1">Velocidad de Infusión</p>
                <p className="text-4xl font-bold text-foreground mb-2">
                  {mlPerHour.toFixed(1)} ml/h
                </p>
                <p className="text-sm text-muted-foreground">
                  Con factor {factorNum} gotas/ml: {Math.round((mlPerHour * factorNum) / 60)} gotas/min
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Cálculo:</strong> {volumeNum} ml ÷ {timeNum} min = {mlPerHour.toFixed(2)} ml/h
                {calculationType === 'drops' && ` × ${factorNum} gotas/ml = ${Math.round(dropsPerMin)} gotas/min`}
              </p>
            </div>
          </div>
        )}

        {/* Mensaje cuando faltan datos */}
        {!isValid && (volume || time) && (
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

export default DripRateCalculator;
