// src/components/CharacterCallout/CharacterCallout.tsx
import React from 'react'

export interface Character {
  id: string
  name: string
  bio: string
}

export interface CharacterCalloutProps {
  character: Character
}

export const CharacterCallout: React.FC<CharacterCalloutProps> = ({ character }) => (
  <div className="p-2">
    <div
      className="
        border-solid border-[10px] border-[#00bff3]
        px-8 pt-8
        md:flex md:px-8 md:pt-0 md:pr-0
      "
    >
      <div className="md:flex-1">
        <h2
          className="
            text-[28px] font-medium leading-[1.142] mb-4
            md:mt-8
          "
        >
          {character.name}
        </h2>
        <p
          className="
            text-[14px] leading-[1.285]
            md:text-[16px] md:leading-[1.375]
          "
          dangerouslySetInnerHTML={{ __html: character.bio }}
        />
      </div>

      <div className="text-center md:flex-shrink-0">
        <img
          src={`/images/characters/${character.id}-callout.png`}
          alt={`Image of ${character.name}`}
          width={240}
          height={220}
        />
      </div>
    </div>
  </div>
)
