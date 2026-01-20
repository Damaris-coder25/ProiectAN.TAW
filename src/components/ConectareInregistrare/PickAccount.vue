<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

const goToMeniu = () => {
  router.push("/Meniu")
}

const titlu = ref('Alege contul pentru a continua!')

const message = ref('blablabla45@gmail.com')
</script>



<template>
    <div class="text-center mt-5">
    <h1 class="text-2xl font-bold ">
      {{ titlu }}
    </h1>
    </div>
    <br>

    <div class="text-center mt-5">
        <button 
            @click="goToMeniu"
            class=" w-72 h-12 px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            {{ message}}
      
        </button>
    </div>
</template>
