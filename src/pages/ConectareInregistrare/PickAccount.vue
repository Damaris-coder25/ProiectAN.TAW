<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

const goToMeniu = () => {
  router.push("/Meniu")
}

const message = ref('blablabla45@gmail.com')
</script>



<template>
    <h1>Alege contul pentru a continua!</h1>

    <div class="text-center mt-5">
        <button 
            @click="goToMeniu"
            class=" w-72 h-12 px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            {{ message}}
      
        </button>
    </div>
</template>