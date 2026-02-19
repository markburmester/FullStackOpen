
import { useState } from 'react'
import {useMutation} from '@apollo/client/react'  
import { LOGIN } from '../mutations/login'

const LoginForm = ({ setToken }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    },
    
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    
    await login({
      variables: {
        username:username,
        password: password
      }
    })
  }


  return (
    <form onSubmit={handleLogin}>
      <div><h3>Login</h3></div>
      <div>Username: 
      <input 
        value={username} 
        onChange={({ target }) => setUsername(target.value)}
      />
      </div>
      <div>Password: 
      <input 
        type="password"
        value={password} 
        onChange={({ target }) => setPassword(target.value)}
      />
      </div>

      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
