import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProg } from '@/stores/prog'
import { useCountProg } from '@/stores/countProg'

describe('useCountProg store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns the number of programs and favorite programs', () => {
    const progStore = useProg()
    progStore.progs = [
      { id: 1, title: 'A', favorite: true },
      { id: 2, title: 'B', favorite: false },
      { id: 3, title: 'C', favorite: true },
    ]

    const countStore = useCountProg()

    expect(countStore.countProg).toBe(3)
    expect(countStore.countFavoriteProg).toBe(2)
  })
})
