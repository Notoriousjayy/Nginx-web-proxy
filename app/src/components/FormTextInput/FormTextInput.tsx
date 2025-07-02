// src/components/FormTextInput/FormTextInput.tsx
import React, { ChangeEvent } from 'react'

export interface FormTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The label text */
  label: string
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  className,
  ...rest
}) => {
  const inputId = id ?? name
  return (
    <div className="p-4">
      <label
        htmlFor={inputId}
        className="
          text-blue-600 
          block 
          pb-2 
          text-sm 
          font-medium
        "
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
        required={required}
        className={`
          w-full
          px-3
          py-2
          border
          border-gray-300
          rounded
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          ${className ?? ''}
        `}
        {...rest}
      />
    </div>
  )
}

FormTextInput.displayName = 'FormTextInput'
