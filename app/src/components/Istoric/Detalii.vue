<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

const goToIstoric = () => {
  router.push("/Istoric")
}
const titlu = ref("Total")

const emit = defineEmits(["update:totalPrice"])
const item1 = ref(0)
const item2 = ref(0)

const totalPrice = computed(() => {
  const total = item1.value + item2.value + " lei"
  emit("update:totalPrice", total)
  return total
})
</script>

<template>
  <div class="mt-5 text-center">
    <h1 class="text-3xl font-bold">
      {{ titlu }}
    </h1>
    <br />
    <br />
    Schimb bucse:
    <input v-model="item1" class="rounded-lg border" type="number" />
    <br />
    <br />
    Schimb placute:
    <input v-model="item2" class="rounded-lg border" type="number" />
    <br />
    <br />
    <p>
      Total : <b>{{ totalPrice }}</b>
    </p>
    <br />
    <button
      type="button"
      @click="goToIstoric"
      class="py-1/2 h-6 w-20 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-blue-100"
    >
      Inapoi la istoric
    </button>
  </div>
</template>
