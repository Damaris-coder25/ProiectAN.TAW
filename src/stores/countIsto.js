import { defineStore } from "pinia"
import { useIsto} from "./isto"

export const useCountIsto = defineStore("countIsto", {
  getters: {
    countIsto() {
      const istoStore = useIsto() 
      return istoStore.istos.length
    },

    monthlyRevenue() {
      const istoStore = useIsto()
      const now = new Date()
      const currentMonth = now.getMonth()      
      const currentYear = now.getFullYear()

      return istoStore.istos
        .filter(isto => {
          const istoDate = new Date(isto.date)
          return istoDate.getMonth() === currentMonth && istoDate.getFullYear() === currentYear
        })
        .reduce((sum, isto) => sum + Number(isto.total || 0), 0)
    },

    totalRevenue() {
      const istoStore = useIsto()
      return istoStore.istos.reduce((sum, isto) => sum + (parseFloat(isto.total) || 0), 0)
    },

    lastFiveEntries() {
      const istoStore = useIsto()
      return istoStore.istos
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    },

    averageRevenuePerEntry() {
      const istoStore = useIsto();
      const totals = istoStore.istos.map(isto => parseFloat(isto.total) || 0);
  if (totals.length === 0) return 0;
  return (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(2);
},

    biggestEntry() {
  const istoStore = useIsto();
  if (!istoStore.istos.length) return { title: '-', total: 0 };
  return istoStore.istos.reduce((max, isto) => 
    (parseFloat(isto.total) || 0) > (parseFloat(max.total) || 0) ? isto : max
  , istoStore.istos[0]);
},

      smallestEntry() {
  const istoStore = useIsto();
  if (!istoStore.istos.length) return { title: '-', total: 0 };
  return istoStore.istos.reduce((min, isto) => 
    (parseFloat(isto.total) || 0) < (parseFloat(min.total) || 0) ? isto : min
  , istoStore.istos[0]);
}

  }
})