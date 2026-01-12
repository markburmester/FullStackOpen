import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, counterDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    if (content.length < 6) {
      counterDispatch({ type: 'SET_NOTIFICATION', payload: 'anecdote too short, must have length 6 or more' })
      return
    }
    
    newAnecdoteMutation.mutate({ content, votes: 0 })
    counterDispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${content}' created` })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
