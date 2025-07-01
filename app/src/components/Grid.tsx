// src/components/Grid.tsx
import React, { ReactNode } from 'react';

export interface GridProps {
  children: ReactNode;
  cols?: number;
  gap?: number;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 2,
  gap = 4,
  className = ''
}) => (
  <div className={`grid grid-cols-${cols} gap-${gap} ${className}`}>{children}</div>
);