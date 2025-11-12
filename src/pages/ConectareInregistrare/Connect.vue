<script setup>
import PageTitle from './ConnectComponents/PageTitle.vue'
import ConnectButton from './ConnectComponents/ConnectButton.vue'
import EmailInput from './ConnectComponents/EmailInput.vue'

</script>

<template>

  <PageTitle />
  <br>
  <ConnectButton app="Instagram" />
  <ConnectButton app="Facebook" />
  <ConnectButton app="Google" />
  <br>
  <hr>
  <br>
  <EmailInput />
</template>

<style>
@import "bootstrap-icons";
@import "tailwindcss";
</style>
