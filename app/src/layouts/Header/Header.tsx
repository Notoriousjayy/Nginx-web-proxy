// src/layouts/Header/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '../../components/Accordion';
import { IconButton } from '../../components/IconButton';
import { ReactComponent as Logo } from '../../assets/images/logo.svg'

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pages = ['about', 'shop', 'blog', 'contact'];
  const cartQuantity = 0; // your cart hook/context

  return (
    <header>
      {/* Mobile Nav */}
      <nav className="flex justify-between p-4 md:hidden">
        <IconButton
          aria-label="Toggle navigation"
          onClick={() => setMobileNavOpen(o => !o)}
          iconName={mobileNavOpen ? 'cross' : 'hamburger'}
        />

        <Link to="/" aria-label="Home">
          <svg className="h-8 w-auto" aria-hidden="true">
            <Logo className="h-8 w-auto" aria-hidden="true" />
          </svg>
        </Link>

        <Link to="/cart" aria-label="Cart">
          <IconButton iconName="cart" badge={cartQuantity} />
        </Link>
      </nav>

      {mobileNavOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <Accordion
            items={[{
              title: 'Menu',
              content: (
                <ul>
                  {pages.map(p => (
                    <li key={p}>
                      <Link
                        to={`/${p}`}
                        onClick={() => setMobileNavOpen(false)}
                        className="block py-2"
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            }]}
          />
        </div>
      )}

      {/* Desktop Nav */}
      <nav className="hidden md:flex justify-between items-center p-4">
        <Link to="/" aria-label="Home">
          <svg className="h-8 w-auto" aria-hidden="true">
            <Logo className="h-8 w-auto" aria-hidden="true" />
          </svg>
        </Link>

        <ul className="flex space-x-6">
          {pages.map(p => (
            <li key={p}>
              <Link to={`/${p}`} className="hover:text-orange-500 capitalize">
                {p}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <Link to="/account" className="hover:text-orange-500" aria-label="Account">
            Account
          </Link>
          <Link to="/cart" aria-label="Cart">
            <IconButton iconName="cart" badge={cartQuantity} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
