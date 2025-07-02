import React from 'react';
import { AppRoutes } from './routes';
import { MerchandiseBanner } from './components/MerchandiseBanner';


export default function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
        <MerchandiseBanner
            heading="Free Shipping!"
            content="Enjoy free shipping on all orders over $50."
            button={{ href: '/shop', label: 'Shop Now' }}
            color="yellow"
          />
          <AppRoutes />
        </main>
      </div>
  );
}
