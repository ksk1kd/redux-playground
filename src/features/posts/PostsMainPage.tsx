import { Link } from 'react-router-dom'

import { useAppSelector } from "../../app/hooks"
import { selectPostById, selectPostIds } from "./postsSlice"

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
  const postIds = useAppSelector(selectPostIds)

  const renderedPosts = postIds.map(postId => (
    <PostExcerpt key={postId} postId={postId} />
  ))

  return (
    <>
      <h1>Posts</h1>
      {renderedPosts}
      <Link to="/addPost">Add</Link>
    </>
  )
}