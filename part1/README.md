# Part 1: Introduction to React

## Overview

Part 1 introduces React, the JavaScript library for building user interfaces. This part covers fundamental React concepts including components, JSX, state, props, and event handling.

## Exercises

### 1.1-1.5: Course Info Component
Building a React component that displays course information:
- Component structure and composition
- JSX syntax
- Props for passing data to components
- Mapping over arrays to render lists

**Directory:** `courseinfo/`

### 1.6-1.11: Unicafe Feedback Counter
Interactive feedback application with statistics:
- State management with `useState` hook
- Event handlers for button clicks
- Conditional rendering
- Calculating statistics (average, percentages)
- Displaying results dynamically

**Directory:** `unicafe/`

### 1.12-1.14: Anecdotes App
Anecdotes voting and random selection application:
- Random selection from array
- Vote tracking with state
- Finding max value from array
- Rendering top-voted anecdote
- Component state management

**Directory:** `anecdotes/`

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
cd part1/<project-name>
npm install
npm run dev
```

## Key Concepts

### Components
- Functional components as JavaScript functions
- JSX syntax for writing HTML-like code in JavaScript
- Component composition and reusability

### Props
- Passing data from parent to child components
- Props are read-only
- Destructuring props in function parameters

### State
- Using `useState` hook for managing component state
- State is local to component
- Updating state triggers re-render
- Functional updates

### Event Handling
- onClick, onChange handlers
- Event object and event handling
- Arrow functions in event handlers

### Conditional Rendering
- Using ternary operators
- Logical AND (&&) for conditional rendering
- Rendering different components based on state

## Technologies Used

- React 18
- JSX
- React Hooks (useState)
- Vite (build tool)
- CSS for styling

## File Structure

```
part1/
├── courseinfo/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── unicafe/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── anecdotes/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Learning Outcomes

- Understanding React component model
- Working with JSX syntax
- Managing component state with hooks
- Handling user events
- Building interactive applications
- Component composition and reusability
- Array operations (map, filter, find)

## Running Exercises

Each exercise can be run independently:

```bash
# Course Info
cd courseinfo && npm run dev

# Unicafe
cd unicafe && npm run dev

# Anecdotes
cd anecdotes && npm run dev
```

## Common Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Resources

- [Full Stack Open Part 1](https://fullstackopen.com/en/part1)
- [React Documentation](https://react.dev/)
- [React Hooks API](https://react.dev/reference/react)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)

## Notes

- Each sub-project is independent and can run on different ports
- Default port for Vite dev server: 5173
- Modify `vite.config.js` to change port if needed

---

**Duration:** ~5-7 hours | **Difficulty:** Beginner to Intermediate
