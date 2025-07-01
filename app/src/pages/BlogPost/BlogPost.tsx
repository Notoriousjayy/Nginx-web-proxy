// app/src/pages/BlogPost.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { blogPosts } from '../../data/blogPosts'
import NotFound from './../NotFound'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <NotFound />

  return (
    <main className="container mx-auto px-4 py-8 prose">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-500">{post.date}</time>
      <div
        className="mt-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  )
}
