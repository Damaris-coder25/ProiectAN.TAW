<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToParolaUitataCod = () => {
  router.push("/ParolaUitataCod")
}

import { ref } from 'vue'

const message = ref('Trimite codul')

</script>

<template>
    <div class="text-center mt-5">
        <button 
            @click="goToParolaUitataCod"
            class="w-35 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            {{ message}}
      
        </button>
    </div>
</template>