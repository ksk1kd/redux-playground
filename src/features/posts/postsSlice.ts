import { createSlice } from '@reduxjs/toolkit'

// Define a TS type for the data we'll be using
export type Post = {
  id: string
  title: string
  content: string
}

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

// Create the slice and pass in the initial state
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
})
