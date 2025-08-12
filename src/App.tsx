import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import "./App.css"
import { PostsList } from "./features/posts/PostsList"
import { PostsMainPage } from './features/posts/PostsMainPage'
import { SinglePostPage } from './features/posts/SinglePostPage'

export const App = () => (
  <Router>
    <div className="App">
      <header>
        <nav>
          <a href="/">Home</a> <a href="/posts">Posts</a>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<PostsList />}></Route>
        <Route path="/posts" element={<PostsMainPage />}></Route>
        <Route path="/posts/:postId" element={<SinglePostPage />} />
      </Routes>
    </div>
  </Router>
)
