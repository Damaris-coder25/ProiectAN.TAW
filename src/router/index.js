import { createRouter, createWebHistory } from 'vue-router'

import Connect from '@/pages/Connect.vue'
import PickAccount from '@/components/ConectareInregistrare/PickAccount.vue'
import NonexistentAccount from '@/components/ConectareInregistrare/NonexistentAccount.vue'
import Signup from '@/pages/Signup.vue'
import Politica from '@/components/ConectareInregistrare/Politica.vue'
import Termeni from '@/components/ConectareInregistrare/Termeni.vue'
import ParolaUitata from '@/components/Parola/ParolaUitataComponents/ParolaUitata.vue'
import ParolaUitataCod from '@/components/Parola/ParolaUitataComponents/ParolaUitataCod.vue'
import ParolaNoua from '@/components/Parola/ParolaUitataComponents/ParolaNoua.vue'
import ParolaNouaSucces from '@/components/Parola/ParolaUitataComponents/ParolaNouaSucces.vue'
import Meniu from '@/pages/Meniu.vue'
import Utilizator from '@/pages/Utilizator.vue'
import Programari from '@/pages/Programari.vue'
import Gata from '@/components/Programari/Gata.vue'
import ProgramareNoua from '@/pages/ProgramareNoua.vue'
import Manopera from '@/components/ProgramareNoua/Manopera.vue'
import SuccesProgramare from '@/components/ProgramareNoua/SuccesProgramare.vue'
import Clienti from '@/pages/Clienti.vue'
import Istoric from '@/pages/Istoric.vue'


const routes = [
{ path: "/", component: Connect },
{ path: "/PickAccount", component: PickAccount },
{ path: "/NonexistentAccount", component: NonexistentAccount },
{ path: "/Signup", component: Signup },
{ path: "/Politica", component: Politica },
{ path: "/Termeni", component: Termeni },
{ path: "/ParolaUitata", component: ParolaUitata },
{ path: "/ParolaUitataCod", component: ParolaUitataCod },
{ path: "/ParolaNoua", component: ParolaNoua },
{ path: "/ParolaNouaSucces", component: ParolaNouaSucces },
{ path: "/Meniu", component: Meniu },
{ path: "/Utilizator", component: Utilizator },
{ path: "/Programari", component: Programari },
{ path: "/Gata", component: Gata },
{ path: "/ProgramareNoua", component: ProgramareNoua },
{ path: "/Manopera", component: Manopera },
{ path: "/SuccesProgramare", component: SuccesProgramare },
{ path: "/Clienti", component: Clienti },
{ path: "/Istoric", component: Istoric }
]

const router = createRouter({
history: createWebHistory(),
routes,
linkActiveClass: 'btn-primary'
})

export default router