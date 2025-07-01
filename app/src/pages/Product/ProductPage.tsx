// src/pages/Product/ProductPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <div>Product detail for <strong>{slug}</strong></div>;
};