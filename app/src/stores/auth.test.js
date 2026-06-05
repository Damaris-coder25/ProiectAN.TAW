import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from '@/api/index.js'
import { useAuth } from '@/stores/auth'

vi.mock('@/api/index.js', () => ({
  default: {
    post: vi.fn(),
  },
}))

describe('useAuth store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('initializes tokens from localStorage', () => {
    localStorage.setItem('token', 'token-1')
    localStorage.setItem('refreshToken', 'refresh-1')

    const store = useAuth()

    expect(store.token).toBe('token-1')
    expect(store.refreshToken).toBe('refresh-1')
    expect(store.isAuthenticated).toBe(true)
  })

  it('setTokens and clearTokens update persisted auth state', () => {
    const store = useAuth()

    store.setTokens('a', 'b')

    expect(store.token).toBe('a')
    expect(store.refreshToken).toBe('b')
    expect(store.isAuthenticated).toBe(true)
    expect(localStorage.getItem('token')).toBe('a')
    expect(localStorage.getItem('refreshToken')).toBe('b')

    store.clearTokens()

    expect(store.token).toBe('')
    expect(store.refreshToken).toBe('')
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('refreshToken')).toBeNull()
  })

  it('checkCredentials stores the returned tokens on success', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: { success: true, token: 'new-token', refreshToken: 'new-refresh' },
    })

    const store = useAuth()
    const message = await store.checkCredentials('admin', 'secret')

    expect(message).toBe('')
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/access/login', {
      username: 'admin',
      password: 'secret',
    })
    expect(store.token).toBe('new-token')
    expect(store.refreshToken).toBe('new-refresh')
    expect(store.isAuthenticated).toBe(true)
  })

  it('checkCredentials returns the API message when login is rejected', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: { success: false, message: 'Bad credentials' },
    })

    const store = useAuth()
    const message = await store.checkCredentials('admin', 'wrong')

    expect(message).toBe('Bad credentials')
    expect(store.isAuthenticated).toBe(false)
  })

  it('refreshAccessToken refreshes the session when a refresh token exists', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: { success: true, token: 'refreshed', refreshToken: 'refreshed-refresh' },
    })
    const store = useAuth()
    store.setTokens('old', 'refresh-1')

    const refreshed = await store.refreshAccessToken()

    expect(refreshed).toBe(true)
    expect(store.token).toBe('refreshed')
    expect(store.refreshToken).toBe('refreshed-refresh')
  })

  it('refreshAccessToken clears the session when the refresh call fails', async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error('fail'))
    const store = useAuth()
    store.setTokens('old', 'refresh-1')

    const refreshed = await store.refreshAccessToken()

    expect(refreshed).toBe(false)
    expect(store.isAuthenticated).toBe(false)
  })

  it('logout clears the persisted session', () => {
    const store = useAuth()
    store.setTokens('a', 'b')

    store.logout()

    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
  })
})
