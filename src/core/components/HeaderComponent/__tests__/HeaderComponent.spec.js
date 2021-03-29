import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Header from '../index'
import addresStore from '@/core/store/address'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    address: {
      ...addresStore
    }
  }
})

describe('HeaderComponent', () => {
  it('render correctly', async () => {
    const wrapper = shallowMount(Header, {
      localVue,
      store
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
