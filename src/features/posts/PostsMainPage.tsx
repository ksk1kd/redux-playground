import { Link } from 'react-router-dom'

import { useAppSelector } from "../../app/hooks"
import {
  selectPosts,
} from "./postsSlice"

export const PostsMainPage = () => {
  const posts = useAppSelector(selectPosts)

  const renderedPosts = posts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <>
      <h1>Posts</h1>
      {renderedPosts}
    </>
  )
}