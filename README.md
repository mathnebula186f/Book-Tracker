# BookTracker

A React-based web application that helps users track their reading progress. Users can manage their personal book list, mark books as Finished, Reading, or Not Started, and keep track of their reading journey.

## Features

- **User Authentication** - Register and Login with email/password (localStorage-based)
- **Protected Routes** - Only logged-in users can access the book list
- **Book Management (CRUD)** - Add, Edit, and Delete books from your reading list
- **Quick Status Change** - Change book status directly from the book card dropdown
- **Form Validation** - All forms include client-side validation with error messages
- **Data Persistence** - All data (users, books, sessions) saved in localStorage

## Tech Stack

- **React 19** - Frontend UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **React Context API** - State management for authentication
- **localStorage** - Data persistence

## Project Structure

```
simple-website/
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── main.jsx                  # App entry point with BrowserRouter
    ├── App.jsx                   # Router setup and route definitions
    ├── App.css                   # Global styles
    ├── index.css                 # Base styles
    ├── context/
    │   └── AuthContext.jsx       # Authentication state management
    ├── components/
    │   ├── Navbar.jsx            # Navigation bar with auth-aware links
    │   └── ProtectedRoute.jsx   # Route guard for authenticated users
    └── pages/
        ├── Home.jsx              # Home page with book list and CRUD
        ├── Login.jsx             # Login page with validation
        ├── Login.css             # Auth form styles
        ├── Register.jsx          # Registration page with validation
        └── Register.css          # Register-specific styles
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

```bash
# Clone or navigate to the project folder
cd simple-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Production Build

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The production files will be generated in the `dist/` folder.

## Usage

1. **Register** - Create a new account with your name, email, and password
2. **Login** - Sign in with your registered credentials
3. **Add Books** - Click "+ Add Book" to add a new book to your list
4. **Edit Books** - Click "Edit" on any book card to modify its details
5. **Delete Books** - Click "Delete" to remove a book (with confirmation)
6. **Change Status** - Use the dropdown on each card to quickly update reading status
7. **Logout** - Click "Logout" in the navbar to end your session

## CST8334 - Software Development

This project was developed as part of the CST8334 Software Development course at Algonquin College. It demonstrates the professional Software Development Lifecycle (SDLC) process including planning, development, testing, and deployment.
