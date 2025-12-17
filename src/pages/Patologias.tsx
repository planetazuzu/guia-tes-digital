import { useState } from 'react';
import { Wind, Heart, Brain, FlaskConical, Skull } from 'lucide-react';

const tabs = [
  { id: 'respiratorias', label: 'Respiratorias', icon: Wind },
  { id: 'circulatorias', label: 'Circulatorias', icon: Heart },
  { id: 'neurologicas', label: 'Neurológicas', icon: Brain },
  { id: 'endocrinas', label: 'Endocrinas', icon: FlaskConical },
  { id: 'intoxicaciones', label: 'Intoxicaciones', icon: Skull },
];

const patologias = {
  respiratorias: [
    {
      title: 'Crisis Asmática',
      clinica: 'Disnea, sibilancias, uso de musculatura accesoria, habla entrecortada',
      actuacion: ['O2 alto flujo', 'Salbutamol nebulizado', 'Corticoides IV', 'Valorar adrenalina si severa'],
    },
    {
      title: 'EPOC Reagudizado',
      clinica: 'Aumento de disnea, cambio en esputo, aumento de tos',
      actuacion: ['O2 controlado (SpO2 88-92%)', 'Broncodilatadores', 'Corticoides', 'ATB si sospecha infección'],
    },
  ],
  circulatorias: [
    {
      title: 'SCA / IAM',
      clinica: 'Dolor torácico opresivo, irradiado a brazo/mandíbula, sudoración, náuseas',
      actuacion: ['ECG 12 derivaciones', 'O2 si SpO2 <94%', 'AAS 300mg', 'Nitroglicerina SL', 'Morfina si dolor intenso'],
    },
    {
      title: 'Edema Agudo de Pulmón',
      clinica: 'Disnea súbita, ortopnea, esputo rosado, crepitantes',
      actuacion: ['Posición semisentado', 'O2 alto flujo / CPAP', 'Furosemida IV', 'Nitroglicerina', 'Morfina'],
    },
  ],
  neurologicas: [
    {
      title: 'Ictus - Código Ictus',
      clinica: 'Déficit neurológico súbito: paresia facial, debilidad brazo, alteración habla (FAST)',
      actuacion: ['Hora de inicio síntomas', 'Glucemia', 'TA (no bajar si <220/120)', 'Código Ictus', 'Traslado urgente'],
    },
    {
      title: 'Crisis Convulsiva',
      clinica: 'Movimientos tónico-clónicos, pérdida consciencia, relajación esfínteres',
      actuacion: ['Proteger de traumatismos', 'Posición lateral si cede', 'Midazolam si >5min', 'O2', 'Glucemia'],
    },
  ],
  endocrinas: [
    {
      title: 'Hipoglucemia',
      clinica: 'Glucemia <70 mg/dl, sudoración, temblor, confusión, taquicardia',
      actuacion: ['Si consciente: glucosa oral', 'Si inconsciente: Glucosmon IV', 'Glucagón IM si no vía', 'Buscar causa'],
    },
    {
      title: 'Cetoacidosis Diabética',
      clinica: 'Hiperglucemia >250, aliento cetósico, náuseas, dolor abdominal',
      actuacion: ['Fluidoterapia SSF', 'Insulina rápida', 'Monitorización K+', 'Buscar desencadenante'],
    },
  ],
  intoxicaciones: [
    {
      title: 'Intoxicación por Opioides',
      clinica: 'Miosis puntiforme, depresión respiratoria, bajo nivel consciencia',
      actuacion: ['Vía aérea', 'Ventilación', 'Naloxona 0.4-2mg IV', 'Repetir cada 2-3 min si precisa'],
    },
    {
      title: 'Intoxicación por Benzodiacepinas',
      clinica: 'Somnolencia, ataxia, habla farfullante, depresión respiratoria',
      actuacion: ['Vía aérea', 'Flumazenilo 0.2mg IV', 'Repetir hasta 1mg', 'Monitorización prolongada'],
    },
  ],
};

const Patologias = () => {
  const [activeTab, setActiveTab] = useState('respiratorias');

  const currentPatologias = patologias[activeTab as keyof typeof patologias] || [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Patologías</h1>
        <p className="text-muted-foreground text-sm">
          Clínica y actuación por sistemas
        </p>
      </div>

      {/* System Tabs */}
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

      {/* Patologies List */}
      <div className="space-y-4">
        {currentPatologias.map((patologia, index) => (
          <div key={index} className="card-procedure">
            <h3 className="font-bold text-foreground text-lg mb-3">
              {patologia.title}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Clínica
                </h4>
                <p className="text-foreground">{patologia.clinica}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Actuación
                </h4>
                <ol className="space-y-2">
                  {patologia.actuacion.map((paso, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="step-number">{i + 1}</span>
                      <span className="text-foreground pt-1">{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patologias;
