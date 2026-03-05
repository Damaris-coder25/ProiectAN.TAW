<script setup>
import ClientList from "@/components/Clienti/ClientList.vue"
import { useCountClient } from "@/stores/countClient"

const countStore = useCountClient()
</script>

<template>
  <div class="mt-5 text-center">
    <ClientList />
  </div>
  <div>
    <p>Numărul total de clienți: {{ countStore.countClients }}</p>
    <p>Numărul de clienți favoriți: {{ countStore.countFavoriteClients }}</p>
  </div>
</template>
