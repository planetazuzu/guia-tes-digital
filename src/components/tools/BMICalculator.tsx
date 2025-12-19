import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Badge from '@/components/shared/Badge';
import { Info, AlertTriangle } from 'lucide-react';

/**
 * Calcula el IMC y devuelve la categoría
 */
const calculateBMI = (weight: number, height: number): { bmi: number; category: string; color: string } => {
  // IMC = peso (kg) / altura (m)²
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category: string;
  let color: string;

  if (bmi < 18.5) {
    category = 'Bajo peso';
    color = 'info';
  } else if (bmi < 25) {
    category = 'Peso normal';
    color = 'success';
  } else if (bmi < 30) {
    category = 'Sobrepeso';
    color = 'warning';
  } else if (bmi < 35) {
    category = 'Obesidad grado I';
    color = 'high';
  } else if (bmi < 40) {
    category = 'Obesidad grado II';
    color = 'high';
  } else {
    category = 'Obesidad grado III (mórbida)';
    color = 'critical';
  }

  return { bmi, category, color };
};

const BMICalculator = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const heightNum = parseFloat(height) || 0;
  const weightNum = parseFloat(weight) || 0;

  const isValid = heightNum > 0 && weightNum > 0 && heightNum <= 250 && weightNum <= 300;

  const result = isValid ? calculateBMI(weightNum, heightNum) : null;

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        🧮 Calculadora de Índice de Masa Corporal (IMC)
      </h3>

      <div className="space-y-4">
        {/* Información */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Fórmula:</p>
              <p>IMC = peso (kg) / altura (m)²</p>
              <p className="mt-2 text-xs">
                El IMC es un indicador útil pero no debe ser el único criterio para evaluar el estado nutricional.
              </p>
            </div>
          </div>
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
        {result && (
          <div className="mt-6 space-y-4">
            {/* Resultado principal */}
            <div className="p-4 bg-card border-2 border-primary rounded-xl text-center">
              <p className="text-muted-foreground text-sm mb-1">Índice de Masa Corporal</p>
              <p className="text-4xl font-bold text-foreground mb-2">
                {result.bmi.toFixed(1)}
              </p>
              <Badge variant={result.color as any} className="text-sm px-3 py-1">
                {result.category}
              </Badge>
            </div>

            {/* Tabla de referencia */}
            <div className="p-3 bg-muted/50 border border-border rounded-lg">
              <p className="text-xs font-semibold text-foreground mb-2">Clasificación IMC (OMS):</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>&lt; 18.5</span>
                  <span>Bajo peso</span>
                </div>
                <div className="flex justify-between">
                  <span>18.5 - 24.9</span>
                  <span>Peso normal</span>
                </div>
                <div className="flex justify-between">
                  <span>25.0 - 29.9</span>
                  <span>Sobrepeso</span>
                </div>
                <div className="flex justify-between">
                  <span>30.0 - 34.9</span>
                  <span>Obesidad grado I</span>
                </div>
                <div className="flex justify-between">
                  <span>35.0 - 39.9</span>
                  <span>Obesidad grado II</span>
                </div>
                <div className="flex justify-between">
                  <span>≥ 40.0</span>
                  <span>Obesidad grado III</span>
                </div>
              </div>
            </div>

            {/* Advertencias */}
            {result.bmi >= 30 && (
              <div className="p-3 bg-[hsl(var(--emergency-high))]/10 border border-[hsl(var(--emergency-high))]/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-high))]" />
                  <p className="text-sm text-[hsl(var(--emergency-high))] font-semibold">
                    ⚠️ Obesidad: Considerar factores de riesgo cardiovascular y metabólicos adicionales.
                  </p>
                </div>
              </div>
            )}

            {result.bmi < 18.5 && (
              <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-medium))]" />
                  <p className="text-sm text-[hsl(var(--emergency-medium))] font-semibold">
                    ⚠️ Bajo peso: Evaluar estado nutricional y posibles causas.
                  </p>
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Limitaciones del IMC:</strong> No tiene en cuenta masa muscular, distribución de grasa, 
                edad, sexo ni composición corporal. En pacientes con mucho músculo o edemas puede ser menos preciso.
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

export default BMICalculator;
