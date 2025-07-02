// src/components/Banner/Banner.tsx
import React from 'react'

export interface BannerProps {
  /** The text (HTML-escaped) to display inside the banner */
  content: string
}

export const Banner: React.FC<BannerProps> = ({ content }) => {
  return (
    <p
      className="
        bg-yellow-f0c808
        text-neutral-222224
        text-[18px]
        leading-[1.166]
        py-[12px]
        text-center
        uppercase
      "
      // dangerouslySetInnerHTML is used here to preserve &nbsp; entities, 
      // but if you prefer you can pass in React nodes instead of a string.
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default Banner
