<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goToParolaUitataCod = () => {
  router.push("/ParolaUitataCod")
}

import { ref } from "vue"

const message = ref("Trimite codul")
</script>

<template>
  <div class="mt-5 text-center">
    <button
      @click="goToParolaUitataCod"
      class="h-8 w-35 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
    >
      {{ message }}
    </button>
  </div>
</template>
