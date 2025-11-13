<script setup>

import { ref } from 'vue'

const messaje = ref('Parola Uitata Cod')
</script>

<template>
    <div class="text-center mt-5">
        <h1 class="text-4xl font-bold ">
            {{ messaje }}
        </h1>
    </div>
</template>