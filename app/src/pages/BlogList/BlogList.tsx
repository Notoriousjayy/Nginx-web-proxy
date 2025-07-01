// src/pages/BlogList/BlogList.tsx
import React from 'react'
import { BlogCard } from '../../components/BlogCard'
import { blogPosts } from '../../data/blogPosts'

export default function BlogList() {
  return (
    <div className="space-y-6">
      {blogPosts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
