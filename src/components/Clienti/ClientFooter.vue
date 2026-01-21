<script setup>
import { useClient } from '@/stores/client';
import { ref } from 'vue';

const clientStore = useClient();
const isAddingClient = ref(false)
const newClientName = ref('');
const newClientTelefon = ref('');

const addNewClient = () => {
  if (!newClientName.value || !newClientTelefon.value) return;

  clientStore.addClient({
    id: Math.floor(Math.random() * 1000000),
    name: newClientName.value,
    telefon: newClientTelefon.value,
    favorite: false
  });
  isAddingClient.value = false;
  newClientName.value = '';
  newClientTelefon.value = '';
}
</script>

<template>
  <br>
  <div class="flex justify-center mt-4">
  <div v-if="!isAddingClient" class="mt-4">
    <button 
            @click="isAddingClient = true"
            type="button"
            class=" w-50 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
      + Adauga Client
    </button>
  </div>

  <div v-else class="flex gap-2 items-center">
    <input v-model="newClientName" type="text" placeholder="Nume Client"
      class="border border-gray-300 rounded px-2">
    <input v-model="newClientTelefon" type="text" placeholder="Numar Telefon"
      class="border border-gray-300 rounded px-2">
    <button @click="addNewClient" type="button" class="bg-green-400 text-white px-2 rounded">
      Save
    </button>
    <button class="bg-red-400 text-white px-2 rounded" @click="isAddingClient = false" type="button" >
      Cancel
    </button>
  </div>
  </div>
</template>