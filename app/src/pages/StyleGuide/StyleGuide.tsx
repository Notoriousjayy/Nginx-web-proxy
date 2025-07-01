import React from 'react';
import { styleGuideStyles } from './StyleGuideStyles';

// import your components
import { Button } from '../../components/Button';
import IconButton from '../../components/IconButton';
import SizePicker from '../../components/SizePicker';

// …import the other 29 stubs here…

export default function StyleGuide() {
  return (
    <main style={styleGuideStyles}>
      {/* BUTTON */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Button</h2>
        <div className="space-x-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      {/* ICON BUTTON */}
      <section>
        <h2 className="text-xl font-semibold mb-2">IconButton</h2>
        <div className="space-x-2">
          <IconButton icon="menu" aria-label="Open menu" />
          <IconButton icon="search" aria-label="Search" />
          <IconButton icon="cart" aria-label="Add to cart" />
        </div>
      </section>

      {/* SIZE PICKER */}
      <section>
        <h2 className="text-xl font-semibold mb-2">SizePicker</h2>
        <SizePicker
          availableSizes={['XS', 'S', 'M', 'L', 'XL']}
          selectedSize="M"
          onChange={(size) => console.log('picked', size)}
        />
      </section>

      {/* …repeat a <section> for each of the remaining atoms/molecules… */}
    </main>
  );
}
