import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';


export default function Shop() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map(prod => (
        <li key={prod.slug}>
          <ProductCard product={prod} />
        </li>
      ))}
    </ul>
  );
}
