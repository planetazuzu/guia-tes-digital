import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Heart,
  Brain,
  Zap,
  Wind,
  Clock,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import EmergencyButton from '@/components/shared/EmergencyButton';

const recentSearches = [
  { id: 'rcp-adulto-svb', title: 'RCP Adulto SVB', type: 'procedure' },
  { id: 'adrenalina', title: 'Adrenalina', type: 'drug' },
  { id: 'shock-hemorragico', title: 'Shock Hemorrágico', type: 'procedure' },
];

const quickAccess = [
  { label: 'OVACE', path: '/via-aerea' },
  { label: 'Glasgow', path: '/herramientas' },
  { label: 'Triage', path: '/escena' },
  { label: 'Código Ictus', path: '/ictus' },
  { label: 'Dopamina', path: '/herramientas' },
  { label: 'Politrauma', path: '/soporte-vital' },
];

interface HomeProps {
  onSearchClick: () => void;
}

const Home = ({ onSearchClick }: HomeProps) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <button
        onClick={onSearchClick}
        className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
      >
        <Search className="w-6 h-6 text-muted-foreground" />
        <span className="text-muted-foreground">
          Buscar protocolo, fármaco, calculadora...
        </span>
      </button>

      {/* Emergency Buttons Grid */}
      <section>
        <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide mb-3">
          Emergencias Críticas
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <EmergencyButton
            to="/rcp"
            icon={Heart}
            title="RCP / Parada"
            subtitle="Adulto y Pediátrico"
            variant="critical"
          />
          <EmergencyButton
            to="/ictus"
            icon={Brain}
            title="Código Ictus"
            variant="high"
          />
          <EmergencyButton
            to="/shock"
            icon={Zap}
            title="Shock"
            subtitle="Hemorrágico"
            variant="medium"
          />
          <EmergencyButton
            to="/via-aerea"
            icon={Wind}
            title="Vía Aérea"
            subtitle="OVACE / IOT"
            variant="critical"
          />
        </div>
      </section>

      {/* Quick Access Chips */}
      <section>
        <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide mb-3">
          Accesos Rápidos
        </h2>
        <div className="flex flex-wrap gap-2">
          {quickAccess.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-full text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Searches */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
            Últimas Consultas
          </h2>
          <Clock className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          {recentSearches.map((item) => (
            <Link
              key={item.id}
              to={
                item.type === 'procedure'
                  ? `/soporte-vital?id=${item.id}`
                  : `/farmacos?id=${item.id}`
              }
              className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <span className="text-foreground">{item.title}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Floating Emergency Button */}
      <Link
        to="/rcp"
        className="fixed bottom-24 right-4 z-40 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse-ring"
        aria-label="Emergencia - RCP"
      >
        <AlertTriangle className="w-8 h-8 text-primary-foreground" />
      </Link>
    </div>
  );
};

export default Home;
