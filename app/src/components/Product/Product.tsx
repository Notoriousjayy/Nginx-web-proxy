import React from 'react'
import { Link } from 'react-router-dom'

export interface ProductProps {
  /** Available color options */
  colors: string[]
  /** Product name */
  name: string
  /** Price in dollars */
  price: number
  /** URL slug */
  slug: string
}

export function Product({ colors, name, price, slug }: ProductProps) {
  return (
    <div className="flex flex-grow flex-wrap">
      <div className="flex flex-col flex-grow-0 flex-shrink-0 w-full md:w-1/2">
        <div className="flex flex-col flex-grow">
          <Link
            to={`/shop/product/${slug}`}
            className="group flex-grow text-neutral-800 mb-4"
          >
            <span className="block mb-4 pb-[100%] relative">
              <img
                src="/images/placeholder-800x800.jpg"
                alt={`Photo of ${name}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </span>

            <h3 className="text-xl font-medium mb-4 group-hover:text-orange-500">
              {name}
            </h3>
            <p className="text-2xl leading-tight">${price.toFixed(2)}</p>
          </Link>

          <fieldset>
            <legend className="sr-only">Color</legend>
            <div className="flex">
              {colors.map((color) => (
                <label key={color} className="mr-3 relative cursor-pointer">
                  <span className="sr-only">{color}</span>
                  <input
                    type="radio"
                    name={name}
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
