// src/App.tsx
import React from 'react'

import Header from './layouts/Header'
import { AppRoutes } from './routes'

// no more BrowserRouter here!
export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  )
}
