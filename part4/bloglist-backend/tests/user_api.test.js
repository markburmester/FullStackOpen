const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)
var _ = require('lodash');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'test', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})
describe.only("invalid username or password", ()=>{
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'test', passwordHash })

    await user.save()
  })
  test('when username is too short, error 400 happens, no user is added and correct message', async ()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
        username: 'ml',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` (`ml`, length 2) is shorter than the minimum allowed length (3).')
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    const usernames = usersAtEnd.map(u => u.username)
    assert.strictEqual(usernames.includes(newUser.username), false)
  })

  test('when password is too short, error 400 happens, no user is added and correct message', async ()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
        username: 'mlrvwrv',
        name: 'Matti Luukkainen',
        password: 'sa',
      }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    assert.strictEqual(response.body.error, 'Password should have 3 or more characters')
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    const usernames = usersAtEnd.map(u => u.username)
    
    assert.strictEqual(usernames.includes(newUser.username), false)
  })

  test('when username is not unique, error 400 happens, no user is added and correct message', async ()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
        username: 'root',
        name: 'Matti Luukkainen',
        password: 'sacrevsvre',
      }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    assert.strictEqual(response.body.error, "expected `username` to be unique")
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    
  })
  
})


after(async () => {
  await mongoose.connection.close()
})