// src/components/SVGSpriteInjector.tsx
import { useEffect } from 'react';
// pull in the *URL* of the built sprite, not the JS module
import iconsUrl from '../../assets/images/icons.svg?url';
import { IconButton } from '../../components/IconButton';

export default function SVGSpriteInjector() {
  useEffect(() => {
    const SPRITE_ID = IconButton.name;

    // if we've already injected once, do nothing
    if (document.getElementById(SPRITE_ID)) {
      return;
    }

    // create a placeholder DIV at the top of <body>
    const div = document.createElement('div');
    document.body.insertBefore(div, document.body.firstChild);

    // fetch and inline the sprite
    const xhr = new XMLHttpRequest();
    xhr.open('GET', iconsUrl, true);
    xhr.onload = () => {
      div.id = SPRITE_ID;
      div.innerHTML = xhr.responseText;
      div.className = 'visually-hidden';
    };
    xhr.onerror = () => {
      document.body.classList.add('no-svg');
    };
    xhr.send();
  }, []);

  return null;
}
