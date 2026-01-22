<script setup>
import { ref } from "vue"

const emailInput = ref("")

function handleInput(event) {
  console.log("You typed: " + event.target.value)
}
</script>

<template>
  <div class="mt-5 text-center">
    <br />
    <p class="font-bold">Email</p>
    <br />
    <input
      type="email"
      v-model="emailInput"
      @input="handleInput"
      placeholder="Introdu email-ul..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</template>
