import { useState } from 'react';
import { Copy, Check, Info, AlertCircle } from 'lucide-react';
import { CommunicationScript } from '@/data/communication-scripts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/shared/Badge';

interface CommunicationScriptViewerProps {
  script: CommunicationScript;
  onBack?: () => void;
}

const CommunicationScriptViewer = ({ script, onBack }: CommunicationScriptViewerProps) => {
  const [copied, setCopied] = useState(false);
  const [showVariations, setShowVariations] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const getContextColor = (context: CommunicationScript['context']) => {
    switch (context) {
      case 'procedimiento':
        return 'bg-blue-100 text-blue-800';
      case 'coordinacion':
        return 'bg-purple-100 text-purple-800';
      case 'paciente':
        return 'bg-green-100 text-green-800';
      case 'familiares':
        return 'bg-orange-100 text-orange-800';
      case 'situacion_dificil':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContextLabel = (context: CommunicationScript['context']) => {
    switch (context) {
      case 'procedimiento':
        return 'Procedimiento';
      case 'coordinacion':
        return 'Coordinación';
      case 'paciente':
        return 'Paciente';
      case 'familiares':
        return 'Familiares';
      case 'situacion_dificil':
        return 'Situación Difícil';
      default:
        return context;
    }
  };

  return (
    <div className="space-y-4">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Volver
        </Button>
      )}

      <Card className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{script.title}</h2>
              <p className="text-gray-600 mb-3">{script.situation}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className={getContextColor(script.context)}>
                  {getContextLabel(script.context)}
                </Badge>
                <Badge variant="outline">{script.category}</Badge>
              </div>
            </div>
          </div>

          {/* Guión principal */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-blue-900">Guión para leer:</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="ml-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <p className="text-lg text-blue-900 font-medium leading-relaxed">
              "{script.script}"
            </p>
          </div>

          {/* Cuándo usar */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Cuándo usar:</strong> {script.whenToUse}
            </AlertDescription>
          </Alert>

          {/* Variaciones */}
          {script.variations && script.variations.length > 0 && (
            <Card className="p-4 bg-gray-50">
              <button
                onClick={() => setShowVariations(!showVariations)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-semibold">Variaciones</h3>
                <span className="text-sm text-gray-500">
                  {showVariations ? 'Ocultar' : 'Mostrar'} ({script.variations.length})
                </span>
              </button>
              {showVariations && (
                <ul className="mt-3 space-y-2">
                  {script.variations.map((variation, index) => (
                    <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-gray-300">
                      {variation}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}

          {/* Notas para el TES */}
          {script.notes && (
            <Card className="p-4 bg-amber-50">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <h3 className="font-semibold text-amber-900">Notas para el TES</h3>
                </div>
                <span className="text-sm text-amber-700">
                  {showNotes ? 'Ocultar' : 'Mostrar'}
                </span>
              </button>
              {showNotes && (
                <p className="mt-3 text-sm text-amber-900">{script.notes}</p>
              )}
            </Card>
          )}

          {/* Fuente */}
          {script.source && (
            <p className="text-xs text-gray-500 text-right">
              Fuente: {script.source}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommunicationScriptViewer;
