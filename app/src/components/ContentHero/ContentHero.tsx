import React from 'react'

export interface ContentHeroProps {
  color: string                 // e.g. "blue", used to pick the background image
  heading: string
  content: string | React.ReactNode
}

export const ContentHero: React.FC<ContentHeroProps> = ({
  color,
  heading,
  content,
}) => {
  // Background class name is pattern `background-image:content-hero-${color}`
  const bgClass = `background-image:content-hero-${color}`

  return (
    <div className={`${bgClass} padding-vertical:24px`}>
      <div
        className={`
          margin-horizontal:auto
          max-width:container
          padding-horizontal:32px

          display:flex
          flex-direction:column
          justify-content:space-between

          @mq-960--flex-direction:row
        `}
      >
        <div className="line-height:1.375 @mq-960--width:50%">
          <h1
            className={`
              font-size:28px
              font-weight:500
              line-height:1.142
              margin-bottom:16px

              @mq-960--font-size:40px
              @mq-960--line-height:1.05
            `}
          >
            {heading}
          </h1>
          <div className="margin-bottom:24px" dangerouslySetInnerHTML={{
            __html: typeof content === 'string' ? content : ''
          }} />
          {/* If content is ReactNode instead of string, render that instead */}
          {typeof content !== 'string' && content}
        </div>

        <img
          src={`/images/logo.svg`}
          alt=""
          width={423}
          height={219}
          className={`
            align-self:center
            justify-self:center
            margin-top:24px
            max-width:100%

            @mq-960--margin-top:0
          `}
        />
      </div>
    </div>
  )
}

export default ContentHero
