import { http, HttpResponse } from 'msw'
import type { Post } from './apiSlice'

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the content of the first post. It contains some sample text to demonstrate the post structure.'
  },
  {
    id: '2',
    title: 'Learning Redux Toolkit',
    content: 'Redux Toolkit makes Redux development much easier with its simplified API and built-in best practices.'
  },
  {
    id: '3',
    title: 'React Router Basics',
    content: 'React Router enables client-side routing in React applications, allowing for single-page application navigation.'
  },
  {
    id: '4',
    title: 'TypeScript Benefits',
    content: 'TypeScript adds static typing to JavaScript, helping catch errors at compile time and improving code quality.'
  },
  {
    id: '5',
    title: 'Modern React Development',
    content: 'Modern React development involves hooks, functional components, and tools like Vite for fast development.'
  }
]

export const handlers = [
  // Handle GET /api/posts
  http.get('/api/posts', () => {
    return HttpResponse.json(mockPosts)
  }),
]