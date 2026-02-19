import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author{name}
      genres
      id
    }
  }
`
export const ALL_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`
