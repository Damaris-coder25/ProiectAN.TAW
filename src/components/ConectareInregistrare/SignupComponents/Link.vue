<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

const goToParolaUitata = () => {
  router.push("/ParolaUitata")
}
</script>

<template>
  <a href="#" @click.prevent="goToParolaUitata" class="text-blue-600 hover:underline"
    >Forgot your password?
  </a>
</template>
