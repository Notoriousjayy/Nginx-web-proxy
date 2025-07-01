import React from 'react'

const groups: Record<string, string[]> = {
  neutral: [
    'neutral-ffffff',
    'neutral-f2f2f2',
    'neutral-c4c4c4A76',
    'neutral-c4c4c4',
    'neutral-979797',
    'neutral-000000A40',
    'neutral-4c5b5c',
    'neutral-3a3a3d',
    'neutral-222224',
    'neutral-000000',
  ],
  blue: [
    'blue-00bff3A20',
    'blue-dcf0fb',
    'blue-c5e6f9',
    'blue-00bff3A47',
    'blue-87d3f5',
    'blue-00bff3',
    'blue-265f8e',
    'blue-324f6b',
  ],
  green: ['green-459482'],
  orange: ['orange-ff9888A25', 'orange-ff9888', 'orange-ff583d'],
  purple: ['purple-c49bf9', 'purple-705592'],
  red: ['red-d02619'],
  yellow: ['yellow-f0e8c1', 'yellow-f1e6b8', 'yellow-f0cc20', 'yellow-f0c808'],
}

export function Swatches() {
  return (
    <div className="padding">
      {Object.entries(groups).map(([group, colors]) => (
        <React.Fragment key={group}>
          <h3 className="swatch-title">{group}</h3>
          <ul className="swatch-list">
            {colors.map((color) => (
              <li
                key={color}
                className={`swatch background-color:${color}`}
              />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  )
}
