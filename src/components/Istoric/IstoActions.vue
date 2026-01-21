<script setup>
import { useIsto } from '@/stores/isto';
import { useRouter } from 'vue-router';

const router = useRouter()
const istoStore = useIsto();

defineProps({
  istoId: {
    type: Number,
    required: true
  }
})

const goToDetalii = () => {
  router.push("/Detalii")
}
</script>

<template>
  <div>
     <button 
            type="button"
            @click="goToDetalii"
            class="mr-2 w-15 h-6 px-2  py-1/2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            Detalii
     </button>
     <button class="cursor-pointer" @click="istoStore.removeIsto(istoId)">
      <i class="bi bi-trash" ></i>
    </button>
     <br>
     <br>
  </div>
</template>