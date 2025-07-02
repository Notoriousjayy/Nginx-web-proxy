import { blogPosts } from '../../components/BlogCard'
import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  if (!category) return <p>Invalid category</p>

  // Filter posts whose comma-separated categories include this one (case-insensitive)
  const slug = decodeURIComponent(category).toLowerCase()
  const posts = blogPosts.filter(p =>
    p.category
      .split(',')
      .map(c => c.trim().toLowerCase())
      .includes(slug)
  )

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Category: {decodeURIComponent(category)}</h1>
      {posts.length === 0 ? (
        <p>No posts found in this category.</p>
      ) : (
        <ul>
          {posts.map(p => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`}>{p.title}</Link>
              {' — '}
              <small>{p.date}</small>
            </li>
          ))}
        </ul>
      )}
      <p>
        <Link to="/blog/categories">← Back to all categories</Link>
      </p>
    </main>
  )
}
