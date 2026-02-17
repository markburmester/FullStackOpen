const mongoose = require('mongoose')

require('dotenv').config()

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

const connectToDatabase = async () => {
  console.log('connecting to', MONGODB_URI)
  
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('connected to MongoDB')
    console.log('Data loaded from MongoDB')
  } catch (error) {
    console.log('error connection to MongoDB:', error.message)
    throw error
  }
}

module.exports = { connectToDatabase }
