import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Check, RotateCcw, AlertCircle, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { TelephoneProtocol, ProtocolStep } from '@/data/telephone-protocols';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/shared/Badge';

interface TelephoneProtocolViewerProps {
  protocol: TelephoneProtocol;
  onReset?: () => void;
}

const TelephoneProtocolViewer = ({ protocol, onReset }: TelephoneProtocolViewerProps) => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1); // -1 = evaluación inicial
  const [verifiedSteps, setVerifiedSteps] = useState<Set<string>>(new Set());
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const handleStart = () => {
    setCurrentStepIndex(0);
  };

  const handleStepVerification = (stepId: string) => {
    const newVerified = new Set(verifiedSteps);
    if (newVerified.has(stepId)) {
      newVerified.delete(stepId);
    } else {
      newVerified.add(stepId);
    }
    setVerifiedSteps(newVerified);
  };

  const handleNext = () => {
    if (currentStepIndex < protocol.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else if (currentStepIndex === 0) {
      setCurrentStepIndex(-1); // Volver a evaluación inicial
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
    setVerifiedSteps(new Set());
    if (onReset) {
      onReset();
    }
  };

  const currentStep = currentStepIndex >= 0 ? protocol.steps[currentStepIndex] : null;
  const isStepVerified = currentStep ? verifiedSteps.has(currentStep.id) : false;
  const canProceed = currentStep ? !currentStep.critical || isStepVerified : false;

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'rcp':
        return 'default';
      case 'desa':
        return 'default';
      case 'ovace':
        return 'default';
      case 'sca':
        return 'default';
      case 'ictus':
        return 'default';
      default:
        return 'default';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'rcp':
        return 'RCP';
      case 'desa':
        return 'DESA';
      case 'ovace':
        return 'OVACE';
      case 'sca':
        return 'SCA';
      case 'ictus':
        return 'Ictus';
      default:
        return category;
    }
  };

  const getAgeGroupLabel = (ageGroup: string) => {
    switch (ageGroup) {
      case 'adulto':
        return 'Adulto';
      case 'pediatrico':
        return 'Pediatría';
      case 'lactante':
        return 'Lactante';
      case 'todos':
        return 'Todos';
      default:
        return ageGroup;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground text-lg">{protocol.title}</h3>
            <Badge variant={getCategoryBadgeVariant(protocol.category)}>
              {getCategoryLabel(protocol.category)}
            </Badge>
            <Badge variant="default">{getAgeGroupLabel(protocol.ageGroup)}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">{protocol.description}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="shrink-0"
          title="Reiniciar protocolo"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Evaluation Initial */}
      {currentStepIndex === -1 && (
        <Card className="p-4 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Evaluación Inicial
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Realice estas preguntas al testigo antes de comenzar:
            </p>
            <ul className="space-y-2">
              {protocol.initialAssessment.map((question, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <span className="text-primary font-bold mt-1">{index + 1}.</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={handleStart} className="w-full" size="lg">
            Comenzar Guía Paso a Paso
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      )}

      {/* Current Step */}
      {currentStep && (
        <Card className="p-4 space-y-4">
          {/* Step Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {currentStepIndex + 1} / {protocol.steps.length}
              </span>
              {currentStep.critical && (
                <Badge variant="destructive" className="text-xs">Crítico</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {showNotes && currentStep.notes && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotes(false)}
                >
                  Ocultar notas
                </Button>
              )}
              {!showNotes && currentStep.notes && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotes(true)}
                >
                  Ver notas
                </Button>
              )}
            </div>
          </div>

          {/* Instruction to Read */}
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <p className="text-foreground font-medium text-base leading-relaxed">
              <strong>Lea al testigo:</strong>
            </p>
            <p className="text-foreground text-base leading-relaxed mt-2">
              "{currentStep.instruction}"
            </p>
          </div>

          {/* Verification Question */}
          {currentStep.verification && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Verificación (pregunte al testigo):
              </p>
              <button
                onClick={() => handleStepVerification(currentStep.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                  isStepVerified
                    ? 'bg-success/10 border-success'
                    : currentStep.critical
                      ? 'bg-destructive/10 border-destructive'
                      : 'bg-muted border-border hover:bg-accent'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 ${
                    isStepVerified
                      ? 'bg-success border-success'
                      : currentStep.critical
                        ? 'border-destructive'
                        : 'border-muted-foreground'
                  }`}
                >
                  {isStepVerified && <Check className="w-4 h-4 text-background" />}
                </div>
                <span className="text-foreground">{currentStep.verification}</span>
              </button>
            </div>
          )}

          {/* Notes for Operator */}
          {showNotes && currentStep.notes && (
            <Alert>
              <Info className="w-4 h-4" />
              <AlertDescription>
                <strong>Nota para el operador:</strong> {currentStep.notes}
              </AlertDescription>
            </Alert>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex-1"
              disabled={currentStepIndex === -1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1"
              disabled={currentStepIndex >= protocol.steps.length - 1 || !canProceed}
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Warning if critical not verified */}
          {currentStep.critical && !isStepVerified && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Este paso es crítico. Debe verificar que se ha completado antes de continuar.
              </AlertDescription>
            </Alert>
          )}
        </Card>
      )}

      {/* Important Notes */}
      {protocol.importantNotes && protocol.importantNotes.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Notas Importantes para el Operador
          </h4>
          <ul className="space-y-2">
            {protocol.importantNotes.map((note, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Source reference */}
      {protocol.source && (
        <p className="text-2xs text-muted-foreground text-center">
          Fuente: {protocol.source}
        </p>
      )}
    </div>
  );
};

export default TelephoneProtocolViewer;
