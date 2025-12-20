import { Info, Heart, Code, ExternalLink, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Acerca = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Acerca de</h1>
        <p className="text-muted-foreground text-sm">
          Información sobre EMERGES TES
        </p>
      </div>

      {/* Descripción */}
      <section className="space-y-3">
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-foreground">
            <strong>EMERGES TES</strong> es una aplicación web de referencia rápida diseñada para 
            Técnicos de Emergencias Sanitarias (TES) y profesionales de emergencias médicas.
          </p>
          <p className="text-sm text-muted-foreground">
            Proporciona acceso estructurado a protocolos, procedimientos, fármacos y guías de 
            actuación en situaciones de emergencia, optimizado para consulta rápida en situaciones críticas.
          </p>
        </div>
      </section>

      {/* Información */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Información</h2>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Versión</p>
            <p className="text-sm font-medium text-foreground">1.0.0</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Tipo</p>
            <p className="text-sm font-medium text-foreground">PWA (Progressive Web App)</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Funciona offline</p>
            <p className="text-sm font-medium text-success">✓ Sí</p>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Características</h2>
        <div className="space-y-2">
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">📋 Protocolos de emergencia</p>
            <p className="text-xs text-muted-foreground">
              RCP, vía aérea, shock, ictus y más
            </p>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">💊 Vademécum de fármacos</p>
            <p className="text-xs text-muted-foreground">
              Dosis, indicaciones y contraindicaciones
            </p>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">🧮 Calculadoras médicas</p>
            <p className="text-xs text-muted-foreground">
              Glasgow, perfusiones, dosis pediátricas
            </p>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">📚 Manual completo</p>
            <p className="text-xs text-muted-foreground">
              Guía completa navegable por partes y bloques
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="space-y-3">
        <div className="p-4 bg-muted border border-border rounded-lg flex items-start gap-3">
          <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-2">
              Aviso importante
            </p>
            <p className="text-sm text-muted-foreground space-y-1">
              <p>
                Esta aplicación es una herramienta de referencia rápida y <strong>no sustituye</strong> la 
                formación reglada del profesional ni el criterio clínico.
              </p>
              <p>
                <strong>No es un sistema de diagnóstico automático</strong> y no debe usarse como 
                única fuente de información en situaciones críticas.
              </p>
            </p>
          </div>
        </div>
      </section>

      {/* Enlaces */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Enlaces</h2>
        <div className="space-y-2">
          <a
            href="https://ko-fi.com/emergestes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <Heart className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Apoya el proyecto</p>
              <p className="text-sm text-muted-foreground">Ko-fi</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </section>

      {/* Créditos */}
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground">Créditos</h2>
        <div className="p-4 bg-card border border-border rounded-lg space-y-2">
          <p className="text-sm text-muted-foreground">
            Desarrollado con ❤️ para la comunidad TES
          </p>
          <p className="text-xs text-muted-foreground">
            Basado en guías oficiales (ERC, AHA, SEMES)
          </p>
        </div>
      </section>
    </div>
  );
};

export default Acerca;
