import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Pill, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchProcedures, Procedure } from '@/data/procedures';
import { searchDrugs, Drug } from '@/data/drugs';
import { useSearchHistory } from '@/hooks/useSearchHistory';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  type: 'procedure' | 'drug';
  id: string;
  title: string;
  subtitle?: string;
};

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
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

    const procedures = searchProcedures(query).map((p): SearchResult => ({
      type: 'procedure',
      id: p.id,
      title: p.shortTitle,
      subtitle: p.category.replace('_', ' '),
    }));

    const drugs = searchDrugs(query).map((d): SearchResult => ({
      type: 'drug',
      id: d.id,
      title: d.genericName,
      subtitle: d.tradeName,
    }));

    setResults([...procedures, ...drugs].slice(0, 8));
  }, [query]);

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
                    {result.subtitle && (
                      <p className="text-sm text-muted-foreground capitalize truncate">
                        {result.subtitle}
                      </p>
                    )}
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
