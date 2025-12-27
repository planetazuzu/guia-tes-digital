import MarkdownViewer from '@/components/content/MarkdownViewer';

interface GuideMarkdownViewerProps {
  /**
   * Ruta del archivo Markdown de la sección
   * Ejemplo: "/docs/consolidado/SECCION_01_ABCDE_OPERATIVO.md"
   */
  filePath: string;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

/**
 * Wrapper de MarkdownViewer específico para Guías de Refuerzo
 * 
 * Características:
 * - NO modifica MarkdownViewer original
 * - Carga archivos desde /docs/consolidado/
 * - Estilos optimizados para lectura formativa (más espaciado)
 * - Preparado para futuras extensiones (navegación, badges, etc.)
 */
/**
 * Wrapper de MarkdownViewer específico para Guías de Refuerzo
 * 
 * Características:
 * - NO modifica MarkdownViewer original
 * - Carga archivos desde /docs/consolidado/
 * - Estilos optimizados para lectura formativa (más espaciado)
 * - Preparado para futuras extensiones (navegación, badges, etc.)
 */
export const GuideMarkdownViewer = ({ filePath, className = '' }: GuideMarkdownViewerProps) => {
  return (
    <div className={`guide-markdown-content space-y-6 ${className}`}>
      <div className="bg-card border border-border rounded-lg p-6">
        <MarkdownViewer 
          filePath={filePath}
          showLoading={true}
          className="prose-lg" // Texto más grande para mejor lectura
        />
      </div>
    </div>
  );
};

