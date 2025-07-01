// src/components/Alert.tsx
import React, { ReactNode } from 'react';

export interface AlertProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', children }) => {
  const base = 'px-4 py-2 rounded';
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error:   'bg-red-100 text-red-800',
    info:    'bg-blue-100 text-blue-800',
  };

  return <div className={`${base} ${variants[variant]}`}>{children}</div>;
};