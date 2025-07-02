// src/components/BlogPost/BlogPost.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts, Post as DataPost } from '../../data/blogPosts';
import NotFound from '../NotFound';
import { blogPostStyles } from './BlogPostStyles';

// re-export the data type for others to consume
export type Post = DataPost;

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return <NotFound />;

  return (
    <main style={blogPostStyles} className="container mx-auto px-4 py-8 prose">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>
      {post.content.split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </main>
  );
}
