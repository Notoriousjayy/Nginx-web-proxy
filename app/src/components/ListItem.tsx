// src/components/ListItem.tsx
import React, { ReactNode } from 'react';

export interface ListItemProps {
  children: ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ children }) => (
  <li className="mb-2">{children}</li>
);

export default ListItem;
