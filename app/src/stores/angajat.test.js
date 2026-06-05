import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useAngajat } from '@/stores/angajat'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
  },
}))

describe('useAngajat store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('fetchAngajati loads the list from the API', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [{ id: 1, name: 'Ana', favorite: true }] })
    const store = useAngajat()

    await store.fetchAngajati()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/angajat/get-all')
    expect(store.angajati).toEqual([{ id: 1, name: 'Ana', favorite: true }])
  })

  it('addAngajat appends the created employee', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: { id: 2, name: 'Ion', favorite: false } })
    const store = useAngajat()

    await store.addAngajat({ name: 'Ion' })

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/angajat/add', { name: 'Ion' })
    expect(store.angajati).toEqual([{ id: 2, name: 'Ion', favorite: false }])
  })

  it('removeAngajat deletes the matching employee', async () => {
    vi.mocked(axios.delete).mockResolvedValue({})
    const store = useAngajat()
    store.angajati = [{ id: 1, name: 'Ana', favorite: true }, { id: 2, name: 'Ion', favorite: false }]

    await store.removeAngajat(1)

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/angajat/delete', { data: { id: 1 } })
    expect(store.angajati).toEqual([{ id: 2, name: 'Ion', favorite: false }])
  })

  it('updateAngajatName updates the employee name', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useAngajat()
    store.angajati = [{ id: 1, name: 'Ana', favorite: true }]

    await store.updateAngajatName(1, 'Andra')

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/angajat/update-name', { id: 1, newName: 'Andra' })
    expect(store.angajati[0].name).toBe('Andra')
  })

  it('toggleFavorite flips the favorite flag', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useAngajat()
    store.angajati = [{ id: 1, name: 'Ana', favorite: false }]

    await store.toggleFavorite(1)

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/angajat/toggle-favorite', { id: 1 })
    expect(store.angajati[0].favorite).toBe(true)
  })
})
