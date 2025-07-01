import React from 'react'

export interface PageTitleProps {
  /** The text to render as the page title */
  heading: string
}

export function PageTitle({ heading }: PageTitleProps) {
  return (
    <h1
      className="
        color:blue-265f8e
        font-size:36px
        font-weight:500
        line-height:1.222
        margin-bottom:12px
        @mq-960--margin-bottom:24px
      "
    >
      {heading}
    </h1>
  )
}
