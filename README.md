# Full Stack Open Exercises

This repository contains solutions and implementations for the [Full Stack Open](https://fullstackopen.com/) course exercises from the University of Helsinki.

## Overview

Full Stack Open is a free and comprehensive course that covers modern web application development. This repository includes hands-on exercises for building full-stack applications with React, Node.js, MongoDB, and other modern web technologies.

## Repository Structure

```
FullStackOpen/
├── part0/           # Fundamentals of Web Apps
│   ├── 0.4/        # Sequence Diagram - Traditional Web App
│   ├── 0.5/        # Sequence Diagram - Single Page App (SPA)
│   └── 0.6/        # Sequence Diagram - SPA with Backend
│
├── part1/           # Introduction to React
│   ├── anecdotes/   # Anecdotes voting app
│   ├── courseinfo/  # Course info display component
│   └── unicafe/     # Cafe feedback statistics app
│
├── part2/           # Communicating with Server
│   ├── agenda/      # Contact list with CRUD operations
│   ├── countries/   # Countries information app
│   └── courseinfo/  # Enhanced course info with components
│
├── part3/           # Programming a Server with Node.js and Express
│   ├── agenda/      # Frontend for agenda application
│   └── agenda-backend/  # Express server with MongoDB
│
├── part4/           # Testing Express Servers
│   └── bloglist-backend/  # REST API with Jest tests
│
└── part5/           # Testing React Apps
    └── bloglist-frontend/  # React app with authentication and blog management
```

## Part 5: Blog List Frontend

The main application in this repository is the **Blog List Frontend** - a full-featured blog management application built with React.

### Features

- **User Authentication**
  - Login form with JWT token-based authentication
  - Session persistence using localStorage
  - Logout functionality

- **Blog Management**
  - Create new blogs (authenticated users only)
  - View blog list sorted by likes (descending order)
  - Toggle blog details (author, URL, likes)
  - Like button to increase blog ratings

- **User Experience**
  - Success/error messages with auto-dismiss (5 seconds)
  - Responsive design with Apple-inspired styling
  - Smooth transitions and hover effects
  - Clean, modern UI

### Technologies Used

**Frontend:**
- React 18
- React Hooks (useState, useEffect, useRef, useImperativeHandle)
- Axios for HTTP requests
- Vite as build tool
- CSS3 with semantic class names

**Backend Integration:**
- REST API with JWT authentication
- Token-based authorization headers
- CORS support

### Project Setup

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

#### Installation

```bash
cd part5/bloglist-frontend
npm install
```

#### Running the Application

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### File Structure

```
src/
├── App.jsx                 # Main application component
├── assets/
│   └── styles-refactored.css    # Apple-inspired styling
├── components/
│   ├── Blog.jsx           # Individual blog display with toggle
│   ├── BlogForm.jsx       # Form to create new blogs
│   ├── Login.jsx          # Login form component
│   └── Toggable.jsx       # Reusable toggle component
├── services/
│   ├── blogs.js           # Blog API service
│   └── login.js           # Login API service
└── main.jsx              # React entry point
```

### Key Components

#### App.jsx
Main component handling:
- User authentication state
- Blog list management
- Message notifications
- Form visibility toggling

#### Blog.jsx
Displays individual blog with:
- Title and author (always visible)
- Toggle for details (URL, likes)
- Like button functionality

#### Toggable.jsx
Reusable component for showing/hiding content with:
- Custom button label
- Toggle visibility control
- Cancel button

#### Services
- `blogs.js` - CRUD operations for blogs (requires authentication)
- `login.js` - User authentication service

### Authentication Flow

1. User enters credentials in login form
2. `handleLogin` calls `loginService.login()`
3. Backend returns JWT token, username, and name
4. User object with token stored in localStorage
5. Token included in Authorization header for subsequent requests
6. User session persists on page reload

### Styling

The application uses a modern, Apple-inspired design with:

- **Colors:** Clean grays and blues (#0071e3 as primary blue)
- **Typography:** System fonts (-apple-system, BlinkMacSystemFont)
- **Spacing:** Generous padding and margins for readability
- **Effects:** Smooth transitions and subtle shadows
- **Responsive:** Mobile-friendly design

CSS class naming conventions:
- `.app-container` - Main container
- `.form-*` - Form elements
- `.blog-*` - Blog-related styles
- `.message-*` - Notification styles
- `.user-*` - User information styles

### Deployment

The application is built to be deployed to production services like:
- Netlify
- Vercel
- Fly.io
- Heroku

Build for production:

```bash
npm run build
```

## Backend Requirements

This frontend application requires the **bloglist-backend** API running on the same machine or accessible via CORS.

Expected API endpoints:
- `POST /api/login` - User authentication
- `GET /api/blogs` - Fetch all blogs
- `POST /api/blogs` - Create new blog (requires auth)
- `PUT /api/blogs/:id` - Update blog (requires auth)

### Backend Setup

```bash
cd part4/bloglist-backend
npm install
npm start
```

Ensure the backend is running before starting the frontend application.

## Learning Outcomes

Through these exercises, you will learn:

- React fundamentals (components, hooks, state management)
- HTTP requests and REST APIs
- Authentication with JWT tokens
- Form handling and validation
- Component composition and reusability
- CSS styling and responsive design
- Testing and debugging
- Full-stack application development

## Course Information

- **Course:** Full Stack Open
- **University:** University of Helsinki
- **Website:** [fullstackopen.com](https://fullstackopen.com/)
- **Duration:** ~10 weeks
- **Languages:** JavaScript, React, Node.js, MongoDB

## Resources

- [Full Stack Open Official Course](https://fullstackopen.com/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Author

Mark Burmester

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- University of Helsinki for providing the excellent Full Stack Open course
- The open-source community for the tools and libraries used

## Notes

- This is a learning project for educational purposes
- The code demonstrates best practices for modern web development
- Feel free to use this as a reference for your own learning journey

---

**Last Updated:** December 4, 2025

For more information about specific parts or exercises, refer to the [Full Stack Open Course](https://fullstackopen.com/) documentation.
