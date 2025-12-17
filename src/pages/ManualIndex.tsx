import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, Search } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import { manualIndex, Parte, Bloque, Capitulo } from '@/data/manual-index';

const ManualIndex = () => {
  const [expandedPartes, setExpandedPartes] = useState<Set<number>>(new Set([1]));
  const [expandedBloques, setExpandedBloques] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleParte = (parteId: number) => {
    const newExpanded = new Set(expandedPartes);
    if (newExpanded.has(parteId)) {
      newExpanded.delete(parteId);
    } else {
      newExpanded.add(parteId);
    }
    setExpandedPartes(newExpanded);
  };

  const toggleBloque = (parteId: number, bloqueId: number) => {
    const key = `${parteId}-${bloqueId}`;
    const newExpanded = new Set(expandedBloques);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedBloques(newExpanded);
  };

  // Filtrar contenido según búsqueda
  const filterContent = (partes: Parte[]): Parte[] => {
    if (!searchQuery.trim()) return partes;

    const query = searchQuery.toLowerCase();
    return partes
      .map((parte) => {
        // Verificar si la parte coincide con la búsqueda
        const parteCoincide = parte.nombre.toLowerCase().includes(query);
        
        const bloquesFiltrados = parte.bloques
          .map((bloque) => {
            // Verificar si el bloque coincide con la búsqueda
            const bloqueCoincide = bloque.nombre.toLowerCase().includes(query);
            
            const capitulosFiltrados = bloque.capitulos.filter(
              (capitulo) =>
                capitulo.titulo.toLowerCase().includes(query) ||
                capitulo.palabrasClave.some((kw) => kw.toLowerCase().includes(query)) ||
                capitulo.id.toLowerCase().includes(query) ||
                parteCoincide || // Si la parte coincide, incluir todos sus capítulos
                bloqueCoincide    // Si el bloque coincide, incluir todos sus capítulos
            );
            return { ...bloque, capitulos: capitulosFiltrados };
          })
          .filter((bloque) => bloque.capitulos.length > 0);

        return { ...parte, bloques: bloquesFiltrados };
      })
      .filter((parte) => parte.bloques.length > 0);
  };

  const filteredPartes = filterContent(manualIndex);

  const getIconForParte = (icono?: string) => {
    // Por ahora retornamos BookOpen como default
    return <BookOpen className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Botón de retroceso */}
      <BackButton to="/" label="Volver al inicio" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manual Completo TES</h1>
            <p className="text-muted-foreground">
              Navega por todos los capítulos del manual ({manualIndex.reduce((acc, parte) => 
                acc + parte.bloques.reduce((sum, bloque) => sum + bloque.capitulos.length, 0), 0
              )} capítulos)
            </p>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar capítulo, palabra clave..."
            className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Estructura jerárquica */}
      <div className="space-y-2">
        {filteredPartes.map((parte) => {
          const isParteExpanded = expandedPartes.has(parte.id);
          const totalCapitulos = parte.bloques.reduce(
            (sum, bloque) => sum + bloque.capitulos.length,
            0
          );

          return (
            <div
              key={parte.id}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              {/* Parte Header */}
              <button
                onClick={() => toggleParte(parte.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-muted transition-colors text-left"
              >
                {isParteExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                {getIconForParte(parte.icono)}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-foreground">
                    Parte {parte.id}: {parte.nombre}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {parte.bloques.length} bloques • {totalCapitulos} capítulos
                  </p>
                </div>
              </button>

              {/* Bloques */}
              {isParteExpanded && (
                <div className="border-t border-border">
                  {parte.bloques.map((bloque) => {
                    const bloqueKey = `${parte.id}-${bloque.id}`;
                    const isBloqueExpanded = expandedBloques.has(bloqueKey);

                    return (
                      <div key={bloque.id} className="border-b border-border last:border-b-0">
                        {/* Bloque Header */}
                        <button
                          onClick={() => toggleBloque(parte.id, bloque.id)}
                          className="w-full flex items-center gap-3 p-3 pl-8 hover:bg-muted/50 transition-colors text-left"
                        >
                          {isBloqueExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground">
                              Bloque {bloque.id}: {bloque.nombre}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {bloque.capitulos.length} capítulos
                            </p>
                          </div>
                        </button>

                        {/* Capítulos */}
                        {isBloqueExpanded && (
                          <div className="bg-muted/30">
                            {bloque.capitulos.map((capitulo) => (
                              <Link
                                key={capitulo.id}
                                to={capitulo.rutaUrl}
                                className="flex items-center gap-3 p-3 pl-12 hover:bg-muted transition-colors group"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-muted-foreground">
                                      {capitulo.id}
                                    </span>
                                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                      {capitulo.titulo}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-muted-foreground">
                                      {capitulo.tiempoLectura} min
                                    </span>
                                    {capitulo.importancia === 'alta' && (
                                      <span className="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-600 dark:text-red-400 rounded">
                                        Alta
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mensaje si no hay resultados */}
      {searchQuery && filteredPartes.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No se encontraron resultados</p>
          <p className="text-sm text-muted-foreground mt-2">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

export default ManualIndex;
