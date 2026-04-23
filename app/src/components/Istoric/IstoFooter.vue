<script setup>
import { useIsto } from "@/stores/isto"
import { useRouter } from "vue-router"

const istoStore = useIsto()
const router = useRouter()

import { ref } from "vue"

const isAddingIsto = ref(false)
const newIstoTitle = ref("")
const newIstoTotal = ref("")
const newIstoDate = ref("")

const addNewIsto = () => {
  if (!newIstoTitle.value || !newIstoTotal.value || !newIstoDate.value) return

  istoStore.addIsto({
    id: Math.floor(Math.random() * 1000000),
    title: newIstoTitle.value,
    total: parseFloat(newIstoTotal.value) || 0,
    date: newIstoDate.value
  })

  isAddingIsto.value = false
  newIstoTitle.value = ""
  newIstoTotal.value = ""
  newIstoDate.value = ""
}
</script>

<template>
  <br />
  <div v-if="!isAddingIsto">
    <button class="mr-4 h-8 w-20 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-gray-100"
      @click="router.push('/meniu')">
      Meniu
    </button>
  </div>
  <div v-else>
    <input v-model="newIstoTitle" type="text" placeholder="Introdu client"
      class="ml-6 rounded border border-gray-300 px-2" />

    <input v-model="newIstoTotal" type="number" placeholder="Introdu total"
      class="ml-6 rounded border border-gray-300 px-2" />
    <input v-model="newIstoDate" type="date" placeholder="Alege data"
      class="ml-6 rounded border border-gray-300 px-2" />

    <button type="button" class="ml-2 rounded bg-green-400 px-2 text-white" @click="addNewIsto">
      Save
    </button>
    <button type="button" class="ml-2 rounded bg-red-400 px-2 text-white" @click="isAddingIsto = false">
      Cancel
    </button>
  </div>
</template>
