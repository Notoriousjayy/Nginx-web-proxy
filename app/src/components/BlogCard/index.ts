// src/components/BlogCard/index.ts

// 1) your component
export { default as BlogCard, BlogCardProps } from './BlogCard'

// 2) re-export the runtime data array
export { blogPosts } from '../../data/blogPosts'

// 3) re-export the shared type so callers can annotate
export type { Post } from '../../data/blogPosts'

// (no need for a `export { default }` here if you're already exporting BlogCard above)
