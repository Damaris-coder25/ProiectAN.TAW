<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  app: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
})

const goTo = () => {
  router.push(props.route)
}
</script>

<template>
    <div class="text-center mt-5">
        <button 
            @click="goTo"
            class=" w-72 h-12 px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
             {{ app }}
        </button>
    </div>
</template>