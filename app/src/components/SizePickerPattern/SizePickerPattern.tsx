import React from 'react'

export interface SizePickerPatternProps {
  name: string
  sizes: Record<string, string>
  visuallyHiddenLegend?: boolean
}

export function SizePickerPattern({
  name,
  sizes,
  visuallyHiddenLegend = false,
}: SizePickerPatternProps) {
  return (
    <div className="padding">
      <fieldset>
        <legend
          className={`text-lg leading-tight mb-3 ${
            visuallyHiddenLegend ? 'sr-only' : ''
          }`}
        >
          Size
        </legend>

        <div className="flex flex-wrap -mb-4">
          {Object.entries(sizes).map(([value, label]) => (
            <label key={value} className="mr-4 mb-4">
              <input
                type="radio"
                name={name}
                value={value}
                className="absolute appearance-none picker-option:checked-target--border"
              />

              <div className="flex items-center justify-center bg-white border border-black cursor-pointer text-xl leading-none min-w-[3rem] min-h-[3rem] px-1 hover:border-blue-00bff3 hover:border-2">
                {label}
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
