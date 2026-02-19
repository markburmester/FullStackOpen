import { useSelector, useDispatch } from 'react-redux'
import { loginUser, setUsername, setPassword } from '../../reducers/userReducer'

const LoginForm = () => {
  
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    await dispatch(loginUser({ username, password }))
    
  }

  return (
    <form data-testid="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label className="form-label" htmlFor="username">
          Username:{" "}
        </label>
        <input
          className="form-input"
          id="username"
          type="text"
          value={username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
          placeholder="Enter username"
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password:{" "}
        </label>
        <input
          className="form-input"
          id="password"
          type="password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          placeholder="Enter password"
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
