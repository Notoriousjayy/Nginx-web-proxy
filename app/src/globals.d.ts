// src/globals.d.ts

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}
