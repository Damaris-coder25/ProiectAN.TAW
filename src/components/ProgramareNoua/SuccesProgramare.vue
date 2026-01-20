<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMeniu = () => {
  router.push("/Meniu")
}

import { ref } from 'vue'

const messaje = ref('Programarea a fost realizată cu succes!')
</script>

<template>
    <div class="text-center mt-5">
        <h1 class="text-3xl font-bold ">
            {{ messaje }}
        </h1>
<br>
<br>
        <button 
            @click="goToMeniu"
            class=" w-38 h-10 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            Înapoi la meniu
        </button>
    </div>

</template>