// src/components/Button/Button.tsx
import React from 'react'

export interface ButtonProps {
  /** If provided, renders an <a> tag instead of <button> */
  href?: string
  /** Text label of the button */
  label: string
  /** target attribute for links (e.g. "_blank") */
  target?: React.HTMLAttributeAnchorTarget
  /** button style variant; currently only "primary" is supported */
  type?: 'primary'
  /** click handler for native button */
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export const Button: React.FC<ButtonProps> = ({
  href,
  label,
  target,
  type = 'primary',
  onClick,
}) => {
  const baseClasses = [
    'inline-block',
    'text-[18px]',
    'font-bold',
    'leading-[1]',
    'px-[24px]',
    'py-[12px]',
    'transition',
  ]

  // Variant classes
  const variantClasses =
    type === 'primary'
      ? [
          'bg-orange-ff583d',
          'text-neutral-222224',
          'hover:bg-yellow-f0c808',
        ]
      : []

  const className = [...baseClasses, ...variantClasses].join(' ')

  if (href) {
    // For links, add rel if opening in new tab
    const rel = target === '_blank' ? 'noopener noreferrer' : undefined
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {label}
      </a>
    )
  }

  // Otherwise render a button
  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  )
}

export default Button
