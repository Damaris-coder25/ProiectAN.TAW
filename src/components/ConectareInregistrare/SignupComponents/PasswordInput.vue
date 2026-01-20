<script setup>
import { ref } from 'vue';

const passwordInput = ref('');

function handleInput(event) {
  console.log('You typed: ' + event.target.value);
}

const showPassword = ref(false);
</script>

<template>
    <div class="text-center mt-5">
        <p class="font-bold">Parola</p>
      <br>

      <div class="relative w-[280px] mx-auto">
    <input :type="showPassword ? 'text' : 'password'" 
        v-model="passwordInput" 
        @input="handleInput" 
        placeholder="Introdu parola..."
        class="w-70 h-10  px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <div class="flex justify-end p-4">
    <i 
    class="bi bi-eye text-4xl absolute top-1/4 right-3 -translate-y-1/2 text-xl cursor-pointer text-gray-500" 
    @click="showPassword= !showPassword"
  >
  </i></div>
</div>
</div>

</template>