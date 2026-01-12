import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeNotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateVotes = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getById(id)
    const updatedAnecdote = {
      content: anecdote.content,
      id: id,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(id, updatedAnecdote)
    dispatch(addVote(id))
  }
}



export default anecdoteSlice.reducer

