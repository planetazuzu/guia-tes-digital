import { useState } from 'react';
import { ClipboardCheck, RotateCcw } from 'lucide-react';
import MaterialChecklistViewer from '@/components/material-checklists/MaterialChecklistViewer';
import {
  materialChecklists,
  getChecklistsByPhase,
  MaterialChecklist,
  ChecklistPhase,
} from '@/data/material-checklists';
import Badge from '@/components/shared/Badge';

const phaseLabels: Record<ChecklistPhase, string> = {
  inicio_turno: 'Inicio de Turno',
  pre_escena: 'Pre-Escena',
  post_servicio: 'Post-Servicio',
};

const phaseDescriptions: Record<ChecklistPhase, string> = {
  inicio_turno: 'Verificación completa de material antes de iniciar servicio',
  pre_escena: 'Verificación rápida de material crítico antes de intervención',
  post_servicio: 'Cierre, limpieza, reposición y documentación después del servicio',
};

const Material = () => {
  const [selectedChecklist, setSelectedChecklist] = useState<MaterialChecklist | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<ChecklistPhase | 'todos'>('todos');

  const filteredChecklists =
    selectedPhase === 'todos'
      ? materialChecklists
      : getChecklistsByPhase(selectedPhase);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Checklists de Material
        </h1>
        <p className="text-muted-foreground text-sm">
          Verificación de material sanitario y oxigenoterapia
        </p>
      </div>

      {!selectedChecklist ? (
        <>
          {/* Phase Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <button
              onClick={() => setSelectedPhase('todos')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedPhase === 'todos'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              Todos
            </button>
            {(['inicio_turno', 'pre_escena', 'post_servicio'] as ChecklistPhase[]).map((phase) => (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedPhase === phase
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {phaseLabels[phase]}
              </button>
            ))}
          </div>

          {/* Checklists List */}
          <div className="space-y-3">
            {filteredChecklists.map((checklist) => (
              <button
                key={checklist.id}
                onClick={() => setSelectedChecklist(checklist)}
                className="w-full text-left card-procedure hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <ClipboardCheck className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{checklist.shortTitle}</h3>
                      <Badge variant="default">{phaseLabels[checklist.phase]}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {phaseDescriptions[checklist.phase]}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {checklist.sections.length} sección(es) •{' '}
                      {checklist.sections.reduce((acc, s) => acc + s.items.length, 0)} items
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button
            onClick={() => setSelectedChecklist(null)}
            className="mb-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            ← Volver a lista de checklists
          </button>
          <MaterialChecklistViewer
            checklist={selectedChecklist}
            onReset={() => setSelectedChecklist(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Material;
