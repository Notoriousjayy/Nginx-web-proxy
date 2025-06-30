import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <Link to="/" className="text-blue-600">Go back home</Link>
    </main>
  )
}
