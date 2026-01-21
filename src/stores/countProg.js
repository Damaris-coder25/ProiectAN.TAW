import { defineStore } from "pinia"
import { useProg } from "./prog"

export const useCountProg = defineStore("countProg", {
  getters: {

    countProg() {
      const progStore = useProg() 
      return progStore.progs.length
    },

    countFavoriteProg() {
      const progStore = useProg()
      return progStore.progs.filter(p => p.favorite).length
    }
  }
})
