<script setup>
import { ref } from "vue"
import { useProg } from "@/stores/prog"

const titlu = ref("Programari")
const progStore = useProg()
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">{{ titlu }}</h1>
  </div>
  <br />
  <div class="flex justify-center">
    <input v-model="progStore.search" type="text" placeholder="Caută programare..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
  </div>
  <br />
</template>