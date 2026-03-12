import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAuthenticated } from '../../utils'
import FriendsPage from '../../../pages/social/FriendsPage'
import { socialApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi:    { login: vi.fn(), register: vi.fn() },
  socialApi:  {
    getFriends:     vi.fn(),
    getPending:     vi.fn(),
    sendRequest:    vi.fn(),
    acceptRequest:  vi.fn(),
    rejectRequest:  vi.fn(),
  },
  usersApi: {}, booksApi: {}, readingApi: {}, streaksApi: {}, feedApi: {},
}))

const mockFriend = { id: 'user-2', username: 'amigo', email: 'amigo@test.com', bio: 'Leitor ávido' }
const mockPending = { id: 'fr-1', requesterId: 'user-3', receiverId: 'user-1', status: 'PENDING' }

describe('FriendsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    socialApi.getFriends.mockResolvedValue([mockFriend])
    socialApi.getPending.mockResolvedValue([mockPending])
  })

  it('renderiza o título da página', async () => {
    renderAuthenticated(<FriendsPage />)
    expect(await screen.findByText('Amigos')).toBeInTheDocument()
  })

  it('exibe a seção de adicionar amigo', async () => {
    renderAuthenticated(<FriendsPage />)
    expect(await screen.findByText('Adicionar amigo')).toBeInTheDocument()
  })

  it('exibe a lista de amigos', async () => {
    renderAuthenticated(<FriendsPage />)
    expect(await screen.findByText('amigo')).toBeInTheDocument()
  })

  it('exibe bio do amigo', async () => {
    renderAuthenticated(<FriendsPage />)
    expect(await screen.findByText('Leitor ávido')).toBeInTheDocument()
  })

  it('exibe solicitações pendentes', async () => {
    renderAuthenticated(<FriendsPage />)
    expect(await screen.findByText('Solicitações pendentes')).toBeInTheDocument()
    expect(await screen.findByText('user-3')).toBeInTheDocument()
  })

  it('exibe badge com contagem de pendentes', async () => {
    renderAuthenticated(<FriendsPage />)
    const heading = await screen.findByRole('heading', { name: /solicitações pendentes/i })
    expect(within(heading).getByText('1')).toBeInTheDocument()
  })

  it('não exibe seção de pendentes quando a lista está vazia', async () => {
    socialApi.getPending.mockResolvedValue([])
    renderAuthenticated(<FriendsPage />)
    await screen.findByText('amigo')
    expect(screen.queryByText('Solicitações pendentes')).not.toBeInTheDocument()
  })

  it('envia solicitação ao clicar em Enviar pedido', async () => {
    const user = userEvent.setup()
    socialApi.sendRequest.mockResolvedValue({ id: 'fr-2', status: 'PENDING' })

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('amigo')

    await user.type(screen.getByPlaceholderText(/id do usuário/i), 'user-99')
    await user.click(screen.getByRole('button', { name: /enviar pedido/i }))

    await waitFor(() =>
      expect(socialApi.sendRequest).toHaveBeenCalledWith('user-99')
    )
  })

  it('exibe toast de sucesso após enviar solicitação', async () => {
    const user = userEvent.setup()
    socialApi.sendRequest.mockResolvedValue({ id: 'fr-2', status: 'PENDING' })

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('amigo')
    await user.type(screen.getByPlaceholderText(/id do usuário/i), 'user-99')
    await user.click(screen.getByRole('button', { name: /enviar pedido/i }))

    expect(await screen.findByText('Solicitação enviada!')).toBeInTheDocument()
  })

  it('limpa campo após enviar solicitação', async () => {
    const user = userEvent.setup()
    socialApi.sendRequest.mockResolvedValue({ id: 'fr-2', status: 'PENDING' })

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('amigo')
    const input = screen.getByPlaceholderText(/id do usuário/i)
    await user.type(input, 'user-99')
    await user.click(screen.getByRole('button', { name: /enviar pedido/i }))

    await waitFor(() => expect(input).toHaveValue(''))
  })

  it('envia solicitação ao pressionar Enter no campo', async () => {
    const user = userEvent.setup()
    socialApi.sendRequest.mockResolvedValue({ id: 'fr-2', status: 'PENDING' })

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('amigo')
    await user.type(screen.getByPlaceholderText(/id do usuário/i), 'user-99{Enter}')

    await waitFor(() => expect(socialApi.sendRequest).toHaveBeenCalledWith('user-99'))
  })

  it('não envia solicitação com campo vazio', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<FriendsPage />)
    await screen.findByText('amigo')
    await user.click(screen.getByRole('button', { name: /enviar pedido/i }))
    expect(socialApi.sendRequest).not.toHaveBeenCalled()
  })

  it('exibe toast de erro quando sendRequest falha', async () => {
    const user = userEvent.setup()
    socialApi.sendRequest.mockRejectedValue({ response: { data: { detail: 'Usuário não encontrado' } } })

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('amigo')
    await user.type(screen.getByPlaceholderText(/id do usuário/i), 'user-x')
    await user.click(screen.getByRole('button', { name: /enviar pedido/i }))

    expect(await screen.findByText('Usuário não encontrado')).toBeInTheDocument()
  })

  it('aceita solicitação pendente ao clicar no botão aceitar', async () => {
    const user = userEvent.setup()
    socialApi.acceptRequest.mockResolvedValue({ ...mockPending, status: 'ACCEPTED' })

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('user-3')

    const acceptBtn = screen.getByTitle('Aceitar')
    await user.click(acceptBtn)

    await waitFor(() =>
      expect(socialApi.acceptRequest).toHaveBeenCalledWith('fr-1')
    )
  })

  it('exibe toast de sucesso ao aceitar solicitação', async () => {
    const user = userEvent.setup()
    socialApi.acceptRequest.mockResolvedValue({ ...mockPending, status: 'ACCEPTED' })
    // First call returns initial state (1 pending), subsequent calls return post-accept state
    socialApi.getPending.mockResolvedValueOnce([mockPending]).mockResolvedValue([])
    socialApi.getFriends.mockResolvedValueOnce([mockFriend]).mockResolvedValue([mockFriend, { id: 'user-3', username: 'user-3', email: 'u3@t.com' }])

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('user-3')
    await user.click(screen.getByTitle('Aceitar'))

    expect(await screen.findByText('Amigo adicionado!')).toBeInTheDocument()
  })

  it('rejeita solicitação ao clicar no botão rejeitar', async () => {
    const user = userEvent.setup()
    socialApi.rejectRequest.mockResolvedValue(null)
    socialApi.getPending.mockResolvedValueOnce([mockPending]).mockResolvedValueOnce([])

    renderAuthenticated(<FriendsPage />)
    await screen.findByText('user-3')
    await user.click(screen.getByTitle('Rejeitar'))

    await waitFor(() =>
      expect(socialApi.rejectRequest).toHaveBeenCalledWith('fr-1')
    )
  })

  it('exibe mensagem quando não há amigos', async () => {
    socialApi.getFriends.mockResolvedValue([])
    socialApi.getPending.mockResolvedValue([])
    renderAuthenticated(<FriendsPage />)
    expect(await screen.findByText(/nenhum amigo ainda/i)).toBeInTheDocument()
  })
})
