# Part 5: Testing React Apps

## Overview

Part 5 focuses on testing React applications using Jest and React Testing Library. This part covers unit testing components, integration testing, end-to-end testing, and best practices for testing React applications.

## Project: Blog List Frontend

A full-featured blog management application with user authentication and complete test coverage.

**Directory:** `bloglist-frontend/`

## Features

### User Authentication
- Login form with JWT authentication
- Session persistence using localStorage
- Logout functionality
- Error handling for failed login attempts

### Blog Management
- Create new blogs (authenticated users only)
- View blog list sorted by likes (descending order)
- Toggle blog details (URL, likes, author)
- Like button to increment blog ratings
- Delete blogs (owner only)

### User Experience
- Success/error messages with auto-dismiss
- Responsive design with Apple-inspired styling
- Smooth transitions and hover effects
- Clean, modern UI

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Jest for testing
- React Testing Library for component testing

### Installation

```bash
cd part5/bloglist-frontend
npm install
```

### Running Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5173`

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/Blog.test.js

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## Project Structure

```
bloglist-frontend/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── assets/
│   │   └── styles-refactored.css  # Apple-inspired styling
│   ├── components/
│   │   ├── Blog.jsx               # Individual blog component
│   │   ├── BlogForm.jsx           # Form to create blogs
│   │   ├── Login.jsx              # Login form component
│   │   ├── Togglable.jsx          # Toggle visibility component
│   │   ├── Notification.jsx       # Message notifications
│   │   └── ...
│   ├── services/
│   │   ├── blogs.js               # Blog API service
│   │   ├── login.js               # Login API service
│   │   └── ...
│   ├── tests/
│   │   ├── Blog.test.js           # Blog component tests
│   │   ├── App.test.js            # App component tests
│   │   ├── BlogForm.test.js       # Form component tests
│   │   └── setupTests.js          # Test configuration
│   └── main.jsx                   # React entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js               # Test configuration
└── jest.setup.js
```

## Key Concepts

### React Testing Library
- Rendering components
- Querying elements (getByRole, getByText, etc.)
- User interactions (userEvent, fireEvent)
- Assertions (expect)

### Component Testing

```javascript
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog component', () => {
  test('renders blog title and author', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 5
    }

    render(<Blog blog={blog} />)
    
    expect(screen.getByText('Test Blog')).toBeInTheDocument()
    expect(screen.getByText(/Test Author/)).toBeInTheDocument()
  })
})
```

### User Interactions

```javascript
import userEvent from '@testing-library/user-event'

test('form submission calls handler', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(<BlogForm onAddBlog={mockHandler} />)

  const input = screen.getByPlaceholderText('Title')
  await user.type(input, 'New Blog')

  const button = screen.getByRole('button', { name: /create/i })
  await user.click(button)

  expect(mockHandler).toHaveBeenCalled()
})
```

### Mocking

```javascript
// Mock API calls
jest.mock('../services/blogs')
import * as blogsService from '../services/blogs'

blogsService.getAll.mockResolvedValue([
  { id: 1, title: 'Test', likes: 5 }
])
```

## Testing Strategies

### 1. Unit Tests
- Test individual components in isolation
- Mock child components
- Test props and state

### 2. Integration Tests
- Test components working together
- Test with real services (or mocked)
- Test user workflows

### 3. E2E Tests (if using Cypress/Playwright)
- Test complete user flows
- Test in real browser environment
- Test real backend integration

## File Structure for Tests

```
src/
├── components/
│   ├── Blog.jsx
│   └── __tests__/
│       └── Blog.test.js
├── services/
│   ├── blogs.js
│   └── __tests__/
│       └── blogs.test.js
└── App.jsx
```

## Example Tests

### Testing Component Rendering
```javascript
test('blog details are hidden initially', () => {
  const blog = { title: 'Test', author: 'Author', url: 'http://x.com', likes: 5 }
  render(<Blog blog={blog} />)
  
  const details = screen.queryByText(/http:/)
  expect(details).not.toBeInTheDocument()
})
```

### Testing User Interactions
```javascript
test('blog details are shown when show button clicked', async () => {
  const user = userEvent.setup()
  const blog = { title: 'Test', author: 'Author', url: 'http://x.com', likes: 5 }
  
  render(<Blog blog={blog} />)
  
  const showButton = screen.getByRole('button', { name: /show/i })
  await user.click(showButton)
  
  const url = screen.getByText(/http:/)
  expect(url).toBeInTheDocument()
})
```

### Testing Form Submission
```javascript
test('create blog calls handler with correct data', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()
  
  render(<BlogForm onAddBlog={mockHandler} />)
  
  await user.type(screen.getByPlaceholderText('Title'), 'New Title')
  await user.type(screen.getByPlaceholderText('Author'), 'New Author')
  await user.type(screen.getByPlaceholderText('URL'), 'http://new.com')
  
  await user.click(screen.getByRole('button', { name: /create/i }))
  
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'New Title',
    author: 'New Author',
    url: 'http://new.com'
  })
})
```

## Best Practices

- Write tests for user-facing behavior, not implementation
- Use semantic queries (getByRole, getByText)
- Avoid testing internal state
- Keep tests isolated and independent
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies
- Aim for high coverage (>80%)

## Technologies Used

- **React 18** - UI library
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **Vitest** - Fast unit testing
- **Axios** - HTTP client
- **CSS3** - Styling

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test Blog.test.js

# Run tests matching pattern
npm test -- --testNamePattern="blog details"

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Update snapshots
npm test -- -u
```

## Learning Outcomes

- Testing React components
- Writing user-centric tests
- Mocking dependencies
- Testing async operations
- Testing form submissions
- Testing user interactions
- Achieving good test coverage
- Test-driven development for React

## Resources

- [Full Stack Open Part 5](https://fullstackopen.com/en/part5)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Notes

- Keep backend running for integration tests
- Use different API endpoints for testing if needed
- Mock localStorage for testing persistence features
- Always clean up after tests
- Consider E2E tests for critical flows
- Integrate tests into CI/CD pipeline

---

**Duration:** ~10-12 hours | **Difficulty:** Intermediate to Advanced
