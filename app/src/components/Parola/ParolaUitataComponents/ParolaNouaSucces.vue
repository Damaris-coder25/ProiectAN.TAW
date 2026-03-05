<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const goToSignup = () => {
  router.push("/Signup")
}

const titlu = ref("Parola nouă a fost creeată cu succes!")
</script>

<template>
  <div class="mt-20 text-center">
    <h1 class="text-3xl font-bold">
      {{ titlu }}
    </h1>
  </div>
  <br />
  <div class="mt-5 text-center">
    <button
      @click="goToSignup"
      class="h-12 w-72 rounded-lg border border-black px-6 py-2 font-semibold shadow-md hover:bg-blue-100"
    >
      Înapoi la pagina de conectare
    </button>
  </div>
</template>
