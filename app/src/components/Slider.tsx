// src/components/Slider.tsx
import React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Slider: React.FC<SliderProps> = (props) => (
  <input type="range" className="w-full h-2 bg-gray-200 rounded" {...props} />
);
