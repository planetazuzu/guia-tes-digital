import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, AlertTriangle, Clock, Users, Baby } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import { getProcedureById } from '@/data/procedures';

const RCP = () => {
  const [activeTab, setActiveTab] = useState<'adulto' | 'pediatrico'>('adulto');

  const rcpAdulto = getProcedureById('rcp-adulto-svb');
  const rcpAdultoSVA = getProcedureById('rcp-adulto-sva');
  const rcpPediatrico = getProcedureById('rcp-pediatrico');

  return (
    <div className="space-y-6">
      <BackButton to="/" label="Volver al inicio" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Heart className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">RCP / Parada Cardiorrespiratoria</h1>
            <p className="text-muted-foreground">Protocolo de Reanimación Cardiopulmonar</p>
          </div>
        </div>

        {/* Tabs Adulto/Pediátrico */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('adulto')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'adulto'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Adulto</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('pediatrico')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'pediatrico'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Baby className="w-4 h-4" />
              <span>Pediátrico</span>
            </div>
          </button>
        </div>
      </div>

      {/* Contenido Adulto */}
      {activeTab === 'adulto' && (
        <div className="space-y-6">
          {/* SVB */}
          {rcpAdulto && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Soporte Vital Básico (SVB)</h2>
                <span className="px-3 py-1 bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                  Crítico
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    Pasos del Protocolo
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    {rcpAdulto.steps.map((step, index) => (
                      <li key={index} className="text-foreground pl-2">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {rcpAdulto.warnings && rcpAdulto.warnings.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      Advertencias Importantes
                    </h3>
                    <ul className="space-y-1">
                      {rcpAdulto.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rcpAdulto.keyPoints && rcpAdulto.keyPoints.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Puntos Clave</h3>
                    <ul className="space-y-1">
                      {rcpAdulto.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rcpAdulto.equipment && rcpAdulto.equipment.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Material Necesario</h3>
                    <div className="flex flex-wrap gap-2">
                      {rcpAdulto.equipment.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-muted rounded-full text-sm text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SVA */}
          {rcpAdultoSVA && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Soporte Vital Avanzado (SVA)</h2>
                <span className="px-3 py-1 bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                  Crítico
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pasos del Protocolo</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    {rcpAdultoSVA.steps.map((step, index) => (
                      <li key={index} className="text-foreground pl-2">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {rcpAdultoSVA.warnings && rcpAdultoSVA.warnings.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Advertencias</h3>
                    <ul className="space-y-1">
                      {rcpAdultoSVA.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rcpAdultoSVA.keyPoints && rcpAdultoSVA.keyPoints.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Puntos Clave</h3>
                    <ul className="space-y-1">
                      {rcpAdultoSVA.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enlaces relacionados */}
          <div className="bg-muted/50 border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-3">Protocolos Relacionados</h3>
            <div className="space-y-2">
              <Link
                to="/via-aerea"
                className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-foreground">Vía Aérea / OVACE</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
              <Link
                to="/soporte-vital"
                className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-foreground">Ver todos los protocolos de Soporte Vital</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Pediátrico */}
      {activeTab === 'pediatrico' && rcpPediatrico && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">RCP Pediátrico</h2>
              <span className="px-3 py-1 bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                Crítico
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Pasos del Protocolo
                </h3>
                <ol className="space-y-2 list-decimal list-inside">
                  {rcpPediatrico.steps.map((step, index) => (
                    <li key={index} className="text-foreground pl-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {rcpPediatrico.warnings && rcpPediatrico.warnings.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Advertencias Importantes</h3>
                  <ul className="space-y-1">
                    {rcpPediatrico.warnings.map((warning, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rcpPediatrico.keyPoints && rcpPediatrico.keyPoints.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Puntos Clave</h3>
                  <ul className="space-y-1">
                    {rcpPediatrico.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Enlaces relacionados */}
          <div className="bg-muted/50 border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-3">Protocolos Relacionados</h3>
            <div className="space-y-2">
              <Link
                to="/via-aerea"
                className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-foreground">OVACE Pediátrico</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RCP;
