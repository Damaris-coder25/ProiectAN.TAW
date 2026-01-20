<script setup>
defineProps(['icon'])
defineEmits(['iconSet'])
</script>
<template>
    <i :class="`bi bi-${icon}`" 
    @input="$emit('iconSet')"></i>
</template>