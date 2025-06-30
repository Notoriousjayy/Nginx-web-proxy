import React from 'react'
import { Icon } from './Icon'

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
}

export function BlogCard({ title, excerpt, date, slug }: BlogCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm">
      <header className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <time className="text-gray-500 text-sm">{date}</time>
      </header>
      <p className="px-4 pb-4">{excerpt}</p>
      <footer className="px-4 pb-4">
        <a href={`/blog/${slug}`} className="inline-flex items-center text-blue-600">
          Read more <Icon name="arrow-right" className="ml-1 w-4 h-4" />
        </a>
      </footer>
    </article>
  )
}
