import React from 'react'

export interface SvgProps {
  /** the fragment ID to use in the `<use>` */
  name: string
  /** extra classes to apply to the `<svg>` */
  className?: string
}

export function Svg({ name, className = '' }: SvgProps) {
  return (
    <svg
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
