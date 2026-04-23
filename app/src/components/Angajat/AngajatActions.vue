<script setup>
import { useAngajat } from "@/stores/angajat"

const angajatStore = useAngajat()

defineProps({
    angajatId: {
        type: Number,
        required: true
    }
})
</script>

<template>
    <div class="flex items-center">
        <button class="cursor-pointer" @click="angajatStore.removeAngajat(angajatId)">
            <i class="bi bi-trash"></i>
        </button>
    </div>
</template>