<script setup>
import PageTitle from "@/components/Meniu/PageTitle.vue"
import ConnectButton from "@/components/Meniu/ConnectButton.vue"
import { useRouter } from "vue-router"

const router = useRouter()

const goToUtilizator = () => {
  router.push("/Utilizator")
}
</script>

<template>
  <div class="flex justify-end p-4">
    <i @click="goToUtilizator" class="bi bi-person-fill text-4xl"></i>
  </div>

  <PageTitle />
  <br />
  <ConnectButton app="Programari" route="/Programari" />
  <ConnectButton app="Programare noua" route="/ProgramareNoua" />
  <ConnectButton app="Clienti" route="/Clienti" />
  <ConnectButton app="Istoric" route="/Istoric" />
</template>

<style>
@import "bootstrap-icons";
@import "tailwindcss";
</style>
