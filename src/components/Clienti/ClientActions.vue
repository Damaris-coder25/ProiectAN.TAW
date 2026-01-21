<script setup>

import { useClient } from '@/stores/client';

const clientStore = useClient();

defineProps({
  clientId: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center">
    <button class="cursor-pointer mr-2" @click="clientStore.toggleFavorite(clientId)">
      <i class="bi " :class="isFavorite ? 'bi-star-fill text-yellow-500' : 'bi-star'"></i>
    </button>

    <button class="cursor-pointer" @click="clientStore.removeClient(clientId)">
      <i class="bi bi-trash" ></i>
    </button>
  </div>
</template>