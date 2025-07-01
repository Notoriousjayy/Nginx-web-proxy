// src/components/CharacterAvatar/CharacterAvatar.tsx
import React from 'react'

export interface CharacterAvatarProps {
  /** Character’s display name */
  name: string
  /** Image URL for the character */
  src: string
  /** Alt text for the image (defaults to “Image of {name}”) */
  alt?: string
  /** Link URL to wrap the avatar in */
  href?: string
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  src,
  alt,
  href = '#',
}) => {
  const imgAlt = alt ?? `Image of ${name}`

  const content = (
    <a
      href={href}
      className="
        group
        text-blue-324f6b
        text-[20px]
        font-medium
        leading-[1.2]
        text-center
        inline-block
      "
    >
      <span
        className="
          block
          rounded-full
          bg-[url('/images/characters/character-avatar.png')]
          mb-[8px]
          group-hover:bg-[url('/images/characters/character-avatar-hocus.png')]
          inline-block
        "
      >
        <img
          src={src}
          alt={imgAlt}
          width={144}
          height={144}
          className="@mq-upto-384--w-[64px] @mq-upto-384--h-[64px]"
        />
      </span>
      <span className="block group-hover:text-orange-ff583d">{name}</span>
    </a>
  )

  return content
}

export default CharacterAvatar
