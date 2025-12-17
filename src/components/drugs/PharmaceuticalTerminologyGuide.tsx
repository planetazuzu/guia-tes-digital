import { useState, useMemo } from 'react';
import { Search, AlertTriangle, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { pharmaceuticalTerminology, TerminologyCategory, TerminologyTerm } from '@/data/pharmaceutical-terminology';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/shared/Badge';

interface PharmaceuticalTerminologyGuideProps {
  onClose?: () => void;
}

const PharmaceuticalTerminologyGuide = ({ onClose }: PharmaceuticalTerminologyGuideProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TerminologyCategory | 'todos'>('todos');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['principles', 'lookalikes']));

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
    let terms: TerminologyTerm[] = [];
    
    if (selectedCategory === 'unidades' || selectedCategory === 'todos') {
      terms = [...terms, ...pharmaceuticalTerminology.units];
    }
    if (selectedCategory === 'vias' || selectedCategory === 'todos') {
      terms = [...terms, ...pharmaceuticalTerminology.routes];
    }
    if (selectedCategory === 'conceptos' || selectedCategory === 'todos') {
      terms = [...terms, ...pharmaceuticalTerminology.concepts];
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      terms = terms.filter(term =>
        term.abbreviation.toLowerCase().includes(lowerQuery) ||
        term.fullTerm.toLowerCase().includes(lowerQuery) ||
        term.explanation.toLowerCase().includes(lowerQuery)
      );
    }

    return terms;
  }, [selectedCategory, searchQuery]);

  const categories: { id: TerminologyCategory | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todas' },
    { id: 'unidades', label: 'Unidades' },
    { id: 'vias', label: 'Vías' },
    { id: 'conceptos', label: 'Conceptos' },
  ];

  return (
    <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
      {onClose && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-900" />
            <h2 className="text-xl font-bold text-blue-900">Abreviaturas y Terminología Farmacológica</h2>
          </div>
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
          <AlertDescription className="text-blue-900">
            <strong>Objetivo:</strong> {pharmaceuticalTerminology.objective}
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
              {pharmaceuticalTerminology.principles.map((principle, index) => (
                <li key={index} className="text-blue-900 text-sm flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Regla de oro */}
        <Alert className="bg-yellow-50 border-yellow-400 border-2">
          <AlertTriangle className="h-5 w-5 text-yellow-700" />
          <AlertDescription>
            <strong className="text-yellow-900">REGLA DE ORO</strong>
            <p className="text-yellow-800 mt-1">Si dudas, NO abrevies. Escribe la palabra completa. Es más lento pero infinitamente más seguro.</p>
          </AlertDescription>
        </Alert>

        {/* Look-Alike / Sound-Alike */}
        <div>
          <button
            onClick={() => toggleSection('lookalikes')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-bold text-lg text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Términos Look-Alike/Sound-Alike (ALTO RIESGO)
            </h3>
            {expandedSections.has('lookalikes') ? (
              <ChevronUp className="w-5 h-5 text-red-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-red-700" />
            )}
          </button>
          {expandedSections.has('lookalikes') && (
            <div className="space-y-3 mt-3">
              {pharmaceuticalTerminology.lookAlikes.map((pair, index) => (
                <Card key={index} className="p-4 bg-red-50 border-red-300">
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="font-semibold text-red-900">{pair.term1}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-900">{pair.term2}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-red-900">Peligro:</p>
                    <p className="text-sm text-red-800">{pair.danger}</p>
                    <p className="text-sm font-semibold text-yellow-900">Prevención:</p>
                    <p className="text-sm text-yellow-800">{pair.prevention}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Búsqueda y Filtros */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar abreviatura o término..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-900 hover:bg-blue-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Términos */}
        <div className="space-y-2">
          {filteredTerms.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No se encontraron términos</p>
          ) : (
            filteredTerms.map((term) => (
              <Card key={term.id} className="p-4 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="font-mono text-sm">
                        {term.abbreviation}
                      </Badge>
                      <span className="font-semibold text-gray-900">{term.fullTerm}</span>
                    </div>
                    <p className="text-sm text-gray-700">{term.explanation}</p>
                    {term.danger && (
                      <Alert className="mt-2 bg-amber-50 border-amber-300">
                        <AlertTriangle className="h-4 w-4 text-amber-700" />
                        <AlertDescription className="text-amber-900 text-xs">
                          <strong>Advertencia:</strong> {term.danger}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Errores Críticos */}
        <div>
          <button
            onClick={() => toggleSection('errors')}
            className="w-full flex items-center justify-between text-left mb-2"
          >
            <h3 className="font-semibold text-red-900">Errores Críticos a Evitar</h3>
            {expandedSections.has('errors') ? (
              <ChevronUp className="w-5 h-5 text-red-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-red-700" />
            )}
          </button>
          {expandedSections.has('errors') && (
            <ul className="space-y-2 mt-3">
              {pharmaceuticalTerminology.criticalErrors.map((error, index) => (
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
              {pharmaceuticalTerminology.keyPoints.map((point, index) => (
                <li key={index} className="text-sm">{point}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
};

export default PharmaceuticalTerminologyGuide;
