import React from 'react'

export interface H4Props {
  /** Text to render inside the H4 */
  heading: string
}

export const H4: React.FC<H4Props> = ({ heading }) => (
  <h4 className="color:blue-2c3d57 font-size:20px font-weight:500 @mq-800--font-size:24px">
    {heading}
  </h4>
)
