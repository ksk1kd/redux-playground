import type React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from "../../app/hooks"

import { postAdded } from './postsSlice'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
type AddPostFormFields = {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
} & HTMLFormControlsCollection
type AddPostFormElements = {
  readonly elements: AddPostFormFields
} & HTMLFormElement

export const AddPostForm = () => {
  const navigate = useNavigate()

  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    dispatch(postAdded(title, content))
    void navigate("/posts") 
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="postTitle">Post Title:</label>
          <input type="text" id="postTitle" defaultValue="" required />
        </div>
        <div>
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            defaultValue=""
            required
          />
        </div>
        <button>Save Post</button>
      </form>
    </section>
  )
}