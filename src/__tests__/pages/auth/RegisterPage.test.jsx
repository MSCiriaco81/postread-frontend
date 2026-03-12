import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../utils'
import RegisterPage from '../../../pages/auth/RegisterPage'
import { authApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi: { login: vi.fn(), register: vi.fn() },
  usersApi: {}, booksApi: {}, readingApi: {}, socialApi: {}, streaksApi: {}, feedApi: {},
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('RegisterPage', () => {
  beforeEach(() => { vi.clearAllMocks(); localStorage.clear() })

  const renderRegister = () => renderWithProviders(<RegisterPage />, { route: '/register' })

  it('renderiza todos os campos do formulário', () => {
    renderRegister()
    expect(screen.getByLabelText(/nome de usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
  })

  it('renderiza botão de criar conta', () => {
    renderRegister()
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument()
  })

  it('renderiza link para login', () => {
    renderRegister()
    expect(screen.getByRole('link', { name: /entrar/i })).toBeInTheDocument()
  })

  it('valida username com menos de 3 caracteres', async () => {
    const user = userEvent.setup()
    renderRegister()
    await user.type(screen.getByLabelText(/nome de usuário/i), 'ab')
    await user.click(screen.getByRole('button', { name: /criar conta/i }))
    expect(await screen.findByText(/mínimo 3/i)).toBeInTheDocument()
    expect(authApi.register).not.toHaveBeenCalled()
  })

  it('valida senha com menos de 8 caracteres', async () => {
    const user = userEvent.setup()
    renderRegister()
    await user.type(screen.getByLabelText(/nome de usuário/i), 'leitor')
    await user.type(screen.getByLabelText(/email/i), 'l@l.com')
    await user.type(screen.getByLabelText(/senha/i), '1234567')
    await user.click(screen.getByRole('button', { name: /criar conta/i }))
    expect(await screen.findByText(/mínimo 8/i)).toBeInTheDocument()
  })

  it('chama register com dados corretos', async () => {
    const user = userEvent.setup()
    authApi.register.mockResolvedValue({ token: 'tok', userId: 'u1', username: 'leitor', email: 'l@l.com' })

    renderRegister()
    await user.type(screen.getByLabelText(/nome de usuário/i), 'leitor')
    await user.type(screen.getByLabelText(/email/i), 'leitor@postread.com')
    await user.type(screen.getByLabelText(/senha/i), 'senha1234')
    await user.click(screen.getByRole('button', { name: /criar conta/i }))

    await waitFor(() => {
      expect(authApi.register).toHaveBeenCalledWith({
        username: 'leitor',
        email: 'leitor@postread.com',
        password: 'senha1234',
      })
    })
  })

  it('navega para dashboard após registro bem-sucedido', async () => {
    const user = userEvent.setup()
    authApi.register.mockResolvedValue({ token: 'tok', userId: 'u1', username: 'leitor', email: 'l@l.com' })

    renderRegister()
    await user.type(screen.getByLabelText(/nome de usuário/i), 'leitor')
    await user.type(screen.getByLabelText(/email/i), 'leitor@postread.com')
    await user.type(screen.getByLabelText(/senha/i), 'senha1234')
    await user.click(screen.getByRole('button', { name: /criar conta/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'))
  })

  it('exibe toast de erro quando registro falha por email duplicado', async () => {
    const user = userEvent.setup()
    authApi.register.mockRejectedValue({ response: { data: { detail: 'Email already in use' } } })

    renderRegister()
    await user.type(screen.getByLabelText(/nome de usuário/i), 'leitor')
    await user.type(screen.getByLabelText(/email/i), 'dup@dup.com')
    await user.type(screen.getByLabelText(/senha/i), 'senha1234')
    await user.click(screen.getByRole('button', { name: /criar conta/i }))

    expect(await screen.findByText('Email already in use')).toBeInTheDocument()
  })
})
