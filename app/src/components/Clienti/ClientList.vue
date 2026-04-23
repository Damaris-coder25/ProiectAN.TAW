<script setup>
import { useClient } from "@/stores/client"
import { onMounted } from "vue"

import ClientHeader from "./ClientHeader.vue"
import ClientBody from "./ClientBody.vue"
import ClientFooter from "./ClientFooter.vue"

const clientStore = useClient()

onMounted(() => {
  clientStore.fetchClients()
})
</script>

<template>
  <ClientHeader />
  <ClientBody />
  <ClientFooter />
</template>
