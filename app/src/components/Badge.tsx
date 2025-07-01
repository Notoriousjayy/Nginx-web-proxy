import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children }) => (
  <span className="inline-block px-2 py-0.5 bg-gray-200 text-sm rounded">
    {children}
  </span>
);