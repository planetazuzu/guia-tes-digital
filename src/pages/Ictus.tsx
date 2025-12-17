import { Link } from 'react-router-dom';
import { Brain, Clock, AlertTriangle, ChevronRight, Phone } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

const Ictus = () => {
  return (
    <div className="space-y-6">
      <BackButton to="/" label="Volver al inicio" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Brain className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Código Ictus</h1>
            <p className="text-muted-foreground">Protocolo de activación ante sospecha de ictus agudo</p>
          </div>
        </div>

        {/* Alerta de tiempo */}
        <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-1">
              ⏱️ TIEMPO ES CEREBRO
            </h3>
            <p className="text-sm text-muted-foreground">
              Cada minuto cuenta. La activación precoz del Código Ictus mejora significativamente el pronóstico.
            </p>
          </div>
        </div>
      </div>

      {/* Test FAST */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Reconocimiento: Test FAST
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">F</div>
            <div className="font-semibold text-foreground mb-1">Face (Cara)</div>
            <div className="text-sm text-muted-foreground">Asimetría facial al sonreír</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">A</div>
            <div className="font-semibold text-foreground mb-1">Arms (Brazos)</div>
            <div className="text-sm text-muted-foreground">Debilidad en un brazo al elevarlo</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">S</div>
            <div className="font-semibold text-foreground mb-1">Speech (Habla)</div>
            <div className="text-sm text-muted-foreground">Dificultad para hablar o entender</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">T</div>
            <div className="font-semibold text-foreground mb-1">Time (Tiempo)</div>
            <div className="text-sm text-muted-foreground">Activar Código Ictus INMEDIATAMENTE</div>
          </div>
        </div>
      </div>

      {/* Protocolo de Actuación */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Protocolo de Actuación</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Activación Inmediata</h3>
              <p className="text-sm text-muted-foreground">
                Si cualquier signo del test FAST es positivo, activar Código Ictus inmediatamente.
                Comunicar al coordinador: "Código Ictus activado, tiempo desde inicio de síntomas: [X] minutos".
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Valoración Inicial</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Hora de inicio de síntomas (crítico para ventana terapéutica)</li>
                <li>Glucemia capilar (hipoglucemia puede simular ictus)</li>
                <li>Tensión arterial (no bajar si &lt;220/120 mmHg)</li>
                <li>Nivel de consciencia (Glasgow)</li>
                <li>Signos neurológicos focales</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Manejo Prehospitalario</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Oxigenoterapia si SpO₂ &lt;94%</li>
                <li>Monitorización continua (ECG, SpO₂, TA)</li>
                <li>Acceso venoso periférico</li>
                <li>NO administrar glucosa salvo hipoglucemia confirmada</li>
                <li>NO administrar fármacos antihipertensivos salvo emergencia hipertensiva</li>
                <li>Posición semisentada si consciencia preservada</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Traslado Urgente</h3>
              <p className="text-sm text-muted-foreground">
                Traslado inmediato al hospital con Unidad de Ictus más cercana.
                Comunicar previamente al hospital: hora de inicio de síntomas, test FAST positivo,
                estado neurológico actual, y tiempo estimado de llegada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Criterios de Exclusión */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Criterios de Exclusión</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-red-500 mt-1">✗</span>
            <span>Síntomas &gt;24 horas de evolución (excepto indicación específica del hospital)</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-red-500 mt-1">✗</span>
            <span>Hipoglucemia como causa de síntomas</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-red-500 mt-1">✗</span>
            <span>Trauma craneal reciente</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-red-500 mt-1">✗</span>
            <span>Paciente en tratamiento anticoagulante con INR &gt;3.0</span>
          </li>
        </ul>
      </div>

      {/* Advertencias */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Advertencias Importantes
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 mt-1">•</span>
            <span>La hora de inicio de síntomas es CRÍTICA para determinar elegibilidad a trombólisis</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 mt-1">•</span>
            <span>NO administrar AAS ni otros antiagregantes sin indicación médica</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 mt-1">•</span>
            <span>Si el paciente pierde consciencia o deja de respirar, iniciar RCP inmediatamente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 mt-1">•</span>
            <span>Mantener comunicación constante con el coordinador durante el traslado</span>
          </li>
        </ul>
      </div>

      {/* Enlaces relacionados */}
      <div className="bg-muted/50 border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3">Protocolos Relacionados</h3>
        <div className="space-y-2">
          <Link
            to="/telefono"
            className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Protocolo Transtelefónico de Ictus</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link
            to="/patologias"
            className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
          >
            <span className="text-foreground">Ver todas las patologías neurológicas</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link
            to="/rcp"
            className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
          >
            <span className="text-foreground">RCP (si pierde consciencia)</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ictus;
