import { useState, useMemo } from 'react';
import { Search, MessageSquare, Filter } from 'lucide-react';
import { 
  communicationScripts, 
  CommunicationScript,
  ScriptCategory,
  ScriptContext,
  getScriptsByCategory,
  getScriptsByContext,
  searchScripts
} from '@/data/communication-scripts';
import CommunicationScriptViewer from '@/components/communication-scripts/CommunicationScriptViewer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Badge from '@/components/shared/Badge';

const Comunicacion = () => {
  const [selectedScript, setSelectedScript] = useState<CommunicationScript | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ScriptCategory | 'all'>('all');
  const [selectedContext, setSelectedContext] = useState<ScriptContext | 'all'>('all');

  const filteredScripts = useMemo(() => {
    let filtered = communicationScripts;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = getScriptsByCategory(selectedCategory);
    }

    // Filtrar por contexto
    if (selectedContext !== 'all') {
      filtered = filtered.filter(script => 
        selectedCategory === 'all' 
          ? script.context === selectedContext
          : script.context === selectedContext && script.category === selectedCategory
      );
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      filtered = searchScripts(searchQuery).filter(script => 
        filtered.includes(script)
      );
    }

    return filtered;
  }, [selectedCategory, selectedContext, searchQuery]);

  const categories: ScriptCategory[] = [
    'oxigenoterapia',
    'aspiracion',
    'bvm_canulas',
    'curas_vendajes',
    'transferencias',
    'control_termico',
    'rcp',
    'desa',
    'pls',
    'situaciones_dificiles'
  ];

  const contexts: ScriptContext[] = [
    'procedimiento',
    'coordinacion',
    'paciente',
    'familiares',
    'situacion_dificil'
  ];

  const getCategoryLabel = (category: ScriptCategory) => {
    const labels: Record<ScriptCategory, string> = {
      oxigenoterapia: 'Oxigenoterapia',
      aspiracion: 'Aspiración',
      bvm_canulas: 'BVM/Cánulas',
      curas_vendajes: 'Curas/Vendajes',
      transferencias: 'Transferencias',
      control_termico: 'Control Térmico',
      rcp: 'RCP',
      desa: 'DESA',
      pls: 'PLS',
      situaciones_dificiles: 'Situaciones Difíciles'
    };
    return labels[category] || category;
  };

  const getContextLabel = (context: ScriptContext) => {
    const labels: Record<ScriptContext, string> = {
      procedimiento: 'Procedimiento',
      coordinacion: 'Coordinación',
      paciente: 'Paciente',
      familiares: 'Familiares',
      situacion_dificil: 'Situación Difícil'
    };
    return labels[context] || context;
  };

  const getContextColor = (context: ScriptContext) => {
    switch (context) {
      case 'procedimiento':
        return 'bg-blue-100 text-blue-800';
      case 'coordinacion':
        return 'bg-purple-100 text-purple-800';
      case 'paciente':
        return 'bg-green-100 text-green-800';
      case 'familiares':
        return 'bg-orange-100 text-orange-800';
      case 'situacion_dificil':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedScript) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <CommunicationScriptViewer 
          script={selectedScript}
          onBack={() => setSelectedScript(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <MessageSquare className="h-8 w-8" />
          Guiones de Comunicación Operativa
        </h1>
        <p className="text-gray-600">
          Guiones operativos para comunicación efectiva durante procedimientos, coordinación con equipo y situaciones difíciles.
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 space-y-4">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar guiones por situación, título o contenido..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Categoría:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ScriptCategory | 'all')}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">Todas</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryLabel(category)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Contexto:</span>
            <select
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value as ScriptContext | 'all')}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">Todos</option>
              {contexts.map(context => (
                <option key={context} value={context}>
                  {getContextLabel(context)}
                </option>
              ))}
            </select>
          </div>

          {(selectedCategory !== 'all' || selectedContext !== 'all' || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedContext('all');
                setSearchQuery('');
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Lista de guiones */}
      {filteredScripts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No se encontraron guiones con los filtros seleccionados.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredScripts.map((script) => (
            <Card
              key={script.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedScript(script)}
            >
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{script.shortTitle}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{script.situation}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getContextColor(script.context)}>
                    {getContextLabel(script.context)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getCategoryLabel(script.category)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2 italic">
                  "{script.script.substring(0, 100)}..."
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Contador */}
      <div className="mt-6 text-sm text-gray-500 text-center">
        Mostrando {filteredScripts.length} de {communicationScripts.length} guiones
      </div>
    </div>
  );
};

export default Comunicacion;
