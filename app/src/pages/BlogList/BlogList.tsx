// src/pages/BlogList/BlogList.tsx
import React from 'react'
import { BlogCard, blogPosts, Post } from '../../components/BlogCard'

export default function BlogList() {
  return (
    <div className="space-y-6">
      {blogPosts.map((post: Post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
