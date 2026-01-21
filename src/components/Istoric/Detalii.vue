<script setup>

import { ref,computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToIstoric = () => {
  router.push("/Istoric");
}
const titlu = ref('Total')

const emit = defineEmits(["update:totalPrice"]);
const item1 = ref(0);
const item2 = ref(0);


const totalPrice = computed(() => {
    const total =(item1.value + item2.value) + " lei";
    emit("update:totalPrice", total);
    return total;
});
</script>

<template>
    <div class="text-center mt-5">
        <h1 class="text-3xl font-bold ">
            {{ titlu }}
        </h1>
<br>
<br>
        Schimb bucse: 
        <input
    v-model="item1"
    class ="border rounded-lg"
    type="number"
  >
  <br>
  <br>
        Schimb placute: 
            <input
    v-model="item2"
    class ="border rounded-lg"
    type="number"
  >
  <br>
  <br>
  <p>Total : <b>{{ totalPrice }}</b></p>
    <br>
      <button 
            type="button"
            @click="goToIstoric"
            class=" w-20 h-6 px-2  py-1/2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            Inapoi la istoric
     </button>
    </div>
     
</template>