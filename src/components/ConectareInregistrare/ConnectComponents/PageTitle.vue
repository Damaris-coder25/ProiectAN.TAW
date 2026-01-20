<script setup>
import { ref } from 'vue'
const messaje = ref('Conectați-vă sau înregistrați-vă!')
</script>

<template>
    <div class="text-center mt-5">
    <h1 class="text-3xl font-bold ">
      {{ messaje }}
    </h1>
    </div>
</template>