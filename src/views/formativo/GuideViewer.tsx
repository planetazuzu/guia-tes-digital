import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGuideById } from '@/data/guides-index';
import { GuideHeader } from '@/components/guide/GuideHeader';
import { GuideMarkdownViewer } from '@/components/guide/GuideMarkdownViewer';
import { GuideNavigation } from '@/components/guide/GuideNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackButton from '@/components/ui/BackButton';

/**
 * Visualizador completo de una guía de refuerzo
 * 
 * Muestra:
 * - Header de la guía
 * - Tabs para navegar entre las 8 secciones
 * - Contenido Markdown de cada sección
 * - Navegación anterior/siguiente
 * - Enlace al protocolo operativo relacionado
 */
const GuideViewer = () => {
  const { guia } = useParams<{ guia: string }>();
  const navigate = useNavigate();
  
  if (!guia) {
    return <Navigate to="/guia-refuerzo" replace />;
  }

  const guide = getGuideById(guia);
  
  if (!guide) {
    return <Navigate to="/guia-refuerzo" replace />;
  }

  // Sincronizar tab con URL si hay parámetro de sección
  const { numero } = useParams<{ numero?: string }>();
  const initialTab = numero ? numero : '1';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Actualizar tab si cambia la URL
  useEffect(() => {
    if (numero) {
      setActiveTab(numero);
    }
  }, [numero]);

  return (
    <div className="space-y-6">
      <BackButton to="/guia-refuerzo" label="Volver a Guías" />
      
      <GuideHeader guide={guide} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 overflow-x-auto">
          {guide.secciones.map((section) => (
            <TabsTrigger 
              key={section.numero} 
              value={section.numero.toString()}
              className="text-xs"
            >
              {section.numero}
            </TabsTrigger>
          ))}
        </TabsList>

        {guide.secciones.map((section) => (
          <TabsContent key={section.numero} value={section.numero.toString()} className="mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {section.titulo}
              </h2>
              <GuideMarkdownViewer filePath={section.ruta} />
              <GuideNavigation guideId={guia} currentSection={section.numero} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GuideViewer;

