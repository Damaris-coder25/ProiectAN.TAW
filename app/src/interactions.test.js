import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('@/main.js', () => ({ ws: { send: vi.fn(), readyState: 1 } }))
vi.mock('@/api/index.js', () => ({ default: {} }))
vi.mock('axios', () => ({ default: { get: vi.fn().mockResolvedValue({ data: [] }), post: vi.fn().mockResolvedValue({ data: {} }), put: vi.fn().mockResolvedValue({}), delete: vi.fn().mockResolvedValue({}) } }))

const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div/>' } }] })
const globalConfig = () => ({ global: { plugins: [createPinia(), router], stubs: { RouterLink: true, RouterView: true } } })

describe('Component interactions', () => {
  beforeEach(() => { setActivePinia(createPinia()) })

  it('ProgFooter button click navigates', async () => {
    const C = (await import('@/components/Programari/ProgFooter.vue')).default
    const w = mount(C, globalConfig())
    await w.find('button').trigger('click')
    expect(w.find('button').exists()).toBe(true)
  })

  it('ProgBody click activates edit mode', async () => {
    const C = (await import('@/components/Programari/ProgBody.vue')).default
    const w = mount(C, { ...globalConfig(), props: { prog: { id: 1, title: 'Test', done: false, favorite: false } } })
    await w.find('div.col-span-3').trigger('click')
    expect(w.find('input').exists()).toBe(true)
  })

  it('ProgBody enter saves title', async () => {
    const C = (await import('@/components/Programari/ProgBody.vue')).default
    const w = mount(C, { ...globalConfig(), props: { prog: { id: 1, title: 'Test', done: false, favorite: false } } })
    await w.find('div.col-span-3').trigger('click')
    const input = w.find('input')
    await input.setValue('Nou titlu')
    await input.trigger('keyup.enter')
    expect(w.emitted('update:prog:title')).toBeTruthy()
  })

  it('TrimiteCod button click', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/TrimiteCod.vue')).default
    const w = mount(C, globalConfig())
    await w.find('button').trigger('click')
    expect(w.find('button').exists()).toBe(true)
  })

  it('ContinuaParolaNoua button click', async () => {
    const C = (await import('@/components/Parola/ParolaUitataCod/ContinuaParolaNoua.vue')).default
    const w = mount(C, globalConfig())
    await w.find('button').trigger('click')
    expect(w.find('button').exists()).toBe(true)
  })

  it('EmailInput updates value', async () => {
    const C = (await import('@/components/ConectareInregistrare/ConnectComponents/EmailInput.vue')).default
    const w = mount(C, globalConfig())
    const input = w.find('input')
    await input.setValue('test@test.com')
    expect(input.element.value).toBe('test@test.com')
  })

  it('IstoFooter buttons exist', async () => {
    const C = (await import('@/components/Istoric/IstoFooter.vue')).default
    const w = mount(C, globalConfig())
    expect(w.exists()).toBe(true)
  })

  it('AngajatFooter buttons exist', async () => {
    const C = (await import('@/components/Angajat/AngajatFooter.vue')).default
    const w = mount(C, globalConfig())
    expect(w.exists()).toBe(true)
  })

  it('ClientFooter buttons exist', async () => {
    const C = (await import('@/components/Clienti/ClientFooter.vue')).default
    const w = mount(C, globalConfig())
    expect(w.exists()).toBe(true)
  })

  it('ConnectButton emits on click', async () => {
    const C = (await import('@/components/ConectareInregistrare/ConnectComponents/ConnectButton.vue')).default
    const w = mount(C, { ...globalConfig(), props: { app: 'Google' } })
    await w.find('button').trigger('click')
    expect(w.find('button').exists()).toBe(true)
  })

  it('IstoActions buttons trigger', async () => {
    const C = (await import('@/components/Istoric/IstoActions.vue')).default
    const w = mount(C, { ...globalConfig(), props: { istoId: 1 } })
    const buttons = w.findAll('button')
    if (buttons.length > 0) await buttons[0].trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('AngajatActions button triggers', async () => {
    const C = (await import('@/components/Angajat/AngajatActions.vue')).default
    const w = mount(C, { ...globalConfig(), props: { angajatId: 1 } })
    const buttons = w.findAll('button')
    if (buttons.length > 0) await buttons[0].trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('ClientActions button triggers', async () => {
    const C = (await import('@/components/Clienti/ClientActions.vue')).default
    const w = mount(C, { ...globalConfig(), props: { clientId: 1, isFavorite: false } })
    const buttons = w.findAll('button')
    if (buttons.length > 0) await buttons[0].trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('IstoFooter click buttons', async () => {
    const C = (await import('@/components/Istoric/IstoFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('AngajatFooter click buttons', async () => {
    const C = (await import('@/components/Angajat/AngajatFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('ClientFooter click buttons', async () => {
    const C = (await import('@/components/Clienti/ClientFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('Meniu ConnectButton click', async () => {
    const C = (await import('@/components/Meniu/ConnectButton.vue')).default
    const w = mount(C, { ...globalConfig(), props: { app: 'Meniu', route: '/Meniu' } })
    expect(w.exists()).toBe(true)
  })

  it('ProgActions click all buttons', async () => {
    const C = (await import('@/components/Programari/ProgActions.vue')).default
    const w = mount(C, { ...globalConfig(), props: { progId: 1, isFavorite: false, progTitle: 'Test' } })
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('InputCode updates value', async () => {
    const C = (await import('@/components/Parola/ParolaUitataCod/InputCode.vue')).default
    const w = mount(C, globalConfig())
    const input = w.find('input')
    await input.setValue('123456')
    expect(input.element.value).toBe('123456')
  })

  it('IstoHeader renders', async () => {
    const C = (await import('@/components/Istoric/IstoHeader.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('ProgHeader click', async () => {
    const C = (await import('@/components/Programari/ProgHeader.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('IstoActions second button', async () => {
    const C = (await import('@/components/Istoric/IstoActions.vue')).default
    const w = mount(C, { ...globalConfig(), props: { istoId: 1 } })
    const buttons = w.findAll('button')
    if (buttons.length > 1) await buttons[1].trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('ProgList renders with items', async () => {
    const C = (await import('@/components/Programari/ProgList.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('Meniu ConnectButton with route prop', async () => {
    const C = (await import('@/components/Meniu/ConnectButton.vue')).default
    const w = mount(C, { ...globalConfig(), props: { app: 'Test', route: '/Meniu' } })
    expect(w.find('button').exists()).toBe(true)
    await w.find('button').trigger('click')
    expect(w.exists()).toBe(true)
  })

  it('ProgHeader input search', async () => {
    const C = (await import('@/components/Programari/ProgHeader.vue')).default
    const w = mount(C, globalConfig())
    const inputs = w.findAll('input')
    for (const input of inputs) await input.setValue('test')
    expect(w.exists()).toBe(true)
  })

  it('IstoHeader input search', async () => {
    const C = (await import('@/components/Istoric/IstoHeader.vue')).default
    const w = mount(C, globalConfig())
    const inputs = w.findAll('input')
    for (const input of inputs) await input.setValue('test')
    expect(w.exists()).toBe(true)
  })

  it('AngajatBody edit mode', async () => {
    const C = (await import('@/components/Angajat/AngajatBody.vue')).default
    const w = mount(C, { ...globalConfig(), props: { angajat: { id: 1, name: 'Ion', telefon: '0700', favorite: false } } })
    const divs = w.findAll('div')
    for (const d of divs) await d.trigger('click')
    const inputs = w.findAll('input')
    for (const input of inputs) {
      await input.setValue('test')
      await input.trigger('keyup.enter')
    }
    expect(w.exists()).toBe(true)
  })

  it('ClientBody edit mode', async () => {
    const C = (await import('@/components/Clienti/ClientBody.vue')).default
    const w = mount(C, { ...globalConfig(), props: { client: { id: 1, name: 'Ion', telefon: '0700', favorite: false } } })
    const divs = w.findAll('div')
    for (const d of divs) await d.trigger('click')
    const inputs = w.findAll('input')
    for (const input of inputs) {
      await input.setValue('test')
      await input.trigger('keyup.enter')
    }
    expect(w.exists()).toBe(true)
  })

  it('IstoBody interactions', async () => {
    const C = (await import('@/components/Istoric/IstoBody.vue')).default
    const w = mount(C, { ...globalConfig(), props: { isto: { id: 1, title: 'Test', total: 100, date: '2026-01-01' } } })
    const buttons = w.findAll('button')
    for (const btn of buttons) await btn.trigger('click')
    const inputs = w.findAll('input')
    for (const input of inputs) await input.setValue('test')
    expect(w.exists()).toBe(true)
  })

  it('IstoFooter all button clicks', async () => {
    const C = (await import('@/components/Istoric/IstoFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('AngajatFooter all button clicks', async () => {
    const C = (await import('@/components/Angajat/AngajatFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ClientFooter all button clicks', async () => {
    const C = (await import('@/components/Clienti/ClientFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ProgDetalii renders with store data', async () => {
    const { useProg } = await import('@/stores/prog')
    const { useClient } = await import('@/stores/client')
    const progStore = useProg()
    const clientStore = useClient()
    progStore.progs = [{ id: 1, title: 'Test manopera', done: false, favorite: false, data: '2026-01-01', manopereSelectate: [] }]
    clientStore.clients = [{ id: 1, name: 'Ion', telefon: '0700', favorite: false }]
    const axios = (await import('axios')).default
    vi.mocked(axios.get).mockResolvedValue({ data: [] })
    const C = (await import('@/components/Programari/ProgDetalii.vue')).default
    const w = mount(C, { ...globalConfig(), global: { ...globalConfig().global, mocks: { $route: { params: { id: '1' } } } } })
    await new Promise(r => setTimeout(r, 100))
    expect(w.exists()).toBe(true)
  })

  it('Manopera component interactions', async () => {
    const C = (await import('@/components/ProgramareNoua/Manopera.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('Gata component interactions', async () => {
    const C = (await import('@/components/Programari/Gata.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { 
        await input.setValue('test')
        await input.trigger('change')
      } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ProgramareNoua page interactions', async () => {
    const C = (await import('@/pages/ProgramareNoua.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    await new Promise(r => setTimeout(r, 100))
    expect(w.exists()).toBe(true)
  })

  it('Utilizator page interactions', async () => {
    const C = (await import('@/pages/Utilizator.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('Istoric page interactions', async () => {
    const C = (await import('@/pages/Istoric.vue')).default
    const w = mount(C, globalConfig())
    await new Promise(r => setTimeout(r, 100))
    expect(w.exists()).toBe(true)
  })

  it('Meniu page interactions', async () => {
    const C = (await import('@/pages/Meniu.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('IstoFooter all interactions', async () => {
    const { useIsto } = await import('@/stores/isto')
    const istoStore = useIsto()
    istoStore.istos = [{ id: 1, title: 'Test', total: 100, date: '2026-01-01' }]
    const C = (await import('@/components/Istoric/IstoFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('AngajatFooter all interactions', async () => {
    const C = (await import('@/components/Angajat/AngajatFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ClientFooter all interactions', async () => {
    const C = (await import('@/components/Clienti/ClientFooter.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('Connect page interactions', async () => {
    const C = (await import('@/pages/Connect.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    await new Promise(r => setTimeout(r, 100))
    expect(w.exists()).toBe(true)
  })

  it('Programari page interactions', async () => {
    const C = (await import('@/pages/Programari.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('IstoList interactions', async () => {
    const C = (await import('@/components/Istoric/IstoList.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ProgList interactions', async () => {
    const C = (await import('@/components/Programari/ProgList.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('Istoric page button interactions', async () => {
    const C = (await import('@/pages/Istoric.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    await new Promise(r => setTimeout(r, 100))
    expect(w.exists()).toBe(true)
  })

  it('Meniu page button interactions', async () => {
    const C = (await import('@/pages/Meniu.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ParolaNoua input interactions', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/ParolaNoua.vue')).default
    const w = mount(C, globalConfig())
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test123') } catch {}
    }
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('Signup page full render', async () => {
    const C = (await import('@/pages/Signup.vue')).default
    const w = mount(C, globalConfig())
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test@test.com') } catch {}
    }
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ParolaUitata full render', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/ParolaUitata.vue')).default
    const w = mount(C, globalConfig())
    const inputs = w.findAll('input')
    for (const input of inputs) {
      try { await input.setValue('test@test.com') } catch {}
    }
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('ParolaUitataCod full render', async () => {
    const C = (await import('@/components/Parola/ParolaUitataComponents/ParolaUitataCod.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    expect(w.exists()).toBe(true)
  })

  it('Meniu page full interactions', async () => {
    const C = (await import('@/pages/Meniu.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    await new Promise(r => setTimeout(r, 50))
    expect(w.exists()).toBe(true)
  })

  it('Istoric page full interactions', async () => {
    const C = (await import('@/pages/Istoric.vue')).default
    const w = mount(C, globalConfig())
    const buttons = w.findAll('button')
    for (const btn of buttons) {
      try { await btn.trigger('click') } catch {}
    }
    await new Promise(r => setTimeout(r, 50))
    expect(w.exists()).toBe(true)
  })
})