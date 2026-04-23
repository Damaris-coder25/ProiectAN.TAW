import { defineStore } from "pinia"
import axios from "axios"

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
      return res.data
    },

    async removeProg(id) {
      await axios.delete(`${API}/delete`, { data: { id } })
      this.progs.splice(
        this.progs.findIndex(prog => prog.id === id),
        1
      )
    },

    async updateProgTitle(id, newTitle) {
      await axios.put(`${API}/update-title`, { id, newTitle })
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].title = newTitle
    },

    async toggleFavorite(id) {
      await axios.put(`${API}/update-favorite`, { id })
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].favorite = !this.progs[index].favorite
    },

    async toggleDone(id) {
      await axios.put(`${API}/update-done`, { id })
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].done = !this.progs[index].done
    }
  }
})