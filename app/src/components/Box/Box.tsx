// src/components/Box/Box.tsx
import React, { ReactNode, CSSProperties, JSX } from 'react'

export interface BoxProps {
  /** Which HTML tag to render (defaults to `div`) */
  as?: keyof JSX.IntrinsicElements
  /** Tailwind-style background color class, e.g. "blue-dcf0fb" */
  backgroundColor?: string
  /** Padding in pixels, applied uniformly */
  padding?: number
  /** Any inline styles (e.g. height, width) */
  style?: CSSProperties
  /** Child nodes */
  children?: ReactNode
}

export const Box: React.FC<BoxProps> = ({
  as = 'div',
  backgroundColor,
  padding,
  style,
  children,
}) => {
  const Tag = as as any

  const classList = [
    backgroundColor ? `bg-${backgroundColor}` : '',
    padding !== undefined ? `p-[${padding}px]` : '',
  ].filter(Boolean).join(' ')

  return (
    <Tag className={classList || undefined} style={style}>
      {children}
    </Tag>
  )
}

export default Box
