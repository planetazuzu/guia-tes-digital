import { useState } from 'react';
import { glasgowScale, getGlasgowInterpretation } from '@/data/calculators';
import Badge from '@/components/shared/Badge';
import { cn } from '@/lib/utils';

const GlasgowCalculator = () => {
  const [scores, setScores] = useState<Record<string, number>>({
    'Apertura Ocular': 4,
    'Respuesta Verbal': 5,
    'Respuesta Motora': 6,
  });

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const interpretation = getGlasgowInterpretation(totalScore);

  const handleScoreChange = (category: string, value: number) => {
    setScores((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        🧠 Escala de Glasgow (GCS)
      </h3>

      <div className="space-y-6">
        {glasgowScale.map((category) => (
          <div key={category.name}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-foreground">{category.name}</h4>
              <span className="text-xl font-bold text-primary">
                {scores[category.name]}
              </span>
            </div>
            <div className="space-y-2">
              {category.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleScoreChange(category.name, option.value)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border transition-colors text-left',
                    scores[category.name] === option.value
                      ? 'bg-primary/10 border-primary text-foreground'
                      : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                  )}
                >
                  <span className="text-sm">{option.label}</span>
                  <span className="font-bold">{option.value}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-card border-2 border-primary rounded-xl text-center">
        <p className="text-muted-foreground text-sm mb-1">Puntuación Total</p>
        <p className="text-5xl font-bold text-foreground mb-2">{totalScore}</p>
        <Badge
          variant={
            interpretation.color === 'critical'
              ? 'critical'
              : interpretation.color === 'high'
              ? 'high'
              : 'low'
          }
          className="text-sm px-3 py-1"
        >
          {interpretation.severity}
        </Badge>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Rango: 3 (mínimo) - 15 (máximo)</p>
        <p className="mt-1">
          ≤8: Grave (IOT) | 9-12: Moderado | 13-15: Leve
        </p>
      </div>
    </div>
  );
};

export default GlasgowCalculator;
