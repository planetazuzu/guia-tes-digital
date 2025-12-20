import { Link } from 'react-router-dom';
import { History, Trash2, FileText, Pill, Calculator, BookOpen, Clock, X } from 'lucide-react';
import { useSearchHistory, SearchItemType } from '@/hooks/useSearchHistory';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const Historial = () => {
  const { history, clearHistory, removeFromHistory } = useSearchHistory();

  const getIcon = (type: SearchItemType) => {
    switch (type) {
      case 'procedure':
        return <FileText className="w-5 h-5" />;
      case 'drug':
        return <Pill className="w-5 h-5" />;
      case 'tool':
        return <Calculator className="w-5 h-5" />;
      case 'manual':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <History className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: SearchItemType) => {
    switch (type) {
      case 'procedure':
        return 'Protocolo';
      case 'drug':
        return 'Fármaco';
      case 'tool':
        return 'Herramienta';
      case 'manual':
        return 'Manual';
      default:
        return 'Búsqueda';
    }
  };

  if (history.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Historial</h1>
          <p className="text-muted-foreground text-sm">
            Tus búsquedas y consultas recientes
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <History className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg mb-2">No hay historial</p>
          <p className="text-sm text-muted-foreground">
            Tu historial de búsquedas aparecerá aquí
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Historial</h1>
          <p className="text-muted-foreground text-sm">
            {history.length} {history.length === 1 ? 'consulta' : 'consultas'}
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 text-sm text-destructive hover:text-destructive/80 transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>

      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={`${item.id}-${item.searchedAt}`}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              {getIcon(item.type)}
            </div>
            <Link
              to={item.path}
              className="flex-1 min-w-0"
            >
              <p className="font-medium text-foreground truncate">{item.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground capitalize">
                  {getTypeLabel(item.type)}
                </p>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(item.searchedAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </Link>
            <button
              onClick={() => removeFromHistory(item.id)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Eliminar del historial"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Historial;
