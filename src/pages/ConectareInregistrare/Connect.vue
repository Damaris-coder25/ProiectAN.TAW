<script setup>
import PageTitle from './ConnectComponents/PageTitle.vue'
import ConnectButton from './ConnectComponents/ConnectButton.vue'
import EmailInput from './ConnectComponents/EmailInput.vue'
import ContinueButton from './ConnectComponents/ContinueButton.vue'

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
  <ContinueButton />
  <br>
  <br>
  <br>
</template>

<style>
@import "bootstrap-icons";
@import "tailwindcss";
</style>
