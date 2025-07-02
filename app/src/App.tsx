import React from 'react';
import SVGSpriteInjector from './components/SVGSpriteInjector/SVGSpriteInjector';
import Header from './layouts/Header';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <>
      {/* Inject your SVG sprite sheet once at the top */}
      <SVGSpriteInjector />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
      </div>
    </>
  );
}
