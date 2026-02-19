import { useState } from 'react'
import Togglable from './Toggable'

const Blog = ({ blog, onLike, user, onRemove }) => {
  const [likes, setLikes] = useState(blog.likes)
  const handleAddLike = async (e) => {
    if(user){
      e.preventDefault()
      blog.likes = likes + 1
      setLikes(likes + 1)
      await onLike(blog)
    }
  }

  const handleRemove = async (e) => {
    e.preventDefault()
    await onRemove(blog)
  }

  if (!user){
    return (
      <div className="blog-item">
        <div className="blog-title">
          <strong>{blog.title}</strong> by {blog.author}
        </div>
        <Togglable buttonLabel="show">
          <div className="blog-details">
            <p><strong>URL:</strong> <a className="blog-link" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <div className="blog-likes">
              <span><strong>Likes:</strong> {likes}</span>
              <button className="like-button" onClick={handleAddLike}>👍</button>
            </div>
            <p><strong>Created by: </strong>{blog.user.username}</p>
          </div>
        </Togglable>
      </div>

    )
  }


  if (user.username === blog.user.username){
    return (
      <div className="blog-item">
        <div className="blog-title">
          <strong>{blog.title}</strong> by {blog.author} <button className="remove-button" onClick={handleRemove}>remove</button>
        </div>
        <Togglable buttonLabel="show">
          <div className="blog-details">
            <p><strong>URL:</strong> <a className="blog-link" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <div className="blog-likes">
              <span><strong>Likes:</strong> {likes}</span>
              <button className="like-button" onClick={handleAddLike}>👍</button>
            </div>
            <p><strong>Created by: </strong>{blog.user.username}</p>
          </div>
        </Togglable>
      </div>

    )
  }

  return (
    <div className="blog-item">
      <div className="blog-title">
        <strong>{blog.title}</strong> by {blog.author}
      </div>
      <Togglable buttonLabel="show">
        <div className="blog-details">
          <p><strong>URL:</strong> <a className="blog-link" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
          <div className="blog-likes">
            <span><strong>Likes:</strong> {likes}</span>
            <button className="like-button" onClick={handleAddLike}>👍</button>
          </div>
          <p><strong>Created by: </strong>{blog.user.username}</p>
        </div>
      </Togglable>
    </div>

  )




}

export default Blog