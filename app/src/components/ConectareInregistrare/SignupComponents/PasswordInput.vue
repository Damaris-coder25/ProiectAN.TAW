<script setup>
import { ref } from "vue"

const passwordInput = ref("")

function handleInput(event) {
  console.log("You typed: " + event.target.value)
}

const showPassword = ref(false)
</script>

<template>
  <div class="mt-5 text-center">
    <p class="font-bold">Parola</p>
    <br />

    <div class="relative mx-auto w-[280px]">
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="passwordInput"
        @input="handleInput"
        placeholder="Introdu parola..."
        class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div class="flex justify-end p-4">
        <i
          class="bi bi-eye absolute top-1/4 right-3 -translate-y-1/2 cursor-pointer text-4xl text-xl text-gray-500"
          @click="showPassword = !showPassword"
        >
        </i>
      </div>
    </div>
  </div>
</template>
