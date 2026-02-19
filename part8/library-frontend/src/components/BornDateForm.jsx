import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { EDIT_AUTHOR } from '../mutations/authors'
import { ALL_AUTHORS } from '../queries/authors'
import Select from 'react-select'

const BornDateForm = () => {
  const [bornYear, setBornYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    awaitRefetchQueries: true
  })

  const handleSetBornTo = async (event) => {
    event.preventDefault()
    
    if (!selectedAuthor) return
    
    await editAuthor({
      variables: {
        name: selectedAuthor.value,
        setBornTo: parseInt(bornYear)
      }
    })

    setSelectedAuthor(null)
    setBornYear('')
  }

  if (result.loading) return null

  const authors = result.data.allAuthors
  const options = authors.map(a => ({ value: a.name, label: a.name }))

  return (
    <form onSubmit={handleSetBornTo}>
      <div><h3>Set born date to</h3></div>
      <div>Author name: 
      <Select
        value={selectedAuthor}
        onChange={setSelectedAuthor}
        options={options}
      />
      </div>
      <div>Born date:
      <input 
        type="number"
        value={bornYear} 
        onChange={({ target }) => setBornYear(target.value)}
      />
      </div>
      <button type="submit">update author</button>
    </form>
  )
}

export default BornDateForm
