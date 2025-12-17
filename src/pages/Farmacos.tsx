import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Info, BookOpen, AlertTriangle } from 'lucide-react';
import { drugs, Drug, DrugCategory } from '@/data/drugs';
import { tesMedications, TESMedication, getMedicationsByCategory } from '@/data/tes-medication';
import DrugCard from '@/components/drugs/DrugCard';
import TESMedicationCard from '@/components/drugs/TESMedicationCard';
import DrugAdministrationGuide from '@/components/drugs/DrugAdministrationGuide';
import PharmaceuticalTerminologyGuide from '@/components/drugs/PharmaceuticalTerminologyGuide';

const categories: { id: DrugCategory | 'todos' | 'tes'; label: string }[] = [
  { id: 'tes', label: 'Medicación TES' },
  { id: 'todos', label: 'Todos' },
  { id: 'oxigenoterapia', label: 'Oxigenoterapia' },
  { id: 'cardiovascular', label: 'Cardiovascular' },
  { id: 'respiratorio', label: 'Respiratorio' },
  { id: 'neurologico', label: 'Neurológico' },
  { id: 'analgesia', label: 'Analgesia' },
  { id: 'otros', label: 'Otros' },
];

const tesCategories: { id: TESMedication['category'] | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'hipoglucemia', label: 'Hipoglucemias' },
  { id: 'respiratorio', label: 'Crisis Respiratorias' },
  { id: 'anafilaxia', label: 'Crisis Anafilácticas' },
];

const Farmacos = () => {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('id');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<DrugCategory | 'todos' | 'tes'>('tes');
  const [activeTESCategory, setActiveTESCategory] = useState<TESMedication['category'] | 'todos'>('todos');
  const [showAdministrationGuide, setShowAdministrationGuide] = useState(true);
  const [showTerminologyGuide, setShowTerminologyGuide] = useState(false);

  const filteredTESMedications = useMemo(() => {
    let result: TESMedication[] = [...tesMedications];

    // Filter by TES category
    if (activeTESCategory !== 'todos') {
      result = result.filter((m) => m.category === activeTESCategory);
    }

    // Filter by search
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.indication.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeTESCategory, searchQuery]);

  const filteredDrugs = useMemo(() => {
    let result = [...drugs];

    // Filter by category
    if (activeCategory !== 'todos' && activeCategory !== 'tes') {
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

      {/* Guía de Principios de Administración */}
      {showAdministrationGuide && (
        <DrugAdministrationGuide onClose={() => setShowAdministrationGuide(false)} />
      )}

      {/* Guía de Terminología */}
      {showTerminologyGuide && (
        <PharmaceuticalTerminologyGuide onClose={() => setShowTerminologyGuide(false)} />
      )}

      {!showAdministrationGuide && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setShowAdministrationGuide(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Info className="w-4 h-4" />
            Ver Principios de Administración
          </button>
          <button
            onClick={() => setShowTerminologyGuide(!showTerminologyGuide)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {showTerminologyGuide ? 'Ocultar' : 'Ver'} Abreviaturas y Terminología
          </button>
        </div>
      )}

      {/* Guía de Terminología */}
      {showTerminologyGuide && (
        <PharmaceuticalTerminologyGuide onClose={() => setShowTerminologyGuide(false)} />
      )}

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

      {/* TES Medication Subcategories */}
      {activeCategory === 'tes' && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {tesCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTESCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTESCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* TES Medications List */}
      {activeCategory === 'tes' && (
        <div className="space-y-4">
          {filteredTESMedications.map((medication) => (
            <TESMedicationCard
              key={medication.id}
              medication={medication}
            />
          ))}
          {filteredTESMedications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No se encontraron medicaciones
              </p>
            </div>
          )}
        </div>
      )}

      {/* Drugs List (Vademécum completo) */}
      {activeCategory !== 'tes' && (
        <div className="space-y-4">
          {filteredDrugs.map((drug) => (
            <DrugCard
              key={drug.id}
              drug={drug}
              defaultExpanded={drug.id === highlightId}
            />
          ))}
          {filteredDrugs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No se encontraron fármacos
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Farmacos;
