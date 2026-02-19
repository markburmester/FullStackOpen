import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../../reducers/usersReducer'

const Users = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state) => state.users)


    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const rowStyle = {
        cursor: 'pointer'
    }

    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr 
                            key={user.id} 
                            style={rowStyle}
                            onClick={() => navigate(`/users/${user.id}`)}
                        >
                            <td>{user.username}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users