// app/src/App.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './layouts/Header';
import RequireAuth from './routes/RequireAuth';

// default‐exported pages
const HomePage           = React.lazy(() => import('./pages/Home'));
const AboutPage          = React.lazy(() => import('./pages/About'));
const BlogListPage       = React.lazy(() => import('./pages/BlogList'));
const BlogPostPage       = React.lazy(() => import('./pages/BlogPost'));
const BlogCategoriesPage = React.lazy(() => import('./pages/BlogCategories'));
const ShopPage           = React.lazy(() => import('./pages/Shop'));
const AccountPage        = React.lazy(() => import('./pages/Account'));
const ContactPage        = React.lazy(() => import('./pages/Contact'));
const ForbiddenPage      = React.lazy(() => import('./pages/Errors/Forbidden'));
const ServerErrorPage    = React.lazy(() => import('./pages/Errors/ServerError'));
const NotFoundPage       = React.lazy(() => import('./pages/NotFound/NotFound'));

// named‐exported pages
const CartPage = React.lazy(() =>
  import('./pages/Cart/CartPage').then(mod => ({ default: mod.CartPage }))
);
const CheckoutPage = React.lazy(() =>
  import('./pages/Checkout/CheckoutPage').then(mod => ({ default: mod.CheckoutPage }))
);
const CheckoutFieldsPage = React.lazy(() =>
  import('./pages/Checkout/CheckoutFieldsPage').then(mod => ({ default: mod.CheckoutFieldsPage }))
);
const CheckoutSuccessPage = React.lazy(() =>
  import('./pages/Checkout/CheckoutSuccessPage').then(mod => ({ default: mod.CheckoutSuccessPage }))
);
const ProductPage = React.lazy(() =>
  import('./pages/Product/ProductPage').then(mod => ({ default: mod.ProductPage }))
);

// private page (default export)
const PrivatePage = React.lazy(() =>
  import('./pages/Private/Private')
);

export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
          <Routes>

            {/* public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* blog */}
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/categories" element={<BlogCategoriesPage />} />
            <Route path="/blog/categories/:category" element={<BlogCategoriesPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* shop */}
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* checkout */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/fields" element={<CheckoutFieldsPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />

            {/* misc */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* private */}
            <Route
              path="/private"
              element={
                <RequireAuth>
                  <PrivatePage />
                </RequireAuth>
              }
            />

            {/* errors */}
            <Route path="/403" element={<ForbiddenPage />} />
            <Route path="/500" element={<ServerErrorPage />} />

            {/* fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
