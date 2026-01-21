<script setup>

import { useProg } from '@/stores/prog';
import { useRouter } from 'vue-router';

const router = useRouter()

const progStore = useProg();

defineProps({
  progId: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})

const goToGata = () => {
  router.push("/Gata")
}
</script>

<template>
  <div>
    <button class="cursor-pointer mr-2" @click="progStore.toggleFavorite(progId)">
      <i class="bi " :class="isFavorite ? 'bi-star-fill text-yellow-500' : 'bi-star'"></i>
    </button>

    <button class="cursor-pointer" @click="progStore.removeProg(progId)">
      <i class="bi bi-trash" ></i>
    </button>
     <button 
            type="button"
            @click="goToGata"
            class=" w-15 h-6 px-2  py-1/2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            Gata
     </button>
     <br>
     <br>
  </div>
</template>