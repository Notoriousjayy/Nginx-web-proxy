// src/components/Tag.tsx
import React from 'react';

export interface TagProps {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => (
  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{children}</span>
);