<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useProg } from "@/stores/prog"
import axios from "axios"

const router = useRouter()
const route = useRoute()
const progStore = useProg()

const progId = computed(() => Number(route.params.id))
const prog = computed(() => progStore.progs.find(p => p.id === progId.value))

// Detectam tipul din subfix-ul titlului
const esteManopera = computed(() => prog.value?.title?.endsWith("manopera"))

// Preturile introduse per element de manopera
// { [id]: pret } — un input separat pentru fiecare element bifat
const preturi = ref({})

// Calculam totalul sumand preturile introduse
const totalPrice = computed(() => {
  return Object.values(preturi.value).reduce((sum, val) => {
    const nr = parseFloat(val) || 0
    return sum + nr
  }, 0)
})

onMounted(() => {
  if (progStore.progs.length === 0) {
    progStore.fetchProgs()
  }
})

const salveazaInIstoric = async () => {
  const title = prog.value?.title || "Programare"

  // Gasim factura existenta a acestei programari
  const facturaRes = await axios.get(`http://localhost:3000/factura/get-by-programare/${progId.value}`)

  if (facturaRes.data?.id) {
    await axios.put("http://localhost:3000/factura/update-total", {
      id: facturaRes.data.id,
      // Verificare -> total 0; Manopera -> suma preturilor introduse
      total: esteManopera.value ? totalPrice.value : 0,
      title: title
    })
  }

  // Stergem programarea si revenim la lista
  await progStore.removeProg(progId.value)
  router.push("/Programari")
}
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">Total</h1>
    <br />

    <p v-if="prog" class="text-lg font-semibold text-gray-700 mb-4">{{ prog.title }}</p>

    <br />

    <!-- VERIFICARE: mesaj simplu, fara campuri de pret -->
    <div v-if="!esteManopera">
      <p class="text-gray-500">Verificare completă. Se va salva cu suma 0.</p>
    </div>

    <!-- MANOPERA: un input de pret pentru fiecare element bifat -->
    <div v-else>
      <div v-if="prog?.manopereSelectate?.length">
        <div v-for="manopera in prog.manopereSelectate" :key="manopera.id"
          class="flex items-center justify-center gap-3 mb-3">
          <span class="w-40 text-right font-medium">{{ manopera.nume }}:</span>
          <input v-model="preturi[manopera.id]" type="number" placeholder="0"
            class="h-8 w-28 rounded-lg border px-3 shadow-sm" />
          <span class="text-gray-500">lei</span>
        </div>
      </div>
      <div v-else class="text-gray-400 text-sm mb-4">
        Nu există elemente de manoperă salvate.
      </div>

      <br />
      <p class="text-lg">Total: <b>{{ totalPrice }} lei</b></p>
    </div>

    <br /><br />

    <button type="button" @click="router.back()"
      class="mr-4 h-8 w-20 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-gray-100">
      Înapoi
    </button>

    <button type="button" @click="salveazaInIstoric"
      class="h-8 w-28 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-blue-100">
      Salvează
    </button>
  </div>
</template>