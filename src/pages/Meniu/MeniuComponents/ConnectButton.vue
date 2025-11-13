<script setup>

const props = defineProps(['app'])

</script>

<template>
    <div class="text-center mt-5">
        <button 
            @click="console.log(`You pressed the ${app} button!`)"
            class=" w-72 h-12 px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
             {{ app }}
        </button>
    </div>
</template>