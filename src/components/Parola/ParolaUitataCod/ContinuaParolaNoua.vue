<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goToParolaNoua = () => {
  router.push("/ParolaNoua")
}

import { ref } from "vue"

const message = ref("Continua")
</script>

<template>
  <div class="mt-5 text-center">
    <button
      @click="goToParolaNoua"
      class="h-8 w-25 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
    >
      {{ message }}
    </button>
  </div>
</template>
