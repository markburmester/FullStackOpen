import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import PropTypes from 'prop-types'


const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')
  const navigate = useNavigate()

  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    dispatch(showNotification({text: 'Anecdote added', display: 'block'}))
            setTimeout(() => {
              dispatch(showNotification({text: '', display: 'none'}))
            }, 5000)
  }

  const handleReset = () =>{
    resetContent()
    resetAuthor()
    resetInfo()
  }

  
  

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} >
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
      
    </div>
  )

}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default CreateNew
