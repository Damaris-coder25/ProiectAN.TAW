import { defineStore } from "pinia"
import axios from "axios"

const API = "http://localhost:3000/client"

export const useClient = defineStore("client", {
  state: () => ({
    clients: []
  }),
  actions: {
    async fetchClients() {
      const res = await axios.get(`${API}/get-all`)
      this.clients = res.data
    },

    async addClient(client) {
      const res = await axios.post(`${API}/add`, client)
      this.clients.push(res.data)
    },

    async removeClient(id) {
      await axios.delete(`${API}/delete`, { data: { id } })
      this.clients.splice(
        this.clients.findIndex(client => client.id === id),
        1
      )
    },

    async updateClientName(id, newName) {
      await axios.put(`${API}/update-name`, { id, newName })
      const index = this.clients.findIndex(client => client.id === id)
      this.clients[index].name = newName
    },

    async toggleFavorite(id) {
      await axios.put(`${API}/toggle-favorite`, { id })
      const index = this.clients.findIndex(client => client.id === id)
      this.clients[index].favorite = !this.clients[index].favorite
    }
  }
})