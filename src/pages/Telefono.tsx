import { useState } from 'react';
import { Phone, RotateCcw } from 'lucide-react';
import TelephoneProtocolViewer from '@/components/telephone-protocols/TelephoneProtocolViewer';
import {
  telephoneProtocols,
  getProtocolsByCategory,
  getProtocolsByAgeGroup,
  TelephoneProtocol,
  ProtocolCategory,
  AgeGroup,
} from '@/data/telephone-protocols';
import Badge from '@/components/shared/Badge';

const categoryLabels: Record<ProtocolCategory, string> = {
  rcp: 'RCP',
  desa: 'DESA',
  ovace: 'OVACE',
  sca: 'SCA',
  ictus: 'Ictus',
  comunicacion: 'Comunicación',
};

const ageGroupLabels: Record<AgeGroup, string> = {
  adulto: 'Adulto',
  pediatrico: 'Pediatría',
  lactante: 'Lactante',
  todos: 'Todos',
};

const Telefono = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<TelephoneProtocol | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProtocolCategory | 'todos'>('todos');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | 'todos'>('todos');

  const filteredProtocols = telephoneProtocols.filter((protocol) => {
    const categoryMatch = selectedCategory === 'todos' || protocol.category === selectedCategory;
    const ageMatch = selectedAgeGroup === 'todos' || protocol.ageGroup === selectedAgeGroup || protocol.ageGroup === 'todos';
    return categoryMatch && ageMatch;
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Protocolos Transtelefónicos
        </h1>
        <p className="text-muted-foreground text-sm">
          Guía paso a paso para testigos por teléfono
        </p>
      </div>

      {!selectedProtocol ? (
        <>
          {/* Filters */}
          <div className="space-y-3">
            {/* Category Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Categoría</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
                <button
                  onClick={() => setSelectedCategory('todos')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === 'todos'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Todos
                </button>
                {(['rcp', 'desa', 'ovace', 'sca', 'ictus'] as ProtocolCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Grupo Etario</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
                <button
                  onClick={() => setSelectedAgeGroup('todos')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedAgeGroup === 'todos'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Todos
                </button>
                {(['adulto', 'pediatrico', 'lactante'] as AgeGroup[]).map((ageGroup) => (
                  <button
                    key={ageGroup}
                    onClick={() => setSelectedAgeGroup(ageGroup)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedAgeGroup === ageGroup
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {ageGroupLabels[ageGroup]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Protocols List */}
          <div className="space-y-3">
            {filteredProtocols.length === 0 ? (
              <div className="card-procedure p-4 text-center">
                <p className="text-muted-foreground">No hay protocolos que coincidan con los filtros seleccionados.</p>
              </div>
            ) : (
              filteredProtocols.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => setSelectedProtocol(protocol)}
                  className="w-full text-left card-procedure hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{protocol.shortTitle}</h3>
                        <Badge variant="default">{categoryLabels[protocol.category]}</Badge>
                        <Badge variant="default">{ageGroupLabels[protocol.ageGroup]}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{protocol.description}</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {protocol.steps.length} pasos • {protocol.initialAssessment.length} preguntas iniciales
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </>
      ) : (
        <div>
          <button
            onClick={() => setSelectedProtocol(null)}
            className="mb-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            ← Volver a lista de protocolos
          </button>
          <TelephoneProtocolViewer
            protocol={selectedProtocol}
            onReset={() => setSelectedProtocol(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Telefono;
