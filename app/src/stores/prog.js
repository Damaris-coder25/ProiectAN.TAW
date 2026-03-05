import { defineStore } from "pinia"

export const useProg = defineStore("prog", {
  state: () => ({
    progs: [
      {
        id: 1,
        title: "Nechifor Aurel",
        done: false,
        favorite: false
      },
      {
        id: 2,
        title: "Nea Goe",
        done: false,
        favorite: false
      }
    ]
  }),
  actions: {
    addProg(prog) {
      this.progs.push(prog)
      localStorage.setItem("progs", JSON.stringify(this.progs))
    },
    removeProg(id) {
      this.progs.splice(
        this.progs.findIndex(prog => prog.id === id),
        1
      )
      localStorage.setItem("progs", JSON.stringify(this.progs))
    },
    updateProgTitle(id, newTitle) {
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].title = newTitle
      localStorage.setItem("progs", JSON.stringify(this.progs))
    },
    toggleFavorite(id) {
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].favorite = !this.progs[index].favorite
      localStorage.setItem("progs", JSON.stringify(this.progs))
    },
    toggleDone(id) {
      const index = this.progs.findIndex(prog => prog.id === id)
      this.progs[index].done = !this.progs[index].done
      localStorage.setItem("progs", JSON.stringify(this.progs))
    }
  }
})
