// src/data/characters.ts
import type { ReactNode } from 'react'

export interface Character {
  id: string
  name: string
  bio: string
  /** This will be rendered inside `<CharacterHero.Description>` */
  description: ReactNode
  /** Passed to the MerchandiseBanner as `content` */
  merchContent: string
}

export const characters: Character[] = [
  {
    id: 'rex',
    name: 'Rex',
    bio:
      'Rex is the Mayor of Binaryville, and a well-loved personality in town. He rose to robotdom from a microprocessor plant on the south side of town, where many famous and influential robots before him were conceived.',
    description: (
      <>
        <p className="margin-bottom:24px">
          On the edge of the world stands the progressive town of Binaryville, where
          technology is a way of life. The robots who live, work, and play in Binaryville
          learn from an early age that magic is made simply by combining 0’s and 1’s.
          For the Binaryville robots, every waking thought and every sleeping dream
          is consumed with unique permutations… and endless possibilities.
        </p>
        <p>
          This is our happy place, and we invite the dreamers, thinkers, and inventors
          of the world to unite in our passion for building something out of nothing.
          (Well, nothing plus 1.) Visit Binaryville and let your imagination soar!
        </p>
      </>
    ),
    merchContent:
      'Share your love of technology, and spread good cheer, with Rex-themed Binaryville merchandise—coming soon!',
  },
  {
    id: 'belle',
    name: 'Belle',
    bio:
      "Belle is a safety inspector at Binaryville's Advanced Robotics Assembly Division, and while she doesn't particularly like to toot her own horn, her job does require blaring her siren and flashing her warning light whenever a safety concern is discovered.",
    description: (
      <>
        <p className="margin-bottom:16px">
          Belle is proud that she helps keep residents of Binaryville safe and sound.
          Whenever there’s a hazard, you’ll hear her alarm—and you’ll know help is on
          the way.
        </p>
        <p>
          In her free time she enjoys gardening, knitting, and volunteering with the
          local Robot Scouts, where she teaches outdoor safety and survival skills.
        </p>
      </>
    ),
    merchContent:
      'Check back here for Belle-inspired Binaryville gear—new safety-first merch arriving soon!',
  },

  // …repeat for Dolores, Bubbles, Fred, Rivet, etc.
]
