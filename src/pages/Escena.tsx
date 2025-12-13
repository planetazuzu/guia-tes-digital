import { useState } from 'react';
import { Shield, Activity, Users, Move, Truck, Check, Square } from 'lucide-react';
import Badge from '@/components/shared/Badge';

const tabs = [
  { id: 'seguridad', label: 'Seguridad', icon: Shield },
  { id: 'abcde', label: 'ABCDE', icon: Activity },
  { id: 'triage', label: 'Triage', icon: Users },
  { id: 'inmovilizacion', label: 'Inmovil.', icon: Move },
  { id: 'extricacion', label: 'Extric.', icon: Truck },
];

const seguridadChecklist = [
  'Valorar mecanismo lesional',
  'Identificar riesgos: tráfico, fuego, químicos, electricidad',
  'Usar EPI adecuado',
  'Señalizar/balizar la zona',
  'Solicitar recursos si es necesario',
  'Establecer zona de seguridad',
  'Acceso seguro a la víctima',
];

const abcdeContent = [
  {
    letter: 'A',
    title: 'Airway - Vía Aérea',
    points: [
      'Permeabilidad vía aérea',
      'Control cervical si trauma',
      'Aspirar secreciones',
      'Cánula orofaríngea si inconsciente',
    ],
  },
  {
    letter: 'B',
    title: 'Breathing - Respiración',
    points: [
      'FR, profundidad, simetría',
      'SpO2',
      'Auscultación',
      'Oxigenoterapia si precisa',
    ],
  },
  {
    letter: 'C',
    title: 'Circulation - Circulación',
    points: [
      'FC, TA, relleno capilar',
      'Control de hemorragias',
      'Acceso venoso',
      'Fluidoterapia si shock',
    ],
  },
  {
    letter: 'D',
    title: 'Disability - Neurológico',
    points: [
      'Nivel consciencia (AVDN/Glasgow)',
      'Pupilas',
      'Glucemia',
      'Movilidad extremidades',
    ],
  },
  {
    letter: 'E',
    title: 'Exposure - Exposición',
    points: [
      'Desvestir para explorar',
      'Prevenir hipotermia',
      'Inspección completa',
      'Buscar lesiones ocultas',
    ],
  },
];

const triageStart = [
  { color: 'Negro', criteria: 'No respira tras apertura vía aérea', action: 'Fallecido / Expectante', colorClass: 'bg-foreground text-background' },
  { color: 'Rojo', criteria: 'FR >30 o <10, TRC >2s, no obedece órdenes', action: 'Prioridad 1 - Inmediato', colorClass: 'bg-primary text-primary-foreground' },
  { color: 'Amarillo', criteria: 'No puede caminar, pero estable', action: 'Prioridad 2 - Urgente', colorClass: 'bg-warning text-background' },
  { color: 'Verde', criteria: 'Puede caminar', action: 'Prioridad 3 - Demorado', colorClass: 'bg-success text-background' },
];

const Escena = () => {
  const [activeTab, setActiveTab] = useState('seguridad');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Actuación en Escena
        </h1>
        <p className="text-muted-foreground text-sm">
          Seguridad, valoración y triage
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'seguridad' && (
        <div className="card-procedure">
          <h3 className="font-bold text-foreground text-lg mb-4">
            🛡️ Checklist Seguridad Escena
          </h3>
          <div className="space-y-2">
            {seguridadChecklist.map((item, index) => (
              <button
                key={index}
                onClick={() => toggleCheck(index)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-accent transition-colors text-left"
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    checkedItems.has(index)
                      ? 'bg-success border-success'
                      : 'border-muted-foreground'
                  }`}
                >
                  {checkedItems.has(index) && (
                    <Check className="w-4 h-4 text-background" />
                  )}
                </div>
                <span
                  className={`text-foreground ${
                    checkedItems.has(index) ? 'line-through opacity-60' : ''
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setCheckedItems(new Set())}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground"
          >
            Reiniciar checklist
          </button>
        </div>
      )}

      {activeTab === 'abcde' && (
        <div className="space-y-4">
          {abcdeContent.map((section) => (
            <div key={section.letter} className="card-procedure">
              <div className="flex items-center gap-3 mb-3">
                <span className="step-number text-lg">{section.letter}</span>
                <h3 className="font-bold text-foreground">{section.title}</h3>
              </div>
              <ul className="space-y-2 ml-11">
                {section.points.map((point, i) => (
                  <li key={i} className="text-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'triage' && (
        <div className="card-procedure">
          <h3 className="font-bold text-foreground text-lg mb-4">
            🏥 Triage START (Adultos)
          </h3>
          <div className="space-y-3">
            {triageStart.map((level) => (
              <div
                key={level.color}
                className="flex items-stretch gap-3 rounded-lg overflow-hidden border border-border"
              >
                <div
                  className={`w-20 flex items-center justify-center font-bold text-sm ${level.colorClass}`}
                >
                  {level.color}
                </div>
                <div className="flex-1 p-3">
                  <p className="text-foreground text-sm font-medium">
                    {level.criteria}
                  </p>
                  <p className="text-muted-foreground text-2xs mt-1">
                    {level.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-2xs text-muted-foreground mt-4">
            JumpSTART para pediátricos: ajustar FR (15-45 normal en lactantes)
          </p>
        </div>
      )}

      {activeTab === 'inmovilizacion' && (
        <div className="card-procedure">
          <h3 className="font-bold text-foreground text-lg mb-4">
            🦴 Inmovilización
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Indicaciones de inmovilización espinal
              </h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Mecanismo lesional de riesgo</li>
                <li>• Dolor cervical o dorsolumbar</li>
                <li>• Déficit neurológico</li>
                <li>• Alteración nivel consciencia</li>
                <li>• Intoxicación que impide valoración</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Material</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Collarín cervical</Badge>
                <Badge variant="default">Tabla espinal</Badge>
                <Badge variant="default">Dama de Elche</Badge>
                <Badge variant="default">Férula de tracción</Badge>
                <Badge variant="default">Férulas de vacío</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'extricacion' && (
        <div className="card-procedure">
          <h3 className="font-bold text-foreground text-lg mb-4">
            🚗 Extricación Vehicular
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide mb-2">
                Maniobra de Rautek
              </h4>
              <ol className="space-y-2">
                {[
                  'Aproximarse por detrás de la víctima',
                  'Pasar brazos bajo axilas',
                  'Sujetar antebrazo de víctima contra su pecho',
                  'Extraer arrastrando hacia atrás',
                  'Mantener alineación espinal',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="step-number">{i + 1}</span>
                    <span className="text-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Escena;
