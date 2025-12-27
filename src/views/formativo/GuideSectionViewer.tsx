import { useParams, Navigate } from 'react-router-dom';
import { getGuideById, getGuideSection } from '@/data/guides-index';
import { GuideHeader } from '@/components/guide/GuideHeader';
import { GuideMarkdownViewer } from '@/components/guide/GuideMarkdownViewer';
import { GuideNavigation } from '@/components/guide/GuideNavigation';
import BackButton from '@/components/ui/BackButton';

/**
 * Visualizador de una sección individual de una guía
 * 
 * Muestra:
 * - Header de la guía
 * - Título de la sección actual
 * - Contenido Markdown de la sección
 * - Navegación anterior/siguiente
 */
const GuideSectionViewer = () => {
  const { guia, numero } = useParams<{ guia: string; numero: string }>();
  
  if (!guia || !numero) {
    return <Navigate to="/guia-refuerzo" replace />;
  }

  const sectionNumber = parseInt(numero, 10);
  
  if (isNaN(sectionNumber) || sectionNumber < 1) {
    return <Navigate to="/guia-refuerzo" replace />;
  }

  const guide = getGuideById(guia);
  
  if (!guide) {
    return <Navigate to="/guia-refuerzo" replace />;
  }

  if (sectionNumber > guide.secciones.length) {
    return <Navigate to="/guia-refuerzo" replace />;
  }

  const section = getGuideSection(guia, sectionNumber);
  
  if (!section) {
    return <Navigate to="/guia-refuerzo" replace />;
  }

  return (
    <div className="space-y-6">
      <BackButton to={`/guia-refuerzo/${guia}`} label="Volver a Guía" />
      
      <GuideHeader guide={guide} />

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {section.titulo}
          </h2>
          <div className="text-sm text-muted-foreground">
            Sección {section.numero} de {guide.secciones.length}
          </div>
        </div>

        <GuideMarkdownViewer filePath={section.ruta} />

        <GuideNavigation guideId={guia} currentSection={sectionNumber} />
      </div>
    </div>
  );
};

export default GuideSectionViewer;

