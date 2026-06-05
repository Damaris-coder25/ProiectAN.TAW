import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useClient } from '@/stores/client'
import { useCountClient } from '@/stores/countClient'

describe('useCountClient store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns the number of clients and favorite clients', () => {
    const clientStore = useClient()
    clientStore.clients = [
      { id: 1, name: 'A', favorite: true },
      { id: 2, name: 'B', favorite: false },
      { id: 3, name: 'C', favorite: true },
    ]

    const countStore = useCountClient()

    expect(countStore.countClients).toBe(3)
    expect(countStore.countFavoriteClients).toBe(2)
  })
})
