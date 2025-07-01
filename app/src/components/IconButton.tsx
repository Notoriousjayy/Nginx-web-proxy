// src/components/IconButton.tsx
import React from 'react';
import Icon from './Icon';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** name of the icon in your sprite (filename without “.svg”) */
  icon: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className, ...props }) => (
  <button
    className={clsx('p-2 rounded-md hover:bg-gray-200 focus:outline-none', className)}
    {...props}
  >
    <Icon name={icon} size={24} className="inline-block" />
  </button>
);

export default IconButton;
function clsx(arg0: string, className: string | undefined): string | undefined {
    throw new Error('Function not implemented.');
}

