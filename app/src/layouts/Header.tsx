import React from 'react';
import { Link } from 'react-router-dom';

// plain URL string, courtesy of asset/resource
import logoUrl from '../assets/images/logo.svg';

console.log(logoUrl)
export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img
            src={logoUrl}
            alt="Binaryville logo"
            className="h-8 w-auto"
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

        <Link to="/account">Account</Link>
      </nav>
    </header>
  );
}
