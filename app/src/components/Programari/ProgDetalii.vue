<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useProg } from "@/stores/prog"
import { useClient } from "@/stores/client"
import axios from "axios"

const router = useRouter()
const route = useRoute()
const progStore = useProg()
const clientStore = useClient()

const API_PROG = "http://localhost:3000/programare"
const API_MANOPERA = "http://localhost:3000/manopera"

const progId = computed(() => Number(route.params.id))
const prog = computed(() => progStore.progs.find(p => p.id === progId.value))

// Daca titlul se sfarseste cu "manopera", afisam sectiunea de manopere
const esteManopera = computed(() => prog.value?.title?.endsWith("manopera"))

const editTitle = ref("")
const editData = ref("")

// Toate manoperele disponibile (pentru lista de bifat)
const toateManoperele = ref([])
// Id-urile bifate curent
const selectate = ref([])

onMounted(async () => {
    if (progStore.progs.length === 0) await progStore.fetchProgs()
    if (clientStore.clients.length === 0) await clientStore.fetchClients()

    if (prog.value) {
        editTitle.value = prog.value.title
        editData.value = prog.value.data || ""
    }

    if (esteManopera.value) {
        // Incarcam toate manoperele disponibile
        const res = await axios.get(`${API_MANOPERA}/get-all`)
        toateManoperele.value = res.data

        // Pre-bifam elementele deja salvate pe aceasta programare
        const salvate = prog.value?.manopereSelectate || []
        selectate.value = salvate.map(m => m.id)
    }
})

const toggleSelectat = (id) => {
    const index = selectate.value.indexOf(id)
    if (index === -1) selectate.value.push(id)
    else selectate.value.splice(index, 1)
}

const salveaza = async () => {
    // Salvam titlul modificat
    await progStore.updateProgTitle(progId.value, editTitle.value)

    if (esteManopera.value) {
        // Construim array de obiecte { id, nume } din bifele curente
        const manopereSelectateObiecte = selectate.value.map(id => {
            const m = toateManoperele.value.find(m => m.id === id)
            return { id, nume: m?.nume || "" }
        })

        // Salvam elementele bifate actualizate pe programare
        await axios.put(`${API_PROG}/update-manopere`, {
            id: progId.value,
            manopereSelectate: manopereSelectateObiecte
        })

        // Actualizam si store-ul local ca sa se reflecte imediat
        const index = progStore.progs.findIndex(p => p.id === progId.value)
        if (index !== -1) progStore.progs[index].manopereSelectate = manopereSelectateObiecte
    }

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

            <!-- Sectiunea de manopere apare doar la tipul "manopera" -->
            <div v-if="esteManopera">
                <p class="font-bold mb-2">Elemente manoperă</p>
                <div v-if="toateManoperele.length === 0" class="text-gray-400 text-sm">
                    Se încarcă...
                </div>
                <div v-for="manopera in toateManoperele" :key="manopera.id"
                    class="flex items-center gap-2 mb-2 justify-center">
                    <input type="checkbox" :checked="selectate.includes(manopera.id)"
                        @change="toggleSelectat(manopera.id)" />
                    <span>{{ manopera.nume }}</span>
                </div>
                <br />
            </div>

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