// src/components/SizePickerPattern/SizePickerPattern.tsx
import React from 'react'

export interface SizePickerPatternProps {
  /** The radio group name/id */
  name: string
  /** List of size values, e.g. ["24x30","30x40"] */
  sizes: string[]
  /** Which size is currently selected */
  selectedSize: string
  /** Called when the user picks a new size */
  onChange: (newSize: string) => void
  /** Whether to visually hide the legend */
  visuallyHiddenLegend?: boolean
}

export function SizePickerPattern({
  name,
  sizes,
  selectedSize,
  onChange,
  visuallyHiddenLegend = false,
}: SizePickerPatternProps) {
  return (
    <fieldset className="padding">
      <legend
        className={`text-lg leading-tight mb-3 ${
          visuallyHiddenLegend ? 'sr-only' : ''
        }`}
      >
        Size
      </legend>

      <div className="flex flex-wrap -mb-4">
        {sizes.map((size) => (
          <label key={size} className="mr-4 mb-4">
            <input
              type="radio"
              name={name}
              value={size}
              checked={selectedSize === size}
              onChange={() => onChange(size)}
              className="absolute appearance-none picker-option:checked-target--border"
            />
            <div className="flex items-center justify-center bg-white border border-black cursor-pointer text-xl leading-none min-w-[3rem] min-h-[3rem] px-1 hover:border-blue-00bff3 hover:border-2">
              {size}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
