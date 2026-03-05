<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goToMeniu = () => {
  router.push("/Meniu")
}

import { ref } from "vue"

const messaje = ref("Programarea a fost realizată cu succes!")
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">
      {{ messaje }}
    </h1>
    <br />
    <br />
    <button
      @click="goToMeniu"
      class="h-10 w-38 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
    >
      Înapoi la meniu
    </button>
  </div>
</template>
