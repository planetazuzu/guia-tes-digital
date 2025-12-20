import { Link } from 'react-router-dom';
import { Star, Trash2, FileText, Pill, Calculator, BookOpen } from 'lucide-react';
import { useFavorites, FavoriteType } from '@/hooks/useFavorites';

const Favoritos = () => {
  const { favorites, removeFavorite, clearFavorites, getFavoritesByType } = useFavorites();

  const getIcon = (type: FavoriteType) => {
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
        return <Star className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: FavoriteType) => {
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
        return 'Favorito';
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Favoritos</h1>
          <p className="text-muted-foreground text-sm">
            Tus protocolos, fármacos y herramientas favoritas
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Star className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg mb-2">No tienes favoritos aún</p>
          <p className="text-sm text-muted-foreground">
            Añade favoritos desde los protocolos o fármacos usando la estrella
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Favoritos</h1>
          <p className="text-muted-foreground text-sm">
            {favorites.length} {favorites.length === 1 ? 'favorito' : 'favoritos'}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="px-4 py-2 text-sm text-destructive hover:text-destructive/80 transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Agrupar por tipo */}
      {(['procedure', 'drug', 'tool', 'manual'] as FavoriteType[]).map((type) => {
        const typeFavorites = getFavoritesByType(type);
        if (typeFavorites.length === 0) return null;

        return (
          <div key={type} className="space-y-2">
            <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
              {getTypeLabel(type)}s ({typeFavorites.length})
            </h2>
            <div className="space-y-2">
              {typeFavorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    {getIcon(favorite.type)}
                  </div>
                  <Link
                    to={favorite.path}
                    className="flex-1 min-w-0"
                  >
                    <p className="font-medium text-foreground truncate">{favorite.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {getTypeLabel(favorite.type)}
                    </p>
                  </Link>
                  <button
                    onClick={() => removeFavorite(favorite.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Eliminar de favoritos"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favoritos;
