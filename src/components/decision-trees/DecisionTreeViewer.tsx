import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, RotateCcw, ExternalLink, Info } from 'lucide-react';
import { DecisionTree, DecisionNode, getRootNode, getNodeById } from '@/data/decision-trees';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/shared/Badge';

interface DecisionTreeViewerProps {
  tree: DecisionTree;
  onReset?: () => void;
}

const DecisionTreeViewer = ({ tree, onReset }: DecisionTreeViewerProps) => {
  const navigate = useNavigate();
  const [currentNodeId, setCurrentNodeId] = useState<string>(tree.rootNodeId);
  const [history, setHistory] = useState<string[]>([tree.rootNodeId]);

  const currentNode = getNodeById(tree, currentNodeId);
  const rootNode = getRootNode(tree);

  if (!currentNode || !rootNode) {
    return (
      <Alert>
        <AlertDescription>Error: Nodo no encontrado en el árbol de decisión.</AlertDescription>
      </Alert>
    );
  }

  const handleAnswer = (answer: 'yes' | 'no') => {
    const nextNodeId = answer === 'yes' ? currentNode.yes : currentNode.no;
    
    if (!nextNodeId) {
      return; // No hay siguiente nodo
    }

    const nextNode = getNodeById(tree, nextNodeId);
    if (!nextNode) {
      return; // Nodo siguiente no encontrado
    }

    // Si es una acción o redirección, no avanzar más
    if (nextNode.type === 'action' || nextNode.type === 'redirect') {
      setCurrentNodeId(nextNodeId);
      setHistory([...history, nextNodeId]);
      return;
    }

    // Si es una pregunta, avanzar normalmente
    setCurrentNodeId(nextNodeId);
    setHistory([...history, nextNodeId]);
  };

  const handleReset = () => {
    setCurrentNodeId(tree.rootNodeId);
    setHistory([tree.rootNodeId]);
    if (onReset) {
      onReset();
    }
  };

  const handleRedirect = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Eliminar el actual
      const previousNodeId = newHistory[newHistory.length - 1];
      setCurrentNodeId(previousNodeId);
      setHistory(newHistory);
    }
  };

  const canGoBack = history.length > 1;
  const isQuestion = currentNode.type === 'question';
  const isAction = currentNode.type === 'action' || currentNode.type === 'redirect';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-lg mb-1">{tree.title}</h3>
          <p className="text-muted-foreground text-sm">{tree.description}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="shrink-0"
          title="Reiniciar árbol"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress indicator */}
      {history.length > 1 && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Paso {history.length}</span>
          {canGoBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-6 px-2 text-xs"
            >
              ← Atrás
            </Button>
          )}
        </div>
      )}

      {/* Current Node Card */}
      <Card className="p-4 space-y-4">
        {/* Question or Action */}
        <div className="space-y-3">
          {isQuestion && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary font-bold text-sm">?</span>
              </div>
              <p className="text-foreground font-medium text-base leading-relaxed pt-1">
                {currentNode.text}
              </p>
            </div>
          )}

          {isAction && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ChevronRight className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold text-base mb-2">
                    {currentNode.text}
                  </p>
                  {currentNode.action && (
                    <p className="text-foreground text-sm leading-relaxed bg-muted p-3 rounded-lg">
                      {currentNode.action}
                    </p>
                  )}
                </div>
              </div>

              {currentNode.notes && (
                <Alert>
                  <Info className="w-4 h-4" />
                  <AlertDescription className="text-sm">
                    {currentNode.notes}
                  </AlertDescription>
                </Alert>
              )}

              {currentNode.redirectTo && (
                <Button
                  onClick={() => handleRedirect(currentNode.redirectTo)}
                  className="w-full"
                  variant="default"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ir a procedimiento relacionado
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Answer Buttons (only for questions) */}
        {isQuestion && (
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => handleAnswer('yes')}
              className="flex-1 bg-success hover:bg-success/90"
              size="lg"
            >
              SÍ
            </Button>
            <Button
              onClick={() => handleAnswer('no')}
              className="flex-1 bg-destructive hover:bg-destructive/90"
              size="lg"
            >
              NO
            </Button>
          </div>
        )}

        {/* Action buttons for actions */}
        {isAction && (
          <div className="flex gap-3 pt-2">
            {canGoBack && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
              >
                ← Atrás
              </Button>
            )}
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        )}
      </Card>

      {/* Source reference */}
      {tree.source && (
        <p className="text-2xs text-muted-foreground text-center">
          Fuente: {tree.source}
        </p>
      )}
    </div>
  );
};

export default DecisionTreeViewer;
