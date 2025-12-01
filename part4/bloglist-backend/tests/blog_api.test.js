const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testingLists = require('../utils/testing_lists')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
var _ = require('lodash');

const initialBlogs = testingLists.listWithManyBlogs
let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await api.post('/api/users').send({ username: 'testuser', name:"test", password: 'password' })

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'password' })

  token = loginResponse.body.token
  
  for (let blog of initialBlogs) {
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
  }
   
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are same # of blogs as in initial blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('the first blog is called React patterns', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body[0].title
  assert.strictEqual(title, "React patterns")
})

test('id parameter is id and not _id in every blog', async ()=>{
    const response = await api.get('/api/blogs')
    const isIdList = response.body.map((blog) => {
      console.log("blog", blog)
      return blog.hasOwnProperty('id')})
    console.log("isIdList: ", isIdList )
    assert.strictEqual(isIdList.includes(false), false)
})

test('when using post a new blog is created in db', async ()=>{
  
  const blog = {
        title: "Prueba",
        author: "Autor",
        url: "url",
        likes: 5
    }
    const initialLength = initialBlogs.length
    
    const newBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
    const savedBlog = await api.get(`/api/blogs/${newBlog.body.id}`)
    const blogs = await api.get('/api/blogs')
  
    assert.strictEqual((blogs.body.length === initialLength + 1) && (_.isEqual(newBlog.body, savedBlog.body)), true)
      

})

test('default value for likes is 0 when not existing', async ()=>{
    const blog = {
        "title": "Prueba",
        "author": "Author",
        "url": "url"
    }
    const newBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
    const savedBlog = await api.get(`/api/blogs/${newBlog.body.id}`)
    assert.strictEqual(savedBlog.body.likes, 0)
})

test('error 400 Bad Request pops when title or url don\'t exist', async()=>{
    const blog = {
        "author": "Author",
        "url": "url"
    }
    const newBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
    assert.strictEqual(newBlog.error.status, 400)
})

test('blog is deleted correctly', async()=>{
    
    const response = await api.get('/api/blogs')
    
    const deletedBlog = await api.delete(`/api/blogs/${response.body[0].id}`).set('Authorization', `Bearer ${token}`)
    
    const blogs = await api.get('/api/blogs')
    
    assert.strictEqual(initialBlogs.length - 1, blogs.body.length)
})

test('after updating number of likes of a blog, db is updated correctly', async()=>{
  const blogs = await api.get('/api/blogs')
  const body = blogs.body[0]
  const id = body.id
  const firstBlog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  }
  const initialLikes = firstBlog.likes  
  console.log(initialLikes)
  firstBlog.likes += 1

  const response = await api.put(`/api/blogs/${id}`).send(firstBlog)
  console.log("response",response)
  const updatedBlog = await api.get(`/api/blogs/${id}`)
  assert.strictEqual(initialLikes + 1, updatedBlog.body.likes)
})

after(async () => {
  await mongoose.connection.close()
})