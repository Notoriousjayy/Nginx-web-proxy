// src/pages/Private/Private.tsx
import React from 'react';

const PrivatePage: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl mb-4">🔒 Private Area</h1>
    <p>Only logged-in users can see this.</p>
  </div>
);

export default PrivatePage;
