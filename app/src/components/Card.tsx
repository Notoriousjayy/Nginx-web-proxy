// src/components/Card.tsx
import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white shadow rounded p-4 ${className}`}>{children}</div>
);
