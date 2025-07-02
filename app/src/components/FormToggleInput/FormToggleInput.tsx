import React from 'react'

export interface FormToggleInputProps {
  name: string
  label: string
}

export const FormToggleInput: React.FC<FormToggleInputProps> = ({
  name,
  label,
}) => (
  <div className="padding">
    <label className="color:neutral-3a3a3d display:flex position:relative">
      <input
        type="checkbox"
        name={name}
        className="appearance:none position:absolute size:18px toggle-input:checked-target--opacity:100"
        value={label}
      />
      <span className="background-color:neutral-ffffff border-color:blue-265f8e border-style:solid border-width:1px display:inline-block flex-shrink:0 margin-right:12px overflow:hidden position:relative size:18px">
        <svg
          focusable="false"
          className="display:inline-block pointer-events:none svg-fill-color:current svg-fill-rule:even-odd vertical-align:bottom background-color:neutral-3a3a3d color:neutral-ffffff height:100% opacity:0 pos-top-left:0 position:absolute transition-easing:ease transition-duration:200 transition-property:opacity width:100%"
        >
          <use xlinkHref="#toggle-check" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  </div>
)
