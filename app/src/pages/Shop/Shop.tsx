// Shop.tsx
import React from 'react';
import { Product, products } from '../../data/products';
import { shopStyles } from './ShopStyles';

export default function Shop() {
  return (
    <main style={shopStyles} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p: Product) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
            <p className="text-gray-700 mb-4">${p.price.toFixed(2)}</p>
            <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
