// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../data/products';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product & { slug: string }; // ensure slug is on product type
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
   <div className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
     <img
       src={product.image}
       alt={product.name}
       className="w-full h-40 object-cover mb-4 rounded"
     />
     <h2 className="text-xl font-semibold mb-2">
       <Link to={`/shop/product/${encodeURIComponent(product.slug)}`}>
         {product.name}
       </Link>
     </h2>
     <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
     <Link
       to={`/shop/product/${encodeURIComponent(product.slug)}`}
       className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
     >
       View Details
     </Link>
   </div>
 );

export default ProductCard;
