// BlogListStyles.ts
import { CSSProperties } from 'react';

export const blogListStyles: CSSProperties = {
  display: 'grid',
  gap: '1.5rem',
  gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
};
