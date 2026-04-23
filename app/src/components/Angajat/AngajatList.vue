<script setup>
import { useAngajat } from "@/stores/angajat"
import { onMounted } from "vue"

import AngajatHeader from "./AngajatHeader.vue"
import AngajatBody from "./AngajatBody.vue"
import AngajatFooter from "./AngajatFooter.vue"

const angajatStore = useAngajat()

onMounted(() => {
    angajatStore.fetchAngajati()
})
</script>

<template>
    <AngajatHeader />
    <AngajatBody />
    <AngajatFooter />
</template>