import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeedItem from '../../../components/feed/FeedItem'

const makeEvent = (overrides = {}) => ({
  id: 'ev-1',
  actorUserId: 'amigo',
  targetUserId: 'user-1',
  eventType: 'READING_LOGGED',
  payload: { minutes: '45', bookId: 'book-1' },
  createdAt: new Date().toISOString(),
  ...overrides,
})

describe('FeedItem', () => {
  it('renderiza o username do autor', () => {
    render(<FeedItem event={makeEvent()} />)
    expect(screen.getByText('amigo')).toBeInTheDocument()
  })

  it('READING_LOGGED: mostra minutos lidos', () => {
    render(<FeedItem event={makeEvent({ payload: { minutes: '30' } })} />)
    expect(screen.getByText(/30 minutos/)).toBeInTheDocument()
  })

  it('STREAK_MAINTAINED: mostra mensagem de streak mantido', () => {
    render(<FeedItem event={makeEvent({ eventType: 'STREAK_MAINTAINED', payload: {} })} />)
    expect(screen.getByText(/streak/i)).toBeInTheDocument()
  })

  it('STREAK_BROKEN: mostra mensagem de streak quebrado', () => {
    render(<FeedItem event={makeEvent({ eventType: 'STREAK_BROKEN', payload: {} })} />)
    expect(screen.getByText(/quebrou/i)).toBeInTheDocument()
  })

  it('FRIENDSHIP_STARTED: mostra mensagem de amizade', () => {
    render(<FeedItem event={makeEvent({ eventType: 'FRIENDSHIP_STARTED', payload: {} })} />)
    expect(screen.getByText(/fez um novo amigo/i)).toBeInTheDocument()
  })

  it('exibe tempo relativo quando createdAt está presente', () => {
    render(<FeedItem event={makeEvent()} />)
    // date-fns deve gerar algo como "há menos de um minuto"
    expect(screen.getByText(/há/i)).toBeInTheDocument()
  })

  it('não quebra com eventType desconhecido', () => {
    render(<FeedItem event={makeEvent({ eventType: 'UNKNOWN_EVENT', payload: {} })} />)
    expect(screen.getByText('amigo')).toBeInTheDocument()
  })

  it('não quebra sem payload', () => {
    render(<FeedItem event={makeEvent({ payload: null })} />)
    expect(screen.getByText('amigo')).toBeInTheDocument()
  })
})
