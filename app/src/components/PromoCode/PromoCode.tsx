import React from 'react'
import Icon from '../Icon'

export interface PromoCodeProps {
  /** The promo code text to display */
  content: string
  /** Whether the code can be removed */
  removable?: boolean
  /** Callback when the remove button is clicked */
  onRemove?: () => void
}

export function PromoCode({
  content,
  removable = false,
  onRemove,
}: PromoCodeProps) {
  return (
    <div className="p-2">
      <strong className="flex items-center leading-[1.083] my-1 text-green-600">
        <Icon name="tag" size={16} className="mr-1 fill-current" />
        {content}

        {removable && (
          <button
            onClick={onRemove}
            aria-label="Remove promo code"
            className="group ml-1 p-1 rounded-full bg-gray-500 hover:bg-orange-600 text-white"
          >
            <Icon name="cross-small" size={16} className="fill-current" />
          </button>
        )}
      </strong>
    </div>
  )
}
