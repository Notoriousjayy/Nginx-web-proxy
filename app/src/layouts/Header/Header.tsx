// src/layouts/Header.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// 1) Inline component via SVGR
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
// 2) As a URL
import logoUrl from '../../assets/images/logo.svg?url'

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pages = ['about', 'shop', 'blog', 'contact']

  return (
    <header className="bg-white shadow-sm">
      {/* Mobile */}
      <nav className="flex items-center justify-between p-4 md:hidden">
        <button
          aria-label="Toggle navigation"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((o) => !o)}
          className="p-2 text-neutral-700 hover:text-orange-500"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <use xlinkHref={mobileNavOpen ? '#cross' : '#hamburger'} />
          </svg>
        </button>

        <Link to="/" aria-label="Home">
          <Logo className="h-8 w-auto text-blue-600" />
        </Link>

        <Link to="/account" className="flex items-center space-x-2 text-neutral-700 hover:text-orange-500">
          <img src={logoUrl} alt="Account" className="h-4 w-auto" />
          <span>Account</span>
        </Link>
      </nav>

      {mobileNavOpen && (
        <nav className="md:hidden bg-white border-t border-neutral-200">
          <ul className="flex flex-col p-4 space-y-2">
            {pages.map((p) => (
              <li key={p}>
                <Link
                  to={`/${p}`}
                  className="block py-2 px-3 rounded hover:bg-neutral-100"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {p[0].toUpperCase() + p.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Desktop */}
      <nav className="hidden md:flex container mx-auto items-center justify-between p-4">
        <Link to="/" aria-label="Home">
          <Logo width={32} height={32} className="h-8 w-auto text-blue-600" />
        </Link>

        <ul className="flex space-x-6">
          {pages.map((p) => (
            <li key={p}>
              <Link to={`/${p}`} className="hover:text-orange-500">
                {p[0].toUpperCase() + p.slice(1)}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/account" className="flex items-center space-x-2 text-neutral-700 hover:text-orange-500">
          <img src={logoUrl} alt="Binaryville logo (from URL)" className="h-4 w-auto" />
          <span>Account</span>
        </Link>
      </nav>
    </header>
  )
}
