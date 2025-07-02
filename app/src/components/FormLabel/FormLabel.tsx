import React from 'react'

export interface FormLabelProps {
  label: string
  htmlFor: string
  visuallyHidden?: boolean
}

export const FormLabel: React.FC<FormLabelProps> = ({
  label,
  htmlFor,
  visuallyHidden = false,
}) => (
  <label
    htmlFor={htmlFor}
    className={`
      color:blue-265f8e 
      display:block 
      padding-bottom:8px 
      font-size:14px 
      font-weight:500
      ${visuallyHidden ? 'visually-hidden' : ''}
    `}
  >
    {label}
  </label>
)
