import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ALL_GENRES } from '../queries/books'

const Books = (props) => {
  const [filteredGenre, setFilteredGenre] = useState(null)
  
  const booksResult = useQuery(ALL_BOOKS, {variables: { genre: filteredGenre }})
  const genresResult = useQuery(ALL_GENRES)

  if (booksResult.loading || genresResult.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = booksResult.data.allBooks

  const genres = [...new Set(genresResult.data.allBooks.flatMap(b => b.genres))]
  
  return (
    <div> 
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <button onClick={() => setFilteredGenre(null)}>all genres</button>
      {genres.map(g => (
        <button key={g} onClick={() => setFilteredGenre(g)}>{g}</button>
      ))}
    </div>
  )
}

export default Books
