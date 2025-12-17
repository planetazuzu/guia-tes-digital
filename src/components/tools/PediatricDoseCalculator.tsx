import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Badge from '@/components/shared/Badge';
import { AlertTriangle, Info, Calculator } from 'lucide-react';
import { pediatricDrugs, calculatePediatricDose, type PediatricDrug } from '@/data/pediatric-drugs';

const PediatricDoseCalculator = () => {
  const [selectedDrugId, setSelectedDrugId] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const selectedDrug = pediatricDrugs.find((d) => d.id === selectedDrugId);
  const weightNum = parseFloat(weight) || 0;
  const isValid = selectedDrug && weightNum > 0 && weightNum <= 200;

  const result = isValid && selectedDrug
    ? calculatePediatricDose(selectedDrug, weightNum)
    : null;

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        ⚖️ Dosis Pediátricas por Peso
      </h3>

      <div className="space-y-4">
        {/* Información importante */}
        <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--emergency-medium))] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">⚠️ CRÍTICO:</p>
              <p>En pediatría, SIEMPRE calcular dosis por peso. Un error decimal puede ser grave.</p>
              <p className="mt-1">Verificar cálculo con compañero antes de administrar.</p>
            </div>
          </div>
        </div>

        {/* Selección de fármaco */}
        <div>
          <Label htmlFor="drug" className="text-sm font-semibold text-foreground mb-2 block">
            Fármaco
          </Label>
          <Select value={selectedDrugId} onValueChange={setSelectedDrugId}>
            <SelectTrigger id="drug" className="w-full">
              <SelectValue placeholder="Selecciona un fármaco" />
            </SelectTrigger>
            <SelectContent>
              {pediatricDrugs.map((drug) => (
                <SelectItem key={drug.id} value={drug.id}>
                  {drug.name} - {drug.indication}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Información del fármaco seleccionado */}
        {selectedDrug && (
          <div className="p-4 bg-muted/50 border border-border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">{selectedDrug.name}</h4>
              <Badge variant="info" className="text-xs">
                {selectedDrug.route}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Presentación:</strong> {selectedDrug.presentation}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Concentración:</strong> {selectedDrug.concentration}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Dosis:</strong> {selectedDrug.dosePerKg}
              {selectedDrug.maxDose && ` (máx: ${selectedDrug.maxDose})`}
              {selectedDrug.minDose && ` (mín: ${selectedDrug.minDose})`}
            </p>
            {selectedDrug.warning && (
              <div className="mt-2 p-2 bg-[hsl(var(--emergency-high))]/10 border border-[hsl(var(--emergency-high))]/30 rounded text-xs text-[hsl(var(--emergency-high))]">
                {selectedDrug.warning}
              </div>
            )}
          </div>
        )}

        {/* Input de peso */}
        <div>
          <Label htmlFor="weight" className="text-sm font-semibold text-foreground mb-2 block">
            Peso del paciente (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            inputMode="decimal"
            placeholder="Ej: 25"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full"
            min="0"
            max="200"
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Si no se conoce el peso exacto, usar estimación por edad o Broselow si está disponible
          </p>
        </div>

        {/* Resultados */}
        {result && result.isValid && selectedDrug && (
          <div className="mt-6 space-y-4">
            {/* Resultado principal */}
            <div className="p-4 bg-card border-2 border-primary rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-primary" />
                <p className="text-muted-foreground text-sm font-semibold">Dosis Calculada</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Dosis en mg</p>
                  <p className="text-2xl font-bold text-foreground">
                    {result.doseMg.toFixed(2)} mg
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Volumen en ml</p>
                  <p className="text-2xl font-bold text-foreground">
                    {result.doseMl.toFixed(3)} ml
                  </p>
                </div>
              </div>
            </div>

            {/* Advertencia si hay */}
            {result.warning && (
              <div className="p-3 bg-[hsl(var(--emergency-high))]/10 border border-[hsl(var(--emergency-high))]/30 rounded-lg">
                <p className="text-sm text-[hsl(var(--emergency-high))] font-semibold">
                  {result.warning}
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="space-y-2">
              <div className="p-3 bg-muted/50 border border-border rounded-lg">
                <p className="text-xs font-semibold text-foreground mb-1">Cálculo:</p>
                <p className="text-xs text-muted-foreground">
                  {weightNum} kg × {selectedDrug.dosePerKg} = {result.doseMg.toFixed(2)} mg
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {result.doseMg.toFixed(2)} mg ÷ {selectedDrug.concentration} = {result.doseMl.toFixed(3)} ml
                </p>
              </div>

              {/* Notas del fármaco */}
              {selectedDrug.notes && selectedDrug.notes.length > 0 && (
                <div className="p-3 bg-[hsl(var(--info))]/10 border border-[hsl(var(--info))]/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-foreground">Notas importantes:</p>
                      <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                        {selectedDrug.notes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Advertencia general */}
              <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border-l-4 border-[hsl(var(--emergency-medium))] rounded-r-lg">
                <p className="text-xs text-foreground font-semibold mb-1">⚠️ Verificación obligatoria:</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  <li>Verificar cálculo con compañero antes de preparar</li>
                  <li>Leer etiqueta del fármaco en voz alta</li>
                  <li>Confirmar concentración y presentación</li>
                  <li>Documentar dosis exacta en mg y ml (no "1 ampolla")</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje cuando faltan datos */}
        {!isValid && (selectedDrugId || weight) && (
          <div className="p-3 bg-[hsl(var(--emergency-medium))]/10 border border-[hsl(var(--emergency-medium))]/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Por favor, selecciona un fármaco e ingresa un peso válido (0-200 kg)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PediatricDoseCalculator;
