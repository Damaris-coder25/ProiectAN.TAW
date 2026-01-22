<script setup>
import { useClient } from "@/stores/client"
import { onMounted } from "vue"

import ClientHeader from "./ClientHeader.vue"
import ClientBody from "./ClientBody.vue"
import ClientFooter from "./ClientFooter.vue"

const clientStore = useClient()

onMounted(() => {
  const clients = localStorage.getItem("clients")
  if (clients) {
    clientStore.$patch({ clients: JSON.parse(clients) })
  }
})
</script>

<template>
  <ClientHeader />
  <ClientBody />
  <ClientFooter />
</template>
