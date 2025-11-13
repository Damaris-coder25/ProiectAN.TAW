<script setup>
import { ref } from 'vue';

const codeInput = ref('');

function handleInput(event) {
  console.log('You typed: ' + event.target.value);
}
</script>

<template>
    <div class="text-center mt-5">
    <input type="code" 
        v-model="codeInput" 
        @input="handleInput" 
        placeholder="Introdu codul..."
        class="w-70 h-10  px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
</template>