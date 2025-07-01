import React from 'react'

export interface DesignCalloutProps {
  /** key of the design to show (used to look up image & text) */
  name: string
}

/**
 * A “design callout” highlights a single design,
 * with image, title and description.
 */
export const DesignCallout: React.FC<DesignCalloutProps> = ({ name }) => {
  // In a real app you might fetch this from your data layer.
  // Here we'll hard-code the one example you showed:
  const designs: Record<string, { 
    imgSrc: string
    imgAlt: string
    title: string
    subtitle: string
    description: string
    borderColor: string
  }> = {
    gumball: {
      imgSrc: '/images/products/bubbles-gumball.png',
      imgAlt: 'A Gumball for Your Thoughts illustration',
      title: 'About the Design',
      subtitle: 'A Gumball for Your Thoughts',
      description:
        'Always the visionary, Bubbles robot extends her big heart (and generous bubble gum collection) to encourage the sharing of ideas.',
      borderColor: 'orange-ff583d',
    },
  }

  const d = designs[name]
  if (!d) return null

  return (
    <div className={`border-color:${d.borderColor} border-style:solid border-width:10px`}>
      <div
        className={`
          align-items:center
          display:flex
          flex-wrap:wrap
          margin:auto
          max-width:800px
          padding-horizontal:32px

          @mq-768--flex-wrap:no-wrap
        `}
      >
        <img
          src={d.imgSrc}
          alt={d.imgAlt}
          width={225}
          className={`
            margin:auto
            max-width:100%

            @mq-768--margin-right:64px
          `}
        />
        <div>
          <h3
            className={`
              font-size:20px
              font-weight:500
              line-height:1.2
              margin-bottom:8px
            `}
          >
            {d.title}
          </h3>
          <p
            className={`
              color:${d.borderColor}
              font-size:28px
              font-weight:500
              line-height:1.142
              margin-bottom:20px
            `}
          >
            {d.subtitle}
          </p>
          <p className="line-height:1.375 margin-bottom:32px @mq-768--margin-bottom:0">
            {d.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DesignCallout
