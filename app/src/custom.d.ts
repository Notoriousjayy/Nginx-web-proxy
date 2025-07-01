// src/custom.d.ts

// “plain” SVG imports → URL string
declare module '*.svg' {
  // the default export is just the URL of the file
  const src: string;
  export default src;
}


// “?react” SVG imports → default-exported React component
declare module '*.svg?react' {
  import * as React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
