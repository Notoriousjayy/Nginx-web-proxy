// app/src/layouts/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/images/logo.svg';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex justify-between p-4">
        <Link to="/">
          <img src={logoUrl} alt="Binaryville" className="h-8" />
        </Link>
        <ul className="flex space-x-4">
          {['about', 'shop', 'blog', 'contact'].map((p) => (
            <li key={p}>
              <Link to={`/${p}`} className="hover:text-orange-500">
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/account">Account</Link>
      </nav>
    </header>
  );
}
