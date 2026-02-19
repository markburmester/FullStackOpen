import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const initialState = {
  user: null,
  username: '',
  password: '',
  name: '',
}

// Cargar usuario desde localStorage al iniciar
const loggedUserJSON = window.localStorage.getItem('loggedUser')
if (loggedUserJSON) {
  initialState.user = JSON.parse(loggedUserJSON)
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    },
    setName(state, action) {
      state.name = action.payload
    },
    clearUser(state) {
      state.user = null
      state.username = ''
      state.password = ''
      state.name = ''
    },
  },
})

export const { setUser, setUsername, setPassword, setName, clearUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await loginService.login(credentials)
      const userObject = {
        username: response.username,
        name: response.name,
        token: response.token,
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(userObject))
      dispatch(setUser(userObject))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      console.log('Successful login for:', response.username)
    } catch (exception) {
      dispatch(setNotification("Invalid username or password", 5, "error"))
      throw exception
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearUser())
  }
}

export const signupUser = (userData) => {
  return async (dispatch) => {
    try {
      await userService.create(userData)
      dispatch(setNotification(`Account created for ${userData.username}. Please log in.`, 5, "success"))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(setName(''))
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || "Error creating account"
      dispatch(setNotification(errorMessage, 5, "error"))
      throw exception
    }
  }
}

export default userSlice.reducer
