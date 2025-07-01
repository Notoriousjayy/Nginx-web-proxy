// src/components/Icon.tsx
import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;              // filename without “.svg”
  size?: number | string;    // e.g. 24 or "1.5rem"
  className?: string;
}

const SPRITE_PATH = '/sprite.svg'; // matches your webpack output

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className,
  ...svgProps
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    aria-hidden="true"
    {...svgProps}
  >
    <use href={`${SPRITE_PATH}#${name}`} />
  </svg>
);

export default Icon;
