import { http, HttpResponse } from 'msw'

// ── Fixtures ──────────────────────────────────────────────
export const mockUser = {
  token: 'fake-jwt-token',
  userId: 'user-1',
  username: 'leitor',
  email: 'leitor@postread.com',
}

export const mockProfile = {
  id: 'user-1',
  username: 'leitor',
  email: 'leitor@postread.com',
  bio: 'Amante de livros',
  profilePicture: null,
  createdAt: '2024-01-15T10:00:00Z',
}

export const mockBook = {
  id: 'book-1',
  title: 'Dom Quixote',
  author: 'Cervantes',
  genre: 'Clássico',
  pageCount: 1000,
  cover: null,
}

export const mockReading = {
  id: 'entry-1',
  userId: 'user-1',
  bookId: 'book-1',
  minutesRead: 45,
  pagesRead: 30,
  rating: 4,
  notes: 'Ótimo capítulo',
  date: '2024-03-01',
}

export const mockStreak = {
  id: 'streak-1',
  title: '7 dias seguidos',
  creatorId: 'user-1',
  participantIds: ['user-1'],
  startDate: '2024-03-01',
  currentStreak: 3,
  bestStreak: 5,
  goalType: 'CONSECUTIVE_DAYS',
  goalValue: 7,
  status: 'ACTIVE',
}

export const mockFriendship = {
  id: 'friendship-1',
  requesterId: 'user-2',
  receiverId: 'user-1',
  status: 'PENDING',
  createdAt: '2024-03-01T10:00:00Z',
}

export const mockFriend = {
  id: 'user-2',
  username: 'amigo',
  email: 'amigo@postread.com',
  bio: null,
  createdAt: '2024-01-01T00:00:00Z',
}

export const mockFeedEvent = {
  id: 'event-1',
  actorUserId: 'user-2',
  targetUserId: 'user-1',
  eventType: 'READING_LOGGED',
  payload: { bookId: 'book-1', minutes: '30' },
  createdAt: '2024-03-01T12:00:00Z',
}

const pageOf = (content) => ({
  content,
  totalElements: content.length,
  totalPages: 1,
  number: 0,
  size: 20,
})

// ── Handlers ──────────────────────────────────────────────
export const handlers = [
  // Auth
  http.post('/api/v1/auth/login', () => HttpResponse.json(mockUser)),
  http.post('/api/v1/auth/register', () => HttpResponse.json(mockUser, { status: 201 })),

  // Users
  http.get('/api/v1/users/me',                  () => HttpResponse.json(mockProfile)),
  http.get('/api/v1/users/:id',                 () => HttpResponse.json(mockProfile)),
  http.get('/api/v1/users/username/:username',  () => HttpResponse.json(mockProfile)),
  http.patch('/api/v1/users/me',                () => HttpResponse.json(mockProfile)),

  // Books
  http.get('/api/v1/books',     () => HttpResponse.json(pageOf([mockBook]))),
  http.get('/api/v1/books/:id', () => HttpResponse.json(mockBook)),
  http.post('/api/v1/books',    () => HttpResponse.json(mockBook, { status: 201 })),

  // Readings
  http.get('/api/v1/readings',       () => HttpResponse.json(pageOf([mockReading]))),
  http.get('/api/v1/readings/range', () => HttpResponse.json([mockReading])),
  http.post('/api/v1/readings',      () => HttpResponse.json(mockReading, { status: 201 })),
  http.delete('/api/v1/readings/:id',() => new HttpResponse(null, { status: 204 })),

  // Social
  http.get('/api/v1/social/friends',          () => HttpResponse.json([mockFriend])),
  http.get('/api/v1/social/friends/requests', () => HttpResponse.json([mockFriendship])),
  http.post('/api/v1/social/friends/request/:id',  () => HttpResponse.json(mockFriendship, { status: 201 })),
  http.post('/api/v1/social/friends/accept/:id',   () => HttpResponse.json({ ...mockFriendship, status: 'ACCEPTED' })),
  http.post('/api/v1/social/friends/reject/:id',   () => new HttpResponse(null, { status: 204 })),

  // Streaks
  http.get('/api/v1/streaks',      () => HttpResponse.json([mockStreak])),
  http.get('/api/v1/streaks/:id',  () => HttpResponse.json(mockStreak)),
  http.post('/api/v1/streaks',     () => HttpResponse.json(mockStreak, { status: 201 })),
  http.post('/api/v1/streaks/:id/checkin', () => HttpResponse.json({ id: 'act-1', completed: true, minutesRead: 30 })),

  // Feed
  http.get('/api/v1/feed', () => HttpResponse.json(pageOf([mockFeedEvent]))),
]
