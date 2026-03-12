import { render } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../hooks/useAuth'
import { ToastProvider } from '../components/ui/Toast'

/**
 * Render a component wrapped in all app providers.
 * @param {JSX.Element} ui
 * @param {{ route?: string, initialEntries?: string[] }} options
 */
export function renderWithProviders(ui, { route = '/', initialEntries } = {}) {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={initialEntries ?? [route]}>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>
  )
  return render(ui, { wrapper: Wrapper })
}

/**
 * Render an authenticated user context (pre-seeds localStorage).
 */
export function renderAuthenticated(ui, options = {}) {
  localStorage.setItem('postread_token', 'fake-jwt-token')
  localStorage.setItem('postread_user', JSON.stringify({
    token: 'fake-jwt-token',
    userId: 'user-1',
    username: 'leitor',
    email: 'leitor@postread.com',
  }))
  return renderWithProviders(ui, options)
}

export { screen, waitFor, fireEvent, within, act } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
