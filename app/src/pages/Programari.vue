<script setup>
import ProgList from "@/components/Programari/ProgList.vue"
import { useCountProg } from "@/stores/countProg"
import { useRouter } from "vue-router"

const countStore = useCountProg()
const router = useRouter()
</script>

<template>
  <div class="mt-5 text-center">
    <ProgList />
    <br>
    <button class="mr-4 h-8 w-20 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-gray-100"
      @click="router.push('/meniu')">Meniu</button>
  </div>

  <div>
    <p>Numărul total de programari: {{ countStore.countProg }}</p>
    <p>Numărul de programari favorite: {{ countStore.countFavoriteProg }}</p>
  </div>
</template>
