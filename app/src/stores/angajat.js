import { defineStore } from "pinia"
import axios from "axios"

const API = "http://localhost:3000/angajat"

export const useAngajat = defineStore("angajat", {
  state: () => ({
    angajati: []
  }),
  actions: {
    async fetchAngajati() {
      const res = await axios.get(`${API}/get-all`)
      this.angajati = res.data
    },

    async addAngajat(angajat) {
      const res = await axios.post(`${API}/add`, angajat)
      this.angajati.push(res.data)
    },

    async removeAngajat(id) {
      await axios.delete(`${API}/delete`, { data: { id } })
      this.angajati.splice(
        this.angajati.findIndex(angajat => angajat.id === id),
        1
      )
    },

    async updateAngajatName(id, newName) {
      await axios.put(`${API}/update-name`, { id, newName })
      const index = this.angajati.findIndex(angajat => angajat.id === id)
      this.angajati[index].name = newName
    },

    async toggleFavorite(id) {
      await axios.put(`${API}/toggle-favorite`, { id })
      const index = this.angajati.findIndex(angajat => angajat.id === id)
      this.angajati[index].favorite = !this.angajati[index].favorite
    }
  }
})