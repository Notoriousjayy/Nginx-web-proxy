// src/components/List.tsx
import React, { ReactNode } from 'react';

export interface ListProps {
  children: ReactNode;
  className?: string;
}

export const List: React.FC<ListProps> = ({ children, className = '' }) => (
  <ul className={`list-disc pl-5 space-y-1 ${className}`}>{children}</ul>
);