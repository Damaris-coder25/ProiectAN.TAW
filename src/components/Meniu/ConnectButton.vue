<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  app: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
})

const goTo = () => {
  router.push(props.route)
}
</script>

<template>
  <div class="mt-5 text-center">
    <button
      @click="goTo"
      class="h-12 w-72 rounded-lg border border-black px-6 py-2 font-semibold shadow-md hover:bg-blue-100"
    >
      {{ app }}
    </button>
  </div>
</template>
