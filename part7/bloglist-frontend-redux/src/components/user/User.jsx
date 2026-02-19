import { useSelector } from 'react-redux'
import BlogButton from '../blog/BlogButton'

const User = ({ id }) => {
    const user = useSelector((state) => 
        state.users.find(u => u.id === id)
    )

    if (!user) {
        return <div>User not found</div>
    }

    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Added blogs</h3>
            <div>
                {user.blogs.map(blog => (
                    <BlogButton key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default User