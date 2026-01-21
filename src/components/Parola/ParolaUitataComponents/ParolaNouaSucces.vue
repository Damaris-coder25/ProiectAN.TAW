<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSignup = () => {
  router.push("/Signup")
}

const titlu = ref('Parola nouă a fost creeată cu succes!')
</script>

<template>
    <div class="text-center mt-20">
    <h1 class="text-3xl font-bold ">
      {{ titlu }}
    </h1>
    </div>
    <br>
    <div class="text-center mt-5">
        <button 
            @click="goToSignup"
            class=" w-72 h-12 px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            Înapoi la pagina de conectare
      
        </button>
    </div>
</template>