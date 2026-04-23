<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useProg } from "@/stores/prog"
import axios from "axios"

const router = useRouter()
const progStore = useProg()

const API = "http://localhost:3000/manopera"
const API_PROG = "http://localhost:3000/programare"

const manopere = ref([])
const selectate = ref([])
const isAdding = ref(false)
const numeNou = ref("")

const programare = ref(null)

onMounted(async () => {
  const res = await axios.get(`${API}/get-all`)
  manopere.value = res.data

  programare.value = progStore.programareNoua

  if (!programare.value) {
    router.push("/Programari")
  }
})

const adaugaManopera = async () => {
  if (!numeNou.value) return
  const res = await axios.post(`${API}/add`, { nume: numeNou.value })
  manopere.value.push(res.data)
  numeNou.value = ""
  isAdding.value = false
}

const toggleSelectat = (id) => {
  const index = selectate.value.indexOf(id)
  if (index === -1) selectate.value.push(id)
  else selectate.value.splice(index, 1)
}

const finalizeaza = async () => {
  if (!programare.value) return

  const manopereSelectateObiecte = selectate.value.map(id => {
    const m = manopere.value.find(m => m.id === id)
    return { id, nume: m?.nume || "" }
  })

  try {
    await axios.post(`${API_PROG}/add`, {
      title: programare.value.title,
      data: programare.value.data,
      ClientId: programare.value.ClientId,
      manopereSelectate: manopereSelectateObiecte
    })

    progStore.programareNoua = null
    router.push("/Programari")
  } catch (err) {
    console.error("Eroare:", err)
  }
}
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">Manoperă</h1>

    <div v-if="programare" class="mt-2">
      <p class="font-semibold">Client: {{ programare.title }}</p>
      <p class="text-gray-600">Data: {{ programare.data }}</p>
    </div>

    <br />

    <!-- LISTA MANOPERE -->
    <div class="mt-4">
      <div v-for="manopera in manopere" :key="manopera.id" class="flex items-center gap-2 mb-2 justify-center">
        <input type="checkbox" :checked="selectate.includes(manopera.id)" @change="toggleSelectat(manopera.id)" />
        <span>{{ manopera.nume }}</span>
      </div>

      <!-- ADAUGARE -->
      <div v-if="isAdding" class="mt-2 flex gap-2 justify-center">
        <input v-model="numeNou" type="text" placeholder="Nume manoperă" class="h-8 rounded-lg border px-3 shadow-sm" />
        <button @click="adaugaManopera" class="h-8 rounded-lg bg-green-400 px-3 text-white">
          Salvează
        </button>
        <button @click="isAdding = false" class="h-8 rounded-lg bg-red-400 px-3 text-white">
          Anulează
        </button>
      </div>

      <button v-else @click="isAdding = true"
        class="mt-3 h-8 rounded-lg border border-black px-4 font-semibold shadow-md hover:bg-blue-100">
        + Adaugă element
      </button>
    </div>
    <br /><br />

    <!-- BUTOANE -->
    <button @click="router.back()" class="mr-4 h-8 w-24 rounded-lg border border-black px-2 font-semibold">
      Înapoi
    </button>

    <button @click="finalizeaza" class="h-8 w-40 rounded-lg border border-black px-4 font-semibold hover:bg-green-200">
      Finalizează
    </button>
  </div>
</template>