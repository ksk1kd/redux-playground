import type { PayloadAction , EntityState} from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '../../app/withTypes'
import { fetchMockPosts } from './postsAPI';

// Define a TS type for the data we'll be using
export type Post = {
  id: string
  title: string
  content: string
}

type PostsState = {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
} & EntityState<Post, string>

const postsAdapter = createEntityAdapter<Post>()

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts', 
  async () => {
    const response = await fetchMockPosts()
    return response.data
  },
  {
    condition(_, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  }
)

const initialState: PostsState = postsAdapter.getInitialState({
  posts: [],
  status: 'idle',
  error: null
})

// Create the slice and pass in the initial state
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        const { id, title, content } = action.payload
        postsAdapter.updateOne(state, { id, changes: { title, content } })
      },
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content }
        }
      }
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      existingPost.title = title
      existingPost.content = content
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectPosts: state => state.entities,
    selectPostIds: state => Object.keys(state.entities),
    selectPostById: (state, postId: string) => state.entities[postId],
    selectPostsStatus: (state) => state.status,
    selectPostsError: (state) => state.error
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export const { selectPosts, selectPostIds, selectPostById, selectPostsStatus, selectPostsError } = postsSlice.selectors
