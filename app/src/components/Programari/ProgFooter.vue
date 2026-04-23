<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
</script>

<template>
  <div class="mt-4 text-center">
    <button type="button" @click="router.push('/Meniu')"
      class="h-8 w-20 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-gray-100">
      Meniu
    </button>
  </div>
</template>