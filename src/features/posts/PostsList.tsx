import { Link } from 'react-router-dom'

import type { Post } from '../api/apiSlice';
import { useGetPostsQuery } from '../api/apiSlice'

type PostExcerptProps = {
  post: Post
}

function PostExcerpt({ post }: PostExcerptProps) {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  )
}

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  let content: React.ReactNode

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}