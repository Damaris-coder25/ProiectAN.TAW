import { defineStore } from "pinia"

export const useClient = defineStore("client", {
  state: () => ({
    clients: [
      {
        id: 1,
        name: "Nechifor Aurel",
        telefon: "0723456789",
        favorite: false
      },
      {
        id: 2,
        name: "Nea Goe",
        telefon: "0734567890",
        favorite: false
      }
    ]
  }),
  actions: {
    addClient(client) {
      this.clients.push(client)
      localStorage.setItem("clients", JSON.stringify(this.clients))
    },

    removeClient(id) {
      this.clients.splice(
        this.clients.findIndex(client => client.id === id),
        1
      )
      localStorage.setItem("clients", JSON.stringify(this.clients))
    },

    updateClientName(id, newName) {
      const index = this.clients.findIndex(client => client.id === id)
      this.clients[index].name = newName
      localStorage.setItem("clients", JSON.stringify(this.clients))
    },

    toggleFavorite(id) {
      const index = this.clients.findIndex(client => client.id === id)
      this.clients[index].favorite = !this.clients[index].favorite
      localStorage.setItem("clients", JSON.stringify(this.clients))
    }
  }
})
