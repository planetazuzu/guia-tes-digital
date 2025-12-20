import { useState } from 'react';
import { Image, X, ZoomIn, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton';

// Estructura de imágenes por bloque
const imagenesPorBloque: Record<string, { nombre: string; ruta: string; descripcion?: string }[]> = {
  'bloque-0-fundamentos': [
    { nombre: 'ALGORITMO OPERATIVO DEL TES.svg', ruta: '/assets/infografias/bloque-0-fundamentos/ALGORITMO OPERATIVO DEL TES.svg' },
    { nombre: 'diagrama-seleccion-dispositivo-oxigenoterapia.png', ruta: '/assets/infografias/bloque-0-fundamentos/diagrama-seleccion-dispositivo-oxigenoterapia.png' },
    { nombre: 'fast-transtelefonico.png', ruta: '/assets/infografias/bloque-0-fundamentos/fast-transtelefonico.png' },
    { nombre: 'flujo-desa-telefono.png', ruta: '/assets/infografias/bloque-0-fundamentos/flujo-desa-telefono.png' },
    { nombre: 'flujo-rcp-transtelefonica.png', ruta: '/assets/infografias/bloque-0-fundamentos/flujo-rcp-transtelefonica.png' },
    { nombre: 'guia-colocacion-dispositivos-oxigenoterapia.png', ruta: '/assets/infografias/bloque-0-fundamentos/guia-colocacion-dispositivos-oxigenoterapia.png' },
    { nombre: 'RESUMEN VISUAL DEL ALGORITMO START.svg', ruta: '/assets/infografias/bloque-0-fundamentos/RESUMEN VISUAL DEL ALGORITMO START.svg' },
    { nombre: 'tabla-rangos-fio2-oxigenoterapia.png', ruta: '/assets/infografias/bloque-0-fundamentos/tabla-rangos-fio2-oxigenoterapia.png' },
    { nombre: 'tabla-rangos-fio2-oxigenoterapia1.png', ruta: '/assets/infografias/bloque-0-fundamentos/tabla-rangos-fio2-oxigenoterapia1.png' },
  ],
  'bloque-2-inmovilizacion': [
    { nombre: 'colocacion-colchon-vacio-paso-a-paso.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/colocacion-colchon-vacio-paso-a-paso.png' },
    { nombre: 'colocacion-collarin-paso-1-preparacion.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-1-preparacion.png' },
    { nombre: 'colocacion-collarin-paso-2-parte-posterior.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-2-parte-posterior.png' },
    { nombre: 'colocacion-collarin-paso-3-parte-anterior.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-3-parte-anterior.png' },
    { nombre: 'colocacion-collarin-paso-4-ajuste-cierres.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-4-ajuste-cierres.png' },
    { nombre: 'colocacion-collarin-paso-5-verificacion.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-5-verificacion.png' },
    { nombre: 'colocacion-collarin-paso-6-liberacion-controlada.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/colocacion-collarin-paso-6-liberacion-controlada.png' },
    { nombre: 'componentes-camilla-cuchara.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/componentes-camilla-cuchara.png' },
    { nombre: 'componentes-colchon-vacio.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/componentes-colchon-vacio.png' },
    { nombre: 'componentes-sistema-inmovilizacion.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/componentes-sistema-inmovilizacion.png' },
    { nombre: 'componentes-sistema-inmovilizacion-1.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/componentes-sistema-inmovilizacion 1.png' },
    { nombre: 'componentes-tablero-espinal.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/componentes-tablero-espinal.png' },
    { nombre: 'coordinacion-equipo-inmovilizacion.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/coordinacion-equipo-inmovilizacion.png' },
    { nombre: 'errores-frecuentes-collarin-cervical.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/errores-frecuentes-collarin-cervical.png' },
    { nombre: 'posicion-tes-inmovilizacion-manual.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/posicion-tes-inmovilizacion-manual.png' },
    { nombre: 'posicion-tes-inmovilizacion-manual-1.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/posicion-tes-inmovilizacion-manual 1.png' },
    { nombre: 'secuencia-transicion-inmovilizacion.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/secuencia-transicion-inmovilizacion.png' },
    { nombre: 'seleccion-talla-collarin-2.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin 2.png' },
    { nombre: 'seleccion-talla-collarin-cervical.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical.png' },
    { nombre: 'seleccion-talla-collarin-cervical1.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-cervical1.png' },
    { nombre: 'seleccion-talla-collarin-error-demasiado-grande.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-error-demasiado-grande.png' },
    { nombre: 'seleccion-talla-collarin-medicion-anatomica.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-medicion-anatomica.png' },
    { nombre: 'seleccion-talla-collarin-tabla-tallas.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/seleccion-talla-collarin-tabla-tallas.png' },
    { nombre: 'situaciones-que-requieren-inmovilizacion.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/situaciones-que-requieren-inmovilizacion.png' },
    { nombre: 'tecnica-sujecion-manual-1.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/tecnica-sujecion-manual 1.png' },
    { nombre: 'tecnica-sujecion-manual-cervical.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/tecnica-sujecion-manual-cervical.png' },
    { nombre: 'verificaciones-post-colocacion-collarin.png', ruta: '/assets/infografias/bloque-2-inmovilizacion/verificaciones-post-colocacion-collarin.png' },
  ],
  'bloque-3-material-sanitario': [
    { nombre: 'canulas-guedel-nasofaringea.png', ruta: '/assets/infografias/bloque-3-material-sanitario/canulas-guedel-nasofaringea.png' },
    { nombre: 'configuracion-maxima-fio2-bolsa-mascarilla.png', ruta: '/assets/infografias/bloque-3-material-sanitario/configuracion-maxima-fio2-bolsa-mascarilla.png' },
    { nombre: 'dispositivos-supragloticos-guia.png', ruta: '/assets/infografias/bloque-3-material-sanitario/dispositivos-supragloticos-guia.png' },
    { nombre: 'interpretacion-constantes-semaforo.png', ruta: '/assets/infografias/bloque-3-material-sanitario/interpretacion-constantes-semaforo.png' },
    { nombre: 'registro-constantes-vitales.png', ruta: '/assets/infografias/bloque-3-material-sanitario/registro-constantes-vitales.png' },
    { nombre: 'uso-correcto-ambu.png', ruta: '/assets/infografias/bloque-3-material-sanitario/uso-correcto-ambu.png' },
    { nombre: 'uso-correcto-pulsioximetro.png', ruta: '/assets/infografias/bloque-3-material-sanitario/uso-correcto-pulsioximetro.png' },
    { nombre: 'uso-correcto-tensiometro.png', ruta: '/assets/infografias/bloque-3-material-sanitario/uso-correcto-tensiometro.png' },
    { nombre: 'ventilacion-medios-fortuna.png', ruta: '/assets/infografias/bloque-3-material-sanitario/ventilacion-medios-fortuna.png' },
  ],
  'bloque-7-conduccion': [
    { nombre: 'configuracion-gps-antes-de-salir.png', ruta: '/assets/infografias/bloque-7-conduccion/configuracion-gps-antes-de-salir.png' },
  ],
  'bloque-12-marco-legal': [
    { nombre: 'diagrama-decisiones-eticas-urgencias.png', ruta: '/assets/infografias/bloque-12-marco-legal/diagrama-decisiones-eticas-urgencias.png' },
    { nombre: 'diagrama-decisiones-eticas.png', ruta: '/assets/infografias/bloque-12-marco-legal/diagrama-decisiones-eticas.png' },
  ],
};

const nombresBloques: Record<string, string> = {
  'bloque-0-fundamentos': 'Fundamentos',
  'bloque-2-inmovilizacion': 'Inmovilización',
  'bloque-3-material-sanitario': 'Material Sanitario',
  'bloque-7-conduccion': 'Conducción',
  'bloque-12-marco-legal': 'Marco Legal',
};

const GaleriaImagenes = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);
  const [bloqueActivo, setBloqueActivo] = useState<string | null>(null);

  const handleImagenClick = (ruta: string) => {
    setImagenSeleccionada(ruta);
  };

  const handleDescargar = (ruta: string, nombre: string) => {
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombre;
    link.click();
  };

  const totalImagenes = Object.values(imagenesPorBloque).reduce((acc, imagenes) => acc + imagenes.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton to="/manual" label="Volver al manual" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Galería de Infografías</h1>
        <p className="text-muted-foreground">
          {totalImagenes} imágenes organizadas por bloques temáticos
        </p>
      </div>

      {/* Filtro por bloque */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setBloqueActivo(null)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            bloqueActivo === null
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card text-foreground border-border hover:bg-muted'
          }`}
        >
          Todas ({totalImagenes})
        </button>
        {Object.keys(imagenesPorBloque).map((bloque) => (
          <button
            key={bloque}
            onClick={() => setBloqueActivo(bloque)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              bloqueActivo === bloque
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-foreground border-border hover:bg-muted'
            }`}
          >
            {nombresBloques[bloque]} ({imagenesPorBloque[bloque].length})
          </button>
        ))}
      </div>

      {/* Grid de imágenes */}
      <div className="space-y-8">
        {(bloqueActivo ? [bloqueActivo] : Object.keys(imagenesPorBloque)).map((bloque) => (
          <div key={bloque} className="space-y-4">
            {!bloqueActivo && (
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                {nombresBloques[bloque]}
              </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagenesPorBloque[bloque].map((imagen) => (
                <div
                  key={imagen.ruta}
                  className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer"
                  onClick={() => handleImagenClick(imagen.ruta)}
                >
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <img
                      src={imagen.ruta}
                      alt={imagen.nombre}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex flex-col items-center justify-center p-4 text-center">
                              <svg class="w-12 h-12 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p class="text-xs text-muted-foreground">Error al cargar</p>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                  <div className="p-2 bg-card border-t border-border">
                    <p className="text-xs text-foreground truncate" title={imagen.nombre}>
                      {imagen.nombre.replace(/\.(png|svg|jpg)$/i, '')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de imagen ampliada */}
      {imagenSeleccionada && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setImagenSeleccionada(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setImagenSeleccionada(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const nombre = imagenSeleccionada.split('/').pop() || 'imagen';
                handleDescargar(imagenSeleccionada, nombre);
              }}
              className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Descargar"
            >
              <Download className="w-5 h-5" />
            </button>
            <img
              src={imagenSeleccionada}
              alt="Imagen ampliada"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaImagenes;
