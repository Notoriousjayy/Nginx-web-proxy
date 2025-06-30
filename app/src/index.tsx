// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// If you're targeting older browsers, you might need to import a polyfill for fetch, etc.
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

