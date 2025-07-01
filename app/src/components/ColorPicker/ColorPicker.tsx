import React from 'react'

export interface ColorPickerProps {
  colors: string[]          // list of color values, e.g. ["black","gray","white"]
  name: string              // name for the radio input group
  variant?: 'small' | 'medium' | 'large'
  visuallyHiddenLegend?: boolean
  onChange?: (color: string) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  name,
  variant = 'small',
  visuallyHiddenLegend = true,
  onChange = () => {},
}) => {
  // map variant to px
  const sizeMap = {
    small: { width: 42, height: 24, borderWidth: 1 },
    medium: { width: 56, height: 32, borderWidth: 1 },
    large: { width: 80, height: 48, borderWidth: 2 },
  }[variant]

  return (
    <fieldset className="padding">
      <legend
        className={`font-20px line-height:1.2 margin-bottom:12px ${
          visuallyHiddenLegend ? 'visually-hidden' : ''
        }`}
      >
        Color
      </legend>

      <div className="flex">
        {colors.map((color) => (
          <label key={color} className="margin-right:12px position:relative">
            <span className="visually-hidden">{color}</span>
            <input
              type="radio"
              name={name}
              value={color}
              className="appearance:none border-width:0 picker-option:checked-target--border position:absolute"
              onChange={() => onChange(color)}
            />
            <div
              className={`
                border-style:solid
                cursor:pointer
                :hocus--border-color:blue-00bff3
                :hocus--border-width:2px
              `}
              style={{
                backgroundColor: color.startsWith('#')
                  ? color
                  : `var(--neutral-${color})`,
                borderColor:
                  color === 'white' ? 'var(--neutral-000000)' : undefined,
                width: `${sizeMap.width}px`,
                height: `${sizeMap.height}px`,
                borderWidth: `${sizeMap.borderWidth}px`,
              }}
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default ColorPicker
