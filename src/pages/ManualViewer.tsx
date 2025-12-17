import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import MarkdownViewer from '@/components/content/MarkdownViewer';
import { manualIndex, getCapituloById, Capitulo } from '@/data/manual-index';

const ManualViewer = () => {
  const { parte, bloque, capitulo } = useParams<{
    parte: string;
    bloque: string;
    capitulo: string;
  }>();
  
  const [capituloData, setCapituloData] = useState<Capitulo | null>(null);
  const [filePath, setFilePath] = useState<string>('');

  // Buscar capítulo por ID desde la URL y construir ruta del archivo
  useEffect(() => {
    if (!capitulo) return;

    const cap = getCapituloById(capitulo);
    if (cap) {
      setCapituloData(cap);
      
      // Construir ruta del archivo desde public/
      // La ruta en manual-index.ts es: manual-tes/TES_Manual_Digital/BLOQUE_X/archivo.md
      // Convertir a: /manual/BLOQUE_X/archivo.md
      const rutaArchivo = cap.rutaArchivo;
      const nombreArchivo = rutaArchivo.split('/').pop();
      const carpetaBloque = rutaArchivo.split('/').slice(-2, -1)[0];
      const rutaPublic = `/manual/${carpetaBloque}/${nombreArchivo}`;
      
      setFilePath(rutaPublic);
    }
  }, [capitulo]);

  if (!capituloData || !filePath) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <BookOpen className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Capítulo no encontrado</h2>
        <p className="text-muted-foreground">El capítulo {capitulo} no existe en el índice</p>
        <Link
          to="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const capituloAnterior = capituloData.navegacion.anterior
    ? getCapituloById(capituloData.navegacion.anterior)
    : null;
  const capituloSiguiente = capituloData.navegacion.siguiente
    ? getCapituloById(capituloData.navegacion.siguiente)
    : null;

  return (
    <div className="space-y-6">
      {/* Header del capítulo */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>{capituloData.parteNombre}</span>
          <span>/</span>
          <span>{capituloData.bloqueNombre}</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">{capituloData.titulo}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>ID: {capituloData.id}</span>
          <span>•</span>
          <span>Tiempo estimado: {capituloData.tiempoLectura} min</span>
          <span>•</span>
          <span className={`px-2 py-1 rounded text-xs ${
            capituloData.importancia === 'alta' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
            capituloData.importancia === 'media' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
            'bg-blue-500/20 text-blue-600 dark:text-blue-400'
          }`}>
            {capituloData.importancia === 'alta' ? 'Alta importancia' :
             capituloData.importancia === 'media' ? 'Importancia media' : 'Importancia baja'}
          </span>
        </div>
      </div>

      {/* Contenido Markdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <MarkdownViewer filePath={filePath} />
      </div>

      {/* Navegación anterior/siguiente */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        {capituloAnterior ? (
          <Link
            to={capituloAnterior.rutaUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Anterior</div>
              <div className="font-medium text-foreground">{capituloAnterior.titulo}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {capituloSiguiente ? (
          <Link
            to={capituloSiguiente.rutaUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors group"
          >
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Siguiente</div>
              <div className="font-medium text-foreground">{capituloSiguiente.titulo}</div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ManualViewer;
