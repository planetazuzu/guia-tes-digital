import { useState } from 'react';
import { Calculator, Table, AlertCircle, BookOpen } from 'lucide-react';
import GlasgowCalculator from '@/components/tools/GlasgowCalculator';
import ParklandCalculator from '@/components/tools/ParklandCalculator';
import InfusionTableView from '@/components/tools/InfusionTableView';
import { infusionTables } from '@/data/calculators';
import { Link } from 'react-router-dom';
import AnatomicalTerminologyGuide from '@/components/references/AnatomicalTerminologyGuide';

const tabs = [
  { id: 'calculadoras', label: 'Calculadoras', icon: Calculator },
  { id: 'perfusiones', label: 'Perfusiones', icon: Table },
  { id: 'anatomia', label: 'Anatomía', icon: BookOpen },
  { id: 'codigos', label: 'Códigos', icon: AlertCircle },
];

const codigosProtocolo = [
  {
    name: 'Código Ictus',
    description: 'Activación ante sospecha de ictus agudo',
    path: '/ictus',
    color: 'bg-secondary',
  },
  {
    name: 'Código IAM',
    description: 'SCACEST - Infarto con elevación ST',
    path: '/patologias',
    color: 'bg-primary',
  },
  {
    name: 'Código Sepsis',
    description: 'Sospecha de sepsis severa / shock séptico',
    path: '/shock',
    color: 'bg-emergency-high',
  },
  {
    name: 'Código Parada',
    description: 'PCR - Parada cardiorrespiratoria',
    path: '/rcp',
    color: 'bg-primary',
  },
];

const Herramientas = () => {
  const [activeTab, setActiveTab] = useState('calculadoras');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Herramientas</h1>
        <p className="text-muted-foreground text-sm">
          Calculadoras, tablas y códigos
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
      {activeTab === 'calculadoras' && (
        <div className="space-y-4">
          <GlasgowCalculator />
          <ParklandCalculator />
          <PediatricDoseCalculator />
          <RCPTimer />
          <OxygenDurationCalculator />
          <DripRateCalculator />
        </div>
      )}

      {activeTab === 'perfusiones' && (
        <div className="space-y-4">
          {infusionTables.map((table) => (
            <InfusionTableView key={table.id} table={table} />
          ))}
        </div>
      )}

      {activeTab === 'anatomia' && (
        <div className="space-y-4">
          <AnatomicalTerminologyGuide />
        </div>
      )}

      {activeTab === 'codigos' && (
        <div className="space-y-3">
          {codigosProtocolo.map((codigo) => (
            <Link
              key={codigo.name}
              to={codigo.path}
              className="block card-procedure hover:border-primary/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg ${codigo.color} flex items-center justify-center`}
                >
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{codigo.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {codigo.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Herramientas;
