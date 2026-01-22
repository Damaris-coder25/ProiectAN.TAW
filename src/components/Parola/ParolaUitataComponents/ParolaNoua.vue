<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const goToParolaNouaSucces = () => {
  router.push("/ParolaNouaSucces")
}

const titlu = ref("Creează o parolă nouă")
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-2xl font-bold">
      {{ titlu }}
    </h1>
  </div>
  <br />
  <div class="mt-5 text-center">
    <p class="font-bold">Parola noua</p>
    <br />
    <input
      type="password"
      v-model="passwordInput"
      @input="handleInput"
      placeholder="Introdu noua parolă..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  <div class="mt-5 text-center">
    <p class="font-bold">Reintrodu parola</p>
    <br />
    <input
      type="password"
      v-model="passwordInput"
      @input="handleInput"
      placeholder="Reintrodu noua parolă..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
  <div class="mt-5 text-center">
    <button
      @click="goToParolaNouaSucces"
      class="h-8 w-25 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
    >
      Continua
    </button>
  </div>
</template>
