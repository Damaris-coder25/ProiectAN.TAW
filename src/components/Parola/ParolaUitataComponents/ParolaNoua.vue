<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToParolaNouaSucces = () => {
  router.push("/ParolaNouaSucces")
}

const titlu = ref('Creează o parolă nouă')
</script>

<template>
    <div class="text-center mt-5">
    <h1 class="text-2xl font-bold ">
      {{ titlu }}
    </h1>
    </div>
<br>
    <div class="text-center mt-5">
        <p class="font-bold">Parola noua</p>
      <br>
    <input type="password" 
        v-model="passwordInput" 
        @input="handleInput" 
        placeholder="Introdu noua parolă..."
        class="w-70 h-10  px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="text-center mt-5">
        <p class="font-bold">Reintrodu parola</p>
      <br>
    <input type="password" 
        v-model="passwordInput" 
        @input="handleInput" 
        placeholder="Reintrodu noua parolă..."
        class="w-70 h-10  px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
   </div>
   <div class="text-center mt-5">
   <button 
            @click="goToParolaNouaSucces"
            class=" w-25 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            Continua
        </button>
    </div>
</template>