import { defineStore } from "pinia"
import axios from "axios"
import { ws } from "@/main.js"

const API = "http://localhost:3000/programare"

export const useProg = defineStore("prog", {
  state: () => ({
    progs: [],
    search: "",
    programareNoua: null
  }),

  getters: {
    filteredProgs(state) {
      if (!state.search) return state.progs
      return state.progs.filter(prog =>
        prog.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  },
  actions: {
    // Trimite lista curenta de programari catre ceilalti clienti prin WebSocket
    broadcast() {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(this.progs))
      }
    },
    setProgramareNoua(data) {
      this.programareNoua = data
    },
    async fetchProgs() {
      const res = await axios.get(`${API}/get-all`)
      this.progs = res.data
    },

    async addProg(prog) {
      const res = await axios.post(`${API}/add`, prog)
      this.progs.push(res.data)
      this.broadcast()
      return res.data
    },

    async removeProg(id) {
      await axios.delete(`${API}/delete`, { data: { id } })
      this.progs.splice(
        this.progs.findIndex(prog => prog.id === id),
        1
      )
      this.broadcast()
    },

    async updateProgTitle(id, newTitle) {
      await axios.put(`${API}/update-title`, { id, newTitle })
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].title = newTitle
      this.broadcast()
    },

    async toggleFavorite(id) {
      await axios.put(`${API}/update-favorite`, { id })
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].favorite = !this.progs[index].favorite
      this.broadcast()
    },

    async toggleDone(id) {
      await axios.put(`${API}/update-done`, { id })
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].done = !this.progs[index].done
      this.broadcast()
    }
  }
})