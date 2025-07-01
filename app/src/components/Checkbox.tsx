import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => (
  <input
    type="checkbox"
    className={clsx('h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded', className)}
    {...props}
  />
);
function clsx(arg0: string, className: string | undefined): string | undefined {
    throw new Error('Function not implemented.');
}

