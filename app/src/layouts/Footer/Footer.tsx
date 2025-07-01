import React from 'react'

export const Footer: React.FC = () => {
  const robots = [
    { id: 'rex', name: 'Rex' },
    { id: 'dolores', name: 'Dolores' },
    { id: 'bubbles', name: 'Bubbles' },
    { id: 'fred', name: 'Fred' },
    { id: 'rivet', name: 'Rivet' },
    { id: 'eileen', name: 'Eileen' },
    { id: 'belle', name: 'Belle' },
    { id: 'cosmo', name: 'Cosmo' },
    { id: 'dolly', name: 'Dolly' },
    { id: 'sergeant', name: 'Sergeant' },
    { id: 'oscar', name: 'Oscar' },
    { id: 'levi', name: 'Levi' },
    { id: 'elton', name: 'Elton' },
    { id: 'spring', name: 'Spring' },
  ]

  const social = [
    { name: 'facebook', url: 'https://www.facebook.com/binaryville/' },
    { name: 'twitter', url: 'https://twitter.com/binaryville' },
    { name: 'instagram', url: 'https://www.instagram.com/binaryville/' },
    { name: 'linkedin', url: 'https://www.linkedin.com/company/binaryville' },
  ]

  return (
    <footer className="background-color:blue-c5e6f9 color:blue-324f6b padding-horizontal:8px padding-vertical:32px @mq-800--padding-vertical:64px">
      <div className="margin-horizontal:auto max-width:container padding-horizontal:32px">
        <h2 className="font-weight:500 font-size:28px line-height:1.142 margin-bottom:32px text-align:center @mq-800--font-size:36px @mq-800--font-weight:400 @mq-800--line-height:1.222 @mq-800--margin-bottom:48px">
          Meet the Robots
        </h2>

        <ul className="display:flex flex-wrap:wrap justify-content:center margin-horizontal:-16px margin-bottom:-32px">
          {robots.map(r => (
            <li
              key={r.id}
              className="display:flex flex-direction:column flex-grow:0 flex-shrink:0 margin-bottom:32px padding-horizontal:16px"
            >
              <a
                href={`/about/${r.id}/`}
                className="group color:blue-324f6b font-size:20px font-weight:500 line-height:1.2 text-align:center"
              >
                <span className="border-radius:1000 background-image:character-avatar display:inline-block margin-bottom:8px group:hocus__background-image:character-avatar-hocus">
                  <img
                    src={`/images/characters/${r.id}-disc.png`}
                    alt={`Image of ${r.name}`}
                    width={144}
                    height={144}
                    className="@mq-upto-384--size:character-avatar-small"
                  />
                </span>
                <span className="display:block group:hocus__color:orange-ff583d">
                  {r.name}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <nav className="margin-horizontal:-48px">
          <ul className="display:inline-flex justify-content:center flex-wrap:wrap margin-vertical:32px margin-horizontal:auto width:100% @mq-800--padding-top:8px">
            <li className="display:flex justify-content:center margin-bottom:32px width:100% @mq-800--order:1 @mq-800--width:auto">
              <a href="/" aria-label="Home">
                <img
                  src="/images/logo.svg"
                  alt="Binaryville logo"
                  width={170}
                  height={88}
                />
              </a>
            </li>
            {['About','Blog','Contact','Shop'].map(link => (
              <li key={link}>
                <a
                  href={
                    link === 'Shop'
                      ? '/shop'
                      : `/${link.toLowerCase()}/`
                  }
                  className="color:inherit font-size:20px font-weight:500 line-height:1.2 margin-horizontal:8px padding-horizontal:4px :hocus--color:orange-ff583d @mq-800--margin-horizontal:32px"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <h3 className="visually-hidden">Follow us</h3>
        <ul className="display:flex flex-wrap:wrap justify-content:center margin-horizontal:-8px margin-bottom:24px">
          {social.map(s => (
            <li key={s.name} className="padding-horizontal:8px margin-bottom:16px">
              <a
                href={s.url}
                aria-label={`Find us on ${s.name}`}
                className="color:blue-324f6b :hocus--color:orange-ff583d"
              >
                <svg
                  className="display:inline-block size:40px svg-fill-color:current"
                  focusable="false"
                >
                  <use xlinkHref={`#${s.name}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <p className="border-top-style:solid border-top-width:2px font-size:12px line-height:1.5 padding-top:24px @mq-800--font-size:14px @mq-800--line-height:1.285 @mq-800--text-align:center">
          This is a fictitious company created by LinkedIn Corporation, or its
          affiliates, solely for the creation and development of educational
          training materials. Any resemblance to real products or services is
          purely coincidental. Information provided about the products or
          services is also fictitious and should not be construed as
          representative of actual products or services on the market in a
          similar product or service category.
        </p>
      </div>
    </footer>
  )
}

export default Footer
