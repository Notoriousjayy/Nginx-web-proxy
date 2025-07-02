// src/components/BorderedPanel/BorderedPanel.tsx
import React, { JSX, ReactNode } from 'react'

export interface BorderedPanelProps {
  /** Which HTML tag to render (defaults to `div`) */
  as?: keyof JSX.IntrinsicElements
  /** Tailwind-style border color class, e.g. "blue-00bff3" */
  borderColor: string
  /** Tailwind-style background color class, e.g. "olive-9aa665" */
  backgroundColor: string
  /** Child nodes to render inside the panel */
  children?: ReactNode
}

export const BorderedPanel: React.FC<BorderedPanelProps> = ({
  as = 'div',
  borderColor,
  backgroundColor,
  children,
}) => {
  const Tag = as as any

  // We’re using utility classes to reproduce:
  // border-style: solid; border-width: 8px;
  // width: 100%; max-width: 800px; margin: 0 auto;
  // padding: 32px; at min-width 800px padding-horizontal: 64px
  const className = [
    `border-solid`,
    `border-[8px]`,
    `w-full`,
    `max-w-[800px]`,
    `mx-auto`,
    `p-[32px]`,
    `@mq-800--px-[64px]`,
    `border-${borderColor}`,
    backgroundColor,
  ].join(' ')

  return <Tag className={className}>{children}</Tag>
}

export default BorderedPanel
