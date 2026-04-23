<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useProg } from "@/stores/prog"
import { useIsto } from "@/stores/isto"
import axios from "axios"

const router = useRouter()
const route = useRoute()
const progStore = useProg()
const istoStore = useIsto()

const progId = computed(() => Number(route.params.id))
const prog = computed(() => progStore.progs.find(p => p.id === progId.value))

const item1 = ref(0)
const item2 = ref(0)

const totalPrice = computed(() => item1.value + item2.value)

onMounted(() => {
  if (progStore.progs.length === 0) {
    progStore.fetchProgs()
  }
})

const salveazaInIstoric = async () => {
  const title = prog.value?.title || "Programare"

  await istoStore.addIsto({
    total: totalPrice.value,
    date: new Date().toISOString().split("T")[0],
    title: title
  })

  await progStore.removeProg(progId.value)

  router.push("/Istoric")
}
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">Total</h1>
    <br />

    <p v-if="prog" class="text-lg font-semibold text-gray-700 mb-4">{{ prog.title }}</p>

    <br />
    Schimb bucse:
    <input v-model="item1" class="rounded-lg border" type="number" />
    <br /><br />
    Schimb placute:
    <input v-model="item2" class="rounded-lg border" type="number" />
    <br /><br />

    <p>Total : <b>{{ totalPrice }} lei</b></p>
    <br />

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