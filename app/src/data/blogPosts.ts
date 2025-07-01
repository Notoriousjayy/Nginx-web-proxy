export interface Post {
  slug: string
  title: string
  date: string
  content: string         // ← add this
  // any other fields…
}

export const blogPosts: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello world',
    date: '2025-06-01',
    content: 'Welcome to my first post! This is the body text.'   // ← add content
  },
  // …more posts
]
