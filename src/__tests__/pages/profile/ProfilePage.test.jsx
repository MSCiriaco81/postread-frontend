import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAuthenticated } from '../../utils'
import ProfilePage from '../../../pages/profile/ProfilePage'
import { usersApi } from '../../../api'

vi.mock('../../../api', () => ({
  authApi:    { login: vi.fn(), register: vi.fn() },
  usersApi:   { me: vi.fn(), updateProfile: vi.fn(), getById: vi.fn(), getByUsername: vi.fn() },
  booksApi:   {}, readingApi: {}, socialApi: {}, streaksApi: {}, feedApi: {},
}))

const mockProfile = {
  id: 'user-1',
  username: 'leitor',
  email: 'leitor@postread.com',
  bio: 'Amante de livros',
  profilePicture: null,
  createdAt: '2024-01-15T10:00:00Z',
}

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    usersApi.me.mockResolvedValue(mockProfile)
  })

  it('renderiza o username do usuário', async () => {
    renderAuthenticated(<ProfilePage />)
    expect(await screen.findByText('leitor')).toBeInTheDocument()
  })

  it('renderiza o email do usuário', async () => {
    renderAuthenticated(<ProfilePage />)
    expect(await screen.findByText('leitor@postread.com')).toBeInTheDocument()
  })

  it('renderiza a bio do usuário', async () => {
    renderAuthenticated(<ProfilePage />)
    expect(await screen.findByText('Amante de livros')).toBeInTheDocument()
  })

  it('renderiza o ano de cadastro', async () => {
    renderAuthenticated(<ProfilePage />)
    expect(await screen.findByText(/2024/)).toBeInTheDocument()
  })

  it('exibe avatar com inicial do username quando sem foto', async () => {
    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    expect(screen.getByText('L')).toBeInTheDocument() // inicial em maiúsculo
  })

  it('exibe botão de editar perfil', async () => {
    renderAuthenticated(<ProfilePage />)
    expect(await screen.findByRole('button', { name: /editar perfil/i })).toBeInTheDocument()
  })

  it('abre formulário de edição ao clicar em Editar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    await user.click(screen.getByRole('button', { name: /editar perfil/i }))
    expect(screen.getByText('Editar perfil')).toBeInTheDocument()
  })

  it('preenche o campo bio com o valor atual ao abrir o formulário', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    await user.click(screen.getByRole('button', { name: /editar perfil/i }))

    const bioField = screen.getByRole('textbox', { name: /bio/i })
    expect(bioField).toHaveValue('Amante de livros')
  })

  it('cancela edição ao clicar em Cancelar', async () => {
    const user = userEvent.setup()
    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    await user.click(screen.getByRole('button', { name: /editar perfil/i }))
    await user.click(screen.getByRole('button', { name: /cancelar/i }))
    await waitFor(() => expect(screen.queryByRole('heading', { name: 'Editar perfil' })).not.toBeInTheDocument())
  })

  it('chama usersApi.updateProfile ao salvar', async () => {
    const user = userEvent.setup()
    usersApi.updateProfile.mockResolvedValue({ ...mockProfile, bio: 'Nova bio' })
    usersApi.me.mockResolvedValue({ ...mockProfile, bio: 'Nova bio' })

    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    await user.click(screen.getByRole('button', { name: /editar perfil/i }))

    const bioField = screen.getByRole('textbox', { name: /bio/i })
    await user.clear(bioField)
    await user.type(bioField, 'Nova bio incrível')

    await user.click(screen.getByRole('button', { name: /salvar alterações/i }))

    await waitFor(() =>
      expect(usersApi.updateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ bio: 'Nova bio incrível' })
      )
    )
  })

  it('exibe toast de sucesso após salvar', async () => {
    const user = userEvent.setup()
    usersApi.updateProfile.mockResolvedValue(mockProfile)

    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    await user.click(screen.getByRole('button', { name: /editar perfil/i }))
    await user.click(screen.getByRole('button', { name: /salvar alterações/i }))

    expect(await screen.findByText('Perfil atualizado!')).toBeInTheDocument()
  })

  it('exibe toast de erro quando updateProfile falha', async () => {
    const user = userEvent.setup()
    usersApi.updateProfile.mockRejectedValue(new Error('Server Error'))

    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    await user.click(screen.getByRole('button', { name: /editar perfil/i }))
    await user.click(screen.getByRole('button', { name: /salvar alterações/i }))

    expect(await screen.findByText('Erro ao salvar')).toBeInTheDocument()
  })

  it('fecha o formulário após salvar com sucesso', async () => {
    const user = userEvent.setup()
    usersApi.updateProfile.mockResolvedValue(mockProfile)

    renderAuthenticated(<ProfilePage />)
    await screen.findByText('leitor')
    await user.click(screen.getByRole('button', { name: /editar perfil/i }))
    await user.click(screen.getByRole('button', { name: /salvar alterações/i }))

    await waitFor(() => expect(screen.queryByRole('heading', { name: 'Editar perfil' })).not.toBeInTheDocument())
  })

  it('exibe imagem de perfil quando profilePicture está definida', async () => {
    usersApi.me.mockResolvedValue({ ...mockProfile, profilePicture: 'https://img.test/photo.jpg' })
    renderAuthenticated(<ProfilePage />)
    const img = await screen.findByRole('img', { name: /avatar/i })
    expect(img).toHaveAttribute('src', 'https://img.test/photo.jpg')
  })
})
