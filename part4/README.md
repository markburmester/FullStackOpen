# Part 4: Testing Express Servers

## Overview

Part 4 focuses on testing backend applications using Jest. This part covers unit testing, integration testing, test-driven development (TDD), and working with test databases.

## Exercises

### 4.1-4.14: Bloglist Backend with Tests
Building a blog API with comprehensive test coverage:
- Unit tests for utility functions
- Integration tests for API endpoints
- Test database setup
- User authentication and authorization
- Testing with supertest

**Directory:** `bloglist-backend/`

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB
- Jest for testing
- Supertest for HTTP assertions

### Installation

```bash
cd part4/bloglist-backend
npm install
```

### Environment Variables

Create `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3001
TEST_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname-test
SECRET=your-secret-key
NODE_ENV=development
```

## Project Structure

```
bloglist-backend/
├── controllers/
│   ├── blogs.js         # Blog route handlers
│   ├── users.js         # User route handlers
│   └── login.js         # Authentication handler
├── models/
│   ├── blog.js          # Blog schema and model
│   └── user.js          # User schema and model
├── utils/
│   ├── config.js        # Configuration
│   ├── logger.js        # Logging utility
│   └── middleware.js    # Custom middleware
├── tests/
│   ├── blog_api.test.js           # Blog API tests
│   ├── user_api.test.js           # User API tests
│   ├── login.test.js              # Authentication tests
│   ├── test_helper.js             # Test utilities
│   ├── dummy.test.js              # Example tests
│   ├── favouriteBlog.test.js      # List helper tests
│   ├── mostBlogs.test.js          # List helper tests
│   └── mostLikes.test.js          # List helper tests
├── requests/
│   ├── blog.rest
│   ├── login.rest
│   └── user.rest
├── app.js               # Express app setup
├── index.js             # Server entry point
├── package.json
└── jest.config.js
```

## Key Concepts

### Testing Frameworks
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **Test database** - Separate MongoDB for testing

### Test Types
- **Unit Tests** - Testing individual functions
- **Integration Tests** - Testing API endpoints
- **End-to-End Tests** - Complete workflow testing

### Test Structure

```javascript
describe('Blog API', () => {
  beforeEach(async () => {
    // Setup before each test
  })

  test('returns correct number of blogs', async () => {
    // Test logic
    expect(result).toBe(expected)
  })

  afterAll(async () => {
    // Cleanup
  })
})
```

### Assertions

```javascript
expect(blogs).toHaveLength(2)
expect(response.status).toBe(200)
expect(blog.title).toBe('Test Blog')
expect(blogs).toContainEqual({ id: 1, title: 'Test' })
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/blog_api.test.js

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## Example Test

```javascript
describe('Blog API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})
```

## Test Database

```javascript
// config.js
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
```

## Helper Functions

```javascript
// tests/test_helper.js
const blogsInDb = async () => {
  const response = await api.get('/api/blogs')
  return response.body
}

const usersInDb = async () => {
  const response = await api.get('/api/users')
  return response.body
}
```

## Test Utilities

### Dummy Tests
```javascript
test('dummy test', () => {
  expect(1).toBe(1)
})
```

### List Helper Tests
Testing utility functions like:
- `favouriteBlog()` - Find blog with most likes
- `mostBlogs()` - Find author with most blogs
- `mostLikes()` - Find author with most total likes

## Authentication Testing

```javascript
test('blogs can be created by authenticated user', async () => {
  const user = await User.findOne({ username: 'testuser' })
  const token = jwt.sign({ username: user.username, id: user._id }, SECRET)

  const newBlog = {
    title: 'New Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
})
```

## Technologies Used

- **Jest** - Testing framework
- **Supertest** - HTTP testing library
- **MongoDB** - Database (with separate test DB)
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## Learning Outcomes

- Understanding different test types
- Writing unit tests with Jest
- Writing integration tests with Supertest
- Test database setup and management
- Testing authentication and authorization
- Testing error scenarios
- Achieving good test coverage
- Test-driven development (TDD) practices

## Best Practices

- Write tests before or alongside implementation (TDD)
- Keep tests independent and isolated
- Use descriptive test names
- Test both success and error cases
- Use setup and teardown hooks
- Maintain separate test database
- Aim for good test coverage (>80%)
- Mock external dependencies

## Common Issues

### Database Connection
- Use separate TEST_MONGODB_URI
- Ensure test database is cleared before tests
- Use proper connection cleanup

### Async Tests
- Always await async operations
- Use async/await or promises consistently
- Handle timeouts properly

### JWT Testing
- Generate valid tokens in tests
- Test with and without authentication
- Test with invalid tokens

## Resources

- [Full Stack Open Part 4](https://fullstackopen.com/en/part4)
- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)
- [JWT Authentication Testing](https://jwt.io/)

## Notes

- Always use environment variables for sensitive data
- Keep test files clean and organized
- Document complex test setups
- Review test coverage reports
- Integrate tests into CI/CD pipeline
- Run tests before committing code

---

**Duration:** ~12-15 hours | **Difficulty:** Intermediate to Advanced
