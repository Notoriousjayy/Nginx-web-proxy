// src/components/BlogCategories/BlogCategories.tsx
import React from 'react'

export interface BlogCategoriesProps {
  /** List of category names (e.g. ["Automation","Lifestyle",...]) */
  categories: string[]
  /** Currently-selected category, if any */
  selected?: string
  /** Base path for category links (e.g. "/blog/categories") */
  basePath?: string
}

export const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  selected,
  basePath = '/blog/categories',
}) => {
  return (
    <nav className="text-[20px] font-medium mb-[24px]">
      <ul className="flex flex-wrap">
        {categories.map((cat) => {
          const isSelected = cat === selected
          return (
            <li key={cat} className="mb-[8px] mr-[24px]">
              <a
                href={`${basePath}/${encodeURIComponent(cat)}/`}
                className={`
                  inline-block
                  text-blue-265f8e
                  hover:underline
                  ${isSelected ? 'text-orange-ff583d' : ''}
                `}
                aria-selected={isSelected ? 'true' : 'false'}
              >
                {cat}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BlogCategories
