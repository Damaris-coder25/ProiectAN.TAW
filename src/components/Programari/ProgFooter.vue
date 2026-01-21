<script setup>
import { useProg } from '@/stores/prog';

const progStore = useProg();

import { ref } from 'vue';
const isAddingProg = ref(false)
const addNewProg = () => {
  progStore.addProg({
    id: Math.floor(Math.random() * 1000000),
    title: newProgTitle.value,
    done: false,
    favorite: false
  });
  isAddingProg.value = false;
  newProgTitle.value = '';
}

const newProgTitle = ref('');
</script>

<template>
  <br>
  <div v-if="!isAddingProg">
    <button 
            @click="isAddingProg = true"
            type="button"
            class=" w-50 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
      + Adauga Programare
    </button>
  </div>
  <div v-else>
    <input v-model="newProgTitle" type="text" placeholder="Introdu programare"
      class="border border-gray-300 rounded px-2 ml-6">
    <button type="button" class="bg-green-400 text-white px-2 ml-2 rounded" @click="addNewProg">
      Save
    </button>
    <button type="button" class="bg-red-400 text-white px-2 ml-2 rounded" @click="isAddingProg = false">
      Cancel
    </button>
  </div>
</template>