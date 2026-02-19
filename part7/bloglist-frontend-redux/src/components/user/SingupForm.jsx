import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUsername, setPassword, setName, signupUser } from '../../reducers/userReducer'

const SignupForm = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)
  const name = useSelector((state) => state.user.name)

  const handleSignup = async (e) => {
    e.preventDefault()
    
    
    await dispatch(signupUser({ username, password, name }))
    navigate('/')
    
  }

  return (
    <>
      <button className="button-small" onClick={() => navigate(-1)}>
        login
        
      </button>
      <form data-testid="login-form" onSubmit={handleSignup}>
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Name:{" "}
        </label>
        <input
          className="form-input"
          id="name"
          type="text"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          placeholder="Enter your name"
        />
      </div>
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
      <button type="submit">Sign up</button>
    </form>
    </>
  );
};

export default SignupForm;
