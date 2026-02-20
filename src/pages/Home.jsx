import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const defaultBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Finished' },
  { id: 2, title: '1984', author: 'George Orwell', status: 'Finished' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Reading' },
  { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'Not Started' },
  { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', status: 'Reading' },
  { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'Not Started' },
]

function Home() {
  const { user } = useAuth()

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('books')
    return saved ? JSON.parse(saved) : defaultBooks
  })

  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({ title: '', author: '', status: 'Not Started' })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) errors.title = 'Book title is required'
    if (!formData.author.trim()) errors.author = 'Author name is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddBook = () => {
    setEditingBook(null)
    setFormData({ title: '', author: '', status: 'Not Started' })
    setFormErrors({})
    setShowForm(true)
  }

  const handleEditBook = (book) => {
    setEditingBook(book)
    setFormData({ title: book.title, author: book.author, status: book.status })
    setFormErrors({})
    setShowForm(true)
  }

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter((book) => book.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (editingBook) {
      setBooks(books.map((book) =>
        book.id === editingBook.id
          ? { ...book, title: formData.title, author: formData.author, status: formData.status }
          : book
      ))
    } else {
      const newBook = {
        id: Date.now(),
        title: formData.title,
        author: formData.author,
        status: formData.status,
      }
      setBooks([...books, newBook])
    }

    setShowForm(false)
    setEditingBook(null)
    setFormData({ title: '', author: '', status: 'Not Started' })
    setFormErrors({})
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingBook(null)
    setFormData({ title: '', author: '', status: 'Not Started' })
    setFormErrors({})
  }

  const handleStatusChange = (id, newStatus) => {
    setBooks(books.map((book) =>
      book.id === id ? { ...book, status: newStatus } : book
    ))
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="home">
        <h2>Welcome back, {user?.name}!</h2>
        <p>Track your reading journey. Keep a record of the books you have read, are reading, or plan to read.</p>
      </section>

      {/* Books Section */}
      <section className="books" id="books">
        <div className="books-header">
          <h2>My Book List</h2>
          <button className="add-book-btn" onClick={handleAddBook}>+ Add Book</button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="book-form-overlay">
            <div className="book-form">
              <h3>{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  {formErrors.title && <span className="error-text">{formErrors.title}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                  {formErrors.author && <span className="error-text">{formErrors.author}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="status">Reading Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Reading">Reading</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingBook ? 'Save Changes' : 'Add Book'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Book List */}
        {books.length === 0 ? (
          <p className="no-books">No books in your list. Click "+ Add Book" to get started!</p>
        ) : (
          <div className="book-list">
            {books.map((book) => (
              <div className="book-card" key={book.id}>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">by {book.author}</p>
                  <select
                    className={`status-select ${book.status.replace(' ', '-').toLowerCase()}`}
                    value={book.status}
                    onChange={(e) => handleStatusChange(book.id, e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Reading">Reading</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>
                <div className="book-actions">
                  <button className="edit-btn" onClick={() => handleEditBook(book)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <h2>About BookTracker</h2>
        <p>
          BookTracker is a simple website that helps you keep track of your reading
          progress. You can see which books you have finished, which ones you are
          currently reading, and which ones are on your to-read list.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p>Email: support@booktracker.com</p>
        <p>Phone: (613) 555-1234</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 BookTracker. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
