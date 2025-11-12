import { createRouter, createWebHistory } from 'vue-router'

import Connect from '@/pages/ConectareInregistrare/Connect.vue'
import PickAccount from '@/pages/ConectareInregistrare/PickAccount.vue'
import NonexistentAccount from '@/pages/ConectareInregistrare/PickAccount.vue'
import Signup from '@/pages/ConectareInregistrare/Signup.vue'
import Politica from '@/pages/ConectareInregistrare/Politica.vue'
import Termeni from '@/pages/ConectareInregistrare/Termeni.vue'
/*import ParolaUitata from '@/pages/Parola/ParolaUitata.vue'
import ParolaUitataCod from '@/pages/Parola/ParolaUitataCod.vue'
import ParolaNoua from '@/pages/Parola/ParolaNoua.vue'
import ParolaNouaSucces from '@/pages/Parola/ParolaNouaSucces.vue'
import Meniu from '@/pages/Meniu.vue'
import Programari from '@/Programari/Programari.vue'
import Gata from '@/Programari/Gata.vue'
import PNDataOra from '@/ProgramareNoua/PNDataOra.vue'
import PNManopera from '@/ProgramareNoua/PNManopera.vue'
import SuccesProgramare from '@/pages/ConectareInregistrare/SuccesProgramare.vue'
import Clienti from '@/pages/Clienti/Clienti.vue'
import ClientiProgramari from '@/Programari/ClientiProgramari.vue'
import CreareClient from '@/pages/Clienti/CreareClient.vue'
import Istoric from '@/pages/Istoric/Istoric.vue'*/


const routes = [
{ path: "/", component: Connect },
{ path: "/", component: PickAccount },
{ path: "/", component: NonexistentAccount },
{ path: "/", component: Signup },
{ path: "/", component: Politica },
{ path: "/", component: Termeni },
/*{ path: "/", component: ParolaUitata },
{ path: "/", component: ParolaUitataCod },
{ path: "/", component: ParolaNoua },
{ path: "/", component: ParolaNouaSucces },
{ path: "/", component: Meniu },
{ path: "/", component: Programari },
{ path: "/", component: Gata },
{ path: "/", component: PNDataOra },
{ path: "/", component: PNManopera },
{ path: "/", component: SuccesProgramare },
{ path: "/", component: Clienti },
{ path: "/", component: ClientiProgramari },
{ path: "/", component: CreareClient },
{ path: "/", component: Istoric }*/
]

const router = createRouter({
history: createWebHistory(),
routes,
linkActiveClass: 'btn-primary'
})

export default router