const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const auth = req.headers.authorization
      console.log('Authorization header:', auth)
      if (auth && auth.startsWith('Bearer ')) {
        const token = auth.substring(7)
        console.log('Token:', token)
        try {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
          console.log('Decoded token:', decodedToken)
          const currentUser = await User.findById(decodedToken.id)
          console.log('Current user:', currentUser)
          return { currentUser }
        } catch (error) {
          console.log('Error verifying token:', error.message)
          // Token inválido, continuar sin usuario
          return {}
        }
      }
      return {}
    }
  })
  console.log(`Server ready at ${url}`)
}

module.exports = { startServer }
