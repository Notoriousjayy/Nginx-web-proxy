// src/components/SizePicker.tsx
import React from 'react';

export interface SizePickerProps {
  availableSizes: string[];
  selectedSize: string;
  onChange: (size: string) => void;
}

const SizePicker: React.FC<SizePickerProps> = ({
  availableSizes,
  selectedSize,
  onChange,
}) => (
  <div className="flex space-x-2">
    {availableSizes.map((size) => (
      <button
        key={size}
        type="button"
        onClick={() => onChange(size)}
        className={clsx(
          'px-2 py-1 border rounded',
          size === selectedSize
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-800'
        )}
      >
        {size}
      </button>
    ))}
  </div>
);

export default SizePicker;
function clsx(arg0: string, arg1: string): string | undefined {
    throw new Error('Function not implemented.');
}

