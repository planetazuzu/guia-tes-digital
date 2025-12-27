import { getAllGuides } from '@/data/guides-index';
import { GuideCard } from '@/components/guide/GuideCard';

/**
 * Vista de índice de Guías de Refuerzo
 * 
 * Muestra:
 * - Lista de todas las guías disponibles
 * - Cards clicables para cada guía
 * - Badge "Modo Formación" visible
 * 
 * Sin búsqueda por ahora (se agregará en futuras iteraciones)
 */
const GuideIndex = () => {
  const guides = getAllGuides();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Guías de Refuerzo</h1>
        <p className="text-muted-foreground">
          Contenido formativo para comprensión profunda de protocolos y procedimientos
        </p>
      </div>

      <div className="space-y-4">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>

      {guides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay guías disponibles</p>
        </div>
      )}
    </div>
  );
};

export default GuideIndex;

