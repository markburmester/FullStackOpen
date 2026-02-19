import { useRef, useEffect } from "react";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BlogForm from "./components/blog/BlogForm";
import BlogList from "./components/blog/BlogList";
import LoginForm from "./components/user/LoginForm";
import Togglable from "./components/common/Toggable";
import { logoutUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import "./assets/styles-refactored.css";
import Notification from "./components/common/Notification";
import Menu from "./components/layout/Menu"
import Users from "./components/user/Users"
import User from "./components/user/User"
import Blog from "./components/blog/Blog"
import SignupForm from "./components/user/SingupForm";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const blogFormRef = useRef();
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  
  
  const matchUsers = useMatch('/users/:id')
  const matchBlogs = useMatch('/blogs/:id')

  //---------------------------------------------------------------------------------USUARIO NO REGISTRADO----------------------------------------------------------------------------------------
  
  if (user === null) {
    const loginContent = (
      <>
        <button onClick={() => navigate('/signup')}>Sign up</button>
        <h2 className="app-title">Log in</h2>
        <Notification />
        <LoginForm />
        <BlogList />
      </>
    );

    return (
      <div className="app-container">        
        <Routes>
          <Route path="/" element={loginContent} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    );
  }

  //---------------------------------------------------------------------------------USUARIO REGISTRADO----------------------------------------------------------------------------------------
  return (
    
    <div className="app-container">
      <button className="button-small" onClick={() => navigate(-1)}>
          ←
      </button>

      <h2 className="app-title">blogs</h2>
      <div className="user-section">
        
        <p className="user-info">{user.username} logged in</p>
        <button className="logout-btn" onClick={() => {
          dispatch(logoutUser())
          navigate('/')
        }}>
          Log out
        </button>
      </div>
      <Notification />
      <Menu/>
      
      
      <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/create" element={
            <div className="blog-form-section">
              <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm toggleRef={blogFormRef} />
              </Togglable>
            </div>
          }/>
          <Route path="/users" element={<Users/>} />
          <Route path="/users/:id" element={<User id={matchUsers?.params.id}/>}/>
          <Route path="/blogs/:id" element={<Blog id={matchBlogs?.params.id}/>}/>

      </Routes>

      
      
      
    </div>
  );
};

export default App;
