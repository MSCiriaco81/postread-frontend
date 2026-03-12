import { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('postread_user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password })
    localStorage.setItem('postread_token', data.token)
    localStorage.setItem('postread_user', JSON.stringify(data))
    setUser(data)
    return data
  }, [])

  const register = useCallback(async (username, email, password) => {
    const data = await authApi.register({ username, email, password })
    localStorage.setItem('postread_token', data.token)
    localStorage.setItem('postread_user', JSON.stringify(data))
    setUser(data)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('postread_token')
    localStorage.removeItem('postread_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
