<script setup>
import { useProg } from "@/stores/prog"
const progStore = useProg()

import ProgHeader from "./ProgHeader.vue"
import ProgBody from "./ProgBody.vue"

import { onMounted } from "vue"
onMounted(() => {
  progStore.fetchProgs()
})
</script>

<template>
  <ProgHeader />
  <div class="mt-5 ml-25">
    <ProgBody v-for="(prog, index) in progStore.filteredProgs" :key="index" :prog="prog"
      @update:prog:title="newTitle => progStore.updateProgTitle(prog.id, newTitle)" />
  </div>
</template>