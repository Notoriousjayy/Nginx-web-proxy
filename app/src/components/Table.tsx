// src/components/Table.tsx
import React, { ReactNode } from 'react';

export interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>
);
