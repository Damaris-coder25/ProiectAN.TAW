<script setup>
import { useIsto } from "@/stores/isto"
const istoStore = useIsto()

import IstoHeader from "./IstoHeader.vue"
import IstoBody from "./IstoBody.vue"
import IstoFooter from "./IstoFooter.vue"

import { onMounted } from "vue"

onMounted(() => {
  istoStore.fetchIstos()
})
</script>
<template>
  <IstoHeader />
  <div class="mt-5 ml-25">
    <IstoBody v-for="(isto, index) in istoStore.filteredIstos" :key="index" :isto="isto"
      @update:isto:title="newTitle => istoStore.updateIstoTitle(isto.id, newTitle)" />
  </div>
  <IstoFooter />
</template>