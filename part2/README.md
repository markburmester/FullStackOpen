# Part 2: Communicating with Server

## Overview

Part 2 focuses on communication between React frontend and backend servers. This part covers HTTP requests, REST APIs, JSON data handling, and using Axios for asynchronous operations.

## Exercises

### 2.1-2.5: Course Info with Components
Enhanced version of Part 1 course info with better component structure:
- Component decomposition
- Passing complex data structures as props
- Component reusability

**Directory:** `courseinfo/`

### 2.6-2.10: Phonebook (Agenda)
Full CRUD application for managing contacts:
- Creating, reading, updating, and deleting contacts
- Filtering and searching
- Form handling and validation
- Error handling
- JSON server for persistent storage

**Directory:** `agenda/`

**Features:**
- Add new contacts
- Search/filter contacts by name
- Delete contacts
- Prevent duplicate names
- Persistent data with `db.json`

### 2.11-2.13: Countries Information App
Application displaying information about countries:
- Fetching data from external API (REST Countries)
- Handling loading states
- Error handling for API requests
- Searching and filtering countries
- Weather information for selected country

**Directory:** `countries/`

**Features:**
- Search countries by name
- Display country information (capital, area, languages, flag)
- View weather for country capital
- Responsive design

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- JSON Server for agenda project
- External APIs:
  - REST Countries API: https://restcountries.com
  - Open Weather API: https://openweathermap.org

### Installation

```bash
cd part2/<project-name>
npm install
```

### Running Agenda (with JSON Server)

```bash
# Terminal 1: Start JSON Server
npm run server

# Terminal 2: Start development server
npm run dev
```

### Running Other Projects

```bash
npm run dev
```

## Key Concepts

### HTTP Requests
- GET, POST, PUT, DELETE methods
- Request and response structure
- Status codes and error handling

### Axios Library
- Making HTTP requests
- Request configuration and headers
- Response handling with `.then()` and `.catch()`
- Promises and async/await

### State Management
- Loading states during async operations
- Error states and error handling
- Displaying appropriate UI based on state

### Form Handling
- Controlled components
- Form validation
- Preventing default behavior
- Input field management

### JSON Data
- JSON structure and format
- Parsing and stringifying JSON
- Working with nested data structures

### API Integration
- RESTful API principles
- CORS (Cross-Origin Resource Sharing)
- External API consumption

## Technologies Used

- React 18
- Axios for HTTP requests
- JSON Server for mock backend
- REST APIs
- Promises and async/await
- Vite (build tool)
- CSS for styling

## File Structure

```
part2/
├── courseinfo/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Course.jsx
│   │   │   └── ...
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── agenda/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── services/
│   │   │   └── contacts.js
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactList.jsx
│   │   │   └── ...
│   │   ├── main.jsx
│   │   └── index.css
│   ├── db.json
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── countries/
    ├── src/
    │   ├── App.jsx
    │   ├── services/
    │   │   └── countries.js
    │   ├── components/
    │   │   ├── CountryList.jsx
    │   │   ├── CountryDetail.jsx
    │   │   └── ...
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Service Abstraction Pattern

Creating separate service files for API calls:

```javascript
// services/contacts.js
import axios from 'axios'

const baseURL = 'http://localhost:3001/contacts'

const getAll = () => axios.get(baseURL).then(res => res.data)
const create = (obj) => axios.post(baseURL, obj).then(res => res.data)
const update = (id, obj) => axios.put(`${baseURL}/${id}`, obj).then(res => res.data)
const remove = (id) => axios.delete(`${baseURL}/${id}`)

export default { getAll, create, update, remove }
```

## Learning Outcomes

- Understanding HTTP communication
- Making API requests with Axios
- Handling asynchronous operations
- Error handling and user feedback
- Component communication patterns
- REST API principles
- Working with external APIs
- Form validation and submission
- State management for async operations

## Common Issues and Solutions

### CORS Errors
- Use JSON Server or backend with CORS enabled
- Check browser console for specific errors

### Loading States
- Show loading indicator during requests
- Disable buttons while processing
- Handle slow network gracefully

### Error Handling
- Display meaningful error messages to user
- Log errors to console for debugging
- Provide retry mechanisms

## Resources

- [Full Stack Open Part 2](https://fullstackopen.com/en/part2)
- [Axios Documentation](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [REST Countries API](https://restcountries.com)
- [Open Weather API](https://openweathermap.org)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Notes

- JSON Server runs on port 3001 by default
- Vite dev server runs on port 5173 by default
- Free tier APIs may have rate limits
- Always handle loading and error states

---

**Duration:** ~8-10 hours | **Difficulty:** Intermediate
