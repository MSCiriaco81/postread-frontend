import api from './client'

// ── Auth ──────────────────────────────────────────────────
export const authApi = {
  register: (data)  => api.post('/auth/register', data).then(r => r.data),
  login:    (data)  => api.post('/auth/login',    data).then(r => r.data),
}

// ── Users ─────────────────────────────────────────────────
export const usersApi = {
  me:                  ()       => api.get('/users/me').then(r => r.data),
  getById:             (id)     => api.get(`/users/${id}`).then(r => r.data),
  getByUsername:       (name)   => api.get(`/users/username/${name}`).then(r => r.data),
  updateProfile:       (data)   => api.patch('/users/me', data).then(r => r.data),
}

// ── Books ─────────────────────────────────────────────────
export const booksApi = {
  search:  (q = '', page = 0, size = 20) =>
    api.get('/books', { params: { q, page, size } }).then(r => r.data),
  getById: (id)   => api.get(`/books/${id}`).then(r => r.data),
  create:  (data) => api.post('/books', data).then(r => r.data),
}

// ── Reading ───────────────────────────────────────────────
export const readingApi = {
  log:      (data)            => api.post('/readings', data).then(r => r.data),
  list:     (page = 0, size = 20) =>
    api.get('/readings', { params: { page, size } }).then(r => r.data),
  range:    (from, to)        =>
    api.get('/readings/range', { params: { from, to } }).then(r => r.data),
  remove:   (id)              => api.delete(`/readings/${id}`),
}

// ── Social ────────────────────────────────────────────────
export const socialApi = {
  sendRequest:    (receiverId)   => api.post(`/social/friends/request/${receiverId}`).then(r => r.data),
  acceptRequest:  (id)           => api.post(`/social/friends/accept/${id}`).then(r => r.data),
  rejectRequest:  (id)           => api.post(`/social/friends/reject/${id}`),
  getFriends:     ()             => api.get('/social/friends').then(r => r.data),
  getPending:     ()             => api.get('/social/friends/requests').then(r => r.data),
}

// ── Streaks ───────────────────────────────────────────────
export const streaksApi = {
  create:   (data)  => api.post('/streaks', data).then(r => r.data),
  list:     ()      => api.get('/streaks').then(r => r.data),
  getById:  (id)    => api.get(`/streaks/${id}`).then(r => r.data),
  checkIn:  (id, minutesRead = 0) =>
    api.post(`/streaks/${id}/checkin`, null, { params: { minutesRead } }).then(r => r.data),
}

// ── Feed ──────────────────────────────────────────────────
export const feedApi = {
  list: (page = 0, size = 20) =>
    api.get('/feed', { params: { page, size } }).then(r => r.data),
}
