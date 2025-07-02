import React from 'react'

export interface FormToggleInputGroupProps {
  /** Fieldset legend (visually hidden) */
  legend: string
  /** `name` attribute for each radio input */
  name: string
  /** List of choices */
  options: { label: string }[]
}

export const FormToggleInputGroup: React.FC<FormToggleInputGroupProps> = ({
  legend,
  name,
  options,
}) => (
  <div className="padding">
    <fieldset>
      <legend className="visually-hidden">{legend}</legend>
      {options.map(({ label }) => (
        <label
          key={label}
          className="color:neutral-3a3a3d display:flex position:relative margin-top:16px"
        >
          <input
            type="radio"
            name={name}
            value={label}
            className="appearance:none position:absolute size:18px toggle-input:checked-target--opacity:100"
          />
          <span className="background-color:neutral-ffffff border-color:blue-265f8e border-style:solid border-width:1px display:inline-block flex-shrink:0 margin-right:12px overflow:hidden position:relative size:18px border-radius:1000">
            <svg
              focusable="false"
              className="display:inline-block pointer-events:none svg-fill-color:current svg-fill-rule:even-odd vertical-align:bottom background-color:neutral-3a3a3d color:neutral-ffffff height:100% opacity:0 pos-top-left:0 position:absolute transition-easing:ease transition-duration:200 transition-property:opacity width:100%"
            >
              <use xlinkHref="#toggle-radio" />
            </svg>
          </span>
          <span>{label}</span>
        </label>
      ))}
    </fieldset>
  </div>
)
