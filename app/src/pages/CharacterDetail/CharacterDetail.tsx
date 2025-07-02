  // src/pages/CharacterDetail.tsx
  import React from 'react'
  import { useParams } from 'react-router-dom'
  import { characters } from '../../data/characters'
  import { CharacterHero } from '../../components/CharacterHero'

  export default function CharacterDetail() {
    const { id } = useParams<{ id: string }>()
    const character = characters.find(c => c.id === id)

    if (!character) {
      return <div>Character not found</div>
    }

    return (
      <CharacterHero
        character={{
          id: character.id,
          name: character.name,
          bio: character.bio,
          imageSrc: character.heroImage,
        }}
      />
    )
  }
