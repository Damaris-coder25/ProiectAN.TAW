<script setup>
import ConnectIcon from "./ConnectIcon.vue"
import { useRouter } from "vue-router"

const router = useRouter()

const goToPickAccount = () => {
  router.push("/PickAccount")
}

const props = defineProps(["app"])

import { ref, computed } from "vue"

const message = ref("Continue with")

const icons = ref([{ logo: "instagram" }, { logo: "facebook" }, { logo: "google" }])

// filtrăm doar iconul potrivit aplicației primite
const filteredIcons = computed(() =>
  icons.value.filter(i => i.logo.toLowerCase() === props.app.toLowerCase())
)
</script>

<template>
  <div class="mt-5 text-center">
    <button
      @click="goToPickAccount"
      class="h-12 w-72 rounded-lg border border-black px-6 py-2 font-semibold shadow-md hover:bg-blue-100"
    >
      <ConnectIcon v-for="(item, index) in filteredIcons" :key="index" :icon="item.logo" />
      {{ message }} {{ props.app }}
    </button>
  </div>
</template>
