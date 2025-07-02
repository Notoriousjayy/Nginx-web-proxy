import React from 'react'

export interface H2Props {
  /** Text to render inside the H2 */
  heading: string
}

export const H2: React.FC<H2Props> = ({ heading }) => (
  <h2 className="font-size:32px line-height:1.125 margin-bottom:16px @mq-960--margin-bottom:24px">
    {heading}
  </h2>
)
