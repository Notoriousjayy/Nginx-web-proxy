// src/components/Avatar.tsx
import React from 'react';

export interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = '', size = 40 }) => (
  <img
    src={src}
    alt={alt}
    className="rounded-full object-cover"
    width={size}
    height={size}
  />
);