import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAuthenticated } from '../../utils'
import StreaksPage from '../../../pages/streaks/StreaksPage'
import { streaksApi, socialApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi:    { login: vi.fn(), register: vi.fn() },
  streaksApi: { list: vi.fn(), create: vi.fn(), checkIn: vi.fn(), getById: vi.fn() },
  socialApi:  { getFriends: vi.fn(), getPending: vi.fn(), sendRequest: vi.fn(), acceptRequest: vi.fn(), rejectRequest: vi.fn() },
  usersApi: {}, booksApi: {}, readingApi: {}, feedApi: {},
}))

const mockStreak = {
  id: 'streak-1',
  title: '7 dias seguidos',
  goalType: 'CONSECUTIVE_DAYS',
  goalValue: 7,
  currentStreak: 3,
  bestStreak: 5,
  status: 'ACTIVE',
  participantIds: ['user-1'],
}

describe('StreaksPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    streaksApi.list.mockResolvedValue([mockStreak])
    socialApi.getFriends.mockResolvedValue([])
  })

  it('renderiza o título da página', async () => {
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByText('Streaks')).toBeInTheDocument()
  })

  it('exibe streaks carregados', async () => {
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByText('7 dias seguidos')).toBeInTheDocument()
  })

  it('exibe progresso atual / meta', async () => {
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByText(/3 \/ 7/)).toBeInTheDocument()
  })

  it('exibe badge ACTIVE', async () => {
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByText('ACTIVE')).toBeInTheDocument()
  })

  it('exibe botão de check-in para streaks ativos', async () => {
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByRole('button', { name: /check-in/i })).toBeInTheDocument()
  })

  it('chama streaksApi.checkIn ao clicar no botão', async () => {
    const user = userEvent.setup()
    streaksApi.checkIn.mockResolvedValue({ id: 'act-1', completed: true })

    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /check-in/i }))

    await waitFor(() =>
      expect(streaksApi.checkIn).toHaveBeenCalledWith('streak-1', 30)
    )
  })

  it('exibe toast de sucesso após check-in', async () => {
    const user = userEvent.setup()
    streaksApi.checkIn.mockResolvedValue({ id: 'act-1', completed: true })

    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /check-in/i }))

    expect(await screen.findByText(/check-in realizado/i)).toBeInTheDocument()
  })

  it('exibe toast de erro quando check-in falha', async () => {
    const user = userEvent.setup()
    streaksApi.checkIn.mockRejectedValue(new Error('fail'))

    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /check-in/i }))

    expect(await screen.findByText('Erro no check-in')).toBeInTheDocument()
  })

  it('exibe estado vazio quando não há streaks', async () => {
    streaksApi.list.mockResolvedValue([])
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByText('Nenhum streak ativo.')).toBeInTheDocument()
  })

  it('estado vazio tem botão de criar streak', async () => {
    streaksApi.list.mockResolvedValue([])
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByRole('button', { name: /criar streak/i })).toBeInTheDocument()
  })

  it('abre modal ao clicar em Novo streak', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /novo streak/i }))
    expect(screen.getByRole('heading', { name: 'Criar streak' })).toBeInTheDocument()
  })

  it('fecha modal ao clicar em Cancelar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /novo streak/i }))
    await user.click(screen.getByRole('button', { name: /cancelar/i }))
    await waitFor(() => expect(screen.queryByText('Criar streak')).not.toBeInTheDocument())
  })

  it('valida título obrigatório no modal', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /novo streak/i }))
    await user.click(screen.getByRole('button', { name: /criar streak/i }))

    expect(await screen.findByText('Título é obrigatório')).toBeInTheDocument()
    expect(streaksApi.create).not.toHaveBeenCalled()
  })

  it('chama streaksApi.create com dados corretos', async () => {
    const user = userEvent.setup()
    streaksApi.create.mockResolvedValue(mockStreak)

    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /novo streak/i }))

    await user.type(screen.getByPlaceholderText(/30 dias/i), '30 dias de leitura')

    // Ajustar meta para 30
    const goalInput = screen.getAllByRole('spinbutton')[0]
    await user.clear(goalInput)
    await user.type(goalInput, '30')

    await user.click(screen.getByRole('button', { name: /criar streak/i }))

    await waitFor(() =>
      expect(streaksApi.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: '30 dias de leitura', goalValue: 30 })
      )
    )
  })

  it('exibe toast de sucesso após criar streak', async () => {
    const user = userEvent.setup()
    streaksApi.create.mockResolvedValue(mockStreak)

    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    await user.click(screen.getByRole('button', { name: /novo streak/i }))
    await user.type(screen.getByPlaceholderText(/30 dias/i), 'Meu desafio')
    await user.click(screen.getByRole('button', { name: /criar streak/i }))

    expect(await screen.findByText('Streak criado!')).toBeInTheDocument()
  })

  it('não exibe botão check-in para streak COMPLETED', async () => {
    streaksApi.list.mockResolvedValue([{ ...mockStreak, status: 'COMPLETED' }])
    renderAuthenticated(<StreaksPage />)
    await screen.findByText('7 dias seguidos')
    expect(screen.queryByRole('button', { name: /check-in/i })).not.toBeInTheDocument()
  })

  it('exibe melhor sequência quando bestStreak > 0', async () => {
    renderAuthenticated(<StreaksPage />)
    expect(await screen.findByText(/melhor: 5/)).toBeInTheDocument()
  })
})
