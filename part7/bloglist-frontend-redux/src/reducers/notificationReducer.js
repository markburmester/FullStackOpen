import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'notification',
  initialState: {
    text: '',
    display: "none",
    type: 'message'
  },
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  }
})

export const { showNotification } = filterSlice.actions

export const setNotification = (message, timeout, type = 'message') => {
  
  return async (dispatch) => {
    dispatch(showNotification({ text: message, display: 'block', type }))
    setTimeout(() => {
      dispatch(showNotification({ text: message, display: 'hiding', type }))
      setTimeout(() => {
        dispatch(showNotification({ text: '', display: 'none', type: 'message' }))
      }, 500)
    }, timeout * 1000)
  }
}

export default filterSlice.reducer