<script setup>
import { useClient } from "@/stores/client"
import { ref } from "vue"

const clientStore = useClient()
const isAddingClient = ref(false)
const newClientName = ref("")
const newClientTelefon = ref("")

const addNewClient = () => {
  if (!newClientName.value || !newClientTelefon.value) return

  clientStore.addClient({
    id: Math.floor(Math.random() * 1000000),
    name: newClientName.value,
    telefon: newClientTelefon.value,
    favorite: false
  })
  isAddingClient.value = false
  newClientName.value = ""
  newClientTelefon.value = ""
}
</script>

<template>
  <br />
  <div class="mt-4 flex justify-center">
    <div v-if="!isAddingClient" class="mt-4">
      <button
        @click="isAddingClient = true"
        type="button"
        class="h-8 w-50 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100"
      >
        + Adauga Client
      </button>
    </div>

    <div v-else class="flex items-center gap-2">
      <input
        v-model="newClientName"
        type="text"
        placeholder="Nume Client"
        class="rounded border border-gray-300 px-2"
      />
      <input
        v-model="newClientTelefon"
        type="text"
        placeholder="Numar Telefon"
        class="rounded border border-gray-300 px-2"
      />
      <button @click="addNewClient" type="button" class="rounded bg-green-400 px-2 text-white">
        Save
      </button>
      <button
        class="rounded bg-red-400 px-2 text-white"
        @click="isAddingClient = false"
        type="button"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
