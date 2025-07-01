// src/data/blogPosts.ts

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  category: string;
}

export const blogPosts: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    date: '2025-06-01',
    content: 'Welcome to my first post! This is the body text.',
    category: 'General',
  },
  {
    slug: 'advanced-routing',
    title: 'Advanced React-Router Patterns',
    date: '2025-06-15',
    content: 'Let’s dive into nested and dynamic routes…',
    category: 'React',
  },
  // …add the rest of your posts with a `category` field…
];
