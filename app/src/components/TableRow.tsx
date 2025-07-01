// src/components/TableRow.tsx
import React, { ReactNode } from 'react';

export interface TableRowProps {
  children: ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ children }) => (
  <tr className="hover:bg-gray-50">{children}</tr>
);