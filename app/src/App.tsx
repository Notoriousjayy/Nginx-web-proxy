import React from 'react';
import { Routes, Route } from 'react-router-dom';

// public pages
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import BlogListPage from './pages/BlogList';
import BlogPostPage from './pages/BlogPost';
import BlogCategoriesPage from './pages/BlogCategories';
import ShopPage from './pages/Shop';
import AccountPage from './pages/Account';
import ContactPage from './pages/Contact';

// commerce
import { CartPage }            from './pages/Cart/CartPage';
import { CheckoutPage }        from './pages/Checkout/CheckoutPage';
import { CheckoutFieldsPage }  from './pages/Checkout/CheckoutFieldsPage';
import { CheckoutSuccessPage } from './pages/Checkout/CheckoutSuccessPage';
import { ProductPage }         from './pages/Product/ProductPage';

// errors
import ForbiddenPage    from './pages/Errors/Forbidden';
import ServerErrorPage  from './pages/Errors/ServerError';
import NotFoundPage     from './pages/NotFound/NotFound';

export default function App() {
  return (
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

      {/* errors */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />

      {/* fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
