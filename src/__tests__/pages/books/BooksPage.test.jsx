import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAuthenticated } from '../../utils'
import BooksPage from '../../../pages/books/BooksPage'
import { booksApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi:    { login: vi.fn(), register: vi.fn() },
  booksApi: {
    search: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
  },
  usersApi:   {}, readingApi: {}, socialApi: {}, streaksApi: {}, feedApi: {},
}))

const pageOf = (content) => ({ content, totalElements: content.length, totalPages: 1, number: 0 })

describe('BooksPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    booksApi.search.mockResolvedValue(pageOf([
      { id: 'b1', title: 'Dom Quixote', author: 'Cervantes', genre: 'Clássico', pageCount: 1000 },
      { id: 'b2', title: 'O Senhor dos Anéis', author: 'Tolkien', genre: 'Fantasia', pageCount: 1200 },
    ]))
  })

  it('renderiza o título da página', async () => {
    renderAuthenticated(<BooksPage />)
    expect(await screen.findByText('Explorar livros')).toBeInTheDocument()
  })

  it('mostra livros após carregamento', async () => {
    renderAuthenticated(<BooksPage />)
    expect(await screen.findByText('Dom Quixote')).toBeInTheDocument()
    expect(await screen.findByText('O Senhor dos Anéis')).toBeInTheDocument()
  })

  it('exibe autor dos livros', async () => {
    renderAuthenticated(<BooksPage />)
    expect(await screen.findByText('Cervantes')).toBeInTheDocument()
    expect(await screen.findByText('Tolkien')).toBeInTheDocument()
  })

  it('busca livros ao pressionar Enter no campo de busca', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<BooksPage />)

    const input = await screen.findByPlaceholderText(/buscar/i)
    await user.type(input, 'quixote{Enter}')

    await waitFor(() => {
      expect(booksApi.search).toHaveBeenCalledWith(expect.stringContaining('quixote'), 0, 20)
    })
  })

  it('busca ao clicar no botão Buscar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<BooksPage />)

    const input = await screen.findByPlaceholderText(/buscar/i)
    await user.type(input, 'tolkien')
    await user.click(screen.getByRole('button', { name: /buscar/i }))

    await waitFor(() => {
      expect(booksApi.search).toHaveBeenCalledWith(expect.stringContaining('tolkien'), 0, 20)
    })
  })

  it('exibe mensagem quando nenhum resultado é encontrado', async () => {
    booksApi.search.mockResolvedValue(pageOf([]))
    const user = userEvent.setup()
    renderAuthenticated(<BooksPage />)

    const input = await screen.findByPlaceholderText(/buscar/i)
    await user.type(input, 'xyz{Enter}')

    expect(await screen.findByText(/nenhum livro encontrado/i)).toBeInTheDocument()
  })

  it('abre modal ao clicar em Adicionar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<BooksPage />)

    await screen.findByText('Dom Quixote') // aguarda render
    await user.click(screen.getByRole('button', { name: /adicionar/i }))

    expect(screen.getByText('Adicionar livro')).toBeInTheDocument()
  })

  it('fecha modal ao clicar em Cancelar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<BooksPage />)

    await screen.findByText('Dom Quixote')
    await user.click(screen.getByRole('button', { name: /adicionar/i }))
    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    await waitFor(() => {
      expect(screen.queryByText('Adicionar livro')).not.toBeInTheDocument()
    })
  })

  it('chama booksApi.create ao salvar livro no modal', async () => {
    const user = userEvent.setup()
    booksApi.create.mockResolvedValue({ id: 'b3', title: 'Novo Livro', author: 'Autor' })

    renderAuthenticated(<BooksPage />)
    await screen.findByText('Dom Quixote')

    await user.click(screen.getByRole('button', { name: /adicionar/i }))

    // Preencher campos do modal (usando placeholders ou labels)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[1], 'Novo Livro') // título (inputs[0] é a barra de busca)
    await user.type(inputs[2], 'Autor Teste') // autor

    await user.click(screen.getByRole('button', { name: /salvar livro/i }))

    await waitFor(() => {
      expect(booksApi.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Novo Livro', author: 'Autor Teste' })
      )
    })
  })
})
