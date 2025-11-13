<script setup>
import PageTitle from './MeniuComponents/PageTitle.vue'
import ConnectButton from './MeniuComponents/ConnectButton.vue'

</script>

<template>

  <PageTitle />
  <br>
  <ConnectButton app="Programari" />
  <ConnectButton app="Programare noua" />
  <ConnectButton app="Clienti" />
  <ConnectButton app="Istoric" />
</template>

<style>
@import "bootstrap-icons";
@import "tailwindcss";
</style>