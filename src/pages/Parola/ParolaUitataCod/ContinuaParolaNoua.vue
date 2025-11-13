<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToParolaNoua = () => {
  router.push("/ParolaNoua")
}

import { ref } from 'vue'

const message = ref('Continua')

</script>

<template>
    <div class="text-center mt-5">
        <button 
            @click="goToParolaNoua"
            class=" w-25 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            {{ message}}
      
        </button>
    </div>
</template>