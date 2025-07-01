// src/components/Flex.tsx
import React, { ReactNode } from 'react';

export interface FlexProps {
  children: ReactNode;
  className?: string;
  justify?: 'start' | 'center' | 'end' | 'between';
  align?: 'start' | 'center' | 'end';
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className = '',
  justify = 'start',
  align = 'center',
}) => (
  <div className={`flex justify-${justify} items-${align} ${className}`}>{children}</div>
);
