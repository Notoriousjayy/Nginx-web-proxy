import React from 'react'
import Banner      from '../../components/Banner'
import BlogCard    from '../../components/BlogCard'
import { Post, blogPosts } from '../../data/blogPosts'

export default function Home() {
  return (
    <>
      <Banner />
      <div className="posts">
        {blogPosts.map((post: Post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
