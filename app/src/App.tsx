import React from 'react';
import SVGSpriteInjector from './components/SVGSpriteInjector/SVGSpriteInjector';

import { AppRoutes } from './routes';


export default function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <AppRoutes />
        </main>
      </div>
  );
}
