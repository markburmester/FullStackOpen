const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')


const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      
      let books = await Book.find({}).populate('author') 
      if (args.author && args.genre) {
        console.log(`Filtering by author: ${args.author} AND genre: ${args.genre}`)
        books = books.filter((book) => 
          book.author.name === args.author && book.genres.includes(args.genre)
        )
      } else if (args.author) {
        console.log(`Filtering by author: ${args.author}`)
        books = books.filter((book) => book.author.name === args.author)
      } else if (args.genre) {
        console.log(`Filtering by genre: ${args.genre}`)
        books = books.filter((book) => book.genres.includes(args.genre))
      }
      console.log("books:", books)
      return books
    },
    allAuthors: async () => {
      let authors = await Author.find({})
      let books = await Book.find({}).populate('author')
      console.log(authors[0].name + "===" + books[0].author.name)
      const result = authors.map((author) => {
        let booksByAuthor = books.filter((book) => book.author.name === author.name)
        return {
          ...author.toObject(),
          id: author._id,
          bookCount: booksByAuthor.length
        }
      })
      
      return result
    },
    allUsers: async () => {
      return await User.find({})
    },
    me: (root, args, context) => {
      console.log('Current user in context:', context.currentUser)
      return context.currentUser
    }
  },


  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      await user.save()
      

      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },


    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      if (args.title.length < 3) {
        throw new GraphQLError('Book title must be at least 3 characters long', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }

      if (args.author.length < 3) {
        throw new GraphQLError('Author name must be at least 3 characters long', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      
      if (!author) {
        author = new Author({ name: args.author})
        await author.save()
      }

      const book = new Book({ 
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })
      
      await book.save()
      return book.populate('author')
    },
    editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED'
            }
          })
        }

        if (args.setBornTo > 2013) {
          throw new GraphQLError('Birth year cannot be later than 2013', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo
            }
          })
        }

        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
        return author
    }
  }
}

module.exports = resolvers
