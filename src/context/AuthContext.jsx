import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return { success: false, message: 'Email already registered' }
    }

    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    const currentUser = { name, email }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    setUser(currentUser)

    return { success: true }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' }
    }

    const currentUser = { name: foundUser.name, email: foundUser.email }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    setUser(currentUser)

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
