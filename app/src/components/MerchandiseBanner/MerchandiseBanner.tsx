// src/components/MerchandiseBanner.tsx
import React from 'react'
import { Link } from 'react-router-dom'

export interface MerchandiseBannerProps {
  /** The H2 text */
  heading: string
  /** The main paragraph text */
  content: string
  /** Button link & label */
  button: {
    href: string
    label: string
  }
  /** Background “flavor” — maps to your CSS utility for bg-image:shop-hero-{color} */
  color: 'yellow' | 'blue' | 'green' | 'red'
}

export function MerchandiseBanner({
  heading,
  content,
  button: { href, label },
  color,
}: MerchandiseBannerProps) {
  return (
    <div
      className={`
        flex items-center justify-between overflow-hidden
        pl-8 md:pl-12 bg-[image:var(--shop-hero-${color})]
      `}
    >
      <div className="space-y-4 py-6 md:space-y-6 md:pr-12 md:w-3/5">
        <h2
          className={`
            text-2xl font-semibold leading-tight text-orange-600
            md:text-3xl md:leading-snug
          `}
        >
          {heading}
        </h2>

        <p className="mb-4 md:mb-8">{content}</p>

        <Link
          to={href}
          className="
            inline-block text-lg font-bold leading-none
            px-6 py-3 bg-orange-600 text-white
            hover:bg-yellow-400
          "
        >
          {label}
        </Link>
      </div>

      <picture className="flex-shrink-0">
        <source
          media="(min-width: 768px)"
          srcSet="/images/product-montage.png"
        />
        <img
          src="/images/product-montage-cropped.png"
          alt="Montage of products"
          className="hidden md:inline-block max-w-full"
        />
      </picture>
    </div>
  )
}
