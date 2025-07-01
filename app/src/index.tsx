// app/src/index.tsx
import '../style/index.css'; // ← import your global CSS (Tailwind, etc.)

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import '../style/index.css';
import { AuthProvider } from './contexts/AuthContext';

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
    <AuthProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
