<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"
const router = useRouter()

const goToMeniu = () => {
  router.push("/Meniu")
}

const titlu = ref("Alege contul pentru a continua!")

const message = ref("blablabla45@gmail.com")
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-2xl font-bold">
      {{ titlu }}
    </h1>
  </div>
  <br />

  <div class="mt-5 text-center">
    <button
      @click="goToMeniu"
      class="h-12 w-72 rounded-lg border border-black px-6 py-2 font-semibold shadow-md hover:bg-blue-100"
    >
      {{ message }}
    </button>
  </div>
</template>
