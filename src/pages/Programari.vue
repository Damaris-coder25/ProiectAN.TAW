<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToGata = () => {
  router.push("/Gata")
}

import { ref } from 'vue'

const titlu = ref('Programari')
</script>

<template>
    <div class="text-center mt-5">
        <h1 class="text-3xl font-bold ">
            {{ titlu }}
        </h1>
    </div>

<div class="text-center mt-5">
        <button 
            @click="goToGata"
            class=" w-25 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            Gata
        </button>
    </div>
</template>