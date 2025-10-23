require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Person = require('./models/person')

app.get('/api/persons', (request, response)=>{
    Person.find({}).then(persons => {
        response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log(id)
  Person.findById(id)
    .then(person => {
        response.json(person)
        })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  Person.findByIdAndDelete(id).then(() => {
        response.status(204).end()
        })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson =>{
      response.json(savedPerson)
      console.log("entre")
    
  }).catch(error=>next(error))

  
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(id, person)
    .then(updatedPerson => {
        response.json(updatedPerson)
        })
    .catch(error => next(error))

})

app.get('/info', (request, response)=>{

    const nPersons = Person.length
    const nowDate = new Date()
    const info = 
        `<p>Phonebook has info for ${nPersons} people</p>
        <p>${nowDate.toString()}</p>`
    response.send(info)
})
  
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
  return response.status(400).json({ error: error.message })}

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})