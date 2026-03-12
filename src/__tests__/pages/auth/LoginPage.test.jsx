import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../utils'
import LoginPage from '../../../pages/auth/LoginPage'
import { authApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi: {
    login:    vi.fn(),
    register: vi.fn(),
  },
  usersApi:   {},
  booksApi:   {},
  readingApi: {},
  socialApi:  {},
  streaksApi: {},
  feedApi:    {},
}))

// Mock react-router navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  const renderLogin = () =>
    renderWithProviders(<LoginPage />, { route: '/login' })

  it('renderiza campos de email e senha', () => {
    renderLogin()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
  })

  it('renderiza botão de entrar', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('renderiza link para página de registro', () => {
    renderLogin()
    expect(screen.getByRole('link', { name: /criar conta/i })).toBeInTheDocument()
  })

  it('exibe erros de validação quando campos estão vazios', async () => {
    const user = userEvent.setup()
    renderLogin()
    await user.click(screen.getByRole('button', { name: /entrar/i }))
    expect((await screen.findAllByText('Campo obrigatório')).length).toBeGreaterThan(0)
    expect(authApi.login).not.toHaveBeenCalled()
  })

  it('chama login com email e senha corretos', async () => {
    const user = userEvent.setup()
    authApi.login.mockResolvedValue({
      token: 'tok', userId: 'u1', username: 'l', email: 'l@l.com',
    })

    renderLogin()

    await user.type(screen.getByLabelText(/email/i), 'l@l.com')
    await user.type(screen.getByLabelText(/senha/i), 'senha123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({ email: 'l@l.com', password: 'senha123' })
    })
  })

  it('navega para dashboard após login bem-sucedido', async () => {
    const user = userEvent.setup()
    authApi.login.mockResolvedValue({
      token: 'tok', userId: 'u1', username: 'l', email: 'l@l.com',
    })

    renderLogin()
    await user.type(screen.getByLabelText(/email/i), 'l@l.com')
    await user.type(screen.getByLabelText(/senha/i), 'senha123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'))
  })

  it('exibe toast de erro quando login falha', async () => {
    const user = userEvent.setup()
    authApi.login.mockRejectedValue({
      response: { data: { detail: 'Credenciais inválidas' } }
    })

    renderLogin()
    await user.type(screen.getByLabelText(/email/i), 'x@x.com')
    await user.type(screen.getByLabelText(/senha/i), 'errada')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument()
  })

  it('exibe mensagem genérica quando erro não tem detail', async () => {
    const user = userEvent.setup()
    authApi.login.mockRejectedValue(new Error('Network Error'))

    renderLogin()
    await user.type(screen.getByLabelText(/email/i), 'x@x.com')
    await user.type(screen.getByLabelText(/senha/i), 'errada')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Email ou senha incorretos')).toBeInTheDocument()
  })

  it('limpa erro de campo ao digitar novamente', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.click(screen.getByRole('button', { name: /entrar/i }))
    expect(await screen.findAllByText('Campo obrigatório')).not.toHaveLength(0)

    await user.type(screen.getByLabelText(/email/i), 'a')
    await waitFor(() => {
      // O erro de email some, mas o de senha ainda pode estar lá
      const errors = screen.queryAllByText('Campo obrigatório')
      expect(errors.length).toBeLessThan(2)
    })
  })
})
