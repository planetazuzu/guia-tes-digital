import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Shield, FileText, List, X } from 'lucide-react';
import { drugAdministration } from '@/data/drug-administration';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/shared/Badge';

interface DrugAdministrationGuideProps {
  onClose?: () => void;
}

const DrugAdministrationGuide = ({ onClose }: DrugAdministrationGuideProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('principles');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
      {onClose && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-900">Principios de Administración de Fármacos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-blue-900" />
          </button>
        </div>
      )}

      <div className="space-y-4">
        {/* Objetivo */}
        <Alert className="bg-blue-100 border-blue-300">
          <FileText className="h-4 w-4 text-blue-700" />
          <AlertDescription className="text-blue-900">
            <strong>Objetivo:</strong> {drugAdministration.objective}
          </AlertDescription>
        </Alert>

        {/* Principios TES */}
        <div>
          <button
            onClick={() => toggleSection('principles')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-bold text-lg text-blue-900 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Principios TES (No Negociables)
            </h3>
            {expandedSection === 'principles' ? (
              <ChevronUp className="w-5 h-5 text-blue-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-700" />
            )}
          </button>
          {expandedSection === 'principles' && (
            <div className="space-y-2 mt-3">
              {drugAdministration.principles.map((principle) => (
                <div
                  key={principle.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    principle.critical
                      ? 'bg-red-50 border-red-500'
                      : 'bg-white border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {principle.critical ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{principle.title}</p>
                      <p className="text-sm text-gray-700">{principle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Regla de las 3 Verificaciones */}
        <Alert className="bg-yellow-50 border-yellow-400 border-2">
          <AlertTriangle className="h-5 w-5 text-yellow-700" />
          <AlertDescription>
            <strong className="text-yellow-900">REGLA DE LAS 3 VERIFICACIONES EN VOZ ALTA</strong>
            <p className="text-yellow-800 mt-1">Esta regla es infranqueable. Es tu principal barrera contra el error.</p>
            <ul className="list-disc list-inside mt-2 text-yellow-800 space-y-1">
              <li><strong>1ª Verificación:</strong> Al sacar el fármaco (nombre, concentración, caducidad)</li>
              <li><strong>2ª Verificación:</strong> Al preparar la dosis (mostrar a compañero y anunciar)</li>
              <li><strong>3ª Verificación:</strong> Antes de administrar (nombre del paciente y alergias)</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Procedimiento Paso a Paso */}
        <div>
          <button
            onClick={() => toggleSection('procedure')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-bold text-lg text-blue-900 flex items-center gap-2">
              <List className="w-5 h-5" />
              Procedimiento Paso a Paso (Secuencia Segura)
            </h3>
            {expandedSection === 'procedure' ? (
              <ChevronUp className="w-5 h-5 text-blue-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-700" />
            )}
          </button>
          {expandedSection === 'procedure' && (
            <div className="space-y-3 mt-3">
              {/* Preparación */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Preparación Previa</h4>
                <div className="space-y-2">
                  {drugAdministration.preparationSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3">
                      <Badge className="bg-blue-600 text-white">{step.order}</Badge>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{step.title}</p>
                        <p className="text-sm text-gray-700">{step.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedimiento */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <h4 className="font-semibold text-blue-900 mb-3">Secuencia de Administración</h4>
                <div className="space-y-3">
                  {drugAdministration.procedureSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        step.critical
                          ? 'bg-red-50 border-red-500'
                          : 'bg-white border-blue-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Badge
                          className={
                            step.critical
                              ? 'bg-red-600 text-white'
                              : 'bg-blue-600 text-white'
                          }
                        >
                          {step.order}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{step.title}</p>
                          <p className="text-sm text-gray-700 mt-1">{step.instruction}</p>
                          {step.notes && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                              <p className="text-xs text-yellow-900">{step.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Precauciones */}
        <div>
          <button
            onClick={() => toggleSection('precautions')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-semibold text-blue-900">Precauciones y Situaciones Complejas</h3>
            {expandedSection === 'precautions' ? (
              <ChevronUp className="w-5 h-5 text-blue-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-700" />
            )}
          </button>
          {expandedSection === 'precautions' && (
            <div className="space-y-2 mt-3">
              {drugAdministration.precautions.map((precaution, index) => (
                <div key={index} className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                  <p className="font-semibold text-amber-900">{precaution.title}</p>
                  <p className="text-sm text-amber-800">{precaution.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Errores Críticos */}
        <div>
          <button
            onClick={() => toggleSection('errors')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-semibold text-red-900 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Errores Críticos a Evitar
            </h3>
            {expandedSection === 'errors' ? (
              <ChevronUp className="w-5 h-5 text-red-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-red-700" />
            )}
          </button>
          {expandedSection === 'errors' && (
            <div className="space-y-2 mt-3">
              {drugAdministration.criticalErrors.map((error, index) => (
                <div
                  key={index}
                  className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500 flex items-start gap-2"
                >
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-900">{error}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Puntos Clave */}
        <Alert className="bg-green-50 border-green-400">
          <CheckCircle className="h-5 w-5 text-green-700" />
          <AlertDescription>
            <strong className="text-green-900">Puntos Clave TES</strong>
            <ul className="list-disc list-inside mt-2 text-green-800 space-y-1">
              {drugAdministration.keyPoints.map((point, index) => (
                <li key={index} className="text-sm">{point}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>

        {/* Material */}
        <div>
          <button
            onClick={() => toggleSection('material')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-semibold text-blue-900">Material Necesario</h3>
            {expandedSection === 'material' ? (
              <ChevronUp className="w-5 h-5 text-blue-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-700" />
            )}
          </button>
          {expandedSection === 'material' && (
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              {drugAdministration.material.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DrugAdministrationGuide;
