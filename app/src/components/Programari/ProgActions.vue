<script setup>
import { useProg } from "@/stores/prog"
import { useRouter } from "vue-router"

const router = useRouter()

const progStore = useProg()

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
    <button class="mr-2 cursor-pointer" @click="progStore.toggleFavorite(progId)">
      <i class="bi" :class="isFavorite ? 'bi-star-fill text-yellow-500' : 'bi-star'"></i>
    </button>

    <button class="cursor-pointer" @click="progStore.removeProg(progId)">
      <i class="bi bi-trash"></i>
    </button>
    <button
      type="button"
      @click="goToGata"
      class="py-1/2 h-6 w-15 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-blue-100"
    >
      Gata
    </button>
    <br />
    <br />
  </div>
</template>
