<script setup>
import ProgList from '@/components/Programari/ProgList.vue'
import { useCountProg } from '@/stores/countProg';

const countStore = useCountProg()
</script>

<template>
    <div class="text-center mt-5">
    <ProgList />
    </div>
    <div>
    <p>Numărul total de programari: {{ countStore.countProg }}</p>
    <p>Numărul de programari favorite: {{ countStore.countFavoriteProg }}</p>
  </div>
</template>