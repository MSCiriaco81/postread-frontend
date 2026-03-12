import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../../hooks/useAuth'
import { authApi } from '../../api'

vi.mock('../../api', () => ({
  authApi: {
    login:    vi.fn(),
    register: vi.fn(),
  }
}))

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('inicia sem usuário autenticado', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBeNull()
    expect(result.current.isAuth).toBe(false)
  })

  it('lê usuário do localStorage na inicialização', () => {
    const stored = { userId: 'u1', username: 'leitor', email: 'l@l.com', token: 'tok' }
    localStorage.setItem('postread_user', JSON.stringify(stored))

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.isAuth).toBe(true)
    expect(result.current.user.username).toBe('leitor')
  })

  it('login: salva token e user no localStorage', async () => {
    const data = { token: 'jwt-abc', userId: 'u1', username: 'leitor', email: 'l@l.com' }
    authApi.login.mockResolvedValue(data)

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('l@l.com', 'senha123')
    })

    expect(localStorage.getItem('postread_token')).toBe('jwt-abc')
    expect(result.current.isAuth).toBe(true)
    expect(result.current.user.username).toBe('leitor')
  })

  it('login: propaga erro da API', async () => {
    authApi.login.mockRejectedValue(new Error('Unauthorized'))

    const { result } = renderHook(() => useAuth(), { wrapper })

    await expect(
      act(async () => { await result.current.login('x@x.com', 'errado') })
    ).rejects.toThrow('Unauthorized')

    expect(result.current.isAuth).toBe(false)
  })

  it('register: salva dados e autentica usuário', async () => {
    const data = { token: 'jwt-xyz', userId: 'u2', username: 'novo', email: 'n@n.com' }
    authApi.register.mockResolvedValue(data)

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.register('novo', 'n@n.com', 'senha1234')
    })

    expect(result.current.user.username).toBe('novo')
    expect(result.current.isAuth).toBe(true)
    expect(authApi.register).toHaveBeenCalledWith({ username: 'novo', email: 'n@n.com', password: 'senha1234' })
  })

  it('logout: limpa localStorage e reseta estado', async () => {
    localStorage.setItem('postread_token', 'tok')
    localStorage.setItem('postread_user', JSON.stringify({ userId: 'u1', username: 'l', email: 'l@l.com' }))

    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => { result.current.logout() })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuth).toBe(false)
    expect(localStorage.getItem('postread_token')).toBeNull()
    expect(localStorage.getItem('postread_user')).toBeNull()
  })

  it('lança erro quando usado fora do AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used inside AuthProvider')
  })
})
