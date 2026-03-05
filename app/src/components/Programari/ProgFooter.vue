<script setup>
import { useProg } from "@/stores/prog"

const progStore = useProg()

import { ref } from "vue"
const isAddingProg = ref(false)
const addNewProg = () => {
  progStore.addProg({
    id: Math.floor(Math.random() * 1000000),
    title: newProgTitle.value,
    done: false,
    favorite: false
  })
  isAddingProg.value = false
  newProgTitle.value = ""
}

const newProgTitle = ref("")
</script>

<template>
  <br />
  <div v-if="!isAddingProg">
    <button
      @click="isAddingProg = true"
      type="button"
      class="h-8 w-50 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
    >
      + Adauga Programare
    </button>
  </div>
  <div v-else>
    <input
      v-model="newProgTitle"
      type="text"
      placeholder="Introdu programare"
      class="ml-6 rounded border border-gray-300 px-2"
    />
    <button type="button" class="ml-2 rounded bg-green-400 px-2 text-white" @click="addNewProg">
      Save
    </button>
    <button
      type="button"
      class="ml-2 rounded bg-red-400 px-2 text-white"
      @click="isAddingProg = false"
    >
      Cancel
    </button>
  </div>
</template>
