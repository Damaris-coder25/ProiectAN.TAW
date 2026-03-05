<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goToSignup = () => {
  router.push("/Signup")
}

import { ref } from "vue"

const message = ref("Continua")
</script>

<template>
  <div class="mt-5 text-center">
    <button
      @click="goToSignup"
      class="h-8 w-25 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
    >
      {{ message }}
    </button>
  </div>
</template>
