// src/components/ProgressBar.tsx
import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100 }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-blue-600 h-2 rounded-full"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);