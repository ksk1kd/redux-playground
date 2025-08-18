import { nanoid } from '@reduxjs/toolkit'

import { type Post } from "./postsSlice"

export const fetchMockPosts = (): Promise<{ data: Post[] }> => {
  const posts: Post[] = [
    {
      id: nanoid(),
      title: 'sample1',
      content: 'sample1 content'
    },
    {
      id: nanoid(),
      title: 'sample2',
      content: 'sample2 content'
    },
    {
      id: nanoid(),
      title: 'sample3',
      content: 'sample3 content'
    }
  ]
  
  return new Promise<{ data: Post[] }>(resolve =>
    setTimeout(() => {
      resolve({ data: posts })
    }, 500),
  )
}
