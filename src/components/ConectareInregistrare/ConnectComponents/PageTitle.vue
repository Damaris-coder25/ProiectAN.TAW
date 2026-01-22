<script setup>
import { ref } from "vue"
const messaje = ref("Conectați-vă sau înregistrați-vă!")
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">
      {{ messaje }}
    </h1>
  </div>
</template>
