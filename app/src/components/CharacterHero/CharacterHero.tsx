import React from 'react'

export interface Character {
  id: string
  name: string
  bio: string
}

export interface CharacterHeroProps {
  character: Character
}

export const CharacterHero: React.FC<CharacterHeroProps> = ({ character }) => {
  return (
    <div className={`bg-[image:var(--${character.id}-hero)]`}>
      <div className="mx-auto max-w-container px-8 py-6 md:flex md:pt-3 md:pb-8">
        <div>
          <h2 className="text-2xl font-medium leading-[1.142] mb-4 md:text-[40px] md:leading-[1.05] md:mt-12">
            {character.name}
          </h2>
          <p className="leading-[1.375]">
            {character.bio}
          </p>
        </div>
        <div className="text-center">
          <img
            className="md:max-w-full md:h-auto"
            src={`/images/characters/${character.id}-hero.png`}
            alt={`Three images of ${character.name}`}
            width={680}
            height={330}
          />
        </div>
      </div>
    </div>
  )
}
