// src/data/characters.ts

import rexHero      from '../assets/images/characters/rex-hero.png'
import rexThumb     from '../assets/images/characters/rex-disc.png'
import doloresHero  from '../assets/images/characters/dolores-hero.png'
import doloresThumb from '../assets/images/characters/dolores-disc.png'
import bubblesHero  from '../assets/images/characters/bubbles-hero.png'
import bubblesThumb from '../assets/images/characters/bubbles-disc.png'
import fredHero     from '../assets/images/characters/fred-hero.png'
import fredThumb    from '../assets/images/characters/fred-disc.png'
import rivetHero    from '../assets/images/characters/rivet-hero.png'
import rivetThumb   from '../assets/images/characters/rivet-disc.png'
import eileenHero   from '../assets/images/characters/eileen-hero.png'
import eileenThumb  from '../assets/images/characters/eileen-disc.png'
import belleHero    from '../assets/images/characters/belle-hero.png'
import belleThumb   from '../assets/images/characters/belle-disc.png'
import cosmoHero    from '../assets/images/characters/cosmo-hero.png'
import cosmoThumb   from '../assets/images/characters/cosmo-disc.png'
import dollyHero    from '../assets/images/characters/dolly-hero.png'
import dollyThumb   from '../assets/images/characters/dolly-disc.png'
import sergeantHero from '../assets/images/characters/sergeant-hero.png'
import sergeantThumb from '../assets/images/characters/sergeant-disc.png'
import oscarHero    from '../assets/images/characters/oscar-hero.png'
import oscarThumb   from '../assets/images/characters/oscar-disc.png'
import leviHero     from '../assets/images/characters/levi-hero.png'
import leviThumb    from '../assets/images/characters/levi-disc.png'
import eltonHero    from '../assets/images/characters/elton-hero.png'
import eltonThumb   from '../assets/images/characters/elton-disc.png'
import springHero   from '../assets/images/characters/spring-hero.png'
import springThumb  from '../assets/images/characters/spring-disc.png'

export interface Character {
  id: string
  name: string
  bio: string
  heroImage: string     // now these are imported URLs
  thumbnail: string
}

export const characters: Character[] = [
  {
    id: 'rex',
    name: 'Rex',
    bio: `Rex is the Mayor of Binaryville, ...`,
    heroImage: rexHero,
    thumbnail: rexThumb,
  },
  {
    id: 'dolores',
    name: 'Dolores',
    bio: `Dolores runs the local programming academy...`,
    heroImage: doloresHero,
    thumbnail: doloresThumb,
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    bio: `Bubbles is in charge of city beautification...`,
    heroImage: bubblesHero,
    thumbnail: bubblesThumb,
  },
  {
    id: 'fred',
    name: 'Fred',
    bio: `Fred patrols Binaryville’s neon skyline...`,
    heroImage: fredHero,
    thumbnail: fredThumb,
  },
  {
    id: 'rivet',
    name: 'Rivet',
    bio: `Rivet is the head engineer at the robotics workshop...`,
    heroImage: rivetHero,
    thumbnail: rivetThumb,
  },
  {
    id: 'eileen',
    name: 'Eileen',
    bio: `Eileen organizes Binaryville’s annual Light Parade...`,
    heroImage: eileenHero,
    thumbnail: eileenThumb,
  },
  {
    id: 'belle',
    name: 'Belle',
    bio: `Belle is a safety inspector at the Advanced Robotics Division...`,
    heroImage: belleHero,
    thumbnail: belleThumb,
  },
  {
    id: 'cosmo',
    name: 'Cosmo',
    bio: `Cosmo studies the cosmos from his observatory tower...`,
    heroImage: cosmoHero,
    thumbnail: cosmoThumb,
  },
  {
    id: 'dolly',
    name: 'Dolly',
    bio: `Dolly is Binaryville’s lead fashion designer...`,
    heroImage: dollyHero,
    thumbnail: dollyThumb,
  },
  {
    id: 'sergeant',
    name: 'Sergeant',
    bio: `Sergeant commands the city guard drones...`,
    heroImage: sergeantHero,
    thumbnail: sergeantThumb,
  },
  {
    id: 'oscar',
    name: 'Oscar',
    bio: `Oscar runs the Binaryville film studio...`,
    heroImage: oscarHero,
    thumbnail: oscarThumb,
  },
  {
    id: 'levi',
    name: 'Levi',
    bio: `Levi is the city’s top barista...`,
    heroImage: leviHero,
    thumbnail: leviThumb,
  },
  {
    id: 'elton',
    name: 'Elton',
    bio: `Elton organizes the monthly robot open-mic nights...`,
    heroImage: eltonHero,
    thumbnail: eltonThumb,
  },
  {
    id: 'spring',
    name: 'Spring',
    bio: `Spring is Binaryville’s head gardener...`,
    heroImage: springHero,
    thumbnail: springThumb,
  },
]
