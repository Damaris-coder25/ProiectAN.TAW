<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSuccesProgramare = () => {
  router.push("/SuccesProgramare")
}

const goToManopera = () => {
  router.push("/Manopera")
}

import { ref ,computed} from 'vue'

const messaje = ref('Programare nouă')

const client = ref("")
const dataProgramare = ref("")

const dataAfisata = computed(() => {
  if (!dataProgramare.value) return "" // Returnează un șir gol dacă nu este setată nicio dată

  const data = new Date(dataProgramare.value)

  const zi = data.getDate().toString().padStart(2, '0') // Adaugă un zero în față dacă este nevoie
  const luna = (data.getMonth() + 1).toString().padStart(2, '0')
  const an = data.getFullYear()
  const ora = data.getHours().toString().padStart(2, '0')
  const minute = data.getMinutes().toString().padStart(2, '0')

  return `${zi}.${luna}.${an} la ${ora}:${minute}`
})


</script>

<template>
    <div class="text-center mt-5">
        <h1 class="text-3xl font-bold ">
            {{ messaje }}
        </h1>
    <br>

    <p class="font-bold">Client</p>
    <input 
        type="text"   
        v-model="client"
        placeholder="Introdu clientul..."
        class="w-70 h-10  px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
<br>
<br>
   <p class="font-bold">Data și ora</p>
    <input
      v-model="dataProgramare"
      type="datetime-local"
      class="h-10 px-4 py-2 border rounded-lg shadow-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <br><br>

    <p
      v-if="dataAfisata"
      class="text-green-600 font-semibold"
    >
      📅 Programare: {{ dataAfisata }}
    </p> 

    <button
    type="button"
    class=" w-38 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black mr-2"
    @click="goToSuccesProgramare"
  >
    Verificare
  </button>
   <button
    type="button"
    class=" w-38 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black ml-2"
    @click="goToManopera"
  >
    Manoperă
  </button>
</div>
</template>