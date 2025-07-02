import React from 'react'

export interface FormDropdownProps {
  label: string
  name: string
  options: string[]
  selectedOption?: string
  onChange?: (value: string) => void
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  name,
  options,
  selectedOption,
  onChange = () => {},
}) => (
  <div className="padding">
    <label
      htmlFor={name}
      className="color:blue-265f8e display:block padding-bottom:8px font-size:14px font-weight:500"
    >
      {label}
    </label>

    <div className="position:relative">
      <select
        id={name}
        name={name}
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        className="appearance:none background-color:neutral-ffffff border-color:neutral-4c5b5c border-style:solid border-width:1px border-radius:0 color:neutral-483e40 line-height:1 min-height:form-input padding:12px width:100% :hocus--border-color:neutral-000000"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <svg
        className="display:inline-block pointer-events:none svg-fill-color:current svg-fill-rule:even-odd vertical-align:bottom background-color:neutral-ffffff margin-right:2px position:absolute pos-right:0 pos-top:50% size:24px translate-y:-50%"
        focusable="false"
      >
        <use xlinkHref="#dropdown-caret" />
      </svg>
    </div>
  </div>
)

export default FormDropdown
