import { defineStore } from "pinia"

export const useIsto = defineStore("isto", {
  state: () => ({
    istos: [
      {
        id: 1,
        title: "Nechifor Aurel",
        total: 100,
        date: "2026-01-15"
      },
      {
        id: 2,
        title: "Nea Goe",
        total: 200,
        date: "2026-01-20"
      }
    ]
  }),
  actions: {
    addIsto(isto) {
      this.istos.push(isto)
      localStorage.setItem("istos", JSON.stringify(this.istos))
    },
    removeIsto(id) {
      this.istos.splice(
        this.istos.findIndex(isto => isto.id === id),
        1
      )
      localStorage.setItem("istos", JSON.stringify(this.istos))
    },
    updateIstoTitle(id, newTitle) {
      const index = this.istos.findIndex(isto => isto.id === id)
      this.istos[index].title = newTitle
      localStorage.setItem("istos", JSON.stringify(this.istos))
    }
  }
})
