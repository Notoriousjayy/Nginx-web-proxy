import React from 'react'
import { Banner } from '../components/Banner'
import { BlogCard } from '../components/BlogCard'

export default function Home() {
  // TODO: replace with real data fetch
  const featuredPosts = [
    {
      title: 'Welcome to Binaryville',
      excerpt: 'Explore our catalog of robots & widgets…',
      date: '2025-06-01',
      slug: 'welcome'
    },
    {
      title: 'How to build a robot',
      excerpt: 'Step-by-step guide to assembling your first bot.',
      date: '2025-05-20',
      slug: 'build-a-robot'
    }
  ]

  return (
    <>
      <Banner message="Free shipping on all orders over $50!" />
      <main className="container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </section>
      </main>
    </>
  )
}
