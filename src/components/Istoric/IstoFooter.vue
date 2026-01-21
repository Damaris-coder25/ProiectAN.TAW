<script setup>
import { useIsto } from '@/stores/isto';

const istoStore = useIsto();

import { ref } from 'vue';

const isAddingIsto = ref(false)
const newIstoTitle = ref('')
const newIstoTotal = ref('')
const newIstoDate = ref('')

const addNewIsto = () => {
    if (!newIstoTitle.value || !newIstoTotal.value || !newIstoDate.value) return;
 
    istoStore.addIsto({
    id: Math.floor(Math.random() * 1000000),
    title: newIstoTitle.value,
    total: parseFloat(newIstoTotal.value) || 0,
    date: newIstoDate.value
  });

  isAddingIsto.value = false;
  newIstoTitle.value = '';
  newIstoTotal.value = '';
  newIstoDate.value = '';
}

</script>

<template>
  <br>
  <div v-if="!isAddingIsto">
    <button 
            @click="isAddingIsto = true"
            type="button"
            class=" w-50 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
      + Adauga Istoric
    </button>
  </div>
  <div v-else>
    <input v-model="newIstoTitle" type="text" placeholder="Introdu client"
      class="border border-gray-300 rounded px-2 ml-6">

      <input v-model="newIstoTotal" type="number" placeholder="Introdu total"
      class="border border-gray-300 rounded px-2 ml-6">
        <input v-model="newIstoDate" type="date" placeholder="Alege data"
      class="border border-gray-300 rounded px-2 ml-6">

    <button type="button" class="bg-green-400 text-white px-2 ml-2 rounded" @click="addNewIsto">
      Save
    </button>
    <button type="button" class="bg-red-400 text-white px-2 ml-2 rounded" @click="isAddingIsto = false">
      Cancel
    </button>
  </div>
</template>