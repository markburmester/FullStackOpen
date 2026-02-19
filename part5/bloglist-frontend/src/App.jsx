import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
import './assets/styles-refactored.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login({
        username, password
      })
      const userObject = {
        username: response.username,
        name: response.name,
        token: response.token
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(userObject))
      setUser(userObject)
      setUsername('')
      setPassword('')
      console.log('Successful login for:', response.username)
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Authentication error'
      setMessage(errorMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log('Authentication error:', errorMessage)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleAddBlog = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData, user.token)
      newBlog.user = user
      setBlogs(blogs.concat(newBlog))
      setMessage(`Blog '${newBlog.title}' created successfully`)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log('Blog created:', newBlog.title)
    } catch (exception) {
      console.log('Error creating blog:', exception.response.data.error)
    }
  }

  const handleAddLike = async (blogData) => {
    if(user){
      try {
        await blogService.update(blogData, user.token)

      } catch (exception) {
        const errorMessage = exception.response?.data?.error || exception.message || 'Error liking blog'
        console.log('Error when liking blog:', errorMessage)
      }
    }
  }

  const handleRemove = async (blogData) => {
    try {
      await blogService.remove(blogData, user.token)
      setBlogs(blogs.filter(blog => blog.id !== blogData.id))
      setMessage(`Blog '${blogData.title}' removed successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('Error when removing blog:', exception.response.data.error)
    }
  }

  if (user === null) {
    return (
      <div className="app-container">
        <h2 className="app-title">Log in</h2>
        {message && <div className={'message message-error'}>{message}</div>}
        <form data-testid="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username: </label>
            <input
              className="form-input"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password: </label>
            <input
              className="form-input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit">Log in</button>
        </form>


        <div className="blogs-list">
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} onLike={handleAddLike} user={user} onRemove={handleRemove}/>)}
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <h2 className="app-title">blogs</h2>
      <div className="user-section">
        <p className="user-info">{user.username} logged in</p>
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>
      {message && <div className={'message message-success'}>{message}</div>}
      <div className="blog-form-section">
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm onAddBlog={handleAddBlog} />
        </Togglable>
      </div>

      <div className="blogs-list">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} onLike={handleAddLike} user={user} onRemove={handleRemove}/>
        )}
      </div>
    </div>
  )
}

export default App