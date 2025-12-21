import { FileText, Scale, Copyright, ExternalLink, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AvisoLegal = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Aviso Legal</h1>
        <p className="text-muted-foreground text-sm">
          Términos y condiciones de uso de EMERGES TES
        </p>
      </div>

      {/* Introducción */}
      <section className="space-y-3">
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-foreground">
            El presente aviso legal regula el uso de la aplicación web <strong>EMERGES TES</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            Al acceder y utilizar esta aplicación, aceptas los términos y condiciones establecidos en este documento.
          </p>
        </div>
      </section>

      {/* Propiedad intelectual */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Copyright className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Propiedad Intelectual</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground">
            Todos los contenidos de esta aplicación, incluyendo pero no limitado a:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Textos, protocolos y procedimientos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Diseño gráfico e interfaces</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Código fuente y software</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Imágenes e infografías</span>
            </li>
          </ul>
          <p className="text-sm text-foreground mt-2">
            Están protegidos por derechos de autor y pertenecen a sus respectivos propietarios o están bajo licencias que permiten su uso en este contexto.
          </p>
        </div>
      </section>

      {/* Uso permitido */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Uso Permitido</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground mb-2">Se permite:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Uso personal y profesional para fines educativos y de referencia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Consultar protocolos y procedimientos en situaciones de emergencia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Compartir enlaces a la aplicación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Instalar como PWA en dispositivos personales</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Uso prohibido */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-warning" />
          <h2 className="font-semibold text-foreground">Uso Prohibido</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground mb-2">Está prohibido:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Reproducir, copiar o distribuir el contenido sin autorización</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Modificar, adaptar o crear obras derivadas sin permiso</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Usar el contenido con fines comerciales sin autorización</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Realizar ingeniería inversa del código fuente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Eliminar o modificar avisos de copyright o propiedad</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Contenido de terceros */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Contenido de Terceros</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground">
            Esta aplicación puede contener referencias a guías y protocolos de organizaciones como:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>ERC (European Resuscitation Council)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>AHA (American Heart Association)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>SEMES (Sociedad Española de Medicina de Urgencias y Emergencias)</span>
            </li>
          </ul>
          <p className="text-sm text-foreground mt-2">
            Estos contenidos son propiedad de sus respectivos autores y se utilizan como referencia. No se reclama propiedad sobre estos contenidos.
          </p>
        </div>
      </section>

      {/* Limitación de responsabilidad */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Limitación de Responsabilidad</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground">
            <strong>EMERGES TES</strong> se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas.
          </p>
          <p className="text-sm text-muted-foreground">
            No garantizamos:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>La exactitud, completitud o actualidad del contenido</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>Que la aplicación funcione sin interrupciones o errores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>Que el contenido sea adecuado para todos los propósitos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>La corrección de errores o defectos</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Modificaciones */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Modificaciones</h2>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            Nos reservamos el derecho de modificar, actualizar o discontinuar cualquier parte de la aplicación en cualquier momento sin previo aviso. No nos hacemos responsables de las consecuencias derivadas de estas modificaciones.
          </p>
        </div>
      </section>

      {/* Enlaces externos */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Enlaces Externos</h2>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            Esta aplicación puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido de estos sitios y no nos hacemos responsables de su contenido, políticas de privacidad o prácticas.
          </p>
        </div>
      </section>

      {/* Jurisdicción */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Jurisdicción y Ley Aplicable</h2>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            Este aviso legal se rige por la legislación española. Cualquier disputa relacionada con el uso de esta aplicación será sometida a los tribunales competentes de España.
          </p>
        </div>
      </section>

      {/* Enlaces relacionados */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Enlaces Relacionados</h2>
        <div className="space-y-2">
          <Link
            to="/descargo-responsabilidad"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <AlertCircle className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Descargo de Responsabilidad</p>
              <p className="text-sm text-muted-foreground">Aviso sobre el uso médico</p>
            </div>
          </Link>
          <Link
            to="/privacidad"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Política de Privacidad</p>
              <p className="text-sm text-muted-foreground">Protección de datos</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Fecha de actualización */}
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          Última actualización: 19 de diciembre de 2024
        </p>
      </div>
    </div>
  );
};

export default AvisoLegal;
