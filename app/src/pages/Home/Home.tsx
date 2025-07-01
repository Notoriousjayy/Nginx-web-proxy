// src/pages/Home/Home.tsx
import React from 'react'
import { Banner } from '../../components/Banner'
import { BlogCard } from '../../components/BlogCard'
import { blogPosts } from '../../data/blogPosts'

export default function Home() {
  return (
    <div className="space-y-8">
      <Banner content="Your order qualifies for Free&nbsp;Shipping!" />

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
