import React from 'react'
import { Post } from '../data/blogPosts'

type BlogCardProps = { post: Post }

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card">
      <h2>{post.title}</h2>
      <p>{post.date}</p>
    </article>
  )
}
