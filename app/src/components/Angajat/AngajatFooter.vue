<script setup>
import { useAngajat } from "@/stores/angajat"
import { ref } from "vue"

const angajatStore = useAngajat()
const isAddingAngajat = ref(false)
const newAngajatName = ref("")
const newAngajatTelefon = ref("")

const addNewAngajat = () => {
    if (!newAngajatName.value || !newAngajatTelefon.value) return

    angajatStore.addAngajat({
        name: newAngajatName.value,
        telefon: newAngajatTelefon.value
    })
    isAddingAngajat.value = false
    newAngajatName.value = ""
    newAngajatTelefon.value = ""
}
</script>

<template>
    <br />
    <div class="mt-4 flex justify-center">
        <div v-if="!isAddingAngajat" class="mt-4">
            <button @click="isAddingAngajat = true" type="button"
                class="h-8 w-50 rounded-lg border border-black px-4 py-1 font-semibold shadow-md hover:bg-blue-100">
                + Adauga Angajat
            </button>
        </div>

        <div v-else class="flex items-center gap-2">
            <input v-model="newAngajatName" type="text" placeholder="Nume Angajat"
                class="rounded border border-gray-300 px-2" />
            <input v-model="newAngajatTelefon" type="text" placeholder="Numar Telefon"
                class="rounded border border-gray-300 px-2" />
            <button @click="addNewAngajat" type="button" class="rounded bg-green-400 px-2 text-white">
                Save
            </button>
            <button class="rounded bg-red-400 px-2 text-white" @click="isAddingAngajat = false" type="button">
                Cancel
            </button>
        </div>
    </div>
</template>