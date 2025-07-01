// app/src/data/products.ts

export interface Product {
  category: string;
  image: string;
  character: string;
  colors: string[];
  design: string;
  name: string;
  price: number;
  skus: Array<{ [sku: string]: { color: string; parentSlug: string; size: string } }>;
  slug: string;
}

export const products: Product[] = [
  {
    category: "apron",
    image: '/images/products/bubbles-gumball-apron.png',
    character: "Bubbles",
    colors: ["black", "gray", "white"],
    design: "gumball",
    name: "A Gumball for Your Thoughts Apron",
    price: 24,
    skus: [
      {
        "bubbles-gumball-apron-24x30-black": {
          color: "black",
          parentSlug: "bubbles-gumball-apron",
          size: "24x30"
        }
      },
      // …etc
    ],
    slug: "bubbles-gumball-apron"
  },
  // …other product objects
];
