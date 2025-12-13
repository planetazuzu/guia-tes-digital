import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'critical' | 'high' | 'medium';

interface EmergencyButtonProps {
  to: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  variant?: ButtonVariant;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  critical: 'btn-emergency-critical',
  high: 'btn-emergency-high',
  medium: 'btn-emergency-medium',
};

const EmergencyButton = ({
  to,
  icon: Icon,
  title,
  subtitle,
  variant = 'critical',
  className,
}: EmergencyButtonProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'btn-emergency flex flex-col items-center justify-center gap-1 p-4',
        variantClasses[variant],
        className
      )}
    >
      <Icon className="w-8 h-8" />
      <span className="text-sm font-semibold text-center leading-tight">{title}</span>
      {subtitle && (
        <span className="text-2xs opacity-80 text-center">{subtitle}</span>
      )}
    </Link>
  );
};

export default EmergencyButton;
