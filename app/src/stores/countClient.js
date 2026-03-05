import { defineStore } from "pinia"
import { useClient } from "./client"

export const useCountClient = defineStore("countClient", {
  getters: {
    countClients() {
      const clientStore = useClient()
      return clientStore.clients.length
    },

    countFavoriteClients() {
      const clientStore = useClient()
      return clientStore.clients.filter(c => c.favorite).length
    }
  }
})
