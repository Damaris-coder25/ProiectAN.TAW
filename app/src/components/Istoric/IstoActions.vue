<script setup>
import { useIsto } from "@/stores/isto"
import { useRouter } from "vue-router"

const router = useRouter()
const istoStore = useIsto()

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
      class="py-1/2 mr-2 h-6 w-15 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-blue-100"
    >
      Detalii
    </button>
    <button class="cursor-pointer" @click="istoStore.removeIsto(istoId)">
      <i class="bi bi-trash"></i>
    </button>
    <br />
    <br />
  </div>
</template>
