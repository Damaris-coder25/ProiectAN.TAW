<script setup>
import { ref, computed, watch } from "vue"
const messaje = ref("Utilizator")

const emit = defineEmits(["update:fullName"])

const nume = ref("")
const prenume = ref("")

watch(nume, (newVal, oldVal) => {
  console.log("Numele sa schimbat din", oldVal, "in", newVal)
})

watch(prenume, (newVal, oldVal) => {
  console.log("Prenumele sa schimbat din", oldVal, "in", newVal)
})

watch([nume, prenume], ([newF, newL], [oldF, oldL]) => {
  console.log("Numele interg sa schimbat din", oldF + " " + oldL, "in", newF + " " + newL)
})

const fullName = computed(() => {
  const fN = nume.value + " " + prenume.value
  emit("update:fullName", fN)
  return fN
})

const greeting = computed(() => "Bine ai venit, " + fullName.value + "!")

const emailInput = ref("")

function handleInput(event) {
  console.log("You typed: " + event.target.value)
}
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">
      {{ messaje }}
    </h1>
    <br />
    <br />
    <p class="font-bold">Nume</p>
    <input
      type="text"
      v-model="nume"
      placeholder="Introdu numele..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <br />
    <br />
    <p class="font-bold">Prenume</p>
    <input
      type="text"
      v-model="prenume"
      placeholder="Introdu prenumele..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <br />
    <br />
    <p class="font-bold">Email</p>
    <input
      type="email"
      v-model="emailInput"
      @input="handleInput"
      placeholder="Introdu email-ul..."
      class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />

    <br />
    <br />
    <div class="text-2xl font-bold">
      <p>{{ greeting }}</p>
    </div>
  </div>
</template>
