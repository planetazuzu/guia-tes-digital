import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { procedures, getProceduresByCategory, Procedure } from '@/data/procedures';
import ProcedureCard from '@/components/procedures/ProcedureCard';

const subcategories = [
  { id: 'todos', label: 'Todos' },
  { id: 'rcp', label: 'RCP' },
  { id: 'via_aerea', label: 'Vía Aérea' },
  { id: 'shock', label: 'Shock' },
];

const SoporteVital = () => {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('id');
  const [activeTab, setActiveTab] = useState('todos');

  const soporteVitalProcedures = getProceduresByCategory('soporte_vital');

  const filteredProcedures =
    activeTab === 'todos'
      ? soporteVitalProcedures
      : soporteVitalProcedures.filter((p) => p.subcategory === activeTab);

  // Sort to put highlighted procedure first
  const sortedProcedures = [...filteredProcedures].sort((a, b) => {
    if (a.id === highlightId) return -1;
    if (b.id === highlightId) return 1;
    return 0;
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Soporte Vital</h1>
        <p className="text-muted-foreground text-sm">
          Protocolos de emergencia y reanimación
        </p>
      </div>

      {/* Subcategory Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {subcategories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Procedures List */}
      <div className="space-y-4">
        {sortedProcedures.map((procedure) => (
          <ProcedureCard
            key={procedure.id}
            procedure={procedure}
            defaultExpanded={procedure.id === highlightId}
          />
        ))}
      </div>

      {sortedProcedures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay protocolos en esta categoría
          </p>
        </div>
      )}
    </div>
  );
};

export default SoporteVital;
