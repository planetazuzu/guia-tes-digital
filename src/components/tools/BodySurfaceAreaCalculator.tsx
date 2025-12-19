import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';

/**
 * Calcula la superficie corporal según la fórmula de Mosteller
 */
const calculateMosteller = (height: number, weight: number): number => {
  // SC (m²) = √[(altura (cm) × peso (kg)) / 3600]
  return Math.sqrt((height * weight) / 3600);
};

/**
 * Calcula la superficie corporal según la fórmula de DuBois
 */
const calculateDuBois = (height: number, weight: number): number => {
  // SC (m²) = 0.007184 × altura (cm)^0.725 × peso (kg)^0.425
  return 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
};

const BodySurfaceAreaCalculator = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [formula, setFormula] = useState<'mosteller' | 'dubois'>('mosteller');

  const heightNum = parseFloat(height) || 0;
  const weightNum = parseFloat(weight) || 0;

  const isValid = heightNum > 0 && weightNum > 0 && heightNum <= 250 && weightNum <= 300;

  const bsaMosteller = isValid ? calculateMosteller(heightNum, weightNum) : 0;
  const bsaDuBois = isValid ? calculateDuBois(heightNum, weightNum) : 0;
  const bsa = formula === 'mosteller' ? bsaMosteller : bsaDuBois;

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        📐 Calculadora de Superficie Corporal (SC)
      </h3>

      <div className="space-y-4">
        {/* Información */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Fórmulas:</p>
              <p><strong>Mosteller:</strong> SC = √[(altura (cm) × peso (kg)) / 3600]</p>
              <p><strong>DuBois:</strong> SC = 0.007184 × altura (cm)^0.725 × peso (kg)^0.425</p>
              <p className="mt-2 text-xs">La fórmula de Mosteller es más común y fácil de calcular.</p>
            </div>
          </div>
        </div>

        {/* Selección de fórmula */}
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">
            Fórmula a Utilizar
          </Label>
          <Select value={formula} onValueChange={(v) => setFormula(v as 'mosteller' | 'dubois')}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mosteller">Mosteller (Recomendada)</SelectItem>
              <SelectItem value="dubois">DuBois</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Altura */}
        <div>
          <Label htmlFor="height" className="text-sm font-semibold text-foreground mb-2 block">
            Altura (cm)
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
          <p className="text-xs text-muted-foreground mt-1">
            Rango típico: 50-250 cm
          </p>
        </div>

        {/* Peso */}
        <div>
          <Label htmlFor="weight" className="text-sm font-semibold text-foreground mb-2 block">
            Peso (kg)
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
            max="300"
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Rango típico: 3-300 kg
          </p>
        </div>

        {/* Resultados */}
        {isValid && (
          <div className="mt-6 space-y-4">
            {/* Resultado principal */}
            <div className="p-4 bg-card border-2 border-primary rounded-xl text-center">
              <p className="text-muted-foreground text-sm mb-1">Superficie Corporal</p>
              <p className="text-4xl font-bold text-foreground mb-2">
                {bsa.toFixed(2)} m²
              </p>
              <p className="text-sm text-muted-foreground">
                Fórmula: {formula === 'mosteller' ? 'Mosteller' : 'DuBois'}
              </p>
            </div>

            {/* Comparación con otra fórmula */}
            {formula === 'mosteller' && (
              <div className="p-3 bg-muted/50 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>DuBois:</strong> {bsaDuBois.toFixed(2)} m²
                  {Math.abs(bsaMosteller - bsaDuBois) > 0.1 && (
                    <span className="text-[hsl(var(--emergency-medium))] ml-2">
                      (Diferencia: {Math.abs(bsaMosteller - bsaDuBois).toFixed(2)} m²)
                    </span>
                  )}
                </p>
              </div>
            )}

            {formula === 'dubois' && (
              <div className="p-3 bg-muted/50 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Mosteller:</strong> {bsaMosteller.toFixed(2)} m²
                  {Math.abs(bsaMosteller - bsaDuBois) > 0.1 && (
                    <span className="text-[hsl(var(--emergency-medium))] ml-2">
                      (Diferencia: {Math.abs(bsaMosteller - bsaDuBois).toFixed(2)} m²)
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Uso clínico:</strong> La superficie corporal se utiliza para dosificación de fármacos 
                quimioterápicos, ajuste de dosis en pediatría y cálculo de requerimientos calóricos.
              </p>
            </div>
          </div>
        )}

        {/* Mensaje cuando faltan datos */}
        {!isValid && (height || weight) && (
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

export default BodySurfaceAreaCalculator;
