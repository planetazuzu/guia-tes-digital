import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Pill, ArrowRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchProcedures, Procedure, Category, Priority, AgeGroup } from '@/data/procedures';
import { searchDrugs, Drug, DrugCategory } from '@/data/drugs';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { Button } from '@/components/ui/button';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  type: 'procedure' | 'drug';
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  priority?: Priority;
  ageGroup?: AgeGroup;
};

type FilterType = 'all' | 'procedure' | 'drug';
type CategoryFilter = Category | DrugCategory | 'all';

// Función helper para verificar si una categoría es de procedimientos
const isProcedureCategory = (cat: string): cat is Category => {
  return ['soporte_vital', 'patologias', 'escena'].includes(cat);
};

// Función helper para verificar si una categoría es de fármacos
const isDrugCategory = (cat: string): cat is DrugCategory => {
  return ['cardiovascular', 'respiratorio', 'neurologico', 'analgesia', 'oxigenoterapia', 'otros'].includes(cat);
};

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { addToHistory } = useSearchHistory();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    let procedures: SearchResult[] = [];
    let drugs: SearchResult[] = [];

    // Buscar procedimientos si el filtro lo permite
    if (typeFilter === 'all' || typeFilter === 'procedure') {
      const procedureResults = searchProcedures(query);
      procedures = procedureResults
        .filter((p) => {
          // Filtrar por categoría si está seleccionada y es una categoría de procedimientos
          if (categoryFilter !== 'all' && isProcedureCategory(categoryFilter)) {
            return categoryFilter === p.category;
          }
          return true;
        })
        .map((p): SearchResult => ({
          type: 'procedure',
          id: p.id,
          title: p.shortTitle,
          subtitle: p.category.replace('_', ' '),
          category: p.category,
          priority: p.priority,
          ageGroup: p.ageGroup,
        }));
    }

    // Buscar fármacos si el filtro lo permite
    if (typeFilter === 'all' || typeFilter === 'drug') {
      const drugResults = searchDrugs(query);
      drugs = drugResults
        .filter((d) => {
          // Filtrar por categoría si está seleccionada y es una categoría de fármacos
          if (categoryFilter !== 'all' && isDrugCategory(categoryFilter)) {
            return categoryFilter === d.category;
          }
          return true;
        })
        .map((d): SearchResult => ({
          type: 'drug',
          id: d.id,
          title: d.genericName,
          subtitle: d.tradeName,
          category: d.category,
        }));
    }

    setResults([...procedures, ...drugs].slice(0, 12));
  }, [query, typeFilter, categoryFilter]);

  // Obtener categorías únicas para los filtros
  const procedureCategories: Category[] = ['soporte_vital', 'patologias', 'escena'];
  const drugCategories: DrugCategory[] = ['cardiovascular', 'respiratorio', 'neurologico', 'analgesia', 'oxigenoterapia', 'otros'];

  // Resetear filtros cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setTypeFilter('all');
      setCategoryFilter('all');
      setQuery('');
    }
  }, [isOpen]);

  const handleResultClick = (result: SearchResult) => {
    // Añadir al historial
    addToHistory({
      id: result.id,
      type: result.type,
      title: result.title,
      path: result.type === 'procedure' 
        ? `/soporte-vital?id=${result.id}`
        : `/farmacos?id=${result.id}`,
    });

    if (result.type === 'procedure') {
      navigate(`/soporte-vital?id=${result.id}`);
    } else {
      navigate(`/farmacos?id=${result.id}`);
    }
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar protocolo, fármaco, calculadora..."
              className="w-full h-14 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={onClose}
            className="w-14 h-14 flex items-center justify-center rounded-xl bg-card border border-border hover:bg-muted transition-colors"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-touch">
          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    {result.type === 'procedure' ? (
                      <FileText className="w-5 h-5 text-primary" />
                    ) : (
                      <Pill className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{result.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {result.subtitle && (
                        <p className="text-sm text-muted-foreground capitalize truncate">
                          {result.subtitle}
                        </p>
                      )}
                      {result.priority && (
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          result.priority === 'critico' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                          result.priority === 'alto' ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400' :
                          result.priority === 'medio' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                          'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                        }`}>
                          {result.priority}
                        </span>
                      )}
                      {result.ageGroup && result.ageGroup !== 'todos' && (
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {result.ageGroup}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron resultados</p>
              <p className="text-sm text-muted-foreground">Intenta con otros términos</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Escribe para buscar</p>
              <p className="text-sm text-muted-foreground">Protocolos, fármacos, calculadoras...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
