import React from 'react'

export interface HomeHeroProps {
  /** nothing for now — purely presentational */
}

export const HomeHero: React.FC<HomeHeroProps> = () => (
  <div className="background-image:home-hero overflow:hidden padding-horizontal:8px position:relative">
    <h1 className="color:blue-265f8e font-size:36px font-weight:500 line-height:1.111 padding-bottom:32px padding-horizontal:24px padding-top:24px @mq-768--font-size:52px @mq-768--line-height:1.153 @mq-768--padding-bottom:0 @mq-1040--margin-bottom:-32px">
      Welcome to Binaryville!
    </h1>
    <img
      alt=""
      className="margin-bottom:-96px opacity:20 pos-bottom:0 position:absolute @mq-768--margin-left:24px"
      height={342}
      src="/images/logo.svg"
      width={661}
    />
    <img
      alt=""
      className="float:right max-width:100% position:relative"
      src="/images/home-hero-characters.png"
      width={625}
    />
  </div>
)
