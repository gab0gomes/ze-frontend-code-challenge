import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import Multiselect from 'vue-multiselect'
import VueRouter from 'vue-router'

import HomePage from '../index'
import AddressSelect from '../components/AddressSelectComponent'

import addressStore from '@/core/store/address'
import geocodingStore from '@/core/store/requests/geocoding'

import routes from '@/core/routes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const store = new Vuex.Store({
  modules: {
    address: {
      ...addressStore
    },
    requests: {
      namespaced: true,
      modules: {
        geocoding: {
          ...geocodingStore
        }
      }
    }
  }
})

const router = () =>
  new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'abstract'
  })

jest.mock('@/core/services/geocoding')

describe('HomePage', () => {
  it('render correctly', async () => {
    const wrapper = mount(HomePage, {
      localVue,
      store
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })

  it('should update address store after AddressSelect emit a select event', async () => {
    expect.assertions(1)
    jest.spyOn(store, 'commit')

    const wrapper = mount(HomePage, {
      localVue,
      store,
      router: router()
    })

    await flushPromises()

    const payload = {
      text: 'a',
      value: { lat: 1234, lng: 5432 }
    }

    const $addressSelect = wrapper.findComponent(AddressSelect)
    $addressSelect.vm.$emit('select', {
      ...payload
    })

    await flushPromises()

    expect(store.commit).toHaveBeenCalledWith(
      'address/setAddress',
      {
        fancyAddress: 'a',
        location: { lat: 1234, lng: 5432 }
      },
      undefined
    )

    wrapper.destroy()
  })

  it('should redirect to ProductsPage after AddressSelect emit a select event', async () => {
    expect.assertions(1)

    const routerInstance = router()
    jest.spyOn(routerInstance, 'push')

    const wrapper = mount(HomePage, {
      localVue,
      store,
      router: routerInstance
    })

    await flushPromises()

    const payload = {
      text: 'a',
      value: { lat: 1234, lng: 5432 }
    }

    const $addressSelect = wrapper.findComponent(AddressSelect)
    $addressSelect.vm.$emit('select', {
      ...payload
    })

    await flushPromises()

    expect(routerInstance.push).toHaveBeenCalledWith('/products')

    wrapper.destroy()
  })
})
