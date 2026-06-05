import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useIsto } from '@/stores/isto'
import { useCountIsto } from '@/stores/countIsto'

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

describe('useCountIsto store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('computes revenue and summary helpers for the current store data', () => {
    const now = new Date()
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 5)
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 10)

    const istoStore = useIsto()
    istoStore.istos = [
      { id: 1, title: 'A', total: 100, date: formatDate(currentMonth) },
      { id: 2, title: 'B', total: 50, date: formatDate(previousMonth) },
      { id: 3, title: 'C', total: 25, date: formatDate(currentMonth) },
    ]

    const countStore = useCountIsto()

    expect(countStore.countIsto).toBe(3)
    expect(countStore.monthlyRevenue).toBe(125)
    expect(countStore.totalRevenue).toBe(175)
    expect(countStore.averageRevenuePerEntry).toBe('58.33')
    expect(countStore.biggestEntry).toEqual({ id: 1, title: 'A', total: 100, date: formatDate(currentMonth) })
    expect(countStore.smallestEntry).toEqual({ id: 3, title: 'C', total: 25, date: formatDate(currentMonth) })
    expect(countStore.lastFiveEntries).toHaveLength(3)
  })

  it('returns safe defaults when there are no entries', () => {
    const istoStore = useIsto()
    istoStore.istos = []

    const countStore = useCountIsto()

    expect(countStore.countIsto).toBe(0)
    expect(countStore.monthlyRevenue).toBe(0)
    expect(countStore.totalRevenue).toBe(0)
    expect(countStore.averageRevenuePerEntry).toBe(0)
    expect(countStore.biggestEntry).toEqual({ title: '-', total: 0 })
    expect(countStore.smallestEntry).toEqual({ title: '-', total: 0 })
  })
})
