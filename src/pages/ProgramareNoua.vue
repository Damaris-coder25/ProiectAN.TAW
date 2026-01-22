<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goToSuccesProgramare = () => {
  router.push("/SuccesProgramare")
}

const goToManopera = () => {
  router.push("/Manopera")
}

import { ref, computed } from "vue"

const messaje = ref("Programare nouă")

const client = ref("")
const dataProgramare = ref("")

const dataAfisata = computed(() => {
  if (!dataProgramare.value) return "" // Returnează un șir gol dacă nu este setată nicio dată

  const data = new Date(dataProgramare.value)

  const zi = data.getDate().toString().padStart(2, "0") // Adaugă un zero în față dacă este nevoie
  const luna = (data.getMonth() + 1).toString().padStart(2, "0")
  const an = data.getFullYear()
  const ora = data.getHours().toString().padStart(2, "0")
  const minute = data.getMinutes().toString().padStart(2, "0")

  return `${zi}.${luna}.${an} la ${ora}:${minute}`
})
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">
      {{ messaje }}
    </h1>
    <br />

    <p class="font-bold">Client</p>
    <input
      type="text"
      v-model="client"
      placeholder="Introdu clientul..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <br />
    <br />
    <p class="font-bold">Data și ora</p>
    <input
      v-model="dataProgramare"
      type="datetime-local"
      class="h-10 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />

    <br /><br />

    <p v-if="dataAfisata" class="font-semibold text-green-600">📅 Programare: {{ dataAfisata }}</p>

    <button
      type="button"
      class="mr-2 h-8 w-38 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
      @click="goToSuccesProgramare"
    >
      Verificare
    </button>
    <button
      type="button"
      class="ml-2 h-8 w-38 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
      @click="goToManopera"
    >
      Manoperă
    </button>
  </div>
</template>
