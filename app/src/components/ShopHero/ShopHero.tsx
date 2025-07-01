// src/components/ShopHero/ShopHero.tsx
import React from 'react'

/** Empty for now, but here’s where you’d add future props */
export interface ShopHeroProps {}

export function ShopHero(_props: ShopHeroProps) {
  return (
    <div className="background-image:shop-hero-yellow">
      <div className="mx-auto max-w-container px-8 flex flex-col items-center justify-between py-6 md:flex-row md:px-12">
        <div className="leading-relaxed py-6 md:mr-12 md:w-3/5">
          <h1 className="text-2xl font-medium leading-tight mb-4 md:text-4xl md:leading-tight">
            Shop
          </h1>
          <p>
            Share your love of technology, and spread good cheer, with Binaryville official
            merchandise, including t-shirts, hats, mugs, aprons, posters, stickers, and more.
            Each unique treasure features a charming Binaryville robot, encapsulated inside a
            motivating historical quote, cleverly updated for the times. Even the most
            hard-to-please individuals can't resist these infectious designs. Perfect for the
            techie in your life!
          </p>
        </div>
        <div>
          <img
            src="/images/product-montage.png"
            alt="Montage of products"
            className="max-w-full"
            width={761}
          />
        </div>
      </div>
    </div>
  )
}
