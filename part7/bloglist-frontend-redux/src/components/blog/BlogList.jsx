import { useSelector } from 'react-redux'
import BlogButton from './BlogButton'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  if (blogs.length > 0){

    return (
        <div className="blogs-list">
        {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <BlogButton key={blog.id} blog={blog} />
            ))}
        </div>
    )
  }
}

export default BlogList
