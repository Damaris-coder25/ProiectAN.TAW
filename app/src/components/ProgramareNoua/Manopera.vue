<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const API = "http://localhost:3000/manopera"

const manopere = ref([])
const selectate = ref([])
const isAdding = ref(false)
const numeNou = ref("")

onMounted(async () => {
  const res = await axios.get(`${API}/get-all`)
  manopere.value = res.data
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
</script>

<template>
  <div class="mt-4">
    <div v-for="manopera in manopere" :key="manopera.id" class="flex items-center gap-2 mb-2">
      <input type="checkbox" :checked="selectate.includes(manopera.id)" @change="toggleSelectat(manopera.id)" />
      <span>{{ manopera.nume }}</span>
    </div>

    <div v-if="isAdding" class="mt-2 flex gap-2">
      <input v-model="numeNou" type="text" placeholder="Nume manoperă"
        class="h-8 rounded-lg border px-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <button type="button" @click="adaugaManopera" class="h-8 rounded-lg bg-green-400 px-3 text-white">
        Salvează
      </button>
      <button type="button" @click="isAdding = false" class="h-8 rounded-lg bg-red-400 px-3 text-white">
        Anulează
      </button>
    </div>

    <button v-else type="button" @click="isAdding = true"
      class="mt-3 h-8 rounded-lg border border-black px-4 font-semibold shadow-md hover:bg-blue-100">
      + Adaugă element
    </button>
  </div>
</template>