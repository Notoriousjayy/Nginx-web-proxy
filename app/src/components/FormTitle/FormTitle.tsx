import React from 'react'

export interface FormTitleProps {
  legend: string
}

export const FormTitle: React.FC<FormTitleProps> = ({ legend }) => (
  <div className="padding">
    <legend className="visually-hidden">{legend}</legend>
    <h3
      className="font-size:28px font-weight:500 line-height:1.142"
      aria-hidden="true"
    >
      {legend}
    </h3>
  </div>
)
