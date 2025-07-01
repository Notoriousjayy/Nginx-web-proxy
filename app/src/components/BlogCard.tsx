// src/components/BlogCard.tsx
import React from 'react';
import { Post } from '../data/blogPosts';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: Post;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
  <div className="border rounded-lg p-4 hover:shadow-lg transition">
    <h2 className="text-2xl font-semibold mb-2">
      <Link to={`/blog/${encodeURIComponent(post.slug)}`}>{post.title}</Link>
    </h2>
    <p className="text-sm text-gray-600 mb-4">{post.date}</p>
    <p className="text-gray-800">{post.content.substring(0, 100)}…</p>
    <Link
      to={`/blog/${encodeURIComponent(post.slug)}`}
      className="mt-4 inline-block text-blue-600 hover:underline"
    >
      Read more →
    </Link>
  </div>
);

export default BlogCard;
