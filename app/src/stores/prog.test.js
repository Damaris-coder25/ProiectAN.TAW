import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useProg } from '@/stores/prog'

vi.mock('@/main.js', () => ({
  ws: { send: vi.fn(), readyState: 1 }
}))

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('useProg store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('starea initiala e goala', () => {
    const store = useProg()
    expect(store.progs).toEqual([])
    expect(store.search).toBe('')
    expect(store.programareNoua).toBe(null)
  })

  it('filteredProgs returneaza toate programarile cand search e gol', () => {
    const store = useProg()
    store.progs = [
      { id: 1, title: 'Revizie', done: false, favorite: false },
      { id: 2, title: 'Schimb ulei', done: false, favorite: false },
    ]
    expect(store.filteredProgs.length).toBe(2)
  })

  it('filteredProgs filtreaza dupa search', () => {
    const store = useProg()
    store.progs = [
      { id: 1, title: 'Revizie', done: false, favorite: false },
      { id: 2, title: 'Schimb ulei', done: false, favorite: false },
    ]
    store.search = 'revizie'
    expect(store.filteredProgs.length).toBe(1)
    expect(store.filteredProgs[0].title).toBe('Revizie')
  })

  it('setProgramareNoua salveaza datele', () => {
    const store = useProg()
    store.setProgramareNoua({ title: 'Revizie', data: '2026-06-04', ClientId: 7 })
    expect(store.programareNoua).toEqual({ title: 'Revizie', data: '2026-06-04', ClientId: 7 })
  })

  it('broadcast trimite programarile', () => {
    const store = useProg()
    store.progs = [{ id: 1, title: 'Revizie' }]
    store.broadcast()
    expect(axios.put).not.toHaveBeenCalled()
  })

  it('toggleDone schimba done din false in true', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useProg()
    store.progs = [{ id: 1, title: 'Revizie', done: false }]
    await store.toggleDone(1)
    expect(store.progs[0].done).toBe(true)
  })

  it('toggleDone schimba done din true in false', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useProg()
    store.progs = [{ id: 1, title: 'Revizie', done: true }]
    await store.toggleDone(1)
    expect(store.progs[0].done).toBe(false)
  })

  it('toggleFavorite schimba favorite', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useProg()
    store.progs = [{ id: 1, title: 'Revizie', favorite: false }]
    await store.toggleFavorite(1)
    expect(store.progs[0].favorite).toBe(true)
  })

  it('fetchProgs incarca programarile din api', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: [
        { id: 1, title: 'Revizie', done: false, favorite: false },
        { id: 2, title: 'Schimb ulei', done: false, favorite: false },
      ],
    })
    const store = useProg()
    await store.fetchProgs()
    expect(store.progs.length).toBe(2)
  })

  it('removeProg sterge o programare', async () => {
    vi.mocked(axios.delete).mockResolvedValue({})
    const store = useProg()
    store.progs = [{ id: 1, title: 'Revizie', done: false, favorite: false }]
    await store.removeProg(1)
    expect(store.progs.length).toBe(0)
  })

  it('addProg adauga o programare noua', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: { id: 2, title: 'Schimb ulei', done: false, favorite: false },
    })
    const store = useProg()
    store.progs = []
    await store.addProg({ title: 'Schimb ulei', done: false, favorite: false })
    expect(store.progs).toHaveLength(1)
  })

  it('updateProgTitle actualizeaza titlul', async () => {
    vi.mocked(axios.put).mockResolvedValue({})
    const store = useProg()
    store.progs = [{ id: 1, title: 'Vechi', done: false, favorite: false }]
    await store.updateProgTitle(1, 'Nou')
    expect(store.progs[0].title).toBe('Nou')
  })
})