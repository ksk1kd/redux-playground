import type React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { postUpdated } from './postsSlice'

export const EditPostForm = () => {
  const { postId } = useParams()

  const post = useAppSelector(state =>
    state.posts.posts.find(post => post.id === postId)
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onSavePostClicked = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent server submission
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get('postTitle') as string
    const content = formData.get('postContent') as string

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      void navigate(`/posts/${postId ?? ""}`) 
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <div>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            defaultValue={post.title}
            required
            />
        </div>
        <div>
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            defaultValue={post.content}
            required
            />
        </div>

        <button>Save Post</button>
      </form>
    </section>
  )
}