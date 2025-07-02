// src/components/Footer.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { characters } from '../../data/characters'
import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg'

export const Footer: React.FC = () => {
  const social = [
    { name: 'facebook', url: 'https://www.facebook.com/binaryville/' },
    { name: 'twitter',   url: 'https://twitter.com/binaryville' },
    { name: 'instagram', url: 'https://www.instagram.com/binaryville/' },
    { name: 'linkedin',  url: 'https://www.linkedin.com/company/binaryville' },
  ]

  return (
    <footer className="bg-blue-c5e6f9 text-blue-324f6b py-8 md:py-16">
      <div className="mx-auto max-w-container px-8">
        <h2 className="font-medium text-2xl mb-8 text-center md:text-3xl">
          Meet the Robots
        </h2>

        <ul className="flex flex-wrap justify-center -mx-4 -mb-8">
          {characters.map(r => (
            <li key={r.id} className="px-4 mb-8 flex flex-col items-center">
              {/* 👇 link directly into your CharacterDetail route */}
              <Link
                to={`/characters/${r.id}`}
                className="group text-center font-medium text-lg"
              >
                <span className="inline-block rounded-full overflow-hidden mb-2 group-hover:shadow-lg">
                  <img
                    src={r.thumbnail}
                    alt={`Avatar of ${r.name}`}
                    width={144}
                    height={144}
                  />
                </span>
                <span className="block group-hover:text-orange-ff583d">
                  {r.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <nav className="text-center mb-8">
          <Link to="/" aria-label="Home" className="inline-block mb-4">
            <LogoIcon className="w-[170px] h-auto" aria-hidden="true" />
          </Link>
          <ul className="inline-flex space-x-4">
            {['About','Blog','Contact','Shop'].map(link => (
              <li key={link}>
                <Link
                  to={ link === 'Shop' ? '/shop' : `/${link.toLowerCase()}` }
                  className="font-medium hover:text-orange-ff583d"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <h3 className="sr-only">Follow us</h3>
        <ul className="flex justify-center space-x-4 mb-8">
          {social.map(s => (
            <li key={s.name}>
              <a
                href={s.url}
                aria-label={`Find us on ${s.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-ff583d"
              >
                <svg className="w-10 h-10 fill-current">
                  <use xlinkHref={`#${s.name}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <p className="border-t pt-6 text-sm leading-relaxed text-center">
          This is a fictitious company created by LinkedIn Corporation…
        </p>
      </div>
    </footer>
  )
}

export default Footer
