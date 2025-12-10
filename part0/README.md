# Part 0: Fundamentals of Web Apps

## Overview

Part 0 introduces the fundamentals of web applications, focusing on understanding how web applications work at a basic level. This part covers HTTP requests, DOM manipulation, and the differences between traditional web applications and single-page applications (SPAs).

## Exercises

### 0.4 - New Note (Traditional Web App)
Sequence diagram showing how a traditional web application works when adding a new note:
- Browser sends HTTP POST request
- Server processes the request
- Server returns new HTML page
- Browser renders the new page

**File:** `0.4/sequenceDiagramNotes.md`

### 0.5 - Single Page App (SPA)
Sequence diagram demonstrating a single-page application:
- Browser loads HTML/CSS/JS once
- JavaScript handles user interactions
- Asynchronous requests to server via AJAX
- DOM updated dynamically without full page reload

**File:** `0.5/sequenceDiagramSpa.md`

### 0.6 - New Note in SPA
Sequence diagram showing how a SPA with backend API works:
- JavaScript sends JSON data via HTTP request
- Server processes and stores data
- Server returns JSON response
- JavaScript updates DOM based on response

**File:** `0.6/sequenceDiagramNotesSpa.md`

## Key Concepts Learned

- HTTP request/response cycle
- Traditional server-side rendering
- Single-Page Application (SPA) architecture
- Asynchronous JavaScript (AJAX)
- RESTful API communication
- DOM manipulation
- Client-side vs Server-side rendering

## Tools Used

- Sequence diagram notation for visualizing application flow
- Understanding HTTP methods (GET, POST, PUT, DELETE)
- JSON data format

## Resources

- [Full Stack Open Part 0](https://fullstackopen.com/en/part0)
- [HTTP Protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

---

**Duration:** ~1-2 hours | **Difficulty:** Beginner
