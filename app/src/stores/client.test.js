import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useClient } from '@/stores/client'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
  },
}))

describe('useClient store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('fetchClients loads the list from the API', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [{ id: 1, name: 'Client A', favorite: true }] })
    const store = useClient()

    await store.fetchClients()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/client/get-all')
    expect(store.clients).toEqual([{ id: 1, name: 'Client A', favorite: true }])
  })

  it('addClient appends the created client', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: { id: 2, name: 'Client B', favorite: false } })
    const store = useClient()

    await store.addClient({ name: 'Client B' })

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/client/add', { name: 'Client B' })
    expect(store.clients).toEqual([{ id: 2, name: 'Client B', favorite: false }])
  })

  it('removeClient deletes the matching client', async () => {
    vi.mocked(axios.delete).mockResolvedValue({})
    const store = useClient()
    store.clients = [{ id: 1, name: 'Client A', favorite: true }, { id: 2, name: 'Client B', favorite: false }]

    await store.removeClient(1)

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/client/delete', { data: { id: 1 } })
    expect(store.clients).toEqual([{ id: 2, name: 'Client B', favorite: false }])
  })

  it('updateClientName updates the client name', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useClient()
    store.clients = [{ id: 1, name: 'Client A', favorite: true }]

    await store.updateClientName(1, 'Client X')

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/client/update-name', { id: 1, newName: 'Client X' })
    expect(store.clients[0].name).toBe('Client X')
  })

  it('toggleFavorite flips the favorite flag', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useClient()
    store.clients = [{ id: 1, name: 'Client A', favorite: false }]

    await store.toggleFavorite(1)

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/client/toggle-favorite', { id: 1 })
    expect(store.clients[0].favorite).toBe(true)
  })
})
