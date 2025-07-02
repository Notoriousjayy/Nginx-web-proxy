// src/components/Product/Product.tsx
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../../data/products'
import { characters } from '../../data/characters'
import { ColorPicker } from '../ColorPicker'
import { SizePickerPattern } from '../SizePickerPattern'
import { QuantityChanger } from '../QuantityChanger'
import { CharacterCallout } from '../CharacterCallout'

export interface ProductProps {
  /** URL slug */
  slug: string
  /** if true, render the full detail page */
  detail?: boolean
}

export function Product({ slug, detail = false }: ProductProps) {
  const product = products.find((p) => p.slug === slug)
  if (!product) return <div>Sorry, product not found.</div>

  // CARD MODE
  if (!detail) {
    return (
      <div className="flex flex-grow flex-wrap">
        <div className="flex flex-col flex-grow-0 flex-shrink-0 w-full md:w-1/2">
          <div className="flex flex-col flex-grow">
            <Link
              to={`/shop/${slug}`}
              className="group flex-grow text-neutral-800 mb-4"
            >
              <span className="block mb-4 pb-[100%] relative">
                <img
                  src={product.image}
                  alt={`Photo of ${product.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </span>
              <h3 className="text-xl font-medium mb-4 group-hover:text-orange-500">
                {product.name}
              </h3>
              <p className="text-2xl leading-tight">
                ${product.price.toFixed(2)}
              </p>
            </Link>

            <fieldset>
              <legend className="sr-only">Color</legend>
              <div className="flex">
                {product.colors.map((color) => (
                  <label key={color} className="mr-3 relative cursor-pointer">
                    <span className="sr-only">{color}</span>
                    <input
                      type="radio"
                      name={product.slug}
                      value={color}
                      className="appearance-none absolute inset-0 w-full h-full"
                    />
                    <div
                      className={`
                        w-10 h-6 border
                        ${color === 'white' ? 'border-black' : ''}
                        ${color !== 'white' ? `bg-${color}` : 'bg-white'}
                        hover:border-blue-500
                      `}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    )
  }

  // DETAIL MODE
  // form state
  const [color, setColor] = useState(product.colors[0] || '')
  const skuSizes = product.skus.map((s) => Object.values(s)[0].size)
  const [size, setSize] = useState(skuSizes[0] || '')
  const [qty, setQty] = useState(1)

  // related products: same character, exclude self
  const related = products.filter(
    (p) => p.character === product.character && p.slug !== slug
  )
  const char = characters.find((c) => c.name === product.character)

  function addToCart() {
    // …your cart logic
  }

  return (
    <article>
      {/* — Product Hero — */}
      <div className="flex flex-wrap -mx-4 mb-12">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <img
            src={product.image}
            alt={`Photo of ${product.name}, ${color}`}
            className="w-full mb-8"
          />
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <h1 className="text-2xl font-medium mb-6">{product.name}</h1>
          <p className="text-2xl font-medium mb-6">
            ${product.price.toFixed(2)}
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <ColorPicker
              name={product.slug}
              variant="large"
              colors={product.colors}
              onChange={setColor}
            />

            <SizePickerPattern
              name={product.slug}
              sizes={skuSizes}
              selectedSize={size}
              onChange={setSize}
            />

            <QuantityChanger
              name={product.slug}
              value={qty}
              onChange={setQty}
            />

            <button
              type="button"
              onClick={addToCart}
              className="inline-block bg-orange-ff583d text-white font-bold py-3 px-6 mt-4"
            >
              Add to cart
            </button>
          </form>
        </div>
      </div>

      {/* — Character Callout — */}
      {char && <CharacterCallout character={char} />}

      {/* — Related Items — */}
      {related.length > 0 && (
        <>
          <h2 className="text-3xl font-medium mb-8">Related Items</h2>
          <ul className="flex flex-wrap -mx-4 mb-12">
            {related.map((rp) => (
              <li
                key={rp.slug}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
              >
                <Product slug={rp.slug} />
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  )
}
