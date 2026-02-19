import { useState } from 'react'

const BlogForm = ({ onAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await onAddBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title: </label>
          <input
            className="form-input"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog title"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="author">Author: </label>
          <input
            className="form-input"
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="url">URL: </label>
          <input
            className="form-input"
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Blog URL"
          />
        </div>
        <button type="submit">Create blog</button>
      </form>
    </div>
  )
}

export default BlogForm
