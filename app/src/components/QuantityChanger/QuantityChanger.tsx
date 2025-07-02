import React from 'react'
import Icon from '../Icon'

export interface QuantityChangerProps {
  /** The input name/id */
  name: string
  /** Current quantity value */
  value: number
  /** Minimum allowed value (default 1) */
  min?: number
  /** Called when the user changes the value */
  onChange: (newValue: number) => void
}

export function QuantityChanger({
  name,
  value,
  min = 1,
  onChange,
}: QuantityChangerProps) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
  }

  const handleIncrease = () => {
    onChange(value + 1)
  }

  return (
    <div className="p-2">
      <div className="flex items-center">
        <label htmlFor={name} className="sr-only">
          Quantity
        </label>
        <button
          type="button"
          onClick={handleDecrease}
          aria-label="Decrease quantity"
          aria-controls={name}
          disabled={value <= min}
          className={`group order-0 p-4 border border-blue-600 bg-blue-200 text-blue-800 hover:text-orange-600 disabled:opacity-20`}
        >
          <Icon name="minus" size={18} />
        </button>
        <input
          id={name}
          name={name}
          type="number"
          min={min}
          value={value}
          onChange={(e) => {
            const v = parseInt(e.currentTarget.value, 10) || min
            onChange(v < min ? min : v)
          }}
          className="order-1 w-16 text-center text-2xl font-semibold text-gray-800 border-y border-gray-600"
        />
        <button
          type="button"
          onClick={handleIncrease}
          aria-label="Increase quantity"
          aria-controls={name}
          className="group order-2 p-4 border border-blue-600 bg-blue-200 text-blue-800 hover:text-orange-600"
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
  )
}
