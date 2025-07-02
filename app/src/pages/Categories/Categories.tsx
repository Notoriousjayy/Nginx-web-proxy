// src/pages/Categories/Categories.tsx
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../../components/BlogCard'

export default function BlogCategoriesPage() {
  // grab the “category” param to know which page we’re on
  const { category } = useParams<{ category: string }>()

  // Collect every category from every post
  const allCategories = blogPosts
    .flatMap(p => p.category.split(',').map(c => c.trim()))
  // Deduplicate & sort
  const categories = Array.from(new Set(allCategories)).sort()

  // Filter posts for this category (or show all)
  const filteredPosts = category && category !== 'all'
    ? blogPosts.filter(p =>
        p.category
         .split(',')
         .map(c => c.trim())
         .includes(category)
      )
    : blogPosts

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Blog Categories</h1>

      {/* category nav */}
      <nav>
        <ul>
          {['all', ...categories].map(cat => (
            <li key={cat}>
              <Link
                to={`/blog/categories/${encodeURIComponent(cat)}`}
                style={{
                  fontWeight: cat === (category || 'all') ? 'bold' : undefined
                }}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* posts list */}
      <section>
        {filteredPosts.length > 0 ? (
          <ul>
            {filteredPosts.map(post => (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts in “{category}”</p>
        )}
      </section>
    </main>
  )
}
