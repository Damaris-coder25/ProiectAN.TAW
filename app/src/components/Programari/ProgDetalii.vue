<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useProg } from "@/stores/prog"
import { useClient } from "@/stores/client"

const router = useRouter()
const route = useRoute()
const progStore = useProg()
const clientStore = useClient()

const progId = computed(() => Number(route.params.id))
const prog = computed(() => progStore.progs.find(p => p.id === progId.value))

const editTitle = ref("")
const editData = ref("")

onMounted(async () => {
    if (progStore.progs.length === 0) await progStore.fetchProgs()
    if (clientStore.clients.length === 0) await clientStore.fetchClients()

    if (prog.value) {
        editTitle.value = prog.value.title
        editData.value = prog.value.data || ""
    }
})

const salveaza = async () => {
    await progStore.updateProgTitle(progId.value, editTitle.value)
    router.push("/Programari")
}
</script>

<template>
    <div class="mt-5 text-center">
        <h1 class="text-3xl font-bold">Detalii Programare</h1>
        <br />

        <div v-if="prog">
            <p class="font-bold">Titlu programare</p>
            <input v-model="editTitle" type="text"
                class="h-10 w-70 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />

            <br /><br />

            <p class="font-bold">Data programare</p>
            <input v-model="editData" type="date"
                class="h-10 rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />

            <br /><br />

            <p class="text-gray-500">
                Status: <b>{{ prog.done ? "Finalizat" : "În așteptare" }}</b>
            </p>

            <br />

            <button type="button" @click="router.back()"
                class="mr-4 h-8 w-20 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-gray-100">
                Înapoi
            </button>

            <button type="button" @click="salveaza"
                class="h-8 w-28 rounded-lg border border-black px-2 font-semibold shadow-md hover:bg-blue-100">
                Salvează
            </button>
        </div>

        <div v-else>
            <p class="text-gray-500">Programarea nu a fost găsită.</p>
        </div>
    </div>
</template>