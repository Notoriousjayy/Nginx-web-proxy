// Blog.tsx
import React from 'react';
import BlogList from '../BlogList';
import { blogStyles } from './BlogStyles';

export default function Blog() {
  return (
    <div style={blogStyles}>
      <BlogList />
    </div>
  );
}
