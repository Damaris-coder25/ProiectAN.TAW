<script setup>
import { useProg } from '@/stores/prog';
const progStore = useProg();

import ProgHeader from './ProgHeader.vue';
import ProgBody from './ProgBody.vue';
import ProgFooter from './ProgFooter.vue';

import { onMounted } from 'vue';
onMounted(() => {
  const progs = localStorage.getItem("progs");
  if (progs) {
    progStore.$patch({ progs: JSON.parse(progs) });
  }
});
</script>
<template>
  <ProgHeader />
  <div class="ml-25 mt-5">
  <ProgBody v-for="(prog, index) in progStore.progs" :key="index" :prog="prog"
    @update:prog:title="newTitle => progStore.updateProgTitle(prog.id, newTitle)" />
   </div>
  <ProgFooter />
</template>