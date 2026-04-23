import { defineStore } from "pinia"
import axios from "axios"

const API = "http://localhost:3000/factura"

export const useIsto = defineStore("isto", {
  state: () => ({
    istos: [],
    search: ""
  }),
  getters: {
    filteredIstos(state) {
      if (!state.search) return state.istos
      return state.istos.filter(isto =>
        isto.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  },
  actions: {
    async fetchIstos() {
      const res = await axios.get(`${API}/get-all`)
      this.istos = res.data.map(f => ({
        id: f.id,
        title: f.title || f.programare?.title || "",
        total: f.total,
        date: f.date
      }))
    },

    async addIsto(isto) {
      const res = await axios.post(`${API}/add`, {
        total: isto.total,
        date: isto.date,
        ProgramareId: isto.ProgramareId || null
      })
      this.istos.push({
        id: res.data.id,
        title: isto.title || "",
        total: res.data.total,
        date: res.data.date
      })
    },

    async removeIsto(id) {
      await axios.delete(`${API}/delete`, { data: { id } })
      this.istos.splice(
        this.istos.findIndex(isto => isto.id === id),
        1
      )
    },

    async updateIstoTitle(id, newTitle) {
      const index = this.istos.findIndex(isto => isto.id === id)
      this.istos[index].title = newTitle
    }
  }
})