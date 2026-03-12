import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAuthenticated } from '../../utils'
import ReadingPage from '../../../pages/reading/ReadingPage'
import { readingApi, booksApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi:    { login: vi.fn(), register: vi.fn() },
  booksApi:   { search: vi.fn(), getById: vi.fn(), create: vi.fn() },
  readingApi: { list: vi.fn(), log: vi.fn(), remove: vi.fn(), range: vi.fn() },
  usersApi:   {}, socialApi: {}, streaksApi: {}, feedApi: {},
}))

const pageOf = (content) => ({ content, totalElements: content.length, totalPages: 1, number: 0 })

const mockEntry = {
  id: 'entry-1',
  bookId: 'book-1',
  minutesRead: 45,
  pagesRead: 30,
  rating: 4,
  notes: 'Muito bom',
  date: '2024-03-01',
}

describe('ReadingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    readingApi.list.mockResolvedValue(pageOf([mockEntry]))
    booksApi.search.mockResolvedValue(pageOf([
      { id: 'book-1', title: 'Dom Quixote', author: 'Cervantes' },
    ]))
  })

  it('renderiza o título da página', async () => {
    renderAuthenticated(<ReadingPage />)
    expect(await screen.findByText('Leituras')).toBeInTheDocument()
  })

  it('exibe entradas de leitura após carregamento', async () => {
    renderAuthenticated(<ReadingPage />)
    expect(await screen.findByText('book-1')).toBeInTheDocument()
    expect(screen.getByText('45min')).toBeInTheDocument()
    expect(screen.getByText('30p')).toBeInTheDocument()
  })

  it('exibe data da leitura', async () => {
    renderAuthenticated(<ReadingPage />)
    expect(await screen.findByText('2024-03-01')).toBeInTheDocument()
  })

  it('exibe notas da leitura', async () => {
    renderAuthenticated(<ReadingPage />)
    expect(await screen.findByText('Muito bom')).toBeInTheDocument()
  })

  it('exibe estado vazio quando não há leituras', async () => {
    readingApi.list.mockResolvedValue(pageOf([]))
    renderAuthenticated(<ReadingPage />)
    expect(await screen.findByText('Nenhuma leitura ainda.')).toBeInTheDocument()
  })

  it('abre modal ao clicar em Registrar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('Leituras')
    await user.click(screen.getByRole('button', { name: /registrar/i }))
    expect(screen.getByText('Registrar leitura')).toBeInTheDocument()
  })

  it('fecha modal ao clicar em Cancelar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('Leituras')
    await user.click(screen.getByRole('button', { name: /registrar/i }))
    await user.click(screen.getByRole('button', { name: /cancelar/i }))
    await waitFor(() => expect(screen.queryByText('Registrar leitura')).not.toBeInTheDocument())
  })

  it('busca livros ao digitar no modal', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('Leituras')
    await user.click(screen.getByRole('button', { name: /registrar/i }))

    const bookInput = screen.getByPlaceholderText('Buscar livro...')
    await user.type(bookInput, 'qui')

    await waitFor(() => expect(booksApi.search).toHaveBeenCalledWith('qui'))
    expect(await screen.findByText('Dom Quixote')).toBeInTheDocument()
  })

  it('seleciona livro ao clicar na sugestão', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('Leituras')
    await user.click(screen.getByRole('button', { name: /registrar/i }))

    await user.type(screen.getByPlaceholderText('Buscar livro...'), 'dom')
    await screen.findByText('Dom Quixote')
    await user.click(screen.getByText('Dom Quixote'))

    expect(await screen.findByText(/livro selecionado: book-1/i)).toBeInTheDocument()
  })

  it('exibe erro se tentar salvar sem selecionar livro', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('Leituras')
    await user.click(screen.getByRole('button', { name: /registrar/i }))
    await user.click(screen.getByRole('button', { name: /salvar/i }))

    expect(await screen.findByText('Selecione um livro')).toBeInTheDocument()
    expect(readingApi.log).not.toHaveBeenCalled()
  })

  it('chama readingApi.log com dados corretos', async () => {
    const user = userEvent.setup()
    readingApi.log.mockResolvedValue(mockEntry)
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('Leituras')

    await user.click(screen.getByRole('button', { name: /registrar/i }))
    await user.type(screen.getByPlaceholderText('Buscar livro...'), 'dom')
    await screen.findByText('Dom Quixote')
    await user.click(screen.getByText('Dom Quixote'))

    // Preencher minutos
    const labels = screen.getAllByRole('spinbutton') // inputs type=number
    await user.clear(labels[0])
    await user.type(labels[0], '60')

    await user.click(screen.getByRole('button', { name: /salvar/i }))

    await waitFor(() =>
      expect(readingApi.log).toHaveBeenCalledWith(
        expect.objectContaining({ bookId: 'book-1', minutesRead: 60 })
      )
    )
  })

  it('exibe toast de sucesso após registrar leitura', async () => {
    const user = userEvent.setup()
    readingApi.log.mockResolvedValue(mockEntry)
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('Leituras')

    await user.click(screen.getByRole('button', { name: /registrar/i }))
    await user.type(screen.getByPlaceholderText('Buscar livro...'), 'dom')
    await screen.findByText('Dom Quixote')
    await user.click(screen.getByText('Dom Quixote'))
    await user.click(screen.getByRole('button', { name: /salvar/i }))

    expect(await screen.findByText('Leitura registrada!')).toBeInTheDocument()
  })

  it('remove leitura ao confirmar o diálogo', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    readingApi.remove.mockResolvedValue({})
    readingApi.list.mockResolvedValueOnce(pageOf([mockEntry]))
                   .mockResolvedValueOnce(pageOf([]))

    renderAuthenticated(<ReadingPage />)
    await screen.findByText('book-1')

    await user.click(screen.getByTitle('Remover'))
    await waitFor(() => expect(readingApi.remove).toHaveBeenCalledWith('entry-1'))
  })

  it('não remove leitura se usuário cancelar o confirm', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    renderAuthenticated(<ReadingPage />)
    await screen.findByText('book-1')

    await user.click(screen.getByTitle('Remover'))
    expect(readingApi.remove).not.toHaveBeenCalled()
  })
})
