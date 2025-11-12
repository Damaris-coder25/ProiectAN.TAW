<script setup>
import { ref } from 'vue';

const emailInput = ref('');

function handleInput(event) {
  console.log('You typed: ' + event.target.value);
}
</script>

<template>
    <div class="text-center mt-5">
      sau
      <br>
      <br>
      Email
      <br>
      <br>
    <input type="email" 
        v-model="emailInput" 
        @input="handleInput" 
        placeholder="Introdu email-ul..."
        class="w-70 h-10  px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
</template>