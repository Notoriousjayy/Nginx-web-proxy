// src/components/IconButton.tsx
import React from 'react';
import Icon from '../Icon';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {  // ← extend native button props
  /** The name of the icon (i.e. the `<use xlink:href>` fragment) */
  iconName: string
  /** Optional badge count to display */
  badge?: number
  /** Any extra classes to apply to the inner `<svg>` */
  iconClassName?: string
}

export function IconButton({
  iconName,
  badge,
  iconClassName = '',
  onClick,
  ...buttonProps                              // ← collect all other button props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className="group relative inline-block p-2"
      onClick={onClick}
      {...buttonProps}                         // ← spread them here
    >
      <svg
        className={`inline-block pointer-events-none fill-current align-bottom ${iconClassName}`}
        aria-hidden="true"
      >
        <use xlinkHref={`#${iconName}`} />
      </svg>

      {badge != null && (
        <span className="absolute top-0 right-0 inline-flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600 text-xs text-white">
          {badge}
        </span>
      )}
    </button>
  )
}
