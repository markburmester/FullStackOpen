import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useErrorHandler } from './useErrorHandler'

export const useBlogs = (userToken) => {
  const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const addBlog = async (blogData, user) => {
    try {
      const newBlog = await blogService.create(blogData, userToken)
      newBlog.user = user
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotification(`Blog '${newBlog.title}' created successfully`, 5))
      console.log('Blog created:', newBlog.title)
      return newBlog
    } catch (exception) {
      handleError(exception, 'Error creating blog')
    }
  }

  const updateBlog = async (blogData) => {
    try {
      await blogService.update(blogData, userToken)
    } catch (exception) {
      handleError(exception, 'Error liking blog')
    }
  }

  const removeBlog = async (blogData) => {
    try {
      await blogService.remove(blogData, userToken)
      setBlogs(blogs.filter((blog) => blog.id !== blogData.id))
      dispatch(setNotification(`Blog '${blogData.title}' removed successfully`, 5))
    } catch (exception) {
      handleError(exception, 'Error removing blog')
    }
  }

  return {
    blogs,
    addBlog,
    updateBlog,
    removeBlog,
  }
}
