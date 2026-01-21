<script setup>
import { ref, computed } from 'vue'
import { useClient } from '@/stores/client';
import ClientActions from './ClientActions.vue';

const clientStore = useClient();
const search = ref("");

const filteredClients = computed(() =>
        clientStore.clients.filter(c =>
        c.name.toLowerCase().includes(search.value.toLowerCase())
    )
);

</script>


<template>
<div class="flex flex-col items-center gap-4 mt-10">
<div class="relative w-1/3 mx-auto">
  <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

  <input
    v-model="search"
    class="border rounded-lg pl-10 pr-2 py-2 w-full h-8"
    placeholder="Search"
  />
</div>
  <ul class="flex flex-col gap-2 full max-w-xl">
    <li
      v-for="client in filteredClients"
      :key="client.id"
      class="flex justify-between items-center py-1"
    >
    <div class="grid grid-cols-[1fr_auto] items-center gap-2">
    <span class="whitespace-normal">{{ client.name }} - {{ client.telefon }}</span>
      <ClientActions 
      :client-id="client.id"
      :is-favorite="client.favorite"/>
      </div>
    </li>
  </ul>
  </div>
</template>