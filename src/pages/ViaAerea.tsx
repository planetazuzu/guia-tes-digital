import { Link } from 'react-router-dom';
import { Wind, AlertTriangle, ChevronRight, Baby, Users } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import { getProcedureById } from '@/data/procedures';

const ViaAerea = () => {
  const ovace = getProcedureById('obstruccion-via-aerea');

  return (
    <div className="space-y-6">
      <BackButton to="/" label="Volver al inicio" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Wind className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vía Aérea</h1>
            <p className="text-muted-foreground">OVACE (Obstrucción de Vía Aérea por Cuerpo Extraño) e IOT</p>
          </div>
        </div>
      </div>

      {/* Valoración Inicial */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Valoración Inicial</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Obstrucción LEVE
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Puede toser con fuerza</li>
              <li>✓ Puede hablar</li>
              <li>✓ Respiración presente</li>
              <li>✓ Coloración normal</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-green-500/30">
              <div className="text-sm font-medium text-foreground">Actuación:</div>
              <div className="text-sm text-muted-foreground">Animar a toser, vigilar estrechamente</div>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Obstrucción GRAVE
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✗ No puede toser</li>
              <li>✗ No puede hablar</li>
              <li>✗ Respiración ausente o débil</li>
              <li>✗ Cianosis</li>
              <li>✗ Pérdida de consciencia inminente</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-red-500/30">
              <div className="text-sm font-medium text-foreground">Actuación:</div>
              <div className="text-sm text-muted-foreground">Maniobras de desobstrucción INMEDIATAS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocolo OVACE */}
      {ovace && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Protocolo OVACE</h2>
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
                {ovace.steps.map((step, index) => (
                  <li key={index} className="text-foreground pl-2">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {ovace.warnings && ovace.warnings.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Advertencias Importantes</h3>
                <ul className="space-y-1">
                  {ovace.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ovace.keyPoints && ovace.keyPoints.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Puntos Clave</h3>
                <ul className="space-y-1">
                  {ovace.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Variaciones por Edad */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Variaciones por Edad</h2>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Adultos y Niños (&gt;1 año)
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 5 golpes interescapulares</li>
              <li>• 5 compresiones abdominales (Heimlich)</li>
              <li>• Alternar hasta resolución o pérdida de consciencia</li>
              <li>• En embarazadas/obesos: compresiones torácicas en lugar de abdominales</li>
            </ul>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Baby className="w-4 h-4" />
              Lactantes (&lt;1 año)
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 5 golpes en la espalda (posición boca abajo sobre antebrazo)</li>
              <li>• 5 compresiones torácicas (posición boca arriba sobre antebrazo)</li>
              <li>• Alternar hasta resolución o pérdida de consciencia</li>
              <li>• NO hacer compresiones abdominales (riesgo de lesión)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Si Pierde Consciencia */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Si Pierde Consciencia
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Tumbar al paciente con control</li>
          <li>Activar 112 si no se ha hecho</li>
          <li>Antes de ventilar: revisar boca y extraer objeto visible</li>
          <li>Iniciar RCP inmediatamente (ver protocolo RCP)</li>
          <li>Antes de cada ventilación: revisar boca</li>
        </ol>
      </div>

      {/* IOT (Intubación Orotraqueal) */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Intubación Orotraqueal (IOT)</h2>
        <p className="text-muted-foreground">
          La IOT es un procedimiento avanzado que requiere formación específica y certificación.
          Consulta el manual completo para detalles técnicos y consideraciones especiales.
        </p>
        <Link
          to="/manual"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ver Manual Completo
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Enlaces relacionados */}
      <div className="bg-muted/50 border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3">Protocolos Relacionados</h3>
        <div className="space-y-2">
          <Link
            to="/rcp"
            className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
          >
            <span className="text-foreground">RCP (si pierde consciencia)</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link
            to="/soporte-vital"
            className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
          >
            <span className="text-foreground">Ver todos los protocolos de Soporte Vital</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViaAerea;
