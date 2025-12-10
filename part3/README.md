# Part 3: Programming a Server with Node.js and Express

## Overview

Part 3 focuses on building backend servers using Node.js and Express. This part covers server setup, routing, middleware, database integration with MongoDB, and RESTful API design.

## Exercises

### 3.1-3.6: Agenda Backend (Express Server)
Building a REST API for managing contacts:
- Express server setup
- Routing for CRUD operations
- Middleware for request handling
- Error handling
- Deployment to Fly.io

**Directory:** `agenda-backend/`

### 3.7-3.22: Blog Backend (Part of Part 4)
Building a more complex API with:
- User authentication
- Authorization
- Database relationships
- Advanced error handling

**Directory:** Part 4 (`../part4/bloglist-backend/`)

## Project Structure

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (cloud) or local MongoDB
- Fly.io account for deployment

### Installation

```bash
cd part3/agenda-backend
npm install
```

### Environment Variables

Create `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3001
```

### Running the Server

```bash
npm start
```

or with nodemon for development:

```bash
npm run dev
```

## Key Concepts

### Express.js
- Creating Express application
- Routing (GET, POST, PUT, DELETE)
- Middleware functions
- Error handling middleware
- CORS support

### RESTful API Design
- Resource-based URL structure
- HTTP methods semantics
- Status codes
- Response format (JSON)

### Middleware
- Request processing pipeline
- Built-in middleware (express.json)
- Custom middleware
- Error handling middleware

### Database Integration
- MongoDB connection
- Mongoose ODM (Object Document Mapper)
- Schema definition
- Model creation

### Error Handling
- Try-catch blocks
- Express error handling middleware
- Validation errors
- Proper status codes and messages

### Validation
- Request validation
- Data type checking
- Required fields
- Custom validation

## API Endpoints

### Agenda API

```
GET    /api/contacts      - Get all contacts
GET    /api/contacts/:id  - Get specific contact
POST   /api/contacts      - Create new contact
PUT    /api/contacts/:id  - Update contact
DELETE /api/contacts/:id  - Delete contact

GET    /                   - Get basic info
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Nodemon** - Development tool for auto-reload
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables

## File Structure

```
agenda-backend/
├── models/
│   └── contact.js       # MongoDB schema and model
├── requests/
│   ├── get_all_contacts.rest
│   ├── get_contact.rest
│   ├── post_contact.rest
│   ├── put_contact.rest
│   └── delete_contact.rest
├── db.js                # MongoDB connection
├── index.js             # Server entry point
├── app.js               # Express app setup
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Example Route Handler

```javascript
// GET all contacts
app.get('/api/contacts', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

// POST new contact
app.post('/api/contacts', (request, response) => {
  const { name, number } = request.body
  
  const contact = new Contact({ name, number })
  contact.save().then(savedContact => {
    response.status(201).json(savedContact)
  })
})
```

## Database Schema Example

```javascript
// MongoDB Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
})
```

## Middleware Setup

```javascript
// Middleware stack
app.use(express.json())
app.use(cors())
app.use(requestLogger)

// Routes
app.get('/api/contacts', ...)
app.post('/api/contacts', ...)

// Error handling (should be last)
app.use(errorHandler)
```

## Deployment to Fly.io

```bash
# Install Fly CLI
brew install flyctl

# Login to Fly
fly auth login

# Create new app
fly launch

# Deploy
fly deploy

# View logs
fly logs
```

## Learning Outcomes

- Setting up and configuring Express server
- Building RESTful APIs
- Working with middleware
- Database integration with MongoDB
- Schema validation
- Error handling and HTTP status codes
- CORS and security considerations
- Testing API endpoints
- Deployment to cloud platforms

## Common Issues

### MongoDB Connection
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure .env file is properly configured

### CORS Issues
- Enable CORS middleware
- Configure allowed origins
- Check browser console for specific errors

### Validation Errors
- Implement proper validation
- Return meaningful error messages
- Use appropriate status codes

## Testing Endpoints

Using VS Code REST Client extension:

```rest
### Get all contacts
GET http://localhost:3001/api/contacts

### Create new contact
POST http://localhost:3001/api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "number": "12345678"
}
```

## Resources

- [Full Stack Open Part 3](https://fullstackopen.com/en/part3)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [RESTful API Best Practices](https://restfulapi.net/)
- [Fly.io Documentation](https://fly.io/docs/)

## Notes

- Always validate and sanitize user input
- Use environment variables for sensitive data
- Implement proper error handling
- Test endpoints thoroughly
- Monitor logs in production
- Use meaningful HTTP status codes

---

**Duration:** ~10-12 hours | **Difficulty:** Intermediate to Advanced
