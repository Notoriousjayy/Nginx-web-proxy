import React from 'react'

export const FormSuccessMessage: React.FC = () => (
  <div
    className="
      align-items:center 
      text-align:center 
      margin-horizontal:auto 
      @mq-768--display:flex 
      @mq-768--text-align:left
    "
  >
    <div>
      <p
        className="
          color:blue-265f8e 
          font-size:24px 
          font-weight:400 
          margin-bottom:16px 
          @mq-768--font-size:40px
        "
      >
        Your submission has been received.
      </p>
      <p className="line-height:1.375 margin-bottom:16px">
        Our robots are eager to help and will reach out shortly.<br />
        Thanks for your inquiry!
      </p>
    </div>
    <img
      src="/images/contact/fred-standing.png"
      alt=""
      width={162}
      height={279}
      className="flex-shrink:0"
    />
  </div>
)
