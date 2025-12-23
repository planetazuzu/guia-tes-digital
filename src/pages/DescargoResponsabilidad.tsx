import { AlertTriangle, Shield, FileWarning, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DescargoResponsabilidad = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Descargo de Responsabilidad</h1>
        <p className="text-muted-foreground text-sm">
          Aviso importante sobre el uso de esta aplicación
        </p>
      </div>

      {/* Aviso crítico */}
      <section className="space-y-3">
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-900 dark:text-red-100 mb-2">
                AVISO CRÍTICO - LEA ANTES DE USAR
              </p>
              <p className="text-sm text-red-800 dark:text-red-200">
                Esta aplicación es una <strong>herramienta de referencia</strong> y <strong>NO sustituye</strong> la formación reglada, el criterio clínico profesional ni los protocolos oficiales de tu institución.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No es un sistema de diagnóstico */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-warning" />
          <h2 className="font-semibold text-foreground">No es un Sistema de Diagnóstico</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground">
            <strong>EMERGES TES</strong> NO es:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Un sistema de diagnóstico automático</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Un sustituto de la formación profesional</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Una herramienta de toma de decisiones clínicas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">✗</span>
              <span>Una fuente única de información en situaciones críticas</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Responsabilidad del profesional */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Responsabilidad del Profesional</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-3">
          <p className="text-sm text-foreground">
            El profesional que utiliza esta aplicación mantiene la <strong>responsabilidad completa</strong> de sus actuaciones:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Decisión clínica:</strong> Todas las decisiones deben basarse en el criterio profesional, formación y protocolos oficiales.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Validación:</strong> La información debe ser validada con protocolos oficiales de tu institución antes de su aplicación.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Formación continua:</strong> Esta herramienta no sustituye la formación continua y actualización profesional.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Contexto:</strong> Cada situación es única y requiere evaluación individualizada.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Limitaciones */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-warning" />
          <h2 className="font-semibold text-foreground">Limitaciones</h2>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground mb-2">Esta aplicación tiene las siguientes limitaciones:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>El contenido puede no estar actualizado con las últimas guías clínicas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>No incluye todas las situaciones posibles ni excepciones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>No considera el contexto específico de cada paciente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>Puede contener errores u omisiones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>No sustituye la consulta con supervisores o médicos</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Uso adecuado */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Uso Adecuado</h2>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground mb-2">Esta aplicación está diseñada para:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Consulta rápida de protocolos y procedimientos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Referencia de dosis y fármacos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Apoyo a la memoria en situaciones de estrés</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Herramienta de formación y repaso</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Exención de responsabilidad */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Exención de Responsabilidad</h2>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground">
            Los desarrolladores, colaboradores y cualquier entidad relacionada con <strong>EMERGES TES</strong>:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>No se hacen responsables de las decisiones clínicas tomadas basándose en esta aplicación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>No garantizan la exactitud, completitud o actualidad del contenido</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>No asumen responsabilidad por daños derivados del uso o mal uso de esta aplicación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              <span>No se responsabilizan de actualizaciones o cambios en protocolos oficiales</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Recomendaciones</h2>
        <div className="p-4 bg-muted border border-border rounded-lg space-y-2">
          <p className="text-sm text-foreground mb-2">Antes de usar esta aplicación en situaciones reales:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-info">→</span>
              <span>Valida el contenido con protocolos oficiales de tu institución</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">→</span>
              <span>Consulta con supervisores o médicos cuando sea necesario</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">→</span>
              <span>Mantén tu formación actualizada</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">→</span>
              <span>Usa esta herramienta como apoyo, no como única fuente</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Enlaces relacionados */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Enlaces Relacionados</h2>
        <div className="space-y-2">
          <Link
            to="/aviso-legal"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <FileWarning className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Aviso Legal</p>
              <p className="text-sm text-muted-foreground">Términos y condiciones de uso</p>
            </div>
          </Link>
          <Link
            to="/acerca"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <Shield className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Acerca de</p>
              <p className="text-sm text-muted-foreground">Información sobre la aplicación</p>
            </div>
          </Link>
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

export default DescargoResponsabilidad;
