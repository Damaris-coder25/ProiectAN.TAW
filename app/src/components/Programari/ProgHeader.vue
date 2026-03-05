<script setup>
import { ref } from "vue"

const titlu = ref("Programari")
</script>
<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">
      {{ titlu }}
    </h1>
  </div>
  <br />
</template>
