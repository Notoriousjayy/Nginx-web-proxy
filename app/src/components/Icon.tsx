import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
}

export function Icon({ name, ...rest }: IconProps) {
  return (
    <svg {...rest}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}
