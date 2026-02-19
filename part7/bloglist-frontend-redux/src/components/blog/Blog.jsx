import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateBlog, deleteBlog } from "../../reducers/blogReducer";

const Blog = ({ id }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState("");

  
  
  if (!blog) {
    return <div>loading...</div>;
  }
  
  const handleAddLike = async () => {
    if (user) {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      
      await dispatch(updateBlog(updatedBlog, user.token));
    }
  };

  const handleRemove = async () => {
    await dispatch(deleteBlog(blog, user.token));
    navigate(-1);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    console.log(user)
    console.log("Adding comment:", comment);
    if (user && comment.trim()) {
      const updatedBlog = {
        ...blog,
        comments: [
          ...blog.comments,
          {
            comment: comment,
            user: user.id
          }
        ]
      };

      console.log("updated blog", updatedBlog)
      
      await dispatch(updateBlog(updatedBlog, user.token));
      setComment("");
    }
  };

  return (
    <div className="blog-item">
      <div className="blog-title">
        <strong>{blog.title}</strong> by {blog.author}
        {user && user.username === blog.user.username && (
          <button className="remove-button" onClick={handleRemove}>
            remove
          </button>
        )}
      </div>
      <div className="blog-details">
        <p>
          <strong>URL:</strong>{" "}
          <a
            className="blog-link"
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a>
        </p>
        <div className="blog-likes">
          <span>
            <strong>Likes:</strong> {blog.likes}
          </span>
          <button className="like-button" onClick={handleAddLike}>
            👍
          </button>
        </div>
        <p>
          <strong>Created by: </strong>
          {blog.user.username}
        </p>
      </div>
      
      <div className="blog-comments">
        <h3>Comments</h3>
        
        {user && (
          <form onSubmit={handleAddComment}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
            </div>
            <button type="submit">Add comment</button>
          </form>
        )}
        
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>
                <p>{comment.comment}</p>
                {comment.user && (
                  <small>{comment.user.username}</small>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
