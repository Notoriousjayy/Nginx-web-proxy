// src/components/Breadcrumb.tsx
import React from 'react';

export interface BreadcrumbProps {
  items: { label: string; to: string }[];
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => (
  <nav aria-label="breadcrumb">
    <ol className="flex space-x-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-center space-x-1">
          <a href={item.to} className="text-blue-600 hover:underline">
            {item.label}
          </a>
          {i < items.length - 1 && <span>{separator}</span>}
        </li>
      ))}
    </ol>
  </nav>
);