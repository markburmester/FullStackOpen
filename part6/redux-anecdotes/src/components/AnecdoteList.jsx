import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    dispatch(updateVotes(id))
    dispatch(setNotification(`You voted ${anecdote.content}`, 5))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())}
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      {[...filteredAnecdotes].sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
