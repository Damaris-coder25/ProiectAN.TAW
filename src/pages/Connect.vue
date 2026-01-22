<script setup>
import PageTitle from "@/components/ConectareInregistrare/ConnectComponents/PageTitle.vue"
import ConnectButton from "@/components/ConectareInregistrare/ConnectComponents/ConnectButton.vue"
import EmailInput from "@/components/ConectareInregistrare/ConnectComponents/EmailInput.vue"
import ContinueButton from "@/components/ConectareInregistrare/ConnectComponents/ContinueButton.vue"
</script>

<template>
  <PageTitle />
  <br />
  <ConnectButton app="Instagram" />
  <ConnectButton app="Facebook" />
  <ConnectButton app="Google" />
  <br />
  <hr />
  <br />
  <EmailInput />
  <ContinueButton />
  <nav class="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
    <RouterLink to="/Politica">Politica de confidentialitate</RouterLink>
    <p>|</p>
    <RouterLink to="/Termeni">Termeni si conditii</RouterLink>
  </nav>
  <br />
  <br />
  <br />
</template>

<style>
@import "bootstrap-icons";
@import "tailwindcss";
</style>
