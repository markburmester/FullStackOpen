const { connectToDatabase } = require('./config/db')
const { startServer } = require('./server')

const start = async () => {
  await connectToDatabase()
  await startServer()
}

start()