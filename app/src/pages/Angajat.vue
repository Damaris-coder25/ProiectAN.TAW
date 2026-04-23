<script setup>
import AngajatList from "@/components/Angajat/AngajatList.vue"
import { useCountClient } from "@/stores/countClient"

const countStore = useCountClient()
</script>

<template>
    <div class="mt-5 text-center">
        <AngajatList />
    </div>
</template>