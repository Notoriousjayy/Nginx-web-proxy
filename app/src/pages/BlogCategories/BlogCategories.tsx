// src/pages/BlogCategories/BlogCategories.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import { categoriesListStyles } from './BlogCategoriesStyles';

export default function BlogCategories() {
  const categories = Array.from(new Set(blogPosts.map(p => p.category)));

  return (
    <div style={categoriesListStyles}>
      {categories.map(cat => {
        const slug = encodeURIComponent(cat.toLowerCase());
        return (
          <Link
            key={cat}
            to={`/blog/categories/${slug}`}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
