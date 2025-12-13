import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { drugs, Drug, DrugCategory } from '@/data/drugs';
import DrugCard from '@/components/drugs/DrugCard';

const categories: { id: DrugCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'cardiovascular', label: 'Cardiovascular' },
  { id: 'respiratorio', label: 'Respiratorio' },
  { id: 'neurologico', label: 'Neurológico' },
  { id: 'analgesia', label: 'Analgesia' },
  { id: 'otros', label: 'Otros' },
];

const Farmacos = () => {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('id');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<DrugCategory | 'todos'>('todos');

  const filteredDrugs = useMemo(() => {
    let result = [...drugs];

    // Filter by category
    if (activeCategory !== 'todos') {
      result = result.filter((d) => d.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.genericName.toLowerCase().includes(query) ||
          d.tradeName.toLowerCase().includes(query) ||
          d.indications.some((i) => i.toLowerCase().includes(query))
      );
    }

    // Sort highlighted to top
    if (highlightId) {
      result.sort((a, b) => {
        if (a.id === highlightId) return -1;
        if (b.id === highlightId) return 1;
        return 0;
      });
    }

    return result;
  }, [activeCategory, searchQuery, highlightId]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Fármacos</h1>
        <p className="text-muted-foreground text-sm">
          Vademécum de emergencias
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar fármaco..."
          className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Drugs List */}
      <div className="space-y-4">
        {filteredDrugs.map((drug) => (
          <DrugCard
            key={drug.id}
            drug={drug}
            defaultExpanded={drug.id === highlightId}
          />
        ))}
      </div>

      {filteredDrugs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No se encontraron fármacos
          </p>
        </div>
      )}
    </div>
  );
};

export default Farmacos;
