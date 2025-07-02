import { useEffect } from 'react';
// pull in the *URL* of the built sprite, not the JS module
import iconsUrl from '../../assets/images/icons.svg?url';

export default function SVGSpriteInjector() {
  useEffect(() => {
    const id = 'icons-svg';
    const path = iconsUrl;     // ← use the URL you just imported
    const xhr = new XMLHttpRequest();
    const div = document.createElement('div');
    document.body.insertBefore(div, document.body.firstChild);
    xhr.open('GET', path, true);
    xhr.onload = () => {
      div.id = id;
      div.innerHTML = xhr.responseText;
      div.className = 'visually-hidden';
    };
    xhr.onerror = () => {
      document.body.className += ' no-svg';
    };
    xhr.send();
  }, []);

  // nothing to render visibly
  return null;
}
