import { useState } from 'react';
import { Check, X, RotateCcw, AlertCircle, Info } from 'lucide-react';
import { MaterialChecklist, ChecklistSection, ChecklistItem } from '@/data/material-checklists';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/shared/Badge';

interface MaterialChecklistViewerProps {
  checklist: MaterialChecklist;
  onReset?: () => void;
}

const MaterialChecklistViewer = ({ checklist, onReset }: MaterialChecklistViewerProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([checklist.sections[0]?.id || '']));

  const toggleCheck = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleReset = () => {
    setCheckedItems(new Set());
    if (onReset) {
      onReset();
    }
  };

  const getSectionProgress = (section: ChecklistSection) => {
    const total = section.items.length;
    const checked = section.items.filter((item) => checkedItems.has(item.id)).length;
    return { checked, total, percentage: total > 0 ? Math.round((checked / total) * 100) : 0 };
  };

  const getOverallProgress = () => {
    const allItems = checklist.sections.flatMap((s) => s.items);
    const total = allItems.length;
    const checked = allItems.filter((item) => checkedItems.has(item.id)).length;
    return { checked, total, percentage: total > 0 ? Math.round((checked / total) * 100) : 0 };
  };

  const getCriticalItems = () => {
    return checklist.sections.flatMap((s) => s.items.filter((item) => item.critical));
  };

  const getUncheckedCritical = () => {
    return getCriticalItems().filter((item) => !checkedItems.has(item.id));
  };

  const overallProgress = getOverallProgress();
  const uncheckedCritical = getUncheckedCritical();

  const getPhaseBadgeVariant = (phase: string) => {
    switch (phase) {
      case 'inicio_turno':
        return 'default';
      case 'pre_escena':
        return 'default';
      case 'post_servicio':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'inicio_turno':
        return 'Inicio Turno';
      case 'pre_escena':
        return 'Pre-Escena';
      case 'post_servicio':
        return 'Post-Servicio';
      default:
        return phase;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-foreground text-lg">{checklist.title}</h3>
            <Badge variant={getPhaseBadgeVariant(checklist.phase)}>
              {getPhaseLabel(checklist.phase)}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{checklist.description}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="shrink-0"
          title="Reiniciar checklist"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progreso general</span>
            <span className="text-sm text-muted-foreground">
              {overallProgress.checked} / {overallProgress.total} ({overallProgress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${overallProgress.percentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Critical Items Warning */}
      {uncheckedCritical.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>
            <strong>Items críticos pendientes:</strong> {uncheckedCritical.length} item(s) crítico(s) sin verificar
          </AlertDescription>
        </Alert>
      )}

      {/* Sections */}
      <div className="space-y-3">
        {checklist.sections.map((section) => {
          const progress = getSectionProgress(section);
          const isExpanded = expandedSections.has(section.id);
          const sectionCriticalItems = section.items.filter((item) => item.critical);
          const sectionUncheckedCritical = sectionCriticalItems.filter((item) => !checkedItems.has(item.id));

          return (
            <Card key={section.id} className="overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{section.title}</h4>
                    {sectionUncheckedCritical.length > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {sectionUncheckedCritical.length} crítico(s)
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      {progress.checked} / {progress.total} completado
                    </span>
                    <span>•</span>
                    <span>{progress.percentage}%</span>
                  </div>
                </div>
                <div className="ml-4">
                  {isExpanded ? (
                    <X className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Check className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-border pt-4">
                  {section.items.map((item) => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg bg-muted hover:bg-accent transition-colors text-left"
                      >
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                            isChecked
                              ? item.critical
                                ? 'bg-destructive border-destructive'
                                : 'bg-success border-success'
                              : item.critical
                                ? 'border-destructive'
                                : 'border-muted-foreground'
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 text-background" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-foreground ${
                                isChecked ? 'line-through opacity-60' : ''
                              }`}
                            >
                              {item.text}
                            </span>
                            {item.critical && (
                              <Badge variant="destructive" className="text-xs">
                                Crítico
                              </Badge>
                            )}
                          </div>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                  {section.notes && (
                    <Alert className="mt-3">
                      <Info className="w-4 h-4" />
                      <AlertDescription className="text-xs">{section.notes}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Source reference */}
      {checklist.source && (
        <p className="text-2xs text-muted-foreground text-center">
          Fuente: {checklist.source}
        </p>
      )}
    </div>
  );
};

export default MaterialChecklistViewer;
