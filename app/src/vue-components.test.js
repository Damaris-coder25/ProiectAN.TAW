import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('@/main.js', () => ({ ws: { send: vi.fn(), readyState: 1 } }))
vi.mock('axios', () => ({ default: { get: vi.fn().mockResolvedValue({ data: [] }), post: vi.fn().mockResolvedValue({ data: {} }), put: vi.fn().mockResolvedValue({}), delete: vi.fn().mockResolvedValue({}) } }))
vi.mock('@/api/index.js', () => ({ default: {} }))

const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div/>' } }] })

const globalConfig = () => ({
  global: {
    plugins: [createPinia(), router],
    stubs: { RouterLink: true, RouterView: true }
  }
})

describe('Vue components render without crashing', () => {
  beforeEach(() => { setActivePinia(createPinia()) })

  it('renders Angajat page', async () => {
    const C = (await import('@/pages/Angajat.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Clienti page', async () => {
    const C = (await import('@/pages/Clienti.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Istoric page', async () => {
    const C = (await import('@/pages/Istoric.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Programari page', async () => {
    const C = (await import('@/pages/Programari.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Meniu page', async () => {
    const C = (await import('@/pages/Meniu.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Utilizator page', async () => {
    const C = (await import('@/pages/Utilizator.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ProgramareNoua page', async () => {
    const C = (await import('@/pages/ProgramareNoua.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Connect page', async () => {
    const C = (await import('@/pages/Connect.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Signup page', async () => {
    const C = (await import('@/pages/Signup.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ConnectButton', async () => {
    const C = (await import('@/components/ConectareInregistrare/ConnectComponents/ConnectButton.vue')).default
    expect(mount(C, { ...globalConfig(), props: { app: 'Google' } }).exists()).toBe(true)
  })

  it('renders PickAccount', async () => {
    const C = (await import('@/components/ConectareInregistrare/PickAccount.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders NonexistentAccount', async () => {
    const C = (await import('@/components/ConectareInregistrare/NonexistentAccount.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Politica', async () => {
    const C = (await import('@/components/ConectareInregistrare/Politica.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Termeni', async () => {
    const C = (await import('@/components/ConectareInregistrare/Termeni.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ParolaUitata', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/ParolaUitata.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ParolaUitataCod', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/ParolaUitataCod.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ParolaNoua', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/ParolaNoua.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ParolaNouaSucces', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/ParolaNouaSucces.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders TrimiteCod', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/TrimiteCod.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ContinuaParolaNoua', async () => {
    const C = (await import('@/components/Parola/ParolaUitataCod/ContinuaParolaNoua.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders InputCode', async () => {
    const C = (await import('@/components/Parola/ParolaUitataCod/InputCode.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders IstoBody', async () => {
    const C = (await import('@/components/Istoric/IstoBody.vue')).default
    expect(mount(C, { ...globalConfig(), props: { isto: { id: 1, title: 'Test', total: 100, date: '2026-01-01' } } }).exists()).toBe(true)
  })

  it('renders IstoActions', async () => {
    const C = (await import('@/components/Istoric/IstoActions.vue')).default
    expect(mount(C, { ...globalConfig(), props: { istoId: 1 } }).exists()).toBe(true)
  })

  it('renders IstoFooter', async () => {
    const C = (await import('@/components/Istoric/IstoFooter.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Detalii', async () => {
    const C = (await import('@/components/Istoric/Detalii.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ProgActions', async () => {
    const C = (await import('@/components/Programari/ProgActions.vue')).default
    expect(mount(C, { ...globalConfig(), props: { progId: 1, isFavorite: false, progTitle: 'Test' } }).exists()).toBe(true)
  })

  it('renders ProgBody', async () => {
    const C = (await import('@/components/Programari/ProgBody.vue')).default
    expect(mount(C, { ...globalConfig(), props: { prog: { id: 1, title: 'Test', done: false, favorite: false } } }).exists()).toBe(true)
  })

  it('renders ProgFooter', async () => {
    const C = (await import('@/components/Programari/ProgFooter.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Gata', async () => {
    const C = (await import('@/components/Programari/Gata.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ProgDetalii', async () => {
    const C = (await import('@/components/Programari/ProgDetalii.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders Manopera', async () => {
    const C = (await import('@/components/ProgramareNoua/Manopera.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders SuccesProgramare', async () => {
    const C = (await import('@/components/ProgramareNoua/SuccesProgramare.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders AngajatActions', async () => {
    const C = (await import('@/components/Angajat/AngajatActions.vue')).default
    expect(mount(C, { ...globalConfig(), props: { angajatId: 1 } }).exists()).toBe(true)
  })

  it('renders AngajatFooter', async () => {
    const C = (await import('@/components/Angajat/AngajatFooter.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ClientActions', async () => {
    const C = (await import('@/components/Clienti/ClientActions.vue')).default
    expect(mount(C, { ...globalConfig(), props: { clientId: 1, isFavorite: false } }).exists()).toBe(true)
  })

  it('renders ClientFooter', async () => {
    const C = (await import('@/components/Clienti/ClientFooter.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })
  it('renders AngajatBody', async () => {
    const C = (await import('@/components/Angajat/AngajatBody.vue')).default
    expect(mount(C, { ...globalConfig(), props: { angajat: { id: 1, name: 'Ion', telefon: '0700', favorite: false } } }).exists()).toBe(true)
  })

  it('renders ClientBody', async () => {
    const C = (await import('@/components/Clienti/ClientBody.vue')).default
    expect(mount(C, { ...globalConfig(), props: { client: { id: 1, name: 'Ion', telefon: '0700', favorite: false } } }).exists()).toBe(true)
  })

  it('renders AngajatList', async () => {
    const C = (await import('@/components/Angajat/AngajatList.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ClientList', async () => {
    const C = (await import('@/components/Clienti/ClientList.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders IstoList', async () => {
    const C = (await import('@/components/Istoric/IstoList.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ProgList', async () => {
    const C = (await import('@/components/Programari/ProgList.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ProgHeader', async () => {
    const C = (await import('@/components/Programari/ProgHeader.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders AngajatHeader', async () => {
    const C = (await import('@/components/Angajat/AngajatHeader.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders ClientHeader', async () => {
    const C = (await import('@/components/Clienti/ClientHeader.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })

  it('renders IstoHeader', async () => {
    const C = (await import('@/components/Istoric/IstoHeader.vue')).default
    expect(mount(C, globalConfig()).exists()).toBe(true)
  })
})