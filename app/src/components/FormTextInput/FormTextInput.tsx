import React from 'react'

export interface FormTextInputProps {
  label: string
  name: string
  placeholder?: string
  type?: string
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  name,
  placeholder,
  type = 'text',
}) => (
  <div className="padding">
    <label
      htmlFor={name}
      className="
        color:blue-265f8e 
        display:block 
        padding-bottom:8px 
        font-size:14px 
        font-weight:500
      "
    >
      {label}
    </label>
    <div>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="
          appearance:none 
          background-color:neutral-ffffff 
          border-color:neutral-4c5b5c 
          border-style:solid 
          border-width:1px 
          color:neutral-483e40 
          min-height:form-input 
          padding:12px 
          width:100% 
          :hocus--border-color:neutral-000000
        "
        value=""
        onChange={() => {}}
      />
    </div>
  </div>
)
