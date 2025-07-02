// src/components/CharacterHero.tsx
import React from 'react'

export interface Character {
  id: string
  name: string
  bio: string
}

export interface CharacterHeroProps {
  character: {
    id: string
    name: string
    bio: string
    imageSrc: string   // pass in the URL here!
  }
}

export const CharacterHero: React.FC<CharacterHeroProps> = ({ character }) => {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${character.imageSrc})` }}
    >
      <div className="mx-auto max-w-container px-8 py-6 md:flex md:pt-3 md:pb-8">
        <div className="md:flex-1">
          <h2 className="text-2xl font-medium leading-tight mb-4 md:text-[40px] md:leading-[1.05] md:mt-12">
            {character.name}
          </h2>
          <p className="leading-normal">
            {character.bio}
          </p>
        </div>
        <div className="md:flex-1 text-center mt-6 md:mt-0">
          {/* If you still want an <img> fallback */}
          <img
            src={character.imageSrc}
            alt={`Hero shot of ${character.name}`}
            className="inline-block max-w-full h-auto"
            width={680}
            height={330}
          />
        </div>
      </div>
    </div>
  )
}
