import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import CartComponent from '../index'

import cartStore from '@/core/store/cart'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      cart: {
        ...cartStore
      }
    }
  })

describe('CartComponent', () => {
  it('render correctly', async () => {
    const wrapper = shallowMount(CartComponent, {
      localVue,
      store: store()
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
