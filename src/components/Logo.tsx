import React from 'react';
import './Logo.css';

interface LogoProps {
  variant?: 'principal' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  color?: 'original' | 'white' | 'primary';
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'principal', 
  size = 'medium',
  className = '',
  color = 'original'
}) => {
  const logoSrc = variant === 'horizontal' 
    ? '/logos/virtus-logo-horizontal.svg' 
    : '/logos/virtus-logo-principal.svg';

  const sizeClass = `logo-${size}`;
  const colorClass = `logo-${color}`;

  return (
    <div className={`logo-container ${className}`}>
      <img 
        src={logoSrc} 
        alt="Virtus International Awards" 
        className={`logo ${sizeClass} ${colorClass}`}
      />
    </div>
  );
};

// Componente específico para el favicon/icono
export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 32, 
  className = '' 
}) => {
  return (
    <div className={`logo-icon ${className}`}>
      <img 
        src="/favicon.svg" 
        alt="Virtus" 
        style={{ width: size, height: size }}
      />
    </div>
  );
};