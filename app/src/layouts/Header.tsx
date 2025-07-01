// src/layouts/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// 1) Inline component:
// As a component (SVGR)
import { ReactComponent as Logo } from '../assets/images/logo.svg'

// As a URL
import logoUrl from '../assets/images/logo.svg?url'



console.log('Logo component:', Logo);
console.log('Logo URL:', logoUrl);

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/">
          {/* SVG as React component */}
          <Logo
            width={32}
            height={32}
            className="h-8 w-auto text-blue-600"
            aria-label="Binaryville logo"
          />
        </Link>

        <ul className="flex space-x-4">
          {['about','shop','blog','contact'].map((p) => (
            <li key={p}>
              <Link to={`/${p}`} className="hover:text-orange-500">
                {p[0].toUpperCase() + p.slice(1)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Example of using the static URL if you really need it */}
        <Link to="/account">
          <img src={logoUrl} alt="Binaryville logo (from URL)" className="h-4 w-auto ml-4"/>
          Account
        </Link>
      </nav>
    </header>
  );
}
