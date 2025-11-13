<script setup>
import { ref } from 'vue';

const passwordInput = ref('');

function handleInput(event) {
  console.log('You typed: ' + event.target.value);
}
</script>

<template>
    <div class="text-center mt-5">
      <br>
        <p class="font-bold">Parola</p>
      <br>
    <input type="password" 
        v-model="passwordInput" 
        @input="handleInput" 
        placeholder="Introdu parola..."
        class="w-70 h-10  px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
</template>