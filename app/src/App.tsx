import React from 'react';
// if App.tsx lives in app/src/
import SVGSpriteInjector from './components/SVGSpriteInjector/SVGSpriteInjector';
import Header from './layouts/Header';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <>
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
