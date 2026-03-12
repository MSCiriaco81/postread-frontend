import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../hooks/useAuth'
import { ToastProvider } from '../components/ui/Toast'
import { ProtectedRoute, PublicOnlyRoute } from '../routes/Guards'

function setup(initialPath, isAuthenticated = false) {
  if (isAuthenticated) {
    localStorage.setItem('postread_token', 'tok')
    localStorage.setItem('postread_user', JSON.stringify({ userId: 'u1', username: 'l', email: 'l@l.com', token: 'tok' }))
  } else {
    localStorage.clear()
  }

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<div>Dashboard</div>} />
            </Route>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<div>Login</div>} />
            </Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => localStorage.clear())

  it('redireciona para /login quando não autenticado', () => {
    setup('/dashboard', false)
    // Não deve mostrar dashboard — deve redirecionar para login ou 404
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('renderiza conteúdo quando autenticado', () => {
    setup('/dashboard', true)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})

describe('PublicOnlyRoute', () => {
  beforeEach(() => localStorage.clear())

  it('renderiza página pública quando não autenticado', () => {
    setup('/login', false)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('redireciona para /dashboard quando autenticado', () => {
    setup('/login', true)
    // Login não deve mais estar visível
    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
