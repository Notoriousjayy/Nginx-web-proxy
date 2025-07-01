// src/components/TableCell.tsx
import React, { ReactNode } from 'react';

export interface TableCellProps {
  children: ReactNode;
  header?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({ children, header = false }) => {
  const base = 'px-6 py-4 whitespace-nowrap';
  return header ? <th className={`${base} bg-gray-100`}>{children}</th> : <td className={base}>{children}</td>;
};