// app/src/data/products.ts

// Import product images from assets
import fred0s1sApronBlack from '../assets/images/products/fred-0s1s-apron-black.jpg';
import doloresComputeApronBlack from '../assets/images/products/dolores-compute-apron-black.jpg';
import bubblesGumballApronBlack from '../assets/images/products/bubbles-gumball-apron-black.jpg';
import rexMicrocontrollersApronBlack from '../assets/images/products/rex-microcontrollers-apron-black.jpg';

import fred0s1sBaseballHatBlack from '../assets/images/products/fred-0s1s-baseballhat-black.jpg';
import doloresComputeBaseballHatBlack from '../assets/images/products/dolores-compute-baseballhat-black.jpg';
import bubblesGumballBaseballHatBlack from '../assets/images/products/bubbles-gumball-baseballhat-black.jpg';
import rexMicrocontrollersBaseballHatBlack from '../assets/images/products/rex-microcontrollers-baseballhat-black.jpg';

import fred0s1sMugBlack from '../assets/images/products/fred-0s1s-mug-black.jpg';
import doloresComputeMugBlack from '../assets/images/products/dolores-compute-mug-black.jpg';
import bubblesGumballMugBlack from '../assets/images/products/bubbles-gumball-mug-black.jpg';
import rexMicrocontrollersMugBlack from '../assets/images/products/rex-microcontrollers-mug-black.jpg';

