import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router/index.js"
import App from "./App.vue"
import { useProg } from "@/stores/prog"

const pinia = createPinia()
createApp(App).use(pinia).use(router).mount("#app")

export const ws = new WebSocket("ws://localhost:7878")
ws.onopen = () => console.log("Connected to WebSocket server")
ws.onmessage = data => {
  const progStore = useProg()
  progStore.progs = JSON.parse(data.data)
}