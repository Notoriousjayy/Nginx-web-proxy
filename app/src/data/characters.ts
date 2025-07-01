// src/data/characters.ts

export interface Character {
  id: string
  name: string
  bio: string
  image: string
  heroImage: string
}

export const characters: Character[] = [
  {
    id: 'rex',
    name: 'Rex',
    bio: `Rex is the Mayor of Binaryville, and a well-loved personality in town. He rose to robotdom from a microprocessor plant on the south side of town, where many famous and influential robots before him were conceived.`,
    image: '/images/characters/rex-disc.png',
    heroImage: '/images/characters/rex-hero.png',
  },
  {
    id: 'belle',
    name: 'Belle',
    bio: `Belle is a safety inspector at Binaryville's Advanced Robotics Assembly Division, and while she doesn't particularly like to toot her own horn, her job does require blaring her siren and flashing her warning light whenever a safety concern is discovered. Belle is proud that she helps keep residents of Binaryville safe and sound. Belle's extracurricular activities include gardening, knitting, and volunteering with the local Robot Scouts chapter, where she teaches outdoor safety.`,
    image: '/images/characters/belle-disc.png',
    heroImage: '/images/characters/belle-hero.png',
  },
]
