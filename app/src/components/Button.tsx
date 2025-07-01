import React from 'react';
import { theme } from './theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const base = `px-${theme.spacing.md} py-${theme.spacing.sm} font-medium ${theme.radii.md} `;
  const variants = {
    primary: `bg-${theme.colors.primary} text-white hover:bg-${theme.colors.primaryHover}`,
    secondary: `bg-${theme.colors.secondary} text-${theme.colors.text} hover:bg-${theme.colors.secondaryHover}`,
    danger: `bg-${theme.colors.danger} text-white hover:bg-${theme.colors.dangerHover}`,
  };

    function clsx(base: string, arg1: string, className: string | undefined): string | undefined {
        throw new Error('Function not implemented.');
    }

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
