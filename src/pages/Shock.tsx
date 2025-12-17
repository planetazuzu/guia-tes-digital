import { Link } from 'react-router-dom';
import { Zap, AlertTriangle, ChevronRight, Droplet } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import { getProcedureById } from '@/data/procedures';

const Shock = () => {
  const shockHemorragico = getProcedureById('shock-hemorragico');

  return (
    <div className="space-y-6">
      <BackButton to="/" label="Volver al inicio" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <Zap className="w-7 h-7 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shock Hemorrágico</h1>
            <p className="text-muted-foreground">Protocolo de manejo del shock por pérdida de sangre</p>
          </div>
        </div>
      </div>

      {/* Clasificación */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Clasificación del Shock Hemorrágico</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="font-bold text-green-600 dark:text-green-400 mb-2">Clase I</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Pérdida: &lt;15%</div>
              <div>FC: Normal</div>
              <div>TA: Normal</div>
              <div>Signos: Mínimos</div>
            </div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Clase II</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Pérdida: 15-30%</div>
              <div>FC: ↑ Taquicardia</div>
              <div>TA: Normal</div>
              <div>Signos: Ansiedad</div>
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="font-bold text-orange-600 dark:text-orange-400 mb-2">Clase III</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Pérdida: 30-40%</div>
              <div>FC: ↑↑ Taquicardia</div>
              <div>TA: ↓ Hipotensión</div>
              <div>Signos: Confusión</div>
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="font-bold text-red-600 dark:text-red-400 mb-2">Clase IV</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Pérdida: &gt;40%</div>
              <div>FC: ↓ Bradicardia</div>
              <div>TA: ↓↓ Severa</div>
              <div>Signos: Letargo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocolo */}
      {shockHemorragico && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Protocolo de Actuación</h2>
            <span className="px-3 py-1 bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
              Crítico
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Pasos del Protocolo
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                {shockHemorragico.steps.map((step, index) => (
                  <li key={index} className="text-foreground pl-2">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {shockHemorragico.warnings && shockHemorragico.warnings.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Advertencias Importantes</h3>
                <ul className="space-y-1">
                  {shockHemorragico.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {shockHemorragico.keyPoints && shockHemorragico.keyPoints.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Clasificación por Clases</h3>
                <ul className="space-y-1">
                  {shockHemorragico.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {shockHemorragico.equipment && shockHemorragico.equipment.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Material Necesario
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shockHemorragico.equipment.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {shockHemorragico.drugs && shockHemorragico.drugs.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Fármacos</h3>
                <div className="flex flex-wrap gap-2">
                  {shockHemorragico.drugs.map((drug, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                    >
                      {drug}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hipotensión Permisiva */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Hipotensión Permisiva
        </h3>
        <p className="text-sm text-muted-foreground">
          En shock hemorrágico sin trauma craneoencefálico (TCE), mantener TAS objetivo de 80-90 mmHg
          hasta control quirúrgico de la hemorragia. Esto reduce la pérdida de sangre y mejora la supervivencia.
        </p>
        <p className="text-sm text-muted-foreground font-semibold">
          ⚠️ EXCEPCIÓN: En TCE, mantener TAS &gt;90 mmHg para preservar perfusión cerebral.
        </p>
      </div>

      {/* Enlaces relacionados */}
      <div className="bg-muted/50 border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3">Protocolos Relacionados</h3>
        <div className="space-y-2">
          <Link
            to="/soporte-vital"
            className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
          >
            <span className="text-foreground">Ver todos los protocolos de Soporte Vital</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link
            to="/farmacos"
            className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
          >
            <span className="text-foreground">Fármacos: Ácido Tranexámico</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shock;
