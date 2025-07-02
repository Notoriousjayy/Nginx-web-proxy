import React from 'react'

export interface H3Props {
  /** Text to render inside the H3 */
  heading: string
}

export const H3: React.FC<H3Props> = ({ heading }) => (
  <h3 className="font-size:28px font-weight:500 line-height:1.142">
    {heading}
  </h3>
)
