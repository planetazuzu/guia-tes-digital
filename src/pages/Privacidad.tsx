import { Shield, Lock, Eye, Database, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacidad = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Política de Privacidad</h1>
        <p className="text-muted-foreground text-sm">
          Información sobre cómo protegemos tus datos
        </p>
      </div>

      {/* Introducción */}
      <section className="space-y-3">
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-foreground">
            <strong>EMERGES TES</strong> respeta tu privacidad y se compromete a proteger tus datos personales.
          </p>
          <p className="text-sm text-muted-foreground">
            Esta política explica cómo recopilamos, usamos y protegemos tu información cuando utilizas nuestra aplicación.
          </p>
        </div>
      </section>

      {/* Datos que recopilamos */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Datos que Recopilamos</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Datos almacenados localmente:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Favoritos:</strong> Almacenados en localStorage de tu dispositivo. Solo tú tienes acceso.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Historial de búsquedas:</strong> Almacenado en sessionStorage. Se elimina al cerrar el navegador.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Preferencias de tema:</strong> Almacenadas localmente para recordar tu elección.</span>
              </li>
            </ul>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-foreground">
              <strong>No recopilamos:</strong> Datos personales identificables, información de ubicación, datos de uso analíticos, ni información de terceros.
            </p>
          </div>
        </div>
      </section>

      {/* Uso de datos */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Uso de los Datos</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground">
            Los datos almacenados localmente se utilizan únicamente para:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Mejorar tu experiencia de usuario (favoritos, historial)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Recordar tus preferencias (tema claro/oscuro)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Funcionamiento offline de la aplicación</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Almacenamiento */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Almacenamiento y Seguridad</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground">
            <strong>Todos los datos se almacenan localmente en tu dispositivo.</strong>
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>No se envían datos a servidores externos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>No hay base de datos en la nube</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Los datos solo existen en tu navegador</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Puedes eliminar todos los datos desde Ajustes → Limpiar datos locales</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Cookies y tecnologías similares */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Cookies y Tecnologías Similares</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-foreground">
            Esta aplicación utiliza <strong>localStorage</strong> y <strong>sessionStorage</strong> del navegador para almacenar datos localmente. No utilizamos cookies de seguimiento ni tecnologías de terceros para recopilar información.
          </p>
        </div>
      </section>

      {/* Tus derechos */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Tus Derechos</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground mb-2">Tienes derecho a:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Acceder a tus datos almacenados localmente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Eliminar tus datos en cualquier momento desde Ajustes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Desinstalar la aplicación, lo que eliminará todos los datos locales</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Cambios en la política */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Cambios en esta Política</h2>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            Podemos actualizar esta política de privacidad ocasionalmente. La fecha de la última actualización se indicará al final de este documento. Te recomendamos revisar esta política periódicamente.
          </p>
        </div>
      </section>

      {/* Contacto */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Contacto</h2>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de la página <Link to="/acerca" className="text-primary hover:underline">Acerca de</Link>.
          </p>
        </div>
      </section>

      {/* Fecha de actualización */}
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          Última actualización: 23 de diciembre de 2025
        </p>
      </div>
    </div>
  );
};

export default Privacidad;
