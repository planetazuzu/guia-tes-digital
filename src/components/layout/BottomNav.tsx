import { NavLink } from 'react-router-dom';
import { Home, AlertTriangle, Stethoscope, Video, Pill, Wrench } from 'lucide-react';

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
  { path: '/soporte-vital', icon: <AlertTriangle className="w-5 h-5" />, label: 'Soporte' },
  { path: '/patologias', icon: <Stethoscope className="w-5 h-5" />, label: 'Patologías' },
  { path: '/escena', icon: <Video className="w-5 h-5" />, label: 'Escena' },
  { path: '/farmacos', icon: <Pill className="w-5 h-5" />, label: 'Fármacos' },
  { path: '/herramientas', icon: <Wrench className="w-5 h-5" />, label: 'Herram.' },
];

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `bottom-nav-item flex-1 ${isActive ? 'active' : ''}`
            }
          >
            {item.icon}
            <span className="text-2xs mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
