import React from 'react'

export interface SocialIconProps {
  /** The icon name (used as the `<use xlink:href>` fragment) */
  name: string
  /** Link URL */
  url: string
}

export function SocialIcon({ name, url }: SocialIconProps) {
  return (
    <a
      href={url}
      aria-label={`Find us on ${name}`}
      className="color:blue-324f6b :hocus--color:orange-ff583d"
    >
      <svg
        className="display:inline-block pointer-events:none svg-fill-color:current svg-fill-rule:even-odd vertical-align:bottom size:40px"
        aria-hidden="true"
        focusable="false"
      >
        <use xlinkHref={`#${name}`} />
      </svg>
    </a>
  )
}
