import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useIsto } from '@/stores/isto'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('useIsto store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('starea initiala e goala', () => {
    const store = useIsto()

    expect(store.istos).toEqual([])
    expect(store.search).toBe('')
  })

  it('filteredIstos returneaza toate intrarile cand search e gol', () => {
    const store = useIsto()
    store.istos = [
      { id: 1, title: 'Revizie', total: 100, date: '2026-06-04' },
      { id: 2, title: 'Ulei', total: 60, date: '2026-06-05' },
    ]

    expect(store.filteredIstos).toHaveLength(2)
  })

  it('filteredIstos filtreaza dupa titlu', () => {
    const store = useIsto()
    store.istos = [
      { id: 1, title: 'Revizie', total: 100, date: '2026-06-04' },
      { id: 2, title: 'Ulei', total: 60, date: '2026-06-05' },
    ]
    store.search = 'revizie'

    expect(store.filteredIstos).toEqual([
      { id: 1, title: 'Revizie', total: 100, date: '2026-06-04' },
    ])
  })

  it('fetchIstos incarca si normalizeaza datele din API', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: [
        { id: 1, title: null, programare: { title: 'Revizie' }, total: 100, date: '2026-06-04' },
        { id: 2, title: 'Ulei', total: 60, date: '2026-06-05' },
      ],
    })
    const store = useIsto()

    await store.fetchIstos()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/factura/get-all')
    expect(store.istos).toEqual([
      { id: 1, title: 'Revizie', total: 100, date: '2026-06-04' },
      { id: 2, title: 'Ulei', total: 60, date: '2026-06-05' },
    ])
  })

  it('addIsto adauga o intrare noua in lista', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: { id: 3, total: 120, date: '2026-06-06' } })
    const store = useIsto()

    await store.addIsto({ title: 'Revizie', total: 120, date: '2026-06-06', ProgramareId: 7 })

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/factura/add', {
      total: 120,
      date: '2026-06-06',
      ProgramareId: 7,
    })
    expect(store.istos).toEqual([
      { id: 3, title: 'Revizie', total: 120, date: '2026-06-06' },
    ])
  })

  it('removeIsto sterge intrarea corecta', async () => {
    vi.mocked(axios.delete).mockResolvedValue({})
    const store = useIsto()
    store.istos = [
      { id: 1, title: 'Revizie', total: 100, date: '2026-06-04' },
      { id: 2, title: 'Ulei', total: 60, date: '2026-06-05' },
    ]

    await store.removeIsto(1)

    expect(store.istos).toEqual([
      { id: 2, title: 'Ulei', total: 60, date: '2026-06-05' },
    ])
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/factura/delete', { data: { id: 1 } })
  })

  it('updateIstoTitle schimba titlul unei intrari existente', () => {
    const store = useIsto()
    store.istos = [{ id: 1, title: 'Vechi', total: 100, date: '2026-06-04' }]

    store.updateIstoTitle(1, 'Nou')

    expect(store.istos[0].title).toBe('Nou')
  })
})
