import React from 'react';
import { theme } from './theme';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        `px-${theme.spacing.md} py-${theme.spacing.sm} border border-gray-300 focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary} ${theme.radii.sm}`,
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
function clsx(arg0: string, className: string | undefined): string | undefined {
    throw new Error('Function not implemented.');
}

