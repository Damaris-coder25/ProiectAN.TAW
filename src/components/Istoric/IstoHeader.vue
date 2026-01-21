<script setup>
    import { ref } from 'vue'

const titlu = ref('Istoric')
</script>
<template>
    <div class="text-center mt-5">
        <h1 class="text-3xl font-bold ">
            {{ titlu }}
        </h1>
    </div>
    <br>
    <div class="relative w-1/3 mx-auto">
  <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

  <input
    v-model="search"
    class="border rounded-lg pl-10 pr-2 py-2 w-full h-10"
    placeholder="Search"
  />
</div>
</template>