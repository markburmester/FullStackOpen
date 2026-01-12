import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

const getById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)
  return response.json()
}

const create = async (content) => {
  const newAnecdote = asObject(content)
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  })
  return response.json()
}

const update = async (id, updatedAnecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedAnecdote)
  })
  return response.json()
}

export default { getAll, getById, create, update }
