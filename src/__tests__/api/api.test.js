import { describe, it, expect, beforeEach } from 'vitest'
import { authApi, booksApi, readingApi, socialApi, streaksApi, feedApi } from '../../api'
import { mockUser, mockBook, mockReading, mockStreak, mockFriend, mockFeedEvent } from '../mocks/handlers'

// MSW intercepts these calls globally via setup.js

describe('authApi', () => {
  it('login retorna dados do usuário', async () => {
    const result = await authApi.login({ email: 'l@l.com', password: '123' })
    expect(result.token).toBe('fake-jwt-token')
    expect(result.username).toBe('leitor')
  })

  it('register retorna dados do usuário criado', async () => {
    const result = await authApi.register({ username: 'leitor', email: 'l@l.com', password: '12345678' })
    expect(result.userId).toBe('user-1')
  })
})

describe('booksApi', () => {
  it('search retorna página de livros', async () => {
    const result = await booksApi.search('quixote')
    expect(result.content).toHaveLength(1)
    expect(result.content[0].title).toBe('Dom Quixote')
  })

  it('getById retorna o livro correto', async () => {
    const result = await booksApi.getById('book-1')
    expect(result.id).toBe('book-1')
    expect(result.author).toBe('Cervantes')
  })

  it('create retorna o livro criado', async () => {
    const result = await booksApi.create({ title: 'Dom Quixote', author: 'Cervantes' })
    expect(result.title).toBe('Dom Quixote')
  })
})

describe('readingApi', () => {
  it('list retorna página de leituras', async () => {
    const result = await readingApi.list()
    expect(result.content[0].minutesRead).toBe(45)
  })

  it('log registra uma leitura', async () => {
    const result = await readingApi.log({ bookId: 'book-1', minutesRead: 30 })
    expect(result.id).toBe('entry-1')
  })

  it('range retorna leituras no intervalo', async () => {
    const result = await readingApi.range('2024-01-01', '2024-03-31')
    expect(result).toHaveLength(1)
  })

  it('remove não lança erro para 204', async () => {
    await expect(readingApi.remove('entry-1')).resolves.not.toThrow()
  })
})

describe('socialApi', () => {
  it('getFriends retorna lista de amigos', async () => {
    const result = await socialApi.getFriends()
    expect(result[0].username).toBe('amigo')
  })

  it('getPending retorna solicitações pendentes', async () => {
    const result = await socialApi.getPending()
    expect(result[0].status).toBe('PENDING')
  })

  it('sendRequest retorna friendship criada', async () => {
    const result = await socialApi.sendRequest('user-2')
    expect(result.status).toBe('PENDING')
  })

  it('acceptRequest retorna friendship aceita', async () => {
    const result = await socialApi.acceptRequest('friendship-1')
    expect(result.status).toBe('ACCEPTED')
  })
})

describe('streaksApi', () => {
  it('list retorna streaks ativos', async () => {
    const result = await streaksApi.list()
    expect(result[0].title).toBe('7 dias seguidos')
    expect(result[0].status).toBe('ACTIVE')
  })

  it('create retorna streak criado', async () => {
    const result = await streaksApi.create({ title: 'Teste', goalType: 'CONSECUTIVE_DAYS', goalValue: 7 })
    expect(result.id).toBe('streak-1')
  })

  it('checkIn retorna activity completada', async () => {
    const result = await streaksApi.checkIn('streak-1', 30)
    expect(result.completed).toBe(true)
    expect(result.minutesRead).toBe(30)
  })
})

describe('feedApi', () => {
  it('list retorna página de eventos', async () => {
    const result = await feedApi.list()
    expect(result.content[0].eventType).toBe('READING_LOGGED')
    expect(result.content[0].actorUserId).toBe('user-2')
  })
})
