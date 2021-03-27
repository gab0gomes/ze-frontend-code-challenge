import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

import Logo from '../index'

const localVue = createLocalVue()
localVue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: { template: '<div>foo</div>' }
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

describe('LogoComponent', () => {
  it('render correctly', async () => {
    const wrapper = mount(Logo, {
      localVue,
      router
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
