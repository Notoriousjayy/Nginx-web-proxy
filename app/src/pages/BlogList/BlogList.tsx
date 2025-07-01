import React from 'react'
import BlogCard    from '../../components/BlogCard'
import { Post, blogPosts } from '../../data/blogPosts'

export default function BlogList() {
  return (
    <div>
      {blogPosts.map((post: Post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
