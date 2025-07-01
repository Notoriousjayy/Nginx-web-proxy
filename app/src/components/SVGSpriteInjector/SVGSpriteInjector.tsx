// src/components/SVGSpriteInjector.tsx
import { useEffect } from 'react';

export default function SVGSpriteInjector() {
  useEffect(() => {
    const id = 'icons-svg';
    const path = '/images/icons.svg';
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
  return null;
}
