<script setup>
import { ref } from "vue"
import { useAuth } from "@/stores/auth.js"
import { useRouter } from "vue-router"

const auth = useAuth()
const router = useRouter()
const password = ref("")
const errorMessage = ref("")

const login = async () => {
  const usernameInput = document.querySelector('input[type="text"]')
  const username = usernameInput ? usernameInput.value : ""
  const result = await auth.checkCredentials(username, password.value)
  if (!result) {
    router.push("/Meniu")
  } else {
    errorMessage.value = result
  }
}
</script>

<template>
  <div class="mt-5 text-center">
    <input
      v-model="password"
      type="password"
      placeholder="Parola"
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <p v-if="errorMessage" class="mt-2 text-red-500 text-sm">{{ errorMessage }}</p>
    <br /><br />
    <button
      @click="login"
      class="h-8 w-25 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
    >
      Continua
    </button>
  </div>
</template>