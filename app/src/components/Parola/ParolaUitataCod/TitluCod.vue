<script setup>
import { ref } from "vue"

const messaje = ref("Parola Uitata Cod")
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-4xl font-bold">
      {{ messaje }}
    </h1>
  </div>
</template>
