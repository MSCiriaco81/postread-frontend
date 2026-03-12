import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderAuthenticated } from '../../utils'
import DashboardPage from '../../../pages/dashboard/DashboardPage'
import { feedApi, readingApi, streaksApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi:    { login: vi.fn(), register: vi.fn() },
  feedApi:    { list: vi.fn() },
  readingApi: { list: vi.fn(), log: vi.fn(), remove: vi.fn(), range: vi.fn() },
  streaksApi: { list: vi.fn(), create: vi.fn(), checkIn: vi.fn(), getById: vi.fn() },
  usersApi: {}, booksApi: {}, socialApi: {},
}))

const pageOf = (content) => ({ content, totalElements: content.length, totalPages: 1, number: 0 })

const mockFeedEvent = {
  id: 'ev-1',
  actorUserId: 'amigo',
  targetUserId: 'user-1',
  eventType: 'READING_LOGGED',
  payload: { minutes: '30' },
  createdAt: new Date().toISOString(),
}

const mockReading = { id: 'r-1', bookId: 'book-1', minutesRead: 45, pagesRead: 30, date: '2024-03-01', rating: 4 }
const mockStreak  = { id: 's-1', title: 'Desafio', status: 'ACTIVE', currentStreak: 3, goalValue: 7, goalType: 'CONSECUTIVE_DAYS', participantIds: ['user-1'], bestStreak: 3 }

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    feedApi.list.mockResolvedValue(pageOf([mockFeedEvent]))
    readingApi.list.mockResolvedValue(pageOf([mockReading]))
    streaksApi.list.mockResolvedValue([mockStreak])
  })

  it('exibe saudação com o username do usuário autenticado', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText(/olá/i)).toBeInTheDocument()
    expect(await screen.findByText('leitor')).toBeInTheDocument()
  })

  it('exibe subtítulo de boas-vindas', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText(/o que você leu hoje/i)).toBeInTheDocument()
  })

  it('exibe total de minutos lidos nos stats', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('45min')).toBeInTheDocument()
  })

  it('exibe total de páginas nos stats', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('30p')).toBeInTheDocument()
  })

  it('exibe contagem de streaks ativos', async () => {
    renderAuthenticated(<DashboardPage />)
    // 1 streak com status ACTIVE
    expect(await screen.findByText('1')).toBeInTheDocument()
  })

  it('exibe seção de feed', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('Feed')).toBeInTheDocument()
  })

  it('exibe evento no feed', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('amigo')).toBeInTheDocument()
  })

  it('exibe seção de leituras recentes', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('Recentes')).toBeInTheDocument()
  })

  it('exibe leituras recentes com bookId', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('book-1')).toBeInTheDocument()
  })

  it('exibe data e métricas da leitura recente', async () => {
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText(/2024-03-01/)).toBeInTheDocument()
    expect(await screen.findByText(/45min · 30p/)).toBeInTheDocument()
  })

  it('exibe mensagem de feed vazio quando não há eventos', async () => {
    feedApi.list.mockResolvedValue(pageOf([]))
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText(/nenhuma atividade ainda/i)).toBeInTheDocument()
  })

  it('exibe mensagem de leituras vazio quando não há registros', async () => {
    readingApi.list.mockResolvedValue(pageOf([]))
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText(/nenhuma leitura registrada/i)).toBeInTheDocument()
  })

  it('stats mostram 0 quando não há leituras', async () => {
    readingApi.list.mockResolvedValue(pageOf([]))
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('0min')).toBeInTheDocument()
    expect(await screen.findByText('0p')).toBeInTheDocument()
  })

  it('streaks ativos são 0 quando todos estão BROKEN', async () => {
    streaksApi.list.mockResolvedValue([{ ...mockStreak, status: 'BROKEN' }])
    renderAuthenticated(<DashboardPage />)
    // estatística de streaks deve ser 0
    const statValues = await screen.findAllByText('0')
    expect(statValues.length).toBeGreaterThan(0)
  })

  it('soma minutos de múltiplas leituras', async () => {
    readingApi.list.mockResolvedValue(pageOf([
      { ...mockReading, minutesRead: 30 },
      { ...mockReading, id: 'r-2', minutesRead: 20 },
    ]))
    renderAuthenticated(<DashboardPage />)
    expect(await screen.findByText('50min')).toBeInTheDocument()
  })
})
