import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchPosts, selectPostById, selectPostIds, selectPostsStatus, selectPostsError } from "./postsSlice"

type PostExcerptProps = {
  postId: string
}

function PostExcerpt({ postId }: PostExcerptProps) {
  const post = useAppSelector(state => selectPostById(state, postId))

  return (
    <article className="post-excerpt" key={post.id}>
      <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  )
}

export const PostsMainPage = () => {
  const dispatch = useAppDispatch()
  const postIds = useAppSelector(selectPostIds)
  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      void dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <p>Loading...</p>
  } else if (postStatus === 'succeeded') {
    content = postIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <p>{postsError}</p>
  }

  return (
    <>
      <h1>Posts</h1>
      {content}
      <Link to="/addPost">Add</Link>
    </>
  )
}