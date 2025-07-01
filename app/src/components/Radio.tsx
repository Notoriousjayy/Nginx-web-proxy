import React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Radio: React.FC<RadioProps> = ({ className, ...props }) => (
  <input
    type="radio"
    className={clsx('h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300', className)}
    {...props}
  />
);
function clsx(arg0: string, className: string | undefined): string | undefined {
    throw new Error('Function not implemented.');
}

