import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries/books'
import { ME } from '../queries/users'

const Recommend = (props) => {
  const [favouriteGenre, setFavouriteGenre] = useState(null)
  
  const currentUser = useQuery(ME) 
  const booksResult = useQuery(ALL_BOOKS, {variables: { genre: favouriteGenre }})
  

  if (booksResult.loading || currentUser.loading ) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = booksResult.data.allBooks
  if (!favouriteGenre){
    setFavouriteGenre(currentUser.data.me.favoriteGenre) 
  }

  
  return (
    <div> 
      <h2>recommendations</h2>
      <p>books in your favorite genre {favouriteGenre}</p>
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
    </div>
  )
}

export default Recommend
