import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, nanoid } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '../../app/withTypes'
import { fetchMockPosts } from './postsAPI';

// Define a TS type for the data we'll be using
export type Post = {
  id: string
  title: string
  content: string
}

type PostsState = {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetchMockPosts()
  return response.data
})

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
}

// Create the slice and pass in the initial state
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
      },
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content }
        }
      }
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectPosts: state => state.posts,
    selectPostById: (state, postId: string) => state.posts.find(post => post.id === postId),
    selectPostsStatus: (state) => state.status,
    selectPostsError: (state) => state.error
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export const { selectPosts, selectPostById, selectPostsStatus, selectPostsError } = postsSlice.selectors
