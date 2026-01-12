import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'notification',
  initialState: {
    text: '',
    display: "none"
  },
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  }
})

export const { showNotification } = filterSlice.actions

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(showNotification({ text: message, display: 'block' }))
    setTimeout(() => {
      dispatch(showNotification({ text: '', display: 'none' }))
    }, timeout * 1000)
  }
}

export default filterSlice.reducer