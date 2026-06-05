import { createRouter, createWebHistory } from "vue-router"

import Connect from "@/pages/Connect.vue"
import PickAccount from "@/components/ConectareInregistrare/PickAccount.vue"
import NonexistentAccount from "@/components/ConectareInregistrare/NonexistentAccount.vue"
import Signup from "@/pages/Signup.vue"
import Politica from "@/components/ConectareInregistrare/Politica.vue"
import Termeni from "@/components/ConectareInregistrare/Termeni.vue"
import ParolaUitata from "@/components/Parola/ParolaUitataComponents/ParolaUitata.vue"
import ParolaUitataCod from "@/components/Parola/ParolaUitataComponents/ParolaUitataCod.vue"
import ParolaNoua from "@/components/Parola/ParolaUitataComponents/ParolaNoua.vue"
import ParolaNouaSucces from "@/components/Parola/ParolaUitataComponents/ParolaNouaSucces.vue"
import Meniu from "@/pages/Meniu.vue"
import Utilizator from "@/pages/Utilizator.vue"
import Programari from "@/pages/Programari.vue"
import Gata from "@/components/Programari/Gata.vue"
import ProgDetalii from "@/components/Programari/ProgDetalii.vue"
import ProgramareNoua from "@/pages/ProgramareNoua.vue"
import Manopera from "@/components/ProgramareNoua/Manopera.vue"
import SuccesProgramare from "@/components/ProgramareNoua/SuccesProgramare.vue"
import Clienti from "@/pages/Clienti.vue"
import Istoric from "@/pages/Istoric.vue"
import Angajat from "@/pages/Angajat.vue"

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
  { path: "/Meniu", component: Meniu, meta: { requiresAuth: true } },
  { path: "/Utilizator", component: Utilizator, meta: { requiresAuth: true } },
  { path: "/Programari", component: Programari, meta: { requiresAuth: true } },
  { path: "/Gata/:id", component: Gata, meta: { requiresAuth: true } },
  { path: "/ProgDetalii/:id", component: ProgDetalii, meta: { requiresAuth: true } },
  { path: "/ProgramareNoua", component: ProgramareNoua, meta: { requiresAuth: true } },
  { path: "/Manopera", component: Manopera, meta: { requiresAuth: true } },
  { path: "/SuccesProgramare", component: SuccesProgramare, meta: { requiresAuth: true } },
  { path: "/Clienti", component: Clienti, meta: { requiresAuth: true } },
  { path: "/Istoric", component: Istoric, meta: { requiresAuth: true } },
  { path: "/Angajat", component: Angajat, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "btn-primary"
})

router.beforeEach((to) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"))
  if (to.path === "/" && isAuthenticated) return "/Meniu"
  if (to.meta.requiresAuth && !isAuthenticated) return "/"
  return true
})

export default router