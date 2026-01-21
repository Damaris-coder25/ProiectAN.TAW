
<script setup>
import ClientList from '@/components/Clienti/ClientList.vue';
import { useCountClient } from '@/stores/countClient';

const countStore = useCountClient()
</script>

<template>
    <div class="text-center mt-5">
    <ClientList />
    </div>
    <div>
    <p>Numărul total de clienți: {{ countStore.countClients }}</p>
    <p>Numărul de clienți favoriți: {{ countStore.countFavoriteClients }}</p>
  </div>
</template>

