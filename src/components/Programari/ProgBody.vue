<script setup>
const emit = defineEmits(['update:prog:title']);
const props = defineProps({
  prog: {
    type: Object,
    required: true
  }
})

import ProgActions from './ProgActions.vue';
import { ref } from 'vue';
const isEditMode = ref(false);

const progEditTitle = ref(props.prog.title);
const saveProgTitle = () => {
  emit('update:prog:title', progEditTitle.value);
  isEditMode.value = false;
}
</script>
<template>
  <div class="grid grid-cols-6 gap-2">
    <div v-if="!isEditMode" class="col-span-3" @click="isEditMode = true">{{ prog.title }}</div>
    <div v-else class="col-span-3">
      <input v-model="progEditTitle" type="text" class="w-full bg-gray-100" @keyup.enter="saveProgTitle" />
    </div>
    <ProgActions :progId="prog.id" :isFavorite="prog.favorite" />
  </div>
</template>