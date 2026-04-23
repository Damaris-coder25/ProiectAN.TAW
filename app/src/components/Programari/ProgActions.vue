<script setup>
import { useProg } from "@/stores/prog"
import { useRouter } from "vue-router"

const router = useRouter()
const progStore = useProg()

const props = defineProps({
  progId: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  },
  progTitle: {
    type: String,
    required: true
  }
})

const esteManopera = props.progTitle.endsWith("manopera")

const goToDetalii = () => {
  router.push(`/Detalii/${props.progId}`)
}

const goToGata = () => {
  router.push(`/Gata/${props.progId}`)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button class="cursor-pointer" @click="progStore.toggleFavorite(progId)">
      <i class="bi" :class="isFavorite ? 'bi-star-fill text-yellow-500' : 'bi-star'"></i>
    </button>

    <button class="cursor-pointer" @click="progStore.removeProg(progId)">
      <i class="bi bi-trash"></i>
    </button>

    <button v-if="esteManopera" type="button" @click="goToDetalii"
      class="h-6 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-yellow-100">
      Detalii
    </button>

    <button type="button" @click="goToGata"
      class="h-6 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-blue-100">
      Gata
    </button>
  </div>
</template>