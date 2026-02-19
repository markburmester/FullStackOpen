import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { logoutUser } from './userReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogInState(state, action) {
      const id = action.payload.id
      return state.map((blog) =>
        blog.id !== id ? blog : action.payload
      )
    },
    removeBlogFromState(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlogInState, removeBlogFromState } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogData, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogData, user.token)
      newBlog.user = user
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`Blog '${newBlog.title}' created successfully`, 5, 'message'))
      console.log('Blog created:', newBlog.title)
      return newBlog
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Error creating blog'
      
      if (errorMessage.includes('token expired') || errorMessage.includes('jwt expired')) {
        dispatch(setNotification('Session expired. Please login again', 5, 'error'))
        dispatch(logoutUser())
      } else {
        dispatch(setNotification(errorMessage, 5, 'error'))
      }
      
      throw exception
    }
  }
}

export const updateBlog = (blogData, userToken) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blogData, userToken)
      dispatch(updateBlogInState(updatedBlog))
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Error liking blog'
      
      if (errorMessage.includes('token expired') || errorMessage.includes('jwt expired')) {
        dispatch(setNotification('Session expired. Please login again', 5, 'error'))
        dispatch(logoutUser())
      } else {
        dispatch(setNotification(errorMessage, 5, 'error'))
      }
      
      throw exception
    }
  }
}

export const deleteBlog = (blogData, userToken) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogData, userToken)
      dispatch(removeBlogFromState(blogData.id))
      dispatch(setNotification(`Blog '${blogData.title}' removed successfully`, 5, 'message'))
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Error removing blog'
      
      if (errorMessage.includes('token expired') || errorMessage.includes('jwt expired')) {
        dispatch(setNotification('Session expired. Please login again', 5, 'error'))
        dispatch(logoutUser())
      } else {
        dispatch(setNotification(errorMessage, 5, 'error'))
      }
      
      throw exception
    }
  }
}

export default blogSlice.reducer
