import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBlog } from '../../reducers/blogReducer'

const BlogForm = ({ toggleRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = await dispatch(createBlog({
      title,
      author,
      url,
    }, user));

    if (newBlog && toggleRef?.current) {
      toggleRef.current.toggleVisibility();
    }

    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");

  };

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title:{" "}
          </label>
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
          <label className="form-label" htmlFor="author">
            Author:{" "}
          </label>
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
          <label className="form-label" htmlFor="url">
            URL:{" "}
          </label>
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
  );
};

export default BlogForm;
