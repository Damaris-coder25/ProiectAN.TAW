<script setup>
import { ref } from "vue"
import { useIsto } from "@/stores/isto"

const titlu = ref("Istoric")
const istoStore = useIsto()
</script>
<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">
      {{ titlu }}
    </h1>
  </div>
  <br />
  <div class="relative mx-auto w-1/3">
    <i class="bi bi-search absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>

    <input v-model="istoStore.search" class="h-10 w-full rounded-lg border py-2 pr-2 pl-10" placeholder="Search" />
  </div>
</template>