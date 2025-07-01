// Home.tsx
import React from 'react';
import Banner from '../../components/Banner';
import BlogCard from '../../components/BlogCard';
import { blogPosts } from '../../data/blogPosts';
import { homeStyles } from './HomeStyles';

export default function Home() {
  return (
    <div style={homeStyles}>
      <Banner />
      <div className="posts">
        {blogPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
