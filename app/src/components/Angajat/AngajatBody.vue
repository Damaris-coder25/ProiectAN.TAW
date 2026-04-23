<script setup>
import { ref, computed } from "vue"
import { useAngajat } from "@/stores/angajat"
import AngajatActions from "./AngajatActions.vue"

const angajatStore = useAngajat()
const search = ref("")

const filteredAngajati = computed(() =>
    angajatStore.angajati.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<template>
    <div class="mt-10 flex flex-col items-center gap-4">
        <div class="relative mx-auto w-1/3">
            <i class="bi bi-search absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>

            <input v-model="search" class="h-8 w-full rounded-lg border py-2 pr-2 pl-10" placeholder="Search" />
        </div>
        <ul class="full flex max-w-xl flex-col gap-2">
            <li v-for="angajat in filteredAngajati" :key="angajat.id" class="flex items-center justify-between py-1">
                <div class="grid grid-cols-[1fr_auto] items-center gap-2">
                    <span class="whitespace-normal">{{ angajat.name }} - {{ angajat.telefon }}</span>
                    <AngajatActions :angajat-id="angajat.id" :is-favorite="angajat.favorite" />
                </div>
            </li>
        </ul>
    </div>
</template>