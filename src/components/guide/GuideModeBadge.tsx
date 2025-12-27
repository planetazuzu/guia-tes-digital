import Badge from '@/components/shared/Badge';

/**
 * Badge distintivo para identificar "Modo Formación"
 * 
 * Diferencia visualmente las Guías de Refuerzo (formativas)
 * del contenido operativo (protocolos, procedimientos)
 */
export const GuideModeBadge = () => {
  return (
    <Badge 
      variant="info" 
      className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
    >
      Modo Formación
    </Badge>
  );
};

