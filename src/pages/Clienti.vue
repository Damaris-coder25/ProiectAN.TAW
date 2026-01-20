<script setup>
import { ref, computed } from 'vue'

const messaje = ref('Clienti')

const props = defineProps({
  fullName: {
    type: String,
    required: true
  },
    telefon: {
        type: String,
        required: true
    }
});

const search = ref("");
const clienti = ref([
{ fullName: "Nechifor Aurel", telefon: "0722123456"},
{ fullName: "Nea Goe", telefon: "0722123457"},
{ fullName: "Popescu Elena", telefon: "0722123458"},
{ fullName: "Ionescu Vasile", telefon: "0722123459"},
{ fullName: "Georgescu Maria", telefon: "0722123460"},
]);

const filteredClienti = computed(() =>
        clienti.value.filter(s =>
        s.fullName.toLowerCase().includes(search.value.toLowerCase())
    )
);

const addToList = () => {
    clienti.value.push({
        fullName: props.fullName,
        telefon: props.telefon
    });
};
</script>

<template>
    <div class="text-center mt-5">
        <h1 class="text-3xl font-bold ">
            {{ messaje }}
        </h1>
    
    <br>
    <br>

    <div class="relative w-1/3 mx-auto">
  <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

  <input
    v-model="search"
    class="border rounded-lg pl-10 pr-2 py-2 w-full h-8"
    placeholder="Search"
  />
</div>
    <br>
    <br>

  <ul>
    <li
      v-for="(client, i) in filteredClienti"
      :key="i"
    >
      {{ client.fullName }} - {{ client.telefon }}
    </li>
  </ul>
  <br>
  <br>
  <button
    type="button"
    class=" w-38 h-8 px-4  py-1 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black"
    @click="addToList"
  >
    Adaugă client +
  </button>
  
    </div>
</template>