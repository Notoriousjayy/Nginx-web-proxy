// BlogList.tsx
import React from 'react';
import BlogCard from '../../components/BlogCard';
import { Post, blogPosts } from '../../data/blogPosts';
import { blogListStyles } from './BlogListStyles';

export default function BlogList() {
  return (
    <div style={blogListStyles}>
      {blogPosts.map((post: Post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