import fred0s1sTshirtBlack from '../assets/images/products/fred-0s1s-tshirt-black.jpg';
import doloresComputeTshirtBlack from '../assets/images/products/dolores-compute-tshirt-black.jpg';
import bubblesGumballTshirtBlack from '../assets/images/products/bubbles-gumball-tshirt-black.jpg';
import rexMicrocontrollersTshirtBlack from '../assets/images/products/rex-microcontrollers-tshirt-black.jpg';

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
  // Aprons
  {
    category: "apron",
    image: fred0s1sApronBlack,
    character: "Fred",
    colors: ["black", "gray", "white"],
    design: "0s1s",
    name: "It’s All 0’s and 1’s to Me! Apron",
    price: 24,
    skus: [
      {
        "fred-0s1s-apron-24x30-black": { color: "black", parentSlug: "fred-0s1s-apron", size: "24x30" }
      },
      {
        "fred-0s1s-apron-24x30-gray": { color: "gray", parentSlug: "fred-0s1s-apron", size: "24x30" }
      },
      {
        "fred-0s1s-apron-24x30-white": { color: "white", parentSlug: "fred-0s1s-apron", size: "24x30" }
      },
    ],
    slug: "fred-0s1s-apron"
  },
  {
    category: "apron",
    image: doloresComputeApronBlack,
    character: "Dolores",
    colors: ["black", "gray", "white"],
    design: "compute",
    name: "I Compute, Therefore I Am Apron",
    price: 24,
    skus: [
      {
        "dolores-compute-apron-24x30-black": { color: "black", parentSlug: "dolores-compute-apron", size: "24x30" }
      },
      {
        "dolores-compute-apron-24x30-gray": { color: "gray", parentSlug: "dolores-compute-apron", size: "24x30" }
      },
      {
        "dolores-compute-apron-24x30-white": { color: "white", parentSlug: "dolores-compute-apron", size: "24x30" }
      },
    ],
    slug: "dolores-compute-apron"
  },
  {
    category: "apron",
    image: bubblesGumballApronBlack,
    character: "Bubbles",
    colors: ["black", "gray", "white"],
    design: "gumball",
    name: "A Gumball for Your Thoughts Apron",
    price: 24,
    skus: [
      {
        "bubbles-gumball-apron-24x30-black": { color: "black", parentSlug: "bubbles-gumball-apron", size: "24x30" }
      },
      {
        "bubbles-gumball-apron-24x30-gray": { color: "gray", parentSlug: "bubbles-gumball-apron", size: "24x30" }
      },
      {
        "bubbles-gumball-apron-24x30-white": { color: "white", parentSlug: "bubbles-gumball-apron", size: "24x30" }
      },
    ],
    slug: "bubbles-gumball-apron"
  },
  {
    category: "apron",
    image: rexMicrocontrollersApronBlack,
    character: "Rex",
    colors: ["black", "gray", "white"],
    design: "microcontrollers",
    name: "Great Microcontrollers Think Alike Apron",
    price: 24,
    skus: [
      {
        "rex-microcontrollers-apron-24x30-black": { color: "black", parentSlug: "rex-microcontrollers-apron", size: "24x30" }
      },
      {
        "rex-microcontrollers-apron-24x30-gray": { color: "gray", parentSlug: "rex-microcontrollers-apron", size: "24x30" }
      },
      {
        "rex-microcontrollers-apron-24x30-white": { color: "white", parentSlug: "rex-microcontrollers-apron", size: "24x30" }
      },
    ],
    slug: "rex-microcontrollers-apron"
  },

  // Baseball Hats
  {
    category: "baseballHat",
    image: fred0s1sBaseballHatBlack,
    character: "Fred",
    colors: ["black", "gray", "white"],
    design: "0s1s",
    name: "It’s All 0’s and 1’s to Me! Baseball Hat",
    price: 29,
    skus: [
      {
        "fred-0s1s-baseballhat-osfm-black": { color: "black", parentSlug: "fred-0s1s-baseballhat", size: "osfm" }
      },
      {
        "fred-0s1s-baseballhat-osfm-gray": { color: "gray", parentSlug: "fred-0s1s-baseballhat", size: "osfm" }
      },
      {
        "fred-0s1s-baseballhat-osfm-white": { color: "white", parentSlug: "fred-0s1s-baseballhat", size: "osfm" }
      },
    ],
    slug: "fred-0s1s-baseballhat"
  },
  {
    category: "baseballHat",
    image: doloresComputeBaseballHatBlack,
    character: "Dolores",
    colors: ["black", "gray", "white"],
    design: "compute",
    name: "I Compute, Therefore I Am Baseball Hat",
    price: 29,
    skus: [
      {
        "dolores-compute-baseballhat-osfm-black": { color: "black", parentSlug: "dolores-compute-baseballhat", size: "osfm" }
      },
      {
        "dolores-compute-baseballhat-osfm-gray": { color: "gray", parentSlug: "dolores-compute-baseballhat", size: "osfm" }
      },
      {
        "dolores-compute-baseballhat-osfm-white": { color: "white", parentSlug: "dolores-compute-baseballhat", size: "osfm" }
      },
    ],
    slug: "dolores-compute-baseballhat"
  },
  {
    category: "baseballHat",
    image: bubblesGumballBaseballHatBlack,
    character: "Bubbles",
    colors: ["black", "gray", "white"],
    design: "gumball",
    name: "A Gumball for Your Thoughts Baseball Hat",
    price: 29,
    skus: [
      {
        "bubbles-gumball-baseballhat-osfm-black": { color: "black", parentSlug: "bubbles-gumball-baseballhat", size: "osfm" }
      },
      {
        "bubbles-gumball-baseballhat-osfm-gray": { color: "gray", parentSlug: "bubbles-gumball-baseballhat", size: "osfm" }
      },
      {
        "bubbles-gumball-baseballhat-osfm-white": { color: "white", parentSlug: "bubbles-gumball-baseballhat", size: "osfm" }
      },
    ],
    slug: "bubbles-gumball-baseballhat"
  },
  {
    category: "baseballHat",
    image: rexMicrocontrollersBaseballHatBlack,
    character: "Rex",
    colors: ["black", "gray", "white"],
    design: "microcontrollers",
    name: "Great Microcontrollers Think Alike Baseball Hat",
    price: 29,
    skus: [
      {
        "rex-microcontrollers-baseballhat-osfm-black": { color: "black", parentSlug: "rex-microcontrollers-baseballhat", size: "osfm" }
      },
      {
        "rex-microcontrollers-baseballhat-osfm-gray": { color: "gray", parentSlug: "rex-microcontrollers-baseballhat", size: "osfm" }
      },
      {
        "rex-microcontrollers-baseballhat-osfm-white": { color: "white", parentSlug: "rex-microcontrollers-baseballhat", size: "osfm" }
      },
    ],
    slug: "rex-microcontrollers-baseballhat"
  },

  // Mugs
  {
    category: "mug",
    image: fred0s1sMugBlack,
    character: "Fred",
    colors: ["black", "gray", "white"],
    design: "0s1s",
    name: "It’s All 0’s and 1’s to Me! Mug",
    price: 16,
    skus: [
      {
        "fred-0s1s-mug-11oz-black": { color: "black", parentSlug: "fred-0s1s-mug", size: "11oz" }
      },
      {
        "fred-0s1s-mug-11oz-gray": { color: "gray", parentSlug: "fred-0s1s-mug", size: "11oz" }
      },
      {
        "fred-0s1s-mug-11oz-white": { color: "white", parentSlug: "fred-0s1s-mug", size: "11oz" }
      },
    ],
    slug: "fred-0s1s-mug"
  },
  {
    category: "mug",
    image: doloresComputeMugBlack,
    character: "Dolores",
    colors: ["black", "gray", "white"],
    design: "compute",
    name: "I Compute, Therefore I Am Mug",
    price: 16,
    skus: [
      {
        "dolores-compute-mug-11oz-black": { color: "black", parentSlug: "dolores-compute-mug", size: "11oz" }
      },
      {
        "dolores-compute-mug-11oz-gray": { color: "gray", parentSlug: "dolores-compute-mug", size: "11oz" }
      },
      {
        "dolores-compute-mug-11oz-white": { color: "white", parentSlug: "dolores-compute-mug", size: "11oz" }
      },
    ],
    slug: "dolores-compute-mug"
  },
  {
    category: "mug",
    image: bubblesGumballMugBlack,
    character: "Bubbles",
    colors: ["black", "gray", "white"],
    design: "gumball",
    name: "A Gumball for Your Thoughts Mug",
    price: 16,
    skus: [
      {
        "bubbles-gumball-mug-11oz-black": { color: "black", parentSlug: "bubbles-gumball-mug", size: "11oz" }
      },
      {
        "bubbles-gumball-mug-11oz-gray": { color: "gray", parentSlug: "bubbles-gumball-mug", size: "11oz" }
      },
      {
        "bubbles-gumball-mug-11oz-white": { color: "white", parentSlug: "bubbles-gumball-mug", size: "11oz" }
      },
    ],
    slug: "bubbles-gumball-mug"
  },
  {
    category: "mug",
    image: rexMicrocontrollersMugBlack,
    character: "Rex",
    colors: ["black", "gray", "white"],
    design: "microcontrollers",
    name: "Great Microcontrollers Think Alike Mug",
    price: 16,
    skus: [
      {
        "rex-microcontrollers-mug-11oz-black": { color: "black", parentSlug: "rex-microcontrollers-mug", size: "11oz" }
      },
      {
        "rex-microcontrollers-mug-11oz-gray": { color: "gray", parentSlug: "rex-microcontrollers-mug", size: "11oz" }
      },
      {
        "rex-microcontrollers-mug-11oz-white": { color: "white", parentSlug: "rex-microcontrollers-mug", size: "11oz" }
      },
    ],
    slug: "rex-microcontrollers-mug"
  },

  // T-shirts
  {
    category: "tShirt",
    image: fred0s1sTshirtBlack,
    character: "Fred",
    colors: ["black", "gray", "white"],
    design: "0s1s",
    name: "It’s All 0’s and 1’s to Me! T-shirt",
    price: 26,
    skus: [
      {
        "fred-0s1s-tshirt-s-black": { color: "black", parentSlug: "fred-0s1s-tshirt", size: "s" }
      },
      {
        "fred-0s1s-tshirt-s-gray": { color: "gray", parentSlug: "fred-0s1s-tshirt", size: "s" }
      },
      {
        "fred-0s1s-tshirt-s-white": { color: "white", parentSlug: "fred-0s1s-tshirt", size: "s" }
      },
      {
        "fred-0s1s-tshirt-m-black": { color: "black", parentSlug: "fred-0s1s-tshirt", size: "m" }
      },
      {
        "fred-0s1s-tshirt-m-gray": { color: "gray", parentSlug: "fred-0s1s-tshirt", size: "m" }
      },
      {
        "fred-0s1s-tshirt-m-white": { color: "white", parentSlug: "fred-0s1s-tshirt", size: "m" }
      },
      {
        "fred-0s1s-tshirt-l-black": { color: "black", parentSlug: "fred-0s1s-tshirt", size: "l" }
      },
      {
        "fred-0s1s-tshirt-l-gray": { color: "gray", parentSlug: "fred-0s1s-tshirt", size: "l" }
      },
      {
        "fred-0s1s-tshirt-l-white": { color: "white", parentSlug: "fred-0s1s-tshirt", size: "l" }
      },
      {
        "fred-0s1s-tshirt-xl-black": { color: "black", parentSlug: "fred-0s1s-tshirt", size: "xl" }
      },
      {
        "fred-0s1s-tshirt-xl-gray": { color: "gray", parentSlug: "fred-0s1s-tshirt", size: "xl" }
      },
      {
        "fred-0s1s-tshirt-xl-white": { color: "white", parentSlug: "fred-0s1s-tshirt", size: "xl" }
      },
      {
        "fred-0s1s-tshirt-xxl-black": { color: "black", parentSlug: "fred-0s1s-tshirt", size: "xxl" }
      },
      {
        "fred-0s1s-tshirt-xxl-gray": { color: "gray", parentSlug: "fred-0s1s-tshirt", size: "xxl" }
      },
      {
        "fred-0s1s-tshirt-xxl-white": { color: "white", parentSlug: "fred-0s1s-tshirt", size: "xxl" }
      },
    ],
    slug: "fred-0s1s-tshirt"
  },
  {
    category: "tShirt",
    image: doloresComputeTshirtBlack,
    character: "Dolores",
    colors: ["black", "gray", "white"],
    design: "compute",
    name: "I Compute, Therefore I Am T-shirt",
    price: 26,
    skus: [
      {
        "dolores-compute-tshirt-s-black": { color: "black", parentSlug: "dolores-compute-tshirt", size: "s" }
      },
      {
        "dolores-compute-tshirt-s-gray": { color: "gray", parentSlug: "dolores-compute-tshirt", size: "s" }
      },
      {
        "dolores-compute-tshirt-s-white": { color: "white", parentSlug: "dolores-compute-tshirt", size: "s" }
      },
      {
        "dolores-compute-tshirt-m-black": { color: "black", parentSlug: "dolores-compute-tshirt", size: "m" }
      },
      {
        "dolores-compute-tshirt-m-gray": { color: "gray", parentSlug: "dolores-compute-tshirt", size: "m" }
      },
      {
        "dolores-compute-tshirt-m-white": { color: "white", parentSlug: "dolores-compute-tshirt", size: "m" }
      },
      {
        "dolores-compute-tshirt-l-black": { color: "black", parentSlug: "dolores-compute-tshirt", size: "l" }
      },
      {
        "dolores-compute-tshirt-l-gray": { color: "gray", parentSlug: "dolores-compute-tshirt", size: "l" }
      },
      {
        "dolores-compute-tshirt-l-white": { color: "white", parentSlug: "dolores-compute-tshirt", size: "l" }
      },
      {
        "dolores-compute-tshirt-xl-black": { color: "black", parentSlug: "dolores-compute-tshirt", size: "xl" }
      },
      {
        "dolores-compute-tshirt-xl-gray": { color: "gray", parentSlug: "dolores-compute-tshirt", size: "xl" }
      },
      {
        "dolores-compute-tshirt-xl-white": { color: "white", parentSlug: "dolores-compute-tshirt", size: "xl" }
      },
      {
        "dolores-compute-tshirt-xxl-black": { color: "black", parentSlug: "dolores-compute-tshirt", size: "xxl" }
      },
      {
        "dolores-compute-tshirt-xxl-gray": { color: "gray", parentSlug: "dolores-compute-tshirt", size: "xxl" }
      },
      {
        "dolores-compute-tshirt-xxl-white": { color: "white", parentSlug: "dolores-compute-tshirt", size: "xxl" }
      },
    ],
    slug: "dolores-compute-tshirt"
  },
  {
    category: "tShirt",
    image: bubblesGumballTshirtBlack,
    character: "Bubbles",
    colors: ["black", "gray", "white"],
    design: "gumball",
    name: "A Gumball for Your Thoughts T-shirt",
    price: 26,
    skus: [
      {
        "bubbles-gumball-tshirt-s-black": { color: "black", parentSlug: "bubbles-gumball-tshirt", size: "s" }
      },
      {
        "bubbles-gumball-tshirt-s-gray": { color: "gray", parentSlug: "bubbles-gumball-tshirt", size: "s" }
      },
      {
        "bubbles-gumball-tshirt-s-white": { color: "white", parentSlug: "bubbles-gumball-tshirt", size: "s" }
      },
      {
        "bubbles-gumball-tshirt-m-black": { color: "black", parentSlug: "bubbles-gumball-tshirt", size: "m" }
      },
      {
        "bubbles-gumball-tshirt-m-gray": { color: "gray", parentSlug: "bubbles-gumball-tshirt", size: "m" }
      },
      {
        "bubbles-gumball-tshirt-m-white": { color: "white", parentSlug: "bubbles-gumball-tshirt", size: "m" }
      },
      {
        "bubbles-gumball-tshirt-l-black": { color: "black", parentSlug: "bubbles-gumball-tshirt", size: "l" }
      },
      {
        "bubbles-gumball-tshirt-l-gray": { color: "gray", parentSlug: "bubbles-gumball-tshirt", size: "l" }
      },
      {
        "bubbles-gumball-tshirt-l-white": { color: "white", parentSlug: "bubbles-gumball-tshirt", size: "l" }
      },
      {
        "bubbles-gumball-tshirt-xl-black": { color: "black", parentSlug: "bubbles-gumball-tshirt", size: "xl" }
      },
      {
        "bubbles-gumball-tshirt-xl-gray": { color: "gray", parentSlug: "bubbles-gumball-tshirt", size: "xl" }
      },
      {
        "bubbles-gumball-tshirt-xl-white": { color: "white", parentSlug: "bubbles-gumball-tshirt", size: "xl" }
      },
      {
        "bubbles-gumball-tshirt-xxl-black": { color: "black", parentSlug: "bubbles-gumball-tshirt", size: "xxl" }
      },
      {
        "bubbles-gumball-tshirt-xxl-gray": { color: "gray", parentSlug: "bubbles-gumball-tshirt", size: "xxl" }
      },
      {
        "bubbles-gumball-tshirt-xxl-white": { color: "white", parentSlug: "bubbles-gumball-tshirt", size: "xxl" }
      },
    ],
    slug: "bubbles-gumball-tshirt"
  },
  {
    category: "tShirt",
    image: rexMicrocontrollersTshirtBlack,
    character: "Rex",
    colors: ["black", "gray", "white"],
    design: "microcontrollers",
    name: "Great Microcontrollers Think Alike T-shirt",
    price: 26,
    skus: [
      {
        "rex-microcontrollers-tshirt-s-black": { color: "black", parentSlug: "rex-microcontrollers-tshirt", size: "s" }
      },
      {
        "rex-microcontrollers-tshirt-s-gray": { color: "gray", parentSlug: "rex-microcontrollers-tshirt", size: "s" }
      },
      {
        "rex-microcontrollers-tshirt-s-white": { color: "white", parentSlug: "rex-microcontrollers-tshirt", size: "s" }
      },
      {
        "rex-microcontrollers-tshirt-m-black": { color: "black", parentSlug: "rex-microcontrollers-tshirt", size: "m" }
      },
      {
        "rex-microcontrollers-tshirt-m-gray": { color: "gray", parentSlug: "rex-microcontrollers-tshirt", size: "m" }
      },
      {
        "rex-microcontrollers-tshirt-m-white": { color: "white", parentSlug: "rex-microcontrollers-tshirt", size: "m" }
      },
      {
        "rex-microcontrollers-tshirt-l-black": { color: "black", parentSlug: "rex-microcontrollers-tshirt", size: "l" }
      },
      {
        "rex-microcontrollers-tshirt-l-gray": { color: "gray", parentSlug: "rex-microcontrollers-tshirt", size: "l" }
      },
      {
        "rex-microcontrollers-tshirt-l-white": { color: "white", parentSlug: "rex-microcontrollers-tshirt", size: "l" }
      },
      {
        "rex-microcontrollers-tshirt-xl-black": { color: "black", parentSlug: "rex-microcontrollers-tshirt", size: "xl" }
      },
      {
        "rex-microcontrollers-tshirt-xl-gray": { color: "gray", parentSlug: "rex-microcontrollers-tshirt", size: "xl" }
      },
      {
        "rex-microcontrollers-tshirt-xl-white": { color: "white", parentSlug: "rex-microcontrollers-tshirt", size: "xl" }
      },
      {
        "rex-microcontrollers-tshirt-xxl-black": { color: "black", parentSlug: "rex-microcontrollers-tshirt", size: "xxl" }
      },
      {
        "rex-microcontrollers-tshirt-xxl-gray": { color: "gray", parentSlug: "rex-microcontrollers-tshirt", size: "xxl" }
      },
      {
        "rex-microcontrollers-tshirt-xxl-white": { color: "white", parentSlug: "rex-microcontrollers-tshirt", size: "xxl" }
      },
    ],
    slug: "rex-microcontrollers-tshirt"
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(parentSlug: string): Product[] {
  const parent = getProduct(parentSlug);
  if (!parent) return [];
  return products.filter(p => p.character === parent.character && p.slug !== parentSlug);
}
