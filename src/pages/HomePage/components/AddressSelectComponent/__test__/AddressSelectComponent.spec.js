import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import Multiselect from 'vue-multiselect'

import AddressSelect from '../index'
import geocodingStore from '@/core/store/requests/geocoding'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
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

jest.mock('@/core/services/geocoding')

describe('AddressSelectComponent', () => {
  it('render correctly', async () => {
    const wrapper = mount(AddressSelect, {
      localVue,
      store
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })

  it('should get options after user type', async () => {
    expect.assertions(1)
    jest.useFakeTimers()
    jest.spyOn(store, 'dispatch')

    const wrapper = mount(AddressSelect, {
      localVue,
      store
    })

    await flushPromises()

    const $multiselect = wrapper.findComponent(Multiselect)
    $multiselect.setData({
      search: 'dummy value'
    })

    await flushPromises()
    jest.runAllTimers()

    expect(store.dispatch).toHaveBeenCalledWith(
      'requests/geocoding/getAddresses',
      'dummy value'
    )

    wrapper.destroy()
  })

  it('should populate data options with text and value', async () => {
    expect.assertions(2)
    jest.useFakeTimers()

    const wrapper = mount(AddressSelect, {
      localVue,
      store
    })

    await flushPromises()

    const $multiselect = wrapper.findComponent(Multiselect)
    $multiselect.setData({
      search: 'dummy value'
    })

    await flushPromises()
    jest.runAllTimers()
    await flushPromises()

    expect(wrapper.vm.options.length).not.toBe(0)

    expect(wrapper.vm.options[0]).toEqual(
      expect.objectContaining({
        text: expect.any(String),
        value: expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number)
        })
      })
    )

    wrapper.destroy()
  })

  it('should emit a select event when user select a address option', async () => {
    expect.assertions(1)

    jest.useFakeTimers()

    const wrapper = mount(AddressSelect, {
      localVue,
      store
    })

    await flushPromises()

    const $multiselect = wrapper.findComponent(Multiselect)
    $multiselect.setData({
      search: 'dummy value'
    })

    await flushPromises()
    jest.runAllTimers()
    await flushPromises()

    wrapper.find('.multiselect__option').trigger('click')

    await flushPromises()

    expect(wrapper.emitted('select').length).toBe(1)

    wrapper.destroy()
  })
})
