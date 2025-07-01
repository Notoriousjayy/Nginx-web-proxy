// app/src/data/robots.ts
export interface Robot {
  slug: string;
  name: string;
  image: string;      // e.g. '/images/characters/rex-disc.png'
  description: string;
}

export const robots: Robot[] = [
  { slug: 'rex', name: 'Rex', image: '/images/characters/rex-disc.png', description: '…' },
  { slug: 'dolores', name: 'Dolores', image: '/images/characters/dolores-disc.png', description: '…' },
  // …all others
];
