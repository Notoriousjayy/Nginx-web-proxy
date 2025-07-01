// src/components/BlogCard/BlogCard.tsx
import React from 'react'
import type { Post as DataPost } from '../../data/blogPosts'

export interface BlogCardProps {
  post: DataPost
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { slug, title, date, content, category } = post
  const href = `/${slug}`

  return (
    <a
      href={href}
      className="
        group
        flex
        flex-col
        border
        text-neutral-222224
        hover:shadow-lg
        transition
      "
    >
      <div className="px-4 py-4 flex-1">
        <p className="text-[24px] leading-[1.166] mb-[4px]">{title}</p>
        <p className="text-sm text-gray-500 mb-[12px]">
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="leading-[1.5]">{content}</p>
      </div>

      <div className="
        px-4
        py-2
        bg-blue-265f8e
        text-neutral-ffffff
        text-center
        font-bold
      ">
        Read more
      </div>
    </a>
  )
}

export default BlogCard
