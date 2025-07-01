// src/components/AvatarGroup.tsx
import React from 'react';
import { Avatar } from './Avatar';

export interface AvatarGroupProps {
  images: { src: string; alt?: string }[];
  max?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ images, max = 3 }) => {
  const visible = images.slice(0, max);
  return (
    <div className="flex -space-x-2">
      {visible.map((img, i) => (
        <Avatar key={i} {...img} size={32} />
      ))}
      {images.length > max && (
        <span className="px-2 bg-gray-200 rounded-full text-sm">
          +{images.length - max}
        </span>
      )}
    </div>
  );
};
