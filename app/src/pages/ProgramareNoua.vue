<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useProg } from "@/stores/prog"
import { useClient } from "@/stores/client"

const router = useRouter()
const progStore = useProg()
const clientStore = useClient()

const clientSelectat = ref("")
const dataProgramare = ref("")
const tipProgramare = ref("verificare")

const dataAfisata = computed(() => {
  if (!dataProgramare.value) return ""
  const data = new Date(dataProgramare.value)
  const zi = data.getDate().toString().padStart(2, "0")
  const luna = (data.getMonth() + 1).toString().padStart(2, "0")
  const an = data.getFullYear()
  const ora = data.getHours().toString().padStart(2, "0")
  const minute = data.getMinutes().toString().padStart(2, "0")
  return `${zi}.${luna}.${an} la ${ora}:${minute}`
})

onMounted(() => {
  if (clientStore.clients.length === 0) {
    clientStore.fetchClients()
  }
})

const salveazaProgramare = async () => {
  if (!clientSelectat.value || !dataProgramare.value) return

  const client = clientStore.clients.find(c => c.id === Number(clientSelectat.value))
  const subfix = tipProgramare.value === "verificare" ? "verificare" : "manopera"
  const title = `${client.name} - ${subfix}`

  if (tipProgramare.value === "verificare") {
    await progStore.addProg({
      title,
      done: false,
      favorite: false,
      data: dataProgramare.value.split("T")[0],
      ClientId: client.id
    })

    router.push("/Programari")
  } else {
    progStore.setProgramareNoua({ title, data: dataProgramare.value.split("T")[0], ClientId: client.id })
    router.push("/Manopera")
  }
}
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">Programare nouă</h1>
    <br />

    <p class="font-bold">Client</p>
    <select v-model="clientSelectat"
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
      <option value="" disabled>Selectează client...</option>
      <option v-for="client in clientStore.clients" :key="client.id" :value="client.id">
        {{ client.name }}
      </option>
    </select>

    <br /><br />

    <p class="font-bold">Tip programare</p>
    <div class="flex justify-center gap-4 mt-2">
      <label class="flex items-center gap-1 cursor-pointer">
        <input type="radio" v-model="tipProgramare" value="verificare" />
        Verificare
      </label>
      <label class="flex items-center gap-1 cursor-pointer">
        <input type="radio" v-model="tipProgramare" value="manopera" />
        Manoperă
      </label>
    </div>

    <br />

    <p class="font-bold">Data și ora</p>
    <input v-model="dataProgramare" type="datetime-local"
      class="h-10 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />

    <br /><br />

    <p v-if="dataAfisata" class="font-semibold text-green-600">📅 Programare: {{ dataAfisata }}</p>

    <br />

    <button type="button" @click="router.back()"
      class="mr-4 h-8 w-20 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-gray-100">
      Înapoi
    </button>

    <button type="button" @click="salveazaProgramare"
      class="h-8 w-38 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100">
      Salvează
    </button>
  </div>
</template>