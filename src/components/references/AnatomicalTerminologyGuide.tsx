import { useState, useMemo } from 'react';
import { Search, AlertTriangle, BookOpen, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { anatomicalTerminology, AnatomicalCategory } from '@/data/anatomical-terminology';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/shared/Badge';

interface AnatomicalTerminologyGuideProps {
  onClose?: () => void;
}

const AnatomicalTerminologyGuide = ({ onClose }: AnatomicalTerminologyGuideProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AnatomicalCategory | 'todos' | 'posiciones' | 'landmarks'>('todos');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['principles']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const filteredTerms = useMemo(() => {
    if (selectedCategory === 'posiciones') {
      return [];
    }
    if (selectedCategory === 'landmarks') {
      return [];
    }
    if (selectedCategory === 'todos') {
      return anatomicalTerminology.directionalTerms;
    }
    return anatomicalTerminology.directionalTerms.filter(term => term.category === selectedCategory);
  }, [selectedCategory]);

  const searchedTerms = useMemo(() => {
    if (!searchQuery.trim()) return filteredTerms;
    const lowerQuery = searchQuery.toLowerCase();
    return filteredTerms.filter(term =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      (term.example && term.example.toLowerCase().includes(lowerQuery))
    );
  }, [filteredTerms, searchQuery]);

  const categories: { id: AnatomicalCategory | 'todos' | 'posiciones' | 'landmarks'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'direccion', label: 'Dirección' },
    { id: 'posiciones', label: 'Posiciones' },
    { id: 'landmarks', label: 'Puntos de Referencia' },
  ];

  const regionLabels: Record<string, string> = {
    cabeza_cuello: 'Cabeza y Cuello',
    torax: 'Tórax',
    pelvis: 'Pelvis',
    extremidades: 'Extremidades'
  };

  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      {onClose && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-900" />
            <h2 className="text-xl font-bold text-blue-900">Anatomía Operativa</h2>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Objetivo */}
        <Alert className="bg-blue-100 border-blue-300">
          <AlertDescription className="text-blue-900">
            <strong>Objetivo:</strong> {anatomicalTerminology.objective}
          </AlertDescription>
        </Alert>

        {/* Principios */}
        <div>
          <button
            onClick={() => toggleSection('principles')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-bold text-lg text-blue-900">Principios TES</h3>
            {expandedSections.has('principles') ? (
              <ChevronUp className="w-5 h-5 text-blue-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-700" />
            )}
          </button>
          {expandedSections.has('principles') && (
            <ul className="space-y-2 mt-3 pl-4">
              {anatomicalTerminology.principles.map((principle, index) => (
                <li key={index} className="text-blue-900 text-sm flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tabs para categorías */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-900 hover:bg-blue-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Búsqueda */}
        {(selectedCategory === 'todos' || selectedCategory === 'direccion') && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar término anatómico..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        )}

        {/* Contenido según categoría seleccionada */}
        {selectedCategory === 'posiciones' && (
          <div className="space-y-3">
            {anatomicalTerminology.positions.map((position) => (
              <Card key={position.id} className="p-4 bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">{position.name}</h4>
                <p className="text-sm text-gray-700 mb-2">{position.description}</p>
                <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="text-xs text-blue-900">
                    <strong>Indicación:</strong> {position.indication}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedCategory === 'landmarks' && (
          <div className="space-y-4">
            {['cabeza_cuello', 'torax', 'pelvis', 'extremidades'].map((region) => {
              const landmarks = anatomicalTerminology.landmarks.filter(l => l.region === region);
              if (landmarks.length === 0) return null;
              return (
                <div key={region}>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    {regionLabels[region]}
                  </h4>
                  <div className="space-y-2">
                    {landmarks.map((landmark) => (
                      <Card key={landmark.id} className="p-4 bg-white">
                        <h5 className="font-semibold text-gray-900 mb-1">{landmark.name}</h5>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Localización:</strong> {landmark.location}
                        </p>
                        <p className="text-sm text-gray-700">{landmark.purpose}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(selectedCategory === 'todos' || selectedCategory === 'direccion') && (
          <div className="space-y-2">
            {searchedTerms.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No se encontraron términos</p>
            ) : (
              searchedTerms.map((term) => (
                <Card key={term.id} className={`p-4 ${term.critical ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={term.critical ? 'destructive' : 'outline'} className="font-semibold">
                          {term.term}
                        </Badge>
                        {term.critical && (
                          <Badge variant="destructive" className="text-xs">Crítico</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{term.definition}</p>
                      {term.example && (
                        <div className="mt-2 p-2 bg-gray-50 rounded border-l-2 border-gray-300">
                          <p className="text-xs text-gray-600">
                            <strong>Ejemplo:</strong> "{term.example}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Aplicación paso a paso */}
        <div>
          <button
            onClick={() => toggleSection('application')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-bold text-lg text-blue-900">Aplicación en Escena (Paso a Paso)</h3>
            {expandedSections.has('application') ? (
              <ChevronUp className="w-5 h-5 text-blue-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-700" />
            )}
          </button>
          {expandedSections.has('application') && (
            <div className="space-y-3 mt-3">
              {anatomicalTerminology.applicationSteps.map((step) => (
                <Card key={step.id} className={`p-4 ${step.critical ? 'bg-yellow-50 border-yellow-300' : 'bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <Badge className={`${step.critical ? 'bg-yellow-600' : 'bg-blue-600'} text-white`}>
                      {step.step}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-700">{step.instruction}</p>
                    </div>
                  </div>
                </Card>
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
              <AlertTriangle className="w-5 h-5" />
              Errores Críticos a Evitar
            </h3>
            {expandedSections.has('errors') ? (
              <ChevronUp className="w-5 h-5 text-red-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-red-700" />
            )}
          </button>
          {expandedSections.has('errors') && (
            <ul className="space-y-2 mt-3">
              {anatomicalTerminology.criticalErrors.map((error, index) => (
                <li key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500 text-red-900 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Puntos Clave */}
        <Alert className="bg-green-50 border-green-400">
          <AlertDescription>
            <strong className="text-green-900">Puntos Clave TES</strong>
            <ul className="list-disc list-inside mt-2 text-green-800 space-y-1">
              {anatomicalTerminology.keyPoints.map((point, index) => (
                <li key={index} className="text-sm">{point}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
};

export default AnatomicalTerminologyGuide;
