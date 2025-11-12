<script setup>
import ConnectIcon from './ConnectIcon.vue'

const props = defineProps(['app'])

import { ref, computed } from 'vue'

const message = ref('Continue with')

const icons=ref([
    {logo:'instagram'},
    {logo:'facebook'},
    {logo:'google'}])

// filtrăm doar iconul potrivit aplicației primite
const filteredIcons = computed(() =>
  icons.value.filter(i => i.logo.toLowerCase() === props.app.toLowerCase())
)
</script>

<template>
    <div class="text-center mt-5">
        <button 
            @click="console.log(`You pressed the ${props.app} button!`)"
            class=" w-72 h-12 px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-100 border border-black">
            <ConnectIcon
            v-for="(item,index) in filteredIcons"
            :key="index"
            :icon="item.logo" />
            {{ message}} {{ props.app }}
      
        </button>
    </div>
</template>