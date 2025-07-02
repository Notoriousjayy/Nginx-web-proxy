// src/components/SVGSpriteInjector/SVGSpriteInjector.tsx
import React, { useEffect } from 'react'
// pull in the *URL* of the built sprite, not the JS module
import iconsUrl from '../../assets/images/icons.svg?url'

const SPRITE_ID = 'svg-sprite'

const SVGSpriteInjector: React.FC = () => {
  useEffect(() => {
    // already injected?
    if (document.getElementById(SPRITE_ID)) return

    fetch(iconsUrl)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load sprite: ${res.status}`)
        return res.text()
      })
      .then(svgText => {
        const container = document.createElement('div')
        container.id = SPRITE_ID
        container.setAttribute('aria-hidden', 'true')

        container.style.position = 'absolute'
        container.style.width    = '0'
        container.style.height   = '0'
        container.style.overflow = 'hidden'

        container.classList.add('visually-hidden')
        container.innerHTML = svgText

        const rootEl = document.getElementById('root')
        if (rootEl) document.body.insertBefore(container, rootEl)
      })
      .catch(err => {
        console.warn('SVG sprite injection failed:', err)
        document.body.classList.add('no-svg')
      })
  }, [])

  return null
}

export default SVGSpriteInjector
