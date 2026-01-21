<script setup>
import IstoActions from './IstoActions.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['update:isto:title', 'update:isto:total', 'update:isto:date']);
const props = defineProps({
  isto: {
    type: Object,
    required: true
  }
})

const isEditMode = ref(false);
const istoEditTitle = ref(props.isto.title);
const istoEditTotal = ref(props.isto.total);
const istoEditDate = ref(props.isto.date);

const editContainer = ref(null);

const saveIstoTitle = () => {
  emit('update:isto:title', istoEditTitle.value);
  isEditMode.value = false;
}

const saveIstoTotal = () => {
  emit('update:isto:total', istoEditTotal.value);
  isEditMode.value = false;
}

const saveIstoDate = () => {
  emit('update:isto:date', istoEditDate.value);
  isEditMode.value = false;
}

const handleClickOutside = (event) => {
  if (editContainer.value && !editContainer.value.contains(event.target)) {
    isEditMode.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="editContainer" class="grid grid-cols-6 gap-2"  @click.stop>
    <div v-if="!isEditMode" class="col-span-3" @click="isEditMode = true">
        {{ new Date(isto.date).toLocaleDateString() }}<br>{{ isto.title }} - {{ isto.total }}</div>
    <div v-else class="col-span-3">
      <input v-model="istoEditTitle" type="text" class="w-full bg-gray-100" @keyup.enter="saveIstoTitle" />
      <input v-model="istoEditTotal" type="number" class="w-full bg-gray-100" @keyup.enter="saveIstoTotal" />
      <input v-model="istoEditDate" type="date" class="w-full bg-gray-100" @keyup.enter="saveIstoDate" />
    </div>
    <IstoActions :istoId="isto.id" />
  </div>
</template>