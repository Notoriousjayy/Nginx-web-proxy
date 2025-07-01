import React from 'react';
import { theme } from './theme';

export interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(
        `px-${theme.spacing.md} py-${theme.spacing.sm} border rounded-md focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary}`,
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Dropdown.displayName = 'Dropdown';
function clsx(arg0: string, className: string | undefined): string | undefined {
    throw new Error('Function not implemented.');
}

