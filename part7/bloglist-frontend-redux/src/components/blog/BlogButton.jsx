import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'

const BlogButton = ({ blog }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    const handleClick = () => {
        if (user) {
            navigate(`/blogs/${blog.id}`)
        } else {
            dispatch(setNotification("Please log in to view blog details", 5, "error"))
        }
    }

    return (
        <div 
            className='blog-item'
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className='blog-title'>
                <strong>{blog.title}</strong> by {blog.author}
            </div>
        </div>
    )
}

export default BlogButton
