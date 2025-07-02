// src/pages/Shop/Shop.tsx
import React from 'react'
import { products } from '../../data/products'
import { Product }  from '../../components/Product/Product'
import { ShopHero } from '../../components/ShopHero'

export default function ShopPage() {
  return (
    <>
      
      {/* if you have a ShopHero/banner component */}
      <ShopHero />

      <main className="mx-auto max-w-container px-8 py-12">
        <ul className="flex flex-wrap -mx-4 mb-12">
          {products.map((p) => (
            <li
              key={p.slug}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
            >
              <Product slug={p.slug} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
